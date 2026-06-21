import type { HomeAssistant } from "../hass-types";

// ─── Types ────────────────────────────────────────

export interface NotificationEntry {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  priority: "low" | "normal" | "high" | "urgent";
  read: boolean;
  dismissed: boolean;
  matched_rule: string;
  target_group: string;
  delivered: boolean;
  delivery_errors?: string[];
}

export interface NotificationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  conditions: RuleCondition[];
  target_group: string;
  priority_override: string | null;
}

export interface RuleCondition {
  type: "priority" | "time_range" | "presence" | "keyword";
  values?: string[];
  after?: string;
  before?: string;
  entity_id?: string;
  state?: string;
  value?: string;
}

export interface NotificationGroup {
  id: string;
  name: string;
  description: string;
  targets: string[];
  icon: string;
}

// ─── Fetch Functions ──────────────────────────────

export const fetchHistory = async (
  hass: HomeAssistant,
  includeDismissed = false
): Promise<NotificationEntry[]> => {
  return hass.callWS({
    type: "notification_center/history",
    include_dismissed: includeDismissed,
  });
};

export const dismissNotification = async (
  hass: HomeAssistant,
  notificationId: string
): Promise<boolean> => {
  const result = await hass.callWS({
    type: "notification_center/dismiss",
    notification_id: notificationId,
  });
  return result.success;
};

export const markRead = async (
  hass: HomeAssistant,
  notificationId: string
): Promise<boolean> => {
  const result = await hass.callWS({
    type: "notification_center/mark_read",
    notification_id: notificationId,
  });
  return result.success;
};

export const markAllRead = async (
  hass: HomeAssistant
): Promise<number> => {
  const result = await hass.callWS({
    type: "notification_center/mark_all_read",
  });
  return result.count;
};

export const fetchRules = async (
  hass: HomeAssistant
): Promise<NotificationRule[]> => {
  return hass.callWS({ type: "notification_center/get_rules" });
};

export const saveRules = async (
  hass: HomeAssistant,
  rules: NotificationRule[]
): Promise<boolean> => {
  const result = await hass.callWS({
    type: "notification_center/save_rules",
    rules,
  });
  return result.success;
};

export const fetchGroups = async (
  hass: HomeAssistant
): Promise<NotificationGroup[]> => {
  return hass.callWS({ type: "notification_center/get_groups" });
};

export const saveGroups = async (
  hass: HomeAssistant,
  groups: NotificationGroup[]
): Promise<boolean> => {
  const result = await hass.callWS({
    type: "notification_center/save_groups",
    groups,
  });
  return result.success;
};

export const sendNotification = async (
  hass: HomeAssistant,
  message: string,
  title?: string,
  priority?: string,
  data?: Record<string, any>
): Promise<boolean> => {
  const result = await hass.callWS({
    type: "notification_center/send",
    message,
    title: title || "",
    priority: priority || "normal",
    data: data || {},
  });
  return result.success;
};

export const getUnreadCount = async (
  hass: HomeAssistant
): Promise<number> => {
  const result = await hass.callWS({
    type: "notification_center/unread_count",
  });
  return result.count;
};

// ─── Subscribe ────────────────────────────────────

export const subscribeHistory = (
  hass: HomeAssistant,
  callback: (notifications: NotificationEntry[]) => void
) => {
  return hass.connection.subscribeMessage(callback, {
    type: "notification_center/history",
  });
};
