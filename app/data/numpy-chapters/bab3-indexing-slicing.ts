import { DocSection } from "../types";

export const bab3IndexingSlicing: DocSection = {
  id: "numpy-bab3-indexing-slicing",
  number: 3,
  title: "Indexing & Slicing Array 1D dan 2D",
  subtitle:
    "Mengakses elemen tunggal, memotong sub-matriks dengan sintaks [baris, kolom], memodifikasi irisan array, dan menyalin array dengan .copy().",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "Sama seperti `list` di Python, penomoran indeks pada `ndarray` dimulai dari `0` (dan `-1` untuk elemen paling akhir). Keunggulan besar NumPy terlihat saat mengakses matriks 2 dimensi: kita tidak perlu menulis kurung siku ganda `mat[baris][kolom]`, melainkan cukup memisahkan indeks baris dan kolom dengan **satu tanda koma** `mat[baris, kolom]`. Teknik *slicing* `mat[awal_baris:akhir_baris, awal_kolom:akhir_kolom]` memungkinkan kita mengekstrak satu baris penuh, satu kolom penuh, ataupun sub-matriks berukuran bebas.",
  keyPoints: [
    "Indeks pertama adalah `0` dan indeks terakhir adalah `-1`. Slicing `arr[start:stop:step]` mengambil elemen mulai indeks `start` hingga sebelum `stop` (`stop` tidak ikut masuk).",
    "Pada matriks 2D, gunakan sintaks `mat[baris, kolom]`: angka sebelum koma menunjuk **baris** (sumbu 0), sedangkan angka setelah koma menunjuk **kolom** (sumbu 1).",
    "Gunakan tanda titik dua `:` untuk mengambil seluruh elemen pada sumbu tersebut: `mat[0, :]` mengambil seluruh baris ke-0, sedangkan `mat[:, 1]` mengambil seluruh kolom ke-1.",
    "Kita dapat mengubah nilai satu elemen atau sekaligus satu blok irisan (*slice assignment*), contoh: `arr[1:4] = 99`.",
    "Penting: Irisan (*slice*) di NumPy bersifat *view* (referensi ke array asli). Gunakan method `.copy()` (misal `sub = arr[0:2].copy()`) jika kamu ingin memodifikasi salinan tanpa mengubah array aslinya."
  ],
  conceptTable: {
    title: "Referensi Sintaks Indexing & Slicing Array 1D dan 2D",
    headers: ["Sintaks", "Arti / Elemen yang Diambil", "Contoh Hasil"],
    rows: [
      [
        "arr[0] / arr[-1]",
        "Elemen pertama / elemen terakhir pada array 1D",
        "Skalar tunggal"
      ],
      [
        "arr[1:4]",
        "Irisan elemen indeks 1, 2, dan 3 (indeks 4 tidak ikut)",
        "Sub-array 1D"
      ],
      [
        "mat[1, 2]",
        "Elemen pada baris indeks 1 dan kolom indeks 2",
        "Skalar tunggal"
      ],
      [
        "mat[0, :]",
        "Seluruh elemen pada baris indeks 0 (baris pertama)",
        "Array 1D baris ke-0"
      ],
      [
        "mat[:, 1]",
        "Seluruh elemen pada kolom indeks 1 (kolom kedua)",
        "Array 1D kolom ke-1"
      ],
      [
        "mat[0:2, 1:3]",
        "Sub-matriks dari baris 0..1 dan kolom 1..2",
        "Matriks 2D (2×2)"
      ],
      [
        "arr.copy()",
        "Membuat salinan independen agar array asli aman saat diubah",
        "Objek ndarray baru"
      ]
    ]
  },
  examples: [
    {
      id: "np-bab3-ex1",
      title: "1. Indexing dan Slicing pada Array 1 Dimensi",
      description:
        "Mengambil elemen pertama, terakhir, rentang indeks, dan loncatan langkah (step) pada vektor 1D.",
      code: `import numpy as np

nilai = np.array([70, 75, 80, 85, 90, 95])

print("Elemen pertama (indeks 0) :", nilai[0])
print("Elemen terakhir (indeks -1):", nilai[-1])
print("Indeks 1 sampai 3 (1:4)   :", nilai[1:4])
print(" Tiga elemen pertama (:3) :", nilai[:3])
print("Loncat 2 langkah (::2)    :", nilai[::2])`,
      output: `Elemen pertama (indeks 0) : 70
Elemen terakhir (indeks -1): 95
Indeks 1 sampai 3 (1:4)   : [75 80 85]
 Tiga elemen pertama (:3) : [70 75 80]
Loncat 2 langkah (::2)    : [70 80 90]`,
      lineExplanations: [
        {
          line: "nilai[1:4]",
          explanation: "Mengambil elemen pada indeks `1`, `2`, dan `3` (`[75 80 85]`). Indeks batas `4` tidak disertakan."
        },
        {
          line: "nilai[::2]",
          explanation: "Mengambil elemen dari awal hingga akhir dengan loncatan `step=2` (indeks 0, 2, 4)."
        }
      ]
    },
    {
      id: "np-bab3-ex2",
      title: "2. Indexing & Slicing Matriks 2D dengan [baris, kolom]",
      description:
        "Mengakses sel spesifik, mengekstrak satu kolom penuh, dan memotong sub-matriks 2x2.",
      code: `import numpy as np

# Matriks 3 baris x 3 kolom
tabel = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

# 1. Mengambil sel di baris indeks 1, kolom indeks 2
print("Sel [1, 2]       :", tabel[1, 2])

# 2. Mengambil seluruh baris pertama (indeks 0)
print("Baris ke-0 [0, :]:", tabel[0, :])

# 3. Mengambil seluruh kolom kedua (indeks 1)
print("Kolom ke-1 [:, 1]:", tabel[:, 1])

# 4. Mengambil sub-matriks 2 baris pertama & 2 kolom terakhir
print("Sub-matriks [0:2, 1:3]:")
print(tabel[0:2, 1:3])`,
      output: `Sel [1, 2]       : 60
Baris ke-0 [0, :]: [10 20 30]
Kolom ke-1 [:, 1]: [20 50 80]
Sub-matriks [0:2, 1:3]:
[[20 30]
 [50 60]]`,
      lineExplanations: [
        {
          line: "tabel[1, 2]",
          explanation: "Baris indeks `1` adalah `[40, 50, 60]`, dan kolom indeks `2` di baris tersebut adalah `60`."
        },
        {
          line: "tabel[:, 1]",
          explanation: "Tanda `:` sebelum koma berarti ambil **semua baris**, dan `1` setelah koma berarti ambil **kolom indeks 1** (`[20 50 80]`)."
        },
        {
          line: "tabel[0:2, 1:3]",
          explanation: "Mengambil baris indeks 0 dan 1, serta kolom indeks 1 dan 2 sehingga menghasilkan matriks 2×2."
        }
      ]
    },
    {
      id: "np-bab3-ex3",
      title: "3. Mengubah Nilai Irisan & Pentingnya .copy()",
      description:
        "Membuat salinan independen menggunakan .copy() sebelum mengubah nilai elemen.",
      code: `import numpy as np

stok_asli = np.array([100, 120, 150, 180])

# Membuat salinan independen dengan .copy()
stok_promo = stok_asli.copy()

# Mengubah indeks 1 dan 2 sekaligus menjadi 50
stok_promo[1:3] = 50

print("Stok Asli (Aman):", stok_asli)
print("Stok Promo      :", stok_promo)`,
      output: `Stok Asli (Aman): [100 120 150 180]
Stok Promo      : [100  50  50 180]`,
      lineExplanations: [
        {
          line: "stok_promo = stok_asli.copy()",
          explanation: "Method `.copy()` menduplikasi data ke blok memori baru sehingga perubahan pada `stok_promo` tidak merusak `stok_asli`."
        },
        {
          line: "stok_promo[1:3] = 50",
          explanation: "Mengubah elemen indeks `1` dan `2` sekaligus menjadi angka `50`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import numpy as np
mat = np.array([[1, 2], [3, 4]])
# Mencoba mengambil kolom ke-1 dengan kurung siku ganda
kolom = mat[:][1]`,
      correct: `import numpy as np
mat = np.array([[1, 2], [3, 4]])
# Gunakan koma di dalam satu kurung siku [baris, kolom]
kolom = mat[:, 1]`,
      reason:
        "`mat[:]` hanya mengembalikan seluruh matriks lagi, sehingga `mat[:][1]` justru mengambil **baris ke-1**, bukan kolom ke-1! Selalu gunakan tanda koma `mat[:, 1]` untuk mengambil kolom pada matriks 2D."
    }
  ],
  tips: [
    "Ingat rumus mudah matriks 2D: **`[Baris, Kolom]`** (Baris dulu baru Kolom).",
    "Biasakan memanggil `.copy()` ketika kamu memotong sebagian data untuk eksperimen modifikasi agar dataset utamamu tetap utuh."
  ],
  caseStudies: [
    {
      id: "np-bab3-case1",
      title: "Studi Kasus 1: Ekstraksi Kolom Nilai Ujian Matematika Siswa",
      difficulty: "Mudah",
      instructions:
        "Sebuah tabel rekap nilai 3 siswa (`rekap_nilai`) menyimpan 3 mata pelajaran di setiap kolomnya: Kolom 0 = Bahasa, Kolom 1 = Matematika, dan Kolom 2 = IPA. Ekstrak seluruh nilai pada **Kolom 1 (Matematika)** menggunakan slicing `[:, 1]`, serta ambil nilai **IPA milik siswa terakhir** (baris `-1`, kolom `2`)!",
      tasks: [
        "Ambil kolom Matematika dengan `nilai_mtk = rekap_nilai[:, 1]`.",
        "Ambil nilai IPA siswa terakhir dengan `ipa_terakhir = rekap_nilai[-1, 2]`.",
        "Cetak kedua hasil sesuai Target Output."
      ],
      starterCode: `import numpy as np

# Baris = Siswa, Kolom = [Bahasa, Matematika, IPA]
rekap_nilai = np.array([
    [82, 90, 85],
    [78, 88, 92],
    [85, 95, 89]
])

# 1. Ambil seluruh kolom indeks 1 (Matematika):
nilai_mtk = 

# 2. Ambil sel baris terakhir (-1), kolom indeks 2 (IPA):
ipa_terakhir = 

print("Nilai Matematika:", nilai_mtk)
print("IPA Siswa Terakhir:", ipa_terakhir)`,
      expectedOutput: `Nilai Matematika: [90 88 95]
IPA Siswa Terakhir: 89`,
      hint: "Gunakan `rekap_nilai[:, 1]` untuk kolom ke-1 dan `rekap_nilai[-1, 2]` untuk baris terakhir kolom ke-2.",
      solutionCode: `import numpy as np

rekap_nilai = np.array([
    [82, 90, 85],
    [78, 88, 92],
    [85, 95, 89]
])

nilai_mtk = rekap_nilai[:, 1]
ipa_terakhir = rekap_nilai[-1, 2]

print("Nilai Matematika:", nilai_mtk)
print("IPA Siswa Terakhir:", ipa_terakhir)`
    },
    {
      id: "np-bab3-case2",
      title: "Studi Kasus 2: Pemotongan Area Tengah Citra Grayscale (Cropping)",
      difficulty: "Sedang",
      instructions:
        "Sebuah citra hitam-putih (*grayscale*) berukuran 4×4 piksel direpresentasikan sebagai matriks 2D `citra`. Lakukan *cropping* (pemotongan) untuk mengambil area tengah berukuran 2×2 yang berada pada **baris indeks 1 sampai 2** (`1:3`) dan **kolom indeks 1 sampai 2** (`1:3`)!",
      tasks: [
        "Gunakan slicing 2D `citra[1:3, 1:3]` dan simpan ke variabel `area_tengah`.",
        "Cetak `Area Tengah 2x2:` diikuti matriks `area_tengah`."
      ],
      starterCode: `import numpy as np

citra = np.array([
    [ 10,  20,  30,  40],
    [ 50, 200, 210,  60],
    [ 70, 220, 230,  80],
    [ 90, 100, 110, 120]
])

# Ambil sub-matriks baris 1:3 dan kolom 1:3:
area_tengah = 

print("Area Tengah 2x2:")
print(area_tengah)`,
      expectedOutput: `Area Tengah 2x2:
[[200 210]
 [220 230]]`,
      hint: "Tulis `area_tengah = citra[1:3, 1:3]`.",
      solutionCode: `import numpy as np

citra = np.array([
    [ 10,  20,  30,  40],
    [ 50, 200, 210,  60],
    [ 70, 220, 230,  80],
    [ 90, 100, 110, 120]
])

area_tengah = citra[1:3, 1:3]

print("Area Tengah 2x2:")
print(area_tengah)`
    }
  ],
  codingChallenges: [
    {
      id: "np-bab3-ch1",
      title: "Latihan Praktik #1: Mengambil Elemen Pertama & Terakhir Array 1D",
      difficulty: "Mudah",
      instructions:
        "Diberikan array `suhu = np.array([26, 28, 31, 29, 25])`. Cetak elemen pertama (`suhu[0]`) dan elemen terakhir (`suhu[-1]`) sesuai Target Output!",
      tasks: [
        "Cetak `Pagi: 26` menggunakan `suhu[0]`.",
        "Cetak `Malam: 25` menggunakan `suhu[-1]`."
      ],
      starterCode: `import numpy as np

suhu = np.array([26, 28, 31, 29, 25])

# Cetak elemen pertama dan terakhir:
`,
      expectedOutput: `Pagi: 26
Malam: 25`,
      hint: 'Gunakan `print("Pagi:", suhu[0])` dan `print("Malam:", suhu[-1])`.',
      solutionCode: `import numpy as np

suhu = np.array([26, 28, 31, 29, 25])

print("Pagi:", suhu[0])
print("Malam:", suhu[-1])`
    },
    {
      id: "np-bab3-ch2",
      title: "Latihan Praktik #2: Slicing Rentang Elemen Array 1D",
      difficulty: "Mudah",
      instructions:
        "Dari array `penjualan = np.array([10, 25, 40, 55, 70, 85])`, potong dan cetak elemen mulai dari **indeks 2 hingga indeks 4** (`[40 55 70]`) menggunakan slicing!",
      tasks: [
        "Ingat bahwa batas akhir slicing bersifat eksklusif, sehingga gunakan `penjualan[2:5]`.",
        "Cetak hasil irisan tersebut."
      ],
      starterCode: `import numpy as np

penjualan = np.array([10, 25, 40, 55, 70, 85])

# Ambil elemen indeks 2, 3, dan 4 dengan slicing:
kuartal_tengah = 

print(kuartal_tengah)`,
      expectedOutput: `[40 55 70]`,
      hint: "Tulis `kuartal_tengah = penjualan[2:5]`.",
      solutionCode: `import numpy as np

penjualan = np.array([10, 25, 40, 55, 70, 85])
kuartal_tengah = penjualan[2:5]

print(kuartal_tengah)`
    },
    {
      id: "np-bab3-ch3",
      title: "Latihan Praktik #3: Mengakses Sel & Baris pada Matriks 2D",
      difficulty: "Mudah",
      instructions:
        "Diberikan matriks 2D `kursi`. Cetak elemen pada **baris indeks 0, kolom indeks 2**, lalu cetak seluruh elemen pada **baris indeks 1**!",
      tasks: [
        "Gunakan `kursi[0, 2]` untuk mengambil sel baris 0 kolom 2.",
        "Gunakan `kursi[1, :]` untuk mengambil seluruh baris indeks 1."
      ],
      starterCode: `import numpy as np

kursi = np.array([
    [101, 102, 103],
    [201, 202, 203]
])

print("Sel [0, 2]:", )
print("Baris ke-1:", )`,
      expectedOutput: `Sel [0, 2]: 103
Baris ke-1: [201 202 203]`,
      hint: "Isi dengan `kursi[0, 2]` dan `kursi[1, :]`.",
      solutionCode: `import numpy as np

kursi = np.array([
    [101, 102, 103],
    [201, 202, 203]
])

print("Sel [0, 2]:", kursi[0, 2])
print("Baris ke-1:", kursi[1, :])`
    },
    {
      id: "np-bab3-ch4",
      title: "Latihan Praktik #4: Mengambil Kolom & Sub-Matriks 2D",
      difficulty: "Sedang",
      instructions:
        "Diberikan matriks 3×3 `data`. Cetak seluruh **kolom indeks 0** (`data[:, 0]`), lalu cetak sub-matriks 2×2 dari **baris 1:3 dan kolom 1:3** (`data[1:3, 1:3]`)!",
      tasks: [
        "Cetak `Kolom 0: [10 40 70]`.",
        "Cetak `Sub-matriks:` diikuti hasil `data[1:3, 1:3]`."
      ],
      starterCode: `import numpy as np

data = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

print("Kolom 0:", )
print("Sub-matriks:")
print()`,
      expectedOutput: `Kolom 0: [10 40 70]
Sub-matriks:
[[50 60]
 [80 90]]`,
      hint: "Gunakan `data[:, 0]` dan `data[1:3, 1:3]`.",
      solutionCode: `import numpy as np

data = np.array([
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
])

print("Kolom 0:", data[:, 0])
print("Sub-matriks:")
print(data[1:3, 1:3])`
    },
    {
      id: "np-bab3-ch5",
      title: "Latihan Praktik #5: Menyalin Array dengan .copy() & Mengubah Irisan",
      difficulty: "Sedang",
      instructions:
        "Buat salinan independen dari array `harga_normal` ke variabel `harga_diskon` menggunakan `.copy()`. Setelah itu, ubah dua elemen pertama pada `harga_diskon` (irisan `0:2`) menjadi `9000`, lalu cetak kedua array untuk membuktikan `harga_normal` tidak ikut berubah!",
      tasks: [
        "Salin dengan `harga_diskon = harga_normal.copy()`.",
        "Ubah `harga_diskon[0:2] = 9000`.",
        "Cetak `Normal:` dan `Diskon:`."
      ],
      starterCode: `import numpy as np

harga_normal = np.array([15000, 18000, 20000, 25000])

# 1. Salin harga_normal dengan .copy():
harga_diskon = 

# 2. Ubah indeks 0:2 pada harga_diskon menjadi 9000:


print("Normal:", harga_normal)
print("Diskon:", harga_diskon)`,
      expectedOutput: `Normal: [15000 18000 20000 25000]
Diskon: [9000 9000 20000 25000]`,
      hint: "Tulis `harga_diskon = harga_normal.copy()` lalu `harga_diskon[0:2] = 9000`.",
      solutionCode: `import numpy as np

harga_normal = np.array([15000, 18000, 20000, 25000])

harga_diskon = harga_normal.copy()
harga_diskon[0:2] = 9000

print("Normal:", harga_normal)
print("Diskon:", harga_diskon)`
    }
  ],
  quizzes: [
    {
      question:
        "Jika `arr = np.array([10, 20, 30, 40, 50])`, berapakah nilai dari `arr[1:4]`?",
      options: [
        "[10 20 30 40]",
        "[20 30 40]",
        "[20 30 40 50]",
        "[10 20 30]"
      ],
      correctIndex: 1,
      explanation:
        "Slicing `1:4` mengambil elemen pada indeks `1`, `2`, dan `3` (`[20 30 40]`), sedangkan indeks batas `4` tidak disertakan."
    },
    {
      question:
        "Pada matriks 2D `mat`, bagaimana cara mengakses elemen pada baris ke-2 (indeks 1) dan kolom ke-3 (indeks 2)?",
      options: [
        "mat[2, 3]",
        "mat[1, 2]",
        "mat[2, 1]",
        "mat(1, 2)"
      ],
      correctIndex: 1,
      explanation:
        "Indeks dimulai dari 0 dengan urutan `[baris, kolom]`, sehingga baris ke-2 adalah indeks `1` dan kolom ke-3 adalah indeks `2` (`mat[1, 2]`)."
    },
    {
      question:
        "Sintaks manakah yang digunakan untuk mengambil **seluruh elemen pada kolom indeks 2** dari sebuah matriks 2D `mat`?",
      options: [
        "mat[2, :]",
        "mat[:, 2]",
        "mat[:][2]",
        "mat[2]"
      ],
      correctIndex: 1,
      explanation:
        "`mat[:, 2]` berarti mengambil seluruh baris (`:`) pada kolom indeks `2`."
    },
    {
      question:
        "Apa yang diambil oleh ekspresi `mat[0, :]` pada matriks 2 dimensi?",
      options: [
        "Seluruh elemen pada kolom pertama",
        "Seluruh elemen pada baris pertama (indeks 0)",
        "Hanya satu elemen di pojok kiri atas",
        "Seluruh elemen matriks"
      ],
      correctIndex: 1,
      explanation:
        "Angka `0` sebelum koma memilih baris pertama, dan `:` setelah koma mengambil seluruh kolom di baris tersebut."
    },
    {
      question:
        "Diberikan `arr = np.array([5, 10, 15, 20, 25, 30])`. Apa hasil dari `arr[::2]`?",
      options: [
        "[5 10]",
        "[5 15 25]",
        "[10 20 30]",
        "[30 25 20]"
      ],
      correctIndex: 1,
      explanation:
        "`arr[::2]` mengambil elemen dari indeks 0 sampai akhir dengan loncatan `step=2`, yaitu indeks 0 (`5`), indeks 2 (`15`), dan indeks 4 (`25`)."
    },
    {
      question:
        "Mengapa memodifikasi irisan `sub = arr[0:2]` secara langsung dapat ikut mengubah nilai di dalam `arr` asli?",
      options: [
        "Karena bug pada Python",
        "Karena slicing di NumPy menghasilkan view (referensi ke memori array asli) demi efisiensi memori",
        "Karena variabel sub dan arr memiliki nama yang mirip",
        "Hal tersebut tidak mungkin terjadi di NumPy"
      ],
      correctIndex: 1,
      explanation:
        "Demi kecepatan dan penghematan RAM pada data besar, *slicing* NumPy mengembalikan *view* yang menunjuk ke memori data asli, bukan salinan baru."
    },
    {
      question:
        "Method apakah yang harus dipanggil jika kita ingin membuat salinan array yang benar-benar terpisah dari array aslinya?",
      options: [
        "arr.clone()",
        "arr.duplicate()",
        "arr.copy()",
        "arr.new()"
      ],
      correctIndex: 2,
      explanation:
        "Method `arr.copy()` mengalokasikan memori baru dan menyalin seluruh elemen sehingga aman dimodifikasi secara terpisah."
    },
    {
      question:
        "Berapakah ukuran (`.shape`) sub-matriks yang dihasilkan oleh `mat[0:2, 0:3]` jika `mat` berukuran `(4, 4)`?",
      options: ["(2, 3)", "(3, 4)", "(2, 2)", "(4, 4)"],
      correctIndex: 0,
      explanation:
        "Irisan baris `0:2` mengambil 2 baris (indeks 0 dan 1), sedangkan irisan kolom `0:3` mengambil 3 kolom (indeks 0, 1, dan 2), sehingga menghasilkan ukuran `(2, 3)`."
    },
    {
      question:
        "Jika `x = np.array([1, 2, 3, 4])` lalu kita menjalankan `x[1:3] = 9`, apakah isi `x` sekarang?",
      options: [
        "[9 9 9 4]",
        "[1 9 9 4]",
        "[1 9 3 4]",
        "[1 2 9 9]"
      ],
      correctIndex: 1,
      explanation:
        "Irisan `1:3` mencakup indeks `1` dan `2`. Mengisinya dengan `9` akan mengubah kedua elemen tersebut menjadi `9` (`[1 9 9 4]`)."
    },
    {
      question:
        "Indeks berapakah yang digunakan untuk mengakses elemen paling akhir dari sebuah array tanpa perlu menghitung panjangnya?",
      options: ["0", "-1", "last", "len"],
      correctIndex: 1,
      explanation:
        "Indeks negatif `-1` selalu menunjuk ke elemen paling akhir (dan `-2` untuk elemen kedua dari belakang)."
    }
  ]
};
