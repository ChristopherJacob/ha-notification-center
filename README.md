# 🔔 Notification Center for Home Assistant

**A beautiful, intelligent notification routing hub for Home Assistant.**

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![License](https://img.shields.io/github/license/ChristopherJacob/ha-notification-center?style=for-the-badge)](LICENSE)

---

## ✨ Features

- **🛡️ Transparent Proxy** — Replace `notify.mobile_app_*` with `notify.notification_center`
- **📋 Rule Engine** — First-match-wins rules with time, presence, priority, and keyword conditions
- **👥 Groups** — Named collections of notify targets with checkbox UI
- **📬 Inbox** — Full notification history with read/unread and priority badges
- **🎨 Custom Panel** — Sidebar panel with Inbox, Rules (full editor), and Groups tabs
- **🃏 Lovelace Card** — "Recent notifications" card for any dashboard
- **🔴 Priority Levels** — Urgent / High / Normal / Low with color coding

---

## 📥 Installation

### Option 1: HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=ChristopherJacob&repository=ha-notification-center&category=integration)

1. Click the badge above, or in HACS go to **Integrations** → **⋮** → **Custom repositories**
2. Add `https://github.com/ChristopherJacob/ha-notification-center` as type **Integration**
3. Click **Install** → **Restart Home Assistant**

### Option 2: Manual Install

```bash
cd /config/custom_components
git clone https://github.com/ChristopherJacob/ha-notification-center.git
mv ha-notification-center/custom_components/notification_center .
rm -rf ha-notification-center

# Copy frontend files to www (required for panel)
mkdir -p /config/www/notification_center
cp -r notification_center/frontend/* /config/www/notification_center/
```

Then restart Home Assistant.

### Post-Install

1. **Settings** → **Devices & Services** → **Add Integration** → "Notification Center"
2. Configure max history (default: 500)
3. The 🔔 **Notification Center** panel appears in your sidebar

---

## 🚀 Quick Start

In any automation, replace your notify target:

```yaml
# Before:
action: notify.mobile_app_my_phone
data:
  message: "Garage door left open!"
  title: "Garage Alert"
```

```yaml
# After:
action: notify.notification_center
data:
  message: "Garage door left open!"
  title: "Garage Alert"
  data:
    priority: high
```

---

## ⚙️ Rules & Groups

Open the **Notification Center** panel from the sidebar:

### Rules Tab
- **+ New Rule** — Full editor with condition builder
- Click any rule to edit
- Condition types: Priority, Time Range, Presence, Keyword
- Rules evaluate in order — **first match wins**

### Groups Tab
- **+ New Group** — Checkbox list auto-discovers your devices
- Or switch to Manual mode for custom targets
- "All Devices" group (default) targets every mobile device

---

## 🖥️ Lovelace Card

Add a "recent notifications" card to any dashboard:

1. **Settings** → **Dashboards** → **Resources** → **Add Resource**
2. URL: `/local/notification_center/notification-center-card.js`
3. Type: JavaScript Module

Then add a Manual card:
```yaml
type: custom:notification-center-card
max_items: 5
```

---

## 🧪 Testing

```bash
# Run the test suite
python3 tests/test_rules.py
```

Tests cover: rule engine logic (priority, time range, presence, keyword), group CRUD, overnight time ranges, manifest validation, and frontend build verification.

---

## 🏗️ Architecture

```
Automations → notify.notification_center (proxy) → Rule Engine → Groups → mobile_app_* devices
                                            ↓
                                   Notification Store (JSON history)
                                            ↓
                              Custom Panel + Lovelace Card
```

---

## 🔧 Development

```bash
git clone https://github.com/ChristopherJacob/ha-notification-center.git
cd ha-notification-center/frontend
npm install
npm run build        # also copies to custom_components/
```

Deploy to your HA instance:
```bash
rsync -r custom_components/notification_center/ user@ha:/config/custom_components/notification_center/
ssh user@ha "sudo cp -r /config/custom_components/notification_center/frontend/* /config/www/notification_center/"
```

---

## 📄 License

MIT © [ChristopherJacob](https://github.com/ChristopherJacob)
