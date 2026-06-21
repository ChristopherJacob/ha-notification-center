import { css } from "lit";

export const sharedStyles = css`
  :host {
    --nc-primary: var(--primary-color, #03a9f4);
    --nc-primary-text: var(--text-primary-color, #ffffff);
    --nc-bg: var(--card-background-color, #ffffff);
    --nc-bg-secondary: var(--secondary-background-color, #f5f5f5);
    --nc-text: var(--primary-text-color, #212121);
    --nc-text-secondary: var(--secondary-text-color, #757575);
    --nc-border: var(--divider-color, #e0e0e0);
    --nc-radius: 12px;
    --nc-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    --nc-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
    --nc-transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    font-family: var(
      --paper-font-common-base_-_font-family,
      "Roboto",
      sans-serif
    );
    color: var(--nc-text);
    height: 100%;
    overflow-y: auto;
  }

  .nc-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 24px;
  }

  .nc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--nc-border);
  }

  .nc-header h1 {
    font-size: 28px;
    font-weight: 500;
    margin: 0;
    color: var(--nc-text);
  }

  .nc-tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 24px;
    background: var(--nc-bg-secondary);
    border-radius: var(--nc-radius);
    padding: 4px;
  }

  .nc-tab {
    flex: 1;
    padding: 10px 20px;
    border: none;
    border-radius: calc(var(--nc-radius) - 4px);
    background: transparent;
    color: var(--nc-text-secondary);
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all var(--nc-transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .nc-tab.active {
    background: var(--nc-bg);
    color: var(--nc-primary);
    box-shadow: var(--nc-shadow);
  }

  .nc-tab:hover:not(.active) {
    color: var(--nc-text);
  }

  .nc-badge {
    background: var(--nc-primary);
    color: var(--nc-primary-text);
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
    min-width: 20px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .nc-empty-state {
    text-align: center;
    padding: 48px 24px;
    color: var(--nc-text-secondary);
  }

  .nc-empty-state ha-icon {
    --mdc-icon-size: 64px;
    color: var(--nc-border);
    margin-bottom: 16px;
  }

  .nc-empty-state h3 {
    font-weight: 400;
    margin: 8px 0;
  }

  .nc-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all var(--nc-transition);
    background: var(--nc-bg-secondary);
    color: var(--nc-text);
  }

  .nc-btn:hover {
    background: #e8e8e8;
  }

  .nc-btn.primary {
    background: var(--nc-primary);
    color: var(--nc-primary-text);
  }

  .nc-btn.primary:hover {
    filter: brightness(1.1);
  }

  .nc-btn.danger {
    background: #ffebee;
    color: #c62828;
  }

  .nc-btn.danger:hover {
    background: #ffcdd2;
  }

  .nc-card {
    background: var(--nc-bg);
    border-radius: var(--nc-radius);
    box-shadow: var(--nc-shadow);
    padding: 16px 20px;
    transition: box-shadow var(--nc-transition);
  }

  .nc-card:hover {
    box-shadow: var(--nc-shadow-hover);
  }

  /* Priority colors */
  .priority-urgent {
    --priority-color: #d32f2f;
    --priority-bg: #ffebee;
  }
  .priority-high {
    --priority-color: #f57c00;
    --priority-bg: #fff3e0;
  }
  .priority-normal {
    --priority-color: var(--nc-primary);
    --priority-bg: #e3f2fd;
  }
  .priority-low {
    --priority-color: var(--nc-text-secondary);
    --priority-bg: var(--nc-bg-secondary);
  }

  .pulse {
    animation: nc-pulse 2s ease-in-out infinite;
  }

  @keyframes nc-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--nc-border);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--nc-text-secondary);
  }
`;
