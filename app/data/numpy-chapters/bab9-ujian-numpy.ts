import { DocSection } from "../types";

export const bab9UjianNumpy: DocSection = {
  id: "numpy-bab9-ujian-akhir",
  number: 9,
  title: "🏆 Ujian Akhir Modul Python NumPy",
  subtitle:
    "Uji penguasaan komputasi numerik dan matriks di Python melalui 15 tantangan praktik ngoding dan 10 soal pemahaman komprehensif (Bab 1 s/d Bab 8).",
  level: "Ujian Akhir",
  readTime: "45 menit",
  isExam: true,
  summary:
    "Selamat telah mempelajari seluruh bab pada modul **Python NumPy**! Pada bab **Ujian Akhir** ini, kamu akan menguji keterampilan komputasi numerik dari Bab 1 hingga Bab 8: pembuatan `ndarray` & atributnya, fungsi generator (`zeros`, `ones`, `arange`, `linspace`, `eye`), indexing & slicing matriks 2D, operasi vektorisasi & *broadcasting*, *Boolean Masking* & `np.where()`, manipulasi bentuk (`reshape`, `flatten`, `T`, `vstack`/`hstack`), statistik agregasi (`axis=0` vs `axis=1`), hingga aljabar linear (`@`, `np.dot`, `np.linalg`). Selesaikan **15 Soal Praktik Ngoding** dan **10 Soal Pemahaman** di bawah ini untuk menuntaskan modul Python NumPy!",
  keyPoints: [
    "Ujian ini terdiri dari **15 Soal Praktik Ngoding** dan **10 Soal Pemahaman Pilihan Ganda** (Total 25 Soal).",
    "Seluruh soal diambil murni dari materi Bab 1 hingga Bab 8 pada modul Python NumPy.",
    "Klik tombol **▶ Jalankan & Cek Jawaban** pada setiap soal praktik untuk memvalidasi output programmu.",
    "Setelah ke-25 soal terjawab, klik tombol penyelesaian di bagian paling bawah untuk menandai Ujian Akhir NumPy selesai."
  ],
  examples: [],
  codingChallenges: [
    {
      id: "np-exam-ch1",
      title: "Ujian Praktik #1: Membuat Matriks 2D & Inspeksi Shape/Size (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Buatlah matriks 2D bernama `sensor` dengan baris pertama `[10, 20, 30]` dan baris kedua `[40, 50, 60]`. Cetak atribut `.ndim`, `.shape`, dan `.size` dari matriks tersebut!",
      tasks: [
        "Buat `sensor = np.array([[10, 20, 30], [40, 50, 60]])`.",
        "Cetak `Ndim: 2`, `Shape: (2, 3)`, dan `Size: 6`."
      ],
      starterCode: `import numpy as np

# Buat matriks 2x3 sensor:
sensor = 

print("Ndim:", sensor.ndim)
print("Shape:", sensor.shape)
print("Size:", sensor.size)`,
      expectedOutput: `Ndim: 2
Shape: (2, 3)
Size: 6`,
      hint: "Gunakan `np.array([[10, 20, 30], [40, 50, 60]])`.",
      solutionCode: `import numpy as np

sensor = np.array([[10, 20, 30], [40, 50, 60]])

print("Ndim:", sensor.ndim)
print("Shape:", sensor.shape)
print("Size:", sensor.size)`
    },
    {
      id: "np-exam-ch2",
      title: "Ujian Praktik #2: Mengatur dtype=float pada np.array() (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Buatlah array 1D `harga` dari list `[100, 200, 300]` dengan parameter `dtype=float`, lalu cetak isi array dan atribut `.dtype`-nya!",
      tasks: [
        "Buat `harga = np.array([100, 200, 300], dtype=float)`.",
        "Cetak `Harga:` dan `Dtype:`."
      ],
      starterCode: `import numpy as np

harga = 

print("Harga:", harga)
print("Dtype:", harga.dtype)`,
      expectedOutput: `Harga: [100. 200. 300.]
Dtype: float64`,
      hint: "Tulis `harga = np.array([100, 200, 300], dtype=float)`.",
      solutionCode: `import numpy as np

harga = np.array([100, 200, 300], dtype=float)

print("Harga:", harga)
print("Dtype:", harga.dtype)`
    },
    {
      id: "np-exam-ch3",
      title: "Ujian Praktik #3: Deret np.arange() & Titik Merata np.linspace() (Bab 2)",
      difficulty: "Mudah",
      instructions:
        "Buatlah array `kelipatan` berisi `[10 20 30 40]` menggunakan `np.arange()`, serta array `titik` berisi `5` angka berjarak sama rata dari `0` sampai `100` menggunakan `np.linspace()`. Cetak keduanya!",
      tasks: [
        "Gunakan `np.arange(10, 50, 10)`.",
        "Gunakan `np.linspace(0, 100, 5)`."
      ],
      starterCode: `import numpy as np

kelipatan = 
titik = 

print("Kelipatan:", kelipatan)
print("Titik    :", titik)`,
      expectedOutput: `Kelipatan: [10 20 30 40]
Titik    : [0. 25. 50. 75. 100.]`,
      hint: "Gunakan `np.arange(10, 50, 10)` dan `np.linspace(0, 100, 5)`.",
      solutionCode: `import numpy as np

kelipatan = np.arange(10, 50, 10)
titik = np.linspace(0, 100, 5)

print("Kelipatan:", kelipatan)
print("Titik    :", titik)`
    },
    {
      id: "np-exam-ch4",
      title: "Ujian Praktik #4: Matriks Identitas np.eye() & Konversi .astype() (Bab 2)",
      difficulty: "Mudah",
      instructions:
        "Buat matriks identitas 3×3 menggunakan `np.eye(3)`, lalu konversikan tipe datanya menjadi bilangan bulat menggunakan `.astype(int)` dan cetak hasilnya!",
      tasks: [
        "Panggil `np.eye(3).astype(int)`.",
        "Cetak matriks 3×3 yang dihasilkan."
      ],
      starterCode: `import numpy as np

# Buat matriks identitas 3x3 lalu ubah ke int dengan .astype(int):
identitas = 

print(identitas)`,
      expectedOutput: `[[1 0 0]
 [0 1 0]
 [0 0 1]]`,
      hint: "Tulis `identitas = np.eye(3).astype(int)`.",
      solutionCode: `import numpy as np

identitas = np.eye(3).astype(int)
print(identitas)`
    },
    {
      id: "np-exam-ch5",
      title: "Ujian Praktik #5: Indexing & Slicing Kolom Matriks 2D (Bab 3)",
      difficulty: "Mudah",
      instructions:
        "Diberikan matriks 3×3 `tabel`. Cetak elemen pada **baris indeks 2, kolom indeks 0**, lalu cetak seluruh elemen pada **kolom indeks 2** (`[:, 2]`)!",
      tasks: [
        "Gunakan `tabel[2, 0]` dan `tabel[:, 2]`.",
        "Cetak sesuai format starter code."
      ],
      starterCode: `import numpy as np

tabel = np.array([
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33]
])

print("Sel [2, 0]:", )
print("Kolom 2   :", )`,
      expectedOutput: `Sel [2, 0]: 31
Kolom 2   : [13 23 33]`,
      hint: "Isi dengan `tabel[2, 0]` dan `tabel[:, 2]`.",
      solutionCode: `import numpy as np

tabel = np.array([
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33]
])

print("Sel [2, 0]:", tabel[2, 0])
print("Kolom 2   :", tabel[:, 2])`
    },
    {
      id: "np-exam-ch6",
      title: "Ujian Praktik #6: Memotong Sub-Matriks 2x2 (Bab 3)",
      difficulty: "Sedang",
      instructions:
        "Dari matriks 3×3 `grid`, potong dan cetak sub-matriks berukuran 2×2 yang berada pada **2 baris pertama (`0:2`)** dan **2 kolom terakhir (`1:3`)**!",
      tasks: [
        "Gunakan slicing `grid[0:2, 1:3]`.",
        "Cetak sub-matriks hasilnya."
      ],
      starterCode: `import numpy as np

grid = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

sub = 
print(sub)`,
      expectedOutput: `[[2 3]
 [5 6]]`,
      hint: "Tulis `sub = grid[0:2, 1:3]`.",
      solutionCode: `import numpy as np

grid = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

sub = grid[0:2, 1:3]
print(sub)`
    },
    {
      id: "np-exam-ch7",
      title: "Ujian Praktik #7: Vektorisasi Aritmatika & np.sqrt() (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Diberikan panjang alas dan tinggi dari 3 segitiga siku-siku: `a = np.array([3, 6, 8])` dan `b = np.array([4, 8, 15])`. Hitung sisi miring $c = \\sqrt{a^2 + b^2}$ menggunakan vektorisasi `np.sqrt(a ** 2 + b ** 2)`!",
      tasks: [
        "Hitung `c = np.sqrt(a ** 2 + b ** 2)`.",
        "Cetak `Sisi Miring: <c>`."
      ],
      starterCode: `import numpy as np

a = np.array([3, 6, 8])
b = np.array([4, 8, 15])

# Hitung sisi miring dengan rumus teorema Pythagoras:
c = 

print("Sisi Miring:", c)`,
      expectedOutput: `Sisi Miring: [5. 10. 17.]`,
      hint: "Tulis `c = np.sqrt(a ** 2 + b ** 2)`.",
      solutionCode: `import numpy as np

a = np.array([3, 6, 8])
b = np.array([4, 8, 15])

c = np.sqrt(a ** 2 + b ** 2)
print("Sisi Miring:", c)`
    },
    {
      id: "np-exam-ch8",
      title: "Ujian Praktik #8: Broadcasting Matriks 2D dengan Vektor 1D (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Kurangi setiap baris pada matriks `harga_awal` (2×3) dengan vektor potongan harga `diskon = np.array([1000, 2000, 3000])` menggunakan *broadcasting*, lalu cetak hasilnya!",
      tasks: [
        "Hitung `harga_bersih = harga_awal - diskon`.",
        "Cetak `harga_bersih`."
      ],
      starterCode: `import numpy as np

harga_awal = np.array([
    [15000, 25000, 35000],
    [12000, 22000, 32000]
])
diskon = np.array([1000, 2000, 3000])

harga_bersih = 
print(harga_bersih)`,
      expectedOutput: `[[14000 23000 32000]
 [11000 20000 29000]]`,
      hint: "Tulis `harga_bersih = harga_awal - diskon`.",
      solutionCode: `import numpy as np

harga_awal = np.array([
    [15000, 25000, 35000],
    [12000, 22000, 32000]
])
diskon = np.array([1000, 2000, 3000])

harga_bersih = harga_awal - diskon
print(harga_bersih)`
    },
    {
      id: "np-exam-ch9",
      title: "Ujian Praktik #9: Boolean Masking dengan Dua Kondisi & (Bab 5)",
      difficulty: "Sedang",
      instructions:
        "Dari array `nilai = np.array([55, 78, 84, 92, 68, 80])`, saring hanya nilai yang **minimal 75 DAN maksimal 85** (`(nilai >= 75) & (nilai <= 85)`)!",
      tasks: [
        "Gunakan `nilai[(nilai >= 75) & (nilai <= 85)]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import numpy as np

nilai = np.array([55, 78, 84, 92, 68, 80])

# Saring nilai antara 75 dan 85 (inklusif):
terfilter = 

print(terfilter)`,
      expectedOutput: `[78 84 80]`,
      hint: "Tulis `terfilter = nilai[(nilai >= 75) & (nilai <= 85)]`.",
      solutionCode: `import numpy as np

nilai = np.array([55, 78, 84, 92, 68, 80])
terfilter = nilai[(nilai >= 75) & (nilai <= 85)]

print(terfilter)`
    },
    {
      id: "np-exam-ch10",
      title: "Ujian Praktik #10: Transformasi Kategori dengan np.where() (Bab 5)",
      difficulty: "Sedang",
      instructions:
        "Diberikan array `suhu = np.array([25, 32, 28, 35, 29])`. Gunakan `np.where()` untuk menghasilkan label `'Panas'` jika `suhu > 30`, dan `'Sejuk'` jika tidak!",
      tasks: [
        "Gunakan `np.where(suhu > 30, 'Panas', 'Sejuk')`.",
        "Cetak array hasil `kategori`."
      ],
      starterCode: `import numpy as np

suhu = np.array([25, 32, 28, 35, 29])

kategori = 
print(kategori)`,
      expectedOutput: `['Sejuk' 'Panas' 'Sejuk' 'Panas' 'Sejuk']`,
      hint: "Tulis `kategori = np.where(suhu > 30, 'Panas', 'Sejuk')`.",
      solutionCode: `import numpy as np

suhu = np.array([25, 32, 28, 35, 29])
kategori = np.where(suhu > 30, "Panas", "Sejuk")

print(kategori)`
    },
    {
      id: "np-exam-ch11",
      title: "Ujian Praktik #11: Reshape Array & Transpose Matriks .T (Bab 6)",
      difficulty: "Sedang",
      instructions:
        "Buat deret angka `1` sampai `6` dengan `np.arange(1, 7)`, ubah bentuknya menjadi matriks `2x3` dengan `.reshape(2, 3)`, lalu lakukan transpose dengan `.T` sehingga menjadi matriks `3x2`!",
      tasks: [
        "Buat `mat = np.arange(1, 7).reshape(2, 3)`.",
        "Cetak `Transpose:` diikuti `mat.T`."
      ],
      starterCode: `import numpy as np

mat = np.arange(1, 7).reshape(2, 3)

# Cetak hasil transpose dari mat:
print("Transpose:")
print()`,
      expectedOutput: `Transpose:
[[1 4]
 [2 5]
 [3 6]]`,
      hint: "Cetak `print(mat.T)`.",
      solutionCode: `import numpy as np

mat = np.arange(1, 7).reshape(2, 3)

print("Transpose:")
print(mat.T)`
    },
    {
      id: "np-exam-ch12",
      title: "Ujian Praktik #12: Menggabungkan Array dengan vstack & hstack (Bab 6)",
      difficulty: "Sedang",
      instructions:
        "Diberikan `a = np.array([10, 20])` dan `b = np.array([30, 40])`. Cetak hasil penggabungan horizontal (`np.hstack((a, b))`) dan vertikal (`np.vstack((a, b))`)!",
      tasks: [
        "Cetak `Horizontal: <np.hstack((a, b))>`.",
        "Cetak `Vertikal:` diikuti `np.vstack((a, b))`."
      ],
      starterCode: `import numpy as np

a = np.array([10, 20])
b = np.array([30, 40])

print("Horizontal:", )
print("Vertikal:")
print()`,
      expectedOutput: `Horizontal: [10 20 30 40]
Vertikal:
[[10 20]
 [30 40]]`,
      hint: "Gunakan `np.hstack((a, b))` dan `np.vstack((a, b))`.",
      solutionCode: `import numpy as np

a = np.array([10, 20])
b = np.array([30, 40])

print("Horizontal:", np.hstack((a, b)))
print("Vertikal:")
print(np.vstack((a, b)))`
    },
    {
      id: "np-exam-ch13",
      title: "Ujian Praktik #13: Agregasi Statistik axis=0 vs axis=1 (Bab 7)",
      difficulty: "Menantang",
      instructions:
        "Diberikan matriks `penjualan` (2×3). Cetak nilai maksimum per kolom (`np.max(..., axis=0)`) dan rata-rata per baris (`np.mean(..., axis=1)`)!",
      tasks: [
        "Cetak `Max per Kolom : <np.max(penjualan, axis=0)>`.",
        "Cetak `Mean per Baris: <np.mean(penjualan, axis=1)>`."
      ],
      starterCode: `import numpy as np

penjualan = np.array([
    [10, 40, 70],
    [30, 20, 50]
])

print("Max per Kolom :", )
print("Mean per Baris:", )`,
      expectedOutput: `Max per Kolom : [30 40 70]
Mean per Baris: [40. 33.33333333]`,
      hint: "Gunakan `np.max(penjualan, axis=0)` dan `np.mean(penjualan, axis=1)`.",
      solutionCode: `import numpy as np

penjualan = np.array([
    [10, 40, 70],
    [30, 20, 50]
])

print("Max per Kolom :", np.max(penjualan, axis=0))
print("Mean per Baris:", np.mean(penjualan, axis=1))`
    },
    {
      id: "np-exam-ch14",
      title: "Ujian Praktik #14: Indeks Tertinggi argmax & Nilai Unik (Bab 7)",
      difficulty: "Menantang",
      instructions:
        "Diberikan array `poin = np.array([50, 80, 95, 80, 50])`. Cetak posisi indeks nilai tertinggi menggunakan `np.argmax(poin)` dan daftar nilai unik terurut menggunakan `np.unique(poin)`!",
      tasks: [
        "Cetak `Indeks Max: <np.argmax(poin)>`.",
        "Cetak `Nilai Unik: <np.unique(poin)>`."
      ],
      starterCode: `import numpy as np

poin = np.array([50, 80, 95, 80, 50])

print("Indeks Max:", )
print("Nilai Unik:", )`,
      expectedOutput: `Indeks Max: 2
Nilai Unik: [50 80 95]`,
      hint: "Gunakan `np.argmax(poin)` dan `np.unique(poin)`.",
      solutionCode: `import numpy as np

poin = np.array([50, 80, 95, 80, 50])

print("Indeks Max:", np.argmax(poin))
print("Nilai Unik:", np.unique(poin))`
    },
    {
      id: "np-exam-ch15",
      title: "Ujian Praktik #15: Perkalian Matriks (@) & Solusi Persamaan Linear (Bab 8)",
      difficulty: "Menantang",
      instructions:
        "Diberikan matriks `A = np.array([[2, 1], [1, 1]])` dan vektor `b = np.array([7, 4])`. Hitung determinan `A` dengan `np.linalg.det(A)`, cari vektor solusi `x` dari $Ax = b$ dengan `np.linalg.solve(A, b)`, lalu buktikan hasilnya dengan mencetak `A @ x`!",
      tasks: [
        "Cetak `Determinan: <np.linalg.det(A)>`.",
        "Hitung `x = np.linalg.solve(A, b)` lalu cetak `Solusi x  : <x>`.",
        "Cetak `Bukti A@x : <A @ x>`."
      ],
      starterCode: `import numpy as np

A = np.array([
    [2, 1],
    [1, 1]
])
b = np.array([7, 4])

# Hitung determinan dan solusi persamaan linear:
det_a = 
x = 

print("Determinan:", det_a)
print("Solusi x  :", x)
print("Bukti A@x :", A @ x)`,
      expectedOutput: `Determinan: 1.0
Solusi x  : [3. 1.]
Bukti A@x : [7. 4.]`,
      hint: "Gunakan `det_a = np.linalg.det(A)` dan `x = np.linalg.solve(A, b)`.",
      solutionCode: `import numpy as np

A = np.array([
    [2, 1],
    [1, 1]
])
b = np.array([7, 4])

det_a = np.linalg.det(A)
x = np.linalg.solve(A, b)

print("Determinan:", det_a)
print("Solusi x  :", x)
print("Bukti A@x :", A @ x)`
    }
  ],
  quizzes: [
    {
      question:
        "Diberikan matriks `m = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])`. Berapakah nilai dari pasangan `(m.ndim, m.shape, m.size)`?",
      options: [
        "(2, (4, 2), 8)",
        "(2, (2, 4), 8)",
        "(4, (2, 4), 6)",
        "(1, (8,), 8)"
      ],
      correctIndex: 1,
      explanation:
        "Matriks `m` adalah 2 dimensi (`ndim=2`), memiliki 2 baris dan 4 kolom (`shape=(2, 4)`), serta total $2 \\times 4 = 8$ elemen (`size=8`)."
    },
    {
      question:
        "Manakah pernyataan yang BENAR mengenai perbedaan `np.arange(0, 10, 2)` dan `np.linspace(0, 10, 5)`?",
      options: [
        "np.arange menyertakan angka 10, sedangkan np.linspace tidak menyertakan angka 10",
        "np.arange berhenti sebelum angka 10 ([0 2 4 6 8]), sedangkan np.linspace membagi rentang menjadi 5 titik termasuk angka 10 ([0. 2.5 5. 7.5 10.])",
        "Keduanya menghasilkan array yang sama persis",
        "np.linspace hanya menghasilkan bilangan bulat"
      ],
      correctIndex: 1,
      explanation:
        "Batas `stop` pada `np.arange()` bersifat eksklusif, sedangkan pada `np.linspace()` bersifat inklusif dengan jumlah titik sebanyak `num`."
    },
    {
      question:
        "Pada matriks 2D `mat`, sintaks manakah yang digunakan untuk mengambil seluruh elemen pada **baris terakhir**?",
      options: [
        "mat[:, -1]",
        "mat[-1, :]",
        "mat[0, -1]",
        "mat[-1, -1]"
      ],
      correctIndex: 1,
      explanation:
        "Indeks baris berada sebelum koma (`-1` = baris terakhir) dan `:` setelah koma mengambil seluruh kolom di baris tersebut (`mat[-1, :]`)."
    },
    {
      question:
        "Jika `arr = np.array([10, 20, 30])` dan kita membuat `potong = arr[0:2].copy()`, apa manfaat utama pemanggilan `.copy()`?",
      options: [
        "Mengurutkan elemen array secara otomatis",
        "Membuat salinan array di memori baru sehingga perubahan pada potong tidak ikut mengubah arr asli",
        "Mengubah tipe data menjadi float",
        "Menghapus elemen terakhir dari arr"
      ],
      correctIndex: 1,
      explanation:
        "Tanpa `.copy()`, slicing hanya membuat *view* ke memori asli. Dengan `.copy()`, data diduplikasi secara independen."
    },
    {
      question:
        "Jika matriks `A` berukuran `(5, 3)` dijumlahkan dengan array 1D `b` berukuran `(3,)`, apa yang terjadi?",
      options: [
        "Terjadi ValueError karena dimensinya berbeda",
        "NumPy melakukan Broadcasting dengan menambahkan vektor b ke setiap baris matriks A dan menghasilkan matriks (5, 3)",
        "Menghasilkan array 1D berukuran (3,)",
        "Hanya baris pertama matriks A yang dijumlahkan"
      ],
      correctIndex: 1,
      explanation:
        "Ukuran kolom terakhir `(5, 3)` cocok dengan `(3,)`, sehingga *Broadcasting* merentangkan vektor `b` ke seluruh 5 baris matriks `A`."
    },
    {
      question:
        "Manakah sintaks yang BENAR untuk menyaring elemen array `x` yang bernilai lebih dari `10` DAN kurang dari `50`?",
      options: [
        "x[x > 10 and x < 50]",
        "x[(x > 10) & (x < 50)]",
        "x[x > 10 & x < 50]",
        "x[(x > 10) && (x < 50)]"
      ],
      correctIndex: 1,
      explanation:
        "Penggabungan kondisi pada array NumPy wajib menggunakan operator bitwise `&` (AND) atau `|` (OR) dan setiap kondisi wajib diapit tanda kurung."
    },
    {
      question:
        "Apa hasil dari `np.where(np.array([40, 80, 60]) >= 70, 'Lulus', 'Gagal')`?",
      options: [
        "['Lulus']",
        "['Gagal' 'Lulus' 'Gagal']",
        "[False  True False]",
        "['Lulus' 'Gagal' 'Lulus']"
      ],
      correctIndex: 1,
      explanation:
        "Hanya angka `80` (indeks 1) yang $\\ge 70$ (`'Lulus'`), sedangkan `40` dan `60` menghasilkan `'Gagal'`."
    },
    {
      question:
        "Jika sebuah array 1D memiliki `18` elemen dan kita memanggil `arr.reshape(3, -1)`, berapakah ukuran (`.shape`) matriks yang dihasilkan?",
      options: ["(3, -1)", "(3, 6)", "(6, 3)", "(3, 15)"],
      correctIndex: 1,
      explanation:
        "Angka `-1` dihitung otomatis oleh NumPy: $18 \\div 3 = 6$ kolom, sehingga menghasilkan ukuran `(3, 6)`."
    },
    {
      question:
        "Pada matriks 2D `data` (baris = cabang, kolom = bulan), bagaimana cara menghitung total penjualan untuk **masing-masing kolom bulan**?",
      options: [
        "np.sum(data, axis=0)",
        "np.sum(data, axis=1)",
        "np.sum(data)",
        "np.argmax(data, axis=1)"
      ],
      correctIndex: 0,
      explanation:
        "`axis=0` menjumlahkan secara vertikal dari atas ke bawah sehingga menghasilkan total untuk setiap kolom."
    },
    {
      question:
        "Manakah pasangan sintaks yang tepat untuk melakukan **perkalian matriks aljabar linear** dan **menyelesaikan sistem persamaan linear $Ax = b$**?",
      options: [
        "A * B dan A / b",
        "A @ B dan np.linalg.solve(A, b)",
        "np.multiply(A, B) dan np.linalg.det(A, b)",
        "A + B dan np.linalg.inv(b)"
      ],
      correctIndex: 1,
      explanation:
        "Operator `@` (atau `np.dot`) melakukan perkalian matriks baris × kolom, sedangkan `np.linalg.solve(A, b)` mencari solusi persamaan linear $Ax = b$."
    }
  ]
};
