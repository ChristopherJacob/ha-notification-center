import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { NotificationGroup } from "../data/websocket";

@customElement("group-editor-dialog")
export class GroupEditorDialog extends LitElement {
  @property({ type: Object }) group: NotificationGroup | null = null;
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private _name = "";
  @state() private _description = "";
  @state() private _icon = "mdi:bell-ring";
  @state() private _targets = "";
  @state() private _availableServices: string[] = [];
  @state() private _selectedServices: Set<string> = new Set();
  @state() private _useChecklist = true;

  static styles = css`
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 1000;
    }
    :host([open]) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }
    .dialog {
      position: relative;
      background: var(--card-background-color, #fff);
      border-radius: 16px;
      padding: 24px;
      width: 90%;
      max-width: 540px;
      max-height: 85vh;
      overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    .dialog h2 {
      margin: 0 0 20px 0;
      font-size: 20px;
      font-weight: 500;
    }
    .field {
      margin-bottom: 16px;
    }
    .field label {
      display: block;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color, #757575);
      margin-bottom: 4px;
    }
    .field input,
    .field textarea,
    .field select {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
      box-sizing: border-box;
    }
    .field textarea {
      resize: vertical;
      min-height: 60px;
    }
    .field .hint {
      font-size: 11px;
      color: var(--secondary-text-color, #757575);
      margin-top: 4px;
    }
    .icon-preview {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }

    /* Checklist styles */
    .checklist {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 8px;
    }
    .checklist-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.15s;
    }
    .checklist-item:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .checklist-item input[type="checkbox"] {
      width: auto;
      margin: 0;
      cursor: pointer;
    }
    .checklist-item .device-icon {
      font-size: 18px;
      width: 24px;
      text-align: center;
      flex-shrink: 0;
    }
    .checklist-item .device-name {
      flex: 1;
    }
    .checklist-item .device-id {
      font-size: 11px;
      color: var(--secondary-text-color, #757575);
    }
    .empty-services {
      text-align: center;
      padding: 16px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .mode-toggle {
      display: flex;
      gap: 4px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 6px;
      padding: 2px;
    }
    .mode-toggle button {
      flex: 1;
      padding: 6px 12px;
      border: none;
      border-radius: 5px;
      background: transparent;
      font-size: 12px;
      cursor: pointer;
      color: var(--secondary-text-color);
    }
    .mode-toggle button.active {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    button {
      padding: 10px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-save {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .btn-save:hover {
      filter: brightness(1.1);
    }
    .btn-cancel {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color, #212121);
    }
    .btn-delete {
      background: #ffebee;
      color: #c62828;
      margin-right: auto;
    }
    .btn-select-all {
      background: none;
      border: none;
      color: var(--primary-color, #03a9f4);
      font-size: 12px;
      cursor: pointer;
      padding: 4px 8px;
      font-weight: 400;
    }
  `;

  updated(changed: Map<string, any>) {
    if (changed.has("open") && this.open) {
      if (this.group) {
        this._name = this.group.name;
        this._description = this.group.description || "";
        this._icon = this.group.icon || "mdi:bell-ring";
        this._targets = (this.group.targets || []).join("\n");
        this._selectedServices = new Set(this.group.targets || []);
      } else {
        this._name = "";
        this._description = "";
        this._icon = "mdi:bell-ring";
        this._targets = "";
        this._selectedServices = new Set();
      }
      this._loadServices();
    }
  }

  private _loadServices() {
    try {
      const haApp = document.querySelector("home-assistant") as any;
      const haMain = document.querySelector("home-assistant-main") as any;
      const hass = haApp?.hass || haMain?.hass;
      if (!hass?.services) return;

      const notifyServices = hass.services.notify || {};
      // Filter to mobile_app services only
      const services: string[] = [];
      for (const name of Object.keys(notifyServices)) {
        if (name.startsWith("mobile_app_")) {
          services.push(`notify.${name}`);
        }
      }
      this._availableServices = services;
    } catch {
      // Silently fail — user can still type manually
    }
  }

  private _toggleService(service: string) {
    const next = new Set(this._selectedServices);
    if (next.has(service)) {
      next.delete(service);
    } else {
      next.add(service);
    }
    this._selectedServices = next;
    // Sync to textarea
    this._targets = [...next].join("\n");
  }

  private _selectAll() {
    const all = new Set(this._availableServices);
    this._selectedServices = all;
    this._targets = [...all].join("\n");
  }

  private _clearAll() {
    this._selectedServices = new Set();
    this._targets = "";
  }

