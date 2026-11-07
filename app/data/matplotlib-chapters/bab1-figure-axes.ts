import { DocSection } from "../types";

export const bab1Matplotlib: DocSection = {
  id: "matplotlib-bab1-figure-axes",
  number: 1,
  filePath: "app/data/matplotlib-chapters/bab1-figure-axes.ts",
  title: "Pengenalan Matplotlib, Figure & Axes",
  subtitle: "Membuat kanvas, area gambar, dan grafik pertama dengan API berorientasi objek.",
  level: "Dasar",
  readTime: "15 menit",
  summary: "Matplotlib adalah pustaka visualisasi Python. Figure merupakan seluruh kanvas, sedangkan Axes adalah area tempat data digambar. Satu Figure dapat memiliki beberapa Axes. Pelajari Python dasar terlebih dahulu; NumPy dan Pandas membantu untuk data yang lebih besar, tetapi contoh awal cukup memakai list. Di komputer lokal, pasang dengan `python -m pip install matplotlib`. Di situs ini pustaka dimuat otomatis saat kode dijalankan.",
  keyPoints: [
    "Gunakan `import matplotlib.pyplot as plt` sebagai konvensi impor.",
    "`fig, ax = plt.subplots()` menghasilkan Figure dan satu Axes.",
    "`ax.plot(x, y)` menggambar pasangan data dengan panjang yang sama.",
    "`figsize=(lebar, tinggi)` menggunakan satuan inci.",
    "Di Python lokal, gunakan `plt.show()` untuk menampilkan grafik. Di situs ini grafik dirender otomatis setelah eksekusi; jangan tutup Figure sebelum hasil ditampilkan."
  ],
  conceptTable: {
    title: "Referensi Pengenalan Matplotlib, Figure & Axes",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "plt.subplots()",
        "fig, ax = plt.subplots()",
        "Membuat kanvas dan area gambar"
      ],
      [
        "fig.axes",
        "len(fig.axes)",
        "Jumlah area gambar"
      ],
      [
        "ax.plot(x, y)",
        "ax.plot([1, 2], [4, 6])",
        "Grafik garis"
      ],
      [
        "plt.close(fig)",
        "plt.close(fig)",
        "Melepas Figure setelah selesai digunakan"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab1-ex1",
      title: "Grafik pertama",
      description: "Buat satu Figure dan Axes, gambar nilai [3, 5, 4] pada x [1, 2, 3]. Cetak jumlah garis.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [3, 5, 4])
print(len(ax.lines))`,
      output: `1`,
      lineExplanations: [
        {
          line: "ax.plot([1, 2, 3], [3, 5, 4])",
          explanation: "Buat satu Figure dan Axes, gambar nilai [3, 5, 4] pada x [1, 2, 3]. Cetak jumlah garis."
        }
      ]
    },
    {
      id: "mpl-bab1-ex2",
      title: "Ukuran kanvas",
      description: "Buat Figure berukuran 6 × 4 inci, lalu cetak ukurannya sebagai list.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 4))
print(fig.get_size_inches().tolist())`,
      output: `[6.0, 4.0]`,
      lineExplanations: [
        {
          line: "fig, ax = plt.subplots(figsize=(6, 4))",
          explanation: "Buat Figure berukuran 6 × 4 inci, lalu cetak ukurannya sebagai list."
        }
      ]
    },
    {
      id: "mpl-bab1-ex3",
      title: "Jumlah Axes",
      description: "Buat Figure dengan satu Axes. Cetak jumlah Axes pada Figure.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
print(len(fig.axes))`,
      output: `1`,
      lineExplanations: [
        {
          line: "fig, ax = plt.subplots()",
          explanation: "Buat Figure dengan satu Axes. Cetak jumlah Axes pada Figure."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `fig, ax = plt.subplots()
ax.plot([1, 2], [5])`,
      correct: `fig, ax = plt.subplots()
ax.plot([1, 2], [5, 8])`,
      reason: "Jumlah koordinat x dan y harus sama."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab1-ch1",
      title: "Grafik pertama",
      difficulty: "Mudah",
      instructions: "Buat satu Figure dan Axes, gambar nilai [3, 5, 4] pada x [1, 2, 3]. Cetak jumlah garis.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(len(ax.lines))`,
      expectedOutput: `1`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.plot([1, 2, 3], [3, 5, 4])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [3, 5, 4])
print(len(ax.lines))`
    },
    {
      id: "mpl-bab1-ch2",
      title: "Ukuran kanvas",
      difficulty: "Mudah",
      instructions: "Buat Figure berukuran 6 × 4 inci, lalu cetak ukurannya sebagai list.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(fig.get_size_inches().tolist())`,
      expectedOutput: `[6.0, 4.0]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, ax = plt.subplots(figsize=(6, 4))`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 4))
