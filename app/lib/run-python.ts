import { getFriendlyErrorExplanation } from "./python-errors";

export interface PythonResult {
  images?: string[];
  output: string;
  error: string;
  errorHint: string;
  executionTimeMs: number;
}

// Each run owns its worker, Python globals, and filesystem. Termination also
// stops infinite loops without SharedArrayBuffer or cross-origin isolation.
export function runPython(
  code: string,
  stdin = "",
  onStatus?: (status: string) => void,
): Promise<PythonResult> {
  if (!code.trim()) {
    return Promise.resolve({ output: "", error: "Kode Python masih kosong.", errorHint: "", executionTimeMs: 0 });
  }

  return new Promise((resolve) => {
    let worker: Worker;
    try {
      worker = new Worker("/python-worker.js");
    } catch {
      resolve({ output: "", error: "Browser tidak dapat memulai Python. Pastikan Web Worker diizinkan.", errorHint: "", executionTimeMs: 0 });
      return;
    }

    let startedAt: number | undefined;
    let finished = false;
    let output = "";
    const finish = (result: PythonResult) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      worker.terminate();
      resolve(result);
    };
    // Downloads can take longer than execution, especially for NumPy/Pandas.
    let timer = setTimeout(() => finish({
      output: "", error: "Gagal memuat Python. Periksa koneksi internet lalu coba lagi.", errorHint: "", executionTimeMs: 0,
    }), 120_000);

    worker.onmessage = ({ data }) => {
      if (data.type === "status") {
        onStatus?.(data.message);
      } else if (data.type === "running") {
        clearTimeout(timer);
        startedAt = performance.now();
        onStatus?.("Menjalankan kode…");
        timer = setTimeout(() => finish({
          output: output.trimEnd(),
          error: "TimeoutError: Eksekusi kode dihentikan karena melebihi batas waktu 4 detik.",
          errorHint: "Periksa apakah ada perulangan tanpa henti atau perhitungan yang terlalu lama.",
          executionTimeMs: Math.round(performance.now() - startedAt!),
        }), 4_000);
      } else if (data.type === "output") {
        output = (output + data.text).slice(0, 32_000);
      } else if (data.type === "result") {
        finish({
          output: data.output,
          images: Array.isArray(data.images) ? data.images.filter((src: unknown): src is string => typeof src === "string" && src.startsWith("data:image/png;base64,")) : [],
          error: data.error,
          errorHint: getFriendlyErrorExplanation(data.error),
          executionTimeMs: data.executionTimeMs,
        });
      }
    };
    worker.onerror = (event) => {
      event.preventDefault();
      finish({ output: "", error: "Gagal memuat Python di browser. Periksa koneksi internet dan akses ke cdn.jsdelivr.net.", errorHint: "", executionTimeMs: 0 });
    };
    worker.postMessage({ code, stdin });
  });
}
