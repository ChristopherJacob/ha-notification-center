import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { NotificationGroup } from "../data/websocket";

@customElement("group-editor-dialog")
export class GroupEditorDialog extends LitElement {
  @property({ type: Object }) group: NotificationGroup | null = null;
  @property({ type: Boolean }) open = false;

  @state() private _name = "";
  @state() private _description = "";
  @state() private _icon = "mdi:bell-ring";
  @state() private _targets = "";

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
      max-width: 500px;
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
  `;

  updated(changed: Map<string, any>) {
    if (changed.has("open") && this.open && this.group) {
      this._name = this.group.name;
      this._description = this.group.description || "";
      this._icon = this.group.icon || "mdi:bell-ring";
      this._targets = (this.group.targets || []).join("\n");
    }
  }

  private _save() {
    const targets = this._targets
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
          <label>Targets (one per line)</label>
          <textarea
            .value=${this._targets}
            @input=${(e: Event) =>
              (this._targets = (e.target as HTMLTextAreaElement).value)}
            placeholder="notify.mobile_app_iphone&#10;notify.mobile_app_pixel"
            rows="4"
          ></textarea>
          <div class="hint">
            Leave empty to target all mobile devices. Format:
            notify.mobile_app_name
          </div>
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
