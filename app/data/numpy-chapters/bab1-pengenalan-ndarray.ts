import { DocSection } from "../types";

export const bab1PengenalanNdarray: DocSection = {
  id: "numpy-bab1-pengenalan-ndarray",
  number: 1,
  title: "Pengenalan NumPy & Pembuatan ndarray",
  subtitle:
    "Memahami pustaka komputasi numerik NumPy, membuat array 1D dan 2D dengan np.array(), serta memeriksa atribut ndim, shape, size, dan dtype.",
  level: "Menengah",
  readTime: "12 menit",
  summary:
    "NumPy (*Numerical Python*) adalah pustaka fondasi komputasi ilmiah dan *Data Science* di Python. Struktur data utama NumPy adalah `ndarray` (*N-dimensional array*), yaitu wadah elemen berdimensi banyak yang **homogen** (seluruh elemennya wajib memiliki tipe data yang sama). Berbeda dengan `list` Python biasa yang menyimpan referensi objek secara terpisah, `ndarray` menyimpan angka secara berurutan di blok memori yang rapat sehingga perhitungan matematika dapat dieksekusi hingga puluhan kali lebih cepat.",
  keyPoints: [
    "Gunakan konvensi standar komunitas `import numpy as np` di baris paling atas sebelum memanggil fungsi-fungsi NumPy.",
    "Fungsi `np.array(list_python)` mengubah `list` 1D menjadi vektor 1D, atau `list` bersarang (*nested list*) menjadi matriks 2D.",
    "Seluruh elemen di dalam satu `ndarray` bersifat **homogen** (satu tipe data). Jika terdapat campuran `int` dan `float`, NumPy otomatis mengubah semuanya menjadi `float64` (*upcasting*). Kamu juga dapat menentukan tipe data secara eksplisit dengan parameter `dtype=float` atau `dtype=int`.",
    "Empat atribut utama untuk memeriksa struktur `ndarray`: `.ndim` (jumlah dimensi/sumbu), `.shape` (tuple ukuran baris dan kolom), `.size` (total seluruh elemen), dan `.dtype` (tipe data elemen).",
    "Saat dicetak dengan `print()`, `ndarray` ditampilkan menggunakan kurung siku `[]` **tanpa tanda koma** pemisah antar angka (contoh: `[10 20 30]`)."
  ],
  conceptTable: {
    title: "Referensi Sintaks Dasar ndarray & Atribut Inspeksi",
    headers: ["Sintaks / Atribut", "Contoh Penggunaan", "Penjelasan Fungsi"],
    rows: [
      [
        "import numpy as np",
        "import numpy as np",
        "Mengimpor pustaka NumPy dengan alias singkat np"
      ],
      [
        "np.array(data)",
        "arr = np.array([10, 20, 30])",
        "Membuat objek ndarray dari list atau tuple Python"
      ],
      [
        "np.array(data, dtype=...)",
        "arr = np.array([1, 2], dtype=float)",
        "Membuat ndarray dengan tipe data tertentu (int, float, bool)"
      ],
      [
        "arr.ndim",
        "print(arr.ndim)",
        "Mengembalikan jumlah dimensi array (1 untuk vektor, 2 untuk matriks)"
      ],
      [
        "arr.shape",
        "print(arr.shape)",
        "Mengembalikan tuple ukuran tiap dimensi, misal (2, 3) berarti 2 baris 3 kolom"
      ],
      [
        "arr.size",
        "print(arr.size)",
        "Mengembalikan jumlah total seluruh elemen di dalam array"
      ],
      [
        "arr.dtype",
        "print(arr.dtype)",
        "Mengembalikan tipe data elemen array (contoh: int64, float64, bool)"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab1-ex1",
      title: "1. Membuat Array 1D dan 2D dengan np.array()",
      description:
        "Membuat vektor 1 dimensi dari list biasa dan matriks 2 dimensi dari list di dalam list (nested list).",
      code: `import numpy as np

# 1. Membuat Array 1 Dimensi (Vektor)
suhu_harian = np.array([28, 30, 29, 31, 27])
print("Array 1D Suhu:", suhu_harian)
print("Tipe Objek:", type(suhu_harian))

print("-" * 35)

# 2. Membuat Array 2 Dimensi (Matriks 2 baris x 3 kolom)
matriks_nilai = np.array([
    [85, 90, 88],
    [78, 92, 80]
])
print("Matriks 2D Nilai:")
print(matriks_nilai)`,
      output: `Array 1D Suhu: [28 30 29 31 27]
Tipe Objek: <class 'numpy.ndarray'>
-----------------------------------
Matriks 2D Nilai:
[[85 90 88]
 [78 92 80]]`,
      lineExplanations: [
        {
          line: "import numpy as np",
          explanation: "Mengimpor modul numpy dan memberinya nama alias `np` agar lebih ringkas saat dipanggil."
        },
        {
          line: "suhu_harian = np.array([28, 30, 29, 31, 27])",
          explanation: "Mengonversi list Python berisi 5 bilangan bulat menjadi objek `ndarray` 1 dimensi."
        },
        {
          line: "matriks_nilai = np.array([[85, 90, 88], [78, 92, 80]])",
          explanation: "List bersarang yang terdiri dari 2 sub-list (masing-masing 3 angka) diubah menjadi matriks 2D berukuran 2 baris × 3 kolom."
        }
      ]
    },
    {
      id: "np-bab1-ex2",
      title: "2. Memeriksa Struktur Array dengan .ndim, .shape, .size, dan .dtype",
      description:
        "Menggunakan keempat atribut inspeksi untuk mengetahui dimensi, ukuran baris/kolom, total elemen, dan tipe data array.",
      code: `import numpy as np

data_sensor = np.array([
    [12, 15, 18, 20],
    [22, 25, 21, 19],
    [14, 17, 16, 23]
])

print("Isi Array:")
print(data_sensor)
print("Jumlah Dimensi (.ndim) :", data_sensor.ndim)
print("Ukuran BarisxKolom (.shape):", data_sensor.shape)
print("Total Elemen (.size)   :", data_sensor.size)
print("Tipe Data (.dtype)     :", data_sensor.dtype)`,
      output: `Isi Array:
[[12 15 18 20]
 [22 25 21 19]
 [14 17 16 23]]
Jumlah Dimensi (.ndim) : 2
Ukuran BarisxKolom (.shape): (3, 4)
Total Elemen (.size)   : 12
Tipe Data (.dtype)     : int64`,
      lineExplanations: [
        {
          line: "data_sensor.ndim",
          explanation: "Menghasilkan `2` karena array memiliki 2 sumbu (baris dan kolom)."
        },
        {
          line: "data_sensor.shape",
          explanation: "Menghasilkan tuple `(3, 4)` yang berarti 3 baris dan 4 kolom."
        },
        {
          line: "data_sensor.size",
          explanation: "Menghasilkan `12` (hasil kali 3 baris × 4 kolom = 12 elemen)."
        },
        {
          line: "data_sensor.dtype",
          explanation: "Menghasilkan `int64` karena seluruh elemen yang dimasukkan adalah bilangan bulat."
        }
      ]
    },
    {
      id: "np-bab1-ex3",
      title: "3. Sifat Homogen (Upcasting) & Parameter dtype Eksplisit",
      description:
        "Melihat bagaimana NumPy menyamakan tipe data secara otomatis dan cara mengatur dtype secara manual.",
      code: `import numpy as np

# Campuran int dan float -> otomatis diubah menjadi float64
campuran = np.array([10, 25.5, 40])
print("Array Campuran:", campuran)
print("Dtype Campuran:", campuran.dtype)

print("-" * 35)

# Menentukan dtype=float secara eksplisit pada angka bulat
harga_float = np.array([5000, 12000, 8500], dtype=float)
print("Harga (float):", harga_float)
print("Dtype Harga  :", harga_float.dtype)`,
      output: `Array Campuran: [10.  25.5 40. ]
Dtype Campuran: float64
-----------------------------------
Harga (float): [ 5000. 12000.  8500.]
Dtype Harga  : float64`,
      lineExplanations: [
        {
          line: "campuran = np.array([10, 25.5, 40])",
          explanation: "Karena ada satu angka desimal `25.5`, NumPy melakukan *upcasting* sehingga `10` dan `40` ikut menjadi `10.` dan `40.` (`float64`)."
        },
        {
          line: "harga_float = np.array([5000, 12000, 8500], dtype=float)",
          explanation: "Argumen `dtype=float` memaksa seluruh bilangan bulat disimpan sebagai bilangan desimal `float64`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
# Lupa tanda kurung siku list di dalam np.array()
arr = np.array(10, 20, 30)`,
      correct: `import numpy as np
# Bungkus deretan angka di dalam satu list [...]
arr = np.array([10, 20, 30])`,
      reason:
        "Fungsi `np.array()` menerima argumen pertama berupa satu objek sekuens (`list` atau `tuple`). Jika menulis `np.array(10, 20, 30)`, angka `20` akan dianggap sebagai argumen kedua (`dtype`) dan memicu `TypeError`."
    },
    {
      wrong: `import numpy as np
arr = np.array([[1, 2, 3], [4, 5]])`,
      correct: `import numpy as np
arr = np.array([[1, 2, 3], [4, 5, 6]])`,
      reason:
        "Setiap baris pada matriks 2D wajib memiliki jumlah kolom yang sama persis. Baris pertama berisi 3 angka sedangkan baris kedua berisi 2 angka akan memicu `ValueError`."
    }
  ],
  tips: [
    "Perhatikan bahwa `shape` dari array 1D berisi 5 elemen adalah `(5,)` (tuple 1 elemen), bukan `(5, 1)`.",
    "Atribut `.ndim`, `.shape`, `.size`, dan `.dtype` adalah **atribut** (properti), bukan method, sehingga dipanggil **tanpa tanda kurung** `()` di belakangnya."
  ],
  caseStudies: [
    {
      id: "np-bab1-case1",
      title: "Studi Kasus 1: Pemantauan Sensor Kelembapan Tanah Kebun Pintar",
      difficulty: "Mudah",
      instructions:
        "Sebuah kebun pintar (*smart farming*) memiliki 4 sensor kelembapan tanah yang mencatat persentase kelembapan `[65, 72, 68, 75]`. Buat array NumPy `kelembapan` dari data tersebut, lalu cetak isi array, jumlah dimensinya (`.ndim`), ukurannya (`.shape`), dan total sensornya (`.size`).",
      tasks: [
        "Impor `numpy as np` dan buat `kelembapan = np.array([65, 72, 68, 75])`.",
        "Cetak `Data Sensor: <kelembapan>`.",
        "Cetak `Dimensi: <ndim>`, `Shape: <shape>`, dan `Jumlah Sensor: <size>`."
      ],
      starterCode: `import numpy as np

# Buat array 1D kelembapan dari [65, 72, 68, 75]:
kelembapan = 

# Cetak informasi sesuai Target Output:
print("Data Sensor:", kelembapan)
`,
      expectedOutput: `Data Sensor: [65 72 68 75]
Dimensi: 1
Shape: (4,)
Jumlah Sensor: 4`,
      hint: "Gunakan `kelembapan.ndim`, `kelembapan.shape`, dan `kelembapan.size` di dalam `print()`.",
      solutionCode: `import numpy as np

kelembapan = np.array([65, 72, 68, 75])

print("Data Sensor:", kelembapan)
print("Dimensi:", kelembapan.ndim)
print("Shape:", kelembapan.shape)
print("Jumlah Sensor:", kelembapan.size)`
    },
    {
      id: "np-bab1-case2",
      title: "Studi Kasus 2: Tabel Stok Gudang 2 Cabang Toko",
      difficulty: "Sedang",
      instructions:
        "Sebuah minimarket mencatat stok 3 jenis barang di 2 cabang dalam bentuk matriks 2D: Cabang A memiliki `[120, 85, 60]` dan Cabang B memiliki `[95, 110, 75]`. Simpan ke dalam `ndarray` bernama `stok_gudang`, lalu tampilkan matriks, `.shape`, `.size`, dan `.dtype`-nya.",
      tasks: [
        "Buat array 2D `stok_gudang = np.array([[120, 85, 60], [95, 110, 75]])`.",
        "Cetak matriks `stok_gudang` di baris pertama.",
        "Cetak `Ukuran Tabel: (2, 3)`, `Total Sel Data: 6`, dan `Tipe Data: int64` menggunakan atribut array."
      ],
      starterCode: `import numpy as np

# Buat matriks 2D stok_gudang (2 baris x 3 kolom):
stok_gudang = 

print(stok_gudang)
# Cetak Ukuran Tabel, Total Sel Data, dan Tipe Data:
`,
      expectedOutput: `[[120  85  60]
 [ 95 110  75]]
Ukuran Tabel: (2, 3)
Total Sel Data: 6
Tipe Data: int64`,
      hint: "Gunakan `stok_gudang.shape`, `stok_gudang.size`, dan `stok_gudang.dtype`.",
      solutionCode: `import numpy as np

stok_gudang = np.array([
    [120, 85, 60],
    [95, 110, 75]
])

print(stok_gudang)
print("Ukuran Tabel:", stok_gudang.shape)
print("Total Sel Data:", stok_gudang.size)
print("Tipe Data:", stok_gudang.dtype)`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab1-ch1",
      title: "Latihan Praktik #1: Membuat Array 1D Pertama",
      difficulty: "Mudah",
      instructions:
        "Impor pustaka NumPy sebagai `np`, lalu buat sebuah array 1 dimensi bernama `angka` yang berisi elemen `[10, 20, 30, 40, 50]` dan cetak hasilnya ke layar!",
      tasks: [
        "Tulis `import numpy as np`.",
        "Buat variabel `angka = np.array([10, 20, 30, 40, 50])`.",
        "Cetak `angka` dengan `print(angka)`."
      ],
      starterCode: `import numpy as np

# Buat array 1D berisi [10, 20, 30, 40, 50]:


# Cetak array angka:
`,
      expectedOutput: `[10 20 30 40 50]`,
      hint: "Gunakan `angka = np.array([10, 20, 30, 40, 50])` lalu `print(angka)`.",
      solutionCode: `import numpy as np

angka = np.array([10, 20, 30, 40, 50])
print(angka)`
    },
    {
      id: "np-bab1-ch2",
      title: "Latihan Praktik #2: Membuat Matriks 2D (2 Baris x 2 Kolom)",
      difficulty: "Mudah",
      instructions:
        "Buatlah array 2 dimensi bernama `matriks` dengan baris pertama `[1, 2]` dan baris kedua `[3, 4]`, kemudian cetak matriks tersebut beserta jumlah dimensinya (`.ndim`)!",
      tasks: [
        "Buat `matriks = np.array([[1, 2], [3, 4]])`.",
        "Cetak `matriks`.",
        "Cetak `Dimensi: 2` menggunakan `matriks.ndim`."
      ],
      starterCode: `import numpy as np

# Buat matriks 2D [[1, 2], [3, 4]]:
matriks = 

print(matriks)
print("Dimensi:", matriks.ndim)`,
      expectedOutput: `[[1 2]
 [3 4]]
Dimensi: 2`,
      hint: "Pastikan menulis kurung siku ganda `np.array([[1, 2], [3, 4]])`.",
      solutionCode: `import numpy as np

matriks = np.array([[1, 2], [3, 4]])

print(matriks)
print("Dimensi:", matriks.ndim)`
    },
    {
      id: "np-bab1-ch3",
      title: "Latihan Praktik #3: Memeriksa Shape dan Size Matriks",
      difficulty: "Mudah",
      instructions:
        "Diberikan matriks `jadwal` berukuran 3 baris dan 2 kolom. Cetak nilai `.shape` dan `.size` dari matriks tersebut sesuai format Target Output!",
      tasks: [
        "Cetak `Shape: (3, 2)` dengan memanggil `jadwal.shape`.",
        "Cetak `Size: 6` dengan memanggil `jadwal.size`."
      ],
      starterCode: `import numpy as np

jadwal = np.array([
    [8, 10],
    [13, 15],
    [16, 18]
])

# Cetak Shape dan Size dari array jadwal:
`,
      expectedOutput: `Shape: (3, 2)
Size: 6`,
      hint: 'Gunakan `print("Shape:", jadwal.shape)` dan `print("Size:", jadwal.size)`.',
      solutionCode: `import numpy as np

jadwal = np.array([
    [8, 10],
    [13, 15],
    [16, 18]
])

print("Shape:", jadwal.shape)
print("Size:", jadwal.size)`
    },
    {
      id: "np-bab1-ch4",
      title: "Latihan Praktik #4: Menentukan dtype=float Secara Eksplisit",
      difficulty: "Sedang",
      instructions:
        "Buatlah array 1D bernama `skor` dari list bilangan bulat `[80, 90, 100]` tetapi paksa agar bertipe desimal menggunakan parameter `dtype=float`. Cetak isi array dan atribut `.dtype`-nya!",
      tasks: [
        "Buat `skor = np.array([80, 90, 100], dtype=float)`.",
        "Cetak `Skor: [ 80.  90. 100.]` (atau `print('Skor:', skor)`).",
        "Cetak `Dtype: float64` dengan `skor.dtype`."
      ],
      starterCode: `import numpy as np

# Buat array skor dengan dtype=float:
skor = 

print("Skor:", skor)
print("Dtype:", skor.dtype)`,
      expectedOutput: `Skor: [80. 90. 100.]
Dtype: float64`,
      hint: "Tambahkan argumen kedua `dtype=float` di dalam panggilan `np.array([80, 90, 100], dtype=float)`.",
      solutionCode: `import numpy as np

skor = np.array([80, 90, 100], dtype=float)

print("Skor:", skor)
print("Dtype:", skor.dtype)`
    },
    {
      id: "np-bab1-ch5",
      title: "Latihan Praktik #5: Inspeksi Lengkap Array Upcasting",
      difficulty: "Sedang",
      instructions:
        "Diberikan list campuran bilangan bulat dan desimal `[10, 20.5, 30, 40.2]`. Ubah menjadi `ndarray` bernama `pengukuran`, lalu cetak isi array, `.ndim`, `.shape`, `.size`, dan `.dtype` pada baris terpisah!",
      tasks: [
        "Buat `pengukuran = np.array([10, 20.5, 30, 40.2])`.",
        "Cetak `Array:`, `Ndim:`, `Shape:`, `Size:`, dan `Dtype:` sesuai Target Output."
      ],
      starterCode: `import numpy as np

pengukuran = np.array([10, 20.5, 30, 40.2])

# Cetak kelima informasi di bawah ini:
print("Array:", pengukuran)
`,
      expectedOutput: `Array: [10. 20.5 30. 40.2]
Ndim: 1
Shape: (4,)
Size: 4
Dtype: float64`,
      hint: "Tampilkan `pengukuran.ndim`, `pengukuran.shape`, `pengukuran.size`, dan `pengukuran.dtype`.",
      solutionCode: `import numpy as np

pengukuran = np.array([10, 20.5, 30, 40.2])

print("Array:", pengukuran)
print("Ndim:", pengukuran.ndim)
print("Shape:", pengukuran.shape)
print("Size:", pengukuran.size)
print("Dtype:", pengukuran.dtype)`
    }
  ],
  quizzes: [
    {
      question:
        "Apa nama struktur data objek array multidimensi utama yang disediakan oleh pustaka NumPy?",
      options: ["DataFrame", "ndarray", "Series", "MatrixList"],
      correctIndex: 1,
      explanation:
        "Objek utama di NumPy bernama `ndarray` (*N-dimensional array*), yang menyimpan elemen homogen berdimensi 1, 2, atau lebih."
    },
    {
      question:
        "Bagaimana penulisan standar komunitas Python untuk mengimpor pustaka NumPy?",
      options: [
        "import numpy as num",
        "import numpy as np",
        "from numpy import ndarray",
        "include numpy as np"
      ],
      correctIndex: 1,
      explanation:
        "`import numpy as np` adalah konvensi universal di dunia Data Science dan dokumentasi resmi NumPy."
    },
    {
      question:
        "Manakah cara penulisan yang BENAR untuk membuat array 1 dimensi berisi angka 1, 2, dan 3?",
      options: [
        "np.array(1, 2, 3)",
        "np.array([1, 2, 3])",
        "np.ndarray([1, 2, 3])",
        "np.list([1, 2, 3])"
      ],
      correctIndex: 1,
      explanation:
        "`np.array()` membutuhkan satu argumen sekuens seperti list `[1, 2, 3]` di dalam tanda kurungnya."
    },
    {
      question:
        "Apa arti sifat **homogen** pada elemen-elemen di dalam sebuah `ndarray`?",
      options: [
        "Semua elemen harus bernilai angka positif",
        "Semua elemen di dalam array harus memiliki tipe data yang sama",
        "Jumlah baris dan jumlah kolom array harus selalu sama",
        "Elemen array tidak bisa diakses dengan indeks"
      ],
      correctIndex: 1,
      explanation:
        "Homogen berarti seluruh elemen di dalam satu `ndarray` memiliki tipe data yang seragam (misalnya semuanya `int64` atau semuanya `float64`)."
    },
    {
      question:
        "Jika kita menjalankan `arr = np.array([5, 10.5, 20])`, apakah tipe data (`arr.dtype`) yang dihasilkan?",
      options: ["int64", "float64", "str", "bool"],
      correctIndex: 1,
      explanation:
        "Karena terdapat nilai desimal `10.5`, NumPy otomatis melakukan *upcasting* seluruh bilangan bulat menjadi `float64` agar tidak ada data pecahan yang hilang."
    },
    {
      question:
        "Atribut manakah yang digunakan untuk melihat jumlah dimensi (sumbu) dari sebuah array NumPy?",
      options: ["arr.shape", "arr.size", "arr.ndim", "arr.dtype"],
      correctIndex: 2,
      explanation:
        "Atribut `.ndim` (*number of dimensions*) mengembalikan jumlah dimensi array (misal `1` untuk array 1D dan `2` untuk matriks 2D)."
    },
    {
      question:
        "Diberikan `m = np.array([[10, 20, 30], [40, 50, 60]])`. Berapakah nilai dari `m.shape`?",
      options: ["(3, 2)", "(2, 3)", "6", "2"],
      correctIndex: 1,
      explanation:
        "Matriks `m` memiliki 2 sub-list (2 baris) dan masing-masing baris berisi 3 angka (3 kolom), sehingga `m.shape` adalah `(2, 3)`."
    },
    {
      question:
        "Untuk matriks `m` berukuran `(2, 3)` pada soal sebelumnya, berapakah nilai dari `m.size`?",
      options: ["2", "3", "5", "6"],
      correctIndex: 3,
      explanation:
        "Atribut `.size` mengembalikan total seluruh elemen di dalam array, yaitu $2 \\times 3 = 6$ elemen."
    },
    {
      question:
        "Bagaimana tampilan hasil `print(np.array([4, 5, 6]))` di terminal Python?",
      options: [
        "[4, 5, 6]",
        "[4 5 6]",
        "(4, 5, 6)",
        "array: 4, 5, 6"
      ],
      correctIndex: 1,
      explanation:
        "Saat dicetak menggunakan `print()`, objek `ndarray` menampilkan elemen di dalam kurung siku yang dipisahkan oleh spasi `[4 5 6]` tanpa tanda koma."
    },
    {
      question:
        "Parameter apa yang ditambahkan pada `np.array([1, 2, 3], ...)` jika kita ingin menentukan tipe data elemen secara manual menjadi desimal?",
      options: [
        "type=float",
        "dtype=float",
        "cast=float",
        "format=float"
      ],
      correctIndex: 1,
      explanation:
        "Parameter `dtype=float` (atau `dtype=np.float64`) digunakan untuk mengatur tipe data elemen saat array dibuat."
    }
  ]
};
