"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { INITIAL_PYTHON_DOCS, PYTHON_OOP_DOCS, PYTHON_NUMPY_DOCS, PYTHON_PANDAS_DOCS, PYTHON_MATPLOTLIB_DOCS } from "./data";
import ThemeToggle from "./components/ThemeToggle";

const tracks = [
  { slug: "python-dasar", title: "Python Dasar", level: "Pemula", description: "Mulai dari sintaks, variabel, dan logika hingga menulis fungsi sendiri.", topics: "Sintaks · Struktur data · Fungsi", docs: INITIAL_PYTHON_DOCS, storage: "pydocs_completed_ids_v1" },
  { slug: "python-oop", title: "Object-Oriented Python", level: "Menengah", description: "Susun kode dengan class, pewarisan, dan komposisi objek.", topics: "Class · Inheritance · Dataclass", docs: PYTHON_OOP_DOCS, storage: "pydocs_oop_completed_ids_v1" },
  { slug: "python-numpy", title: "NumPy", level: "Menengah", description: "Olah array dan matriks untuk perhitungan numerik yang efisien.", topics: "Array · Broadcasting · Aljabar linear", docs: PYTHON_NUMPY_DOCS, storage: "pydocs_numpy_completed_ids_v1" },
  { slug: "python-pandas", title: "Pandas", level: "Menengah", description: "Baca, bersihkan, dan analisis data tabel dengan Python.", topics: "DataFrame · Data cleaning · Agregasi", docs: PYTHON_PANDAS_DOCS, storage: "pydocs_pandas_completed_ids_v1" },
  { slug: "python-matplotlib", title: "Matplotlib", level: "Menengah", description: "Ubah data menjadi grafik yang jelas dan informatif dengan Python.", topics: "Figure & Axes · Jenis grafik · Subplot & ekspor", docs: PYTHON_MATPLOTLIB_DOCS, storage: "pydocs_matplotlib_completed_ids_v1" },
];

export default function LearningCatalogHomePage() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  useEffect(() => {
    const saved: Record<string, number> = {};
    for (const track of tracks) {
      try {
        const ids: unknown = JSON.parse(localStorage.getItem(track.storage) || "[]");
        saved[track.slug] = Array.isArray(ids) ? track.docs.filter(doc => ids.includes(doc.id)).length : 0;
      } catch { saved[track.slug] = 0; }
    }
    setProgress(saved);
  }, []);
  const startedTrack = tracks.find(track => (progress[track.slug] || 0) > 0 && (progress[track.slug] || 0) < track.docs.length);

  return (
    <div className="catalog min-h-screen flex flex-col">
      <header className="catalog-header">
        <div className="catalog-container flex h-18 items-center justify-between gap-4">
          <Link href="/" className="brand" aria-label="PyDocs, beranda"><span className="brand-mark" aria-hidden="true">py.</span>PyDocs<span className="text-slate-500 font-normal">/ belajar</span></Link>
          <ThemeToggle />
        </div>
      </header>
      <main id="main-content" className="catalog-container flex-1">
        <section className="catalog-intro">
          <p className="eyebrow">PYTHON, LANGKAH DEMI LANGKAH</p>
          <h1>Pahami konsep.<br />Tulis kodenya.</h1>
          <p className="intro-description">Belajar Python dalam bahasa Indonesia, dengan contoh yang bisa dijalankan dan latihan di setiap bab.</p>
          <Link href={startedTrack ? `/${startedTrack.slug}` : "/python-dasar"} className="primary-link">{startedTrack ? "Lanjut belajar" : "Mulai dari dasar"}<span aria-hidden="true">↗</span></Link>
        </section>
        <section aria-labelledby="catalog-title" className="pb-16">
          <div className="catalog-section-heading"><h2 id="catalog-title">Materi belajar</h2><span>{String(tracks.length).padStart(2, "0")} modul</span></div>
          <div className="track-grid">
            {tracks.map((track, index) => {
              const completed = progress[track.slug] || 0;
              return (
                <Link href={`/${track.slug}`} key={track.slug} className="track-card group">
                  <div className="flex items-center justify-between gap-4"><span className="track-number">0{index + 1}</span><span className="text-xs text-slate-500 dark:text-slate-400">{track.level}</span></div>
                  <h3>{track.title}</h3>
                  <p className="track-description">{track.description}</p>
                  <p className="track-topics">{track.topics}</p>
                  <div className="track-footer"><span>{completed ? `${completed}/${track.docs.length} bab selesai` : `${track.docs.length} bab`}</span><span className="track-action">{completed ? "Lanjutkan" : "Pelajari"} <span aria-hidden="true">→</span></span></div>
                  <div className="track-progress" role="progressbar" aria-label={`Progres ${track.title}`} aria-valuenow={completed} aria-valuemin={0} aria-valuemax={track.docs.length}><span style={{width: `${completed / track.docs.length * 100}%`}} /></div>
                </Link>
              );
            })}
          </div>
          <div className="upcoming"><span className="eyebrow">SELANJUTNYA</span><p>Algoritma & struktur data <span aria-hidden="true">/</span> Backend & FastAPI</p><span className="text-xs text-slate-500 dark:text-slate-400">Dalam pengembangan</span></div>
        </section>
      </main>
      <footer className="catalog-container catalog-footer"><span>PyDocs.id</span><span>Belajar. Praktik. Ulangi.</span></footer>
    </div>
  );
}
