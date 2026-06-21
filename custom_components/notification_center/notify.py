"""Notify platform for Notification Center — transparent proxy."""
from __future__ import annotations
import logging
from typing import Any

from homeassistant.components.notify import (
    ATTR_DATA,
    ATTR_MESSAGE,
    ATTR_TITLE,
    BaseNotificationService,
)
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PRIORITY_NORMAL
from .store import NotificationStore
from .rules import RuleEngine
from .groups import GroupManager

_LOGGER = logging.getLogger(__name__)


class NotificationCenterService(BaseNotificationService):
    """Notification Center — routes messages based on rules."""

    def __init__(
        self,
        hass: HomeAssistant,
        store: NotificationStore,
        rule_engine: RuleEngine,
        group_manager: GroupManager,
    ) -> None:
        """Initialize."""
        self.hass = hass
        self.store = store
        self.rule_engine = rule_engine
        self.group_manager = group_manager

    async def async_send_message(self, message: str, **kwargs: Any) -> None:
        """Send a message through the notification center."""
        title = kwargs.get(ATTR_TITLE, "")
        data = kwargs.get(ATTR_DATA, {}) or {}

        priority = data.get("priority", PRIORITY_NORMAL)

        # Evaluate rules
        context = {
            "priority": priority,
            "title": title,
            "message": message,
            "data": data,
        }
        result = self.rule_engine.evaluate(context)

        target_group_id = result["target_group"]
        matched_rule = result["matched_rule"]
        final_priority = result["priority"]

        # Log to history
        notif_id = await self.store.async_add(
            {
                "title": title,
                "message": message,
                "priority": final_priority,
                "matched_rule": matched_rule,
                "target_group": target_group_id,
                "delivered": False,
                "delivery_errors": [],
            }
        )

        # Resolve group to targets
        targets = self.group_manager.get_targets(target_group_id)

        # If empty targets, send to all notify services
        if not targets:
            targets = self._get_all_notify_services()

        if not targets:
            _LOGGER.warning(
                "No notify targets available — notification not delivered"
            )
            return

        # Deliver to each target
        delivery_errors = []
        for target in targets:
            try:
                service_data: dict[str, Any] = {
                    ATTR_MESSAGE: message,
                }
                if title:
                    service_data[ATTR_TITLE] = title
                # Pass through additional data (minus our internal keys)
                filtered_data = {
                    k: v for k, v in data.items() if k != "priority"
                }
                if filtered_data:
                    service_data[ATTR_DATA] = filtered_data

                domain, service = target.split(".", 1)
                await self.hass.services.async_call(
                    domain, service, service_data, blocking=True
                )
            except Exception as err:
                delivery_errors.append(f"{target}: {err}")
                _LOGGER.error(
                    "Failed to deliver notification to %s: %s", target, err
                )

        # Errors are logged but not added as separate history entries
        if delivery_errors:
            _LOGGER.warning(
                "Delivery issues for notification '%s': %s",
                title or message[:50],
                "; ".join(delivery_errors),
            )

    def _get_all_notify_services(self) -> list[str]:
        """Get all available notify.* services except generic/reserved ones."""
        targets = []
        # Only target mobile_app services for "all devices" delivery
        notify_services = self.hass.services.async_services().get("notify", {})
        for service_name in notify_services:
            if service_name == DOMAIN:
                continue
            # Only mobile_app services are real notification targets
            if not service_name.startswith("mobile_app_"):
                continue
            targets.append(f"notify.{service_name}")
        return targets
