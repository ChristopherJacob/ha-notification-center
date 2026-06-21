import { LitElement } from "lit";
import type { NotificationGroup } from "../data/websocket";
export declare class GroupEditorDialog extends LitElement {
    group: NotificationGroup | null;
    open: boolean;
    private _name;
    private _description;
    private _icon;
    private _targets;
    private _availableServices;
    private _selectedServices;
    private _useChecklist;
    static styles: import("lit").CSSResult;
    updated(changed: Map<string, any>): void;
    private _loadServices;
    private _toggleService;
    private _selectAll;
    private _clearAll;
    private _save;
    private _delete;
    close(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "group-editor-dialog": GroupEditorDialog;
    }
}
