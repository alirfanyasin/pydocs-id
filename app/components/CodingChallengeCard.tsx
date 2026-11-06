"use client";

import React, { useState } from "react";
import { CodingChallenge } from "../data/types";
import PythonSyntaxEditor from "./PythonSyntaxEditor";
import InlineCodeText from "./InlineCodeText";
import { runPython } from "../lib/run-python";

interface CodingChallengeCardProps {
  challenge: CodingChallenge;
  index: number;
  isCompleted?: boolean;
  onPass?: (challengeId: string) => void;
  badgePrefix?: string;
  filePrefix?: string;
  variant?: "default" | "case_study";
}

export default function CodingChallengeCard({
  challenge,
  index,
  isCompleted = false,
  onPass,
  badgePrefix = "Praktik",
  filePrefix = "praktik",
  variant = "default",
}: CodingChallengeCardProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [stdinValue, setStdinValue] = useState(challenge.defaultStdin ?? "");
  const [userOutput, setUserOutput] = useState<string | null>(null);
  const [errorOutput, setErrorOutput] = useState("");
  const [errorHint, setErrorHint] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runStatus, setRunStatus] = useState("");
  const [isPassed, setIsPassed] = useState<boolean | null>(
    isCompleted ? true : null
  );
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const usesInput = /\binput\s*\(/.test(code);
  const passedStatus = isPassed === true || isCompleted;

  const difficultyColor = (diff: CodingChallenge["difficulty"]) => {
    switch (diff) {
      case "Mudah":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700";
      case "Sedang":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-slate-200 dark:border-slate-700";
      case "Menantang":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-slate-200 dark:border-slate-700";
    }
  };

  const handleCheckCode = async () => {
    setIsRunning(true);
    setRunStatus("Menyiapkan Python...");
    setErrorOutput("");
    setErrorHint("");

    try {
      const data = await runPython(code, stdinValue, setRunStatus);
      const actual = typeof data.output === "string" ? data.output.trim() : "";
      const expected = challenge.expectedOutput.trim();

      setUserOutput(actual);

      if (data.error) {
        setErrorOutput(data.error);
        setErrorHint(data.errorHint || "");
        setIsPassed(false);
      } else if (actual === expected) {
        setIsPassed(true);
        if (onPass) {
          onPass(challenge.id);
        }
      } else {
        setIsPassed(false);
      }
    } catch {
      setErrorOutput("Gagal menjalankan Python di browser. Coba muat ulang halaman.");
      setIsPassed(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setStdinValue(challenge.defaultStdin ?? "");
    setUserOutput(null);
    setErrorOutput("");
    setErrorHint("");
    setIsPassed(isCompleted ? true : null);
  };

  const handleLoadSolution = () => {
    setCode(challenge.solutionCode);
    setShowSolution(false);
  };

  return (
    <div
      className={`rounded-md border overflow-hidden transition ${
        passedStatus
          ? "border-emerald-500 bg-white dark:bg-slate-900"
          : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
      }`}
    >
      {isRunning && (
        <p role="status" className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
          {runStatus}
        </p>
      )}

      {/* Top Challenge Info */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-md text-white text-xs font-bold ${
                variant === "case_study" ? "bg-blue-600" : "bg-blue-600"
              }`}
            >
              {badgePrefix} #{index + 1}
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {challenge.title}
            </h4>
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${difficultyColor(
                challenge.difficulty
              )}`}
            >
              {challenge.difficulty}
            </span>
          </div>

          {passedStatus && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-600 text-white text-xs font-bold">
              ✓ Terjawab Benar
            </span>
          )}
        </div>

        {/* Real-World Scenario Box (for Studi Kasus) */}
        {challenge.scenario && (
          <div className="mb-3.5 p-3.5 rounded-md bg-blue-50/70 dark:bg-blue-950/30 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">
              🌍 Skenario Kehidupan Nyata:
            </span>
            <InlineCodeText text={challenge.scenario} />
          </div>
        )}

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          <InlineCodeText text={challenge.instructions} />
        </p>

        {/* Step-by-step Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-md bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              📋 Langkah Pengerjaan:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {challenge.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <InlineCodeText text={task} />
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-md bg-slate-950 border border-slate-800">
            <p className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1.5">
              🎯 Target Output:
            </p>
            <pre className="font-mono text-xs sm:text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed">
              {challenge.expectedOutput}
            </pre>
          </div>
        </div>
      </div>

      {/* Interactive Editor Area */}
      <div className="bg-[#0f172a]">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#1e293b] border-b border-slate-700 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full inline-block ${
                variant === "case_study" ? "bg-blue-400" : "bg-blue-400"
              }`}
            />
            <span className="font-mono text-slate-200 font-semibold">
              {filePrefix}_{index + 1}.py
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCheckCode}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold transition cursor-pointer"
            >
              <span>▶</span>
              <span>
                {isRunning ? "Memeriksa..." : "Jalankan & Cek Jawaban"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="px-2.5 py-1.5 rounded-md bg-slate-800 border border-slate-600 hover:bg-slate-700 text-amber-300 font-medium transition cursor-pointer"
            >
              💡 Petunjuk
            </button>

            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
              className="px-2.5 py-1.5 rounded-md bg-slate-800 border border-slate-600 hover:bg-slate-700 text-sky-300 font-medium transition cursor-pointer"
            >
              👁️ Kunci Jawaban
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 rounded-md bg-slate-800 border border-slate-600 hover:bg-slate-700 text-slate-300 font-medium transition cursor-pointer"
              title="Ulangi dari kode awal"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Syntax-Highlighted Editor */}
        <PythonSyntaxEditor value={code} onChange={setCode} minRows={5} />

        {/* Stdin Box if needed */}
        {usesInput && (
          <div className="border-t border-slate-800 bg-[#111827] px-4 py-3">
            <label className="block text-xs font-mono text-amber-300 font-semibold mb-1">
              ⌨️ Input Pengujian (stdin):
            </label>
            <textarea
              value={stdinValue}
              onChange={(e) => setStdinValue(e.target.value)}
              rows={2}
              className="w-full font-mono text-xs bg-slate-950 text-slate-100 p-2 rounded-md border border-slate-700"
            />
          </div>
        )}

        {/* Hint Drawer */}
        {showHint && (
          <div className="border-t border-amber-800/80 bg-amber-950/40 px-4 py-3 text-xs sm:text-sm text-amber-200">
            <strong className="font-bold text-amber-300">💡 Petunjuk: </strong>
            <InlineCodeText text={challenge.hint} />
          </div>
        )}

        {/* Solution Drawer */}
        {showSolution && (
          <div className="border-t border-sky-800/80 bg-sky-950/30 px-4 py-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sky-300">
                👁️ Referensi Kunci Jawaban:
              </span>
              <button
                type="button"
                onClick={handleLoadSolution}
                className="px-2.5 py-1 rounded-md bg-sky-600 hover:bg-sky-500 text-white font-semibold cursor-pointer"
              >
                Salin ke Editor
              </button>
            </div>
            <pre className="font-mono text-xs text-emerald-300 bg-slate-950 p-3 rounded-md border border-slate-800 overflow-x-auto">
              {challenge.solutionCode}
            </pre>
          </div>
        )}

        {/* Result & Verification Feedback */}
        {(userOutput !== null || errorOutput) && (
          <div className="border-t border-slate-800 bg-[#090d16] p-4 space-y-3">
            {isPassed === true && (
              <div className="p-3 rounded-md bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs sm:text-sm flex items-center gap-2 font-semibold">
                <span className="text-lg">🎉</span>
                <span>
                  Luar biasa! Kode Python kamu berjalan lancar dan menghasilkan
                  output yang persis sesuai target!
                </span>
              </div>
            )}

            {isPassed === false && !errorOutput && (
              <div className="p-3 rounded-md bg-amber-950/60 border border-slate-200 text-amber-200 text-xs sm:text-sm">
                <p className="font-bold mb-1">
                  🤔 Hampir benar! Output programmu belum sama persis dengan
                  target.
                </p>
                <p className="text-xs text-amber-300/90">
                  Perhatikan huruf besar/kecil, spasi, atau tanda baca antara
                  Output Kamu dan Target Output di atas.
                </p>
              </div>
            )}

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Output Program Kamu:
              </span>
              {userOutput ? (
                <pre className="font-mono text-sm text-emerald-300 bg-slate-950 p-3 rounded-md border border-slate-800 whitespace-pre-wrap">
                  {userOutput}
                </pre>
              ) : (
                !errorOutput && (
                  <p className="font-mono text-xs text-slate-500 italic">
                    (Belum ada teks yang dicetak dengan print)
                  </p>
                )
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
