import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { NotificationRule, RuleCondition, NotificationGroup } from "../data/websocket";

@customElement("rule-editor-dialog")
export class RuleEditorDialog extends LitElement {
  @property({ type: Object }) rule: NotificationRule | null = null;
  @property({ type: Array }) groups: NotificationGroup[] = [];
  @property({ type: Boolean }) open = false;

  @state() private _name = "";
  @state() private _description = "";
  @state() private _enabled = true;
  @state() private _targetGroup = "all_devices";
  @state() private _priorityOverride = "";
  @state() private _conditions: RuleCondition[] = [];

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
      max-width: 560px;
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
    .field select,
    .field textarea {
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
      min-height: 50px;
    }
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .toggle-row span {
      font-size: 14px;
    }
    .condition-row {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .condition-row select,
    .condition-row input {
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      font-size: 13px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
    }
    .condition-row input {
      width: 120px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      background: var(--secondary-background-color, #f5f5f5);
      border-radius: 16px;
      font-size: 12px;
    }
    .chip button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      padding: 0;
      line-height: 1;
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
    .add-btn {
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-color, #03a9f4);
      font-size: 13px;
      padding: 8px 16px;
      margin-top: 8px;
    }
  `;

  updated(changed: Map<string, any>) {
    if (changed.has("open") && this.open && this.rule) {
      this._name = this.rule.name;
      this._description = this.rule.description || "";
      this._enabled = this.rule.enabled;
      this._targetGroup = this.rule.target_group;
      this._priorityOverride = this.rule.priority_override || "";
      this._conditions = [...(this.rule.conditions || [])];
    }
  }

  private _addCondition() {
    this._conditions = [
      ...this._conditions,
      { type: "priority", values: ["normal"] },
    ];
  }

  private _removeCondition(idx: number) {
    this._conditions = this._conditions.filter((_, i) => i !== idx);
  }

  private _updateCondition(idx: number, updates: Partial<RuleCondition>) {
    this._conditions = this._conditions.map((c, i) =>
      i === idx ? { ...c, ...updates } : c
    );
  }

  private _save() {
    const rule: NotificationRule = {
      id: this.rule?.id || `rule_${Date.now()}`,
      name: this._name || "Untitled Rule",
      description: this._description,
      enabled: this._enabled,
      conditions: this._conditions,
      target_group: this._targetGroup,
      priority_override: this._priorityOverride || null,
    };
    this.dispatchEvent(
      new CustomEvent("rule-save", { detail: rule, bubbles: true, composed: true })
    );
    this.close();
  }

  private _delete() {
    if (this.rule) {
      this.dispatchEvent(
        new CustomEvent("rule-delete", {
          detail: this.rule.id,
          bubbles: true,
          composed: true,
        })
      );
    }
    this.close();
  }

  close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("dialog-close", { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open) return html``;

    const conditionTypes = ["priority", "time_range", "presence", "keyword"];
    const priorityOptions = ["low", "normal", "high", "urgent"];

    return html`
      <div class="backdrop" @click=${this.close}></div>
      <div class="dialog">
        <h2>${this.rule?.id && this.rule.id !== "default" ? "Edit Rule" : "New Rule"}</h2>

        <div class="field">
          <label>Name</label>
          <input
            .value=${this._name}
            @input=${(e: Event) => (this._name = (e.target as HTMLInputElement).value)}
            placeholder="e.g., Quiet Hours"
          />
        </div>

        <div class="field">
          <label>Description</label>
          <input
            .value=${this._description}
            @input=${(e: Event) => (this._description = (e.target as HTMLInputElement).value)}
            placeholder="Optional description"
          />
        </div>

        <div class="field">
          <div class="toggle-row">
            <span>Enabled</span>
            <input
              type="checkbox"
              .checked=${this._enabled}
              @change=${(e: Event) => (this._enabled = (e.target as HTMLInputElement).checked)}
            />
          </div>
        </div>

        <div class="field">
          <label>Target Group</label>
          <select
            .value=${this._targetGroup}
            @change=${(e: Event) => (this._targetGroup = (e.target as HTMLSelectElement).value)}
          >
            ${this.groups.map(
              (g) => html`<option value=${g.id}>${g.name}</option>`
            )}
          </select>
        </div>

        <div class="field">
          <label>Priority Override (optional)</label>
          <select
            .value=${this._priorityOverride}
            @change=${(e: Event) => (this._priorityOverride = (e.target as HTMLSelectElement).value)}
          >
            <option value="">None</option>
            ${priorityOptions.map(
              (p) => html`<option value=${p}>${p}</option>`
            )}
          </select>
        </div>

        <div class="field">
          <label>Conditions</label>
          ${this._conditions.map(
            (cond, idx) => html`
              <div class="condition-row">
                <select
                  .value=${cond.type}
                  @change=${(e: Event) =>
                    this._updateCondition(idx, {
                      type: (e.target as HTMLSelectElement).value as any,
                    })}
                >
                  ${conditionTypes.map(
                    (t) => html`<option value=${t}>${t}</option>`
                  )}
                </select>
                ${cond.type === "priority"
                  ? html`
                      <div class="chip">
                        ${priorityOptions.map(
                          (p) => html`
                            <label style="display:inline-flex;align-items:center;gap:2px;cursor:pointer;margin:0 2px;">
                              <input
                                type="checkbox"
                                .checked=${cond.values?.includes(p) || false}
                                @change=${(e: Event) => {
                                  const checked = (e.target as HTMLInputElement).checked;
                                  const vals = cond.values || [];
                                  this._updateCondition(idx, {
                                    values: checked
                                      ? [...vals, p]
                                      : vals.filter((v) => v !== p),
                                  });
                                }}
                                style="margin:0;"
                              />
                              ${p}
                            </label>
                          `
                        )}
                      </div>
                    `
                  : cond.type === "time_range"
                  ? html`
                      <input
                        type="time"
                        .value=${cond.after || ""}
                        @change=${(e: Event) =>
                          this._updateCondition(idx, {
                            after: (e.target as HTMLInputElement).value,
                          })}
                        placeholder="After"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        .value=${cond.before || ""}
                        @change=${(e: Event) =>
                          this._updateCondition(idx, {
                            before: (e.target as HTMLInputElement).value,
                          })}
                        placeholder="Before"
                      />
                    `
                  : cond.type === "presence"
                  ? html`
                      <input
                        .value=${cond.entity_id || ""}
                        @input=${(e: Event) =>
                          this._updateCondition(idx, {
                            entity_id: (e.target as HTMLInputElement).value,
                          })}
                        placeholder="person.name"
                      />
                      <select
                        .value=${cond.state || "home"}
                        @change=${(e: Event) =>
                          this._updateCondition(idx, {
                            state: (e.target as HTMLSelectElement).value,
                          })}
                      >
                        <option value="home">home</option>
                        <option value="not_home">not_home</option>
                      </select>
                    `
                  : cond.type === "keyword"
                  ? html`
                      <input
                        .value=${cond.value || ""}
                        @input=${(e: Event) =>
                          this._updateCondition(idx, {
                            value: (e.target as HTMLInputElement).value,
                          })}
                        placeholder="garage"
                      />
                    `
                  : ""}
                <button
                  style="background:none;border:none;cursor:pointer;font-size:18px;color:#c62828;padding:0 4px;"
                  @click=${() => this._removeCondition(idx)}
                >
                  ×
                </button>
              </div>
            `
          )}
          <button class="add-btn" @click=${this._addCondition}>
            + Add Condition
          </button>
        </div>

        <div class="actions">
          ${this.rule?.id && this.rule.id !== "default"
            ? html`<button class="btn-delete" @click=${this._delete}>Delete</button>`
            : ""}
          <button class="btn-cancel" @click=${this.close}>Cancel</button>
          <button class="btn-save" @click=${this._save}>Save Rule</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "rule-editor-dialog": RuleEditorDialog;
  }
}
