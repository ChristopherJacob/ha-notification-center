import { LitElement } from "lit";
import type { HomeAssistant } from "./hass-types";
export declare class NotificationCenterPanel extends LitElement {
    hass: HomeAssistant;
    narrow: boolean;
    private _tab;
    private _notifications;
    private _rules;
    private _groups;
    private _unreadCount;
    private _loading;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    private _loadData;
    private _switchTab;
    render(): import("lit-html").TemplateResult<1>;
    private _renderTab;
    private _renderInbox;
    private _handleToggleRead;
    private _handleMarkAllRead;
    private _renderRules;
    private _conditionLabel;
    private _renderGroups;
}
declare global {
    interface HTMLElementTagNameMap {
        "notification-center-panel": NotificationCenterPanel;
    }
}
