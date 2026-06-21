"""
Unit tests for the Notification Center rule engine.
Run from the repo root: python3 tests/test_rules.py
"""
import sys
import importlib.util
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

# ═══ Mock HA modules before importing our code ═══

class FakeModule:
    """A mock module that returns itself for any attribute access."""
    def __init__(self, **attrs):
        self.__dict__.update(attrs)
    def __getattr__(self, name):
        return FakeModule()
    def __call__(self, *args, **kwargs):
        return FakeModule()

# Create mock hierarchy for homeassistant
for mod in [
    "homeassistant", "homeassistant.core", "homeassistant.config_entries",
    "homeassistant.components", "homeassistant.components.websocket_api",
    "homeassistant.components.notify", "homeassistant.helpers",
    "homeassistant.helpers.storage", "homeassistant.util",
    "homeassistant.util.dt", "homeassistant.data_entry_flow",
    "voluptuous",
]:
    sys.modules[mod] = FakeModule()

# Import const first (no HA deps)
sys.path.insert(0, "custom_components/notification_center")
import const  # noqa

# Import other modules via importlib (they have relative imports)
def _import_module(name):
    spec = importlib.util.spec_from_file_location(
        f"notification_center.{name}",
        f"custom_components/notification_center/{name}.py",
        submodule_search_locations=[],
    )
    mod = importlib.util.module_from_spec(spec)
    mod.const = const
    sys.modules[f"notification_center.{name}"] = mod
    spec.loader.exec_module(mod)
    return mod

store_mod = _import_module("store")
groups_mod = _import_module("groups")
rules_mod = _import_module("rules")
websocket_mod = _import_module("websocket")

print("  ✅ All 4 modules imported successfully")


class MockHass:
    """Mock HomeAssistant for testing."""
    def __init__(self, states=None):
        self.states = MagicMock()
        self.states.get = MagicMock(
            side_effect=lambda eid: states.get(eid) if states else None
        )


class MockState:
    def __init__(self, state, attributes=None):
        self.state = state
        self.attributes = attributes or {}


def mock_dt_util_now():
    return datetime(2026, 6, 20, 14, 30, 0, tzinfo=timezone.utc)


# ─────────────────────────────────────────────────────

def test_constants():
    assert const.DOMAIN == "notification_center"
    assert const.PLATFORM == "notify"
    assert const.DEFAULT_MAX_HISTORY == 500
    assert len(const.PRIORITIES) == 4
    assert "low" in const.PRIORITIES
    assert "urgent" in const.PRIORITIES
    print("  ✅ Constants verified")


