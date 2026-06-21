import { LitElement } from "lit";
import type { HomeAssistant } from "./hass-types";
export declare class NotificationCenterCard extends LitElement {
    hass: HomeAssistant;
    maxItems: number;
    private _notifications;
    private _unreadCount;
    static styles: import("lit").CSSResult;
    connectedCallback(): void;
    private _load;
    render(): import("lit-html").TemplateResult<1>;
    private _openPanel;
    static getConfigElement(): HTMLDivElement;
    static getStubConfig(): {
        max_items: number;
    };
}
declare global {
    interface HTMLElementTagNameMap {
        "notification-center-card": NotificationCenterCard;
    }
}
