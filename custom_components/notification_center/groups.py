"""Notification group management."""
from __future__ import annotations
from typing import Any


DEFAULT_GROUPS: list[dict[str, Any]] = [
    {
        "id": "all_devices",
        "name": "All Devices",
        "description": "Every configured notify target",
        "targets": [],  # empty = all available notify services
        "icon": "mdi:bell-ring",
    }
]


class GroupManager:
    """Manage notification groups."""

    def __init__(self, groups: list[dict[str, Any]] | None = None) -> None:
        """Initialize with existing groups or defaults."""
        self._groups: list[dict[str, Any]] = groups or DEFAULT_GROUPS

    @property
    def groups(self) -> list[dict[str, Any]]:
        """Return all groups."""
        return self._groups

    def get(self, group_id: str) -> dict[str, Any] | None:
        """Get a group by ID."""
        return next((g for g in self._groups if g["id"] == group_id), None)

    def add(self, group: dict[str, Any]) -> bool:
        """Add a new group. Returns False if ID exists."""
        if self.get(group["id"]):
            return False
        self._groups.append(group)
        return True

    def update(self, group_id: str, updates: dict[str, Any]) -> bool:
        """Update an existing group."""
        group = self.get(group_id)
        if not group:
            return False
        group.update(updates)
        return True

    def remove(self, group_id: str) -> bool:
        """Remove a group by ID."""
        # Don't allow removing the default "all_devices" group
        if group_id == "all_devices":
            return False
        group = self.get(group_id)
        if not group:
            return False
        self._groups.remove(group)
        return True

    def get_targets(self, group_id: str) -> list[str]:
        """Resolve a group to its notify target service names."""
        group = self.get(group_id)
        if not group:
            return []
        return group.get("targets", [])

    def to_config(self) -> list[dict[str, Any]]:
        """Serialise for config entry storage."""
        return self._groups
