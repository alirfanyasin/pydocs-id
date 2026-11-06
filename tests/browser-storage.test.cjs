const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function storageModule(initial = {}, blocked = false) {
  const values = new Map(Object.entries(initial));
  const events = {};
  let writes = 0;
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync("app/lib/browser-storage.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, {
    module, exports: module.exports, setTimeout, clearTimeout,
    localStorage: {
      getItem: key => { if (blocked) throw Error("Blocked"); return values.get(key) ?? null; },
      setItem: (key, value) => { if (blocked) throw Error("Quota"); values.set(key, value); writes++; },
    },
    window: { addEventListener: (name, callback) => { events[name] = callback; } },
    document: { visibilityState: "hidden", addEventListener: (name, callback) => { events[name] = callback; } },
  });
  return { ...module.exports, values, events, writes: () => writes };
}

test("drafts stay bounded and preserve recent entries", () => {
  const store = storageModule();
  const now = Date.now();
  const entries = Object.fromEntries(Array.from({ length: 100 }, (_, i) => [String(i), {
    updatedAt: now - i, data: { code: "x".repeat(40_000), output: "y".repeat(10_000) },
  }]));
  const result = store.compactDrafts(entries, now);
  assert.ok(JSON.stringify(result).length <= store.MAX_DRAFT_CHARS);
  assert.ok(Object.keys(result).length <= 80);
  assert.equal(result["0"].data.code.length, 32_000);
  assert.equal(result["0"].data.output.length, 4_000);
  assert.equal(result["99"], undefined);
});

test("old and malformed drafts are discarded", () => {
  const store = storageModule();
  const now = Date.now();
  const result = store.compactDrafts({
    expired: { updatedAt: now - 91 * 86400_000, data: { code: "old" } },
    broken: null,
    invalid: { updatedAt: now, data: [] },
    current: { updatedAt: now, data: { code: "print(1)" } },
  }, now);
  assert.deepEqual(Object.keys(result), ["current"]);
});

test("writes are batched, survive pagehide, and leave legacy progress intact", () => {
  const store = storageModule({ pydocs_completed_ids_v1: '["bab1-pengenalan"]' });
  store.queueDraft("dasar:one", { code: "a" });
  store.queueDraft("dasar:one", { code: "ab" });
  store.queueDraft("oop:one", { code: "class A: pass" });
  assert.equal(store.writes(), 0);
  store.events.pagehide();
  assert.equal(store.writes(), 1);
  const saved = JSON.parse(store.values.get(store.DRAFT_KEY));
  assert.equal(saved["dasar:one"].data.code, "ab");
  assert.equal(saved["oop:one"].data.code, "class A: pass");
  assert.equal(store.values.get("pydocs_completed_ids_v1"), '["bab1-pengenalan"]');
  store.flushDrafts();
  assert.equal(store.writes(), 1);
});

test("corrupt or blocked storage does not break editing", () => {
  for (const store of [storageModule({ pydocs_editor_drafts_v1: "invalid JSON" }), storageModule({}, true)]) {
    assert.equal(store.readDraft("new"), undefined);
    assert.doesNotThrow(() => {
      store.queueDraft("new", { code: "print(1)" });
      store.flushDrafts();
    });
  }
});

test("progress validation rejects malformed values", () => {
  const store = storageModule();
  assert.equal(store.isStringList(["chapter1"]), true);
  assert.equal(store.isStringList([null]), false);
  assert.equal(store.isQuizAnswers({ "chapter1-0": 2 }), true);
  assert.equal(store.isQuizAnswers({ "chapter1-0": "2" }), false);
  assert.equal(store.isQuizAnswers([]), false);
});