print(fig.get_size_inches().tolist())`
    },
    {
      id: "mpl-bab1-ch3",
      title: "Jumlah Axes",
      difficulty: "Mudah",
      instructions: "Buat Figure dengan satu Axes. Cetak jumlah Axes pada Figure.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(len(fig.axes))`,
      expectedOutput: `1`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, ax = plt.subplots()`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
print(len(fig.axes))`
    },
    {
      id: "mpl-bab1-ch4",
      title: "Membaca data garis",
      difficulty: "Mudah",
      instructions: "Gambar nilai [10, 15, 12] dengan x [0, 1, 2]. Cetak data y dari garis pertama.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(ax.lines[0].get_ydata().tolist())`,
      expectedOutput: `[10, 15, 12]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.plot([0, 1, 2], [10, 15, 12])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([0, 1, 2], [10, 15, 12])
print(ax.lines[0].get_ydata().tolist())`
    },
    {
      id: "mpl-bab1-ch5",
      title: "Dua Figure terpisah",
      difficulty: "Mudah",
      instructions: "Buat dua Figure terpisah dan cetak jumlah Figure terbuka.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(len(plt.get_fignums()))`,
      expectedOutput: `2`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig1, ax1 = plt.subplots()`.",
      solutionCode: `import matplotlib.pyplot as plt

fig1, ax1 = plt.subplots()
fig2, ax2 = plt.subplots()
print(len(plt.get_fignums()))`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab1-case1",
      title: "Pemantauan pengunjung",
      difficulty: "Sedang",
      instructions: "Tim web mencatat pengunjung Senin–Rabu: 120, 150, 135. Gambar grafik garis dan cetak nilai maksimum data y.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

hari = [1, 2, 3]
pengunjung = [120, 150, 135]
fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(max(ax.lines[0].get_ydata()))`,
      expectedOutput: `150`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.plot(hari, pengunjung)`.",
      solutionCode: `import matplotlib.pyplot as plt

hari = [1, 2, 3]
pengunjung = [120, 150, 135]
fig, ax = plt.subplots()
ax.plot(hari, pengunjung)
print(max(ax.lines[0].get_ydata()))`,
      scenario: "Tim web mencatat pengunjung Senin–Rabu: 120, 150, 135. Gambar grafik garis dan cetak nilai maksimum data y."
    },
    {
      id: "mpl-bab1-case2",
      title: "Kanvas laporan",
      difficulty: "Sedang",
      instructions: "Siapkan kanvas 8 × 3 inci berisi satu Axes. Cetak ukuran kanvas dan jumlah Axes.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(fig.get_size_inches().tolist())
print(len(fig.axes))`,
      expectedOutput: `[8.0, 3.0]
1`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, ax = plt.subplots(figsize=(8, 3))`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 3))
print(fig.get_size_inches().tolist())
print(len(fig.axes))`,
      scenario: "Siapkan kanvas 8 × 3 inci berisi satu Axes. Cetak ukuran kanvas dan jumlah Axes."
    }
  ],
  quizzes: [
    {
      question: "Apa fungsi utama Matplotlib?",
      options: [
        "Membuat visualisasi data",
        "Mengelola database",
        "Melatih semua model AI",
        "Menggantikan bahasa Python"
      ],
      correctIndex: 0,
      explanation: "Matplotlib mengubah data menjadi grafik."
    },
    {
      question: "Alias impor pyplot yang lazim adalah ...",
      options: [
        "pd",
        "plt",
        "np",
        "sns"
      ],
      correctIndex: 1,
      explanation: "Konvensinya adalah import matplotlib.pyplot as plt."
    },
    {
      question: "Figure mewakili ...",
      options: [
        "Satu titik data",
        "Label sumbu x",
        "Seluruh kanvas grafik",
        "Hanya legenda"
      ],
      correctIndex: 2,
      explanation: "Figure menampung satu atau beberapa Axes."
    },
    {
      question: "Axes mewakili ...",
      options: [
        "Paket instalasi",
        "Seluruh folder data",
        "Daftar warna saja",
        "Area tempat data digambar"
      ],
      correctIndex: 3,
      explanation: "Axes mengelola plot, label, dan batas koordinat."
    },
    {
      question: "Apa hasil plt.subplots() tanpa argumen?",
      options: [
        "Satu Figure dan satu Axes",
        "Dua Figure",
        "Sebuah DataFrame",
        "File PNG"
      ],
      correctIndex: 0,
      explanation: "Keduanya biasa ditampung pada fig dan ax."
    },
    {
      question: "Satuan figsize adalah ...",
      options: [
        "Piksel",
        "Inci",
        "Sentimeter",
        "Persen layar"
      ],
      correctIndex: 1,
      explanation: "Ukuran piksel hasil raster juga dipengaruhi DPI."
    },
    {
      question: "Apa fungsi ax.plot(x, y)?",
      options: [
        "Menyimpan CSV",
        "Membuat folder",
        "Menggambar garis dari pasangan x dan y",
        "Memasang paket"
      ],
      correctIndex: 2,
      explanation: "plot menerima koordinat data."
    },
    {
      question: "Untuk satu garis, panjang x dan y sebaiknya ...",
      options: [
        "Selalu satu",
        "Selalu berbeda",
        "Tidak memiliki aturan",
        "Sama"
      ],
      correctIndex: 3,
      explanation: "Setiap x harus memiliki nilai y pasangannya."
    },
    {
      question: "Di skrip Python lokal, fungsi penampil Figure adalah ...",
      options: [
        "plt.show()",
        "plt.print()",
        "ax.open()",
        "fig.run()"
      ],
      correctIndex: 0,
      explanation: "show meminta backend menampilkan Figure."
    },
    {
      question: "Mengapa Figure jangan ditutup sebelum hasil dirender di situs ini?",
      options: [
        "Data berubah menjadi string",
        "Figure yang ditutup tidak ikut ditampilkan",
        "Python tidak bisa diimpor",
        "Semua label menjadi nol"
      ],
      correctIndex: 1,
      explanation: "Renderer mengambil Figure yang masih terbuka setelah eksekusi."
    }
  ]
};
