import { DocSection } from "../types";

export const bab2ReadCsvInspeksi: DocSection = {
  id: "pandas-bab2-read-csv-inspeksi",
  number: 2,
  title: "Membaca Data (read_csv) & Inspeksi Tabel (head, tail, shape, dtypes)",
  subtitle:
    "Memuat dataset CSV ke dalam DataFrame dengan pd.read_csv() serta menginspeksi baris teratas/terbawah, ukuran tabel, kolom, dan ringkasan statistik.",
  level: "Menengah",
  readTime: "13 menit",
  summary:
    "Di dunia kerja, analis data tidak mengetik data secara manual di dalam kode, melainkan membaca dataset eksternal seperti file **CSV** (*Comma-Separated Values*) menggunakan fungsi **`pd.read_csv()`**. Begitu data dimuat ke dalam `DataFrame`, langkah pertama yang wajib dilakukan adalah **Inspeksi Data (*Data Exploration*)**: melihat beberapa baris teratas dengan `.head()`, baris terbawah dengan `.tail()`, memeriksa jumlah baris dan kolom dengan `.shape`, mengecek daftar nama kolom dengan `.columns`, memeriksa tipe data tiap kolom dengan `.dtypes`, serta melihat ringkasan statistik dengan `.describe()`.",
  keyPoints: [
    "Fungsi `pd.read_csv('nama_file.csv')` membaca file CSV dan langsung mengubahnya menjadi objek `DataFrame`. (Di platform PyDocs.id ini telah disediakan file CSV siap pakai: `'penjualan.csv'`, `'siswa.csv'`, `'karyawan.csv'`, dan `'toko.csv'`).",
    "Method `.head(n)` menampilkan `n` baris pertama tabel (default `5` baris jika `n` dikosongkan), sedangkan `.tail(n)` menampilkan `n` baris terakhir.",
    "Atribut `.shape` mengembalikan tuple `(jumlah_baris, jumlah_kolom)`, dan atribut `.columns` menampilkan daftar nama kolom tabel.",
    "Atribut `.dtypes` menampilkan tipe data dari masing-masing kolom (`int64` untuk bilangan bulat, `float64` untuk desimal, dan `object` untuk teks/string).",
    "Method `.describe()` menghasilkan tabel ringkasan statistik (`count`, `mean`, `min`, `median`, `max`) untuk seluruh kolom numerik secara otomatis."
  ],
  conceptTable: {
    title: "Referensi Membaca CSV & Atribut/Method Inspeksi DataFrame",
    headers: ["Fungsi / Atribut", "Contoh Penggunaan", "Penjelasan Hasil"],
    rows: [
      [
        "pd.read_csv(path)",
        "df = pd.read_csv('penjualan.csv')",
        "Membaca file CSV menjadi objek DataFrame"
      ],
      [
        "df.head(n)",
        "df.head(3)",
        "Mengambil n baris paling atas (default n=5)"
      ],
      [
        "df.tail(n)",
        "df.tail(2)",
        "Mengambil n baris paling bawah (default n=5)"
      ],
      [
        "df.shape",
        "print(df.shape)",
        "Mengembalikan tuple (jumlah_baris, jumlah_kolom)"
      ],
      [
        "df.columns",
        "print(df.columns.tolist())",
        "Mengambil daftar nama kolom pada DataFrame"
      ],
      [
        "df.dtypes",
        "print(df.dtypes)",
        "Menampilkan tipe data setiap kolom (int64, float64, object)"
      ],
      [
        "df.describe()",
        "print(df.describe())",
        "Menampilkan ringkasan statistik kolom-kolom numerik"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab2-ex1",
      title: "1. Membaca File CSV dengan pd.read_csv() & Melihat head() / tail()",
      description:
        "Memuat dataset penjualan.csv lalu mengintip 3 baris pertama dan 2 baris terakhir.",
      code: `import pandas as pd

# Membaca dataset penjualan.csv yang tersedia di lingkungan latihan
df = pd.read_csv("penjualan.csv")

print("=== 3 Baris Pertama (head) ===")
print(df.head(3))

print("\\n=== 2 Baris Terakhir (tail) ===")
print(df.tail(2))`,
      output: `=== 3 Baris Pertama (head) ===
     produk    kategori    harga  terjual
0    Laptop  Elektronik  8500000       12
1     Mouse   Aksesoris   150000       45
2  Keyboard   Aksesoris   350000       30

=== 2 Baris Terakhir (tail) ===
    produk    kategori    harga  terjual
3  Monitor  Elektronik  2200000       18
4  Headset   Aksesoris   250000       25`,
      lineExplanations: [
        {
          line: 'df = pd.read_csv("penjualan.csv")',
          explanation: "Membaca isi file `penjualan.csv` dan menyimpannya sebagai `DataFrame` ke variabel `df`."
        },
        {
          line: "df.head(3) / df.tail(2)",
          explanation: "`.head(3)` mengambil 3 baris teratas (indeks 0, 1, 2), sedangkan `.tail(2)` mengambil 2 baris terbawah (indeks 3, 4)."
        }
      ]
    },
    {
      id: "pd-bab2-ex2",
      title: "2. Memeriksa Struktur Tabel: .shape, .columns, dan .dtypes",
      description:
        "Mengetahui dimensi baris/kolom, daftar nama kolom, serta tipe data tiap kolom.",
      code: `import pandas as pd

df = pd.read_csv("karyawan.csv")

print("Ukuran Tabel (.shape) :", df.shape)
print("Daftar Kolom (.columns):", df.columns.tolist())
print("\\nTipe Data Kolom (.dtypes):")
print(df.dtypes)`,
      output: `Ukuran Tabel (.shape) : (5, 4)
Daftar Kolom (.columns): ['id', 'nama', 'divisi', 'gaji']

Tipe Data Kolom (.dtypes):
id         int64
nama      object
divisi    object
gaji       int64
dtype: object`,
      lineExplanations: [
        {
          line: "df.shape",
          explanation: "Menghasilkan `(5, 4)` yang berarti dataset memiliki 5 baris data dan 4 kolom."
        },
        {
          line: "df.columns.tolist()",
          explanation: "Mengambil daftar nama kolom sebagai list Python `['id', 'nama', 'divisi', 'gaji']`."
        },
        {
          line: "df.dtypes",
          explanation: "Menunjukkan bahwa `id` dan `gaji` bertipe angka bulat `int64`, sedangkan `nama` dan `divisi` bertipe teks `object`."
        }
      ]
    },
    {
      id: "pd-bab2-ex3",
      title: "3. Statistik Ringkas Tabel dengan .describe()",
      description:
        "Menghitung count, mean, min, median, dan max untuk seluruh kolom angka di siswa.csv.",
      code: `import pandas as pd

df_siswa = pd.read_csv("siswa.csv")
print("Tabel Siswa:")
print(df_siswa)

print("\\nRingkasan Statistik (.describe):")
print(df_siswa.describe())`,
      output: `Tabel Siswa:
   nama  kelas  matematika  bahasa  ipa
0  Budi    10A          85      88   90
1  Siti    10B          92      95   89
2  Andi    10A          76      80   78
3  Dewi    10B          88      90   94
4  Riko    10A          65      72   70

Ringkasan Statistik (.describe):
        matematika  bahasa   ipa
 count         5.0     5.0   5.0
  mean        81.2    85.0  84.2
   min        65.0    72.0  70.0
median        85.0    88.0  89.0
   max        92.0    95.0  94.0`,
      lineExplanations: [
        {
          line: "df_siswa.describe()",
          explanation: "Secara otomatis mengabaikan kolom teks (`nama`, `kelas`) dan menghitung metrik statistik untuk ketiga kolom nilai angka."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import pandas as pd
df = pd.read_csv("penjualan.csv")
# Menambahkan tanda kurung () pada atribut shape atau dtypes
print(df.shape())`,
      correct: `import pandas as pd
df = pd.read_csv("penjualan.csv")
# shape, columns, dan dtypes adalah atribut (tanpa tanda kurung)
print(df.shape)`,
      reason:
        "`.head()`, `.tail()`, dan `.describe()` adalah **method** (memakai `()`), sedangkan `.shape`, `.columns`, dan `.dtypes` adalah **atribut** (tanpa `()`). Memanggil `df.shape()` akan memicu `TypeError: 'tuple' object is not callable`."
    }
  ],
  tips: [
    "Biasakan selalu memanggil `df.head()` dan `df.dtypes` setiap kali habis membaca file CSV baru untuk memastikan tidak ada kolom angka yang salah terbaca sebagai teks (`object`).",
    "Jika kamu juga memiliki teks CSV di dalam string variabel, kamu bisa membacanya menggunakan `io.StringIO(teks_csv)` di dalam `pd.read_csv()`."
  ],
  caseStudies: [
    {
      id: "pd-bab2-case1",
      title: "Studi Kasus 1: Audit Cepat Dataset Cabang Toko Retail (toko.csv)",
      difficulty: "Mudah",
      instructions:
        "Manajer operasional memberikan file `'toko.csv'`. Muat file tersebut menggunakan `pd.read_csv('toko.csv')`, lalu tampilkan ukuran tabelnya (`.shape`), daftar nama kolomnya (`.columns.tolist()`), serta **2 baris pertama** datanya (`.head(2)`)!",
      tasks: [
        "Baca `df = pd.read_csv('toko.csv')`.",
        "Cetak `Shape: (4, 4)` dan `Kolom: ['cabang', 'kota', 'omzet', 'pelanggan']`.",
        "Cetak `df.head(2)`."
      ],
      starterCode: `import pandas as pd

# Baca file "toko.csv":
df = 

print("Shape:", df.shape)
print("Kolom:", df.columns.tolist())
print(df.head(2))`,
      expectedOutput: `Shape: (4, 4)
Kolom: ['cabang', 'kota', 'omzet', 'pelanggan']
     cabang     kota     omzet  pelanggan
0  Cabang A  Jakarta  50000000        420
1  Cabang B  Bandung  35000000        310`,
      hint: 'Tulis `df = pd.read_csv("toko.csv")`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("toko.csv")

print("Shape:", df.shape)
print("Kolom:", df.columns.tolist())
print(df.head(2))`
    },
    {
      id: "pd-bab2-case2",
      title: "Studi Kasus 2: Pemeriksaan Tipe Data & Baris Terbawah Data Karyawan",
      difficulty: "Sedang",
      instructions:
        "Bagian HRD ingin memeriksa struktur dataset `'karyawan.csv'`. Muat file `'karyawan.csv'` menggunakan `pd.read_csv()`, tampilkan **2 baris paling bawah** dengan `.tail(2)`, lalu tampilkan tipe data seluruh kolomnya dengan `.dtypes`!",
      tasks: [
        "Baca `df = pd.read_csv('karyawan.csv')`.",
        "Cetak `2 Baris Terbawah:` diikuti `df.tail(2)`.",
        "Cetak `Tipe Data:` diikuti `df.dtypes`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

print("2 Baris Terbawah:")
print()
print("Tipe Data:")
print()`,
      expectedOutput: `2 Baris Terbawah:
    id   nama   divisi     gaji
3  104  Dinda  Finance  8500000
4  105    Eka       HR  7800000
Tipe Data:
id         int64
nama      object
divisi    object
gaji       int64
dtype: object`,
      hint: "Gunakan `df.tail(2)` dan `df.dtypes`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

print("2 Baris Terbawah:")
print(df.tail(2))
print("Tipe Data:")
print(df.dtypes)`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab2-ch1",
      title: "Latihan Praktik #1: Membaca CSV & Menampilkan 3 Baris Pertama",
      difficulty: "Mudah",
      instructions:
        "Gunakan `pd.read_csv('siswa.csv')` untuk membaca dataset siswa, lalu tampilkan **3 baris pertama** menggunakan `.head(3)`!",
      tasks: [
        "Baca `df = pd.read_csv('siswa.csv')`.",
        "Cetak `df.head(3)`."
      ],
      starterCode: `import pandas as pd

# Baca file "siswa.csv" lalu cetak 3 baris pertamanya:
df = 

print(df.head(3))`,
      expectedOutput: `   nama  kelas  matematika  bahasa  ipa
0  Budi    10A          85      88   90
1  Siti    10B          92      95   89
2  Andi    10A          76      80   78`,
      hint: 'Tulis `df = pd.read_csv("siswa.csv")`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
print(df.head(3))`
    },
    {
      id: "pd-bab2-ch2",
      title: "Latihan Praktik #2: Menampilkan 2 Baris Terakhir dengan .tail()",
      difficulty: "Mudah",
      instructions:
        "Baca dataset `'penjualan.csv'`, lalu cetak **2 baris paling akhir** menggunakan method `.tail(2)`!",
      tasks: [
        "Baca `df = pd.read_csv('penjualan.csv')`.",
        "Cetak `df.tail(2)`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Cetak 2 baris terakhir dari df:
`,
      expectedOutput: `    produk    kategori    harga  terjual
3  Monitor  Elektronik  2200000       18
4  Headset   Aksesoris   250000       25`,
      hint: "Gunakan `print(df.tail(2))`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
print(df.tail(2))`
    },
    {
      id: "pd-bab2-ch3",
      title: "Latihan Praktik #3: Memeriksa Shape dan Daftar Kolom",
      difficulty: "Mudah",
      instructions:
        "Dari dataset `'penjualan.csv'`, cetak ukuran tabel (`.shape`) dan daftar nama kolomnya (`.columns.tolist()`)!",
      tasks: [
        "Cetak `Ukuran: (5, 4)` dengan `df.shape`.",
        "Cetak `Kolom : ['produk', 'kategori', 'harga', 'terjual']` dengan `df.columns.tolist()`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

print("Ukuran:", )
print("Kolom :", )`,
      expectedOutput: `Ukuran: (5, 4)
Kolom : ['produk', 'kategori', 'harga', 'terjual']`,
      hint: "Isi dengan `df.shape` dan `df.columns.tolist()`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

print("Ukuran:", df.shape)
print("Kolom :", df.columns.tolist())`
    },
    {
      id: "pd-bab2-ch4",
      title: "Latihan Praktik #4: Memeriksa Tipe Data Kolom (.dtypes)",
      difficulty: "Sedang",
      instructions:
        "Baca dataset `'toko.csv'`, lalu cetak tipe data dari setiap kolomnya menggunakan atribut `.dtypes`!",
      tasks: [
        "Baca `df = pd.read_csv('toko.csv')`.",
        "Cetak `df.dtypes`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("toko.csv")

# Cetak tipe data setiap kolom pada df:
`,
      expectedOutput: `cabang       object
kota         object
omzet         int64
pelanggan     int64
dtype: object`,
      hint: "Gunakan `print(df.dtypes)`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("toko.csv")
print(df.dtypes)`
    },
    {
      id: "pd-bab2-ch5",
      title: "Latihan Praktik #5: Menampilkan Ringkasan Statistik (.describe)",
      difficulty: "Sedang",
      instructions:
        "Baca dataset `'penjualan.csv'`, lalu cetak tabel ringkasan statistik untuk kolom-kolom numeriknya menggunakan method `.describe()`!",
      tasks: [
        "Panggil `df.describe()`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Cetak ringkasan statistik dengan .describe():
`,
      expectedOutput: `            harga  terjual
 count        5.0      5.0
  mean  2290000.0     26.0
   min   150000.0     12.0
median   350000.0     25.0
   max  8500000.0     45.0`,
      hint: "Tulis `print(df.describe())`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
print(df.describe())`
    }
  ],
  quizzes: [
    {
      question:
        "Fungsi Pandas manakah yang digunakan untuk membaca file berformat CSV ke dalam sebuah `DataFrame`?",
      options: [
        "pd.open_csv('data.csv')",
        "pd.read_csv('data.csv')",
        "pd.load_csv('data.csv')",
        "pd.import_csv('data.csv')"
      ],
      correctIndex: 1,
      explanation:
        "`pd.read_csv()` adalah fungsi bawaan Pandas untuk memuat file CSV ke dalam `DataFrame`."
    },
    {
      question:
        "Berapa jumlah baris yang ditampilkan secara default jika kita memanggil `df.head()` tanpa argumen angka di dalam kurungnya?",
      options: ["1 baris", "3 baris", "5 baris", "10 baris"],
      correctIndex: 2,
      explanation:
        "Secara default, `df.head()` menampilkan `5` baris pertama, dan `df.tail()` menampilkan `5` baris terakhir."
    },
    {
      question:
        "Method apakah yang digunakan untuk melihat **3 baris paling bawah** dari sebuah `DataFrame`?",
      options: [
        "df.bottom(3)",
        "df.last(3)",
        "df.tail(3)",
        "df.end(3)"
      ],
      correctIndex: 2,
      explanation:
        "`df.tail(n)` mengambil `n` baris paling akhir dari `DataFrame`."
    },
    {
      question:
        "Jika `df.shape` mengembalikan nilai `(120, 8)`, apa arti dari kedua angka tersebut?",
      options: [
        "120 kolom dan 8 baris",
        "120 baris dan 8 kolom",
        "Total 120 sel data",
        "8 tabel dengan 120 indeks"
      ],
      correctIndex: 1,
      explanation:
        "Pada `.shape`, angka pertama selalu menunjukkan **jumlah baris** (`120`), dan angka kedua menunjukkan **jumlah kolom** (`8`)."
    },
    {
      question:
        "Di dalam Pandas, tipe data kolom yang berisi teks atau string (`str`) umumnya ditampilkan oleh `df.dtypes` sebagai...",
      options: ["text64", "char", "object", "varchar"],
      correctIndex: 2,
      explanation:
        "Pandas memberi label tipe data `object` untuk kolom yang menyimpan teks/string."
    },
    {
      question:
        "Manakah di antara berikut ini yang merupakan **atribut** (dipanggil TANPA tanda kurung `()`)?",
      options: [
        "df.head",
        "df.describe",
        "df.dtypes",
        "df.tail"
      ],
      correctIndex: 2,
      explanation:
        "`df.dtypes`, `df.shape`, dan `df.columns` adalah atribut properti, sedangkan `head()`, `tail()`, dan `describe()` adalah method."
    },
    {
      question:
        "Apa fungsi dari pemanggilan method `df.describe()`?",
      options: [
        "Menghapus semua baris yang kosong",
        "Menghasilkan tabel ringkasan statistik (count, mean, min, median, max) untuk kolom-kolom numerik",
        "Mengurutkan nama kolom sesuai abjad",
        "Mengubah nama kolom menjadi huruf kecil"
      ],
      correctIndex: 1,
      explanation:
        "`df.describe()` merangkum statistik deskriptif utama dari seluruh kolom bertipe angka pada `DataFrame`."
    },
    {
      question:
        "Bagaimana cara melihat daftar nama seluruh kolom yang ada di dalam `DataFrame` `df`?",
      options: [
        "df.headers",
        "df.columns",
        "df.titles",
        "df.names"
      ],
      correctIndex: 1,
      explanation:
        "Atribut `df.columns` menyimpan objek `Index` berisi nama-nama seluruh kolom pada `DataFrame`."
    },
    {
      question:
        "Jika sebuah tabel `df` memiliki kolom `'nama'` (teks) dan `'gaji'` (angka), kolom manakah yang akan dihitung rata-ratanya saat memanggil `df.describe()` secara default?",
      options: [
        "Hanya kolom 'nama'",
        "Hanya kolom 'gaji' (kolom numerik)",
        "Tidak ada kolom yang dihitung",
        "Terjadi error karena ada kolom teks"
      ],
      correctIndex: 1,
      explanation:
        "Secara default, `df.describe()` hanya menganalisis kolom yang bertipe numerik (`int64` / `float64`) dan melewati kolom teks."
    },
    {
      question:
        "Atribut apakah yang mengembalikan jumlah total seluruh sel (`jumlah_baris × jumlah_kolom`) di dalam sebuah `DataFrame`?",
      options: ["df.count", "df.size", "df.ndim", "df.total"],
      correctIndex: 1,
      explanation:
        "Sama seperti di NumPy, atribut `df.size` mengembalikan hasil kali jumlah baris dengan jumlah kolom."
    }
  ]
};

