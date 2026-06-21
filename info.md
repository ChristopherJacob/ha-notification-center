# Notification Center

A beautiful, intelligent notification routing hub for Home Assistant.

## What it does

Notification Center gives you:
- **Smart routing** — notifications go to the right devices based on time, presence, and priority
- **Notification inbox** — full history so nothing gets lost
- **Beautiful UI** — custom panel and Lovelace card

## How it works

Replace `notify.mobile_app_*` with `notify.notification_center` in your automations.
Rules determine who gets what, and everything is logged.

## Why you need it

Home Assistant's built-in notify services are great — but there's no central place
to manage **who** gets notified **when**. Notification Center fills that gap with
a firewall-style rule engine that's simple to configure and beautiful to look at.

---

**Author:** Chris Jacob
**GitHub:** https://github.com/cjacob/ha-notification-center
