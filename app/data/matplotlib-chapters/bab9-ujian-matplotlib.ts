import { DocSection } from "../types";

export const bab9UjianMatplotlib: DocSection = {
  id: "matplotlib-bab9-ujian-akhir",
  number: 9,
  filePath: "app/data/matplotlib-chapters/bab9-ujian-matplotlib.ts",
  title: "Ujian Akhir Modul Matplotlib & Visualisasi Data",
  subtitle: "15 soal praktik coding dan 10 soal pemahaman dari Bab 1–8.",
  level: "Ujian Akhir",
  readTime: "60 menit",
  isExam: true,
  summary: "Uji kemampuan membuat grafik yang dapat dibaca: Figure dan Axes, tren garis, label dan anotasi, batang dan proporsi, scatter, distribusi, subplot, heatmap, serta ekspor laporan. Selesaikan 15 soal praktik dan 10 pilihan ganda. Penilaian praktik mencocokkan output teks pemeriksaan properti; amati juga grafik untuk memastikan maksud visualisasi terpenuhi.",
  keyPoints: [
    "Total 25 soal: 15 praktik coding dan 10 pilihan ganda.",
    "Gunakan konsep Bab 1–8 tanpa pustaka visualisasi tambahan.",
    "Periksa label, satuan, skala, dan keterbacaan setiap grafik.",
    "Ekspor contoh menggunakan buffer memori; grafik hasil eksekusi ditampilkan di bawah editor."
  ],
  examples: [],
  codingChallenges: [
    {
      id: "mpl-exam-ch1",
      title: "Ujian Praktik #1: Membaca data garis (Bab 1)",
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
      id: "mpl-exam-ch2",
      title: "Ujian Praktik #2: Pemantauan pengunjung (Bab 1)",
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
print(max(ax.lines[0].get_ydata()))`
    },
    {
      id: "mpl-exam-ch3",
      title: "Ujian Praktik #3: Ketebalan garis (Bab 2)",
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
      id: "mpl-exam-ch4",
      title: "Ujian Praktik #4: Aktual dan target (Bab 2)",
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
print(ax.get_legend_handles_labels()[1])`
    },
    {
      id: "mpl-exam-ch5",
      title: "Ujian Praktik #5: Tanda sumbu (Bab 3)",
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
      id: "mpl-exam-ch6",
      title: "Ujian Praktik #6: Menandai puncak omzet (Bab 3)",
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
print(note.get_text())`
    },
    {
      id: "mpl-exam-ch7",
      title: "Ujian Praktik #7: Proporsi kanal (Bab 4)",
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
      id: "mpl-exam-ch8",
      title: "Ujian Praktik #8: Ranking produk (Bab 4)",
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
print(list(nama))`
    },
    {
      id: "mpl-exam-ch9",
      title: "Ujian Praktik #9: Pemetaan warna (Bab 5)",
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
      id: "mpl-exam-ch10",
      title: "Ujian Praktik #10: Belajar dan nilai (Bab 5)",
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
print(ax.get_xlabel())`
    },
    {
      id: "mpl-exam-ch11",
      title: "Ujian Praktik #11: Median box plot (Bab 6)",
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
      id: "mpl-exam-ch12",
      title: "Ujian Praktik #12: Distribusi nilai kelas (Bab 6)",
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
print(ax.get_title())`
    },
    {
      id: "mpl-exam-ch13",
      title: "Ujian Praktik #13: Array dua dimensi (Bab 7)",
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
      id: "mpl-exam-ch14",
      title: "Ujian Praktik #14: Ringkasan penjualan (Bab 7)",
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
print([ax.get_title() for ax in axes])`
    },
    {
      id: "mpl-exam-ch15",
      title: "Ujian Praktik #15: Laporan dua panel siap ekspor (Bab 8)",
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
print(b"<svg" in buffer.getvalue())`
    }
  ],
  quizzes: [
    {
      question: "Figure mewakili ...",
      options: [
        "Seluruh kanvas grafik",
        "Satu titik data",
        "Label sumbu x",
        "Hanya legenda"
      ],
      correctIndex: 0,
      explanation: "Figure menampung satu atau beberapa Axes."
    },
    {
      question: "Apa hasil plt.subplots() tanpa argumen?",
      options: [
        "Dua Figure",
        "Satu Figure dan satu Axes",
        "Sebuah DataFrame",
        "File PNG"
      ],
      correctIndex: 1,
      explanation: "Keduanya biasa ditampung pada fig dan ax."
    },
    {
      question: "Apakah ax.plot() otomatis mengurutkan x?",
      options: [
        "Ya, selalu menaik",
        "Ya, selalu menurun",
        "Tidak, urutannya mengikuti input",
        "Hanya jika marker ada"
      ],
      correctIndex: 2,
      explanation: "Urutkan pasangan x-y terlebih dahulu bila diperlukan."
    },
    {
      question: "Parameter arrowprops digunakan untuk ...",
      options: [
        "Menghapus sumbu",
        "Menentukan jumlah batang",
        "Mengimpor data",
        "Mengatur panah anotasi"
      ],
      correctIndex: 3,
      explanation: "Misalnya arrowstyle=\"->\" menambahkan panah ke titik."
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
      question: "Pola nilai naik bersama membuktikan sebab akibat?",
      options: [
        "Ya, selalu",
        "Tidak, perlu bukti tambahan",
        "Ya, jika warna sama",
        "Ya, jika lebih dari tiga titik"
      ],
      correctIndex: 1,
      explanation: "Hubungan visual belum menjelaskan penyebabnya."
    },
    {
      question: "density=True menormalkan ...",
      options: [
        "Jumlah semua tinggi menjadi satu selalu",
        "Jumlah Figure menjadi satu",
        "Luas total histogram menjadi satu",
        "Semua data menjadi nol"
      ],
      correctIndex: 2,
      explanation: "Luas memperhitungkan lebar masing-masing bin."
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
      question: "PNG merupakan format ...",
      options: [
        "Raster",
        "Vektor murni",
        "Tabel",
        "Kode Python"
      ],
      correctIndex: 0,
      explanation: "Raster menyimpan piksel; DPI memengaruhi resolusi ekspor."
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
