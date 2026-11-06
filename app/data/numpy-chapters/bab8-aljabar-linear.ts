import { DocSection } from "../types";

export const bab8AljabarLinear: DocSection = {
  id: "numpy-bab8-aljabar-linear",
  number: 8,
  title: "Aljabar Linear & Operasi Matriks (dot, @, diag, linalg)",
  subtitle:
    "Membedakan perkalian elemen (*) dengan perkalian matriks (np.dot & operator @), mengekstrak diagonal, serta menghitung determinan, invers, dan SPL.",
  level: "Menengah",
  readTime: "15 menit",
  summary:
    "Aljabar Linear adalah jantung dari algoritma *Machine Learning*, pemrosesan citra, hingga jaringan saraf tiruan (*Neural Networks*). Di NumPy, sangat penting untuk membedakan antara `A * B` (perkalian elemen-demi-elemen biasa) dengan **Perkalian Matriks / Dot Product** yang menggunakan fungsi `np.dot(A, B)` atau operator **`A @ B`**. Selain itu, NumPy menyediakan fungsi matriks `np.diag()` dan `np.trace()`, serta sub-modul khusus **`np.linalg`** untuk menghitung determinan (`det`), matriks kebalikan (`inv`), dan mencari solusi Sistem Persamaan Linear (`solve`).",
  keyPoints: [
    "**Penting**: Operator `A * B` hanya mengalikan elemen pada posisi yang sama (*element-wise*). Untuk **Perkalian Matriks (Baris × Kolom)** atau **Dot Product**, gunakan `np.dot(A, B)` atau operator `@` (`A @ B`).",
    "Pada dua vektor 1D `u` dan `v`, `np.dot(u, v)` menjumlahkan hasil kali tiap pasangan elemen: $\\sum u_i v_i$. Pada dua matriks 2D berukuran `(M, K)` dan `(K, N)`, `A @ B` menghasilkan matriks berukuran `(M, N)`.",
    "Fungsi `np.diag(mat)` mengekstrak elemen diagonal utama dari matriks 2D, sedangkan `np.trace(mat)` menghitung jumlah dari elemen-elemen diagonal utama tersebut.",
    "Sub-modul `np.linalg` menyediakan fungsi aljabar linear tingkat lanjut: `np.linalg.det(A)` untuk determinan matriks persegi, dan `np.linalg.inv(A)` untuk invers matriks ($A^{-1}$).",
    "Fungsi `np.linalg.solve(A, b)` menyelesaikan sistem persamaan linear $Ax = b$ secara langsung dan akurat."
  ],
  conceptTable: {
    title: "Referensi Operasi Matriks & Sub-Modul np.linalg",
    headers: ["Fungsi / Operator", "Contoh Sintaks", "Penjelasan Fungsi"],
    rows: [
      [
        "np.dot(u, v) / u @ v",
        "np.dot([1, 2], [3, 4])",
        "Dot product vektor atau perkalian matriks (1*3 + 2*4 = 11)"
      ],
      [
        "A @ B",
        "hasil = A @ B",
        "Operator khusus Python untuk perkalian matriks (setara np.matmul / np.dot)"
      ],
      [
        "np.diag(mat)",
        "np.diag(mat)",
        "Mengambil elemen diagonal utama matriks (atau membuat matriks diagonal dari 1D)"
      ],
      [
        "np.trace(mat)",
        "np.trace(mat)",
        "Menjumlahkan seluruh elemen pada diagonal utama matriks"
      ],
      [
        "np.linalg.det(A)",
        "np.linalg.det(A)",
        "Menghitung nilai determinan matriks persegi (ad - bc untuk 2×2)"
      ],
      [
        "np.linalg.inv(A)",
        "np.linalg.inv(A)",
        "Menghitung matriks invers (kebalikan) dari matriks persegi A"
      ],
      [
        "np.linalg.solve(A, b)",
        "x = np.linalg.solve(A, b)",
        "Mencari vektor solusi x dari persamaan linear A @ x = b"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab8-ex1",
      title: "1. Perbedaan Perkalian Biasa (*) vs Perkalian Matriks (@ / np.dot)",
      description:
        "Membandingkan hasil kali elemen A * B dengan perkalian matriks baris-kali-kolom A @ B.",
      code: `import numpy as np

# Dot product pada 2 vektor 1D: (2*10) + (3*20) = 80
v1 = np.array([2, 3])
v2 = np.array([10, 20])
print("Dot Product 1D:", np.dot(v1, v2))

print("-" * 36)

A = np.array([
    [1, 2],
    [3, 4]
])
B = np.array([
    [5, 6],
    [7, 8]
])

print("Perkalian Elemen Biasa (A * B):")
print(A * B)

print("Perkalian Matriks (A @ B):")
print(A @ B)`,
      output: `Dot Product 1D: 80
------------------------------------
Perkalian Elemen Biasa (A * B):
[[ 5 12]
 [21 32]]
Perkalian Matriks (A @ B):
[[19 22]
 [43 50]]`,
      lineExplanations: [
        {
          line: "np.dot(v1, v2)",
          explanation: "Menghitung $(2 \\times 10) + (3 \\times 20) = 20 + 60 = 80$."
        },
        {
          line: "A * B",
          explanation: "Hanya mengalikan sel yang seposisi: pojok kiri atas adalah $1 \\times 5 = 5$."
        },
        {
          line: "A @ B",
          explanation: "Perkalian matriks baris × kolom: pojok kiri atas adalah $(1 \\times 5) + (2 \\times 7) = 19$."
        }
      ]
    },
    {
      id: "np-bab8-ex2",
      title: "2. Diagonal Matriks (np.diag) & Jejak Diagonal (np.trace)",
      description:
        "Mengekstrak elemen diagonal utama dan menghitung jumlahnya.",
      code: `import numpy as np

matriks = np.array([
    [10,  2,  3],
    [ 4, 20,  6],
    [ 7,  8, 30]
])

# 1. Mengambil elemen diagonal utama
diagonal = np.diag(matriks)
print("Diagonal Utama (diag):", diagonal)

# 2. Menjumlahkan elemen diagonal utama (10 + 20 + 30)
jejak = np.trace(matriks)
print("Jumlah Diagonal (trace):", jejak)`,
      output: `Diagonal Utama (diag): [10 20 30]
Jumlah Diagonal (trace): 60`,
      lineExplanations: [
        {
          line: "diagonal = np.diag(matriks)",
          explanation: "Mengambil elemen pada posisi `(0,0)`, `(1,1)`, dan `(2,2)` yaitu `[10 20 30]`."
        },
        {
          line: "jejak = np.trace(matriks)",
          explanation: "Menjumlahkan elemen diagonal utama: $10 + 20 + 30 = 60$."
        }
      ]
    },
    {
      id: "np-bab8-ex3",
      title: "3. Determinan, Invers & Sistem Persamaan Linear (np.linalg)",
      description:
        "Menggunakan np.linalg.det(), np.linalg.inv(), dan np.linalg.solve() untuk memecahkan persamaan matematika.",
      code: `import numpy as np

# Matriks koefisien 2x2:
# 2x + 1y = 8
# 1x + 3y = 9
A = np.array([
    [2, 1],
    [1, 3]
])
b = np.array([8, 9])

# 1. Determinan A -> (2*3) - (1*1) = 5.0
print("Determinan A:", np.linalg.det(A))

# 2. Menyelesaikan sistem persamaan linear A @ x = b
solusi_x = np.linalg.solve(A, b)
print("Solusi [x, y]:", solusi_x)

# Pembuktian: A @ solusi_x harus sama dengan b
print("Pembuktian A @ x:", A @ solusi_x)`,
      output: `Determinan A: 5.0
Solusi [x, y]: [3. 2.]
Pembuktian A @ x: [8. 9.]`,
      lineExplanations: [
        {
          line: "np.linalg.det(A)",
          explanation: "Menghitung determinan matriks 2×2: $(2 \\times 3) - (1 \\times 1) = 5.0$."
        },
        {
          line: "solusi_x = np.linalg.solve(A, b)",
          explanation: "Menemukan bahwa $x = 3$ dan $y = 2$ memenuhi kedua persamaan $2(3) + 1(2) = 8$ dan $1(3) + 3(2) = 9$."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
A = np.array([[1, 2, 3], [4, 5, 6]]) # shape (2, 3)
B = np.array([[1, 2, 3], [4, 5, 6]]) # shape (2, 3)
hasil = A @ B`,
      correct: `import numpy as np
A = np.array([[1, 2, 3], [4, 5, 6]]) # shape (2, 3)
B = np.array([[1, 2], [3, 4], [5, 6]]) # shape (3, 2)
hasil = A @ B # menghasilkan shape (2, 2)`,
      reason:
        "Pada perkalian matriks `A @ B`, **jumlah kolom matriks pertama wajib sama dengan jumlah baris matriks kedua** (`(M, K) @ (K, N)`). Mengalikan `(2, 3) @ (2, 3)` akan memicu `ValueError: shapes not aligned`."
    }
  ],
  tips: [
    "Gunakan operator `@` (`A @ B`) untuk perkalian matriks pada kode Python modern karena jauh lebih ringkas dan mudah dibaca dibandingkan `np.dot(A, B)`.",
    "Untuk menyelesaikan persamaan $Ax = b$, selalu gunakan `np.linalg.solve(A, b)` daripada menghitung `np.linalg.inv(A) @ b` karena `solve()` lebih cepat dan lebih akurat secara numerik."
  ],
  caseStudies: [
    {
      id: "np-bab8-case1",
      title: "Studi Kasus 1: Menghitung Total Tagihan Keranjang di 2 Supermarket (Perkalian Matriks @)",
      difficulty: "Mudah",
      instructions:
        "Seorang ibu ingin membeli `[3, 2, 4]` unit barang (3 Roti, 2 Susu, 4 Sabun). Ia membandingkan daftar harga ketiga barang tersebut di 2 supermarket berbeda yang tersusun dalam matriks `harga_toko` berukuran 3 barang × 2 toko. Gunakan perkalian matriks `@` (`jumlah_beli @ harga_toko`) untuk menghitung total tagihan di masing-masing toko sekaligus!",
      tasks: [
        "Hitung `total_tagihan = jumlah_beli @ harga_toko`.",
        "Cetak `Total per Toko: <total_tagihan>`."
      ],
      starterCode: `import numpy as np

# Vektor jumlah barang yang dibeli (Shape: 3,)
jumlah_beli = np.array([3, 2, 4])

# Matriks harga di Toko A (kolom 0) dan Toko B (kolom 1) (Shape: 3x2)
harga_toko = np.array([
    [10000, 11000],
    [15000, 14000],
    [ 5000,  4500]
])

# Hitung perkalian matriks jumlah_beli @ harga_toko:
total_tagihan = 

print("Total per Toko:", total_tagihan)`,
      expectedOutput: `Total per Toko: [80000 79000]`,
      hint: "Tulis `total_tagihan = jumlah_beli @ harga_toko`.",
      solutionCode: `import numpy as np

jumlah_beli = np.array([3, 2, 4])

harga_toko = np.array([
    [10000, 11000],
    [15000, 14000],
    [ 5000,  4500]
])

total_tagihan = jumlah_beli @ harga_toko
print("Total per Toko:", total_tagihan)`
    },
    {
      id: "np-bab8-case2",
      title: "Studi Kasus 2: Mencari Harga Tiket Dewasa & Anak dengan Sistem Persamaan Linear",
      difficulty: "Sedang",
      instructions:
        "Di sebuah taman hiburan: Keluarga pertama membeli **2 tiket dewasa dan 1 tiket anak** seharga total `110000`. Keluarga kedua membeli **1 tiket dewasa dan 2 tiket anak** seharga total `100000`. Susun matriks koefisien `A = [[2, 1], [1, 2]]` dan vektor total `b = [110000, 100000]`, lalu cari harga masing-masing tiket menggunakan `np.linalg.solve(A, b)`!",
      tasks: [
        "Panggil `harga_tiket = np.linalg.solve(A, b)`.",
        "Cetak `Harga [Dewasa, Anak]: <harga_tiket>`."
      ],
      starterCode: `import numpy as np

A = np.array([
    [2, 1],
    [1, 2]
])
b = np.array([110000, 100000])

# Selesaikan persamaan linear A @ x = b dengan np.linalg.solve:
harga_tiket = 

print("Harga [Dewasa, Anak]:", harga_tiket)`,
      expectedOutput: `Harga [Dewasa, Anak]: [40000. 30000.]`,
      hint: "Gunakan `harga_tiket = np.linalg.solve(A, b)`.",
      solutionCode: `import numpy as np

A = np.array([
    [2, 1],
    [1, 2]
])
b = np.array([110000, 100000])

harga_tiket = np.linalg.solve(A, b)
print("Harga [Dewasa, Anak]:", harga_tiket)`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab8-ch1",
      title: "Latihan Praktik #1: Dot Product Dua Vektor 1D (np.dot)",
      difficulty: "Mudah",
      instructions:
        "Diberikan vektor bobot `bobot = np.array([2, 3, 5])` dan vektor skor `skor = np.array([80, 90, 70])`. Hitung hasil *Dot Product* keduanya menggunakan `np.dot(bobot, skor)` dan cetak hasilnya!",
      tasks: [
        "Panggil `np.dot(bobot, skor)`.",
        "Cetak hasilnya."
      ],
      starterCode: `import numpy as np

bobot = np.array([2, 3, 5])
skor = np.array([80, 90, 70])

# Hitung dot product bobot dan skor:
total_poin = 

print(total_poin)`,
      expectedOutput: `780`,
      hint: "Tulis `total_poin = np.dot(bobot, skor)`.",
      solutionCode: `import numpy as np

bobot = np.array([2, 3, 5])
skor = np.array([80, 90, 70])

total_poin = np.dot(bobot, skor)
print(total_poin)`
    },
    {
      id: "np-bab8-ch2",
      title: "Latihan Praktik #2: Perkalian Matriks 2D dengan Operator @",
      difficulty: "Mudah",
      instructions:
        "Kalikan matriks `M1` dan `M2` secara aljabar linear (baris × kolom) menggunakan operator `@` (`M1 @ M2`), lalu cetak matriks hasilnya!",
      tasks: [
        "Gunakan `hasil = M1 @ M2`.",
        "Cetak `hasil`."
      ],
      starterCode: `import numpy as np

M1 = np.array([
    [1, 2],
    [3, 4]
])
M2 = np.array([
    [2, 0],
    [1, 3]
])

# Kalikan matriks M1 dengan M2 menggunakan @:
hasil = 

print(hasil)`,
      expectedOutput: `[[ 4  6]
 [10 12]]`,
      hint: "Tulis `hasil = M1 @ M2`.",
      solutionCode: `import numpy as np

M1 = np.array([
    [1, 2],
    [3, 4]
])
M2 = np.array([
    [2, 0],
    [1, 3]
])

hasil = M1 @ M2
print(hasil)`
    },
    {
      id: "np-bab8-ch3",
      title: "Latihan Praktik #3: Mengekstrak Diagonal & Trace Matriks",
      difficulty: "Mudah",
      instructions:
        "Diberikan matriks persegi 3×3 `kotak`. Cetak elemen diagonal utamanya menggunakan `np.diag(kotak)` dan jumlah total diagonalnya menggunakan `np.trace(kotak)`!",
      tasks: [
        "Cetak `Diagonal: <np.diag(kotak)>`.",
        "Cetak `Trace   : <np.trace(kotak)>`."
      ],
      starterCode: `import numpy as np

kotak = np.array([
    [5, 1, 2],
    [3, 8, 4],
    [6, 7, 9]
])

print("Diagonal:", )
print("Trace   :", )`,
      expectedOutput: `Diagonal: [5 8 9]
Trace   : 22`,
      hint: "Isi dengan `np.diag(kotak)` dan `np.trace(kotak)`.",
      solutionCode: `import numpy as np

kotak = np.array([
    [5, 1, 2],
    [3, 8, 4],
    [6, 7, 9]
])

print("Diagonal:", np.diag(kotak))
print("Trace   :", np.trace(kotak))`
    },
    {
      id: "np-bab8-ch4",
      title: "Latihan Praktik #4: Menghitung Determinan & Invers Matriks (np.linalg)",
      difficulty: "Sedang",
      instructions:
        "Diberikan matriks 2×2 `P = np.array([[4, 7], [2, 6]])`. Hitung nilai determinannya menggunakan `np.linalg.det(P)` dan matriks inversnya menggunakan `np.linalg.inv(P)`!",
      tasks: [
        "Hitung `det_p = np.linalg.det(P)`.",
        "Hitung `inv_p = np.linalg.inv(P)`.",
        "Cetak keduanya sesuai starter code."
      ],
      starterCode: `import numpy as np

P = np.array([
    [4, 7],
    [2, 6]
])

det_p = 
inv_p = 

print("Determinan:", det_p)
print("Invers:")
print(inv_p)`,
      expectedOutput: `Determinan: 10.0
Invers:
[[ 0.6 -0.7]
 [-0.2  0.4]]`,
      hint: "Gunakan `np.linalg.det(P)` dan `np.linalg.inv(P)`.",
      solutionCode: `import numpy as np

P = np.array([
    [4, 7],
    [2, 6]
])

det_p = np.linalg.det(P)
inv_p = np.linalg.inv(P)

print("Determinan:", det_p)
print("Invers:")
print(inv_p)`
    },
    {
      id: "np-bab8-ch5",
      title: "Latihan Praktik #5: Menyelesaikan Sistem Persamaan Linear (np.linalg.solve)",
      difficulty: "Sedang",
      instructions:
        "Selesaikan sistem persamaan $3x + y = 9$ dan $x + 2y = 8$ menggunakan `np.linalg.solve(A, b)` di mana `A = np.array([[3, 1], [1, 2]])` dan `b = np.array([9, 8])`!",
      tasks: [
        "Panggil `solusi = np.linalg.solve(A, b)`.",
        "Cetak `Solusi [x, y]: <solusi>`."
      ],
      starterCode: `import numpy as np

A = np.array([
    [3, 1],
    [1, 2]
])
b = np.array([9, 8])

# Cari solusi [x, y] dengan np.linalg.solve:
solusi = 

print("Solusi [x, y]:", solusi)`,
      expectedOutput: `Solusi [x, y]: [2. 3.]`,
      hint: "Tulis `solusi = np.linalg.solve(A, b)`.",
      solutionCode: `import numpy as np

A = np.array([
    [3, 1],
    [1, 2]
])
b = np.array([9, 8])

solusi = np.linalg.solve(A, b)
print("Solusi [x, y]:", solusi)`
    }
  ],
  quizzes: [
    {
      question:
        "Apa perbedaan mendasar antara `A * B` dan `A @ B` pada dua matriks 2D di NumPy?",
      options: [
        "Tidak ada perbedaan sama sekali",
        "A * B mengalikan elemen pada posisi yang sama (element-wise), sedangkan A @ B melakukan perkalian matriks aljabar linear (baris × kolom)",
        "A @ B hanya bisa untuk array 1D",
        "A * B membagi matriks, sedangkan A @ B menjumlahkan matriks"
      ],
      correctIndex: 1,
      explanation:
        "Operator `*` melakukan perkalian *element-wise*, sedangkan `@` (atau `np.dot` / `np.matmul`) melakukan perkalian matriks baris-kali-kolom."
    },
    {
      question:
        "Berapakah hasil *Dot Product* dari `np.dot(np.array([2, 4]), np.array([3, 5]))`?",
      options: [
        "[6 20]",
        "26",
        "14",
        "40"
      ],
      correctIndex: 1,
      explanation:
        "Dot product dua vektor 1D menjumlahkan hasil kali tiap elemen: $(2 \\times 3) + (4 \\times 5) = 6 + 20 = 26$."
    },
    {
      question:
        "Jika matriks `A` berukuran `(3, 4)` dikalikan secara matriks (`A @ B`) dengan matriks `B` berukuran `(4, 2)`, berapakah ukuran (`.shape`) matriks hasilnya?",
      options: ["(4, 4)", "(3, 2)", "(3, 4)", "(4, 2)"],
      correctIndex: 1,
      explanation:
        "Perkalian matriks `(M, K) @ (K, N)` menghasilkan matriks berukuran `(M, N)`, sehingga `(3, 4) @ (4, 2)` menghasilkan ukuran `(3, 2)`."
    },
    {
      question:
        "Fungsi apakah yang digunakan untuk mengambil elemen-elemen pada diagonal utama sebuah matriks 2D?",
      options: [
        "np.diagonal_line(mat)",
        "np.diag(mat)",
        "np.trace(mat)",
        "np.eye(mat)"
      ],
      correctIndex: 1,
      explanation:
        "`np.diag(mat)` mengekstrak elemen pada diagonal utama matriks 2D menjadi array 1D."
    },
    {
      question:
        "Apa yang dihitung oleh fungsi `np.trace(mat)` pada sebuah matriks persegi?",
      options: [
        "Perkalian seluruh elemen matriks",
        "Jumlah total dari elemen-elemen pada diagonal utama matriks",
        "Selisih baris pertama dan baris terakhir",
        "Determinan matriks"
      ],
      correctIndex: 1,
      explanation:
        "Dalam aljabar linear, *trace* adalah hasil penjumlahan seluruh elemen pada diagonal utama matriks."
    },
    {
      question:
        "Sub-modul di dalam NumPy yang menyimpan fungsi determinan, invers matriks, dan penyelesaian persamaan linear adalah...",
      options: [
        "np.matrix",
        "np.linalg",
        "np.algebra",
        "np.calc"
      ],
      correctIndex: 1,
      explanation:
        "`np.linalg` (*Linear Algebra*) adalah sub-modul khusus aljabar linear di NumPy."
    },
    {
      question:
        "Fungsi manakah yang digunakan untuk menghitung nilai determinan dari matriks persegi `A`?",
      options: [
        "np.det(A)",
        "np.linalg.det(A)",
        "np.linalg.determinant(A)",
        "A.det()"
      ],
      correctIndex: 1,
      explanation:
        "`np.linalg.det(A)` menghitung determinan dari matriks persegi `A`."
    },
    {
      question:
        "Fungsi manakah yang digunakan untuk mencari matriks kebalikan (*invers* $A^{-1}$) dari matriks persegi `A`?",
      options: [
        "np.linalg.inv(A)",
        "np.linalg.reverse(A)",
        "A.T",
        "1 / A"
      ],
      correctIndex: 0,
      explanation:
        "`np.linalg.inv(A)` menghitung invers matriks $A^{-1}$ sedemikian sehingga $A \\cdot A^{-1} = I$."
    },
    {
      question:
        "Untuk mencari nilai vektor `x` pada Sistem Persamaan Linear $Ax = b$, fungsi apakah yang paling direkomendasikan di NumPy?",
      options: [
        "np.linalg.find(A, b)",
        "np.linalg.solve(A, b)",
        "b / A",
        "np.dot(A, b)"
      ],
      correctIndex: 1,
      explanation:
        "`np.linalg.solve(A, b)` dirancang khusus untuk menyelesaikan sistem persamaan linear $Ax = b$ dengan cepat dan presisi tinggi."
    },
    {
      question:
        "Jika sebuah matriks persegi memiliki determinan bernilai `0` (matriks singular), apa yang terjadi saat kita memanggil `np.linalg.inv()` pada matriks tersebut?",
      options: [
        "Menghasilkan matriks nol",
        "Menghasilkan error karena matriks dengan determinan 0 tidak memiliki invers",
        "Menghasilkan matriks identitas",
        "Menghasilkan angka 1"
      ],
      correctIndex: 1,
      explanation:
        "Secara matematis, matriks yang determinannya 0 (*singular matrix*) tidak dapat diinverskan dan akan memicu error (`LinAlgError`)."
    }
  ]
};
