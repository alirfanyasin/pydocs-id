import { DocSection } from "../types";

export const bab3Matplotlib: DocSection = {
  id: "matplotlib-bab3-label-legenda-anotasi",
  number: 3,
  filePath: "app/data/matplotlib-chapters/bab3-label-legenda-anotasi.ts",
  title: "Judul, Label, Legenda & Anotasi",
  subtitle: "Memberi konteks, satuan, batas sumbu, grid, dan penjelasan titik penting.",
  level: "Dasar",
  readTime: "15 menit",
  summary: "Grafik yang informatif menjelaskan apa yang diukur, satuannya, dan arti setiap seri. Judul merangkum pesan utama; label sumbu menerangkan besaran. Legenda menghubungkan nama dengan tampilan seri. Gunakan anotasi untuk menyoroti kejadian tanpa memenuhi gambar dengan teks.",
  keyPoints: [
    "Gunakan `set_title`, `set_xlabel`, dan `set_ylabel` pada Axes.",
    "Cantumkan satuan, misalnya Pendapatan (juta rupiah).",
    "`legend()` membaca label objek yang sudah digambar.",
    "`set_xlim`, `set_ylim`, dan `set_xticks` mengatur rentang serta lokasi tanda sumbu.",
    "`annotate(text, xy=..., xytext=..., arrowprops=...)` menghubungkan keterangan dengan titik data."
  ],
  conceptTable: {
    title: "Referensi Judul, Label, Legenda & Anotasi",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "ax.set_title()",
        "ax.set_title(\"Penjualan\")",
        "Judul area gambar"
      ],
      [
        "ax.set_xlabel()",
        "ax.set_xlabel(\"Hari\")",
        "Label sumbu horizontal"
      ],
      [
        "ax.legend()",
        "ax.legend(loc=\"upper left\")",
        "Keterangan seri"
      ],
      [
        "ax.grid()",
        "ax.grid(axis=\"y\", alpha=0.3)",
        "Garis bantu pembacaan"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab3-ex1",
      title: "Judul grafik",
      description: "Gambar nilai [5, 8, 6] pada x [1, 2, 3], beri judul Penjualan Harian, lalu cetak judul.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [5, 8, 6])
ax.set_title("Penjualan Harian")
print(ax.get_title())`,
      output: `Penjualan Harian`,
      lineExplanations: [
        {
          line: "ax.set_title(\"Penjualan Harian\")",
          explanation: "Gambar nilai [5, 8, 6] pada x [1, 2, 3], beri judul Penjualan Harian, lalu cetak judul."
        }
      ]
    },
    {
      id: "mpl-bab3-ex2",
      title: "Label dan satuan",
      description: "Beri label Hari pada sumbu x dan Suhu (C) pada y, lalu cetak kedua label.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [28, 30, 29])
ax.set_xlabel("Hari")
ax.set_ylabel("Suhu (C)")
print(ax.get_xlabel())
print(ax.get_ylabel())`,
      output: `Hari
Suhu (C)`,
      lineExplanations: [
        {
          line: "ax.set_xlabel(\"Hari\")",
          explanation: "Beri label Hari pada sumbu x dan Suhu (C) pada y, lalu cetak kedua label."
        }
      ]
    },
    {
      id: "mpl-bab3-ex3",
      title: "Batas sumbu",
      description: "Plot nilai [4, 8] pada x [1, 2]. Atur batas y dari 0 hingga 10, lalu cetak batasnya.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2], [4, 8])
ax.set_ylim(0, 10)
print(tuple(float(value) for value in ax.get_ylim()))`,
      output: `(0.0, 10.0)`,
      lineExplanations: [
        {
          line: "ax.set_ylim(0, 10)",
          explanation: "Plot nilai [4, 8] pada x [1, 2]. Atur batas y dari 0 hingga 10, lalu cetak batasnya."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `ax.plot([1, 2], [10, 20])
ax.legend()`,
      correct: `ax.plot([1, 2], [10, 20], label="Omzet")
ax.legend()`,
      reason: "Legenda membutuhkan label seri yang bermakna."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab3-ch1",
      title: "Judul grafik",
      difficulty: "Mudah",
      instructions: "Gambar nilai [5, 8, 6] pada x [1, 2, 3], beri judul Penjualan Harian, lalu cetak judul.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [5, 8, 6])
# Lengkapi kode visualisasi di sini

print(ax.get_title())`,
      expectedOutput: `Penjualan Harian`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.set_title(\"Penjualan Harian\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [5, 8, 6])
ax.set_title("Penjualan Harian")
print(ax.get_title())`
    },
    {
      id: "mpl-bab3-ch2",
      title: "Label dan satuan",
      difficulty: "Mudah",
      instructions: "Beri label Hari pada sumbu x dan Suhu (C) pada y, lalu cetak kedua label.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [28, 30, 29])
# Lengkapi kode visualisasi di sini

print(ax.get_xlabel())
print(ax.get_ylabel())`,
      expectedOutput: `Hari
Suhu (C)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.set_xlabel(\"Hari\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [28, 30, 29])
ax.set_xlabel("Hari")
ax.set_ylabel("Suhu (C)")
print(ax.get_xlabel())
print(ax.get_ylabel())`
    },
    {
      id: "mpl-bab3-ch3",
      title: "Batas sumbu",
      difficulty: "Mudah",
      instructions: "Plot nilai [4, 8] pada x [1, 2]. Atur batas y dari 0 hingga 10, lalu cetak batasnya.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2], [4, 8])
# Lengkapi kode visualisasi di sini

print(tuple(float(value) for value in ax.get_ylim()))`,
      expectedOutput: `(0.0, 10.0)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.set_ylim(0, 10)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2], [4, 8])
ax.set_ylim(0, 10)
print(tuple(float(value) for value in ax.get_ylim()))`
    },
    {
      id: "mpl-bab3-ch4",
      title: "Tanda sumbu",
      difficulty: "Mudah",
      instructions: "Plot titik hari 1–3. Atur xticks tepat pada [1, 2, 3]. Cetak lokasinya sebagai list.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [4, 7, 5])
# Lengkapi kode visualisasi di sini

print(ax.get_xticks().tolist())`,
      expectedOutput: `[1, 2, 3]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.set_xticks([1, 2, 3])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [4, 7, 5])
ax.set_xticks([1, 2, 3])
print(ax.get_xticks().tolist())`
    },
    {
      id: "mpl-bab3-ch5",
      title: "Legenda seri",
      difficulty: "Mudah",
      instructions: "Gambar suhu [28, 31, 29] pada hari 1–3 dengan label Suhu, tampilkan legenda, lalu cetak teks entri pertama.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(ax.get_legend().get_texts()[0].get_text())`,
      expectedOutput: `Suhu`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.plot([1, 2, 3], [28, 31, 29], label=\"Suhu\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [28, 31, 29], label="Suhu")
ax.legend()
print(ax.get_legend().get_texts()[0].get_text())`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab3-case1",
      title: "Menandai puncak omzet",
      difficulty: "Sedang",
      instructions: "Omzet hari 1–3 adalah 10, 18, 12. Tambahkan anotasi Puncak pada (2, 18), dengan teks di (2, 20) dan panah ->. Cetak teks anotasi.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [10, 18, 12], marker="o")
# Lengkapi kode visualisasi di sini

print(note.get_text())`,
      expectedOutput: `Puncak`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `note = ax.annotate(\"Puncak\", xy=(2, 18), xytext=(2, 20), arrowprops={\"arrowstyle\": \"->\"})`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [10, 18, 12], marker="o")
note = ax.annotate("Puncak", xy=(2, 18), xytext=(2, 20), arrowprops={"arrowstyle": "->"})
print(note.get_text())`,
      scenario: "Omzet hari 1–3 adalah 10, 18, 12. Tambahkan anotasi Puncak pada (2, 18), dengan teks di (2, 20) dan panah ->. Cetak teks anotasi."
    },
    {
      id: "mpl-bab3-case2",
      title: "Grafik laporan bersatuan",
      difficulty: "Sedang",
      instructions: "Buat grafik pendapatan [12, 16, 14] pada hari 1–3. Beri judul Pendapatan, label Hari dan Juta rupiah, grid y, serta batas y 0–20. Cetak judul dan batas y.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [12, 16, 14])
# Lengkapi kode visualisasi di sini

print(ax.get_title())
print(tuple(float(value) for value in ax.get_ylim()))`,
      expectedOutput: `Pendapatan
(0.0, 20.0)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.set_title(\"Pendapatan\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [12, 16, 14])
ax.set_title("Pendapatan")
ax.set_xlabel("Hari")
ax.set_ylabel("Juta rupiah")
ax.grid(axis="y", alpha=0.3)
ax.set_ylim(0, 20)
print(ax.get_title())
print(tuple(float(value) for value in ax.get_ylim()))`,
      scenario: "Buat grafik pendapatan [12, 16, 14] pada hari 1–3. Beri judul Pendapatan, label Hari dan Juta rupiah, grid y, serta batas y 0–20. Cetak judul dan batas y."
    }
  ],
  quizzes: [
    {
      question: "Fungsi untuk judul Axes?",
      options: [
        "ax.set_title()",
        "ax.title_text()",
        "fig.label()",
        "plt.header()"
      ],
      correctIndex: 0,
      explanation: "Judul menjadi konteks area gambar."
    },
    {
      question: "Fungsi untuk label sumbu y?",
      options: [
        "ax.set_ytitle()",
        "ax.set_ylabel()",
        "ax.yname()",
        "fig.ylabel()"
      ],
      correctIndex: 1,
      explanation: "ylabel menjelaskan besaran vertikal."
    },
    {
      question: "Label sumbu yang lebih informatif adalah ...",
      options: [
        "Data",
        "Y",
        "Pendapatan (juta rupiah)",
        "Angka"
      ],
      correctIndex: 2,
      explanation: "Satuan membantu pembaca memahami skala."
    },
    {
      question: "Agar legend() memiliki nama seri, tambahkan ...",
      options: [
        "filename pada Figure",
        "dtype pada Axes",
        "index pada title",
        "label pada plot"
      ],
      correctIndex: 3,
      explanation: "Label seri digunakan sebagai teks legenda."
    },
    {
      question: "ax.set_ylim(0, 100) mengatur ...",
      options: [
        "Rentang sumbu y",
        "Jumlah observasi",
        "Ukuran kanvas",
        "Warna garis"
      ],
      correctIndex: 0,
      explanation: "Batas sumbu memengaruhi area data yang terlihat."
    },
    {
      question: "ax.set_xticks([1, 2, 3]) mengatur ...",
      options: [
        "Tiga Figure baru",
        "Lokasi tanda pada sumbu x",
        "Warna tiga garis",
        "Urutan label legenda"
      ],
      correctIndex: 1,
      explanation: "Ticks adalah lokasi tanda koordinat."
    },
    {
      question: "Grid yang halus membantu ...",
      options: [
        "Mengubah nilai asli",
        "Mengisi data hilang",
        "Membaca nilai terhadap sumbu",
        "Menyimpan grafik otomatis"
      ],
      correctIndex: 2,
      explanation: "Grid memberi panduan tanpa mengubah data."
    },
    {
      question: "Pada annotate(), xy menyatakan ...",
      options: [
        "Nama file gambar",
        "Ukuran font",
        "Jumlah label",
        "Koordinat titik yang diberi keterangan"
      ],
      correctIndex: 3,
      explanation: "xytext dapat memindahkan posisi teks."
    },
    {
      question: "Parameter arrowprops digunakan untuk ...",
      options: [
        "Mengatur panah anotasi",
        "Menghapus sumbu",
        "Menentukan jumlah batang",
        "Mengimpor data"
      ],
      correctIndex: 0,
      explanation: "Misalnya arrowstyle=\"->\" menambahkan panah ke titik."
    },
    {
      question: "Risiko batas sumbu terlalu sempit adalah ...",
      options: [
        "Data asli terhapus",
        "Sebagian data tidak terlihat",
        "Paket terhapus",
        "List otomatis memendek"
      ],
      correctIndex: 1,
      explanation: "Batas hanya mengatur tampilan, bukan mengubah data."
    }
  ]
};
