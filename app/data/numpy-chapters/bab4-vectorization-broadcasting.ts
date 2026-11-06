import { DocSection } from "../types";

export const bab4VectorizationBroadcasting: DocSection = {
  id: "numpy-bab4-vectorization-broadcasting",
  number: 4,
  title: "Operasi Vektorisasi (Vectorization) & Broadcasting",
  subtitle:
    "Melakukan perhitungan matematika seluruh elemen tanpa perulangan for, menggunakan Universal Functions (ufunc), serta memahami aturan Broadcasting.",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "Salah satu kekuatan terbesar NumPy adalah **Vectorization** (Vektorisasi), yaitu kemampuan melakukan operasi matematika elemen-demi-elemen (*element-wise*) pada seluruh isi array secara serentak tanpa perlu menulis perulangan `for`. Selain operator aritmatika (`+`, `-`, `*`, `/`, `**`, `//`), NumPy menyediakan *Universal Functions* (`ufunc`) seperti `np.sqrt()`, `np.abs()`, dan `np.round()`. Lebih hebatnya lagi, fitur **Broadcasting** memungkinkan NumPy mengoperasikan dua array dengan ukuran berbeda (misalnya matriks 2D dijumlahkan dengan vektor 1D atau dengan angka skalar).",
  keyPoints: [
    "Operasi antara dua array berukuran sama (`a + b`, `a - b`, `a * b`, `a / b`) dieksekusi secara **element-wise** (elemen indeks ke-$i$ dioperasikan dengan elemen indeks ke-$i$).",
    "Berbeda dengan `list` Python di mana `[1, 2] * 2` menggandakan panjang list menjadi `[1, 2, 1, 2]`, pada NumPy `np.array([1, 2]) * 2` mengalikan setiap angka di dalamnya menjadi `[2 4]`.",
    "Gunakan fungsi matematika vektorisasi (*ufunc*): `np.sqrt(arr)` untuk akar kuadrat, `np.abs(arr)` untuk nilai mutlak (positif), dan `np.round(arr, desimal)` untuk pembulatan.",
    "**Broadcasting Skalar**: Saat array dioperasikan dengan satu angka tunggal (misal `arr + 10`), angka `10` otomatis \"direntangkan\" (*broadcast*) ke seluruh elemen array.",
    "**Broadcasting Matriks & Vektor**: Matriks 2D berukuran `(M, N)` dapat dijumlahkan/dikalikan langsung dengan vektor 1D berukuran `(N,)`, di mana vektor 1D tersebut akan diterapkan ke **setiap baris** matriks."
  ],
  conceptTable: {
    title: "Referensi Operasi Vektorisasi, Ufunc & Broadcasting",
    headers: ["Operasi / Fungsi", "Contoh Kode", "Penjelasan Hasil"],
    rows: [
      [
        "arr + skalar / arr * skalar",
        "arr * 10",
        "Menambah atau mengalikan setiap elemen array dengan angka skalar"
      ],
      [
        "arr1 + arr2 / arr1 * arr2",
        "a + b",
        "Penjumlahan atau perkalian elemen-demi-elemen pada posisi yang bersesuaian"
      ],
      [
        "arr ** n",
        "arr ** 2",
        "Memangkatkan setiap elemen array dengan n"
      ],
      [
        "np.sqrt(arr)",
        "np.sqrt(np.array([4, 9, 16]))",
        "Menghitung akar kuadrat tiap elemen -> [2. 3. 4.]"
      ],
      [
        "np.abs(arr)",
        "np.abs(np.array([-5, 3, -8]))",
        "Mengubah seluruh elemen menjadi nilai mutlak positif -> [5 3 8]"
      ],
      [
        "np.round(arr, n)",
        "np.round(arr, 2)",
        "Membulatkan setiap elemen desimal hingga n angka di belakang koma"
      ],
      [
        "Matriks (M, N) + Vektor (N,)",
        "mat_2x3 + vec_3",
        "Broadcasting: menambahkan vec_3 ke setiap baris pada mat_2x3"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab4-ex1",
      title: "1. Operasi Aritmatika Vektorisasi (Tanpa for Loop)",
      description:
        "Menghitung total pendapatan dan laba bersih dari array harga, jumlah terjual, dan modal secara serentak.",
      code: `import numpy as np

harga_jual = np.array([15000, 20000, 30000])
modal_produk = np.array([10000, 14000, 21000])
qty_terjual = np.array([10, 5, 8])

# Selisih laba per unit (element-wise subtraction)
laba_per_unit = harga_jual - modal_produk
print("Laba per Unit :", laba_per_unit)

# Total laba per produk (element-wise multiplication)
total_laba = laba_per_unit * qty_terjual
print("Total Laba    :", total_laba)`,
      output: `Laba per Unit : [5000 6000 9000]
Total Laba    : [50000 30000 72000]`,
      lineExplanations: [
        {
          line: "laba_per_unit = harga_jual - modal_produk",
          explanation: "Mengurangi setiap elemen `harga_jual` dengan elemen `modal_produk` pada indeks yang sama tanpa perulangan."
        },
        {
          line: "total_laba = laba_per_unit * qty_terjual",
          explanation: "Mengalikan laba per unit dengan jumlah unit terjual untuk masing-masing produk secara instan."
        }
      ]
    },
    {
      id: "np-bab4-ex2",
      title: "2. Universal Functions: np.sqrt(), np.abs(), dan np.round()",
      description:
        "Menjalankan fungsi matematika bawaan NumPy ke seluruh elemen array.",
      code: `import numpy as np

# 1. Menghitung akar kuadrat
luas_persegi = np.array([16, 25, 64, 100])
sisi = np.sqrt(luas_persegi)
print("Panjang Sisi (sqrt):", sisi)

# 2. Menghitung nilai mutlak selisih error
selisih_error = np.array([-3.5, 2.1, -0.8, -5.0])
error_mutlak = np.abs(selisih_error)
print("Error Mutlak (abs) :", error_mutlak)

# 3. Pembulatan 2 angka di belakang koma
hasil_bagi = np.array([10 / 3, 20 / 7, 5 / 6])
dibulatkan = np.round(hasil_bagi, 2)
print("Dibulatkan 2 desimal:", dibulatkan)`,
      output: `Panjang Sisi (sqrt): [ 4.  5.  8. 10.]
Error Mutlak (abs) : [3.5 2.1 0.8 5. ]
Dibulatkan 2 desimal: [3.33 2.86 0.83]`,
      lineExplanations: [
        {
          line: "sisi = np.sqrt(luas_persegi)",
          explanation: "Menghitung $\\sqrt{x}$ untuk setiap elemen di dalam array dan mengembalikan array `float64`."
        },
        {
          line: "error_mutlak = np.abs(selisih_error)",
          explanation: "Mengubah seluruh angka negatif menjadi positif."
        },
        {
          line: "dibulatkan = np.round(hasil_bagi, 2)",
          explanation: "Membulatkan seluruh pecahan panjang menjadi rapi 2 angka desimal."
        }
      ]
    },
    {
      id: "np-bab4-ex3",
      title: "3. Broadcasting: Matriks 2D dengan Skalar & Vektor 1D",
      description:
        "Menambahkan bonus nilai yang berbeda untuk tiap kolom mata ujian ke seluruh baris siswa menggunakan Broadcasting.",
      code: `import numpy as np

# Matriks nilai 2 siswa pada 3 mata ujian (Shape: 2x3)
nilai_siswa = np.array([
    [70, 80, 75],
    [85, 78, 82]
])

# Vektor poin bonus untuk masing-masing dari 3 ujian (Shape: 3,)
bonus_per_ujian = np.array([5, 10, 8])

# Broadcasting: vektor (3,) otomatis ditambahkan ke SETIAP baris matriks (2, 3)
nilai_akhir = nilai_siswa + bonus_per_ujian

print("Nilai Awal:")
print(nilai_siswa)
print("Nilai Akhir (+ Bonus per Kolom):")
print(nilai_akhir)`,
      output: `Nilai Awal:
[[70 80 75]
 [85 78 82]]
Nilai Akhir (+ Bonus per Kolom):
[[75 90 83]
 [90 88 90]]`,
      lineExplanations: [
        {
          line: "nilai_akhir = nilai_siswa + bonus_per_ujian",
          explanation: "Karena `nilai_siswa` berukuran `(2, 3)` dan `bonus_per_ujian` berukuran `(3,)`, NumPy merentangkan `bonus_per_ujian` ke baris ke-0 dan baris ke-1 secara otomatis."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
a = np.array([10, 20, 30]) # shape (3,)
b = np.array([1, 2])       # shape (2,)
hasil = a + b`,
      correct: `import numpy as np
a = np.array([10, 20, 30]) # shape (3,)
b = np.array([1, 2, 3])    # shape (3,)
hasil = a + b`,
      reason:
        "Broadcasting hanya berhasil jika ukuran dimensi yang bersesuaian **sama persis** atau **salah satunya berukuran 1**. Mengoperasikan shape `(3,)` dengan `(2,)` akan memicu `ValueError: operands could not be broadcast together`."
    }
  ],
  tips: [
    "Hindari menulis `for i in range(len(arr)):` untuk operasi matematika di NumPy. Gunakan operasi vektorisasi langsung karena dieksekusi di level bahasa C yang jauh lebih cepat.",
    "Gunakan `np.round(arr, 2)` saat menampilkan hasil perhitungan keuangan atau statistik agar desimalnya rapi."
  ],
  caseStudies: [
    {
      id: "np-bab4-case1",
      title: "Studi Kasus 1: Konversi Massal Suhu Celcius ke Fahrenheit",
      difficulty: "Mudah",
      instructions:
        "Badan meteorologi memiliki rekaman suhu 5 kota dalam derajat Celcius: `celcius = np.array([20, 25, 30, 35, 40])`. Gunakan operasi vektorisasi dan *broadcasting* untuk mengubah seluruh suhu tersebut ke derajat Fahrenheit dengan rumus $F = C \\times 1.8 + 32$ tanpa perulangan!",
      tasks: [
        "Hitung `fahrenheit = celcius * 1.8 + 32`.",
        "Cetak `Celcius   : <celcius>` dan `Fahrenheit: <fahrenheit>`."
      ],
      starterCode: `import numpy as np

celcius = np.array([20, 25, 30, 35, 40])

# Hitung fahrenheit dengan rumus celcius * 1.8 + 32:
fahrenheit = 

print("Celcius   :", celcius)
print("Fahrenheit:", fahrenheit)`,
      expectedOutput: `Celcius   : [20 25 30 35 40]
Fahrenheit: [68. 77. 86. 95. 104.]`,
      hint: "Tulis langsung ekspresi matematika `fahrenheit = celcius * 1.8 + 32`.",
      solutionCode: `import numpy as np

celcius = np.array([20, 25, 30, 35, 40])
fahrenheit = celcius * 1.8 + 32

print("Celcius   :", celcius)
print("Fahrenheit:", fahrenheit)`
    },
    {
      id: "np-bab4-case2",
      title: "Studi Kasus 2: Penyesuaian Tarif Ongkir 2 Gudang ke 3 Zona (Broadcasting)",
      difficulty: "Sedang",
      instructions:
        "Sebuah perusahaan ekspedisi memiliki matriks tarif dasar `tarif_dasar` berukuran 2×3 (2 gudang asal × 3 zona tujuan). Pemerintah menetapkan biaya tambahan asuransi per zona berupa vektor 1D `biaya_zona = np.array([2000, 3500, 5000])`. Gunakan *broadcasting* untuk menjumlahkan `tarif_dasar` dengan `biaya_zona`!",
      tasks: [
        "Jumlahkan `tarif_total = tarif_dasar + biaya_zona`.",
        "Cetak `Tarif Total:` diikuti matriks `tarif_total`."
      ],
      starterCode: `import numpy as np

tarif_dasar = np.array([
    [10000, 15000, 20000],
    [12000, 18000, 25000]
])
biaya_zona = np.array([2000, 3500, 5000])

# Jumlahkan tarif_dasar dengan biaya_zona menggunakan broadcasting:
tarif_total = 

print("Tarif Total:")
print(tarif_total)`,
      expectedOutput: `Tarif Total:
[[12000 18500 25000]
 [14000 21500 30000]]`,
      hint: "Tulis `tarif_total = tarif_dasar + biaya_zona`.",
      solutionCode: `import numpy as np

tarif_dasar = np.array([
    [10000, 15000, 20000],
    [12000, 18000, 25000]
])
biaya_zona = np.array([2000, 3500, 5000])

tarif_total = tarif_dasar + biaya_zona

print("Tarif Total:")
print(tarif_total)`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab4-ch1",
      title: "Latihan Praktik #1: Perkalian & Penjumlahan Skalar pada Array",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `poin = np.array([10, 20, 30, 40])`. Kalikan seluruh elemen `poin` dengan `3`, lalu tambahkan `5`. Simpan ke variabel `poin_akhir` dan cetak hasilnya!",
      tasks: [
        "Hitung `poin_akhir = poin * 3 + 5`.",
        "Cetak `poin_akhir`."
      ],
      starterCode: `import numpy as np

poin = np.array([10, 20, 30, 40])

# Kalikan poin dengan 3 lalu tambah 5:
poin_akhir = 

print(poin_akhir)`,
      expectedOutput: `[35 65 95 125]`,
      hint: "Tulis `poin_akhir = poin * 3 + 5`.",
      solutionCode: `import numpy as np

poin = np.array([10, 20, 30, 40])
poin_akhir = poin * 3 + 5

print(poin_akhir)`
    },
    {
      id: "np-bab4-ch2",
      title: "Latihan Praktik #2: Operasi Element-Wise Dua Array",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `jarak_km = np.array([120, 180, 240])` dan `waktu_jam = np.array([2, 3, 4])`. Hitung kecepatan rata-rata untuk masing-masing perjalanan dengan membagi `jarak_km / waktu_jam`, lalu cetak hasilnya!",
      tasks: [
        "Buat `kecepatan = jarak_km / waktu_jam`.",
        "Cetak `Kecepatan: <kecepatan>`."
      ],
      starterCode: `import numpy as np

jarak_km = np.array([120, 180, 240])
waktu_jam = np.array([2, 3, 4])

# Hitung kecepatan (jarak_km dibagi waktu_jam):
kecepatan = 

print("Kecepatan:", kecepatan)`,
      expectedOutput: `Kecepatan: [60. 60. 60.]`,
      hint: "Gunakan operator pembagian `/` langsung antar kedua array: `kecepatan = jarak_km / waktu_jam`.",
      solutionCode: `import numpy as np

jarak_km = np.array([120, 180, 240])
waktu_jam = np.array([2, 3, 4])

kecepatan = jarak_km / waktu_jam
print("Kecepatan:", kecepatan)`
    },
    {
      id: "np-bab4-ch3",
      title: "Latihan Praktik #3: Menghitung Kuadrat & Akar Kuadrat (np.sqrt)",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `angka = np.array([4, 9, 16, 25])`. Cetak hasil pangkat dua (`angka ** 2`) dan hasil akar kuadratnya (`np.sqrt(angka)`)!",
      tasks: [
        "Cetak `Kuadrat: <angka ** 2>`.",
        "Cetak `Akar   : <np.sqrt(angka)>`."
      ],
      starterCode: `import numpy as np

angka = np.array([4, 9, 16, 25])

print("Kuadrat:", )
print("Akar   :", )`,
      expectedOutput: `Kuadrat: [16 81 256 625]
Akar   : [2. 3. 4. 5.]`,
      hint: "Gunakan `angka ** 2` dan `np.sqrt(angka)`.",
      solutionCode: `import numpy as np

angka = np.array([4, 9, 16, 25])

print("Kuadrat:", angka ** 2)
print("Akar   :", np.sqrt(angka))`
    },
    {
      id: "np-bab4-ch4",
      title: "Latihan Praktik #4: Nilai Mutlak np.abs() & Pembulatan np.round()",
      difficulty: "Sedang",
      instructions:
        "Diberikan array `deviasi = np.array([-1.256, 3.789, -0.432])`. Ubah seluruh nilainya menjadi positif menggunakan `np.abs()`, kemudian bulatkan hasilnya hingga **1 angka di belakang koma** menggunakan `np.round(..., 1)`!",
      tasks: [
        "Terapkan `np.abs(deviasi)` lalu `np.round(..., 1)`.",
        "Simpan ke variabel `hasil_bersih` dan cetak."
      ],
      starterCode: `import numpy as np

deviasi = np.array([-1.256, 3.789, -0.432])

# Ambil nilai mutlak lalu bulatkan 1 angka desimal:
hasil_bersih = 

print("Hasil Bersih:", hasil_bersih)`,
      expectedOutput: `Hasil Bersih: [1.3 3.8 0.4]`,
      hint: "Gunakan `hasil_bersih = np.round(np.abs(deviasi), 1)`.",
      solutionCode: `import numpy as np

deviasi = np.array([-1.256, 3.789, -0.432])
hasil_bersih = np.round(np.abs(deviasi), 1)

print("Hasil Bersih:", hasil_bersih)`
    },
    {
      id: "np-bab4-ch5",
      title: "Latihan Praktik #5: Broadcasting Perkalian Matriks 2D dengan Vektor 1D",
      difficulty: "Sedang",
      instructions:
        "Sebuah toko menjual 3 produk selama 2 hari (`unit_terjual` berukuran 2×3). Harga satuan ketiga produk disimpan dalam vektor 1D `harga_satuan = np.array([1000, 2000, 3000])`. Kalikan `unit_terjual * harga_satuan` menggunakan *broadcasting* untuk mendapatkan matriks omzet!",
      tasks: [
        "Kalikan `omzet = unit_terjual * harga_satuan`.",
        "Cetak matriks `omzet`."
      ],
      starterCode: `import numpy as np

unit_terjual = np.array([
    [2, 3, 1],
    [4, 1, 2]
])
harga_satuan = np.array([1000, 2000, 3000])

# Kalikan unit_terjual dengan harga_satuan:
omzet = 

print(omzet)`,
      expectedOutput: `[[2000 6000 3000]
 [4000 2000 6000]]`,
      hint: "Tulis `omzet = unit_terjual * harga_satuan`.",
      solutionCode: `import numpy as np

unit_terjual = np.array([
    [2, 3, 1],
    [4, 1, 2]
])
harga_satuan = np.array([1000, 2000, 3000])

omzet = unit_terjual * harga_satuan
print(omzet)`
    }
  ],
  quizzes: [
    {
      question:
        "Apa yang dimaksud dengan **Vectorization** (Vektorisasi) di NumPy?",
      options: [
        "Mengubah gambar JPG menjadi gambar SVG",
        "Melakukan operasi matematika secara serentak pada seluruh elemen array tanpa perlu menulis perulangan for eksplisit",
        "Mengurutkan array dari nilai terkecil ke terbesar",
        "Menghapus elemen duplikat di dalam list"
      ],
      correctIndex: 1,
      explanation:
        "Vektorisasi memungkinkan operasi aritmatika dan fungsi matematika diterapkan langsung ke seluruh elemen `ndarray` di level kompilasi C tanpa `for` loop Python."
    },
    {
      question:
        "Jika `a = np.array([2, 4, 6])`, apakah hasil dari ekspresi `a * 2`?",
      options: [
        "[2, 4, 6, 2, 4, 6]",
        "[4 8 12]",
        "[4 4 6]",
        "TypeError"
      ],
      correctIndex: 1,
      explanation:
        "Pada `ndarray`, operator `* 2` mengalikan setiap elemen di dalam array dengan angka `2` menghasilkan `[4 8 12]`."
    },
    {
      question:
        "Jika `x = np.array([10, 20])` dan `y = np.array([3, 5])`, apakah hasil dari `x + y`?",
      options: [
        "[10 20 3 5]",
        "[13 25]",
        "38",
        "[30 100]"
      ],
      correctIndex: 1,
      explanation:
        "Penjumlahan dua `ndarray` berukuran sama dilakukan secara *element-wise*: `[10+3, 20+5]` yaitu `[13 25]`."
    },
    {
      question:
        "Fungsi NumPy manakah yang digunakan untuk menghitung akar kuadrat dari setiap elemen array?",
      options: [
        "np.power2(arr)",
        "np.sqrt(arr)",
        "np.root(arr)",
        "arr.sqrt()"
      ],
      correctIndex: 1,
      explanation:
        "`np.sqrt()` (*square root*) adalah *Universal Function* di NumPy untuk menghitung akar kuadrat tiap elemen."
    },
    {
      question:
        "Apa hasil dari `np.abs(np.array([-10, 0, 15, -3]))`?",
      options: [
        "[10 0 -15 3]",
        "[10 0 15 3]",
        "[-10 0 15 -3]",
        "28"
      ],
      correctIndex: 1,
      explanation:
        "`np.abs()` mengubah seluruh bilangan negatif menjadi nilai mutlak positifnya (`[10 0 15 3]`)."
    },
    {
      question:
        "Bagaimana cara membulatkan seluruh elemen array desimal `arr` menjadi tepat 2 angka di belakang koma?",
      options: [
        "np.round(arr, 2)",
        "np.floor(arr, 2)",
        "np.ceil(arr, 2)",
        "np.int(arr, 2)"
      ],
      correctIndex: 0,
      explanation:
        "`np.round(arr, decimals)` membulatkan setiap elemen array sesuai jumlah digit desimal yang ditentukan."
    },
    {
      question:
        "Apa yang dimaksud dengan mekanisme **Broadcasting** pada NumPy?",
      options: [
        "Mengirim data array melalui jaringan internet",
        "Aturan otomatis NumPy untuk merentangkan array berdimensi lebih kecil agar dapat dioperasikan dengan array berdimensi lebih besar yang kompatibel",
        "Mencetak array ke layar terminal",
        "Menyimpan array ke dalam file teks"
      ],
      correctIndex: 1,
      explanation:
        "Broadcasting memungkinkan operasi aritmatika antara dua array yang berbeda `.shape` selama dimensinya kompatibel (sama atau salah satunya bernilai 1)."
    },
    {
      question:
        "Jika matriks `M` berukuran `(4, 3)` dijumlahkan dengan vektor 1D `v` berukuran `(3,)`, berapakah `.shape` dari hasil penjumlahan `M + v`?",
      options: ["(3,)", "(4,)", "(4, 3)", "ValueError (Tidak bisa dijumlahkan)"],
      correctIndex: 2,
      explanation:
        "Vektor `(3,)` akan di-*broadcast* ke masing-masing dari 4 baris matriks `(4, 3)`, sehingga menghasilkan matriks berukuran `(4, 3)`."
    },
    {
      question:
        "Manakah pasangan ukuran `.shape` array di bawah ini yang **GAGAL** (memicu `ValueError`) saat dijumlahkan dengan Broadcasting?",
      options: [
        "Shape (3, 4) dengan Shape (4,)",
        "Shape (3, 4) dengan Skalar",
        "Shape (3, 4) dengan Shape (2,)",
        "Shape (3, 1) dengan Shape (3, 4)"
      ],
      correctIndex: 2,
      explanation:
        "Dimensi kolom terakhir pada `(3, 4)` adalah `4`, yang tidak cocok dengan `(2,)` dan bukan `1`, sehingga Broadcasting gagal."
    },
    {
      question:
        "Apa hasil dari ekspresi `np.array([1, 2, 3]) ** 2`?",
      options: [
        "[2 4 6]",
        "[1 4 9]",
        "[3 4 5]",
        "14"
      ],
      correctIndex: 1,
      explanation:
        "Operator `** 2` memangkatkan masing-masing elemen dengan 2: $1^2=1, 2^2=4, 3^2=9$ (`[1 4 9]`)."
    }
  ]
};
