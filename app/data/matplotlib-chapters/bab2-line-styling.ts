import { DocSection } from "../types";

export const bab2Matplotlib: DocSection = {
  id: "matplotlib-bab2-line-styling",
  number: 2,
  filePath: "app/data/matplotlib-chapters/bab2-line-styling.ts",
  title: "Grafik Garis & Pengaturan Tampilan",
  subtitle: "Menggambar tren, membandingkan seri, serta mengatur warna, marker, dan pola garis.",
  level: "Dasar",
  readTime: "15 menit",
  summary: "Grafik garis cocok untuk data berurutan seperti waktu. Hubungkan titik sesuai urutan x; Matplotlib tidak mengurutkannya untukmu. Gunakan warna dan pola garis yang konsisten agar beberapa seri mudah dibedakan. Marker membantu pembaca melihat posisi observasi yang sebenarnya.",
  keyPoints: [
    "Gunakan `color`, `linestyle`, `linewidth`, dan `marker` pada `ax.plot()`.",
    "Panggil `ax.plot()` beberapa kali untuk membandingkan beberapa seri.",
    "`label` memberi nama seri; tampilkan namanya dengan `ax.legend()`.",
    "Urutkan pasangan x-y bersama-sama bila data waktu belum berurutan.",
    "Jangan memakai warna sebagai satu-satunya pembeda; tambahkan marker atau pola garis."
  ],
  conceptTable: {
    title: "Referensi Grafik Garis & Pengaturan Tampilan",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "color",
        "color='teal'",
        "Warna garis"
      ],
      [
        "linestyle",
        "linestyle='--'",
        "Pola putus-putus"
      ],
      [
        "marker",
        "marker='o'",
        "Penanda setiap observasi"
      ],
      [
        "linewidth",
        "linewidth=2",
        "Ketebalan garis"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab2-ex1",
      title: "Warna garis",
      description: "Gambar [2, 4, 3] pada x [1, 2, 3] dengan warna teal. Cetak warna garis.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
line, = ax.plot([1, 2, 3], [2, 4, 3], color="teal")
print(line.get_color())`,
      output: `teal`,
      lineExplanations: [
        {
          line: "line, = ax.plot([1, 2, 3], [2, 4, 3], color=\"teal\")",
          explanation: "Gambar [2, 4, 3] pada x [1, 2, 3] dengan warna teal. Cetak warna garis."
        }
      ]
    },
    {
      id: "mpl-bab2-ex2",
      title: "Marker observasi",
      description: "Gambar [3, 6, 5] pada x [1, 2, 3] memakai marker lingkaran. Cetak marker.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
line, = ax.plot([1, 2, 3], [3, 6, 5], marker="o")
print(line.get_marker())`,
      output: `o`,
      lineExplanations: [
        {
          line: "line, = ax.plot([1, 2, 3], [3, 6, 5], marker=\"o\")",
          explanation: "Gambar [3, 6, 5] pada x [1, 2, 3] memakai marker lingkaran. Cetak marker."
        }
      ]
    },
    {
      id: "mpl-bab2-ex3",
      title: "Pola putus-putus",
      description: "Gambar garis dari (1, 5) ke (2, 8) dengan linestyle --. Cetak polanya.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
line, = ax.plot([1, 2], [5, 8], linestyle="--")
print(line.get_linestyle())`,
      output: `--`,
      lineExplanations: [
        {
          line: "line, = ax.plot([1, 2], [5, 8], linestyle=\"--\")",
          explanation: "Gambar garis dari (1, 5) ke (2, 8) dengan linestyle --. Cetak polanya."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `ax.plot([3, 1, 2], [30, 10, 20])`,
      correct: `x, y = zip(*sorted([(3, 30), (1, 10), (2, 20)]))
ax.plot(x, y)`,
      reason: "Data waktu yang tidak berurutan menghasilkan garis yang bolak-balik."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab2-ch1",
      title: "Warna garis",
      difficulty: "Mudah",
      instructions: "Gambar [2, 4, 3] pada x [1, 2, 3] dengan warna teal. Cetak warna garis.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(line.get_color())`,
      expectedOutput: `teal`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `line, = ax.plot([1, 2, 3], [2, 4, 3], color=\"teal\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
line, = ax.plot([1, 2, 3], [2, 4, 3], color="teal")
print(line.get_color())`
    },
    {
      id: "mpl-bab2-ch2",
      title: "Marker observasi",
      difficulty: "Mudah",
      instructions: "Gambar [3, 6, 5] pada x [1, 2, 3] memakai marker lingkaran. Cetak marker.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(line.get_marker())`,
      expectedOutput: `o`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `line, = ax.plot([1, 2, 3], [3, 6, 5], marker=\"o\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
line, = ax.plot([1, 2, 3], [3, 6, 5], marker="o")
print(line.get_marker())`
    },
    {
      id: "mpl-bab2-ch3",
      title: "Pola putus-putus",
      difficulty: "Mudah",
      instructions: "Gambar garis dari (1, 5) ke (2, 8) dengan linestyle --. Cetak polanya.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(line.get_linestyle())`,
      expectedOutput: `--`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `line, = ax.plot([1, 2], [5, 8], linestyle=\"--\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
line, = ax.plot([1, 2], [5, 8], linestyle="--")
print(line.get_linestyle())`
    },
    {
      id: "mpl-bab2-ch4",
      title: "Ketebalan garis",
      difficulty: "Mudah",
      instructions: "Buat garis dari (0, 0) ke (1, 1) setebal 2.5. Cetak ketebalannya.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(line.get_linewidth())`,
      expectedOutput: `2.5`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `line, = ax.plot([0, 1], [0, 1], linewidth=2.5)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
line, = ax.plot([0, 1], [0, 1], linewidth=2.5)
print(line.get_linewidth())`
    },
    {
      id: "mpl-bab2-ch5",
      title: "Dua seri",
      difficulty: "Mudah",
      instructions: "Plot seri [4, 6, 8] dan [3, 5, 7] terhadap x [1, 2, 3]. Cetak jumlah garis.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(len(ax.lines))`,
      expectedOutput: `2`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.plot([1, 2, 3], [4, 6, 8])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [4, 6, 8])
ax.plot([1, 2, 3], [3, 5, 7])
print(len(ax.lines))`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab2-case1",
      title: "Aktual dan target",
      difficulty: "Sedang",
      instructions: "Bandingkan penjualan aktual [8, 12, 10] dan target [10, 10, 10] pada hari 1–3. Beri label Aktual dan Target, lalu tampilkan legenda. Cetak label seri.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(ax.get_legend_handles_labels()[1])`,
      expectedOutput: `['Aktual', 'Target']`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.plot([1, 2, 3], [8, 12, 10], marker=\"o\", label=\"Aktual\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [8, 12, 10], marker="o", label="Aktual")
ax.plot([1, 2, 3], [10, 10, 10], linestyle="--", label="Target")
ax.legend()
print(ax.get_legend_handles_labels()[1])`,
      scenario: "Bandingkan penjualan aktual [8, 12, 10] dan target [10, 10, 10] pada hari 1–3. Beri label Aktual dan Target, lalu tampilkan legenda. Cetak label seri."
    },
    {
      id: "mpl-bab2-case2",
      title: "Mengurutkan data waktu",
      difficulty: "Sedang",
      instructions: "Data hari dan omzet belum berurutan: (3, 30), (1, 10), (2, 20). Urutkan pasangan sebelum menggambar. Cetak x garis.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

data = [(3, 30), (1, 10), (2, 20)]
fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(line.get_xdata().tolist())`,
      expectedOutput: `[1, 2, 3]`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `x, y = zip(*sorted(data))`.",
      solutionCode: `import matplotlib.pyplot as plt

data = [(3, 30), (1, 10), (2, 20)]
fig, ax = plt.subplots()
x, y = zip(*sorted(data))
line, = ax.plot(x, y, marker="s")
print(line.get_xdata().tolist())`,
      scenario: "Data hari dan omzet belum berurutan: (3, 30), (1, 10), (2, 20). Urutkan pasangan sebelum menggambar. Cetak x garis."
    }
  ],
  quizzes: [
    {
      question: "Grafik garis paling sesuai untuk ...",
      options: [
        "Tren data berurutan",
        "Proporsi kategori tanpa urutan saja",
        "Isi file teks",
        "Struktur folder"
      ],
      correctIndex: 0,
      explanation: "Garis menekankan perubahan antarobservasi yang berurutan."
    },
    {
      question: "Parameter warna garis adalah ...",
      options: [
        "colourmap",
        "color",
        "paint",
        "fillname"
      ],
      correctIndex: 1,
      explanation: "color menerima nama warna atau kode warna."
    },
    {
      question: "marker=\"o\" menghasilkan ...",
      options: [
        "Garis putus-putus",
        "Batang horizontal",
        "Penanda lingkaran",
        "Sumbu logaritmik"
      ],
      correctIndex: 2,
      explanation: "Marker menunjukkan posisi observasi."
    },
    {
      question: "linestyle=\"--\" menghasilkan ...",
      options: [
        "Garis tanpa warna",
        "Lingkaran besar",
        "Latar abu-abu",
        "Garis putus-putus"
      ],
      correctIndex: 3,
      explanation: "Pola garis membantu membedakan seri."
    },
    {
      question: "Parameter ketebalan garis adalah ...",
      options: [
        "linewidth",
        "linesizepx",
        "thicknesspx",
        "weightline"
      ],
      correctIndex: 0,
      explanation: "linewidth mengatur lebar garis dalam point."
    },
    {
      question: "Cara menambahkan seri kedua pada Axes yang sama?",
      options: [
        "Selalu buat Figure baru",
        "Panggil ax.plot() lagi",
        "Panggil plt.install()",
        "Ubah list menjadi CSV"
      ],
      correctIndex: 1,
      explanation: "Satu Axes dapat menampung beberapa garis."
    },
    {
      question: "Apa fungsi label pada plot?",
      options: [
        "Mengurutkan data",
        "Mengubah satuan x",
        "Menamai seri untuk legenda",
        "Menyimpan gambar"
      ],
      correctIndex: 2,
      explanation: "Legenda mengambil nama dari label seri."
    },
    {
      question: "Apakah ax.plot() otomatis mengurutkan x?",
      options: [
        "Ya, selalu menaik",
        "Ya, selalu menurun",
        "Hanya jika marker ada",
        "Tidak, urutannya mengikuti input"
      ],
      correctIndex: 3,
      explanation: "Urutkan pasangan x-y terlebih dahulu bila diperlukan."
    },
    {
      question: "Mengapa gunakan warna dan pola garis sekaligus?",
      options: [
        "Seri lebih mudah dibedakan oleh beragam pembaca",
        "Membuat data lebih besar",
        "Mengubah nilai rata-rata",
        "Menghilangkan legenda"
      ],
      correctIndex: 0,
      explanation: "Pola memberi pembeda tambahan selain warna."
    },
    {
      question: "Apa makna line, = ax.plot(...) ?",
      options: [
        "Membuat tuple kosong",
        "Mengambil satu objek garis dari list hasil plot",
        "Menghapus garis",
        "Mengurutkan Figure"
      ],
      correctIndex: 1,
      explanation: "plot mengembalikan list Line2D; koma melakukan unpacking satu elemen."
    }
  ]
};
