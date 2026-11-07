import { DocSection } from "../types";

export const bab4Matplotlib: DocSection = {
  id: "matplotlib-bab4-bar-pie",
  number: 4,
  filePath: "app/data/matplotlib-chapters/bab4-bar-pie.ts",
  title: "Grafik Batang & Proporsi",
  subtitle: "Membandingkan kategori dengan bar/barh dan mengenali batas penggunaan pie chart.",
  level: "Menengah",
  readTime: "15 menit",
  summary: "Grafik batang memudahkan perbandingan kategori. Gunakan batang horizontal untuk nama kategori panjang dan sumbu nilai yang dimulai dari nol agar perbandingan panjang jujur. Pie chart dapat menunjukkan bagian dari total dengan sedikit kategori dan nilai nonnegatif; untuk perbandingan presisi, grafik batang biasanya lebih mudah dibaca.",
  keyPoints: [
    "`ax.bar(kategori, nilai)` membuat batang vertikal; `barh` membuat batang horizontal.",
    "Objek BarContainer memiliki `patches` yang dapat diperiksa tinggi atau lebarnya.",
    "`ax.bar_label(container)` memberi angka pada batang.",
    "Kelompok batang memerlukan posisi x yang digeser agar tidak saling menutupi.",
    "`ax.pie(nilai, labels=..., autopct=\"%1.0f%%\")` menampilkan proporsi; total harus positif."
  ],
  conceptTable: {
    title: "Referensi Grafik Batang & Proporsi",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "bar",
        "ax.bar([\"A\", \"B\"], [10, 20])",
        "Perbandingan vertikal"
      ],
      [
        "barh",
        "ax.barh([\"A\", \"B\"], [10, 20])",
        "Perbandingan horizontal"
      ],
      [
        "bar_label",
        "ax.bar_label(bars)",
        "Menambahkan nilai"
      ],
      [
        "pie",
        "ax.pie([30, 70], labels=[\"A\", \"B\"])",
        "Bagian dari satu total"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab4-ex1",
      title: "Batang penjualan",
      description: "Buat batang kategori A, B, C dengan nilai 12, 18, 15. Cetak jumlah batang.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
bars = ax.bar(["A", "B", "C"], [12, 18, 15])
print(len(bars))`,
      output: `3`,
      lineExplanations: [
        {
          line: "bars = ax.bar([\"A\", \"B\", \"C\"], [12, 18, 15])",
          explanation: "Buat batang kategori A, B, C dengan nilai 12, 18, 15. Cetak jumlah batang."
        }
      ]
    },
    {
      id: "mpl-bab4-ex2",
      title: "Batang horizontal",
      description: "Gambar barh kategori Buku dan Pensil dengan nilai 20 dan 35. Cetak lebar batang pertama.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
bars = ax.barh(["Buku", "Pensil"], [20, 35])
print(bars[0].get_width())`,
      output: `20`,
      lineExplanations: [
        {
          line: "bars = ax.barh([\"Buku\", \"Pensil\"], [20, 35])",
          explanation: "Gambar barh kategori Buku dan Pensil dengan nilai 20 dan 35. Cetak lebar batang pertama."
        }
      ]
    },
    {
      id: "mpl-bab4-ex3",
      title: "Label nilai",
      description: "Gambar batang A=10 dan B=20, lalu beri label angka menggunakan bar_label. Cetak teks label.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
bars = ax.bar(["A", "B"], [10, 20])
labels = ax.bar_label(bars)
print([label.get_text() for label in labels])`,
      output: `['10', '20']`,
      lineExplanations: [
        {
          line: "labels = ax.bar_label(bars)",
          explanation: "Gambar batang A=10 dan B=20, lalu beri label angka menggunakan bar_label. Cetak teks label."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `ax.bar([0, 1], [10, 15])
ax.bar([0, 1], [12, 18])`,
      correct: `ax.bar([-0.2, 0.8], [10, 15], width=0.4)
ax.bar([0.2, 1.2], [12, 18], width=0.4)`,
      reason: "Batang pada posisi yang sama saling menutupi."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab4-ch1",
      title: "Batang penjualan",
      difficulty: "Mudah",
      instructions: "Buat batang kategori A, B, C dengan nilai 12, 18, 15. Cetak jumlah batang.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(len(bars))`,
      expectedOutput: `3`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `bars = ax.bar([\"A\", \"B\", \"C\"], [12, 18, 15])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
bars = ax.bar(["A", "B", "C"], [12, 18, 15])
print(len(bars))`
    },
    {
      id: "mpl-bab4-ch2",
      title: "Batang horizontal",
      difficulty: "Mudah",
      instructions: "Gambar barh kategori Buku dan Pensil dengan nilai 20 dan 35. Cetak lebar batang pertama.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(bars[0].get_width())`,
      expectedOutput: `20`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `bars = ax.barh([\"Buku\", \"Pensil\"], [20, 35])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
bars = ax.barh(["Buku", "Pensil"], [20, 35])
print(bars[0].get_width())`
    },
    {
      id: "mpl-bab4-ch3",
      title: "Label nilai",
      difficulty: "Mudah",
      instructions: "Gambar batang A=10 dan B=20, lalu beri label angka menggunakan bar_label. Cetak teks label.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
bars = ax.bar(["A", "B"], [10, 20])
# Lengkapi kode visualisasi di sini

print([label.get_text() for label in labels])`,
      expectedOutput: `['10', '20']`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `labels = ax.bar_label(bars)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
bars = ax.bar(["A", "B"], [10, 20])
labels = ax.bar_label(bars)
print([label.get_text() for label in labels])`
    },
    {
      id: "mpl-bab4-ch4",
      title: "Proporsi kanal",
      difficulty: "Mudah",
      instructions: "Buat pie untuk Online=60 dan Toko=40 dengan label kategori serta persentase bulat. Cetak teks persentase.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print([text.get_text() for text in percents])`,
      expectedOutput: `['60%', '40%']`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `wedges, texts, percents = ax.pie([60, 40], labels=[\"Online\", \"Toko\"], autopct=\"%1.0f%%\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
wedges, texts, percents = ax.pie([60, 40], labels=["Online", "Toko"], autopct="%1.0f%%")
print([text.get_text() for text in percents])`
    },
    {
      id: "mpl-bab4-ch5",
      title: "Baseline nol",
      difficulty: "Mudah",
      instructions: "Buat batang A=95 dan B=100. Atur batas sumbu y dari 0 hingga 110. Cetak batasnya.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.bar(["A", "B"], [95, 100])
# Lengkapi kode visualisasi di sini

print(tuple(float(value) for value in ax.get_ylim()))`,
      expectedOutput: `(0.0, 110.0)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.set_ylim(0, 110)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.bar(["A", "B"], [95, 100])
ax.set_ylim(0, 110)
print(tuple(float(value) for value in ax.get_ylim()))`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab4-case1",
      title: "Ranking produk",
      difficulty: "Sedang",
      instructions: "Toko ingin melihat produk terlaris. Urutkan pasangan Buku=25, Pena=40, Tas=10 dari terkecil, lalu gambar barh. Cetak urutan nama.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

data = [("Buku", 25), ("Pena", 40), ("Tas", 10)]
fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(list(nama))`,
      expectedOutput: `['Tas', 'Buku', 'Pena']`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `urutan = sorted(data, key=lambda item: item[1])`.",
      solutionCode: `import matplotlib.pyplot as plt

data = [("Buku", 25), ("Pena", 40), ("Tas", 10)]
fig, ax = plt.subplots()
urutan = sorted(data, key=lambda item: item[1])
nama, jumlah = zip(*urutan)
ax.barh(nama, jumlah)
print(list(nama))`,
      scenario: "Toko ingin melihat produk terlaris. Urutkan pasangan Buku=25, Pena=40, Tas=10 dari terkecil, lalu gambar barh. Cetak urutan nama."
    },
    {
      id: "mpl-bab4-case2",
      title: "Perbandingan dua tahun",
      difficulty: "Sedang",
      instructions: "Bandingkan nilai 2024 [10, 15] dan 2025 [12, 18] untuk dua cabang. Geser posisi batang ±0.2, gunakan width=0.4, lalu tampilkan legenda. Cetak jumlah batang.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
x = [0, 1]
# Lengkapi kode visualisasi di sini

print(len(ax.patches))`,
      expectedOutput: `4`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.bar([v - 0.2 for v in x], [10, 15], width=0.4, label=\"2024\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
x = [0, 1]
ax.bar([v - 0.2 for v in x], [10, 15], width=0.4, label="2024")
ax.bar([v + 0.2 for v in x], [12, 18], width=0.4, label="2025")
ax.set_xticks(x, ["Utara", "Selatan"])
ax.legend()
print(len(ax.patches))`,
      scenario: "Bandingkan nilai 2024 [10, 15] dan 2025 [12, 18] untuk dua cabang. Geser posisi batang ±0.2, gunakan width=0.4, lalu tampilkan legenda. Cetak jumlah batang."
    }
  ],
  quizzes: [
    {
      question: "Grafik utama untuk membandingkan kategori?",
      options: [
        "Grafik batang",
        "Grafik garis untuk setiap kategori acak",
        "Scatter tanpa koordinat",
        "Histogram nama"
      ],
      correctIndex: 0,
      explanation: "Panjang batang memudahkan perbandingan nilai."
    },
    {
      question: "Fungsi batang horizontal?",
      options: [
        "ax.hbarplot()",
        "ax.barh()",
        "ax.horizontal()",
        "plt.row()"
      ],
      correctIndex: 1,
      explanation: "barh menempatkan nilai pada sumbu x."
    },
    {
      question: "Mengapa batang umumnya dimulai dari nol?",
      options: [
        "Nol mengurutkan label",
        "Agar warna tidak berubah",
        "Panjang batang mewakili besar nilai",
        "Supaya data menjadi persen"
      ],
      correctIndex: 2,
      explanation: "Baseline terpotong dapat melebihkan perbedaan."
    },
    {
      question: "Cara menambahkan nilai pada batang?",
      options: [
        "ax.legend_values()",
        "bars.print()",
        "fig.numbers()",
        "ax.bar_label(bars)"
      ],
      correctIndex: 3,
      explanation: "bar_label menerima BarContainer."
    },
    {
      question: "get_height() pada batang vertikal memberikan ...",
      options: [
        "Tinggi batang dalam satuan data",
        "Resolusi PNG",
        "Ukuran font",
        "Jumlah kategori"
      ],
      correctIndex: 0,
      explanation: "Tinggi sesuai nilai yang diplot."
    },
    {
      question: "Kapan barh berguna?",
      options: [
        "Semua nilai harus logaritmik",
        "Nama kategori cukup panjang",
        "Data selalu berupa gambar",
        "Tidak ada kategori"
      ],
      correctIndex: 1,
      explanation: "Ruang horizontal memudahkan pembacaan nama."
    },
    {
      question: "Pie chart sesuai untuk ...",
      options: [
        "Nilai negatif campur positif",
        "Ribuan kategori",
        "Sedikit kategori yang membentuk satu total",
        "Data tanpa total bermakna"
      ],
      correctIndex: 2,
      explanation: "Pie menekankan komposisi bagian terhadap total."
    },
    {
      question: "autopct pada pie mengatur ...",
      options: [
        "Ukuran Figure",
        "Warna garis sumbu",
        "Jumlah data",
        "Format teks persentase"
      ],
      correctIndex: 3,
      explanation: "Misalnya %1.0f%% menampilkan persen bulat."
    },
    {
      question: "Agar dua seri batang berdampingan, atur ...",
      options: [
        "Posisi x dan width masing-masing seri",
        "Judul berbeda saja",
        "DPI lebih besar",
        "Nama variabel lebih panjang"
      ],
      correctIndex: 0,
      explanation: "Pergeseran posisi mencegah batang saling menutupi."
    },
    {
      question: "Mengurutkan ranking harus memindahkan ...",
      options: [
        "Nama saja",
        "Kategori dan nilainya bersama-sama",
        "Nilai saja",
        "Judul Figure saja"
      ],
      correctIndex: 1,
      explanation: "Hubungan kategori dengan nilai wajib dipertahankan."
    }
  ]
};
