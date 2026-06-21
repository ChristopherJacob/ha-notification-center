import { LitElement } from "lit";
export declare class NotificationCenterPanel extends LitElement {
    private _tab;
    private _notifications;
    private _rules;
    private _groups;
    private _unreadCount;
    private _loading;
    private _error;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    private _callWS;
    private _loadData;
    render(): import("lit-html").TemplateResult<1>;
    private _renderTab;
    private _handleToggleRead;
    private _handleMarkAllRead;
    private _renderInbox;
    private _renderRules;
    private _renderGroups;
}
declare global {
    interface HTMLElementTagNameMap {
        "notification-center-panel": NotificationCenterPanel;
    }
}