  private _save() {
    const targets = this._useChecklist
      ? [...this._selectedServices]
      : this._targets
          .split("\n")
          .map((t) => t.trim())
          .filter((t) => t.length > 0);

    const group: NotificationGroup = {
      id: this.group?.id || `group_${Date.now()}`,
      name: this._name || "Untitled Group",
      description: this._description,
      icon: this._icon,
      targets: targets,
    };

    this.dispatchEvent(
      new CustomEvent("group-save", {
        detail: group,
        bubbles: true,
        composed: true,
      })
    );
    this.close();
  }

  private _delete() {
    if (this.group) {
      this.dispatchEvent(
        new CustomEvent("group-delete", {
          detail: this.group.id,
          bubbles: true,
          composed: true,
        })
      );
    }
    this.close();
  }

  close() {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent("dialog-close", { bubbles: true, composed: true })
    );
  }

  render() {
    if (!this.open) return html``;

    const commonIcons = [
      "mdi:bell-ring",
      "mdi:cellphone",
      "mdi:tablet",
      "mdi:speaker",
      "mdi:account-group",
      "mdi:home",
      "mdi:star",
    ];

    return html`
      <div class="backdrop" @click=${this.close}></div>
      <div class="dialog">
        <h2>
          ${this.group?.id && this.group.id !== "all_devices"
            ? "Edit Group"
            : "New Group"}
        </h2>
        <div class="field">
          <label>Name</label>
          <input
            .value=${this._name}
            @input=${(e: Event) =>
              (this._name = (e.target as HTMLInputElement).value)}
            placeholder="e.g., Phones Only"
            ?disabled=${this.group?.id === "all_devices"}
          />
        </div>
        <div class="field">
          <label>Description</label>
          <input
            .value=${this._description}
            @input=${(e: Event) =>
              (this._description = (e.target as HTMLInputElement).value)}
            placeholder="Optional description"
          />
        </div>
        <div class="field">
          <label>Icon</label>
          <div class="icon-preview">
            <ha-icon icon=${this._icon}></ha-icon>
            <select
              .value=${this._icon}
              @change=${(e: Event) =>
                (this._icon = (e.target as HTMLSelectElement).value)}
            >
              ${commonIcons.map(
                (i) => html`<option value=${i}>${i}</option>`
              )}
            </select>
          </div>
        </div>
        <div class="field">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <label>Targets</label>
            <div style="display:flex;gap:8px;">
              <button class="btn-select-all" @click=${this._selectAll}>All</button>
              <button class="btn-select-all" @click=${this._clearAll}>Clear</button>
            </div>
          </div>

          <!-- Mode toggle -->
          <div class="mode-toggle">
            <button
              class=${this._useChecklist ? "active" : ""}
              @click=${() => (this._useChecklist = true)}
            >
              Checklist
            </button>
            <button
              class=${!this._useChecklist ? "active" : ""}
              @click=${() => (this._useChecklist = false)}
            >
              Manual
            </button>
          </div>

          ${this._useChecklist
            ? html`
                <div class="checklist">
                  ${this._availableServices.length === 0
                    ? html`<div class="empty-services">Loading services…</div>`
                    : this._availableServices.map(
                        (svc) => html`
                          <div
                            class="checklist-item"
                            @click=${() => this._toggleService(svc)}
                          >
                            <input
                              type="checkbox"
                              .checked=${this._selectedServices.has(svc)}
                              @click=${(e: Event) => e.stopPropagation()}
                              @change=${() => this._toggleService(svc)}
                            />
                            <span class="device-icon">
                              ${svc.includes("ipad") ? "📱" : "📲"}
                            </span>
                            <span class="device-name">
                              ${svc.replace("notify.mobile_app_", "").replace(/_/g, " ")}
                            </span>
                            <span class="device-id">${svc}</span>
                          </div>
                        `
                      )}
                </div>
                <div class="hint" style="margin-top:4px;">
                  ${this._selectedServices.size} device(s) selected
                </div>
              `
            : html`
                <textarea
                  .value=${this._targets}
                  @input=${(e: Event) =>
                    (this._targets = (e.target as HTMLTextAreaElement).value)}
                  placeholder="notify.mobile_app_iphone&#10;notify.mobile_app_pixel"
                  rows="4"
                ></textarea>
                <div class="hint">
                  One per line. Leave empty for all devices.
                </div>
              `}
        </div>
        <div class="actions">
          ${this.group?.id && this.group.id !== "all_devices"
            ? html`<button class="btn-delete" @click=${this._delete}>
                Delete
              </button>`
            : ""}
          <button class="btn-cancel" @click=${this.close}>Cancel</button>
          <button class="btn-save" @click=${this._save}>Save Group</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "group-editor-dialog": GroupEditorDialog;
  }
}
