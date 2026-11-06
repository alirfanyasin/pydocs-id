import { DocSection } from "../types";

export const bab2GeneratorArray: DocSection = {
  id: "numpy-bab2-generator-array",
  number: 2,
  title: "Fungsi Pembuat Array Otomatis (zeros, ones, arange, linspace, eye)",
  subtitle:
    "Membangkitkan array berukuran besar secara instan tanpa mengetik elemen satu per satu serta mengubah tipe data dengan .astype().",
  level: "Menengah",
  readTime: "13 menit",
  summary:
    "Dalam pemrograman *Data Science*, kita jarang mengetik ribuan angka secara manual ke dalam `np.array()`. NumPy menyediakan fungsi generator bawaan untuk menginisialisasi array secara instan: `np.zeros()` untuk mengisi angka nol, `np.ones()` untuk angka satu, `np.full()` untuk angka konstan bebas, `np.arange()` untuk deret angka dengan loncatan (*step*) tetap, `np.linspace()` untuk membagi rentang menjadi sejumlah titik berjarak sama rata, serta `np.eye()` untuk membuat matriks identitas.",
  keyPoints: [
    "Secara bawaan (*default*), `np.zeros(shape)` dan `np.ones(shape)` menghasilkan elemen bertipe desimal `float64` (contoh: `0.` dan `1.`). Tambahkan `dtype=int` jika menginginkan bilangan bulat.",
    "Untuk membuat matriks 2D pada `zeros`, `ones`, atau `full`, berikan ukuran baris dan kolom sebagai **tuple** di argumen pertama, misalnya `np.zeros((2, 3))`.",
    "Fungsi `np.arange(start, stop, step)` bekerja mirip `range()` bawaan Python: nilai `stop` **tidak ikut disertakan** (eksklusif).",
    "Fungsi `np.linspace(start, stop, num)` menghasilkan sebanyak `num` titik yang tersebar merata dari `start` hingga `stop` (**nilai `stop` ikut disertakan** secara default).",
    "Gunakan `np.eye(N)` untuk membuat matriks identitas $N \\times N$ (diagonal utama bernilai `1`, sisanya `0`), dan gunakan method `.astype(tipe_baru)` untuk mengonversi tipe data array yang sudah ada."
  ],
  conceptTable: {
    title: "Referensi Fungsi Pembuat Array Otomatis & Konversi Tipe",
    headers: ["Fungsi / Method", "Contoh Sintaks", "Hasil yang Dibuat"],
    rows: [
      [
        "np.zeros(shape)",
        "np.zeros((2, 3), dtype=int)",
        "Matriks 2×3 berisi angka 0 semua"
      ],
      [
        "np.ones(shape)",
        "np.ones(4, dtype=int)",
        "Array 1D [1 1 1 1] berisi angka 1 semua"
      ],
      [
        "np.full(shape, val)",
        "np.full((2, 2), 7)",
        "Matriks 2×2 yang seluruh selnya berisi angka 7"
      ],
      [
        "np.arange(start, stop, step)",
        "np.arange(2, 10, 2)",
        "Array deret [2 4 6 8] (batas stop=10 tidak masuk)"
      ],
      [
        "np.linspace(start, stop, num)",
        "np.linspace(0, 100, 5)",
        "5 titik berjarak sama rata: [0. 25. 50. 75. 100.]"
      ],
      [
        "np.eye(N)",
        "np.eye(3, dtype=int)",
        "Matriks identitas 3×3 (diagonal utama 1, lainnya 0)"
      ],
      [
        "arr.astype(dtype)",
        "arr.astype(int)",
        "Mengembalikan salinan array baru dengan tipe data yang diubah"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab2-ex1",
      title: "1. Membuat Array Konstan dengan zeros(), ones(), dan full()",
      description:
        "Menginisialisasi wadah array dengan nilai awal 0, 1, atau nilai tertentu.",
      code: `import numpy as np

# 1. Array 1D berisi 4 angka nol (default float64)
nol_float = np.zeros(4)
print("zeros(4) float:", nol_float)

# 2. Matriks 2x3 berisi angka 1 bertipe integer
satu_int = np.ones((2, 3), dtype=int)
print("ones((2, 3)) int:")
print(satu_int)

# 3. Matriks 2x2 yang seluruh selnya diisi angka 99
penuh_99 = np.full((2, 2), 99)
print("full((2, 2), 99):")
print(penuh_99)`,
      output: `zeros(4) float: [0. 0. 0. 0.]
ones((2, 3)) int:
[[1 1 1]
 [1 1 1]]
full((2, 2), 99):
[[99 99]
 [99 99]]`,
      lineExplanations: [
        {
          line: "nol_float = np.zeros(4)",
          explanation: "Membuat array 1D sepanjang 4 elemen berisi `0.` (`float64`)."
        },
        {
          line: "satu_int = np.ones((2, 3), dtype=int)",
          explanation: "Argumen `(2, 3)` berupa tuple ukuran 2 baris × 3 kolom, dan `dtype=int` membuat elemennya berupa integer `1`."
        },
        {
          line: "penuh_99 = np.full((2, 2), 99)",
          explanation: "Membuat matriks 2 baris × 2 kolom dan mengisi setiap posisinya dengan angka `99`."
        }
      ]
    },
    {
      id: "np-bab2-ex2",
      title: "2. Perbedaan np.arange() vs np.linspace()",
      description:
        "Membuat barisan angka berdasarkan besar loncatan (step) dengan arange() atau berdasarkan jumlah titik (num) dengan linspace().",
      code: `import numpy as np

# np.arange(start, stop, step) -> stop TIDAK ikut masuk
deret_kelipatan = np.arange(10, 50, 10)
print("arange(10, 50, 10):", deret_kelipatan)

# np.arange(5) -> sama seperti arange(0, 5, 1)
indeks = np.arange(5)
print("arange(5)         :", indeks)

print("-" * 38)

# np.linspace(start, stop, num) -> membagi rentang 0 s/d 1 menjadi 5 titik sama rata
titik_uji = np.linspace(0, 1, 5)
print("linspace(0, 1, 5) :", titik_uji)`,
      output: `arange(10, 50, 10): [10 20 30 40]
arange(5)         : [0 1 2 3 4]
--------------------------------------
linspace(0, 1, 5) : [0.   0.25 0.5  0.75 1.  ]`,
      lineExplanations: [
        {
          line: "deret_kelipatan = np.arange(10, 50, 10)",
          explanation: "Mulai dari `10`, bertambah `10` setiap langkah, dan berhenti **sebelum** menyentuh `50` (`[10 20 30 40]`)."
        },
        {
          line: "titik_uji = np.linspace(0, 1, 5)",
          explanation: "Menghasilkan tepat `5` angka dari `0` sampai `1` (termasuk `1.0`) dengan jarak antar titik yang seragam (`0.25`)."
        }
      ]
    },
    {
      id: "np-bab2-ex3",
      title: "3. Matriks Identitas np.eye() & Konversi Tipe .astype()",
      description:
        "Membuat matriks identitas persegi dan mengubah tipe data array dari float ke int.",
      code: `import numpy as np

# Matriks identitas 3x3 (diagonal utama bernilai 1, sisanya 0)
identitas = np.eye(3, dtype=int)
print("Matriks Identitas 3x3:")
print(identitas)

print("-" * 35)

# Mengubah array float menjadi int dengan .astype(int)
harga_kotor = np.array([15.9, 24.2, 8.75])
harga_bulat = harga_kotor.astype(int)
print("Sebelum astype:", harga_kotor)
print("Sesudah astype:", harga_bulat)`,
      output: `Matriks Identitas 3x3:
[[1 0 0]
 [0 1 0]
 [0 0 1]]
-----------------------------------
Sebelum astype: [15.9  24.2   8.75]
Sesudah astype: [15 24  8]`,
      lineExplanations: [
        {
          line: "identitas = np.eye(3, dtype=int)",
          explanation: "Menghasilkan matriks persegi 3×3 dengan angka `1` pada posisi diagonal `(0,0)`, `(1,1)`, `(2,2)` dan `0` di posisi lainnya."
        },
        {
          line: "harga_bulat = harga_kotor.astype(int)",
          explanation: "Method `.astype(int)` memangkas angka di belakang koma dan menghasilkan array baru bertipe `int64`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
# Lupa tanda kurung tuple saat membuat matriks 2D
mat = np.zeros(2, 3)`,
      correct: `import numpy as np
# Gunakan tuple ((baris, kolom)) sebagai argumen pertama
mat = np.zeros((2, 3))`,
      reason:
        "Pada `np.zeros()`, argumen kedua adalah `dtype`. Jika menulis `np.zeros(2, 3)`, angka `3` dianggap sebagai `dtype` dan memicu `TypeError`. Bungkus ukuran 2D dalam tuple: `np.zeros((2, 3))`."
    },
    {
      wrong: `import numpy as np
arr = np.array([1.5, 2.5])
arr.astype(int) # Lupa menyimpan hasil return ke variabel`,
      correct: `import numpy as np
arr = np.array([1.5, 2.5])
arr = arr.astype(int)`,
      reason:
        "Method `.astype()` tidak mengubah array asli secara langsung (*not in-place*), melainkan mengembalikan array baru yang harus disimpan ke dalam variabel."
    }
  ],
  tips: [
    "Gunakan `np.arange()` ketika kamu sudah tahu **besar langkah/selisihnya** (misal loncat 5), dan gunakan `np.linspace()` ketika kamu ingin menentukan **jumlah titiknya** secara pasti (misal butuh tepat 11 titik untuk grafik).",
    "Jika kamu ingin mengisi array dengan angka selain `0` dan `1`, selalu gunakan `np.full(shape, nilai)` karena lebih cepat dan bersih daripada membuat `ones()` lalu mengalikannya."
  ],
  caseStudies: [
    {
      id: "np-bab2-case1",
      title: "Studi Kasus 1: Penjadwalan Titik Pengukuran Suhu Oven Industri",
      difficulty: "Mudah",
      instructions:
        "Seorang teknisi pabrik ingin menguji suhu oven mulai dari `100` derajat hingga `200` derajat Celcius pada tepat `5` titik suhu yang berjarak sama rata. Selain itu, ia menyiapkan wadah papan skor awal berisi angka `0` bulat sebanyak `5` elemen. Buat kedua array tersebut menggunakan fungsi generator NumPy!",
      tasks: [
        "Buat `titik_suhu = np.linspace(100, 200, 5)`.",
        "Buat `skor_awal = np.zeros(5, dtype=int)`.",
        "Cetak `Titik Suhu: <titik_suhu>` dan `Skor Awal: <skor_awal>`."
      ],
      starterCode: `import numpy as np

# 1. Buat 5 titik suhu merata dari 100 sampai 200 dengan linspace:
titik_suhu = 

# 2. Buat 5 angka 0 bertipe int dengan zeros:
skor_awal = 

print("Titik Suhu:", titik_suhu)
print("Skor Awal:", skor_awal)`,
      expectedOutput: `Titik Suhu: [100. 125. 150. 175. 200.]
Skor Awal: [0 0 0 0 0]`,
      hint: "Gunakan `np.linspace(100, 200, 5)` dan `np.zeros(5, dtype=int)`.",
      solutionCode: `import numpy as np

titik_suhu = np.linspace(100, 200, 5)
skor_awal = np.zeros(5, dtype=int)

print("Titik Suhu:", titik_suhu)
print("Skor Awal:", skor_awal)`
    },
    {
      id: "np-bab2-case2",
      title: "Studi Kasus 2: Inisialisasi Kursi Bioskop & Kupon Diskon Seragam",
      difficulty: "Sedang",
      instructions:
        "Sebuah studio mini memiliki kursi berukuran `3` baris dan `4` kolom. Pada awal pemesanan, seluruh kursi berstatus tersedia (diwakili angka `1` integer). Selain itu, setiap kursi mendapat kupon potongan harga tetap senilai `15000` (matriks `3x4` bernilai `15000`). Buat kedua matriks tersebut dengan `np.ones()` dan `np.full()`!",
      tasks: [
        "Buat `status_kursi = np.ones((3, 4), dtype=int)`.",
        "Buat `kupon_kursi = np.full((3, 4), 15000)`.",
        "Cetak `Status Kursi:` diikuti matriks `status_kursi`, lalu `Kupon Kursi:` diikuti matriks `kupon_kursi`."
      ],
      starterCode: `import numpy as np

# Buat matriks 3x4 berisi angka 1 integer:
status_kursi = 

# Buat matriks 3x4 berisi angka 15000:
kupon_kursi = 

print("Status Kursi:")
print(status_kursi)
print("Kupon Kursi:")
print(kupon_kursi)`,
      expectedOutput: `Status Kursi:
[[1 1 1 1]
 [1 1 1 1]
 [1 1 1 1]]
Kupon Kursi:
[[15000 15000 15000 15000]
 [15000 15000 15000 15000]
 [15000 15000 15000 15000]]`,
      hint: "Pastikan ukuran matriks ditulis sebagai tuple `(3, 4)` di dalam `np.ones((3, 4), dtype=int)` dan `np.full((3, 4), 15000)`.",
      solutionCode: `import numpy as np

status_kursi = np.ones((3, 4), dtype=int)
kupon_kursi = np.full((3, 4), 15000)

print("Status Kursi:")
print(status_kursi)
print("Kupon Kursi:")
print(kupon_kursi)`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab2-ch1",
      title: "Latihan Praktik #1: Membuat Matriks Nol dengan np.zeros()",
      difficulty: "Mudah",
      instructions:
        "Buatlah sebuah matriks 2D berukuran `2` baris dan `4` kolom yang seluruh elemennya berisi angka `0` bertipe integer (`dtype=int`), lalu cetak matriks tersebut!",
      tasks: [
        "Gunakan `np.zeros((2, 4), dtype=int)`.",
        "Cetak hasilnya dengan `print()`."
      ],
      starterCode: `import numpy as np

# Buat matriks 2x4 berisi angka 0 integer:
matriks_nol = 

print(matriks_nol)`,
      expectedOutput: `[[0 0 0 0]
 [0 0 0 0]]`,
      hint: "Tulis `matriks_nol = np.zeros((2, 4), dtype=int)`.",
      solutionCode: `import numpy as np

matriks_nol = np.zeros((2, 4), dtype=int)
print(matriks_nol)`
    },
    {
      id: "np-bab2-ch2",
      title: "Latihan Praktik #2: Deret Kelipatan dengan np.arange()",
      difficulty: "Mudah",
      instructions:
        "Gunakan fungsi `np.arange()` untuk membuat array 1D berisi bilangan kelipatan 5 mulai dari `5` hingga `30` (`[5 10 15 20 25 30]`), lalu cetak hasilnya!",
      tasks: [
        "Ingat bahwa batas `stop` pada `np.arange(start, stop, step)` bersifat eksklusif, sehingga gunakan `stop=35` (atau `31`).",
        "Cetak array yang dihasilkan."
      ],
      starterCode: `import numpy as np

# Buat deret [5 10 15 20 25 30] menggunakan np.arange:
deret = 

print(deret)`,
      expectedOutput: `[5 10 15 20 25 30]`,
      hint: "Gunakan `np.arange(5, 35, 5)`.",
      solutionCode: `import numpy as np

deret = np.arange(5, 35, 5)
print(deret)`
    },
    {
      id: "np-bab2-ch3",
      title: "Latihan Praktik #3: Membagi Rentang Merata dengan np.linspace()",
      difficulty: "Mudah",
      instructions:
        "Gunakan `np.linspace()` untuk membuat tepat `6` titik angka yang terbagi rata mulai dari `0` sampai `50`, lalu cetak hasilnya!",
      tasks: [
        "Panggil `np.linspace(0, 50, 6)`.",
        "Cetak array hasilnya."
      ],
      starterCode: `import numpy as np

# Buat 6 titik merata dari 0 sampai 50:
titik = 

print(titik)`,
      expectedOutput: `[0. 10. 20. 30. 40. 50.]`,
      hint: "Tulis `titik = np.linspace(0, 50, 6)`.",
      solutionCode: `import numpy as np

titik = np.linspace(0, 50, 6)
print(titik)`
    },
    {
      id: "np-bab2-ch4",
      title: "Latihan Praktik #4: Matriks Konstan np.full() & Identitas np.eye()",
      difficulty: "Sedang",
      instructions:
        "Buatlah matriks `konstan` berukuran `2x3` yang seluruh selnya berisi angka `7` menggunakan `np.full()`, serta matriks identitas `identitas` berukuran `3x3` bertipe integer menggunakan `np.eye(3, dtype=int)`. Cetak keduanya!",
      tasks: [
        "Buat `konstan = np.full((2, 3), 7)`.",
        "Buat `identitas = np.eye(3, dtype=int)`.",
        "Cetak sesuai urutan pada starter code."
      ],
      starterCode: `import numpy as np

# 1. Matriks 2x3 berisi angka 7:
konstan = 

# 2. Matriks identitas 3x3 bertipe int:
identitas = 

print("Konstan:")
print(konstan)
print("Identitas:")
print(identitas)`,
      expectedOutput: `Konstan:
[[7 7 7]
 [7 7 7]]
Identitas:
[[1 0 0]
 [0 1 0]
 [0 0 1]]`,
      hint: "Gunakan `np.full((2, 3), 7)` dan `np.eye(3, dtype=int)`.",
      solutionCode: `import numpy as np

konstan = np.full((2, 3), 7)
identitas = np.eye(3, dtype=int)

print("Konstan:")
print(konstan)
print("Identitas:")
print(identitas)`
    },
    {
      id: "np-bab2-ch5",
      title: "Latihan Praktik #5: Konversi Tipe Array dengan .astype()",
      difficulty: "Sedang",
      instructions:
        "Diberikan array desimal `data_mentah = np.array([12.8, 45.1, 99.9, 30.0])`. Konversikan array tersebut menjadi bilangan bulat menggunakan method `.astype(int)`, simpan ke variabel `data_bulat`, lalu cetak isi dan `.dtype`-nya!",
      tasks: [
        "Buat `data_bulat = data_mentah.astype(int)`.",
        "Cetak `Hasil Bulat: <data_bulat>` dan `Tipe Baru: <dtype>`."
      ],
      starterCode: `import numpy as np

data_mentah = np.array([12.8, 45.1, 99.9, 30.0])

# Konversi ke int menggunakan .astype(int):
data_bulat = 

print("Hasil Bulat:", data_bulat)
print("Tipe Baru:", data_bulat.dtype)`,
      expectedOutput: `Hasil Bulat: [12 45 99 30]
Tipe Baru: int64`,
      hint: "Panggil `data_mentah.astype(int)`.",
      solutionCode: `import numpy as np

data_mentah = np.array([12.8, 45.1, 99.9, 30.0])
data_bulat = data_mentah.astype(int)

print("Hasil Bulat:", data_bulat)
print("Tipe Baru:", data_bulat.dtype)`
    }
  ],
  quizzes: [
    {
      question:
        "Apa tipe data (`dtype`) bawaan yang dihasilkan ketika kita memanggil `np.zeros(5)` tanpa argumen tambahan?",
      options: ["int64", "float64", "bool", "str"],
      correctIndex: 1,
      explanation:
        "Secara default, `np.zeros()` dan `np.ones()` menghasilkan elemen bertipe `float64` (`[0. 0. 0. 0. 0.]`)."
    },
    {
      question:
        "Manakah sintaks yang BENAR untuk membuat matriks 3 baris dan 2 kolom yang berisi angka 1 semua?",
      options: [
        "np.ones(3, 2)",
        "np.ones((3, 2))",
        "np.one((3, 2))",
        "np.full(3, 2, 1)"
      ],
      correctIndex: 1,
      explanation:
        "Ukuran dimensi untuk matriks 2D pada `np.ones()` harus diberikan sebagai satu tuple `(3, 2)` pada argumen pertama."
    },
    {
      question:
        "Fungsi manakah yang paling tepat untuk membuat matriks 2×2 yang seluruh selnya berisi angka `50`?",
      options: [
        "np.zeros((2, 2), 50)",
        "np.ones((2, 2), 50)",
        "np.full((2, 2), 50)",
        "np.eye((2, 2), 50)"
      ],
      correctIndex: 2,
      explanation:
        "`np.full(shape, fill_value)` membuat array dengan ukuran `shape` dan mengisi seluruh elemennya dengan `fill_value` (`50`)."
    },
    {
      question: "Apa hasil dari eksekusi `np.arange(1, 10, 3)`?",
      options: [
        "[1 4 7 10]",
        "[1 4 7]",
        "[1 3 6 9]",
        "[3 6 9]"
      ],
      correctIndex: 1,
      explanation:
        "Dimulai dari `1`, bertambah `3` setiap langkah (`1, 4, 7`), dan berhenti sebelum mencapai batas `stop=10`."
    },
    {
      question:
        "Apa perbedaan utama antara `np.arange(0, 10, 5)` dan `np.linspace(0, 10, 5)`?",
      options: [
        "arange menentukan jumlah titik, sedangkan linspace menentukan besar langkah",
        "arange menggunakan argumen ke-3 sebagai besar langkah (step), sedangkan linspace menggunakan argumen ke-3 sebagai jumlah elemen (num) dan menyertakan nilai stop",
        "Keduanya menghasilkan array yang sama persis",
        "linspace hanya bisa menerima angka negatif"
      ],
      correctIndex: 1,
      explanation:
        "Pada `arange(start, stop, step)`, argumen ke-3 adalah selisih antar angka. Pada `linspace(start, stop, num)`, argumen ke-3 adalah jumlah titik yang diinginkan dari `start` hingga `stop` (inklusif)."
    },
    {
      question: "Berapakah jumlah elemen yang dihasilkan oleh `np.linspace(10, 50, 9)`?",
      options: ["5 elemen", "9 elemen", "10 elemen", "40 elemen"],
      correctIndex: 1,
      explanation:
        "Argumen ketiga pada `np.linspace(start, stop, num)` menentukan jumlah titik (`num`), sehingga pasti menghasilkan `9` elemen."
    },
    {
      question: "Apa yang dihasilkan oleh pemanggilan `np.eye(3)`?",
      options: [
        "Array 1D berisi [3, 3, 3]",
        "Matriks 3×3 yang seluruh elemennya bernilai 1",
        "Matriks identitas 3×3 dengan diagonal utama bernilai 1 dan elemen lainnya 0",
        "Matriks 3×3 berisi angka acak"
      ],
      correctIndex: 2,
      explanation:
        "`np.eye(N)` menghasilkan matriks identitas berukuran $N \\times N$ di mana elemen diagonal utamanya bernilai `1.` dan sisanya `0.`."
    },
    {
      question:
        "Method apakah yang digunakan untuk mengubah tipe data sebuah `ndarray` menjadi tipe data lain (misalnya dari `float64` ke `int64`)?",
      options: [
        "arr.to_type(int)",
        "arr.astype(int)",
        "arr.dtype(int)",
        "np.convert(arr, int)"
      ],
      correctIndex: 1,
      explanation:
        "Method `.astype(new_dtype)` menghasilkan salinan array baru dengan tipe data sesuai argumen yang diberikan."
    },
    {
      question:
        "Jika `a = np.array([3.9, 7.1])` lalu kita memanggil `b = a.astype(int)`, apakah isi dari array `b`?",
      options: ["[4 7]", "[3 7]", "[3.9 7.1]", "Error"],
      correctIndex: 1,
      explanation:
        "Konversi `float` ke `int` menggunakan `.astype(int)` akan memangkas bagian desimal (pembulatan ke arah nol), sehingga `3.9` menjadi `3` dan `7.1` menjadi `7`."
    },
    {
      question: "Apa hasil dari `np.arange(4)`?",
      options: [
        "[1 2 3 4]",
        "[0 1 2 3]",
        "[0 1 2 3 4]",
        "[4 4 4 4]"
      ],
      correctIndex: 1,
      explanation:
        "Jika `np.arange(stop)` hanya diberi satu argumen, maka `start` dianggap `0` dan `step` dianggap `1`, menghasilkan `[0 1 2 3]`."
    }
  ]
};
