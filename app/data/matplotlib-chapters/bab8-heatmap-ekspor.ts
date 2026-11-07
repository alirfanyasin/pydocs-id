import { DocSection } from "../types";

export const bab8Matplotlib: DocSection = {
  id: "matplotlib-bab8-heatmap-ekspor",
  number: 8,
  filePath: "app/data/matplotlib-chapters/bab8-heatmap-ekspor.ts",
  title: "Heatmap, Gaya & Ekspor Laporan",
  subtitle: "Menggambar matriks, memakai gaya lokal, dan menyimpan visualisasi untuk laporan.",
  level: "Menengah",
  readTime: "15 menit",
  summary: "Heatmap memetakan nilai matriks ke warna. Lengkapi dengan colorbar dan label baris/kolom agar sel dapat dibaca. Untuk laporan, pilih gaya yang konsisten dan format ekspor yang sesuai: PNG adalah raster, sedangkan SVG/PDF mendukung elemen vektor. Simpan melalui objek Figure agar kanvas yang diekspor jelas.",
  keyPoints: [
    "`ax.imshow(matriks, cmap=...)` menggambar data dua dimensi.",
    "`vmin` dan `vmax` menetapkan skala warna yang konsisten antarheatmap.",
    "Gunakan colormap berurutan untuk besar nilai dan divergen untuk penyimpangan dari titik tengah.",
    "`with plt.style.context(\"ggplot\"):` membatasi perubahan gaya pada blok kode.",
    "`fig.savefig(..., dpi=150, bbox_inches=\"tight\")` menyimpan gambar. File di runtime browser bersifat sementara; contoh memeriksa buffer memori tanpa menjanjikan unduhan."
  ],
  conceptTable: {
    title: "Referensi Heatmap, Gaya & Ekspor Laporan",
    headers: [
      "Sintaks",
      "Contoh",
      "Kegunaan"
    ],
    rows: [
      [
        "imshow",
        "image = ax.imshow([[1, 2], [3, 4]])",
        "Memvisualisasikan matriks"
      ],
      [
        "colorbar",
        "fig.colorbar(image, ax=ax)",
        "Skala warna"
      ],
      [
        "style.context",
        "with plt.style.context(\"ggplot\"):",
        "Gaya sementara"
      ],
      [
        "savefig",
        "fig.savefig(buffer, format=\"png\")",
        "Ekspor ke file atau buffer"
      ]
    ]
  },
  examples: [
    {
      id: "mpl-bab8-ex1",
      title: "Heatmap pertama",
      description: "Tampilkan matriks [[1, 2], [3, 4]] dengan imshow dan cmap viridis. Cetak ukuran matriks gambar.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
image = ax.imshow([[1, 2], [3, 4]], cmap="viridis")
print(image.get_array().shape)`,
      output: `(2, 2)`,
      lineExplanations: [
        {
          line: "image = ax.imshow([[1, 2], [3, 4]], cmap=\"viridis\")",
          explanation: "Tampilkan matriks [[1, 2], [3, 4]] dengan imshow dan cmap viridis. Cetak ukuran matriks gambar."
        }
      ]
    },
    {
      id: "mpl-bab8-ex2",
      title: "Rentang warna",
      description: "Buat heatmap [[2, 4], [6, 8]] dengan vmin=0 dan vmax=10. Cetak rentang warna.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
image = ax.imshow([[2, 4], [6, 8]], vmin=0, vmax=10)
print(tuple(float(value) for value in image.get_clim()))`,
      output: `(0.0, 10.0)`,
      lineExplanations: [
        {
          line: "image = ax.imshow([[2, 4], [6, 8]], vmin=0, vmax=10)",
          explanation: "Buat heatmap [[2, 4], [6, 8]] dengan vmin=0 dan vmax=10. Cetak rentang warna."
        }
      ]
    },
    {
      id: "mpl-bab8-ex3",
      title: "Label heatmap",
      description: "Buat heatmap 2 × 2. Atur label kolom Senin, Selasa dan baris A, B. Cetak label kolom.",
      code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.imshow([[5, 8], [6, 9]])
ax.set_xticks([0, 1], ["Senin", "Selasa"])
ax.set_yticks([0, 1], ["A", "B"])
print([text.get_text() for text in ax.get_xticklabels()])`,
      output: `['Senin', 'Selasa']`,
      lineExplanations: [
        {
          line: "ax.set_xticks([0, 1], [\"Senin\", \"Selasa\"])",
          explanation: "Buat heatmap 2 × 2. Atur label kolom Senin, Selasa dan baris A, B. Cetak label kolom."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `ax.imshow([[1, 2], [3, 4]])`,
      correct: `image = ax.imshow([[1, 2], [3, 4]], vmin=0, vmax=5)
fig.colorbar(image, ax=ax, label="Nilai")`,
      reason: "Skala warna yang tidak dijelaskan membuat angka di balik warna sulit dibaca."
    }
  ],
  tips: [
    "Jalankan contoh dan ubah satu parameter untuk mengamati dampaknya.",
    "Grafik tampil setelah eksekusi. Output teks memeriksa properti grafik; penilaian otomatis mengikuti pencocokan output modul lain, sehingga periksa juga tampilan visualnya.",
    "Rujukan: https://matplotlib.org/stable/users/explain/quick_start.html"
  ],
  codingChallenges: [
    {
      id: "mpl-bab8-ch1",
      title: "Heatmap pertama",
      difficulty: "Mudah",
      instructions: "Tampilkan matriks [[1, 2], [3, 4]] dengan imshow dan cmap viridis. Cetak ukuran matriks gambar.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(image.get_array().shape)`,
      expectedOutput: `(2, 2)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `image = ax.imshow([[1, 2], [3, 4]], cmap=\"viridis\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
image = ax.imshow([[1, 2], [3, 4]], cmap="viridis")
print(image.get_array().shape)`
    },
    {
      id: "mpl-bab8-ch2",
      title: "Rentang warna",
      difficulty: "Mudah",
      instructions: "Buat heatmap [[2, 4], [6, 8]] dengan vmin=0 dan vmax=10. Cetak rentang warna.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
# Lengkapi kode visualisasi di sini

print(tuple(float(value) for value in image.get_clim()))`,
      expectedOutput: `(0.0, 10.0)`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `image = ax.imshow([[2, 4], [6, 8]], vmin=0, vmax=10)`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
image = ax.imshow([[2, 4], [6, 8]], vmin=0, vmax=10)
print(tuple(float(value) for value in image.get_clim()))`
    },
    {
      id: "mpl-bab8-ch3",
      title: "Label heatmap",
      difficulty: "Mudah",
      instructions: "Buat heatmap 2 × 2. Atur label kolom Senin, Selasa dan baris A, B. Cetak label kolom.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.imshow([[5, 8], [6, 9]])
# Lengkapi kode visualisasi di sini

print([text.get_text() for text in ax.get_xticklabels()])`,
      expectedOutput: `['Senin', 'Selasa']`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `ax.set_xticks([0, 1], [\"Senin\", \"Selasa\"])`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.imshow([[5, 8], [6, 9]])
ax.set_xticks([0, 1], ["Senin", "Selasa"])
ax.set_yticks([0, 1], ["A", "B"])
print([text.get_text() for text in ax.get_xticklabels()])`
    },
    {
      id: "mpl-bab8-ch4",
      title: "Ekspor PNG ke memori",
      difficulty: "Mudah",
      instructions: "Buat grafik garis lalu simpan ke BytesIO sebagai PNG dengan dpi=100. Cetak apakah awalan data adalah signature PNG.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

import io
fig, ax = plt.subplots()
ax.plot([1, 2], [3, 5])
buffer = io.BytesIO()
# Lengkapi kode visualisasi di sini

print(buffer.getvalue().startswith(bytes([137, 80, 78, 71, 13, 10, 26, 10])))`,
      expectedOutput: `True`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig.savefig(buffer, format=\"png\", dpi=100, bbox_inches=\"tight\")`.",
      solutionCode: `import matplotlib.pyplot as plt

import io
fig, ax = plt.subplots()
ax.plot([1, 2], [3, 5])
buffer = io.BytesIO()
fig.savefig(buffer, format="png", dpi=100, bbox_inches="tight")
print(buffer.getvalue().startswith(bytes([137, 80, 78, 71, 13, 10, 26, 10])))`
    },
    {
      id: "mpl-bab8-ch5",
      title: "Gaya sementara",
      difficulty: "Mudah",
      instructions: "Di dalam style.context ggplot, buat Figure dan garis [2, 3] pada x [1, 2]. Cetak jumlah garis.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

# Lengkapi kode visualisasi di sini

print(len(ax.lines))`,
      expectedOutput: `1`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `with plt.style.context(\"ggplot\"):`.",
      solutionCode: `import matplotlib.pyplot as plt

with plt.style.context("ggplot"):
    fig, ax = plt.subplots()
    ax.plot([1, 2], [2, 3])
print(len(ax.lines))`
    }
  ],
  caseStudies: [
    {
      id: "mpl-bab8-case1",
      title: "Peta penjualan cabang",
      difficulty: "Sedang",
      instructions: "Matriks penjualan adalah [[10, 20], [15, 25]] untuk cabang A/B dan hari Senin/Selasa. Buat heatmap, label baris/kolom, dan colorbar berlabel Unit. Cetak ukuran data dan label colorbar.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(layout="constrained")
# Lengkapi kode visualisasi di sini

print(image.get_array().shape)
print(bar.ax.get_ylabel())`,
      expectedOutput: `(2, 2)
Unit`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `image = ax.imshow([[10, 20], [15, 25]], cmap=\"viridis\")`.",
      solutionCode: `import matplotlib.pyplot as plt

fig, ax = plt.subplots(layout="constrained")
image = ax.imshow([[10, 20], [15, 25]], cmap="viridis")
ax.set_xticks([0, 1], ["Senin", "Selasa"])
ax.set_yticks([0, 1], ["A", "B"])
bar = fig.colorbar(image, ax=ax, label="Unit")
print(image.get_array().shape)
print(bar.ax.get_ylabel())`,
      scenario: "Matriks penjualan adalah [[10, 20], [15, 25]] untuk cabang A/B dan hari Senin/Selasa. Buat heatmap, label baris/kolom, dan colorbar berlabel Unit. Cetak ukuran data dan label colorbar."
    },
    {
      id: "mpl-bab8-case2",
      title: "Laporan dua panel siap ekspor",
      difficulty: "Menantang",
      instructions: "Buat panel tren penjualan dan histogram, lalu ekspor Figure ke buffer SVG. Cetak jumlah panel dan apakah isi buffer mengandung elemen <svg.",
      tasks: [
        "Lengkapi kode sesuai instruksi menggunakan Matplotlib.",
        "Jalankan kode, amati grafik, dan cocokkan output pemeriksaan dengan target."
      ],
      starterCode: `import matplotlib.pyplot as plt

import io
# Lengkapi kode visualisasi di sini

print(len(fig.axes))
print(b"<svg" in buffer.getvalue())`,
      expectedOutput: `2
True`,
      hint: "Gunakan pola dari contoh bab ini. Operasi utama: `fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout=\"constrained\")`.",
      solutionCode: `import matplotlib.pyplot as plt

import io
fig, axes = plt.subplots(1, 2, figsize=(8, 3), layout="constrained")
axes[0].plot([1, 2, 3], [10, 15, 12], marker="o")
axes[0].set_title("Tren")
axes[1].hist([10, 15, 12], bins=[0, 10, 20])
axes[1].set_title("Distribusi")
buffer = io.BytesIO()
fig.savefig(buffer, format="svg", bbox_inches="tight")
print(len(fig.axes))
print(b"<svg" in buffer.getvalue())`,
      scenario: "Buat panel tren penjualan dan histogram, lalu ekspor Figure ke buffer SVG. Cetak jumlah panel dan apakah isi buffer mengandung elemen <svg."
    }
  ],
  quizzes: [
    {
      question: "imshow() dapat memvisualisasikan ...",
      options: [
        "Matriks dua dimensi",
        "Nama folder saja",
        "Fungsi tanpa data",
        "Daftar modul saja"
      ],
      correctIndex: 0,
      explanation: "Nilai tiap sel dipetakan menjadi warna."
    },
    {
      question: "Mengapa heatmap perlu colorbar?",
      options: [
        "Agar matriks selalu persegi",
        "Agar warna dapat dikaitkan dengan nilai",
        "Untuk menyimpan file otomatis",
        "Untuk menghapus label"
      ],
      correctIndex: 1,
      explanation: "Colorbar menunjukkan skala pemetaan."
    },
    {
      question: "vmin dan vmax mengatur ...",
      options: [
        "Jumlah baris matriks",
        "DPI gambar",
        "Rentang nilai pada skala warna",
        "Ukuran font"
      ],
      correctIndex: 2,
      explanation: "Rentang konsisten penting untuk perbandingan heatmap."
    },
    {
      question: "Colormap berurutan cocok untuk ...",
      options: [
        "Hanya nama kategori acak",
        "Nama file",
        "Nomor versi paket",
        "Nilai dari kecil ke besar"
      ],
      correctIndex: 3,
      explanation: "Urutan intensitas membantu membaca besaran."
    },
    {
      question: "Colormap divergen cocok untuk ...",
      options: [
        "Penyimpangan negatif dan positif dari tengah",
        "Kategori tanpa urutan selalu",
        "Semua teks panjang",
        "Data tanpa nilai"
      ],
      correctIndex: 0,
      explanation: "Dua arah warna menekankan penyimpangan dari titik acuan."
    },
    {
      question: "style.context() berguna untuk ...",
      options: [
        "Menghapus semua Figure",
        "Membatasi perubahan gaya pada blok kode",
        "Mengubah tipe list",
        "Mengunduh paket"
      ],
      correctIndex: 1,
      explanation: "Gaya sebelumnya dipulihkan ketika blok berakhir."
    },
    {
      question: "PNG merupakan format ...",
      options: [
        "Vektor murni",
        "Tabel",
        "Raster",
        "Kode Python"
      ],
      correctIndex: 2,
      explanation: "Raster menyimpan piksel; DPI memengaruhi resolusi ekspor."
    },
    {
      question: "Format yang mendukung elemen vektor adalah ...",
      options: [
        "CSV",
        "TXT",
        "JSON",
        "SVG"
      ],
      correctIndex: 3,
      explanation: "SVG cocok untuk grafik yang perlu diskalakan."
    },
    {
      question: "bbox_inches=\"tight\" pada savefig membantu ...",
      options: [
        "Menyesuaikan batas ekspor dengan isi gambar",
        "Mengurutkan data",
        "Mengubah histogram menjadi garis",
        "Menambah jumlah Figure"
      ],
      correctIndex: 0,
      explanation: "Ini membantu menyertakan label yang berada di sekitar kanvas."
    },
    {
      question: "BytesIO pada contoh ekspor menyimpan ...",
      options: [
        "File permanen di komputer pengguna",
        "Data gambar dalam memori",
        "Data langsung ke akun cloud",
        "Sebuah paket Python baru"
      ],
      correctIndex: 1,
      explanation: "Buffer memungkinkan pemeriksaan hasil ekspor tanpa file lokal."
    }
  ]
};
