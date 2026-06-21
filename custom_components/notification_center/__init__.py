"""Notification Center integration."""
from __future__ import annotations
import logging

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.config_entries import ConfigEntry

from .const import (
    DOMAIN,
    PLATFORM,
    CONF_GROUPS,
    CONF_RULES,
    CONF_MAX_HISTORY,
    DEFAULT_MAX_HISTORY,
)
from .store import NotificationStore
from .rules import RuleEngine
from .groups import GroupManager
from .websocket import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up via YAML — not supported."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up from a config entry."""
    max_history = entry.data.get(CONF_MAX_HISTORY, DEFAULT_MAX_HISTORY)

    # Initialize store
    store = NotificationStore(hass, max_history)
    await store.async_load()

    # Initialize groups
    groups_data = entry.data.get(CONF_GROUPS)
    group_manager = GroupManager(groups_data)

    # Initialize rules
    rules_data = entry.data.get(CONF_RULES)
    rule_engine = RuleEngine(hass, rules_data)

    # Store everything
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = {
        "store": store,
        "rule_engine": rule_engine,
        "group_manager": group_manager,
    }

    # Register WebSocket commands
    async_register_websocket_commands(hass)

    # Forward to notify platform
    await hass.config_entries.async_forward_entry_setups(entry, [PLATFORM])

    # Register additional services
    await _async_register_services(hass)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, [PLATFORM])
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id, None)
    return unload_ok


async def _async_register_services(hass: HomeAssistant) -> None:
    """Register additional services for the integration."""

    async def handle_dismiss(call: ServiceCall) -> None:
        """Dismiss a notification by ID."""
        notification_id = call.data.get("notification_id", "")
        for entry_data in hass.data[DOMAIN].values():
            store = entry_data.get("store")
            if store:
                await store.async_dismiss(notification_id)

    async def handle_clear_history(call: ServiceCall) -> None:
        """Clear all notification history."""
        for entry_data in hass.data[DOMAIN].values():
            store = entry_data.get("store")
            if store:
                await store.async_clear_all()

    hass.services.async_register(DOMAIN, "dismiss", handle_dismiss)
    hass.services.async_register(DOMAIN, "clear_history", handle_clear_history)
