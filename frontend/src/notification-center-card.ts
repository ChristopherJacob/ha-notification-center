import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "./hass-types";
import {
  fetchHistory,
  getUnreadCount,
  type NotificationEntry,
} from "./data/websocket";

@customElement("notification-center-card")
export class NotificationCenterCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Number }) maxItems = 5;

  @state() private _notifications: NotificationEntry[] = [];
  @state() private _unreadCount = 0;

  static styles = css`
    :host {
      display: block;
    }

    .nc-card-wrapper {
      background: var(
        --ha-card-background,
        var(--card-background-color, #ffffff)
      );
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(
        --ha-card-box-shadow,
        0 1px 3px rgba(0, 0, 0, 0.08)
      );
      padding: 16px;
      color: var(--primary-text-color, #212121);
      font-family: var(--paper-font-common-base_-_font-family, "Roboto");
    }

    .nc-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .nc-card-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nc-badge {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-radius: 10px;
      padding: 1px 7px;
      font-size: 11px;
      font-weight: 600;
    }

    .nc-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
    }

    .nc-item:last-child {
      border-bottom: none;
    }

    .nc-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 4px;
      flex-shrink: 0;
      background: var(--primary-color, #03a9f4);
    }

    .nc-dot.read {
      background: transparent;
    }

    .nc-item-content {
      flex: 1;
      min-width: 0;
    }

    .nc-item-title {
      font-weight: 500;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nc-item-message {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .nc-item-time {
      font-size: 10px;
      color: var(--secondary-text-color, #757575);
      margin-top: 4px;
    }

    .nc-empty {
      text-align: center;
      padding: 16px;
      color: var(--secondary-text-color, #757575);
      font-size: 13px;
    }

    .card-actions {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 8px;
      margin-top: 8px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  private async _load() {
    if (!this.hass) return;
    try {
      const [notifications, count] = await Promise.all([
        fetchHistory(this.hass),
        getUnreadCount(this.hass),
      ]);
      this._notifications = notifications.slice(0, this.maxItems);
      this._unreadCount = count;
    } catch {
      // silently fail — card still renders
    }
  }

  render() {
    return html`
      <ha-card>
        <div class="nc-card-wrapper">
          <div class="nc-card-header">
            <h3>
              <ha-icon icon="mdi:bell-outline"></ha-icon>
              Notifications
              ${this._unreadCount > 0
                ? html`<span class="nc-badge">${this._unreadCount}</span>`
                : ""}
            </h3>
          </div>

          ${this._notifications.length === 0
            ? html`<div class="nc-empty">No notifications</div>`
            : this._notifications.map(
                (n) => html`
                  <div class="nc-item">
                    <div class="nc-dot ${n.read ? "read" : ""}"></div>
                    <div class="nc-item-content">
                      <div class="nc-item-title">
                        ${n.title || "Notification"}
                      </div>
                      <div class="nc-item-message">${n.message}</div>
                      <div class="nc-item-time">${n.timestamp}</div>
                    </div>
                  </div>
                `
              )}

          <div class="card-actions">
            <ha-icon-button
              icon="mdi:open-in-new"
              label="Open Notification Center"
              @click=${this._openPanel}
            ></ha-icon-button>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _openPanel() {
    const event = new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: null },
    });
    this.dispatchEvent(event);

    // Navigate to the custom panel
    history.pushState(null, "", "/notification-center");
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  // Config for Lovelace editor
  static getConfigElement() {
    return document.createElement("div");
  }

  static getStubConfig() {
    return { max_items: 5 };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "notification-center-card": NotificationCenterCard;
  }
}
