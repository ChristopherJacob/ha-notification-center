import { LitElement } from "lit";
import type { NotificationRule, NotificationGroup } from "../data/websocket";
export declare class RuleEditorDialog extends LitElement {
    rule: NotificationRule | null;
    groups: NotificationGroup[];
    open: boolean;
    private _name;
    private _description;
    private _enabled;
    private _targetGroup;
    private _priorityOverride;
    private _conditions;
    static styles: import("lit").CSSResult;
    updated(changed: Map<string, any>): void;
    private _addCondition;
    private _removeCondition;
    private _updateCondition;
    private _save;
    private _delete;
    close(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "rule-editor-dialog": RuleEditorDialog;
    }
}
