import { DocSection } from "../types";

export const bab5Matplotlib: DocSection = {
  id: "matplotlib-bab5-scatter-korelasi",
  number: 5,
  filePath: "app/data/matplotlib-chapters/bab5-scatter-korelasi.ts",
  title: "Scatter Plot & Hubungan Antarvariabel",
  subtitle: "Memvisualisasikan pasangan numerik, transparansi, ukuran titik, serta pemetaan warna.",
  level: "Menengah",
  readTime: "15 menit",
  summary: "Scatter plot menampilkan setiap observasi sebagai satu titik pada dua variabel numerik. Pola titik dapat menunjukkan hubungan, kelompok, atau pencilan, tetapi hubungan visual tidak membuktikan sebab akibat. Warna dan ukuran dapat menyandikan variabel tambahan bila arti keduanya dijelaskan.",
  keyPoints: [
    "`ax.scatter(x, y)` mengembalikan PathCollection, bukan list garis.",
    "`s` mengatur luas marker dalam point kuadrat; `alpha` mengatur transparansi.",
    "`c` berisi nilai numerik dapat dipetakan melalui `cmap`.",
    "`fig.colorbar(points, ax=ax)` menerangkan nilai yang dipetakan ke warna.",
    "Gunakan alpha untuk titik bertumpuk dan hindari menarik kesimpulan kausal hanya dari pola."
  ],
  conceptTable: {
    title: "Referensi Scatter Plot & Hubungan Antarvariabel",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "scatter",
        "ax.scatter([1, 2], [3, 5])",
        "Pasangan numerik"
      ],
      [
        "s",
        "s=[20, 80]",
        "Luas tiap marker"
      ],
      [
        "alpha",
        "alpha=0.5",
        "Transparansi"
      ],
      [
        "colorbar",
        "fig.colorbar(points, ax=ax)",
        "Skala pemetaan warna"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab5-ex1",
      title: "Scatter pertama",
      description: "Gambar pasangan x [1, 2, 3] dan y [2, 4, 5]. Cetak jumlah titik.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3], [2, 4, 5])
print(len(points.get_offsets()))`,
      output: `3`,
      lineExplanations: [
        {
          line: "points = ax.scatter([1, 2, 3], [2, 4, 5])",
          explanation: "Gambar pasangan x [1, 2, 3] dan y [2, 4, 5]. Cetak jumlah titik."
        }
      ]
    },
    {
      id: "mpl-bab5-ex2",
      title: "Transparansi titik",
      description: "Gambar tiga titik dengan alpha=0.5. Cetak nilai alpha.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3], [2, 3, 4], alpha=0.5)
print(points.get_alpha())`,
      output: `0.5`,
      lineExplanations: [
        {
          line: "points = ax.scatter([1, 2, 3], [2, 3, 4], alpha=0.5)",
          explanation: "Gambar tiga titik dengan alpha=0.5. Cetak nilai alpha."
        }
      ]
    },
    {
      id: "mpl-bab5-ex3",
      title: "Ukuran titik",
      description: "Gambar dua titik (1, 3) dan (2, 5) dengan luas marker 20 dan 80. Cetak daftar ukurannya.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2], [3, 5], s=[20, 80])
print(points.get_sizes().tolist())`,
      output: `[20, 80]`,
      lineExplanations: [
        {
          line: "points = ax.scatter([1, 2], [3, 5], s=[20, 80])",
          explanation: "Gambar dua titik (1, 3) dan (2, 5) dengan luas marker 20 dan 80. Cetak daftar ukurannya."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `points = ax.scatter([1, 2], [3, 4], c=[10, 20])`,
      correct: `points = ax.scatter([1, 2], [3, 4], c=[10, 20])
fig.colorbar(points, ax=ax, label="Volume")`,
      reason: "Pemetaan warna numerik membutuhkan skala agar dapat ditafsirkan."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab5-ch1",
      title: "Scatter pertama",
      difficulty: "Mudah",
      instructions: "Gambar pasangan x [1, 2, 3] dan y [2, 4, 5]. Cetak jumlah titik.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(len(points.get_offsets()))`,
      expectedOutput: `3`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `points = ax.scatter([1, 2, 3], [2, 4, 5])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3], [2, 4, 5])
print(len(points.get_offsets()))`
    },
    {
      id: "mpl-bab5-ch2",
      title: "Transparansi titik",
      difficulty: "Mudah",
      instructions: "Gambar tiga titik dengan alpha=0.5. Cetak nilai alpha.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(points.get_alpha())`,
      expectedOutput: `0.5`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `points = ax.scatter([1, 2, 3], [2, 3, 4], alpha=0.5)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3], [2, 3, 4], alpha=0.5)
print(points.get_alpha())`
    },
    {
      id: "mpl-bab5-ch3",
      title: "Ukuran titik",
      difficulty: "Mudah",
      instructions: "Gambar dua titik (1, 3) dan (2, 5) dengan luas marker 20 dan 80. Cetak daftar ukurannya.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(points.get_sizes().tolist())`,
      expectedOutput: `[20, 80]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `points = ax.scatter([1, 2], [3, 5], s=[20, 80])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2], [3, 5], s=[20, 80])
