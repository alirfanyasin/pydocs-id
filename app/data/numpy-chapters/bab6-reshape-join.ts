import { DocSection } from "../types";

export const bab6ReshapeJoin: DocSection = {
  id: "numpy-bab6-reshape-join",
  number: 6,
  title: "Manipulasi Bentuk Array (reshape, flatten, Transpose & Join)",
  subtitle:
    "Mengubah dimensi array dengan .reshape(), meratakan matriks dengan .flatten(), membalik sumbu dengan .T, serta menggabungkan array dengan vstack dan hstack.",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "Dalam pengolahan data dan *Machine Learning*, kita sering perlu mengubah bentuk (*shape*) array tanpa mengubah isinya—misalnya mengubah deretan 12 angka 1D menjadi tabel 2D berukuran 3 baris × 4 kolom menggunakan `.reshape(3, 4)`, atau sebaliknya meratakan matriks 2D menjadi vektor 1D menggunakan `.flatten()`. Selain itu, NumPy memudahkan kita memutar baris menjadi kolom dengan **Transpose** (`.T`), serta menyambung beberapa array secara vertikal (`np.vstack`) maupun horizontal (`np.hstack`).",
  keyPoints: [
    "Method `.reshape(baris, kolom)` mengubah dimensi array selama **hasil kali baris × kolom sama persis dengan total elemen (`.size`)**.",
    "Kamu dapat mengisi salah satu dimensi pada `.reshape()` dengan angka `-1` (contoh: `arr.reshape(3, -1)`), dan NumPy akan menghitung ukuran dimensi tersebut secara otomatis!",
    "Method `.flatten()` (atau `.ravel()`) meratakan array multidimensi (2D/3D) kembali menjadi array 1 dimensi.",
    "Atribut `.T` (atau `arr.transpose()`) menukar posisi baris menjadi kolom dan kolom menjadi baris (matriks ukuran `(2, 3)` menjadi `(3, 2)`).",
    "Untuk menggabungkan dua array atau lebih: gunakan `np.vstack((a, b))` untuk menumpuk ke bawah (vertikal/baris), `np.hstack((a, b))` untuk menyambung ke samping (horizontal/kolom), atau `np.concatenate((a, b), axis=...)`."
  ],
  conceptTable: {
    title: "Referensi Manipulasi Bentuk & Penggabungan Array",
    headers: ["Method / Fungsi", "Contoh Penggunaan", "Penjelasan Hasil"],
    rows: [
      [
        "arr.reshape(r, c)",
        "arr.reshape(2, 3)",
        "Mengubah bentuk array menjadi r baris dan c kolom"
      ],
      [
        "arr.reshape(r, -1)",
        "arr.reshape(2, -1)",
        "Menghitung jumlah kolom secara otomatis berdasarkan ukuran array"
      ],
      [
        "arr.flatten()",
        "mat.flatten()",
        "Meratakan matriks 2D menjadi array 1D"
      ],
      [
        "arr.T",
        "mat.T",
        "Transpose matriks: menukar baris menjadi kolom"
      ],
      [
        "np.vstack((a, b))",
        "np.vstack((baris1, baris2))",
        "Menumpuk array secara vertikal (menambah baris ke bawah)"
      ],
      [
        "np.hstack((a, b))",
        "np.hstack((kol1, kol2))",
        "Menyambung array secara horizontal (menambah kolom ke samping)"
      ],
      [
        "np.concatenate((a, b), axis=0)",
        "np.concatenate((m1, m2), axis=0)",
        "Menggabungkan array sepanjang sumbu axis (0=baris, 1=kolom)"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab6-ex1",
      title: "1. Mengubah Bentuk dengan .reshape() & Dimensi Otomatis (-1)",
      description:
        "Mengubah deret 1D berisi 6 elemen menjadi matriks 2x3 dan 3x2.",
      code: `import numpy as np

deret = np.arange(1, 7)
print("Array 1D Asli (size=6):", deret)

# 1. Mengubah menjadi 2 baris x 3 kolom
mat_2x3 = deret.reshape(2, 3)
print("\\nHasil reshape(2, 3):")
print(mat_2x3)

# 2. Menggunakan -1 agar jumlah kolom dihitung otomatis (6 / 3 = 2 kolom)
mat_3x2 = deret.reshape(3, -1)
print("\\nHasil reshape(3, -1):")
print(mat_3x2)`,
      output: `Array 1D Asli (size=6): [1 2 3 4 5 6]

Hasil reshape(2, 3):
[[1 2 3]
 [4 5 6]]

Hasil reshape(3, -1):
[[1 2]
 [3 4]
 [5 6]]`,
      lineExplanations: [
        {
          line: "mat_2x3 = deret.reshape(2, 3)",
          explanation: "Karena `deret.size` adalah 6, maka dapat dibentuk menjadi 2 baris × 3 kolom ($2 \\times 3 = 6$)."
        },
        {
          line: "mat_3x2 = deret.reshape(3, -1)",
          explanation: "Angka `-1` meminta NumPy menghitung sendiri jumlah kolomnya: $6 \\div 3 = 2$ kolom."
        }
      ]
    },
    {
      id: "np-bab6-ex2",
      title: "2. Meratakan Array (.flatten) & Transpose Matriks (.T)",
      description:
        "Menukar baris dan kolom matriks dengan .T serta meratakannya kembali menjadi 1D.",
      code: `import numpy as np

matriks = np.array([
    [10, 20, 30],
    [40, 50, 60]
])
print("Matriks Asli (2x3):")
print(matriks)

# 1. Transpose (.T) -> mengubah ukuran (2, 3) menjadi (3, 2)
putar = matriks.T
print("\\nHasil Transpose (.T) (3x2):")
print(putar)

# 2. Flatten -> meratakan matriks 2D menjadi 1D
rata = matriks.flatten()
print("\\nHasil Flatten (1D):", rata)`,
      output: `Matriks Asli (2x3):
[[10 20 30]
 [40 50 60]]

Hasil Transpose (.T) (3x2):
[[10 40]
 [20 50]
 [30 60]]

Hasil Flatten (1D): [10 20 30 40 50 60]`,
      lineExplanations: [
        {
          line: "putar = matriks.T",
          explanation: "Baris pertama `[10, 20, 30]` berubah menjadi kolom pertama, dan baris kedua `[40, 50, 60]` menjadi kolom kedua."
        },
        {
          line: "rata = matriks.flatten()",
          explanation: "Mengembalikan salinan array 1 dimensi yang berisi seluruh elemen matriks secara berurutan."
        }
      ]
    },
    {
      id: "np-bab6-ex3",
      title: "3. Menggabungkan Array dengan vstack() dan hstack()",
      description:
        "Menumpuk array secara vertikal (menambah baris) dan secara horizontal (menambah kolom).",
      code: `import numpy as np

tim_a = np.array([80, 85, 90])
tim_b = np.array([75, 88, 92])

# 1. np.vstack -> tumpuk vertikal menjadi matriks 2 baris x 3 kolom
gabung_vertikal = np.vstack((tim_a, tim_b))
print("Hasil vstack (Vertikal):")
print(gabung_vertikal)

# 2. np.hstack -> sambung horizontal menjadi 1D panjang 6 elemen
gabung_horizontal = np.hstack((tim_a, tim_b))
print("\\nHasil hstack (Horizontal):")
print(gabung_horizontal)`,
      output: `Hasil vstack (Vertikal):
[[80 85 90]
 [75 88 92]]

Hasil hstack (Horizontal):
[80 85 90 75 88 92]`,
      lineExplanations: [
        {
          line: "gabung_vertikal = np.vstack((tim_a, tim_b))",
          explanation: "Menumpuk `tim_a` sebagai baris pertama dan `tim_b` di bawahnya sebagai baris kedua."
        },
        {
          line: "gabung_horizontal = np.hstack((tim_a, tim_b))",
          explanation: "Menyambung elemen `tim_b` tepat di sebelah kanan `tim_a`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
arr = np.arange(10) # size = 10
mat = arr.reshape(3, 3) # 3 x 3 = 9 (tidak sama dengan 10)`,
      correct: `import numpy as np
arr = np.arange(10) # size = 10
mat = arr.reshape(2, 5) # 2 x 5 = 10`,
      reason:
        "Jumlah total elemen sebelum dan sesudah `.reshape()` wajib sama persis. Mengubah array berisi 10 elemen menjadi 3×3 (9 elemen) akan memicu `ValueError: cannot reshape array of size 10 into shape (3,3)`."
    },
    {
      wrong: `import numpy as np
a = np.array([1, 2])
b = np.array([3, 4])
# Lupa membungkus kedua array di dalam tuple (...)
gabung = np.vstack(a, b)`,
      correct: `import numpy as np
a = np.array([1, 2])
b = np.array([3, 4])
# Bungkus daftar array di dalam satu tuple ((a, b))
gabung = np.vstack((a, b))`,
      reason:
        "`np.vstack()`, `np.hstack()`, dan `np.concatenate()` menerima **satu argumen tuple/list** berisi array-array yang ingin digabungkan, contoh: `np.vstack((a, b))`."
    }
  ],
  tips: [
    "Gunakan `.reshape(-1, 1)` ketika kamu ingin mengubah array 1D berukuran `(N,)` menjadi matriks kolom 2D berukuran `(N, 1)` (sering dibutuhkan oleh pustaka Machine Learning seperti *Scikit-Learn*).",
    "Ingat singkatan mudahnya: **`vstack` = Vertical (Atas-Bawah / Baris)**, sedangkan **`hstack` = Horizontal (Kiri-Kanan / Kolom)**."
  ],
  caseStudies: [
    {
      id: "np-bab6-case1",
      title: "Studi Kasus 1: Menyusun Data Log Suhu 12 Jam Menjadi Tabel 3 Shift",
      difficulty: "Mudah",
      instructions:
        "Sebuah alat pencatat suhu merekam 12 data suhu berurutan setiap jam dalam array 1D `log_suhu`. Susun ulang array 1D tersebut menjadi matriks 2D berukuran **3 baris (Shift Pagi, Siang, Malam) × 4 kolom (4 jam per shift)** menggunakan `.reshape(3, 4)`!",
      tasks: [
        "Ubah bentuk `log_suhu` dengan `tabel_shift = log_suhu.reshape(3, 4)`.",
        "Cetak `Tabel Suhu per Shift:` diikuti matriks `tabel_shift`.",
        "Cetak `Shape Baru:` diikuti `tabel_shift.shape`."
      ],
      starterCode: `import numpy as np

log_suhu = np.array([24, 25, 27, 29, 31, 33, 32, 30, 28, 27, 26, 25])

# Ubah menjadi matriks 3 baris x 4 kolom:
tabel_shift = 

print("Tabel Suhu per Shift:")
print(tabel_shift)
print("Shape Baru:", tabel_shift.shape)`,
      expectedOutput: `Tabel Suhu per Shift:
[[24 25 27 29]
 [31 33 32 30]
 [28 27 26 25]]
Shape Baru: (3, 4)`,
      hint: "Gunakan `tabel_shift = log_suhu.reshape(3, 4)`.",
      solutionCode: `import numpy as np

log_suhu = np.array([24, 25, 27, 29, 31, 33, 32, 30, 28, 27, 26, 25])
tabel_shift = log_suhu.reshape(3, 4)

print("Tabel Suhu per Shift:")
print(tabel_shift)
print("Shape Baru:", tabel_shift.shape)`
    },
    {
      id: "np-bab6-case2",
      title: "Studi Kasus 2: Menggabungkan Laporan Penjualan Semester 1 & Semester 2",
      difficulty: "Sedang",
      instructions:
        "Toko buku memiliki rekap penjualan 2 cabang pada Semester 1 (`sem1`) dan Semester 2 (`sem2`), masing-masing berukuran 2 baris × 2 kolom. Gabungkan kedua matriks tersebut secara **horizontal (`np.hstack`)** agar menjadi tabel 1 tahun penuh berukuran 2 cabang × 4 kuartal!",
      tasks: [
        "Gabungkan `sem1` dan `sem2` dengan `setahun = np.hstack((sem1, sem2))`.",
        "Cetak `Rekap Setahun (2x4):` diikuti matriks `setahun`."
      ],
      starterCode: `import numpy as np

sem1 = np.array([
    [100, 120],
    [ 90, 110]
])
sem2 = np.array([
    [130, 150],
    [105, 125]
])

# Gabungkan secara horizontal dengan np.hstack:
setahun = 

print("Rekap Setahun (2x4):")
print(setahun)`,
      expectedOutput: `Rekap Setahun (2x4):
[[100 120 130 150]
 [ 90 110 105 125]]`,
      hint: "Gunakan `setahun = np.hstack((sem1, sem2))`.",
      solutionCode: `import numpy as np

sem1 = np.array([
    [100, 120],
    [ 90, 110]
])
sem2 = np.array([
    [130, 150],
    [105, 125]
])

setahun = np.hstack((sem1, sem2))

print("Rekap Setahun (2x4):")
print(setahun)`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab6-ch1",
      title: "Latihan Praktik #1: Mengubah Array 1D Menjadi Matriks 2D (.reshape)",
      difficulty: "Mudah",
      instructions:
        "Buatlah deret angka `1` sampai `9` menggunakan `np.arange(1, 10)`, lalu ubah bentuknya menjadi matriks persegi berukuran **3 baris × 3 kolom** menggunakan `.reshape(3, 3)` dan cetak hasilnya!",
      tasks: [
        "Gunakan `np.arange(1, 10).reshape(3, 3)`.",
        "Cetak matriks 3×3 yang dihasilkan."
      ],
      starterCode: `import numpy as np

# Buat arange(1, 10) lalu reshape menjadi (3, 3):
kotak = 

print(kotak)`,
      expectedOutput: `[[1 2 3]
 [4 5 6]
 [7 8 9]]`,
      hint: "Tulis `kotak = np.arange(1, 10).reshape(3, 3)`.",
      solutionCode: `import numpy as np

kotak = np.arange(1, 10).reshape(3, 3)
print(kotak)`
    },
    {
      id: "np-bab6-ch2",
      title: "Latihan Praktik #2: Reshape Otomatis dengan Parameter -1",
      difficulty: "Mudah",
      instructions:
        "Diberikan array 1D `data = np.arange(1, 9)` (8 elemen). Gunakan `.reshape(2, -1)` agar NumPy otomatis mengubahnya menjadi matriks 2 baris, lalu cetak matriks tersebut!",
      tasks: [
        "Panggil `data.reshape(2, -1)`.",
        "Cetak hasilnya."
      ],
      starterCode: `import numpy as np

data = np.arange(1, 9)

# Ubah menjadi 2 baris dengan kolom otomatis (-1):
matriks = 

print(matriks)`,
      expectedOutput: `[[1 2 3 4]
 [5 6 7 8]]`,
      hint: "Tulis `matriks = data.reshape(2, -1)`.",
      solutionCode: `import numpy as np

data = np.arange(1, 9)
matriks = data.reshape(2, -1)

print(matriks)`
    },
    {
      id: "np-bab6-ch3",
      title: "Latihan Praktik #3: Transpose Matriks dengan .T",
      difficulty: "Mudah",
      instructions:
        "Diberikan matriks `m` berukuran 2 baris × 3 kolom. Putar baris menjadi kolom menggunakan atribut `.T` dan cetak matriks hasil transpose tersebut!",
      tasks: [
        "Gunakan `m.T`.",
        "Cetak hasil transpose-nya."
      ],
      starterCode: `import numpy as np

m = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

# Lakukan transpose pada matriks m:
m_putar = 

print(m_putar)`,
      expectedOutput: `[[1 4]
 [2 5]
 [3 6]]`,
      hint: "Tulis `m_putar = m.T`.",
      solutionCode: `import numpy as np

m = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

m_putar = m.T
print(m_putar)`
    },
    {
      id: "np-bab6-ch4",
      title: "Latihan Praktik #4: Meratakan Matriks 2D Menjadi 1D (.flatten)",
      difficulty: "Sedang",
      instructions:
        "Diberikan matriks 2D `grid`. Ratakan matriks tersebut menjadi array 1 dimensi menggunakan method `.flatten()`, lalu cetak hasilnya!",
      tasks: [
        "Panggil `grid.flatten()`.",
        "Cetak array 1D hasilnya."
      ],
      starterCode: `import numpy as np

grid = np.array([
    [10, 20],
    [30, 40],
    [50, 60]
])

# Ratakan grid menjadi 1D:
baris_rata = 

print(baris_rata)`,
      expectedOutput: `[10 20 30 40 50 60]`,
      hint: "Tulis `baris_rata = grid.flatten()`.",
      solutionCode: `import numpy as np

grid = np.array([
    [10, 20],
    [30, 40],
    [50, 60]
])

baris_rata = grid.flatten()
print(baris_rata)`
    },
    {
      id: "np-bab6-ch5",
      title: "Latihan Praktik #5: Menumpuk Dua Array dengan np.vstack()",
      difficulty: "Sedang",
      instructions:
        "Diberikan dua array 1D `baris_atas = np.array([1, 2, 3])` dan `baris_bawah = np.array([4, 5, 6])`. Tumpuk keduanya secara vertikal menjadi matriks 2×3 menggunakan `np.vstack()`, lalu cetak hasilnya!",
      tasks: [
        "Gunakan `np.vstack((baris_atas, baris_bawah))`.",
        "Cetak matriks hasil penggabungan."
      ],
      starterCode: `import numpy as np

baris_atas = np.array([1, 2, 3])
baris_bawah = np.array([4, 5, 6])

# Gabungkan secara vertikal dengan np.vstack:
gabungan = 

print(gabungan)`,
      expectedOutput: `[[1 2 3]
 [4 5 6]]`,
      hint: "Tulis `gabungan = np.vstack((baris_atas, baris_bawah))`.",
      solutionCode: `import numpy as np

baris_atas = np.array([1, 2, 3])
baris_bawah = np.array([4, 5, 6])

gabungan = np.vstack((baris_atas, baris_bawah))
print(gabungan)`
    }
  ],
  quizzes: [
    {
      question:
        "Syarat utama agar sebuah array dapat diubah bentuknya menggunakan `.reshape(baris, kolom)` adalah...",
      options: [
        "Nilai baris dan kolom harus berupa bilangan genap",
        "Hasil kali baris × kolom harus sama persis dengan jumlah total elemen (.size) array asli",
        "Jumlah baris harus selalu lebih besar dari jumlah kolom",
        "Array asli harus bertipe float64"
      ],
      correctIndex: 1,
      explanation:
        "`.reshape()` tidak menambah atau mengurangi elemen, sehingga total elemen (`baris * kolom`) wajib sama dengan `arr.size`."
    },
    {
      question:
        "Jika `arr` memiliki `12` elemen dan kita memanggil `arr.reshape(4, -1)`, berapakah ukuran `.shape` yang dihasilkan?",
      options: ["(4, -1)", "(4, 3)", "(4, 8)", "(3, 4)"],
      correctIndex: 1,
      explanation:
        "Angka `-1` meminta NumPy menghitung otomatis dimensi kedua: $12 \\div 4 = 3$, sehingga menghasilkan shape `(4, 3)`."
    },
    {
      question:
        "Method apakah yang digunakan untuk mengubah matriks 2 dimensi menjadi array 1 dimensi (rata)?",
      options: [
        "mat.to_1d()",
        "mat.flatten()",
        "mat.flat_list()",
        "mat.squeeze_all()"
      ],
      correctIndex: 1,
      explanation:
        "`mat.flatten()` (atau `mat.ravel()`) meratakan array berdimensi banyak menjadi vektor 1 dimensi."
    },
    {
      question:
        "Jika matriks `A` berukuran `(2, 5)`, berapakah ukuran (`.shape`) dari hasil transpose `A.T`?",
      options: ["(2, 5)", "(5, 2)", "(10,)", "(5, 5)"],
      correctIndex: 1,
      explanation:
        "Operasi Transpose (`.T`) menukar sumbu baris dan kolom, sehingga matriks `(2, 5)` berubah menjadi `(5, 2)`."
    },
    {
      question:
        "Fungsi manakah yang digunakan untuk menumpuk dua array secara **vertikal** (atas-bawah / menambah baris)?",
      options: [
        "np.hstack((a, b))",
        "np.vstack((a, b))",
        "np.column_join((a, b))",
        "np.append_side((a, b))"
      ],
      correctIndex: 1,
      explanation:
        "`np.vstack()` (*vertical stack*) menumpuk array secara vertikal dari atas ke bawah."
    },
    {
      question:
        "Fungsi manakah yang digunakan untuk menyambung dua array secara **horizontal** (kiri-kanan / menambah kolom)?",
      options: [
        "np.vstack((a, b))",
        "np.hstack((a, b))",
        "np.row_stack((a, b))",
        "np.top_stack((a, b))"
      ],
      correctIndex: 1,
      explanation:
        "`np.hstack()` (*horizontal stack*) menyambung array secara mendatar dari kiri ke kanan."
    },
    {
      question:
        "Jika `x = np.array([1, 2])` dan `y = np.array([3, 4])`, apakah hasil dari `np.hstack((x, y))`?",
      options: [
        "[[1 2]\n [3 4]]",
        "[1 2 3 4]",
        "[4 6]",
        "[[1 3]\n [2 4]]"
      ],
      correctIndex: 1,
      explanation:
        "Menyambung dua array 1D secara horizontal menghasilkan satu array 1D gabungan `[1 2 3 4]`."
    },
    {
      question:
        "Jika `x = np.array([1, 2])` dan `y = np.array([3, 4])`, berapakah `.shape` dari `np.vstack((x, y))`?",
      options: ["(4,)", "(2, 2)", "(1, 4)", "(4, 1)"],
      correctIndex: 1,
      explanation:
        "`np.vstack` menumpuk `x` sebagai baris pertama dan `y` sebagai baris kedua, menghasilkan matriks 2D berukuran `(2, 2)`."
    },
    {
      question:
        "Pada fungsi `np.concatenate((m1, m2), axis=0)` untuk matriks 2D, apa arti dari `axis=0`?",
      options: [
        "Menggabungkan matriks ke arah bawah (sepanjang sumbu baris)",
        "Menggabungkan matriks ke arah samping kanan (sepanjang sumbu kolom)",
        "Meratakan matriks menjadi 1 dimensi",
        "Menghapus baris pertama"
      ],
      correctIndex: 0,
      explanation:
        "Pada matriks 2D, `axis=0` adalah sumbu vertikal (baris), sedangkan `axis=1` adalah sumbu horizontal (kolom)."
    },
    {
      question:
        "Manakah dari pemanggilan berikut yang akan menghasilkan `ValueError`?",
      options: [
        "np.arange(6).reshape(2, 3)",
        "np.arange(6).reshape(3, 2)",
        "np.arange(6).reshape(4, 2)",
        "np.arange(6).reshape(1, 6)"
      ],
      correctIndex: 2,
      explanation:
        "`np.arange(6)` hanya memiliki 6 elemen, sedangkan `reshape(4, 2)` membutuhkan $4 \\times 2 = 8$ elemen sehingga memicu `ValueError`."
    }
  ]
};
