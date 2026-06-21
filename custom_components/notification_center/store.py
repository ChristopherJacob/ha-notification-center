"""JSON file storage for notification history."""
from __future__ import annotations
import asyncio
from datetime import datetime, timezone
import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_VERSION, STORAGE_KEY, DEFAULT_MAX_HISTORY

_LOGGER = logging.getLogger(__name__)


class NotificationStore:
    """Persistent notification history store."""

    def __init__(
        self, hass: HomeAssistant, max_history: int = DEFAULT_MAX_HISTORY
    ) -> None:
        """Initialize the store."""
        self.hass = hass
        self.max_history = max_history
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._notifications: list[dict[str, Any]] = []
        self._lock = asyncio.Lock()

    async def async_load(self) -> None:
        """Load history from storage."""
        data = await self._store.async_load()
        self._notifications = data or []

    async def _async_save(self) -> None:
        """Persist to disk."""
        await self._store.async_save(self._notifications)

    async def async_add(self, notification: dict[str, Any]) -> str:
        """Add a notification to history and persist."""
        async with self._lock:
            notif_id = f"{int(datetime.now(timezone.utc).timestamp() * 1000)}"
            entry = {
                "id": notif_id,
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "read": False,
                "dismissed": False,
                **notification,
            }
            self._notifications.insert(0, entry)

            # Trim to max history
            if len(self._notifications) > self.max_history:
                self._notifications = self._notifications[: self.max_history]

            await self._async_save()
            return notif_id

    async def async_mark_read(self, notification_id: str) -> bool:
        """Mark a notification as read."""
        async with self._lock:
            for notif in self._notifications:
                if notif["id"] == notification_id:
                    notif["read"] = True
                    await self._async_save()
                    return True
            return False

    async def async_dismiss(self, notification_id: str) -> bool:
        """Dismiss (hide) a notification."""
        async with self._lock:
            for notif in self._notifications:
                if notif["id"] == notification_id:
                    notif["dismissed"] = True
                    await self._async_save()
                    return True
            return False

    async def async_mark_all_read(self) -> int:
        """Mark all as read, return count."""
        async with self._lock:
            count = sum(1 for n in self._notifications if not n["read"])
            for notif in self._notifications:
                notif["read"] = True
            await self._async_save()
            return count

    async def async_get_all(
        self, include_dismissed: bool = False
    ) -> list[dict[str, Any]]:
        """Get all notifications."""
        if include_dismissed:
            return list(self._notifications)
        return [n for n in self._notifications if not n["dismissed"]]

    async def async_get_unread_count(self) -> int:
        """Get count of undismissed, unread notifications."""
        return sum(
            1 for n in self._notifications if not n["dismissed"] and not n["read"]
        )

    async def async_clear_all(self) -> None:
        """Clear all history."""
        async with self._lock:
            self._notifications = []
            await self._async_save()
