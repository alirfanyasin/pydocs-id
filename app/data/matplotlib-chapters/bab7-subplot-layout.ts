import { DocSection } from "../types";

export const bab7Matplotlib: DocSection = {
  id: "matplotlib-bab7-subplot-layout",
  number: 7,
  filePath: "app/data/matplotlib-chapters/bab7-subplot-layout.ts",
  title: "Subplot, Layout & Sumbu Bersama",
  subtitle: "Menyusun beberapa grafik dalam satu Figure dengan tata letak yang mudah dibandingkan.",
  level: "Menengah",
  readTime: "15 menit",
  summary: "Subplot memungkinkan beberapa sudut pandang data disajikan dalam satu kanvas. `plt.subplots()` dapat mengembalikan satu Axes, array satu dimensi, atau array dua dimensi, tergantung jumlah baris dan kolom. Pahami bentuk hasilnya sebelum mengakses setiap panel. Gunakan sumbu bersama hanya saat unit dan skala memang sebanding.",
  keyPoints: [
    "`plt.subplots(1, 2)` mengembalikan array Axes satu dimensi.",
    "`plt.subplots(2, 2)` mengembalikan array dua dimensi: akses dengan `axes[baris, kolom]`.",
    "`squeeze=False` mempertahankan bentuk array dua dimensi, termasuk untuk grid 1 × 1.",
    "`sharex=True` atau `sharey=True` menyelaraskan sumbu antarpanel.",
    "`layout=\"constrained\"` membantu menghindari label bertabrakan; `fig.suptitle()` menambahkan judul bersama."
  ],
  conceptTable: {
    title: "Referensi Subplot, Layout & Sumbu Bersama",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "subplots(1, 2)",
        "fig, axes = plt.subplots(1, 2)",
        "Dua panel sejajar"
      ],
      [
        "axes[r, c]",
        "axes[0, 1].plot([1, 2], [3, 4])",
        "Akses panel grid 2D"
      ],
      [
        "sharey",
        "plt.subplots(1, 2, sharey=True)",
        "Rentang y bersama"
      ],
      [
        "suptitle",
        "fig.suptitle(\"Laporan\")",
        "Judul seluruh Figure"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab7-ex1",
      title: "Dua panel",
      description: "Buat subplot satu baris dua kolom. Gambar garis pada panel kiri dan batang pada panel kanan. Cetak jumlah Axes.",
      code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, layout="constrained")
axes[0].plot([1, 2], [3, 5])
axes[1].bar(["A", "B"], [4, 6])
print(len(fig.axes))`,
      output: `2`,
      lineExplanations: [
        {
          line: "fig, axes = plt.subplots(1, 2, layout=\"constrained\")",
          explanation: "Buat subplot satu baris dua kolom. Gambar garis pada panel kiri dan batang pada panel kanan. Cetak jumlah Axes."
        }
      ]
    },
    {
      id: "mpl-bab7-ex2",
      title: "Grid 2 × 2",
      description: "Buat grid 2 × 2. Gambar garis pada panel kanan bawah dan cetak bentuk array Axes.",
      code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, layout="constrained")
axes[1, 1].plot([1, 2], [2, 4])
print(axes.shape)`,
      output: `(2, 2)`,
      lineExplanations: [
        {
          line: "fig, axes = plt.subplots(2, 2, layout=\"constrained\")",
          explanation: "Buat grid 2 × 2. Gambar garis pada panel kanan bawah dan cetak bentuk array Axes."
        }
      ]
    },
    {
      id: "mpl-bab7-ex3",
      title: "Judul bersama",
      description: "Buat dua panel vertikal dan beri suptitle Laporan Mingguan. Cetak teks judul yang dikembalikan suptitle.",
      code: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, layout="constrained")
judul = fig.suptitle("Laporan Mingguan")
print(judul.get_text())`,
      output: `Laporan Mingguan`,
      lineExplanations: [
        {
          line: "judul = fig.suptitle(\"Laporan Mingguan\")",
          explanation: "Buat dua panel vertikal dan beri suptitle Laporan Mingguan. Cetak teks judul yang dikembalikan suptitle."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `fig, axes = plt.subplots(2, 2)
