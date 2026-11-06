const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');
// Optional integration check: pass an installed Pyodide 0.28.3 directory.
const runtimeDir = path.resolve(process.argv[2] || 'node_modules/pyodide');
const { loadPyodide } = require(runtimeDir);
const script = fs.readFileSync('public/python-worker.js', 'utf8');
(async () => {
 const pyodide = await loadPyodide({indexURL: runtimeDir});
 await pyodide.loadPackage(['numpy', 'pandas'], {messageCallback: console.log, errorCallback: console.error});
 const cases = [
  { code: 'print("Halo Python"); print(25 + 75)', output: 'Halo Python\n100' },
  { code: 'nama = input("Nama: "); print("Halo", nama)', stdin: 'Irfan', output: 'Nama: Halo Irfan' },
  { code: 'print(input()); print(input())', stdin: 'satu\ndua\n', output: 'satu\ndua' },
  { code: 'input()', error: /EOFError/ },
  { code: 'print("sebelum error"); print(1 / 0)', output: 'sebelum error', error: /ZeroDivisionError/ },
  { code: 'if True print(1)', error: /SyntaxError/ },
  { code: 'class A:\n    def value(self): return 7\nprint(A().value())', output: '7' },
  { code: 'print("x" * 40000)', length: 32000 },
  { code: 'print("secret" in globals())\nsecret = 1', output: 'False' },
  { code: 'print("secret" in globals())', output: 'False' },
  { code: 'import numpy as np\nprint(np.array([1,2,3]).sum())', output: '6' },
  { code: 'import pandas as pd\nprint(pd.DataFrame({"a": [1,2,3]})["a"].sum())', output: '6' },
 ];
 for (const item of cases) {
  const messages = [];
  const self = {postMessage: message => messages.push(message)};
  vm.runInNewContext(script, {self, importScripts() {}, loadPyodide: async () => pyodide, TextDecoder, performance});
  await self.onmessage({data: {code: item.code, stdin: item.stdin || ''}});
  const result = messages.find(message => message.type === 'result');
  assert.ok(result, 'worker must post result');
  if (result.error && !item.error) console.error(result.error);
  if (item.output !== undefined) assert.equal(result.output, item.output);
  if (item.length) assert.equal(result.output.length, item.length);
  if (item.error) assert.match(result.error, item.error); else assert.equal(result.error, '');
  console.log('PASS', item.code.split('\n')[0].slice(0, 65));
 }
})().catch(error => {console.error(error); process.exitCode = 1});
