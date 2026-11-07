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
    // The worker has no DOM; render Matplotlib figures using its PNG backend.
    if (pyodide.loadedPackages?.matplotlib) {
      pyodide.runPython("import matplotlib; matplotlib.use('Agg', force=True); import matplotlib.pyplot");
    }

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
    let images = [];
    if (pyodide.runPython("'matplotlib.pyplot' in __import__('sys').modules")) {
      const plots = pyodide.runPython(`
import matplotlib.pyplot as _plt, base64 as _base64, io as _io
_images = []
for _number in _plt.get_fignums()[:4]:
    _buffer = _io.BytesIO()
    _plt.figure(_number).savefig(_buffer, format="png", dpi=90, bbox_inches="tight")
    _images.append("data:image/png;base64," + _base64.b64encode(_buffer.getvalue()).decode("ascii"))
_plt.close("all")
_images
`);
      images = plots.toJs();
      plots.destroy();
    }
    self.postMessage({ type: "result", output: output.trimEnd(), images, error: (stderr + result).slice(0, 32_000).trimEnd(), executionTimeMs: Math.round(performance.now() - startedAt) });
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