axes[0].plot([1, 2], [3, 4])`,
      correct: `fig, axes = plt.subplots(2, 2)
axes[0, 0].plot([1, 2], [3, 4])`,
      reason: "Pada array 2D, axes[0] masih array satu baris, bukan objek Axes."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab7-ch1",
      title: "Dua panel",
      difficulty: "Mudah",
      instructions: "Buat subplot satu baris dua kolom. Gambar garis pada panel kiri dan batang pada panel kanan. Cetak jumlah Axes.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(len(fig.axes))`,
      expectedOutput: `2`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, axes = plt.subplots(1, 2, layout=\"constrained\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, layout="constrained")
axes[0].plot([1, 2], [3, 5])
axes[1].bar(["A", "B"], [4, 6])
print(len(fig.axes))`
    },
    {
      id: "mpl-bab7-ch2",
      title: "Grid 2 × 2",
      difficulty: "Mudah",
      instructions: "Buat grid 2 × 2. Gambar garis pada panel kanan bawah dan cetak bentuk array Axes.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(axes.shape)`,
      expectedOutput: `(2, 2)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, axes = plt.subplots(2, 2, layout=\"constrained\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, layout="constrained")
axes[1, 1].plot([1, 2], [2, 4])
print(axes.shape)`
    },
    {
      id: "mpl-bab7-ch3",
      title: "Judul bersama",
      difficulty: "Mudah",
      instructions: "Buat dua panel vertikal dan beri suptitle Laporan Mingguan. Cetak teks judul yang dikembalikan suptitle.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, layout="constrained")
# Lengkapi kode visualisasi di sini

print(judul.get_text())`,
      expectedOutput: `Laporan Mingguan`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `judul = fig.suptitle(\"Laporan Mingguan\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, layout="constrained")
judul = fig.suptitle("Laporan Mingguan")
print(judul.get_text())`
    },
    {
      id: "mpl-bab7-ch4",
      title: "Array dua dimensi",
      difficulty: "Mudah",
      instructions: "Buat grid 1 × 1 dengan squeeze=False. Akses axes[0, 0], beri judul Panel, dan cetak bentuk array.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(axes.shape)`,
      expectedOutput: `(1, 1)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, axes = plt.subplots(1, 1, squeeze=False)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 1, squeeze=False)
axes[0, 0].set_title("Panel")
print(axes.shape)`
    },
    {
      id: "mpl-bab7-ch5",
      title: "Rentang y bersama",
      difficulty: "Mudah",
      instructions: "Buat dua panel dengan sharey=True. Atur batas panel kiri 0–20, lalu cetak batas panel kanan.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(tuple(float(value) for value in axes[1].get_ylim()))`,
      expectedOutput: `(0.0, 20.0)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, axes = plt.subplots(1, 2, sharey=True)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, sharey=True)
axes[0].set_ylim(0, 20)
print(tuple(float(value) for value in axes[1].get_ylim()))`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab7-case1",
      title: "Ringkasan penjualan",
      difficulty: "Sedang",
      instructions: "Buat dua panel: tren [10, 15, 12] pada hari 1–3 dan batang cabang A=20, B=17. Beri judul Tren dan Cabang. Cetak daftar judul panel.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print([ax.get_title() for ax in axes])`,
      expectedOutput: `['Tren', 'Cabang']`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout=\"constrained\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout="constrained")
axes[0].plot([1, 2, 3], [10, 15, 12], marker="o")
axes[0].set_title("Tren")
axes[1].bar(["A", "B"], [20, 17])
axes[1].set_title("Cabang")
print([ax.get_title() for ax in axes])`,
      scenario: "Buat dua panel: tren [10, 15, 12] pada hari 1–3 dan batang cabang A=20, B=17. Beri judul Tren dan Cabang. Cetak daftar judul panel."
    },
    {
      id: "mpl-bab7-case2",
      title: "Empat indikator",
      difficulty: "Sedang",
      instructions: "Buat grid 2 × 2 dengan constrained layout. Isi setiap panel dengan garis [i, i+1] terhadap [1, 2], beri judul Indikator 1 hingga 4. Cetak jumlah garis seluruh panel.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(sum(len(ax.lines) for ax in axes.flat))`,
      expectedOutput: `4`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, axes = plt.subplots(2, 2, layout=\"constrained\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, layout="constrained")
for i, ax in enumerate(axes.flat, start=1):
    ax.plot([1, 2], [i, i + 1])
    ax.set_title(f"Indikator {i}")
print(sum(len(ax.lines) for ax in axes.flat))`,
      scenario: "Buat grid 2 × 2 dengan constrained layout. Isi setiap panel dengan garis [i, i+1] terhadap [1, 2], beri judul Indikator 1 hingga 4. Cetak jumlah garis seluruh panel."
    }
  ],
  quizzes: [
    {
      question: "plt.subplots(1, 2) membuat ...",
      options: [
        "Satu Figure dengan dua Axes",
        "Dua Figure terpisah",
        "Dua file otomatis",
        "Satu Axes saja"
      ],
      correctIndex: 0,
      explanation: "Argumen menyatakan baris dan kolom."
    },
    {
      question: "Untuk grid 2 × 2, akses kanan bawah adalah ...",
      options: [
        "axes[2, 2]",
        "axes[1, 1]",
        "axes[0, 0]",
        "axes[1, 2]"
      ],
      correctIndex: 1,
      explanation: "Indeks dimulai dari nol."
    },
    {
      question: "Hasil Axes dari subplots() tanpa argumen adalah ...",
      options: [
        "Selalu array 2D",
        "List string",
        "Satu objek Axes",
        "File SVG"
      ],
      correctIndex: 2,
      explanation: "squeeze default menyederhanakan bentuk hasil."
    },
    {
      question: "squeeze=False memastikan ...",
      options: [
        "Tidak ada label",
        "Tidak ada Figure",
        "Data selalu integer",
        "Array Axes tetap dua dimensi"
      ],
      correctIndex: 3,
      explanation: "Ini memudahkan pola indeks yang konsisten."
    },
    {
      question: "sharey=True berarti ...",
      options: [
        "Panel berbagi pengaturan rentang y",
        "Panel selalu berbagi semua data",
        "Panel memiliki judul sama",
        "Panel harus memakai warna sama"
      ],
      correctIndex: 0,
      explanation: "Batas y tersinkron antar-Axes terkait."
    },
    {
      question: "Sumbu bersama paling tepat ketika ...",
      options: [
        "Unit panel berbeda jauh",
        "Besaran dan satuan panel sebanding",
        "Semua label hilang",
        "Data tidak numerik"
      ],
      correctIndex: 1,
      explanation: "Pembaca perlu perbandingan skala yang bermakna."
    },
    {
      question: "layout=\"constrained\" membantu ...",
      options: [
        "Mengurutkan nilai data",
        "Menyimpan CSV",
        "Menyediakan ruang untuk label dan judul",
        "Mengubah tipe variabel"
      ],
      correctIndex: 2,
      explanation: "Layout engine menyesuaikan posisi panel."
    },
    {
      question: "Judul untuk seluruh Figure ditambahkan dengan ...",
      options: [
        "ax.superlabel()",
        "plt.filetitle()",
        "axes.name()",
        "fig.suptitle()"
      ],
      correctIndex: 3,
      explanation: "Judul tiap panel tetap dapat diatur terpisah."
    },
    {
      question: "axes.flat berguna untuk ...",
      options: [
        "Mengiterasi semua Axes dalam array",
        "Membuat nilai data menjadi nol",
        "Menghapus grid",
        "Mengubah data menjadi teks"
      ],
      correctIndex: 0,
      explanation: "Iterator flat menyederhanakan loop atas grid."
    },
    {
      question: "Satu panel tren dan satu panel distribusi berguna untuk ...",
      options: [
        "Menggandakan jumlah observasi",
        "Melihat beberapa aspek dari data",
        "Menghilangkan kebutuhan label",
        "Membuktikan kausalitas"
      ],
      correctIndex: 1,
      explanation: "Panel berbeda saling melengkapi konteks."
    }
  ]
};
