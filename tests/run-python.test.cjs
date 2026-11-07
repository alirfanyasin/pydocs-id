const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function loadRunner() {
  const timers = new Map();
  const workers = [];
  let tick = 0;
  class Worker {
    constructor(url) { this.url = url; workers.push(this); }
    postMessage(data) { this.request = data; }
    terminate() { this.terminated = true; }
    send(data) { this.onmessage({ data }); }
  }
  function load(file) {
    const module = { exports: {} };
    const js = ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    vm.runInNewContext(js, {
      module, exports: module.exports, Worker,
      require: () => load("app/lib/python-errors.ts"),
      setTimeout: (fn, delay) => { timers.set(++tick, { fn, delay }); return tick; },
      clearTimeout: id => timers.delete(id),
      performance: { now: () => 100 },
    });
    return module.exports;
  }
  return { ...load("app/lib/run-python.ts"), workers, timers };
}

test("empty code does not start a worker", async () => {
  const { runPython, workers } = loadRunner();
  const result = await runPython("  ");
  assert.match(result.error, /kosong/);
  assert.equal(workers.length, 0);
});

test("forwards PNG plots and discards unexpected image sources", async () => {
  const { runPython, workers } = loadRunner();
  const done = runPython("import matplotlib.pyplot as plt");
  workers[0].send({ type: "result", output: "1", error: "", executionTimeMs: 5,
    images: ["data:image/png;base64,aGVsbG8=", "https://example.com/image.png", null] });
  const result = await done;
  assert.equal(result.output, "1");
  assert.deepEqual(Array.from(result.images), ["data:image/png;base64,aGVsbG8="]);
  assert.equal(workers[0].terminated, true);
});

test("passes code and stdin, forwards status, and terminates after a result", async () => {
  const { runPython, workers, timers } = loadRunner();
  const statuses = [];
  const done = runPython("print(input())", "Halo", s => statuses.push(s));
  const worker = workers[0];
  assert.equal(worker.url, "/python-worker.js");
  assert.equal(worker.request.stdin, "Halo");
  worker.send({ type: "status", message: "Loading" });
  worker.send({ type: "running" });
  worker.send({ type: "result", output: "Halo", error: "", executionTimeMs: 3 });
  assert.equal((await done).output, "Halo");
  assert.deepEqual(statuses, ["Loading", "Menjalankan kode…"]);
  assert.equal(worker.terminated, true);
  assert.equal(timers.size, 0);
});

test("download timeout and execution timeout are separate; partial output survives", async () => {
  const { runPython, workers, timers } = loadRunner();
  const done = runPython("while True: pass");
  assert.equal([...timers.values()][0].delay, 120_000);
  workers[0].send({ type: "running" });
  assert.equal(timers.size, 1);
  assert.equal([...timers.values()][0].delay, 4_000);
  workers[0].send({ type: "output", text: "before loop\n" });
  [...timers.values()][0].fn();
  const result = await done;
  assert.equal(result.output, "before loop");
  assert.match(result.error, /TimeoutError/);
  assert.equal(workers[0].terminated, true);
});

test("load failures resolve with an actionable error and terminate the worker", async () => {
  const { runPython, workers, timers } = loadRunner();
  const done = runPython("print(1)");
  workers[0].onerror({ preventDefault() {} });
  assert.match((await done).error, /koneksi internet/);
  assert.equal(workers[0].terminated, true);
  assert.equal(timers.size, 0);
});

test("Python exceptions retain educational hints", async () => {
  const { runPython, workers } = loadRunner();
  const done = runPython("print(1/0)");
  workers[0].send({ type: "result", output: "", error: "ZeroDivisionError: division by zero", executionTimeMs: 1 });
  assert.match((await done).errorHint, /nol/);
});
