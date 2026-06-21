import { LitElement, html, css } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import type { HomeAssistant } from "./hass-types";
import { sharedStyles } from "./styles/shared";
import {
  fetchHistory,
  fetchRules,
  fetchGroups,
  getUnreadCount,
  markAllRead,
  type NotificationEntry,
  type NotificationRule,
  type NotificationGroup,
} from "./data/websocket";

type Tab = "inbox" | "rules" | "groups";

@customElement("notification-center-panel")
export class NotificationCenterPanel extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Object }) narrow!: boolean;

  @state() private _tab: Tab = "inbox";
  @state() private _notifications: NotificationEntry[] = [];
  @state() private _rules: NotificationRule[] = [];
  @state() private _groups: NotificationGroup[] = [];
  @state() private _unreadCount = 0;
  @state() private _loading = true;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .nc-toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        border-bottom: 1px solid var(--nc-border);
        background: var(--nc-bg);
      }

      .nc-toolbar h1 {
        flex: 1;
        font-size: 24px;
        font-weight: 500;
        margin: 0;
      }

      .nc-content {
        flex: 1;
        overflow-y: auto;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  private async _loadData() {
    this._loading = true;
    try {
      const [notifications, rules, groups, count] = await Promise.all([
        fetchHistory(this.hass),
        fetchRules(this.hass),
        fetchGroups(this.hass),
        getUnreadCount(this.hass),
      ]);
      this._notifications = notifications;
      this._rules = rules;
      this._groups = groups;
      this._unreadCount = count;
    } catch (err) {
      console.error("Notification Center: failed to load data", err);
    } finally {
      this._loading = false;
    }
  }

  private _switchTab(tab: Tab) {
    this._tab = tab;
  }

  render() {
    if (this._loading) {
      return html`<div class="nc-empty-state pulse">Loading…</div>`;
    }

    return html`
      <div class="nc-content">
        <div class="nc-container">
          <!-- Tabs -->
          <div class="nc-tabs">
            <button
              class="nc-tab ${this._tab === "inbox" ? "active" : ""}"
              @click=${() => this._switchTab("inbox")}
            >
              <ha-icon icon="mdi:inbox"></ha-icon>
              Inbox
              ${this._unreadCount > 0
                ? html`<span class="nc-badge">${this._unreadCount}</span>`
                : ""}
            </button>
            <button
              class="nc-tab ${this._tab === "rules" ? "active" : ""}"
              @click=${() => this._switchTab("rules")}
            >
              <ha-icon icon="mdi:routes"></ha-icon>
              Rules
            </button>
            <button
              class="nc-tab ${this._tab === "groups" ? "active" : ""}"
              @click=${() => this._switchTab("groups")}
            >
              <ha-icon icon="mdi:account-group"></ha-icon>
              Groups
            </button>
          </div>

          <!-- Tab content -->
          ${this._renderTab()}
        </div>
      </div>
    `;
  }

  private _renderTab() {
    switch (this._tab) {
      case "inbox":
        return this._renderInbox();
      case "rules":
        return this._renderRules();
      case "groups":
        return this._renderGroups();
    }
  }

  // ─── Inbox ──────────────────────────────────────

  private _renderInbox() {
    if (this._notifications.length === 0) {
      return html`
        <div class="nc-empty-state">
          <ha-icon icon="mdi:bell-off-outline"></ha-icon>
          <h3>No notifications yet</h3>
          <p>Notifications sent through the Notification Center will appear here.</p>
        </div>
      `;
    }

    return html`
      <div class="nc-header">
        <h1>Inbox</h1>
        ${this._unreadCount > 0
          ? html`<button class="nc-btn" @click=${this._handleMarkAllRead}>
              Mark all read
            </button>`
          : ""}
      </div>

      <div style="display:flex;flex-direction:column;gap:8px;">
        ${this._notifications.map(
          (n) => html`
            <div class="nc-card priority-${n.priority}">
              <div
                style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;"
                @click=${() => this._handleToggleRead(n)}
              >
                <!-- Unread dot -->
                <div
                  style="width:10px;height:10px;border-radius:50%;margin-top:4px;flex-shrink:0;"
                  style="background:${n.read ? "transparent" : "var(--priority-color, var(--nc-primary))"}"
                ></div>

                <div style="flex:1;min-width:0;">
                  <div
                    style="display:flex;justify-content:space-between;align-items:center;gap:8px;"
                  >
                    <strong
                      style="font-weight:${n.read ? "400" : "600"};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
                    >
                      ${n.title || "No title"}
                    </strong>
                    <span
                      class="nc-badge"
                      style="background:var(--priority-bg,#e3f2fd);color:var(--priority-color,var(--nc-primary));font-size:11px;"
                    >
                      ${n.priority}
                    </span>
                  </div>
                  <div
                    style="color:var(--nc-text-secondary);font-size:13px;margin-top:4px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;"
                  >
                    ${n.message}
                  </div>
                  <div
                    style="color:var(--nc-text-secondary);font-size:11px;margin-top:8px;display:flex;gap:12px;"
                  >
                    <span>${n.timestamp}</span>
                    <span>Rule: ${n.matched_rule}</span>
                  </div>
                </div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  private async _handleToggleRead(n: NotificationEntry) {
    if (!n.read) {
      const { markRead, getUnreadCount } = await import(
        "./data/websocket"
      );
      await markRead(this.hass, n.id);
      n.read = true;
      this._unreadCount = await getUnreadCount(this.hass);
      this.requestUpdate();
    }
  }

  private async _handleMarkAllRead() {
    await markAllRead(this.hass);
    this._notifications.forEach((n) => (n.read = true));
    this._unreadCount = 0;
    this.requestUpdate();
  }

  // ─── Rules ──────────────────────────────────────

  private _renderRules() {
    return html`
      <div class="nc-header">
        <h1>Notification Rules</h1>
        <span style="color:var(--nc-text-secondary);font-size:13px;">
          First match wins — rules are evaluated in order
        </span>
      </div>

      ${this._rules.length === 0
        ? html`<div class="nc-empty-state">
            <ha-icon icon="mdi:routes"></ha-icon>
            <h3>No rules configured</h3>
          </div>`
        : html`
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${this._rules.map(
                (rule, idx) => html`
                  <div class="nc-card">
                    <div
                      style="display:flex;align-items:center;justify-content:space-between;"
                    >
                      <div style="display:flex;align-items:center;gap:12px;">
                        <span
                          style="color:var(--nc-text-secondary);font-size:13px;font-weight:600;min-width:24px;"
                        >
                          #${idx + 1}
                        </span>
                        <div>
                          <div style="font-weight:500;">${rule.name}</div>
                          <div
                            style="color:var(--nc-text-secondary);font-size:12px;"
                          >
                            ${rule.description || ""}
                          </div>
                        </div>
                      </div>
                      <div
                        style="display:flex;align-items:center;gap:8px;"
                      >
                        ${rule.enabled
                          ? html`<span
                              style="color:#4caf50;font-size:12px;"
                              >Enabled</span
                            >`
                          : html`<span
                              style="color:var(--nc-text-secondary);font-size:12px;"
                              >Disabled</span
                            >`}
                        <span style="color:var(--nc-text-secondary);font-size:12px;">
                          → ${rule.target_group}
                        </span>
                      </div>
                    </div>
                    ${rule.conditions.length > 0
                      ? html`
                          <div
                            style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap;"
                          >
                            ${rule.conditions.map(
                              (c) => html`
                                <span
                                  style="background:var(--nc-bg-secondary);padding:2px 8px;border-radius:4px;font-size:11px;color:var(--nc-text-secondary);"
                                >
                                  ${this._conditionLabel(c)}
                                </span>
                              `
                            )}
                          </div>
                        `
                      : html`
                          <div
                            style="margin-top:8px;font-size:11px;color:var(--nc-text-secondary);font-style:italic;"
                          >
                            Always matches
                          </div>
                        `}
                  </div>
                `
              )}
            </div>
          `}
    `;
  }

  private _conditionLabel(c: any): string {
    switch (c.type) {
      case "priority":
        return `Priority: ${c.values?.join(", ") || "any"}`;
      case "time_range":
        return `Time: ${c.after || "00:00"} – ${c.before || "23:59"}`;
      case "presence":
        return `Presence: ${c.entity_id} = ${c.state || "home"}`;
      case "keyword":
        return `Keyword: "${c.value}"`;
      default:
        return c.type;
    }
  }

  // ─── Groups ─────────────────────────────────────

  private _renderGroups() {
    return html`
      <div class="nc-header">
        <h1>Notification Groups</h1>
      </div>

      ${this._groups.length === 0
        ? html`<div class="nc-empty-state">
            <ha-icon icon="mdi:account-group-outline"></ha-icon>
            <h3>No groups configured</h3>
          </div>`
        : html`
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${this._groups.map(
                (group) => html`
                  <div class="nc-card">
                    <div
                      style="display:flex;align-items:center;justify-content:space-between;"
                    >
                      <div style="display:flex;align-items:center;gap:12px;">
                        <ha-icon
                          icon=${group.icon || "mdi:bell-ring"}
                        ></ha-icon>
                        <div>
                          <div style="font-weight:500;">${group.name}</div>
                          <div
                            style="color:var(--nc-text-secondary);font-size:12px;"
                          >
                            ${group.description || ""}
                          </div>
                        </div>
                      </div>
                      <span style="color:var(--nc-text-secondary);font-size:12px;">
                        ${group.targets.length > 0
                          ? `${group.targets.length} target(s)`
                          : "All devices"}
                      </span>
                    </div>
                    ${group.targets.length > 0
                      ? html`
                          <div
                            style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap;"
                          >
                            ${group.targets.map(
                              (t) => html`
                                <span
                                  style="background:var(--nc-bg-secondary);padding:2px 8px;border-radius:4px;font-size:11px;color:var(--nc-text-secondary);"
                                >
                                  ${t}
                                </span>
                              `
                            )}
                          </div>
                        `
                      : ""}
                  </div>
                `
              )}
            </div>
          `}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "notification-center-panel": NotificationCenterPanel;
  }
}
