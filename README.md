# 🔔 Notification Center for Home Assistant

**A beautiful, intelligent notification routing hub for Home Assistant.**

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/cjacob/ha-notification-center?style=for-the-badge)](https://github.com/cjacob/ha-notification-center/releases)
[![License](https://img.shields.io/github/license/cjacob/ha-notification-center?style=for-the-badge)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/badge/%F0%9F%94%94-Notify_Smarter-03a9f4?style=flat-square" alt="Notify Smarter" />
  <img src="https://img.shields.io/badge/%F0%9F%8E%AF-Rule_Based_Routing-4caf50?style=flat-square" alt="Rule Based Routing" />
  <img src="https://img.shields.io/badge/%F0%9F%93%AC-Notification_History-ff9800?style=flat-square" alt="Notification History" />
</p>

---

## ✨ What It Does

Notification Center acts as a **transparent proxy** for all your Home Assistant notifications. Instead of calling `notify.mobile_app_your_phone` directly, your automations call `notify.notification_center` — and let smart rules decide **who** gets notified, **when**, and **how**. Every notification is logged for a rich, searchable history.

### 🎯 Features

- **🛡️ Transparent Proxy** — Drop-in replacement for your existing notify calls
- **📋 Rule Engine** — First-match-wins rules with time, presence, priority, and keyword conditions
- **👥 Notification Groups** — Send to "Phones", "Speakers", "Everyone", or any custom group
- **📬 Notification Inbox** — Full history with read/unread, dismiss, priority badges
- **🎨 Beautiful Custom Panel** — Sidebar panel for inbox, rules, and group management
- **🃏 Lovelace Card** — Embeddable "recent notifications" card for any dashboard
- **🔴 Priority Levels** — Urgent / High / Normal / Low with visual differentiation

### 📸 Screenshots

*(Coming soon!)*

---

## 📥 Installation

### Option 1: HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=cjacob&repository=ha-notification-center&category=integration)

1. Click the button above, or:
2. In HACS, go to **Integrations** → **⋮ Menu** → **Custom repositories**
3. Add `https://github.com/cjacob/ha-notification-center` as type **Integration**
4. Click **Install**
5. Restart Home Assistant

### Option 2: Manual Install

```bash
# Via the HA terminal or SSH:
cd /config/custom_components
git clone https://github.com/cjacob/ha-notification-center.git
mv ha-notification-center/custom_components/notification_center .
rm -rf ha-notification-center
```

Then restart Home Assistant.

### Post-Install Setup

1. Go to **Settings** → **Devices & Services** → **Add Integration**
2. Search for "Notification Center"
3. Configure max history size (default: 500)
4. Start sending notifications through `notify.notification_center`!

---

## 🚀 Quick Start

### Basic Usage

In your automations and scripts, replace your target:

```yaml
# Before:
action: notify.mobile_app_my_phone
data:
  message: "Garage door left open!"
  title: "🚗 Garage Alert"
```

```yaml
# After:
action: notify.notification_center
data:
  message: "Garage door left open!"
  title: "🚗 Garage Alert"
  data:
    priority: high
```

### UI Service Call

Go to **Developer Tools** → **Services** → search `notify.notification_center`:

```yaml
service: notify.notification_center
data:
  message: "Hello from Notification Center!"
  title: "Test"
  data:
    priority: normal
```

---

## ⚙️ Configuration

### Rules Examples

Rules are evaluated in order — **first match wins**.

**Quiet Hours** — Only urgent notifications at night:
```json
{
  "id": "quiet_hours",
  "name": "Quiet Hours",
  "description": "Only urgent notifications between 10pm and 7am",
  "enabled": true,
  "conditions": [
    { "type": "priority", "values": ["urgent"] },
    { "type": "time_range", "after": "22:00", "before": "07:00" }
  ],
  "target_group": "phones_only",
  "priority_override": "urgent"
}
```

**Presence-Based** — Only notify people who are home:
```json
{
  "id": "only_when_home",
  "name": "Only When Someone's Home",
  "description": "Skip notifications when the house is empty",
  "enabled": true,
  "conditions": [
    { "type": "presence", "entity_id": "zone.home", "state": "home" }
  ],
  "target_group": "all_devices"
}
```

**Keyword Match** — Garage alerts always go to both phones:
```json
{
  "id": "garage_alerts",
  "name": "Garage Alerts → Both Phones",
  "enabled": true,
  "conditions": [
    { "type": "keyword", "value": "garage" }
  ],
  "target_group": "both_phones",
  "priority_override": "high"
}
```

### Groups Examples

```json
{
  "id": "phones_only",
  "name": "Phones Only",
  "targets": [
    "notify.mobile_app_iphone",
    "notify.mobile_app_pixel"
  ]
}
```

---

## 🖥️ Lovelace Card

Add a "recent notifications" card to any dashboard:

1. Add a **Manual** card
2. Paste:

```yaml
type: custom:notification-center-card
max_items: 5
```

Then add this resource in your dashboard settings:
```
/notification_center_static/notification-center-card.js
```

---

## 🏗️ Architecture

```
Automations & Scripts
        │
        ▼
notify.notification_center  ← transparent proxy
        │
        ▼
   Rule Engine   ← time, presence, priority, keyword
        │
        ▼
  Group Resolver ← which devices?
        │
        ▼
notify.mobile_app_*  ← actual delivery
        │
        ▼
 Notification Store ← history (JSON file)
        │
        ▼
  Custom Panel + Lovelace Card ← beautiful UI
```

---

## 🔧 Development

```bash
# Clone
git clone https://github.com/cjacob/ha-notification-center.git
cd ha-notification-center

# Install frontend deps
cd frontend && npm install

# Build frontend (auto-copies to custom_components/)
npm run build

# Watch mode
npm run dev
```

### Testing on your HA instance

Symlink the component into your HA config:

```bash
ln -s $(pwd)/custom_components/notification_center /config/custom_components/notification_center
```

---

## 📄 License

MIT © [Chris Jacob](https://github.com/cjacob)

---

## 🙏 Acknowledgments

Built with ❤️ for the Home Assistant community. Inspired by the need for smarter, more beautiful notification management.
