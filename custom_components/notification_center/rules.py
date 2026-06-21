"""Notification rules engine."""
from __future__ import annotations
from datetime import time, datetime
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from .const import PRIORITY_NORMAL

DEFAULT_RULES: list[dict[str, Any]] = [
    {
        "id": "default",
        "name": "Default — All Devices, Always",
        "description": "Fallback rule: send everything to all devices",
        "enabled": True,
        "conditions": [],  # empty = always matches
        "target_group": "all_devices",
        "priority_override": None,
    }
]


class RuleEngine:
    """Evaluate notification rules first-match-wins."""

    def __init__(
        self,
        hass: HomeAssistant,
        rules: list[dict[str, Any]] | None = None,
    ) -> None:
        """Initialize with existing rules or defaults."""
        self.hass = hass
        self._rules: list[dict[str, Any]] = rules or DEFAULT_RULES

    @property
    def rules(self) -> list[dict[str, Any]]:
        """Return all rules."""
        return self._rules

    def get(self, rule_id: str) -> dict[str, Any] | None:
        """Get a rule by ID."""
        return next((r for r in self._rules if r["id"] == rule_id), None)

    def add(self, rule: dict[str, Any]) -> bool:
        """Add a new rule. Returns False if ID exists."""
        if self.get(rule["id"]):
            return False
        self._rules.append(rule)
        return True

    def update(self, rule_id: str, updates: dict[str, Any]) -> bool:
        """Update an existing rule."""
        rule = self.get(rule_id)
        if not rule:
            return False
        rule.update(updates)
        return True

    def remove(self, rule_id: str) -> bool:
        """Remove a rule by ID. Won't remove the last one."""
        if len(self._rules) <= 1:
            return False
        rule = self.get(rule_id)
        if not rule:
            return False
        self._rules.remove(rule)
        return True

    def reorder(self, rule_ids: list[str]) -> bool:
        """Reorder rules by provided ID list."""
        try:
            reordered = [self.get(rid) for rid in rule_ids]
            if None in reordered or len(reordered) != len(self._rules):
                return False
            self._rules = reordered  # type: ignore[assignment]
            return True
        except Exception:
            return False

    def evaluate(self, context: dict[str, Any]) -> dict[str, Any]:
        """Evaluate rules and return the first match.

        Context keys:
        - priority: str — notification priority
        - title: str
        - message: str
        - data: dict — additional data

        Returns: {"target_group": str, "matched_rule": str, "priority": str}
        """
        priority = context.get("priority", PRIORITY_NORMAL)
        now = dt_util.now()

        for rule in self._rules:
            if not rule.get("enabled", True):
                continue

            if self._matches(rule, context, now):
                return {
                    "target_group": rule["target_group"],
                    "matched_rule": rule["id"],
                    "priority": rule.get("priority_override") or priority,
                }

        # Fallback to first group
        return {
            "target_group": "all_devices",
            "matched_rule": "default",
            "priority": priority,
        }

    def _matches(
        self, rule: dict[str, Any], context: dict[str, Any], now: datetime
    ) -> bool:
        """Check if a single rule matches."""
        conditions = rule.get("conditions", [])
        if not conditions:
            return True

        for condition in conditions:
            if not self._evaluate_condition(condition, context, now):
                return False

        return True

    def _evaluate_condition(
        self,
        condition: dict[str, Any],
        context: dict[str, Any],
        now: datetime,
    ) -> bool:
        """Evaluate a single condition."""
        cond_type = condition["type"]

        if cond_type == "priority":
            return context.get("priority", PRIORITY_NORMAL) in condition.get(
                "values", []
            )

        if cond_type == "time_range":
            after_str = condition.get("after")
            before_str = condition.get("before")
            current_time = now.time()

            if after_str:
                h, m = map(int, after_str.split(":"))
                if current_time < time(h, m):
                    return False
            if before_str:
                h, m = map(int, before_str.split(":"))
                if current_time > time(h, m):
                    return False
            return True

        if cond_type == "presence":
            entity_id = condition.get("entity_id")
            if not entity_id:
                return False
            state = self.hass.states.get(entity_id)
            if state is None:
                return False
            return state.state == condition.get("state", "home")

        if cond_type == "keyword":
            keyword = condition.get("value", "").lower()
            title = context.get("title", "").lower()
            message = context.get("message", "").lower()
            data_str = str(context.get("data", {})).lower()
            return keyword in title or keyword in message or keyword in data_str

        return False

    def to_config(self) -> list[dict[str, Any]]:
        """Serialise for config entry storage."""
        return self._rules