def test_rule_engine_logic():
    """Test rule evaluation — first-match-wins."""
    hass = MockHass()

    test_rules = [
        {
            "id": "urgent_only",
            "name": "Urgent Only",
            "enabled": True,
            "conditions": [{"type": "priority", "values": ["urgent"]}],
            "target_group": "phones_only",
            "priority_override": None,
        },
        {
            "id": "quiet_hours",
            "name": "Quiet Hours",
            "enabled": True,
            "conditions": [
                {"type": "time_range", "after": "22:00", "before": "07:00"},
            ],
            "target_group": "quiet_group",
            "priority_override": "low",
        },
        {
            "id": "default",
            "name": "Default",
            "enabled": True,
            "conditions": [],
            "target_group": "all_devices",
            "priority_override": None,
        },
    ]

    engine = rules_mod.RuleEngine(hass, test_rules)

    # Test 1: Urgent matches urgent_only
    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = mock_dt_util_now()
        result = engine.evaluate({
            "priority": "urgent", "title": "Fire!",
            "message": "Smoke detected", "data": {},
        })
    assert result["target_group"] == "phones_only"
    assert result["matched_rule"] == "urgent_only"
    print("  ✅ Test 1: Urgent → 'urgent_only' rule matches")

    # Test 2: Normal at 2:30pm falls through to default
    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = mock_dt_util_now()
        result = engine.evaluate({
            "priority": "normal", "title": "Garage",
            "message": "Garage door open", "data": {},
        })
    assert result["target_group"] == "all_devices"
    assert result["matched_rule"] == "default"
    print("  ✅ Test 2: Normal at 2:30pm → falls to default")

    # Test 3: Normal at 11:30pm matches quiet_hours
    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = datetime(2026, 6, 20, 23, 30, 0, tzinfo=timezone.utc)
        result = engine.evaluate({
            "priority": "normal", "title": "Laundry",
            "message": "Washing machine done", "data": {},
        })
    assert result["target_group"] == "quiet_group"
    assert result["matched_rule"] == "quiet_hours"
    assert result["priority"] == "low"
    print("  ✅ Test 3: Normal at 11:30pm → quiet_hours, priority=low")

    # Test 4: Urgent at 11:30pm — first match (urgent_only) still wins
    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = datetime(2026, 6, 20, 23, 30, 0, tzinfo=timezone.utc)
        result = engine.evaluate({
            "priority": "urgent", "title": "Leak!",
            "message": "Water detected", "data": {},
        })
    assert result["matched_rule"] == "urgent_only"
    print("  ✅ Test 4: Urgent at 11:30pm → 'urgent_only' wins (first match)")

    # Test 5: Disabled rule skipped
    test_rules[0]["enabled"] = False
    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = mock_dt_util_now()
        result = engine.evaluate({
            "priority": "urgent", "title": "Test",
            "message": "Test", "data": {},
        })
    assert result["matched_rule"] == "default"
    print("  ✅ Test 5: Disabled rule → skipped → falls to default")


def test_group_manager():
    """Test group CRUD."""
    mgr = groups_mod.GroupManager()
    assert mgr.get("all_devices") is not None
    assert mgr.get("all_devices")["name"] == "All Devices"
    print("  ✅ Default 'all_devices' group exists")

    mgr.add({
        "id": "phones", "name": "Phones",
        "description": "Phone devices",
        "targets": ["notify.mobile_app_iphone"],
        "icon": "mdi:cellphone",
    })
    assert mgr.get("phones")["targets"] == ["notify.mobile_app_iphone"]
    print("  ✅ Group 'phones' added")

    assert mgr.add({"id": "phones", "name": "Dup"}) is False
    print("  ✅ Duplicate add → False")

    assert mgr.update("phones", {"targets": ["notify.mobile_app_iphone", "notify.mobile_app_pixel"]})
    assert len(mgr.get("phones")["targets"]) == 2
    print("  ✅ Group updated")

    assert mgr.remove("phones") is True
    assert mgr.get("phones") is None
    print("  ✅ Group removed")

    assert mgr.remove("all_devices") is False
    print("  ✅ Default group is protected")


def test_keyword_condition():
    """Test keyword matching."""
    hass = MockHass()
    test_rules = [
        {
            "id": "garage", "name": "Garage alerts", "enabled": True,
            "conditions": [{"type": "keyword", "value": "garage"}],
            "target_group": "phones_only", "priority_override": "high",
        },
        {
            "id": "default", "name": "Default", "enabled": True,
            "conditions": [], "target_group": "all_devices",
        },
    ]
    engine = rules_mod.RuleEngine(hass, test_rules)

    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = mock_dt_util_now()
        result = engine.evaluate({
            "priority": "normal", "title": "Garage Alert",
            "message": "Door open", "data": {},
        })
    assert result["matched_rule"] == "garage"
    assert result["priority"] == "high"
    print("  ✅ Keyword 'garage' matches in title")

    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = mock_dt_util_now()
        result = engine.evaluate({
            "priority": "normal", "title": "Doorbell",
            "message": "Front door", "data": {},
        })
    assert result["matched_rule"] == "default"
    print("  ✅ No keyword → falls to default")


