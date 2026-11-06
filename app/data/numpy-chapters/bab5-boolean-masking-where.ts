import { DocSection } from "../types";

export const bab5BooleanMaskingWhere: DocSection = {
  id: "numpy-bab5-boolean-masking-where",
  number: 5,
  title: "Boolean Masking, Filter Kondisi & np.where()",
  subtitle:
    "Menyaring elemen array dengan kondisi logika (&, |, ~), mengganti nilai secara bersyarat menggunakan np.where(), dan membatasi rentang dengan np.clip().",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "Saat menganalisis data, kita sering perlu menyaring elemen yang memenuhi kriteria tertentu—misalnya mengambil nilai ujian yang lulus ($\\ge 75$) atau mencari transaksi di atas batas tertentu. Di NumPy, perbandingan seperti `arr >= 75` menghasilkan array boolean (`True`/`False`) yang disebut **Boolean Mask**. Ketika *mask* ini dimasukkan ke dalam kurung siku `arr[arr >= 75]`, NumPy hanya mengembalikan elemen-elemen yang bernilai `True`. Selain itu, fungsi `np.where(kondisi, nilai_benar, nilai_salah)` memungkinkan kita melakukan percabangan `if-else` secara vektorisasi ke seluruh elemen array.",
  keyPoints: [
    "Ekspresi perbandingan seperti `arr > 50` atau `arr == 0` menghasilkan array bertipe `bool` (`True`/`False`) dengan ukuran `.shape` yang sama persis dengan `arr`.",
    "**Boolean Masking / Indexing**: Menuliskan `arr[kondisi]` (contoh: `nilai[nilai >= 75]`) akan menyaring dan mengembalikan array 1D berisi elemen yang memenuhi kondisi tersebut.",
    "Untuk menggabungkan lebih dari satu kondisi pada array NumPy, **JANGAN** gunakan kata kunci `and`, `or`, `not`. Gunakan simbol bitwise: `&` (AND), `|` (OR), dan `~` (NOT), serta **wajib membungkus setiap kondisi dengan tanda kurung** `(arr >= 60) & (arr <= 80)`.",
    "Fungsi `np.where(kondisi, nilai_jika_True, nilai_jika_False)` mengevaluasi setiap elemen: jika `True` diganti dengan argumen ke-2, jika `False` diganti dengan argumen ke-3.",
    "Fungsi `np.clip(arr, batas_bawah, batas_atas)` membatasi nilai elemen agar tidak kurang dari `batas_bawah` dan tidak lebih dari `batas_atas`."
  ],
  conceptTable: {
    title: "Referensi Boolean Masking, Operator Kondisi & np.where()",
    headers: ["Sintaks / Fungsi", "Contoh Penggunaan", "Penjelasan Hasil"],
    rows: [
      [
        "arr > nilai",
        "mask = skor >= 75",
        "Menghasilkan array boolean [True, False, ...]"
      ],
      [
        "arr[kondisi]",
        "lulus = skor[skor >= 75]",
        "Menyaring hanya elemen yang bernilai True pada kondisi"
      ],
      [
        "(kond1) & (kond2)",
        "skor[(skor >= 70) & (skor <= 90)]",
        "Kondisi logika AND pada NumPy (tanda kurung wajib)"
      ],
      [
        "(kond1) | (kond2)",
        "skor[(skor < 50) | (skor == 100)]",
        "Kondisi logika OR pada NumPy (tanda kurung wajib)"
      ],
      [
        "np.where(kond, a, b)",
        "np.where(skor >= 75, 'Lulus', 'Remedial')",
        "Percabangan vektorisasi: pilih a jika True, pilih b jika False"
      ],
      [
        "np.clip(arr, min, max)",
        "np.clip(skor, 0, 100)",
        "Memangkas nilai < min menjadi min, dan nilai > max menjadi max"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab5-ex1",
      title: "1. Membuat Boolean Mask & Menyaring Data Array",
      description:
        "Memeriksa kondisi kelulusan dan mengambil hanya nilai yang memenuhi syarat.",
      code: `import numpy as np

skor_ujian = np.array([65, 82, 90, 58, 77, 95])

# 1. Membuat Boolean Mask (True jika >= 75)
mask_lulus = skor_ujian >= 75
print("Boolean Mask :", mask_lulus)

# 2. Menyaring elemen menggunakan mask
skor_lulus = skor_ujian[mask_lulus]
print("Skor Lulus   :", skor_lulus)

# Bisa juga ditulis langsung di dalam kurung siku:
print("Skor < 70    :", skor_ujian[skor_ujian < 70])`,
      output: `Boolean Mask : [False  True  True False  True  True]
Skor Lulus   : [82 90 77 95]
Skor < 70    : [65 58]`,
      lineExplanations: [
        {
          line: "mask_lulus = skor_ujian >= 75",
          explanation: "Membandingkan setiap angka dengan `75` dan menghasilkan array boolean `[False True True False True True]`."
        },
        {
          line: "skor_lulus = skor_ujian[mask_lulus]",
          explanation: "Hanya mengekstrak angka pada posisi yang bernilai `True`, yaitu `[82 90 77 95]`."
        }
      ]
    },
    {
      id: "np-bab5-ex2",
      title: "2. Menggabungkan Kondisi dengan Operator & (AND) dan | (OR)",
      description:
        "Menyaring rentang angka dengan operator bitwise & dan | beserta tanda kurung.",
      code: `import numpy as np

suhu = np.array([18, 22, 25, 29, 34, 24])

# Suhu ideal: minimal 22 DAN maksimal 26 derajat
suhu_ideal = suhu[(suhu >= 22) & (suhu <= 26)]
print("Suhu Ideal (22-26)  :", suhu_ideal)

# Suhu ekstrem: di bawah 20 ATAU di atas 30 derajat
suhu_ekstrem = suhu[(suhu < 20) | (suhu > 30)]
print("Suhu Ekstrem (<20|>30):", suhu_ekstrem)`,
      output: `Suhu Ideal (22-26)  : [22 25 24]
Suhu Ekstrem (<20|>30): [18 34]`,
      lineExplanations: [
        {
          line: "suhu[(suhu >= 22) & (suhu <= 26)]",
          explanation: "Setiap kondisi wajib diapit tanda kurung `(...)` karena operator `&` memiliki prioritas lebih tinggi daripada `>=`."
        },
        {
          line: "suhu[(suhu < 20) | (suhu > 30)]",
          explanation: "Operator `|` (OR) memilih elemen yang kurang dari 20 atau lebih dari 30."
        }
      ]
    },
    {
      id: "np-bab5-ex3",
      title: "3. Transformasi Bersyarat dengan np.where() & Pembatasan np.clip()",
      description:
        "Memberikan label status kelulusan dengan np.where() dan membatasi nilai ekstrem dengan np.clip().",
      code: `import numpy as np

nilai = np.array([85, 60, 92, 70, 75])

# 1. np.where(kondisi, jika_benar, jika_salah)
status = np.where(nilai >= 75, "Lulus", "Remedial")
print("Status Kelulusan:", status)

# Memberi bonus +10 bagi yang di bawah 75, sisanya tetap
nilai_revisi = np.where(nilai < 75, nilai + 10, nilai)
print("Nilai Revisi    :", nilai_revisi)

print("-" * 38)

# 2. np.clip(arr, batas_bawah, batas_atas)
sensor_mentah = np.array([-15, 25, 60, 120, 85])
sensor_aman = np.clip(sensor_mentah, 0, 100)
print("Sensor Dibatasi (0-100):", sensor_aman)`,
      output: `Status Kelulusan: ['Lulus' 'Remedial' 'Lulus' 'Remedial' 'Lulus']
Nilai Revisi    : [85 70 92 80 75]
--------------------------------------
Sensor Dibatasi (0-100): [  0  25  60 100  85]`,
      lineExplanations: [
        {
          line: 'status = np.where(nilai >= 75, "Lulus", "Remedial")',
          explanation: "Mengecek setiap elemen `nilai`: jika $\\ge 75$ diisi `'Lulus'`, selain itu diisi `'Remedial'`."
        },
        {
          line: "sensor_aman = np.clip(sensor_mentah, 0, 100)",
          explanation: "Nilai `-15` yang di bawah `0` dinaikkan menjadi `0`, dan nilai `120` yang melebihi `100` diturunkan menjadi `100`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
arr = np.array([10, 20, 30])
# Menggunakan kata kunci 'and' atau lupa tanda kurung
hasil = arr[arr > 5 and arr < 25]`,
      correct: `import numpy as np
arr = np.array([10, 20, 30])
# Gunakan simbol '&' dan kurung masing-masing kondisi
hasil = arr[(arr > 5) & (arr < 25)]`,
      reason:
        "Kata kunci `and` di Python tidak bisa mengevaluasi nilai kebenaran array banyak elemen sekaligus (`ValueError: The truth value of an array is ambiguous`). Gunakan `&` untuk AND dan `|` untuk OR beserta tanda kurung."
    }
  ],
  tips: [
    "Kamu juga bisa mengubah langsung elemen yang memenuhi syarat dengan *boolean assignment*, misalnya `arr[arr < 0] = 0` untuk mengubah semua angka negatif menjadi 0.",
    "`np.where()` sangat berguna untuk membuat kolom kategori baru atau menerapkan diskon bersyarat tanpa perulangan `for`."
  ],
  caseStudies: [
    {
      id: "np-bab5-case1",
      title: "Studi Kasus 1: Penyaringan Transaksi Belanja yang Berhak Cashback",
      difficulty: "Mudah",
      instructions:
        "Sebuah aplikasi e-commerce memberikan promo kepada pelanggan yang total belanjanya **minimal Rp100.000** (`>= 100000`). Dari data `transaksi = np.array([45000, 120000, 85000, 250000, 100000, 60000])`, saring hanya transaksi yang berhak mendapat promo, lalu gunakan `np.where()` untuk membuat label `'Dapat Promo'` atau `'Normal'`!",
      tasks: [
        "Saring transaksi $\\ge 100000$ ke variabel `layak_promo = transaksi[transaksi >= 100000]`.",
        "Buat array label `label = np.where(transaksi >= 100000, 'Dapat Promo', 'Normal')`.",
        "Cetak kedua variabel sesuai Target Output."
      ],
      starterCode: `import numpy as np

transaksi = np.array([45000, 120000, 85000, 250000, 100000, 60000])

# 1. Saring elemen transaksi yang >= 100000:
layak_promo = 

# 2. Buat label dengan np.where:
label = 

print("Transaksi Promo:", layak_promo)
print("Status Label   :", label)`,
      expectedOutput: `Transaksi Promo: [120000 250000 100000]
Status Label   : ['Normal' 'Dapat Promo' 'Normal' 'Dapat Promo' 'Dapat Promo' 'Normal']`,
      hint: "Gunakan `transaksi[transaksi >= 100000]` dan `np.where(transaksi >= 100000, 'Dapat Promo', 'Normal')`.",
      solutionCode: `import numpy as np

transaksi = np.array([45000, 120000, 85000, 250000, 100000, 60000])

layak_promo = transaksi[transaksi >= 100000]
label = np.where(transaksi >= 100000, "Dapat Promo", "Normal")

print("Transaksi Promo:", layak_promo)
print("Status Label   :", label)`
    },
    {
      id: "np-bab5-case2",
      title: "Studi Kasus 2: Pembersihan Anomali Sensor Detak Jantung Pasien",
      difficulty: "Sedang",
      instructions:
        "Alat pemantau detak jantung mencatat data `bpm = np.array([42, 72, 85, 110, 68, 165, 90])`. Detak jantung normal dewasa berada pada rentang **60 hingga 100 BPM** (`(bpm >= 60) & (bpm <= 100)`). Saring data yang normal, lalu gunakan `np.clip()` untuk membatasi seluruh rekaman `bpm` agar berada di rentang aman minimal `50` dan maksimal `140`!",
      tasks: [
        "Saring `bpm_normal = bpm[(bpm >= 60) & (bpm <= 100)]`.",
        "Batasi nilai dengan `bpm_terbatas = np.clip(bpm, 50, 140)`.",
        "Cetak `BPM Normal:` dan `BPM Clip  :`."
      ],
      starterCode: `import numpy as np

bpm = np.array([42, 72, 85, 110, 68, 165, 90])

# 1. Saring bpm antara 60 dan 100 (inklusif) menggunakan &:
bpm_normal = 

# 2. Batasi rentang bpm menjadi minimal 50 dan maksimal 140 dengan np.clip:
bpm_terbatas = 

print("BPM Normal:", bpm_normal)
print("BPM Clip  :", bpm_terbatas)`,
      expectedOutput: `BPM Normal: [72 85 68 90]
BPM Clip  : [50 72 85 110 68 140 90]`,
      hint: "Gunakan `bpm[(bpm >= 60) & (bpm <= 100)]` dan `np.clip(bpm, 50, 140)`.",
      solutionCode: `import numpy as np

bpm = np.array([42, 72, 85, 110, 68, 165, 90])

bpm_normal = bpm[(bpm >= 60) & (bpm <= 100)]
bpm_terbatas = np.clip(bpm, 50, 140)

print("BPM Normal:", bpm_normal)
print("BPM Clip  :", bpm_terbatas)`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab5-ch1",
      title: "Latihan Praktik #1: Menyaring Angka di Atas Batas Tertentu",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `stok = np.array([5, 18, 3, 25, 12, 8])`. Gunakan *Boolean Masking* untuk mengambil hanya stok yang **lebih besar dari 10** (`> 10`), lalu cetak hasilnya!",
      tasks: [
        "Buat `stok_aman = stok[stok > 10]`.",
        "Cetak `stok_aman`."
      ],
      starterCode: `import numpy as np

stok = np.array([5, 18, 3, 25, 12, 8])

# Ambil elemen stok yang > 10:
stok_aman = 

print(stok_aman)`,
      expectedOutput: `[18 25 12]`,
      hint: "Tulis `stok_aman = stok[stok > 10]`.",
      solutionCode: `import numpy as np

stok = np.array([5, 18, 3, 25, 12, 8])
stok_aman = stok[stok > 10]

print(stok_aman)`
    },
    {
      id: "np-bab5-ch2",
      title: "Latihan Praktik #2: Menyaring Bilangan Genap dengan Modulo",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `angka = np.array([11, 14, 17, 20, 23, 26])`. Saring dan cetak hanya bilangan genap (habis dibagi 2, yaitu `angka % 2 == 0`)!",
      tasks: [
        "Gunakan kondisi `angka[angka % 2 == 0]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import numpy as np

angka = np.array([11, 14, 17, 20, 23, 26])

# Saring hanya bilangan genap:
genap = 

print(genap)`,
      expectedOutput: `[14 20 26]`,
      hint: "Tulis `genap = angka[angka % 2 == 0]`.",
      solutionCode: `import numpy as np

angka = np.array([11, 14, 17, 20, 23, 26])
genap = angka[angka % 2 == 0]

print(genap)`
    },
    {
      id: "np-bab5-ch3",
      title: "Latihan Praktik #3: Gabungan Dua Kondisi dengan Operator &",
      difficulty: "Sedang",
      instructions:
        "Dari array `umur = np.array([15, 22, 19, 35, 42, 28])`, saring elemen umur yang berada di rentang **minimal 20 DAN maksimal 35** (`(umur >= 20) & (umur <= 35)`)!",
      tasks: [
        "Gunakan tanda kurung pada masing-masing kondisi dan hubungkan dengan `&`.",
        "Cetak array hasil penyaringan."
      ],
      starterCode: `import numpy as np

umur = np.array([15, 22, 19, 35, 42, 28])

# Saring umur >= 20 dan <= 35:
umur_produktif = 

print(umur_produktif)`,
      expectedOutput: `[22 35 28]`,
      hint: "Tulis `umur_produktif = umur[(umur >= 20) & (umur <= 35)]`.",
      solutionCode: `import numpy as np

umur = np.array([15, 22, 19, 35, 42, 28])
umur_produktif = umur[(umur >= 20) & (umur <= 35)]

print(umur_produktif)`
    },
    {
      id: "np-bab5-ch4",
      title: "Latihan Praktik #4: Perhitungan Diskon Bersyarat dengan np.where()",
      difficulty: "Sedang",
      instructions:
        "Diberikan array `harga = np.array([50000, 150000, 80000, 200000])`. Gunakan `np.where()` untuk memberikan potongan `20000` jika `harga >= 100000`, sedangkan jika di bawah `100000` harganya tetap (`harga`). Cetak array `harga_akhir`!",
      tasks: [
        "Gunakan `np.where(harga >= 100000, harga - 20000, harga)`.",
        "Cetak `harga_akhir`."
      ],
      starterCode: `import numpy as np

harga = np.array([50000, 150000, 80000, 200000])

# Kurangi 20000 jika harga >= 100000, selain itu tetap harga:
harga_akhir = 

print(harga_akhir)`,
      expectedOutput: `[50000 130000 80000 180000]`,
      hint: "Tulis `harga_akhir = np.where(harga >= 100000, harga - 20000, harga)`.",
      solutionCode: `import numpy as np

harga = np.array([50000, 150000, 80000, 200000])
harga_akhir = np.where(harga >= 100000, harga - 20000, harga)

print(harga_akhir)`
    },
    {
      id: "np-bab5-ch5",
      title: "Latihan Praktik #5: Membatasi Rentang Nilai dengan np.clip()",
      difficulty: "Sedang",
      instructions:
        "Diberikan array `skor_mentah = np.array([-10, 45, 88, 105, 120])`. Gunakan `np.clip()` agar tidak ada skor di bawah `0` dan tidak ada skor di atas `100`, lalu cetak hasilnya!",
      tasks: [
        "Panggil `np.clip(skor_mentah, 0, 100)`.",
        "Simpan ke `skor_valid` dan cetak."
      ],
      starterCode: `import numpy as np

skor_mentah = np.array([-10, 45, 88, 105, 120])

# Batasi nilai antara 0 hingga 100 dengan np.clip:
skor_valid = 

print(skor_valid)`,
      expectedOutput: `[0 45 88 100 100]`,
      hint: "Gunakan `skor_valid = np.clip(skor_mentah, 0, 100)`.",
      solutionCode: `import numpy as np

skor_mentah = np.array([-10, 45, 88, 105, 120])
skor_valid = np.clip(skor_mentah, 0, 100)

print(skor_valid)`
    }
  ],
  quizzes: [
    {
      question:
        "Jika `a = np.array([10, 25, 30])`, apakah hasil dari ekspresi perbandingan `a > 20`?",
      options: [
        "[25 30]",
        "[False  True  True]",
        "True",
        "[0 25 30]"
      ],
      correctIndex: 1,
      explanation:
        "Perbandingan pada `ndarray` dievaluasi per elemen dan menghasilkan array boolean `[False True True]`."
    },
    {
      question:
        "Bagaimana cara mengambil hanya elemen yang bernilai lebih dari 50 pada array `data`?",
      options: [
        "data(data > 50)",
        "data[data > 50]",
        "np.filter(data > 50)",
        "data.where(> 50)"
      ],
      correctIndex: 1,
      explanation:
        "Teknik *Boolean Masking* dilakukan dengan menuliskan kondisi di dalam kurung siku pengindeksan: `data[data > 50]`."
    },
    {
      question:
        "Operator manakah yang WAJIB digunakan untuk menggabungkan dua kondisi logika **DAN (AND)** pada array NumPy?",
      options: ["and", "&&", "&", "+"],
      correctIndex: 2,
      explanation:
        "NumPy menggunakan operator bitwise `&` untuk operasi logika AND antar elemen array boolean."
    },
    {
      question:
        "Operator manakah yang digunakan untuk menggabungkan dua kondisi logika **ATAU (OR)** pada array NumPy?",
      options: ["or", "||", "|", "/"],
      correctIndex: 2,
      explanation:
        "Operator bitwise `|` digunakan untuk operasi logika OR antar elemen array boolean di NumPy."
    },
    {
      question:
        "Mengapa penulisan `arr[arr > 10 & arr < 20]` tanpa tanda kurung akan menghasilkan error?",
      options: [
        "Karena operator & tidak didukung di Python",
        "Karena operator & memiliki prioritas (precedence) lebih tinggi daripada > dan <, sehingga Python mengevaluasi 10 & arr terlebih dahulu",
        "Karena angka 10 dan 20 terlalu kecil",
        "Karena harus menggunakan kurung kurawal {}"
      ],
      correctIndex: 1,
      explanation:
        "Di Python, `&` dievaluasi lebih dulu daripada operator perbandingan `<` atau `>`. Oleh karena itu, setiap kondisi wajib dikurung: `(arr > 10) & (arr < 20)`."
    },
    {
      question:
        "Apa urutan argumen dari fungsi `np.where()` untuk percabangan nilai?",
      options: [
        "np.where(nilai_jika_benar, nilai_jika_salah, kondisi)",
        "np.where(kondisi, nilai_jika_benar, nilai_jika_salah)",
        "np.where(kondisi, nilai_jika_salah, nilai_jika_benar)",
        "np.where(array, batas_bawah, batas_atas)"
      ],
      correctIndex: 1,
      explanation:
        "Format `np.where(condition, x, y)` menerima kondisi di argumen pertama, nilai saat `True` (`x`) di argumen kedua, dan nilai saat `False` (`y`) di argumen ketiga."
    },
    {
      question:
        "Apa hasil dari `np.where(np.array([10, 50, 30]) >= 30, 1, 0)`?",
      options: [
        "[1 1 0]",
        "[0 1 1]",
        "[10 50 30]",
        "[0 0 1]"
      ],
      correctIndex: 1,
      explanation:
        "`10 >= 30` adalah `False` (`0`), `50 >= 30` adalah `True` (`1`), dan `30 >= 30` adalah `True` (`1`), sehingga hasilnya `[0 1 1]`."
    },
    {
      question:
        "Fungsi apakah yang digunakan untuk membatasi agar seluruh elemen array tidak kurang dari nilai minimum dan tidak melebihi nilai maksimum?",
      options: [
        "np.limit(arr, min, max)",
        "np.clip(arr, min, max)",
        "np.bound(arr, min, max)",
        "np.where(arr, min, max)"
      ],
      correctIndex: 1,
      explanation:
        "`np.clip(arr, a_min, a_max)` memangkas nilai di bawah `a_min` menjadi `a_min` dan nilai di atas `a_max` menjadi `a_max`."
    },
    {
      question:
        "Apa hasil dari `np.clip(np.array([2, 8, 15, 20]), 5, 12)`?",
      options: [
        "[8]",
        "[ 5  8 12 12]",
        "[ 2  8 15 12]",
        "[ 5  5 12 20]"
      ],
      correctIndex: 1,
      explanation:
        "Angka `2` dinaikkan ke batas bawah `5`, angka `8` tetap `8`, sedangkan `15` dan `20` diturunkan ke batas atas `12` (`[5 8 12 12]`)."
    },
    {
      question:
        "Simbol operator apakah yang digunakan untuk membalikkan (*negasi* / NOT) sebuah array boolean di NumPy?",
      options: ["!", "not", "~", "^"],
      correctIndex: 2,
      explanation:
        "Operator tilde `~` digunakan untuk membalik nilai `True` menjadi `False` dan `False` menjadi `True` pada array boolean NumPy."
    }
  ]
};
