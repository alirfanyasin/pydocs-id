"use client";

import React, { useState } from "react";
import { CodeExample } from "../data/types";
import PythonSyntaxEditor from "./PythonSyntaxEditor";
import InlineCodeText from "./InlineCodeText";

interface CodeBlockProps {
  example: CodeExample;
}

export default function CodeBlock({ example }: CodeBlockProps) {
  const [code, setCode] = useState(example.code);
  const [stdinValue, setStdinValue] = useState(example.defaultStdin ?? "");
  const [output, setOutput] = useState(example.output);
  const [errorOutput, setErrorOutput] = useState("");
  const [errorHint, setErrorHint] = useState("");
  const [execTimeMs, setExecTimeMs] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const isModified = code !== example.code;
  const usesInput = /\binput\s*\(/.test(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard error
    }
  };

  const handleReset = () => {
    setCode(example.code);
    setStdinValue(example.defaultStdin ?? "");
    setOutput(example.output);
    setErrorOutput("");
    setErrorHint("");
    setExecTimeMs(null);
  };

  const handleRunPython = async () => {
    setIsRunning(true);
    setShowOutput(true);
    setErrorOutput("");
    setErrorHint("");

    try {
      const response = await fetch("/api/run-python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          stdin: stdinValue,
        }),
      });

      const data = await response.json();
      if (typeof data.output === "string") {
        setOutput(data.output);
      }
      if (data.error) {
        setErrorOutput(data.error);
      }
      if (data.errorHint) {
        setErrorHint(data.errorHint);
      }
      if (typeof data.executionTimeMs === "number") {
        setExecTimeMs(data.executionTimeMs);
      }
    } catch {
      setErrorOutput(
        "Gagal menghubungi server eksekusi Python. Menampilkan output simulasi."
      );
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Header Description */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-mono font-bold">
              Py
            </span>
            {example.title}
          </h4>
          {isModified && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-md border border-amber-500/60 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
              Kode Dimodifikasi
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <InlineCodeText text={example.description} />
        </p>
      </div>

      {/* Code Editor Window */}
      <div className="bg-[#0f172a] text-slate-100">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#1e293b] border-b border-slate-700 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 font-mono font-semibold text-slate-200">
              main.py
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleRunPython}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold transition cursor-pointer"
              title="Jalankan kode ini dengan Python 3"
            >
              <span>▶</span>
              <span>{isRunning ? "Menjalankan..." : "Jalankan"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md font-medium transition cursor-pointer border ${
                isEditing
                  ? "bg-blue-600 border-blue-400 text-white"
                  : "bg-slate-800 border-slate-600 hover:bg-slate-700 text-slate-200"
              }`}
            >
              <span>✏️</span>
              <span>{isEditing ? "Edit Aktif" : "Edit"}</span>
            </button>

            {isModified && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-medium transition cursor-pointer"
                title="Kembalikan ke kode contoh awal"
              >
                ↺ Reset
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-200 font-medium transition cursor-pointer"
            >
              {copied ? "✓ Tersalin" : "Salin"}
            </button>
          </div>
        </div>

        {/* Live Syntax-Highlighted Editor */}
        <div
          onClick={() => {
            if (!isEditing) setIsEditing(true);
          }}
        >
          <PythonSyntaxEditor
            value={code}
            onChange={(val) => {
              setIsEditing(true);
              setCode(val);
            }}
            minRows={3}
          />
        </div>

        {/* Stdin Box if code uses input() */}
        {usesInput && (
          <div className="border-t border-slate-700 bg-[#111827] px-4 py-3">
            <label className="block text-xs font-mono text-amber-300 font-semibold mb-1.5">
              ⌨️ Input Pengguna (stdin) — Satu baris untuk setiap input():
            </label>
            <textarea
              value={stdinValue}
              onChange={(e) => setStdinValue(e.target.value)}
              rows={2}
              placeholder="Ketik nilai input di sini..."
              className="w-full font-mono text-xs bg-slate-950 text-slate-100 p-2.5 rounded-md border border-slate-700 focus:outline-none focus:border-amber-400"
            />
          </div>
        )}

        {/* Output Terminal */}
        {showOutput && (
          <div className="border-t border-slate-800 bg-[#090d16] px-4 py-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      errorOutput ? "bg-rose-500" : "bg-emerald-400"
                    }`}
                  />
                  Output Terminal
                </span>
                {execTimeMs !== null && (
                  <span className="text-[11px] font-mono text-slate-400">
                    ({execTimeMs} ms)
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowOutput(false)}
                className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                Sembunyikan
              </button>
            </div>

            {output && (
              <pre
                className={`font-mono text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed transition-opacity duration-200 ${
                  isRunning ? "opacity-40" : "opacity-100"
                }`}
              >
                {output}
              </pre>
            )}

            {errorOutput && (
              <div className="mt-2 space-y-2">
                <pre className="font-mono text-xs sm:text-sm text-rose-300 bg-rose-950/50 border border-rose-700/80 p-3 rounded-md whitespace-pre-wrap leading-relaxed">
                  {errorOutput}
                </pre>
                {errorHint && (
                  <div className="p-3 rounded-md bg-amber-950/60 border border-amber-600/70 text-amber-200 text-xs sm:text-sm leading-relaxed">
                    <InlineCodeText text={errorHint} />
                  </div>
                )}
              </div>
            )}

            {!output && !errorOutput && (
              <p className="font-mono text-xs text-slate-500 italic">
                (Program selesai dijalankan tanpa mencetak output)
              </p>
            )}
          </div>
        )}
      </div>

      {/* Line-by-line Explanation */}
      {example.lineExplanations && example.lineExplanations.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-4">
          <button
            type="button"
            onClick={() => setShowExplanations(!showExplanations)}
            className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <span>💡 Penjelasan Kode Baris demi Baris</span>
            <span className="text-xs text-slate-500">
              {showExplanations ? "Tutup ▲" : "Buka ▼"}
            </span>
          </button>

          {showExplanations && (
            <div className="mt-3 space-y-2.5">
              {example.lineExplanations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-md bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm"
                >
                  <code className="block font-mono text-xs bg-slate-900 text-amber-300 px-2.5 py-1.5 rounded-md mb-1.5 overflow-x-auto whitespace-pre border border-slate-700">
                    {item.line}
                  </code>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <InlineCodeText text={item.explanation} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
