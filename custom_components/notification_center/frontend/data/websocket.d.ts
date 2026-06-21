import type { HomeAssistant } from "../hass-types";
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
export declare const fetchHistory: (hass: HomeAssistant, includeDismissed?: boolean) => Promise<NotificationEntry[]>;
export declare const dismissNotification: (hass: HomeAssistant, notificationId: string) => Promise<boolean>;
export declare const markRead: (hass: HomeAssistant, notificationId: string) => Promise<boolean>;
export declare const markAllRead: (hass: HomeAssistant) => Promise<number>;
export declare const fetchRules: (hass: HomeAssistant) => Promise<NotificationRule[]>;
export declare const saveRules: (hass: HomeAssistant, rules: NotificationRule[]) => Promise<boolean>;
export declare const fetchGroups: (hass: HomeAssistant) => Promise<NotificationGroup[]>;
export declare const saveGroups: (hass: HomeAssistant, groups: NotificationGroup[]) => Promise<boolean>;
export declare const sendNotification: (hass: HomeAssistant, message: string, title?: string, priority?: string, data?: Record<string, any>) => Promise<boolean>;
export declare const getUnreadCount: (hass: HomeAssistant) => Promise<number>;
export declare const subscribeHistory: (hass: HomeAssistant, callback: (notifications: NotificationEntry[]) => void) => Promise<() => void>;
