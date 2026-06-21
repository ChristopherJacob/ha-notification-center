"""Notification Center integration."""
from __future__ import annotations
import logging

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.config_entries import ConfigEntry
from homeassistant.components.frontend import async_register_built_in_panel

from .const import (
    DOMAIN, CONF_GROUPS, CONF_RULES, CONF_MAX_HISTORY, DEFAULT_MAX_HISTORY,
)
from .store import NotificationStore
from .rules import RuleEngine
from .groups import GroupManager
from .websocket import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    max_history = entry.data.get(CONF_MAX_HISTORY, DEFAULT_MAX_HISTORY)
    store = NotificationStore(hass, max_history)
    await store.async_load()
    groups_data = entry.data.get(CONF_GROUPS)
    group_manager = GroupManager(groups_data)
    rules_data = entry.data.get(CONF_RULES)
    rule_engine = RuleEngine(hass, rules_data)

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = {
        "store": store, "rule_engine": rule_engine, "group_manager": group_manager,
    }

    from .notify import NotificationCenterService
    svc = NotificationCenterService(hass, store, rule_engine, group_manager)
    async def _send_message(call: ServiceCall) -> None:
        await svc.async_send_message(
            call.data.get("message", ""), title=call.data.get("title", ""),
            data=call.data.get("data", {}),
        )
    hass.services.async_register("notify", "notification_center", _send_message)

    async_register_websocket_commands(hass)
    await _async_register_services(hass)
    _register_frontend(hass)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.services.async_remove("notify", "notification_center")
    hass.data[DOMAIN].pop(entry.entry_id, None)
    return True


async def _async_register_services(hass: HomeAssistant) -> None:
    async def handle_dismiss(call: ServiceCall) -> None:
        nid = call.data.get("notification_id", "")
        for ed in hass.data[DOMAIN].values():
            if isinstance(ed, dict) and "store" in ed:
                await ed["store"].async_dismiss(nid)
    async def handle_clear(call: ServiceCall) -> None:
        for ed in hass.data[DOMAIN].values():
            if isinstance(ed, dict) and "store" in ed:
                await ed["store"].async_clear_all()
    hass.services.async_register(DOMAIN, "dismiss", handle_dismiss)
    hass.services.async_register(DOMAIN, "clear_history", handle_clear)


def _register_frontend(hass: HomeAssistant) -> None:
    """Register the custom panel in the sidebar."""
    async_register_built_in_panel(
        hass,
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
                "module_url": "/local/notification_center/notification-center-panel.js",
            }
        },
    )
