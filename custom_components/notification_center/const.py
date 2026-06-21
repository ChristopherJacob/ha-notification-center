"""Constants for the Notification Center integration."""
DOMAIN = "notification_center"
PLATFORM = "notify"

CONF_GROUPS = "groups"
CONF_RULES = "rules"
CONF_MAX_HISTORY = "max_history"

DEFAULT_MAX_HISTORY = 500
DEFAULT_NAME = "Notification Center"

STORAGE_VERSION = 1
STORAGE_KEY = f"{DOMAIN}.history"

# WebSocket message types
WS_TYPE_HISTORY = f"{DOMAIN}/history"
WS_TYPE_DISMISS = f"{DOMAIN}/dismiss"
WS_TYPE_MARK_READ = f"{DOMAIN}/mark_read"
WS_TYPE_RULES_UPDATE = f"{DOMAIN}/rules_update"
WS_TYPE_GROUPS_UPDATE = f"{DOMAIN}/groups_update"

# Notification priority levels
PRIORITY_LOW = "low"
PRIORITY_NORMAL = "normal"
PRIORITY_HIGH = "high"
PRIORITY_URGENT = "urgent"
PRIORITIES = [PRIORITY_LOW, PRIORITY_NORMAL, PRIORITY_HIGH, PRIORITY_URGENT]
