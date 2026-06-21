"""WebSocket API for Notification Center."""
from __future__ import annotations
import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .store import NotificationStore
from .rules import RuleEngine
from .groups import GroupManager


@callback
def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register all websocket commands."""
    websocket_api.async_register_command(hass, ws_get_history)
    websocket_api.async_register_command(hass, ws_dismiss)
    websocket_api.async_register_command(hass, ws_mark_read)
    websocket_api.async_register_command(hass, ws_mark_all_read)
    websocket_api.async_register_command(hass, ws_get_rules)
    websocket_api.async_register_command(hass, ws_save_rules)
    websocket_api.async_register_command(hass, ws_get_groups)
    websocket_api.async_register_command(hass, ws_save_groups)
    websocket_api.async_register_command(hass, ws_send_notification)
    websocket_api.async_register_command(hass, ws_unread_count)


def _get_store(hass: HomeAssistant) -> NotificationStore:
    """Get the store for the first config entry."""
    for entry_data in hass.data[DOMAIN].values():
        return entry_data["store"]
    raise RuntimeError("No Notification Center config entry found")


def _get_rule_engine(hass: HomeAssistant) -> RuleEngine:
    """Get the rule engine."""
    for entry_data in hass.data[DOMAIN].values():
        return entry_data["rule_engine"]
    raise RuntimeError("No Notification Center config entry found")


def _get_group_manager(hass: HomeAssistant) -> GroupManager:
    """Get the group manager."""
    for entry_data in hass.data[DOMAIN].values():
        return entry_data["group_manager"]
    raise RuntimeError("No Notification Center config entry found")


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/history",
        vol.Optional("include_dismissed", default=False): bool,
    }
)
@websocket_api.async_response
async def ws_get_history(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Get notification history."""
    store = _get_store(hass)
    notifications = await store.async_get_all(msg.get("include_dismissed", False))
    connection.send_result(msg["id"], notifications)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/dismiss",
        vol.Required("notification_id"): str,
    }
)
@websocket_api.async_response
async def ws_dismiss(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Dismiss a notification."""
    store = _get_store(hass)
    success = await store.async_dismiss(msg["notification_id"])
    connection.send_result(msg["id"], {"success": success})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/mark_read",
        vol.Required("notification_id"): str,
    }
)
@websocket_api.async_response
async def ws_mark_read(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Mark a notification as read."""
    store = _get_store(hass)
    success = await store.async_mark_read(msg["notification_id"])
    connection.send_result(msg["id"], {"success": success})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/mark_all_read",
    }
)
@websocket_api.async_response
async def ws_mark_all_read(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Mark all as read."""
    store = _get_store(hass)
    count = await store.async_mark_all_read()
    connection.send_result(msg["id"], {"count": count})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/get_rules",
    }
)
@websocket_api.async_response
async def ws_get_rules(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Get notification rules."""
    engine = _get_rule_engine(hass)
    connection.send_result(msg["id"], engine.rules)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/save_rules",
        vol.Required("rules"): list,
    }
)
@websocket_api.async_response
async def ws_save_rules(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Save notification rules."""
    engine = _get_rule_engine(hass)
    engine._rules = msg["rules"]
    # Persist to config entry
    for entry_id in hass.data[DOMAIN]:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry:
            new_data = {**entry.data, "rules": engine.to_config()}
            hass.config_entries.async_update_entry(entry, data=new_data)
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/get_groups",
    }
)
@websocket_api.async_response
async def ws_get_groups(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Get notification groups."""
    manager = _get_group_manager(hass)
    connection.send_result(msg["id"], manager.groups)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/save_groups",
        vol.Required("groups"): list,
    }
)
@websocket_api.async_response
async def ws_save_groups(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Save notification groups."""
    manager = _get_group_manager(hass)
    manager._groups = msg["groups"]
    for entry_id in hass.data[DOMAIN]:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry:
            new_data = {**entry.data, "groups": manager.to_config()}
            hass.config_entries.async_update_entry(entry, data=new_data)
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/send",
        vol.Required("message"): str,
        vol.Optional("title", default=""): str,
        vol.Optional("priority", default="normal"): str,
        vol.Optional("data", default={}): dict,
    }
)
@websocket_api.async_response
async def ws_send_notification(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Send a notification through the center."""
    await hass.services.async_call(
        "notify",
        "notification_center",
        {
            "message": msg["message"],
            "title": msg.get("title", ""),
            "data": {
                "priority": msg.get("priority", "normal"),
                **(msg.get("data", {})),
            },
        },
        blocking=True,
    )
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "notification_center/unread_count",
    }
)
@websocket_api.async_response
async def ws_unread_count(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Get unread notification count."""
    store = _get_store(hass)
    count = await store.async_get_unread_count()
    connection.send_result(msg["id"], {"count": count})
