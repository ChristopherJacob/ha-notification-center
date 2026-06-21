import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { sharedStyles } from "./styles/shared";
import type {
  NotificationEntry,
  NotificationRule,
  NotificationGroup,
} from "./data/websocket";
import "./components/rule-editor-dialog";
import "./components/group-editor-dialog";
import type { RuleEditorDialog } from "./components/rule-editor-dialog";
import type { GroupEditorDialog } from "./components/group-editor-dialog";

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

  // Dialog state
  @state() private _ruleDialogOpen = false;
  @state() private _editingRule: NotificationRule | null = null;
  @state() private _groupDialogOpen = false;
  @state() private _editingGroup: NotificationGroup | null = null;

  // Drag state
  @state() private _dragIdx: number | null = null;
  @state() private _dropIdx: number | null = null;

  @query("rule-editor-dialog") _ruleDialog!: RuleEditorDialog;
  @query("group-editor-dialog") _groupDialog!: GroupEditorDialog;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex; flex-direction: column; height: 100%;
      }
      .nc-content { flex: 1; overflow-y: auto; }
      .nc-loading {
        display: flex; align-items: center; justify-content: center;
        height: 100%; font-size: 16px; color: var(--secondary-text-color);
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => this._loadData(), 100);
  }

  private async _callWS(type: string, extra: Record<string, any> = {}): Promise<any> {
    const haApp = document.querySelector("home-assistant") as any;
    if (haApp?.hass) return haApp.hass.callWS({ type, ...extra });
    const haMain = document.querySelector("home-assistant-main") as any;
    if (haMain?.hass) return haMain.hass.callWS({ type, ...extra });
    throw new Error("Cannot access Home Assistant WebSocket");
  }

  private async _loadData() {
    this._loading = true; this._error = null;
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

  // ── Rule CRUD ──────────────────────────────────

  private _openRuleEditor(rule?: NotificationRule) {
    this._editingRule = rule || null;
    this._ruleDialogOpen = true;
  }

  private async _handleRuleSave(e: CustomEvent) {
    const rule = e.detail as NotificationRule;
    const existing = this._rules.findIndex((r) => r.id === rule.id);
    let newRules: NotificationRule[];
    if (existing >= 0) {
      newRules = this._rules.map((r) => (r.id === rule.id ? rule : r));
    } else {
      newRules = [...this._rules, rule];
    }
    await this._callWS("notification_center/save_rules", { rules: newRules });
    this._rules = newRules;
    this.requestUpdate();
  }

  private async _handleRuleDelete(e: CustomEvent) {
    const ruleId = e.detail as string;
    const newRules = this._rules.filter((r) => r.id !== ruleId);
    if (newRules.length === 0) return; // keep at least one
    await this._callWS("notification_center/save_rules", { rules: newRules });
    this._rules = newRules;
    this.requestUpdate();
  }

  private async _handleRuleReorder(fromIdx: number, toIdx: number) {
    const newRules = [...this._rules];
    const [moved] = newRules.splice(fromIdx, 1);
    newRules.splice(toIdx, 0, moved);
    await this._callWS("notification_center/save_rules", { rules: newRules });
    this._rules = newRules;
    this.requestUpdate();
  }

  // ── Group CRUD ─────────────────────────────────

  private _openGroupEditor(group?: NotificationGroup) {
    this._editingGroup = group || null;
    this._groupDialogOpen = true;
  }

  private async _handleGroupSave(e: CustomEvent) {
    const group = e.detail as NotificationGroup;
    const existing = this._groups.findIndex((g) => g.id === group.id);
    let newGroups: NotificationGroup[];
    if (existing >= 0) {
      newGroups = this._groups.map((g) => (g.id === group.id ? group : g));
    } else {
      newGroups = [...this._groups, group];
    }
    await this._callWS("notification_center/save_groups", { groups: newGroups });
    this._groups = newGroups;
    this.requestUpdate();
  }

  private async _handleGroupDelete(e: CustomEvent) {
    const groupId = e.detail as string;
    const newGroups = this._groups.filter((g) => g.id !== groupId);
    await this._callWS("notification_center/save_groups", { groups: newGroups });
    this._groups = newGroups;
    this.requestUpdate();
  }

  // ── Inbox ──────────────────────────────────────

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

  // ── Render ─────────────────────────────────────

  render() {
    if (this._loading) return html`<div class="nc-loading">Loading…</div>`;
    if (this._error) return html`
      <div class="nc-empty-state">
        <ha-icon icon="mdi:alert-circle"></ha-icon>
        <h3>Connection Error</h3>
        <p style="font-size:12px;">${this._error}</p>
        <button class="nc-btn primary" @click=${this._loadData}>Retry</button>
      </div>`;

    return html`
      <div class="nc-content">
        <div class="nc-container">
          <div class="nc-tabs">
            <button class="nc-tab ${this._tab==='inbox'?'active':''}" @click=${()=>this._tab='inbox'}>
              <ha-icon icon="mdi:inbox"></ha-icon> Inbox
              ${this._unreadCount>0?html`<span class="nc-badge">${this._unreadCount}</span>`:''}
            </button>
            <button class="nc-tab ${this._tab==='rules'?'active':''}" @click=${()=>this._tab='rules'}>
              <ha-icon icon="mdi:routes"></ha-icon> Rules
            </button>
            <button class="nc-tab ${this._tab==='groups'?'active':''}" @click=${()=>this._tab='groups'}>
              <ha-icon icon="mdi:account-group"></ha-icon> Groups
            </button>
          </div>
          ${this._tab==='inbox'?this._renderInbox():this._tab==='rules'?this._renderRules():this._renderGroups()}
        </div>
      </div>

      <!-- Dialogs -->
      <rule-editor-dialog
        .open=${this._ruleDialogOpen}
        .rule=${this._editingRule}
        .groups=${this._groups}
        @rule-save=${this._handleRuleSave}
        @rule-delete=${this._handleRuleDelete}
        @dialog-close=${() => (this._ruleDialogOpen = false)}
      ></rule-editor-dialog>

      <group-editor-dialog
        .open=${this._groupDialogOpen}
        .group=${this._editingGroup}
        @group-save=${this._handleGroupSave}
        @group-delete=${this._handleGroupDelete}
        @dialog-close=${() => (this._groupDialogOpen = false)}
      ></group-editor-dialog>
    `;
  }

  private _renderInbox() {
    if (!this._notifications.length) return html`
      <div class="nc-empty-state">
        <ha-icon icon="mdi:bell-off-outline"></ha-icon>
        <h3>No notifications yet</h3>
        <p>Send via notify.notification_center to see them here.</p>
      </div>`;

    return html`
      <div class="nc-header">
        <h1>Inbox</h1>
        ${this._unreadCount>0?html`<button class="nc-btn" @click=${this._handleMarkAllRead}>Mark all read</button>`:''}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${this._notifications.map(n=>html`
          <div class="nc-card priority-${n.priority}">
            <div style="display:flex;align-items:flex-start;gap:12px;cursor:pointer;" @click=${()=>this._handleToggleRead(n)}>
              <div style="width:10px;height:10px;border-radius:50%;margin-top:4px;flex-shrink:0;background:${n.read?'transparent':'var(--priority-color,var(--nc-primary))'}"></div>
              <div style="flex:1;min-width:0;">
                <div style="display:flex;justify-content:space-between;gap:8px;">
                  <strong style="font-weight:${n.read?'400':'600'};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${n.title||'No title'}</strong>
                  <span class="nc-badge" style="background:var(--priority-bg,#e3f2fd);color:var(--priority-color,var(--nc-primary));font-size:11px;">${n.priority}</span>
                </div>
                <div style="color:var(--nc-text-secondary);font-size:13px;margin-top:4px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${n.message}</div>
                <div style="color:var(--nc-text-secondary);font-size:11px;margin-top:8px;display:flex;gap:12px;">
                  <span>${n.timestamp}</span><span>Rule: ${n.matched_rule}</span>
                </div>
              </div>
            </div>
          </div>`)}
      </div>`;
  }

  private _renderRules() {
    return html`
      <div class="nc-header">
        <h1>Notification Rules</h1>
        <button class="nc-btn primary" @click=${()=>this._openRuleEditor()}>+ New Rule</button>
      </div>
      <div style="color:var(--nc-text-secondary);font-size:13px;margin-bottom:16px;">
        First match wins — drag to reorder
      </div>
      ${!this._rules.length?html`<div class="nc-empty-state"><ha-icon icon="mdi:routes"></ha-icon><h3>No rules</h3></div>`:
        html`<div style="display:flex;flex-direction:column;gap:4px;">
          ${this._rules.map((rule,idx)=>html`
            <div
              class="nc-card"
              style="cursor:grab;transition:all 0.15s;opacity:${this._dragIdx===idx?'0.4':'1'};border-left:${this._dropIdx===idx?'3px solid var(--nc-primary)':'3px solid transparent'};${this._dropIdx===idx?'margin-top:8px;':''}"
              draggable="true"
              @dragstart=${(e:DragEvent)=>this._onDragStart(e,idx)}
              @dragover=${(e:DragEvent)=>this._onDragOver(e,idx)}
              @dragleave=${()=>this._onDragLeave(idx)}
              @drop=${(e:DragEvent)=>this._onDrop(e,idx)}
              @dragend=${()=>this._onDragEnd()}
              @click=${()=>this._openRuleEditor(rule)}
            >
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="cursor:grab;color:var(--nc-text-secondary);font-size:18px;user-select:none;" @click=${(e:Event)=>e.stopPropagation()}>⋮⋮</span>
                  <span style="color:var(--nc-text-secondary);font-size:13px;font-weight:600;min-width:24px;">#${idx+1}</span>
                  <div>
                    <div style="font-weight:500;">${rule.name}</div>
                    <div style="color:var(--nc-text-secondary);font-size:12px;">${rule.description||''}</div>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  ${rule.enabled?html`<span style="color:#4caf50;font-size:12px;">Enabled</span>`:html`<span style="color:var(--nc-text-secondary);font-size:12px;">Disabled</span>`}
                  <span style="color:var(--nc-text-secondary);font-size:12px;">→ ${rule.target_group}</span>
                  ${rule.conditions.length>0?html`<span style="color:var(--nc-text-secondary);font-size:11px;">${rule.conditions.length} cond</span>`:html`<span style="color:var(--nc-text-secondary);font-size:11px;font-style:italic;">Always</span>`}
                </div>
              </div>
            </div>`)}
          <div style="height:4px;border-radius:2px;background:${this._dropIdx===this._rules.length?'var(--nc-primary)':'transparent'};transition:all 0.15s;margin-top:4px;"></div>
        </div>`}
    `;
  }

  // ── Drag & Drop ─────────────────────────────────

  private _onDragStart(e: DragEvent, idx: number) {
    this._dragIdx = idx;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(idx));
    }
  }

  private _onDragOver(e: DragEvent, idx: number) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    this._dropIdx = idx;
  }

  private _onDragLeave(idx: number) {
    if (this._dropIdx === idx) this._dropIdx = null;
  }

  private async _onDrop(e: DragEvent, idx: number) {
    e.preventDefault();
    const fromIdx = this._dragIdx;
    this._dragIdx = null;
    this._dropIdx = null;

    if (fromIdx === null || fromIdx === idx) return;

    await this._handleRuleReorder(fromIdx, idx);
  }

  private _onDragEnd() {
    this._dragIdx = null;
    this._dropIdx = null;
  }

  private _renderGroups() {
    return html`
      <div class="nc-header">
        <h1>Notification Groups</h1>
        <button class="nc-btn primary" @click=${()=>this._openGroupEditor()}>+ New Group</button>
      </div>
      ${!this._groups.length?html`<div class="nc-empty-state"><ha-icon icon="mdi:account-group-outline"></ha-icon><h3>No groups</h3></div>`:
        html`<div style="display:flex;flex-direction:column;gap:8px;">
          ${this._groups.map(group=>html`
            <div class="nc-card" style="cursor:pointer;" @click=${()=>this._openGroupEditor(group)}>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <ha-icon icon=${group.icon||'mdi:bell-ring'}></ha-icon>
                  <div>
                    <div style="font-weight:500;">${group.name}</div>
                    <div style="color:var(--nc-text-secondary);font-size:12px;">${group.description||''}</div>
                  </div>
                </div>
                <span style="color:var(--nc-text-secondary);font-size:12px;">
                  ${group.targets.length>0?group.targets.length+' target(s)':'All devices'}
                </span>
              </div>
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
