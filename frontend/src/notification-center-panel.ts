import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sharedStyles } from "./styles/shared";
import type {
  NotificationEntry,
  NotificationRule,
  NotificationGroup,
} from "./data/websocket";

type Tab = "inbox" | "rules" | "groups";

@customElement("notification-center-panel")
export class NotificationCenterPanel extends LitElement {
  @state() private _tab: Tab = "inbox";
  @state() private _notifications: NotificationEntry[] = [];
  @state() private _rules: NotificationRule[] = [];
  @state() private _groups: NotificationGroup[] = [];
  @state() private _unreadCount = 0;
  @state() private _loading = true;
  @state() private _error: string | null = null;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .nc-content {
        flex: 1;
        overflow-y: auto;
      }
      .nc-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 16px;
        color: var(--secondary-text-color);
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    // Try loading after a short delay to let parent HA app initialize
    setTimeout(() => this._loadData(), 100);
  }

  private async _callWS(type: string, extra: Record<string, any> = {}): Promise<any> {
    // Access HA's websocket through the parent app
    const haApp = document.querySelector("home-assistant") as any;
    if (haApp?.hass) {
      return haApp.hass.callWS({ type, ...extra });
    }

    // Fallback: try hass from home-assistant-main
    const haMain = document.querySelector("home-assistant-main") as any;
    if (haMain?.hass) {
      return haMain.hass.callWS({ type, ...extra });
    }

    throw new Error("Cannot access Home Assistant WebSocket");
  }

  private async _loadData() {
    this._loading = true;
    this._error = null;
    try {
      const [notifications, rules, groups, count] = await Promise.all([
        this._callWS("notification_center/history"),
        this._callWS("notification_center/get_rules"),
        this._callWS("notification_center/get_groups"),
        this._callWS("notification_center/unread_count"),
      ]);
      this._notifications = notifications || [];
      this._rules = rules || [];
      this._groups = groups || [];
      this._unreadCount = (count as any)?.count || 0;
    } catch (err: any) {
      console.error("NC: load error", err);
      this._error = err?.message || String(err);
    } finally {
      this._loading = false;
    }
  }

  render() {
    if (this._loading) {
      return html`<div class="nc-loading">Loading…</div>`;
    }

    if (this._error) {
      return html`
        <div class="nc-empty-state">
          <ha-icon icon="mdi:alert-circle"></ha-icon>
          <h3>Connection Error</h3>
          <p style="font-size:12px;max-width:400px;margin:8px auto;">${this._error}</p>
          <button class="nc-btn primary" @click=${this._loadData}>Retry</button>
        </div>
      `;
    }

    return html`
      <div class="nc-content">
        <div class="nc-container">
          <div class="nc-tabs">
            <button
              class="nc-tab ${this._tab === "inbox" ? "active" : ""}"
              @click=${() => (this._tab = "inbox")}
            >
              <ha-icon icon="mdi:inbox"></ha-icon> Inbox
              ${this._unreadCount > 0
                ? html`<span class="nc-badge">${this._unreadCount}</span>`
                : ""}
            </button>
            <button
              class="nc-tab ${this._tab === "rules" ? "active" : ""}"
              @click=${() => (this._tab = "rules")}
            >
              <ha-icon icon="mdi:routes"></ha-icon> Rules
            </button>
            <button
              class="nc-tab ${this._tab === "groups" ? "active" : ""}"
              @click=${() => (this._tab = "groups")}
            >
              <ha-icon icon="mdi:account-group"></ha-icon> Groups
            </button>
          </div>
          ${this._renderTab()}
        </div>
      </div>
    `;
  }

  private _renderTab() {
    switch (this._tab) {
      case "inbox": return this._renderInbox();
      case "rules": return this._renderRules();
      case "groups": return this._renderGroups();
    }
  }

  private async _handleToggleRead(n: NotificationEntry) {
    if (!n.read) {
      await this._callWS("notification_center/mark_read", { notification_id: n.id });
      n.read = true;
      const r = await this._callWS("notification_center/unread_count");
      this._unreadCount = (r as any)?.count || 0;
      this.requestUpdate();
    }
  }

  private async _handleMarkAllRead() {
    await this._callWS("notification_center/mark_all_read");
    this._notifications.forEach((n) => (n.read = true));
    this._unreadCount = 0;
    this.requestUpdate();
  }

  private _renderInbox() {
    if (this._notifications.length === 0) {
      return html`<div class="nc-empty-state">
        <ha-icon icon="mdi:bell-off-outline"></ha-icon>
        <h3>No notifications yet</h3>
        <p>Send a notification via notify.notification_center to see it here.</p>
      </div>`;
    }
    return html`
      <div class="nc-header">
        <h1>Inbox</h1>
        ${this._unreadCount > 0
          ? html`<button class="nc-btn" @click=${this._handleMarkAllRead}>Mark all read</button>`
          : ""}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${this._notifications.map(
          (n) => html`
            <div class="nc-card priority-${n.priority}">
              <div style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;" @click=${() => this._handleToggleRead(n)}>
                <div style="width:10px;height:10px;border-radius:50%;margin-top:4px;flex-shrink:0;background:${n.read ? "transparent" : "var(--priority-color, var(--nc-primary))"}"></div>
                <div style="flex:1;min-width:0;">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
                    <strong style="font-weight:${n.read ? "400" : "600"};overflow:hidden;text-overflow:ellipsis;">${n.title || "No title"}</strong>
                    <span class="nc-badge" style="background:var(--priority-bg,#e3f2fd);color:var(--priority-color,var(--nc-primary));font-size:11px;">${n.priority}</span>
                  </div>
                  <div style="color:var(--nc-text-secondary);font-size:13px;margin-top:4px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${n.message}</div>
                  <div style="color:var(--nc-text-secondary);font-size:11px;margin-top:8px;display:flex;gap:12px;">
                    <span>${n.timestamp}</span><span>Rule: ${n.matched_rule}</span>
                  </div>
                </div>
              </div>
            </div>`
        )}
      </div>`;
  }

  private _renderRules() {
    return html`
      <div class="nc-header"><h1>Notification Rules</h1><span style="color:var(--nc-text-secondary);font-size:13px;">First match wins</span></div>
      ${this._rules.length === 0
        ? html`<div class="nc-empty-state"><ha-icon icon="mdi:routes"></ha-icon><h3>No rules configured</h3></div>`
        : html`<div style="display:flex;flex-direction:column;gap:8px;">
            ${this._rules.map((rule, idx) => html`
              <div class="nc-card">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="display:flex;align-items:center;gap:12px;">
                    <span style="color:var(--nc-text-secondary);font-size:13px;font-weight:600;min-width:24px;">#${idx + 1}</span>
                    <div>
                      <div style="font-weight:500;">${rule.name}</div>
                      <div style="color:var(--nc-text-secondary);font-size:12px;">${rule.description || ""}</div>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    ${rule.enabled ? html`<span style="color:#4caf50;font-size:12px;">Enabled</span>` : html`<span style="color:var(--nc-text-secondary);font-size:12px;">Disabled</span>`}
                    <span style="color:var(--nc-text-secondary);font-size:12px;">→ ${rule.target_group}</span>
                  </div>
                </div>
              </div>`)}
          </div>`}
    `;
  }

  private _renderGroups() {
    return html`
      <div class="nc-header"><h1>Notification Groups</h1></div>
      ${this._groups.length === 0
        ? html`<div class="nc-empty-state"><ha-icon icon="mdi:account-group-outline"></ha-icon><h3>No groups configured</h3></div>`
        : html`<div style="display:flex;flex-direction:column;gap:8px;">
            ${this._groups.map((group) => html`
              <div class="nc-card">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                  <div style="display:flex;align-items:center;gap:12px;">
                    <ha-icon icon=${group.icon || "mdi:bell-ring"}></ha-icon>
                    <div>
                      <div style="font-weight:500;">${group.name}</div>
                      <div style="color:var(--nc-text-secondary);font-size:12px;">${group.description || ""}</div>
                    </div>
                  </div>
                  <span style="color:var(--nc-text-secondary);font-size:12px;">${group.targets.length > 0 ? group.targets.length + " target(s)" : "All devices"}</span>
                </div>
                ${group.targets.length > 0 ? html`<div style="margin-top:8px;display:flex;gap:4px;flex-wrap:wrap;">
                  ${group.targets.map((t) => html`<span style="background:var(--nc-bg-secondary);padding:2px 8px;border-radius:4px;font-size:11px;">${t}</span>`)}
                </div>` : ""}
              </div>`)}
          </div>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "notification-center-panel": NotificationCenterPanel;
  }
}