print(points.get_sizes().tolist())`
    },
    {
      id: "mpl-bab5-ch4",
      title: "Pemetaan warna",
      difficulty: "Mudah",
      instructions: "Gambar tiga titik dengan nilai warna [10, 20, 30] menggunakan cmap viridis. Cetak nama colormap.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(points.get_cmap().name)`,
      expectedOutput: `viridis`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `points = ax.scatter([1, 2, 3], [4, 3, 6], c=[10, 20, 30], cmap=\"viridis\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3], [4, 3, 6], c=[10, 20, 30], cmap="viridis")
print(points.get_cmap().name)`
    },
    {
      id: "mpl-bab5-ch5",
      title: "Skala colorbar",
      difficulty: "Mudah",
      instructions: "Buat scatter dua titik dengan nilai warna 10 dan 20. Tambahkan colorbar berlabel Volume. Cetak label colorbar.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2], [3, 5], c=[10, 20])
# Lengkapi kode visualisasi di sini

print(bar.ax.get_ylabel())`,
      expectedOutput: `Volume`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `bar = fig.colorbar(points, ax=ax)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2], [3, 5], c=[10, 20])
bar = fig.colorbar(points, ax=ax)
bar.set_label("Volume")
print(bar.ax.get_ylabel())`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab5-case1",
      title: "Belajar dan nilai",
      difficulty: "Sedang",
      instructions: "Gambar hubungan jam belajar [1, 2, 3, 4] dan nilai [55, 65, 72, 80]. Beri label Jam belajar dan Nilai. Cetak jumlah titik dan label x.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(len(points.get_offsets()))
print(ax.get_xlabel())`,
      expectedOutput: `4
Jam belajar`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `points = ax.scatter([1, 2, 3, 4], [55, 65, 72, 80], alpha=0.7)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3, 4], [55, 65, 72, 80], alpha=0.7)
ax.set_xlabel("Jam belajar")
ax.set_ylabel("Nilai")
print(len(points.get_offsets()))
print(ax.get_xlabel())`,
      scenario: "Gambar hubungan jam belajar [1, 2, 3, 4] dan nilai [55, 65, 72, 80]. Beri label Jam belajar dan Nilai. Cetak jumlah titik dan label x."
    },
    {
      id: "mpl-bab5-case2",
      title: "Menyoroti pencilan",
      difficulty: "Sedang",
      instructions: "Gambar titik (1, 2), (2, 3), (3, 12). Anotasikan Periksa pada (3, 12). Cetak koordinat titik terakhir sebagai float dan teks anotasi.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3], [2, 3, 12])
# Lengkapi kode visualisasi di sini

print([float(v) for v in points.get_offsets()[-1]])
print(note.get_text())`,
      expectedOutput: `[3.0, 12.0]
Periksa`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `note = ax.annotate(\"Periksa\", xy=(3, 12), xytext=(2, 10), arrowprops={\"arrowstyle\": \"->\"})`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
points = ax.scatter([1, 2, 3], [2, 3, 12])
note = ax.annotate("Periksa", xy=(3, 12), xytext=(2, 10), arrowprops={"arrowstyle": "->"})
print([float(v) for v in points.get_offsets()[-1]])
print(note.get_text())`,
      scenario: "Gambar titik (1, 2), (2, 3), (3, 12). Anotasikan Periksa pada (3, 12). Cetak koordinat titik terakhir sebagai float dan teks anotasi."
    }
  ],
  quizzes: [
    {
      question: "Scatter plot terutama menunjukkan ...",
      options: [
        "Hubungan dua variabel numerik",
        "Urutan folder",
        "Komposisi file",
        "Label kategori saja"
      ],
      correctIndex: 0,
      explanation: "Setiap titik mempunyai pasangan koordinat numerik."
    },
    {
      question: "Hasil ax.scatter() adalah ...",
      options: [
        "List Line2D",
        "PathCollection",
        "DataFrame",
        "String PNG"
      ],
      correctIndex: 1,
      explanation: "Kumpulan titik disimpan sebagai collection."
    },
    {
      question: "s pada scatter mengatur ...",
      options: [
        "Diameter dalam inci",
        "Nilai sumbu x",
        "Luas marker dalam point kuadrat",
        "Jumlah subplot"
      ],
      correctIndex: 2,
      explanation: "Luas berbeda dari radius atau diameter."
    },
    {
      question: "alpha=0.3 membuat titik ...",
      options: [
        "Lebih besar tiga kali",
        "Selalu merah",
        "Bergeser ke nol",
        "Lebih transparan daripada alpha=1"
      ],
      correctIndex: 3,
      explanation: "Alpha rendah membantu melihat penumpukan."
    },
    {
      question: "cmap digunakan untuk ...",
      options: [
        "Memetakan nilai menjadi warna",
        "Mengurutkan x",
        "Menentukan ukuran file",
        "Menambah judul"
      ],
      correctIndex: 0,
      explanation: "Gunakan c berisi nilai untuk pemetaan numerik."
    },
    {
      question: "Agar warna numerik dapat dibaca, tambahkan ...",
      options: [
        "Garis tanpa label",
        "Colorbar",
        "Judul kosong",
        "Marker lain saja"
      ],
      correctIndex: 1,
      explanation: "Colorbar menjelaskan skala warna."
    },
    {
      question: "get_offsets() memberi ...",
      options: [
        "Nama folder",
        "Daftar font",
        "Koordinat titik scatter",
        "Resolusi kanvas"
      ],
      correctIndex: 2,
      explanation: "Setiap baris memuat koordinat x dan y."
    },
    {
      question: "Titik yang jauh dari pola umum disebut ...",
      options: [
        "Legenda",
        "Baseline",
        "Backend",
        "Pencilan"
      ],
      correctIndex: 3,
      explanation: "Pencilan perlu diperiksa dalam konteks data."
    },
    {
      question: "Pola nilai naik bersama membuktikan sebab akibat?",
      options: [
        "Tidak, perlu bukti tambahan",
        "Ya, selalu",
        "Ya, jika warna sama",
        "Ya, jika lebih dari tiga titik"
      ],
      correctIndex: 0,
      explanation: "Hubungan visual belum menjelaskan penyebabnya."
    },
    {
      question: "Jika x memiliki 4 nilai dan y memiliki 3, scatter ...",
      options: [
        "Mengisi nol otomatis",
        "Gagal karena jumlah pasangan berbeda",
        "Menghapus satu x otomatis",
        "Selalu membuat empat titik"
      ],
      correctIndex: 1,
      explanation: "Setiap titik memerlukan x dan y."
    }
  ]
};
