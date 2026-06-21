"""Config flow for Notification Center."""
from __future__ import annotations
from typing import Any
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult

from .const import DOMAIN, DEFAULT_NAME, DEFAULT_MAX_HISTORY, CONF_MAX_HISTORY


class NotificationCenterConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Notification Center."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Handle the initial setup step."""
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        if user_input is not None:
            return self.async_create_entry(
                title=user_input.get("name", DEFAULT_NAME),
                data={
                    CONF_MAX_HISTORY: user_input.get(
                        CONF_MAX_HISTORY, DEFAULT_MAX_HISTORY
                    ),
                },
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Optional("name", default=DEFAULT_NAME): str,
                    vol.Optional(
                        CONF_MAX_HISTORY, default=DEFAULT_MAX_HISTORY
                    ): vol.All(vol.Coerce(int), vol.Range(min=50, max=5000)),
                }
            ),
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> config_entries.OptionsFlow:
        """Get the options flow for this handler."""
        return NotificationCenterOptionsFlow(config_entry)


class NotificationCenterOptionsFlow(config_entries.OptionsFlow):
    """Handle options flow."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        """Initialize options flow."""
        self.config_entry = config_entry

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Manage options."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        CONF_MAX_HISTORY,
                        default=self.config_entry.data.get(
                            CONF_MAX_HISTORY, DEFAULT_MAX_HISTORY
                        ),
                    ): vol.All(vol.Coerce(int), vol.Range(min=50, max=5000)),
                }
            ),
        )
