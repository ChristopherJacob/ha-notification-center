import { LitElement } from "lit";
import "./components/rule-editor-dialog";
import "./components/group-editor-dialog";
import type { RuleEditorDialog } from "./components/rule-editor-dialog";
import type { GroupEditorDialog } from "./components/group-editor-dialog";
export declare class NotificationCenterPanel extends LitElement {
    private _tab;
    private _notifications;
    private _rules;
    private _groups;
    private _unreadCount;
    private _loading;
    private _error;
    private _ruleDialogOpen;
    private _editingRule;
    private _groupDialogOpen;
    private _editingGroup;
    private _dragIdx;
    private _dropIdx;
    _ruleDialog: RuleEditorDialog;
    _groupDialog: GroupEditorDialog;
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    private _callWS;
    private _loadData;
    private _openRuleEditor;
    private _handleRuleSave;
    private _handleRuleDelete;
    private _handleRuleReorder;
    private _openGroupEditor;
    private _handleGroupSave;
    private _handleGroupDelete;
    private _handleToggleRead;
    private _handleMarkAllRead;
    render(): import("lit-html").TemplateResult<1>;
    private _renderInbox;
    private _renderRules;
    private _onDragStart;
    private _onDragOver;
    private _onDragLeave;
    private _onDrop;
    private _onDragEnd;
    private _renderGroups;
}
declare global {
    interface HTMLElementTagNameMap {
        "notification-center-panel": NotificationCenterPanel;
    }
}
