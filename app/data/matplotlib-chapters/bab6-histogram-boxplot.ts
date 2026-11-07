import { DocSection } from "../types";

export const bab6Matplotlib: DocSection = {
  id: "matplotlib-bab6-histogram-boxplot",
  number: 6,
  filePath: "app/data/matplotlib-chapters/bab6-histogram-boxplot.ts",
  title: "Histogram & Box Plot",
  subtitle: "Mengenali distribusi data, memilih bins, dan membandingkan sebaran beberapa kelompok.",
  level: "Menengah",
  readTime: "15 menit",
  summary: "Histogram membagi nilai numerik menjadi interval lalu menghitung banyaknya observasi per interval. Pilihan bins memengaruhi pola yang terlihat. Box plot merangkum median, kuartil, dan whisker; secara default whisker mengikuti aturan 1.5 IQR dan nilai di luarnya ditampilkan sebagai calon pencilan. Gunakan konteks untuk menilai pencilan, bukan langsung menghapusnya.",
  keyPoints: [
    "`ax.hist(data, bins=...)` mengembalikan counts, batas bin, dan objek gambar.",
    "Batas bin eksplisit membantu membandingkan beberapa kelompok secara konsisten.",
    "Pada histogram standar, semua bin kecuali yang terakhir tidak memasukkan batas kanan; bin terakhir memasukkannya.",
    "`density=True` menormalkan luas total histogram menjadi satu, bukan jumlah tinggi batang.",
    "`ax.boxplot([kelompok1, kelompok2])` membandingkan ringkasan distribusi."
  ],
  conceptTable: {
    title: "Referensi Histogram & Box Plot",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "hist",
        "counts, edges, patches = ax.hist(data)",
        "Frekuensi per interval"
      ],
      [
        "bins",
        "bins=[0, 10, 20, 30]",
        "Batas interval eksplisit"
      ],
      [
        "density",
        "density=True",
        "Normalisasi luas"
      ],
      [
        "boxplot",
        "ax.boxplot([[1, 2, 3], [2, 4, 6]])",
        "Ringkasan kelompok"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab6-ex1",
      title: "Frekuensi interval",
      description: "Buat histogram [1, 2, 2, 3, 4] dengan bins [0, 2, 4, 6]. Cetak frekuensi.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
counts, edges, patches = ax.hist([1, 2, 2, 3, 4], bins=[0, 2, 4, 6])
print(counts.tolist())`,
      output: `[1.0, 3.0, 1.0]`,
      lineExplanations: [
        {
          line: "counts, edges, patches = ax.hist([1, 2, 2, 3, 4], bins=[0, 2, 4, 6])",
          explanation: "Buat histogram [1, 2, 2, 3, 4] dengan bins [0, 2, 4, 6]. Cetak frekuensi."
        }
      ]
    },
    {
      id: "mpl-bab6-ex2",
      title: "Batas bin",
      description: "Buat histogram [5, 12, 18, 25] dengan bins [0, 10, 20, 30]. Cetak batas bin.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
counts, edges, patches = ax.hist([5, 12, 18, 25], bins=[0, 10, 20, 30])
print(edges.tolist())`,
      output: `[0.0, 10.0, 20.0, 30.0]`,
      lineExplanations: [
        {
          line: "counts, edges, patches = ax.hist([5, 12, 18, 25], bins=[0, 10, 20, 30])",
          explanation: "Buat histogram [5, 12, 18, 25] dengan bins [0, 10, 20, 30]. Cetak batas bin."
        }
      ]
    },
    {
      id: "mpl-bab6-ex3",
      title: "Jumlah observasi",
      description: "Gambar histogram [2, 3, 5, 7, 8, 9] dengan bins [0, 5, 10]. Cetak jumlah frekuensi sebagai integer.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
counts, edges, patches = ax.hist([2, 3, 5, 7, 8, 9], bins=[0, 5, 10])
print(int(counts.sum()))`,
      output: `6`,
      lineExplanations: [
        {
          line: "counts, edges, patches = ax.hist([2, 3, 5, 7, 8, 9], bins=[0, 5, 10])",
          explanation: "Gambar histogram [2, 3, 5, 7, 8, 9] dengan bins [0, 5, 10]. Cetak jumlah frekuensi sebagai integer."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `ax.hist([1, 2, 3], bins=[10, 20, 30])`,
      correct: `ax.hist([1, 2, 3], bins=[0, 2, 4])`,
      reason: "Nilai di luar rentang batas bin tidak dihitung dalam histogram."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab6-ch1",
      title: "Frekuensi interval",
      difficulty: "Mudah",
      instructions: "Buat histogram [1, 2, 2, 3, 4] dengan bins [0, 2, 4, 6]. Cetak frekuensi.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(counts.tolist())`,
      expectedOutput: `[1.0, 3.0, 1.0]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `counts, edges, patches = ax.hist([1, 2, 2, 3, 4], bins=[0, 2, 4, 6])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
counts, edges, patches = ax.hist([1, 2, 2, 3, 4], bins=[0, 2, 4, 6])
print(counts.tolist())`
    },
    {
      id: "mpl-bab6-ch2",
      title: "Batas bin",
      difficulty: "Mudah",
      instructions: "Buat histogram [5, 12, 18, 25] dengan bins [0, 10, 20, 30]. Cetak batas bin.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(edges.tolist())`,
      expectedOutput: `[0.0, 10.0, 20.0, 30.0]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `counts, edges, patches = ax.hist([5, 12, 18, 25], bins=[0, 10, 20, 30])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
counts, edges, patches = ax.hist([5, 12, 18, 25], bins=[0, 10, 20, 30])
print(edges.tolist())`
    },
    {
      id: "mpl-bab6-ch3",
      title: "Jumlah observasi",
      difficulty: "Mudah",
      instructions: "Gambar histogram [2, 3, 5, 7, 8, 9] dengan bins [0, 5, 10]. Cetak jumlah frekuensi sebagai integer.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(int(counts.sum()))`,
      expectedOutput: `6`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `counts, edges, patches = ax.hist([2, 3, 5, 7, 8, 9], bins=[0, 5, 10])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
counts, edges, patches = ax.hist([2, 3, 5, 7, 8, 9], bins=[0, 5, 10])
print(int(counts.sum()))`
    },
    {
      id: "mpl-bab6-ch4",
      title: "Median box plot",
      difficulty: "Mudah",
      instructions: "Buat box plot [2, 4, 6, 8, 10]. Cetak median dari objek median pertama sebagai float.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(float(box["medians"][0].get_ydata()[0]))`,
      expectedOutput: `6.0`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `box = ax.boxplot([2, 4, 6, 8, 10])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
box = ax.boxplot([2, 4, 6, 8, 10])
print(float(box["medians"][0].get_ydata()[0]))`
    },
    {
      id: "mpl-bab6-ch5",
      title: "Dua distribusi",
      difficulty: "Mudah",
      instructions: "Buat box plot kelompok [1, 2, 3] dan [4, 6, 8]. Cetak jumlah kotak.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(len(box["boxes"]))`,
      expectedOutput: `2`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `box = ax.boxplot([[1, 2, 3], [4, 6, 8]])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
box = ax.boxplot([[1, 2, 3], [4, 6, 8]])
print(len(box["boxes"]))`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab6-case1",
      title: "Distribusi nilai kelas",
      difficulty: "Sedang",
      instructions: "Nilai siswa adalah [55, 65, 72, 78, 85, 92]. Buat histogram dengan bins [50, 70, 90, 100], beri judul Distribusi Nilai. Cetak frekuensi dan judul.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(counts.tolist())
print(ax.get_title())`,
      expectedOutput: `[2.0, 3.0, 1.0]
Distribusi Nilai`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `counts, edges, patches = ax.hist([55, 65, 72, 78, 85, 92], bins=[50, 70, 90, 100], edgecolor=\"black\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
counts, edges, patches = ax.hist([55, 65, 72, 78, 85, 92], bins=[50, 70, 90, 100], edgecolor="black")
ax.set_title("Distribusi Nilai")
print(counts.tolist())
print(ax.get_title())`,
      scenario: "Nilai siswa adalah [55, 65, 72, 78, 85, 92]. Buat histogram dengan bins [50, 70, 90, 100], beri judul Distribusi Nilai. Cetak frekuensi dan judul."
    },
    {
      id: "mpl-bab6-case2",
      title: "Membandingkan waktu layanan",
      difficulty: "Sedang",
      instructions: "Bandingkan waktu layanan tim A [2, 3, 4] dan tim B [4, 6, 8] menggunakan box plot. Beri ticks A dan B, lalu cetak median kedua kelompok.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print([float(line.get_ydata()[0]) for line in box["medians"]])`,
      expectedOutput: `[3.0, 6.0]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `box = ax.boxplot([[2, 3, 4], [4, 6, 8]])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
box = ax.boxplot([[2, 3, 4], [4, 6, 8]])
ax.set_xticks([1, 2], ["A", "B"])
print([float(line.get_ydata()[0]) for line in box["medians"]])`,
      scenario: "Bandingkan waktu layanan tim A [2, 3, 4] dan tim B [4, 6, 8] menggunakan box plot. Beri ticks A dan B, lalu cetak median kedua kelompok."
    }
  ],
  quizzes: [
    {
      question: "Histogram terutama menampilkan ...",
      options: [
        "Distribusi nilai numerik",
        "Nama kategori tanpa nilai",
        "Struktur class",
        "Jalur file"
      ],
      correctIndex: 0,
      explanation: "Histogram mengelompokkan nilai ke interval."
    },
    {
      question: "bins menentukan ...",
      options: [
        "Jumlah Figure",
        "Jumlah atau batas interval",
        "Warna teks",
        "Ukuran legenda"
      ],
      correctIndex: 1,
      explanation: "Pilihan bins memengaruhi detail distribusi."
    },
    {
      question: "Hasil pertama ax.hist() adalah ...",
      options: [
        "Judul grafik",
        "Nama file",
        "Frekuensi atau density per bin",
        "Objek Figure"
      ],
      correctIndex: 2,
      explanation: "Secara default hasil pertama adalah hitungan observasi."
    },
    {
      question: "Nilai tepat di batas kanan bin terakhir ...",
      options: [
        "Selalu dibuang",
        "Masuk bin baru otomatis",
        "Menjadi nol",
        "Termasuk bin terakhir"
      ],
      correctIndex: 3,
      explanation: "Bin terakhir memasukkan kedua batasnya."
    },
    {
      question: "Jika seluruh data masuk rentang bin, jumlah counts adalah ...",
      options: [
        "Jumlah observasi",
        "Selalu satu",
        "Jumlah judul",
        "Lebar Figure"
      ],
      correctIndex: 0,
      explanation: "Setiap observasi dihitung sekali dalam histogram standar."
    },
    {
      question: "density=True menormalkan ...",
      options: [
        "Jumlah semua tinggi menjadi satu selalu",
        "Luas total histogram menjadi satu",
        "Jumlah Figure menjadi satu",
        "Semua data menjadi nol"
      ],
      correctIndex: 1,
      explanation: "Luas memperhitungkan lebar masing-masing bin."
    },
    {
      question: "Garis di dalam kotak box plot menunjukkan ...",
      options: [
        "Selalu mean",
        "Nilai maksimum",
        "Median",
        "Jumlah data"
      ],
      correctIndex: 2,
      explanation: "Median adalah titik tengah data terurut."
    },
    {
      question: "Kotak box plot membentang dari ...",
      options: [
        "Minimum hingga maksimum selalu",
        "Nol hingga mean",
        "Mean hingga maksimum",
        "Kuartil pertama hingga kuartil ketiga"
      ],
      correctIndex: 3,
      explanation: "Panjang kotak merupakan IQR."
    },
    {
      question: "Titik di luar whisker sebaiknya ...",
      options: [
        "Diperiksa dengan konteks",
        "Selalu dihapus",
        "Diubah menjadi nol",
        "Disembunyikan dari laporan"
      ],
      correctIndex: 0,
      explanation: "Calon pencilan dapat valid atau berasal dari masalah data."
    },
    {
      question: "Untuk membandingkan histogram beberapa kelompok, sebaiknya ...",
      options: [
        "Gunakan satuan berbeda",
        "Gunakan batas bin yang sama",
        "Hilangkan semua label",
        "Acak semua nilai"
      ],
      correctIndex: 1,
      explanation: "Batas yang konsisten memudahkan perbandingan."
    }
  ]
};
