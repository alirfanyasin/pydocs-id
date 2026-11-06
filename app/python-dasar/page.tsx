"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { INITIAL_PYTHON_DOCS, DocSection } from "../data";
import CodeBlock from "../components/CodeBlock";
import CodingChallengeCard from "../components/CodingChallengeCard";
import InlineCodeText from "../components/InlineCodeText";
import ThemeToggle from "../components/ThemeToggle";
import SearchIcon from "../components/SearchIcon";
import { useBrowserState } from "../lib/use-browser-state";
import { isStringList, isQuizAnswers, isChapterId } from "../lib/browser-storage";

const STORAGE_COMPLETED_KEY = "pydocs_completed_ids_v1";
const STORAGE_PASSED_CHALLENGES_KEY = "pydocs_passed_challenges_v1";
const STORAGE_QUIZ_ANSWERS_KEY = "pydocs_quiz_answers_v1";

export default function PythonDasarTutorialPage() {
  const [activeId, setActiveId] = useBrowserState<string>("pydocs_python-dasar_active_id_v1", INITIAL_PYTHON_DOCS[0].id, isChapterId);
  const [completedIds, setCompletedIds] = useBrowserState<string[]>(STORAGE_COMPLETED_KEY, [], isStringList);
  const [passedChallengeIds, setPassedChallengeIds] = useBrowserState<string[]>(STORAGE_PASSED_CHALLENGES_KEY, [], isStringList);
  const [quizAnswers, setQuizAnswers] = useBrowserState<Record<string, number>>(STORAGE_QUIZ_ANSWERS_KEY, {}, isQuizAnswers);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allDocs = INITIAL_PYTHON_DOCS;

  const filteredDocs = useMemo(() => {
    return allDocs.filter((doc) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const inTitle = doc.title.toLowerCase().includes(q);
      const inSummary = doc.summary.toLowerCase().includes(q);
      const inCode = doc.examples.some(
        (ex) =>
          ex.code.toLowerCase().includes(q) ||
          ex.title.toLowerCase().includes(q)
      );
      return inTitle || inSummary || inCode;
    });
  }, [allDocs, searchQuery]);

  const activeDoc = useMemo(() => {
    return (
      allDocs.find((d) => d.id === activeId) ||
      filteredDocs[0] ||
      allDocs[0]
    );
  }, [allDocs, filteredDocs, activeId]);

  const activeQuizzes = useMemo(() => {
    if (activeDoc.quizzes && activeDoc.quizzes.length > 0) {
      return activeDoc.quizzes;
    }
    if (activeDoc.quiz) {
      return [activeDoc.quiz];
    }
    return [];
  }, [activeDoc]);

  const activeChallenges = useMemo(() => {
    return activeDoc.codingChallenges ?? [];
  }, [activeDoc]);

  const activeCaseStudies = useMemo(() => {
    return activeDoc.caseStudies ?? [];
  }, [activeDoc]);

  const currentIndex = allDocs.findIndex((d) => d.id === activeDoc.id);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex >= 0 && currentIndex < allDocs.length - 1
      ? allDocs[currentIndex + 1]
      : null;

  const markChapterCompleted = (id: string) => {
    setCompletedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      return next;
    });
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      return next;
    });
  };

  const handlePassChallenge = (challengeId: string) => {
    setPassedChallengeIds((prev) => {
      if (prev.includes(challengeId)) return prev;
      const next = [...prev, challengeId];
      return next;
    });
  };

  const handleSelectQuizOption = (answerKey: string, optIdx: number) => {
    setQuizAnswers((prev) => {
      const next = { ...prev, [answerKey]: optIdx };
      return next;
    });
  };

  const handleResetChapterQuiz = (docId: string, count: number) => {
    setQuizAnswers((prev) => {
      const copy = { ...prev };
      for (let i = 0; i < count; i++) {
        delete copy[`${docId}-${i}`];
      }
      return copy;
    });
  };

  // Helper to get exercise completion stats for any chapter
  const getDocExerciseStats = (doc: DocSection) => {
    const challenges = doc.codingChallenges ?? [];
    const caseStudies = doc.caseStudies ?? [];
    const quizzes =
      doc.quizzes && doc.quizzes.length > 0
        ? doc.quizzes
        : doc.quiz
        ? [doc.quiz]
        : [];

    const praktikDone = challenges.filter((c) =>
      passedChallengeIds.includes(c.id)
    ).length;

    const caseStudiesDone = caseStudies.filter((c) =>
      passedChallengeIds.includes(c.id)
    ).length;

    let quizAnswered = 0;
    let quizCorrect = 0;
    quizzes.forEach((q, idx) => {
      const val = quizAnswers[`${doc.id}-${idx}`];
      if (val !== undefined) {
        quizAnswered += 1;
        if (val === q.correctIndex) {
          quizCorrect += 1;
        }
      }
    });

    const totalCompleted = praktikDone + quizAnswered;
    const totalTarget = challenges.length + quizzes.length;
    const isAll10Done = totalTarget > 0 && totalCompleted >= totalTarget;

    return {
      praktikDone,
      praktikTotal: challenges.length,
      caseStudiesDone,
      caseStudiesTotal: caseStudies.length,
      quizAnswered,
      quizCorrect,
      quizTotal: quizzes.length,
      totalCompleted,
      totalTarget,
      isAll10Done,
    };
  };

  const activeStats = useMemo(
    () => getDocExerciseStats(activeDoc),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeDoc, passedChallengeIds, quizAnswers]
  );

  const handleGoToNextChapter = () => {
    if (activeStats.isAll10Done) {
      markChapterCompleted(activeDoc.id);
    }
    if (nextDoc) {
      setActiveId(nextDoc.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const progressPercentage = Math.round(
    (completedIds.length / allDocs.length) * 100
  );

  const levelBadgeColor = (level: DocSection["level"]) => {
    switch (level) {
      case "Pemula":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-400 dark:border-emerald-700";
      case "Dasar":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-slate-200 dark:border-slate-700";
      case "Menengah Dasar":
      case "Menengah":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-slate-200 dark:border-slate-700";
      case "Ujian Akhir":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Back to Catalog & Brand */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label="Daftar materi"
              aria-expanded={mobileMenuOpen}
              aria-controls="chapter-navigation"
            >
              ☰
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:border-slate-200 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 transition"
            >
              <span>←</span>
              <span>Semua Kelas</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <span className="text-lg">🐍</span>
              <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                Python Dasar
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari bab atau fungsi" placeholder="Cari bab atau fungsi..."
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-9 py-1.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-slate-200"
              />
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Progress Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700">
              <div className="w-20 h-2 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {completedIds.length}/{allDocs.length} Selesai
              </span>
            </div>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-[1440px] w-full mx-auto flex-1 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar Navigation */}
        <aside id="chapter-navigation"
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:block w-full lg:w-80 xl:w-88 shrink-0`}
        >
          <div className="sticky top-22 bg-white dark:bg-slate-900 rounded-md border border-slate-300 dark:border-slate-700 p-4">
            {/* Mobile search */}
            <div className="relative mb-3 md:hidden">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari materi" placeholder="Cari materi..."
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 pl-9 pr-3 py-2 text-sm"
              />
            </div>

            {/* Module List */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Daftar Bab & Ujian ({filteredDocs.length})
              </p>
            </div>

            <nav className="space-y-1.5 max-h-[75vh] overflow-y-auto pr-1.5">
              {filteredDocs.map((doc) => {
                const isActive = doc.id === activeDoc.id;
                const isDone = completedIds.includes(doc.id);
                const docStats = getDocExerciseStats(doc);

                return (
                  <button
                    key={doc.id}
                    aria-current={isActive ? "page" : undefined}
                    type="button"
                    onClick={() => {
                      setActiveId(doc.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-md transition flex items-start gap-2.5 cursor-pointer border ${
                      isActive
                        ? doc.isExam
                          ? "bg-amber-50 dark:bg-amber-950/60 border-slate-200 text-amber-950 dark:text-amber-100"
                          : "bg-blue-50 dark:bg-blue-950/70 border-slate-200 text-blue-950 dark:text-blue-100"
                        : doc.isExam
                        ? "bg-amber-50/40 dark:bg-amber-950/20 hover:bg-amber-100/60 dark:hover:bg-amber-950/40 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                        : "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-transparent"
                    }`}
                  >
                    <span
                      className={`mt-0.5 w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : doc.isExam
                          ? "bg-amber-500 text-slate-950"
                          : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {isDone ? "✓" : doc.isExam ? "🏆" : doc.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-snug">
                        {doc.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {doc.level}
                        </span>
                        <span className="text-slate-300 dark:text-slate-600">
                          •
                        </span>
                        <span
                          className={`text-[11px] font-semibold ${
                            doc.isExam
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          {docStats.totalCompleted}/{docStats.totalTarget}{" "}
                          {doc.isExam ? "Soal Ujian" : "Latihan"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredDocs.length === 0 && (
                <div className="text-center py-8 text-sm text-slate-500">
                  Tidak ada materi yang cocok dengan pencarian &ldquo;
                  {searchQuery}&rdquo;.
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Documentation Content */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Topic Header Card */}
          <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-300 dark:border-slate-700 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                  Bab {activeDoc.number}
                </span>
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold border ${levelBadgeColor(
                    activeDoc.level
                  )}`}
                >
                  {activeDoc.level}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  ⏱ {activeDoc.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleCompleted(activeDoc.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-bold border transition cursor-pointer ${
                    completedIds.includes(activeDoc.id)
                      ? "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-slate-400"
                  }`}
                >
                  <span>
                    {completedIds.includes(activeDoc.id) ? "✓" : "○"}
                  </span>
                  <span>
                    {completedIds.includes(activeDoc.id)
                      ? "Sudah Selesai"
                      : "Tandai Selesai"}
                  </span>
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {activeDoc.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              <InlineCodeText text={activeDoc.subtitle} />
            </p>

            {/* Chapter Exercise Progress Banner */}
            {activeStats.totalTarget > 0 && (
              <div className="mt-5 p-3.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                      activeStats.isAll10Done
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {activeStats.totalCompleted}/{activeStats.totalTarget}
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                      Progres latihan
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Praktik: {activeStats.praktikDone}/
                      {activeStats.praktikTotal} • Pemahaman:{" "}
                      {activeStats.quizAnswered}/{activeStats.quizTotal}
                      {activeStats.caseStudiesTotal > 0 &&
                        ` • Studi Kasus: ${activeStats.caseStudiesDone}/${activeStats.caseStudiesTotal}`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Concept Summary */}
            <div className="mt-6 p-5 rounded-md bg-blue-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xs font-medium uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2">
                 Konsep
              </h2>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
                <InlineCodeText text={activeDoc.summary} />
              </p>
            </div>

            {/* Key Points */}
            <div className="mt-6">
              <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                 Poin penting
              </h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {activeDoc.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-md bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200"
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">
                      <InlineCodeText text={point} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concept Reference Table */}
            {activeDoc.conceptTable && (
              <div className="mt-6">
                <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  📊 {activeDoc.conceptTable.title}
                </h3>
                <div className="overflow-x-auto rounded-md border border-slate-300 dark:border-slate-700">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        {activeDoc.conceptTable.headers.map((header, i) => (
                          <th
                            key={i}
                            className="py-2.5 px-4 font-bold border-b border-slate-300 dark:border-slate-700"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {activeDoc.conceptTable.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`py-2.5 px-4 ${
                                cIdx === 0 || cIdx === 1
                                  ? "font-mono text-xs font-semibold text-sky-700 dark:text-amber-300"
                                  : "text-slate-700 dark:text-slate-300"
                              }`}
                            >
                              {cIdx === 0 || cIdx === 1 ? (
                                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                                  {cell}
                                </code>
                              ) : (
                                <InlineCodeText text={cell} />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Code Examples Section */}
          {activeDoc.examples.length > 0 && (
            <section className="space-y-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  💻 Contoh Kode Python & Penjelasannya
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Klik kode untuk mengeditnya langsung atau tekan{" "}
                  <strong>▶ Jalankan</strong> untuk melihat hasil eksekusi
                  Python 3.
                </p>
              </div>

              <div className="space-y-5">
                {activeDoc.examples.map((example) => (
                  <CodeBlock key={example.id} example={example} storageScope="python-dasar" />
                ))}
              </div>
            </section>
          )}

          {/* Common Mistakes & Best Practice Tips */}
          {(activeDoc.commonMistakes?.length || activeDoc.tips?.length) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Common Mistakes */}
              {activeDoc.commonMistakes &&
                activeDoc.commonMistakes.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 p-5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                      <span>Kesalahan Umum Pemula</span>
                    </h3>
                    <div className="space-y-4">
                      {activeDoc.commonMistakes.map((mistake, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-md bg-rose-50/50 dark:bg-rose-950/20 border border-slate-200 dark:border-slate-700 text-xs space-y-2"
                        >
                          <div>
                            <span className="font-bold text-rose-600 dark:text-rose-400">
                              ❌ Kurang Tepat:
                            </span>
                            <pre className="mt-1 font-mono bg-slate-900 text-rose-300 p-2.5 rounded-md border border-slate-700 overflow-x-auto">
                              {mistake.wrong}
                            </pre>
                          </div>
                          <div>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              ✅ Seharusnya:
                            </span>
                            <pre className="mt-1 font-mono bg-slate-900 text-emerald-300 p-2.5 rounded-md border border-slate-700 overflow-x-auto">
                              {mistake.correct}
                            </pre>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed pt-1">
                            <strong>Alasan:</strong>{" "}
                            <InlineCodeText text={mistake.reason} />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Practical Tips */}
              {activeDoc.tips && activeDoc.tips.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700 p-5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-4">
                    <span>Tips praktis</span>
                  </h3>
                  <ul className="space-y-3">
                    {activeDoc.tips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="p-3.5 rounded-md bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
                      >
                        <InlineCodeText text={tip} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 2 Real-World Case Studies Section */}
          {activeCaseStudies.length > 0 && (
            <section className="space-y-5">
              <div className="p-5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>
                      Studi kasus
                    </span>
                  </h2>
                  
                </div>
                <span
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold ${
                    activeStats.caseStudiesDone === activeStats.caseStudiesTotal
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Studi Kasus Selesai: {activeStats.caseStudiesDone} /{" "}
                  {activeStats.caseStudiesTotal}
                </span>
              </div>

              <div className="space-y-5">
                {activeCaseStudies.map((caseStudy, idx) => (
                  <CodingChallengeCard
                    storageScope="python-dasar"
                    key={caseStudy.id}
                    challenge={caseStudy}
                    index={idx}
                    isCompleted={passedChallengeIds.includes(caseStudy.id)}
                    onPass={handlePassChallenge}
                    badgePrefix="Studi Kasus"
                    filePrefix="studi_kasus"
                    variant="case_study"
                  />
                ))}
              </div>
            </section>
          )}

          {/* 5 Hands-On Coding Challenges Section */}
          {activeChallenges.length > 0 && (
            <section className="space-y-5">
              <div className="p-5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>
                      Latihan praktik
                    </span>
                  </h2>
                  
                </div>
                <span
                  className={`px-3.5 py-1.5 rounded-md text-xs font-bold ${
                    activeStats.praktikDone === activeStats.praktikTotal
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Praktik Terjawab: {activeStats.praktikDone} /{" "}
                  {activeStats.praktikTotal}
                </span>
              </div>

              <div className="space-y-5">
                {activeChallenges.map((challenge, idx) => (
                  <CodingChallengeCard
                    storageScope="python-dasar"
                    key={challenge.id}
                    challenge={challenge}
                    index={idx}
                    isCompleted={passedChallengeIds.includes(challenge.id)}
                    onPass={handlePassChallenge}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 5-Question Interactive Quiz Section */}
          {activeQuizzes.length > 0 && (
            <section className="bg-white dark:bg-slate-900 rounded-md border border-slate-300 dark:border-slate-700 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🧠</span>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                      Kuis pemahaman
                    </h3>
                  </div>
                  
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Terjawab: {activeStats.quizAnswered}/{activeStats.quizTotal}{" "}
                    • Benar: {activeStats.quizCorrect}/{activeStats.quizTotal}
                  </div>
                  {activeStats.quizAnswered > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleResetChapterQuiz(
                          activeDoc.id,
                          activeQuizzes.length
                        )
                      }
                      className="px-3 py-1.5 rounded-md text-xs font-bold border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
                    >
                      ↺ Ulangi Kuis
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                {activeQuizzes.map((quizItem, qIdx) => {
                  const answerKey = `${activeDoc.id}-${qIdx}`;
                  const chosen = quizAnswers[answerKey];

                  return (
                    <div
                      key={qIdx}
                      className="p-4 sm:p-5 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-3.5 flex items-start gap-2.5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5">
                          {qIdx + 1}
                        </span>
                        <span className="leading-relaxed">
                          <InlineCodeText text={quizItem.question} />
                        </span>
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {quizItem.options.map((option, optIdx) => {
                          const isSelected = chosen === optIdx;
                          const isCorrect = optIdx === quizItem.correctIndex;

                          let btnStyle =
                            "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-200 text-slate-800 dark:text-slate-200";

                          if (chosen !== undefined) {
                            if (isCorrect) {
                              btnStyle =
                                "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold";
                            } else if (isSelected && !isCorrect) {
                              btnStyle =
                                "border-slate-200 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() =>
                                handleSelectQuizOption(answerKey, optIdx)
                              }
                              className={`p-3 rounded-md border text-left font-mono text-xs sm:text-sm transition cursor-pointer ${btnStyle}`}
                            >
                              <span className="font-sans font-bold mr-2">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              {option}
                            </button>
                          );
                        })}
                      </div>

                      {chosen !== undefined && (
                        <div
                          className={`mt-3.5 p-3.5 rounded-md text-xs sm:text-sm border ${
                            chosen === quizItem.correctIndex
                              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-400 dark:border-emerald-800"
                              : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          <p className="font-bold mb-0.5">
                            {chosen === quizItem.correctIndex
                              ? "✓ Jawaban Benar!"
                              : "✕ Belum Tepat — Pembahasan:"}
                          </p>
                          <p>
                            <InlineCodeText text={quizItem.explanation} />
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

            {/* Previous / Next Navigation Footer */}
          <div className="space-y-3 pt-4 border-t border-slate-300 dark:border-slate-800">
            {activeStats.totalTarget > 0 && (
              <div
                className={`p-3.5 rounded-md text-xs sm:text-sm border flex items-center justify-between ${
                  activeStats.isAll10Done
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200"
                    : "bg-amber-50 dark:bg-amber-950/30 border-slate-200 dark:border-slate-700 text-amber-800 dark:text-amber-200"
                }`}
              >
                <span>
                  {activeStats.isAll10Done
                    ? "Latihan selesai. Lanjutkan untuk menandai bab ini selesai."
                    : `${activeStats.totalCompleted}/${activeStats.totalTarget} latihan terjawab.`}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {prevDoc ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(prevDoc.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex-1 p-4 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-200 text-left transition cursor-pointer"
                >
                  <span className="text-xs text-slate-400 block">
                    ← Materi Sebelumnya
                  </span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Bab {prevDoc.number}: {prevDoc.title}
                  </span>
                </button>
              ) : (
                <div className="flex-1" />
              )}

              {nextDoc ? (
                <button
                  type="button"
                  onClick={handleGoToNextChapter}
                  className={`flex-1 p-4 rounded-md border text-right transition cursor-pointer ${
                    activeStats.isAll10Done
                      ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-200"
                  }`}
                >
                  <span
                    className={`text-xs block ${
                      activeStats.isAll10Done
                        ? "text-emerald-100 font-semibold"
                        : "text-slate-400"
                    }`}
                  >
                    {activeStats.isAll10Done
                      ? `✓ ${activeStats.totalCompleted}/${activeStats.totalTarget} Latihan Selesai • Tandai Selesai & Lanjut →`
                      : `Materi Selanjutnya (${activeStats.totalCompleted}/${activeStats.totalTarget} Latihan) →`}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      activeStats.isAll10Done
                        ? "text-white"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    Bab {nextDoc.number}: {nextDoc.title}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (activeStats.isAll10Done) {
                      markChapterCompleted(activeDoc.id);
                    }
                  }}
                  className={`flex-1 p-4 rounded-md border text-right transition cursor-pointer ${
                    activeStats.isAll10Done
                      ? "bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white"
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <span className="text-xs block opacity-80">
                    🏆 Ujian Akhir Modul Python Dasar
                  </span>
                  <span className="text-sm font-bold">
                    {activeStats.isAll10Done
                      ? "✓ 25/25 Soal Terjawab • Klik untuk Selesaikan Ujian Akhir!"
                      : `Selesaikan 25 Soal Ujian (${activeStats.totalCompleted}/${activeStats.totalTarget})`}
                  </span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

