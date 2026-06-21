"""Notification Center integration."""
from __future__ import annotations
import logging
from pathlib import Path

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.config_entries import ConfigEntry

from .const import (
    DOMAIN,
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

FRONTEND_DIR = Path(__file__).parent / "frontend"


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

    # Register notify service DIRECTLY (not via platform forwarding —
    # async_forward_entry_setups doesn't work reliably for notify in HA 2026.x)
    from .notify import NotificationCenterService

    svc = NotificationCenterService(hass, store, rule_engine, group_manager)

    async def _send_message(call: ServiceCall) -> None:
        await svc.async_send_message(
            call.data.get("message", ""),
            title=call.data.get("title", ""),
            data=call.data.get("data", {}),
        )

    hass.services.async_register("notify", "notification_center", _send_message)

    # Register WebSocket commands
    async_register_websocket_commands(hass)

    # Register additional services
    await _async_register_services(hass)

    # Register frontend
    await _async_register_frontend(hass)

    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    # Remove notify service
    hass.services.async_remove("notify", "notification_center")

    # Remove panel
    if hass.data[DOMAIN].get(entry.entry_id, {}).get("_panel_registered"):
        hass.components.frontend.async_remove_panel("notification-center")

    hass.data[DOMAIN].pop(entry.entry_id, None)
    return True


async def _async_register_services(hass: HomeAssistant) -> None:
    """Register additional services for the integration."""

    async def handle_dismiss(call: ServiceCall) -> None:
        notification_id = call.data.get("notification_id", "")
        for entry_data in hass.data[DOMAIN].values():
            if isinstance(entry_data, dict) and "store" in entry_data:
                await entry_data["store"].async_dismiss(notification_id)

    async def handle_clear_history(call: ServiceCall) -> None:
        for entry_data in hass.data[DOMAIN].values():
            if isinstance(entry_data, dict) and "store" in entry_data:
                await entry_data["store"].async_clear_all()

    hass.services.async_register(DOMAIN, "dismiss", handle_dismiss)
    hass.services.async_register(DOMAIN, "clear_history", handle_clear_history)


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Register the frontend panel and serve static files."""
    if FRONTEND_DIR.exists():
        hass.http.register_static_path(
            "/notification_center_static",
            str(FRONTEND_DIR),
            cache_headers=not hass.config.debug,
        )

        hass.components.frontend.async_register_built_in_panel(
            component_name="custom",
            sidebar_title="Notification Center",
            sidebar_icon="mdi:bell-ring",
            frontend_url_path="notification-center",
            require_admin=False,
            config={
                "_panel_custom": {
                    "name": "notification-center-panel",
                    "embed_iframe": False,
                    "trust_external": False,
                    "module_url": "/notification_center_static/notification-center-panel.js",
                }
            },
        )

        entry_id = next(iter(hass.data[DOMAIN]))
        hass.data[DOMAIN][entry_id]["_panel_registered"] = True
