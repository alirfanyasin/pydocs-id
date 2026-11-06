/* global importScripts, loadPyodide */
// Pin runtime and wheels together to avoid incompatible cached packages.
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.28.3/full/";

self.onmessage = async ({ data: { code, stdin } }) => {
  let startedAt;
  let pyodide;
  let context;
  let output = "";
  let stderr = "";
  try {
    self.postMessage({ type: "status", message: "Memuat Python (unduhan pertama mungkin lebih lama)…" });
    importScripts(`${PYODIDE_URL}pyodide.js`);
    pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
    self.postMessage({ type: "status", message: "Menyiapkan pustaka…" });
    await pyodide.loadPackagesFromImports(code);

    // A raw stream captures input() prompts and print(..., end="") exactly.
    const decoder = new TextDecoder();
    pyodide.setStdout({
      write(buffer) {
        const text = decoder.decode(buffer, { stream: true });
        const captured = text.slice(0, Math.max(0, 32_000 - output.length));
        output += captured;
        if (captured) self.postMessage({ type: "output", text: captured });
        return buffer.length;
      },
    });
    const stderrDecoder = new TextDecoder();
    pyodide.setStderr({
      write(buffer) {
        stderr += stderrDecoder.decode(buffer, { stream: true }).slice(0, Math.max(0, 32_000 - stderr.length));
        return buffer.length;
      },
    });

    // StringIO preserves newlines, input prompts, EOFError, and Unicode input.
    context = pyodide.toPy({ source: code, input_text: stdin });
    self.postMessage({ type: "running" });
    startedAt = performance.now();
    const result = pyodide.runPython(`
import sys, io, traceback, contextlib
class LimitedOutput(io.TextIOBase):
    def write(self, text):
        sys.__stdout__.write(text)
        sys.__stdout__.flush()
        return len(text)
    def flush(self):
        sys.__stdout__.flush()

previous_stdin = sys.stdin
sys.stdin = io.StringIO(input_text + ("\\n" if input_text and not input_text.endswith("\\n") else ""))
error = ""
try:
    with contextlib.redirect_stdout(LimitedOutput()):
        exec(compile(source, "kode_kamu.py", "exec"), {"__name__": "__main__"})
except BaseException:
    error = traceback.format_exc(limit=8)
finally:
    sys.stdin = previous_stdin
error
`, { globals: context });
    self.postMessage({ type: "result", output: output.trimEnd(), error: (stderr + result).slice(0, 32_000).trimEnd(), executionTimeMs: Math.round(performance.now() - startedAt) });
  } catch (error) {
    self.postMessage({
      type: "result",
      output: output.trimEnd(),
      error: error.message || "Gagal memuat interpreter Python. Periksa koneksi internet lalu coba lagi.",
      executionTimeMs: startedAt === undefined ? 0 : Math.round(performance.now() - startedAt),
    });
  } finally {
    context?.destroy();
  }
};