def test_presence_condition():
    """Test presence-based routing."""
    states = {
        "person.jacob": MockState("home"),
        "person.jana": MockState("not_home"),
    }
    hass = MockHass(states)
    test_rules = [
        {
            "id": "jacob_home", "name": "Jacob at home", "enabled": True,
            "conditions": [{"type": "presence", "entity_id": "person.jacob", "state": "home"}],
            "target_group": "jacob_devices",
        },
        {
            "id": "default", "name": "Default", "enabled": True,
            "conditions": [], "target_group": "all_devices",
        },
    ]
    engine = rules_mod.RuleEngine(hass, test_rules)

    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = mock_dt_util_now()
        result = engine.evaluate({
            "priority": "normal", "title": "Test", "message": "Test", "data": {},
        })
    assert result["matched_rule"] == "jacob_home"
    print("  ✅ Presence: jacob=home matches")

    # Not home → falls to default
    states2 = {"person.jacob": MockState("not_home")}
    hass2 = MockHass(states2)
    engine2 = rules_mod.RuleEngine(hass2, test_rules)
    with patch.object(rules_mod, "dt_util") as mock_dt:
        mock_dt.now.return_value = mock_dt_util_now()
        result = engine2.evaluate({
            "priority": "normal", "title": "Test", "message": "Test", "data": {},
        })
    assert result["matched_rule"] == "default"
    print("  ✅ Presence: jacob=not_home → default")


def test_store():
    """Test NotificationStore (not full async, just structure)."""
    import asyncio
    # Just verify the class exists and has expected methods
    assert hasattr(store_mod, "NotificationStore")
    store_cls = store_mod.NotificationStore
    assert hasattr(store_cls, "async_add")
    assert hasattr(store_cls, "async_mark_read")
    assert hasattr(store_cls, "async_dismiss")
    assert hasattr(store_cls, "async_get_all")
    assert hasattr(store_cls, "async_get_unread_count")
    print("  ✅ NotificationStore has all expected methods")


def test_manifest():
    import json
    with open("custom_components/notification_center/manifest.json") as f:
        m = json.load(f)
    assert m["domain"] == "notification_center"
    assert m["config_flow"] is True
    print("  ✅ manifest.json valid")


def test_hacs():
    import json
    with open("hacs.json") as f:
        h = json.load(f)
    assert h["name"] == "Notification Center"
    assert "notification_center" in h["domains"]
    print("  ✅ hacs.json valid")


def test_services_yaml():
    with open("custom_components/notification_center/services.yaml") as f:
        content = f.read()
    assert "send:" in content
    assert "message:" in content
    assert "priority" in content
    print("  ✅ services.yaml valid")


def test_frontend_build():
    import os
    panel = "custom_components/notification_center/frontend/notification-center-panel.js"
    card = "custom_components/notification_center/frontend/notification-center-card.js"
    assert os.path.exists(panel), f"Missing {panel}"
    assert os.path.exists(card), f"Missing {card}"
    assert os.path.getsize(panel) > 1000
    assert os.path.getsize(card) > 1000
    print(f"  ✅ Frontend built: panel={os.path.getsize(panel):,}B, card={os.path.getsize(card):,}B")


# ─────────────────────────────────────────────────────

if __name__ == "__main__":
    print("=" * 60)
    print("🔔 Notification Center — Test Suite")
    print("=" * 60)

    tests = [
        ("Constants", test_constants),
        ("Rule Engine (5 scenarios)", test_rule_engine_logic),
        ("Group CRUD", test_group_manager),
        ("Keyword Conditions", test_keyword_condition),
        ("Presence Conditions", test_presence_condition),
        ("Store structure", test_store),
        ("manifest.json", test_manifest),
        ("hacs.json", test_hacs),
        ("services.yaml", test_services_yaml),
        ("Frontend build", test_frontend_build),
    ]

    passed = failed = 0
    for name, fn in tests:
        try:
            fn()
            passed += 1
        except AssertionError as e:
            print(f"  ❌ FAILED: {name} — {e}")
            failed += 1
        except Exception as e:
            print(f"  ❌ ERROR: {name} — {type(e).__name__}: {e}")
            failed += 1

    print(f"\n{'='*60}")
    print(f"Results: {passed} passed, {failed} failed out of {len(tests)}")
    print(f"{'='*60}")
    sys.exit(1 if failed else 0)
