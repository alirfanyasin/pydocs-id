import { DocSection } from "../types";

export const bab7StatistikAgregasi: DocSection = {
  id: "numpy-bab7-statistik-agregasi",
  number: 7,
  title: "Fungsi Agregasi, Statistik & Sumbu (axis=0 vs axis=1)",
  subtitle:
    "Menghitung sum, mean, median, min, max, std, mencari indeks ekstrem dengan argmin/argmax, serta mengurutkan dan mencari nilai unik.",
  level: "Menengah",
  readTime: "15 menit",
  summary:
    "NumPy menyediakan fungsi statistik berkecepatan tinggi untuk merangkum ribuan angka menjadi metrik bermakna: `np.sum()` (total), `np.mean()` (rata-rata), `np.median()` (nilai tengah), `np.min()` & `np.max()` (nilai terkecil & terbesar), serta `np.std()` & `np.var()` (simpangan baku & variansi). Pada matriks 2D, konsep paling krusial adalah parameter **`axis`**: `axis=0` menghitung agregasi secara vertikal **per kolom**, sedangkan `axis=1` menghitung agregasi secara horizontal **per baris**.",
  keyPoints: [
    "Tanpa parameter `axis` (default `axis=None`), fungsi seperti `np.sum(mat)` atau `np.mean(mat)` menghitung keseluruhan elemen matriks menjadi satu angka skalar tunggal.",
    "Pada matriks 2D: **`axis=0` merangkum ke arah bawah (menghasilkan nilai untuk setiap KOLOM)**, sedangkan **`axis=1` merangkum ke arah samping (menghasilkan nilai untuk setiap BARIS)**.",
    "Gunakan `np.argmin(arr)` dan `np.argmax(arr)` untuk mengetahui **posisi indeks** tempat nilai minimum atau maksimum berada, bukan nilainya.",
    "Gunakan `np.cumsum(arr)` untuk menghitung penjumlahan kumulatif beruntun (*running total*).",
    "Gunakan `np.sort(arr)` untuk mengurutkan elemen dari terkecil ke terbesar, dan `np.unique(arr)` untuk mengambil daftar nilai unik tanpa duplikat."
  ],
  conceptTable: {
    title: "Referensi Fungsi Statistik, Sumbu Axis, Indeks Ekstrem & Sorting",
    headers: ["Fungsi / Method", "Contoh Penggunaan", "Penjelasan Hasil"],
    rows: [
      [
        "np.sum(arr) / np.mean(arr)",
        "np.mean(nilai)",
        "Menghitung total jumlah / nilai rata-rata seluruh elemen"
      ],
      [
        "np.median(arr)",
        "np.median(nilai)",
        "Menghitung nilai tengah setelah data diurutkan"
      ],
      [
        "np.min(arr) / np.max(arr)",
        "np.max(nilai)",
        "Mencari nilai paling kecil / paling besar"
      ],
      [
        "axis=0 vs axis=1",
        "np.sum(mat, axis=0)",
        "axis=0: hitung per KOLOM; axis=1: hitung per BARIS"
      ],
      [
        "np.argmin(arr) / np.argmax(arr)",
        "np.argmax(nilai)",
        "Mengembalikan indeks posisi nilai terkecil / terbesar"
      ],
      [
        "np.cumsum(arr)",
        "np.cumsum([10, 20, 30])",
        "Jumlah kumulatif beruntun -> [10 30 60]"
      ],
      [
        "np.sort(arr) / np.unique(arr)",
        "np.unique([3, 1, 2, 1])",
        "Mengurutkan elemen / mengambil elemen unik terurut -> [1 2 3]"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab7-ex1",
      title: "1. Statistik Dasar Array 1D: sum, mean, median, min, max",
      description:
        "Menghitung ringkasan statistik lengkap dari data pendapatan harian.",
      code: `import numpy as np

omzet = np.array([150, 200, 180, 250, 220])

print("Data Omzet  :", omzet)
print("Total (sum) :", np.sum(omzet))
print("Rata2 (mean):", np.mean(omzet))
print("Median      :", np.median(omzet))
print("Minimum     :", np.min(omzet))
print("Maksimum    :", np.max(omzet))`,
      output: `Data Omzet  : [150 200 180 250 220]
Total (sum) : 1000
Rata2 (mean): 200.0
Median      : 200.0
Minimum     : 150
Maksimum    : 250`,
      lineExplanations: [
        {
          line: "np.sum(omzet) / np.mean(omzet)",
          explanation: "`np.sum()` menjumlahkan seluruh angka (`1000`), sedangkan `np.mean()` membagi total dengan jumlah elemen (`200.0`)."
        },
        {
          line: "np.median(omzet)",
          explanation: "Setelah diurutkan `[150, 180, 200, 220, 250]`, nilai tengahnya adalah `200.0`."
        }
      ]
    },
    {
      id: "np-bab7-ex2",
      title: "2. Memahami Sumbu axis=0 (Per Kolom) vs axis=1 (Per Baris)",
      description:
        "Menghitung total penjualan per produk (kolom) dan per cabang toko (baris) pada matriks 2D.",
      code: `import numpy as np

# Baris = 2 Cabang Toko, Kolom = 3 Jenis Produk
penjualan = np.array([
    [10, 20, 30],
    [40, 50, 60]
])

print("Tabel Penjualan:")
print(penjualan)

# axis=0 -> jumlahkan ke bawah (Total per Kolom Produk)
print("Total per Kolom (axis=0):", np.sum(penjualan, axis=0))

# axis=1 -> jumlahkan ke samping (Total per Baris Cabang)
print("Total per Baris (axis=1):", np.sum(penjualan, axis=1))`,
      output: `Tabel Penjualan:
[[10 20 30]
 [40 50 60]]
Total per Kolom (axis=0): [50 70 90]
Total per Baris (axis=1): [ 60 150]`,
      lineExplanations: [
        {
          line: "np.sum(penjualan, axis=0)",
          explanation: "Menjumlahkan setiap kolom dari atas ke bawah: `[10+40, 20+50, 30+60]` menghasilkan `[50 70 90]`."
        },
        {
          line: "np.sum(penjualan, axis=1)",
          explanation: "Menjumlahkan setiap baris dari kiri ke kanan: `[10+20+30, 40+50+60]` menghasilkan `[60 150]`."
        }
      ]
    },
    {
      id: "np-bab7-ex3",
      title: "3. Indeks Ekstrem (argmin/argmax), Kumulatif (cumsum) & Unique",
      description:
        "Mencari posisi nilai tertinggi, tabungan kumulatif, serta mengurutkan dan menghapus duplikat.",
      code: `import numpy as np

skor = np.array([78, 95, 62, 88])
print("Skor Tertinggi (max)   :", np.max(skor))
print("Indeks Tertinggi (argmax):", np.argmax(skor))
print("Indeks Terendah (argmin) :", np.argmin(skor))

print("-" * 38)

tabungan = np.array([100, 150, 50, 200])
print("Tabungan Kumulatif (cumsum):", np.cumsum(tabungan))

kode_barang = np.array([30, 10, 20, 10, 30, 20])
print("Kode Unik Terurut (unique) :", np.unique(kode_barang))`,
      output: `Skor Tertinggi (max)   : 95
Indeks Tertinggi (argmax): 1
Indeks Terendah (argmin) : 2
--------------------------------------
Tabungan Kumulatif (cumsum): [100 250 300 500]
Kode Unik Terurut (unique) : [10 20 30]`,
      lineExplanations: [
        {
          line: "np.argmax(skor)",
          explanation: "Nilai terbesar adalah `95` yang berada pada **indeks ke-1**, sehingga `argmax` mengembalikan `1`."
        },
        {
          line: "np.cumsum(tabungan)",
          explanation: "Menghitung akumulasi bertahap: `[100, 100+150, 250+50, 300+200]` = `[100 250 300 500]`."
        },
        {
          line: "np.unique(kode_barang)",
          explanation: "Menghapus angka kembar dan mengurutkan sisanya dari terkecil ke terbesar (`[10 20 30]`)."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
# Tertukar antara axis=0 dan axis=1 saat mencari rata-rata baris
rata_per_baris = np.mean(matriks, axis=0)`,
      correct: `import numpy as np
# Gunakan axis=1 untuk merangkum tiap baris (menyamping)
rata_per_baris = np.mean(matriks, axis=1)`,
      reason:
        "`axis=0` bergerak menyusuri baris dari atas ke bawah sehingga menghasilkan ringkasan **per kolom**. Untuk menghitung rata-rata atau total **per baris**, gunakan `axis=1`."
    }
  ],
  tips: [
    "Cara mudah mengingat `axis`: **`axis=0` = Kolom (Vertikal $\\downarrow$)**, **`axis=1` = Baris (Horizontal $\\rightarrow$)**.",
    "Selain fungsi `np.sum(arr)` dan `np.mean(arr)`, kamu juga bisa memanggilnya sebagai method objek secara langsung: `arr.sum()` dan `arr.mean()`."
  ],
  caseStudies: [
    {
      id: "np-bab7-case1",
      title: "Studi Kasus 1: Analisis Rata-Rata Nilai per Siswa & per Mata Pelajaran",
      difficulty: "Mudah",
      instructions:
        "Sebuah matriks 2D `rapor` berukuran 3 baris (3 Siswa) × 3 kolom (3 Mata Pelajaran) menyimpan nilai ujian. Hitung rata-rata nilai **per mata pelajaran/kolom (`axis=0`)** dan rata-rata nilai **per siswa/baris (`axis=1`)** menggunakan `np.mean()`!",
      tasks: [
        "Hitung `rata_mapel = np.mean(rapor, axis=0)`.",
        "Hitung `rata_siswa = np.mean(rapor, axis=1)`.",
        "Cetak kedua hasil sesuai Target Output."
      ],
      starterCode: `import numpy as np

rapor = np.array([
    [80, 85, 90],
    [70, 75, 80],
    [90, 95, 100]
])

# 1. Hitung rata-rata per kolom mata pelajaran (axis=0):
rata_mapel = 

# 2. Hitung rata-rata per baris siswa (axis=1):
rata_siswa = 

print("Rata-rata per Mapel:", rata_mapel)
print("Rata-rata per Siswa:", rata_siswa)`,
      expectedOutput: `Rata-rata per Mapel: [80. 85. 90.]
Rata-rata per Siswa: [85. 75. 95.]`,
      hint: "Gunakan `np.mean(rapor, axis=0)` dan `np.mean(rapor, axis=1)`.",
      solutionCode: `import numpy as np

rapor = np.array([
    [80, 85, 90],
    [70, 75, 80],
    [90, 95, 100]
])

rata_mapel = np.mean(rapor, axis=0)
rata_siswa = np.mean(rapor, axis=1)

print("Rata-rata per Mapel:", rata_mapel)
print("Rata-rata per Siswa:", rata_siswa)`
    },
    {
      id: "np-bab7-case2",
      title: "Studi Kasus 2: Pelacakan Hari Penjualan Tertinggi & Akumulasi Omzet",
      difficulty: "Sedang",
      instructions:
        "Sebuah kedai kopi mencatat penjualan harian selama 5 hari: `penjualan = np.array([120, 180, 150, 210, 140])`. Cari tahu nilai penjualan tertinggi (`np.max`), berada pada **indeks hari ke berapa** penjualan tertinggi tersebut terjadi (`np.argmax`), serta hitung akumulasi penjualan beruntun dari hari ke-1 sampai ke-5 (`np.cumsum`)!",
      tasks: [
        "Cetak `Penjualan Tertinggi: <np.max(penjualan)>`.",
        "Cetak `Indeks Hari Terbaik: <np.argmax(penjualan)>`.",
        "Cetak `Akumulasi Omzet    : <np.cumsum(penjualan)>`."
      ],
      starterCode: `import numpy as np

penjualan = np.array([120, 180, 150, 210, 140])

# Cetak Penjualan Tertinggi, Indeks Hari Terbaik, dan Akumulasi Omzet:
print("Penjualan Tertinggi:", )
print("Indeks Hari Terbaik:", )
print("Akumulasi Omzet    :", )`,
      expectedOutput: `Penjualan Tertinggi: 210
Indeks Hari Terbaik: 3
Akumulasi Omzet    : [120 300 450 660 800]`,
      hint: "Gunakan `np.max(penjualan)`, `np.argmax(penjualan)`, dan `np.cumsum(penjualan)`.",
      solutionCode: `import numpy as np

penjualan = np.array([120, 180, 150, 210, 140])

print("Penjualan Tertinggi:", np.max(penjualan))
print("Indeks Hari Terbaik:", np.argmax(penjualan))
print("Akumulasi Omzet    :", np.cumsum(penjualan))`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab7-ch1",
      title: "Latihan Praktik #1: Menghitung Total, Rata-Rata, Min & Max",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `data = np.array([10, 20, 30, 40, 50])`. Cetak nilai `Total` (`np.sum`), `Rata-rata` (`np.mean`), `Min` (`np.min`), dan `Max` (`np.max`) dari array tersebut!",
      tasks: [
        "Gunakan `np.sum(data)`, `np.mean(data)`, `np.min(data)`, dan `np.max(data)`.",
        "Cetak sesuai format Target Output."
      ],
      starterCode: `import numpy as np

data = np.array([10, 20, 30, 40, 50])

print("Total    :", )
print("Rata-rata:", )
print("Min      :", )
print("Max      :", )`,
      expectedOutput: `Total    : 150
Rata-rata: 30.0
Min      : 10
Max      : 50`,
      hint: "Isi masing-masing baris print dengan `np.sum(data)`, `np.mean(data)`, `np.min(data)`, dan `np.max(data)`.",
      solutionCode: `import numpy as np

data = np.array([10, 20, 30, 40, 50])

print("Total    :", np.sum(data))
print("Rata-rata:", np.mean(data))
print("Min      :", np.min(data))
print("Max      :", np.max(data))`
    },
    {
      id: "np-bab7-ch2",
      title: "Latihan Praktik #2: Menjumlahkan per Kolom (axis=0) & per Baris (axis=1)",
      difficulty: "Mudah",
      instructions:
        "Diberikan matriks 2×3 `mat`. Hitung dan cetak jumlah total per kolom (`axis=0`) dan jumlah total per baris (`axis=1`) menggunakan `np.sum()`!",
      tasks: [
        "Cetak `Sum Kolom: <np.sum(mat, axis=0)>`.",
        "Cetak `Sum Baris: <np.sum(mat, axis=1)>`."
      ],
      starterCode: `import numpy as np

mat = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print("Sum Kolom:", )
print("Sum Baris:", )`,
      expectedOutput: `Sum Kolom: [5 7 9]
Sum Baris: [6 15]`,
      hint: "Gunakan `np.sum(mat, axis=0)` dan `np.sum(mat, axis=1)`.",
      solutionCode: `import numpy as np

mat = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print("Sum Kolom:", np.sum(mat, axis=0))
print("Sum Baris:", np.sum(mat, axis=1))`
    },
    {
      id: "np-bab7-ch3",
      title: "Latihan Praktik #3: Mencari Posisi Indeks dengan argmin & argmax",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `waktu_tempuh = np.array([45, 32, 60, 28, 50])`. Cetak posisi indeks nilai terkecil (`np.argmin`) dan posisi indeks nilai terbesar (`np.argmax`)!",
      tasks: [
        "Gunakan `np.argmin(waktu_tempuh)` dan `np.argmax(waktu_tempuh)`.",
        "Cetak sesuai format pada starter code."
      ],
      starterCode: `import numpy as np

waktu_tempuh = np.array([45, 32, 60, 28, 50])

print("Indeks Tercepat (argmin):", )
print("Indeks Terlama (argmax) :", )`,
      expectedOutput: `Indeks Tercepat (argmin): 3
Indeks Terlama (argmax) : 2`,
      hint: "Isi dengan `np.argmin(waktu_tempuh)` dan `np.argmax(waktu_tempuh)`.",
      solutionCode: `import numpy as np

waktu_tempuh = np.array([45, 32, 60, 28, 50])

print("Indeks Tercepat (argmin):", np.argmin(waktu_tempuh))
print("Indeks Terlama (argmax) :", np.argmax(waktu_tempuh))`
    },
    {
      id: "np-bab7-ch4",
      title: "Latihan Praktik #4: Mengurutkan Array (np.sort) & Mencari Median",
      difficulty: "Sedang",
      instructions:
        "Diberikan array acak `skor = np.array([85, 60, 95, 70, 80])`. Urutkan array tersebut menggunakan `np.sort()`, lalu hitung nilai tengahnya menggunakan `np.median()`!",
      tasks: [
        "Buat `skor_urut = np.sort(skor)`.",
        "Hitung `nilai_tengah = np.median(skor)`.",
        "Cetak keduanya."
      ],
      starterCode: `import numpy as np

skor = np.array([85, 60, 95, 70, 80])

skor_urut = 
nilai_tengah = 

print("Terurut:", skor_urut)
print("Median :", nilai_tengah)`,
      expectedOutput: `Terurut: [60 70 80 85 95]
Median : 80.0`,
      hint: "Gunakan `np.sort(skor)` dan `np.median(skor)`.",
      solutionCode: `import numpy as np

skor = np.array([85, 60, 95, 70, 80])

skor_urut = np.sort(skor)
nilai_tengah = np.median(skor)

print("Terurut:", skor_urut)
print("Median :", nilai_tengah)`
    },
    {
      id: "np-bab7-ch5",
      title: "Latihan Praktik #5: Mengambil Elemen Unik (np.unique) & Cumsum",
      difficulty: "Sedang",
      instructions:
        "Diberikan daftar kategori transaksi `kategori = np.array([2, 1, 3, 2, 1, 4, 3])`. Ambil elemen uniknya yang sudah terurut menggunakan `np.unique(kategori)`, lalu hitung jumlah kumulatif dari elemen unik tersebut dengan `np.cumsum()`!",
      tasks: [
        "Buat `unik = np.unique(kategori)`.",
        "Buat `kumulatif = np.cumsum(unik)`.",
        "Cetak `Unik     : <unik>` dan `Kumulatif: <kumulatif>`."
      ],
      starterCode: `import numpy as np

kategori = np.array([2, 1, 3, 2, 1, 4, 3])

unik = 
kumulatif = 

print("Unik     :", unik)
print("Kumulatif:", kumulatif)`,
      expectedOutput: `Unik     : [1 2 3 4]
Kumulatif: [1 3 6 10]`,
      hint: "Gunakan `unik = np.unique(kategori)` lalu `kumulatif = np.cumsum(unik)`.",
      solutionCode: `import numpy as np

kategori = np.array([2, 1, 3, 2, 1, 4, 3])

unik = np.unique(kategori)
kumulatif = np.cumsum(unik)

print("Unik     :", unik)
print("Kumulatif:", kumulatif)`
    }
  ],
  quizzes: [
    {
      question:
        "Fungsi manakah yang digunakan untuk menghitung nilai rata-rata aritmatika dari sebuah array NumPy?",
      options: [
        "np.avg(arr)",
        "np.mean(arr)",
        "np.median(arr)",
        "np.middle(arr)"
      ],
      correctIndex: 1,
      explanation:
        "`np.mean(arr)` menghitung rata-rata aritmatika (jumlah seluruh elemen dibagi banyaknya elemen)."
    },
    {
      question:
        "Pada matriks 2 dimensi `M`, apa yang dihitung oleh `np.sum(M, axis=0)`?",
      options: [
        "Jumlah total untuk setiap baris (menyamping)",
        "Jumlah total untuk setiap kolom (dari atas ke bawah)",
        "Jumlah elemen pada baris ke-0 saja",
        "Jumlah seluruh elemen menjadi satu angka tunggal"
      ],
      correctIndex: 1,
      explanation:
        "`axis=0` menyusuri sumbu vertikal (antar baris dari atas ke bawah), sehingga menghasilkan total untuk masing-masing kolom."
    },
    {
      question:
        "Pada matriks 2 dimensi `M` berukuran `(3, 5)` (3 baris, 5 kolom), berapakah banyak angka yang dihasilkan oleh `np.max(M, axis=1)`?",
      options: ["1 angka", "3 angka (satu nilai maksimum untuk tiap baris)", "5 angka", "15 angka"],
      correctIndex: 1,
      explanation:
        "`axis=1` menghitung nilai maksimum secara horizontal untuk setiap baris. Karena ada 3 baris, hasilnya adalah array 1D berisi 3 angka."
    },
    {
      question:
        "Apa perbedaan antara `np.max(arr)` dan `np.argmax(arr)`?",
      options: [
        "Keduanya menghasilkan output yang sama persis",
        "np.max mengembalikan nilai terbesarnya, sedangkan np.argmax mengembalikan nomor indeks posisi nilai terbesar tersebut",
        "np.argmax hanya untuk matriks 2D",
        "np.max mengembalikan indeks, sedangkan np.argmax mengembalikan nilai"
      ],
      correctIndex: 1,
      explanation:
        "`np.max()` mencari **nilai** maksimum, sedangkan `np.argmax()` (*argument of the maximum*) mencari **indeks** tempat nilai maksimum itu berada."
    },
    {
      question:
        "Jika `arr = np.array([50, 10, 80, 30])`, berapakah hasil dari `np.argmin(arr)`?",
      options: ["10", "0", "1", "3"],
      correctIndex: 2,
      explanation:
        "Nilai terkecil pada `arr` adalah `10`, yang terletak pada **indeks ke-1**."
    },
    {
      question:
        "Apa hasil dari pemanggilan `np.cumsum(np.array([2, 5, 3, 10]))`?",
      options: [
        "20",
        "[ 2  7 10 20]",
        "[ 2 10 30 300]",
        "[10  3  5  2]"
      ],
      correctIndex: 1,
      explanation:
        "`np.cumsum()` menghitung jumlah kumulatif bertahap: `[2, 2+5, 7+3, 10+10]` = `[2 7 10 20]`."
    },
    {
      question:
        "Fungsi apakah yang digunakan untuk mengambil daftar elemen unik (tanpa duplikat) yang sudah terurut dari sebuah array?",
      options: [
        "np.distinct(arr)",
        "np.unique(arr)",
        "np.set(arr)",
        "np.nodup(arr)"
      ],
      correctIndex: 1,
      explanation:
        "`np.unique(arr)` menyaring nilai kembar dan mengembalikan array 1D berisi nilai unik yang terurut naik."
    },
    {
      question:
        "Jika `data = np.array([10, 100, 20])`, berapakah nilai dari `np.median(data)`?",
      options: ["10.0", "20.0", "43.33", "100.0"],
      correctIndex: 1,
      explanation:
        "`np.median()` mengurutkan data terlebih dahulu menjadi `[10, 20, 100]`, lalu mengambil nilai tengahnya yaitu `20.0`."
    },
    {
      question:
        "Fungsi manakah yang digunakan untuk mengukur simpangan baku (*standard deviation*) dari elemen-elemen array?",
      options: [
        "np.dev(arr)",
        "np.std(arr)",
        "np.spread(arr)",
        "np.norm(arr)"
      ],
      correctIndex: 1,
      explanation:
        "`np.std()` menghitung simpangan baku (*standard deviation*), sedangkan `np.var()` menghitung variansi (*variance*)."
    },
    {
      question:
        "Apa yang terjadi jika kita memanggil `np.sum(matriks)` pada matriks 2D tanpa menyertakan argumen `axis`?",
      options: [
        "Terjadi TypeError",
        "NumPy menjumlahkan seluruh elemen di semua baris dan kolom menjadi satu nilai total tunggal",
        "Hanya menjumlahkan baris pertama",
        "Hanya menjumlahkan diagonal utama"
      ],
      correctIndex: 1,
      explanation:
        "Tanpa argumen `axis` (`axis=None`), fungsi agregasi NumPy merangkum seluruh elemen di dalam array tanpa memandang dimensinya."
    }
  ]
};
