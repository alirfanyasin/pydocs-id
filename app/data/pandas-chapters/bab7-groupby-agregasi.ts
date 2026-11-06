import { DocSection } from "../types";

export const bab7GroupbyAgregasi: DocSection = {
  id: "pandas-bab7-groupby-agregasi",
  number: 7,
  title: "Agregasi & Pengelompokan Data: .value_counts() dan .groupby()",
  subtitle:
    "Menghitung frekuensi kategori dengan .value_counts(), serta mengelompokkan data menggunakan konsep Split-Apply-Combine pada df.groupby() dengan fungsi agregasi .sum(), .mean(), .count(), .min(), .max(), dan .agg().",
  level: "Menengah",
  readTime: "16 menit",
  filePath: "app/data/pandas-chapters/bab7-groupby-agregasi.ts",
  summary:
    "Ketika menganalisis ratusan atau ribuan baris transaksi, manajemen jarang menanyakan baris per baris—mereka ingin melihat **ringkasan per kelompok** (seperti total penjualan per kategori, rata-rata gaji per divisi, atau jumlah siswa per kelas). Di Pandas, menghitung frekuensi kemunculan tiap nilai unik dilakukan dengan `df['kolom'].value_counts()`, sedangkan pengelompokan dan perhitungan statistik per kategori dilakukan dengan `df.groupby('kolom_kategori')['kolom_target'].fungsi_agregasi()`. Konsep ini dikenal sebagai **Split-Apply-Combine**: memecah tabel berdasarkan grup, menerapkan fungsi hitung (`.sum()`, `.mean()`, `.max()`, `.agg()`), lalu menggabungkan hasilnya menjadi laporan ringkas.",
  keyPoints: [
    "Method `df['kolom'].value_counts()` menghitung berapa kali setiap nilai unik muncul di kolom tersebut dan mengurutkannya dari yang paling sering muncul.",
    "Method `df['kolom'].nunique()` mengembalikan jumlah kategori unik (angka integer), sedangkan `.unique()` mengembalikan daftar nama kategori uniknya.",
    "Pola dasar pengelompokan: `df.groupby('kolom_grup')['kolom_nilai'].sum()` (bisa diganti `.mean()`, `.count()`, `.min()`, `.max()`).",
    "Method `.agg(['sum', 'mean', 'max'])` pada `groupby` memungkinkan kita menghitung beberapa metrik statistik sekaligus dalam satu tabel ringkasan.",
    "Kita juga bisa memberikan dictionary pada `.agg({'terjual': 'sum', 'harga': 'max'})` untuk menerapkan fungsi agregasi yang berbeda pada tiap kolom."
  ],
  conceptTable: {
    title: "Method Frekuensi & Agregasi Pengelompokan (GroupBy)",
    headers: ["Syntax / Method", "Fungsi Utama", "Contoh Penggunaan"],
    rows: [
      [
        "df['kol'].value_counts()",
        "Menghitung frekuensi kemunculan setiap nilai unik",
        "df['kategori'].value_counts()"
      ],
      [
        "df['kol'].nunique()",
        "Menghitung banyaknya nilai unik di dalam sebuah kolom",
        "df['divisi'].nunique()"
      ],
      [
        "df.groupby('grup')['nilai'].sum()",
        "Menjumlahkan nilai per kelompok kategori",
        "df.groupby('kategori')['terjual'].sum()"
      ],
      [
        "df.groupby('grup')['nilai'].mean()",
        "Menghitung rata-rata nilai per kelompok kategori",
        "df.groupby('divisi')['gaji'].mean()"
      ],
      [
        "df.groupby('grup')['nilai'].agg([...])",
        "Menjalankan beberapa fungsi agregasi sekaligus",
        "df.groupby('kelas')['matematika'].agg(['min', 'mean', 'max'])"
      ],
      [
        "df.groupby('grup').agg({...})",
        "Menjalankan fungsi agregasi berbeda untuk tiap kolom",
        "df.groupby('kategori').agg({'terjual': 'sum', 'harga': 'max'})"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab7-ex1",
      title: "1. Menghitung Frekuensi Kategori dengan .value_counts() & .nunique()",
      description:
        "Melihat distribusi jumlah produk per kategori dan banyaknya kategori unik pada dataset penjualan.csv.",
      code: `import pandas as pd

df = pd.read_csv("penjualan.csv")

print("Jumlah kategori unik:", df["kategori"].nunique())
print("\\n=== Frekuensi Produk per Kategori ===")
print(df["kategori"].value_counts())`,
      output: `Jumlah kategori unik: 2

=== Frekuensi Produk per Kategori ===
Aksesoris     3
Elektronik    2
Name: count, dtype: int64`,
      lineExplanations: [
        {
          line: 'print("Jumlah kategori unik:", df["kategori"].nunique())',
          explanation:
            "Menghitung ada berapa nama kategori berbeda di dalam kolom `kategori` (`Elektronik` dan `Aksesoris` -> 2)."
        },
        {
          line: 'print(df["kategori"].value_counts())',
          explanation:
            "Menghitung jumlah baris untuk masing-masing kategori dan mengurutkannya dari frekuensi tertinggi."
        }
      ]
    },
    {
      id: "pd-bab7-ex2",
      title: "2. Pengelompokan Data dengan .groupby() (.sum() & .mean())",
      description:
        "Menghitung total unit terjual per kategori produk dan rata-rata gaji karyawan per divisi.",
      code: `import pandas as pd

df_jual = pd.read_csv("penjualan.csv")
print("=== Total Unit Terjual per Kategori ===")
print(df_jual.groupby("kategori")["terjual"].sum())

df_kar = pd.read_csv("karyawan.csv")
print("\\n=== Rata-Rata Gaji per Divisi ===")
print(df_kar.groupby("divisi")["gaji"].mean())`,
      output: `=== Total Unit Terjual per Kategori ===
Elektronik     30
Aksesoris     100
Name: terjual, dtype: int64

=== Rata-Rata Gaji per Divisi ===
IT         9250000.0
HR         7650000.0
Finance    8500000.0
Name: gaji, dtype: float64`,
      lineExplanations: [
        {
          line: 'print(df_jual.groupby("kategori")["terjual"].sum())',
          explanation:
            "Mengelompokkan baris berdasarkan `'kategori'`, memilih kolom `'terjual'`, lalu menjumlahkan nilainya untuk tiap grup."
        },
        {
          line: 'print(df_kar.groupby("divisi")["gaji"].mean())',
          explanation:
            "Mengelompokkan karyawan per `'divisi'` dan menghitung nilai rata-rata kolom `'gaji'`."
        }
      ]
    },
    {
      id: "pd-bab7-ex3",
      title: "3. Multi-Agregasi Sekaligus dengan .agg()",
      description:
        "Menampilkan nilai terendah (min), rata-rata (mean), dan tertinggi (max) per kelas menggunakan .agg(['min', 'mean', 'max']).",
      code: `import pandas as pd

df = pd.read_csv("siswa.csv")

ringkasan = df.groupby("kelas")["matematika"].agg(["min", "mean", "max"])
print("=== Statistik Nilai Matematika per Kelas ===")
print(ringkasan)`,
      output: `=== Statistik Nilai Matematika per Kelas ===
     min       mean  max
10A   65  75.333333   85
10B   88  90.000000   92`,
      lineExplanations: [
        {
          line: 'ringkasan = df.groupby("kelas")["matematika"].agg(["min", "mean", "max"])',
          explanation:
            "Menghasilkan DataFrame ringkasan dengan index nama `kelas` dan 3 kolom metrik: `min`, `mean`, serta `max`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `print(df.groupby("kategori")) # Lupa memanggil fungsi agregasi (.sum(), .mean(), dll)`,
      correct: `print(df.groupby("kategori")["terjual"].sum())`,
      reason:
        "Memanggil `df.groupby('kategori')` saja hanya membuat objek `_DataFrameGroupBy` di memori (tahap *Split*). Kamu harus menambahkan fungsi agregasi seperti `.sum()`, `.mean()`, atau `.count()` agar angkanya dihitung."
    },
    {
      wrong: `df.groupby["kategori"]["terjual"].sum() # Memakai kurung siku pada groupby`,
      correct: `df.groupby("kategori")["terjual"].sum()`,
      reason:
        "`groupby()` adalah sebuah **method** (fungsi), sehingga nama kolom pengelompokan wajib ditulis di dalam tanda kurung biasa `df.groupby('kategori')`, baru diikuti kurung siku kolom target `['terjual']`."
    }
  ],
  tips: [
    "Jika kamu ingin mengubah hasil `Series` dari `.groupby()` kembali menjadi `DataFrame` biasa dengan nomor index `0, 1, 2...`, tambahkan `.reset_index()` di bagian paling belakang.",
    "Gunakan `.agg({'kolom1': 'sum', 'kolom2': 'mean'})` saat membuat laporan eksekutif yang membutuhkan metrik berbeda untuk tiap kolom."
  ],
  caseStudies: [
    {
      id: "pd-bab7-case1",
      title: "Studi Kasus 1: Laporan Total Omzet Penjualan per Kategori Produk",
      difficulty: "Mudah",
      instructions:
        "Dari dataset `'penjualan.csv'`, buatlah kolom `'omzet'` (`df['harga'] * df['terjual']`), lalu kelompokkan berdasarkan `'kategori'` dan hitung total `'omzet'` menggunakan `.groupby('kategori')['omzet'].sum()`. Cetak hasilnya!",
      tasks: [
        "Baca `df = pd.read_csv('penjualan.csv')`.",
        "Hitung `df['omzet'] = df['harga'] * df['terjual']`.",
        "Kelompokkan dengan `omzet_kat = df.groupby('kategori')['omzet'].sum()` dan cetak."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# 1. Hitung kolom omzet (harga * terjual):
df["omzet"] = 

# 2. Kelompokkan per kategori dan jumlahkan omzet:
omzet_kat = 

print(omzet_kat)`,
      expectedOutput: `Elektronik    141600000
Aksesoris      23500000
Name: omzet, dtype: int64`,
      hint: 'Tulis `df["omzet"] = df["harga"] * df["terjual"]` lalu `omzet_kat = df.groupby("kategori")["omzet"].sum()`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
df["omzet"] = df["harga"] * df["terjual"]
omzet_kat = df.groupby("kategori")["omzet"].sum()

print(omzet_kat)`
    },
    {
      id: "pd-bab7-case2",
      title: "Studi Kasus 2: Rekap Nilai IPA & Bahasa per Kelas dengan .agg()",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'siswa.csv'`, kepala sekolah ingin melihat nilai rata-rata (`'mean'`) untuk `'ipa'` dan nilai tertinggi (`'max'`) untuk `'bahasa'` pada masing-masing `'kelas'` menggunakan `.groupby('kelas').agg({'ipa': 'mean', 'bahasa': 'max'})`. Cetak tabel ringkasannya!",
      tasks: [
        "Baca `df = pd.read_csv('siswa.csv')`.",
        "Gunakan `df.groupby('kelas').agg({'ipa': 'mean', 'bahasa': 'max'})`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Kelompokkan per kelas dan agregasi ipa (mean) serta bahasa (max):
rekap_kelas = 

print(rekap_kelas)`,
      expectedOutput: `           ipa  bahasa
10A  79.333333      88
10B  91.500000      95`,
      hint: 'Gunakan `rekap_kelas = df.groupby("kelas").agg({"ipa": "mean", "bahasa": "max"})`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
rekap_kelas = df.groupby("kelas").agg({"ipa": "mean", "bahasa": "max"})

print(rekap_kelas)`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab7-ch1",
      title: "Latihan Praktik #1: Menghitung Frekuensi Kemunculan dengan .value_counts()",
      difficulty: "Mudah",
      instructions:
        "Baca file `'karyawan.csv'`. Hitung dan cetak jumlah karyawan di setiap `'divisi'` menggunakan method `.value_counts()`!",
      tasks: [
        "Pilih kolom `df['divisi']`.",
        "Panggil `.value_counts()` dan cetak dengan `print()`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# Cetak frekuensi tiap divisi dengan .value_counts():
`,
      expectedOutput: `IT         2
HR         2
Finance    1
Name: count, dtype: int64`,
      hint: 'Gunakan `print(df["divisi"].value_counts())`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
print(df["divisi"].value_counts())`
    },
    {
      id: "pd-bab7-ch2",
      title: "Latihan Praktik #2: Menjumlahkan Nilai per Grup dengan .groupby().sum()",
      difficulty: "Mudah",
      instructions:
        "Baca file `'karyawan.csv'`. Kelompokkan data berdasarkan `'divisi'` dan hitung total `'gaji'` untuk masing-masing divisi menggunakan `.groupby('divisi')['gaji'].sum()`. Cetak hasilnya!",
      tasks: [
        "Gunakan `df.groupby('divisi')['gaji'].sum()`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# Hitung total gaji per divisi dengan groupby:
`,
      expectedOutput: `IT         18500000
HR         15300000
Finance     8500000
Name: gaji, dtype: int64`,
      hint: 'Tulis `print(df.groupby("divisi")["gaji"].sum())`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
print(df.groupby("divisi")["gaji"].sum())`
    },
    {
      id: "pd-bab7-ch3",
      title: "Latihan Praktik #3: Menghitung Rata-Rata per Grup dengan .groupby().mean()",
      difficulty: "Sedang",
      instructions:
        "Baca file `'siswa.csv'`. Hitung rata-rata nilai `'bahasa'` untuk setiap `'kelas'` menggunakan `.groupby('kelas')['bahasa'].mean()`, lalu cetak hasilnya!",
      tasks: [
        "Gunakan `df.groupby('kelas')['bahasa'].mean()`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Hitung rata-rata nilai bahasa per kelas:
`,
      expectedOutput: `10A    80.0
10B    92.5
Name: bahasa, dtype: float64`,
      hint: 'Gunakan `print(df.groupby("kelas")["bahasa"].mean())`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
print(df.groupby("kelas")["bahasa"].mean())`
    },
    {
      id: "pd-bab7-ch4",
      title: "Latihan Praktik #4: Multi-Statistik dengan .groupby().agg(['min', 'max'])",
      difficulty: "Sedang",
      instructions:
        "Baca file `'karyawan.csv'`. Kelompokkan berdasarkan `'divisi'` lalu tampilkan gaji terendah (`'min'`) dan gaji tertinggi (`'max'`) pada kolom `'gaji'` menggunakan `.agg(['min', 'max'])`. Cetak hasilnya!",
      tasks: [
        "Panggil `df.groupby('divisi')['gaji'].agg(['min', 'max'])`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# Tampilkan min dan max gaji per divisi menggunakan .agg():
`,
      expectedOutput: `             min      max
     IT  9000000  9500000
     HR  7500000  7800000
Finance  8500000  8500000`,
      hint: 'Tulis `print(df.groupby("divisi")["gaji"].agg(["min", "max"]))`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
print(df.groupby("divisi")["gaji"].agg(["min", "max"]))`
    },
    {
      id: "pd-bab7-ch5",
      title: "Latihan Praktik #5: Agregasi Multi-Kolom dengan Dictionary .agg()",
      difficulty: "Menantang",
      instructions:
        "Baca file `'penjualan.csv'`. Kelompokkan berdasarkan `'kategori'`, lalu gunakan `.agg({'terjual': 'sum', 'harga': 'max'})` untuk melihat total unit terjual dan harga barang termahal di tiap kategori. Cetak hasilnya!",
      tasks: [
        "Gunakan `df.groupby('kategori').agg({'terjual': 'sum', 'harga': 'max'})`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Kelompokkan per kategori dan agregasi terjual (sum) serta harga (max):
hasil = 

print(hasil)`,
      expectedOutput: `            terjual    harga
Elektronik       30  8500000
 Aksesoris      100   350000`,
      hint: 'Gunakan `hasil = df.groupby("kategori").agg({"terjual": "sum", "harga": "max"})`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
hasil = df.groupby("kategori").agg({"terjual": "sum", "harga": "max"})
print(hasil)`
    }
  ],
  quizzes: [
    {
      question:
        "Method manakah yang digunakan untuk menghitung berapa kali setiap nilai unik muncul di dalam kolom `'kota'`?",
      options: [
        "`df['kota'].value_counts()`",
        "`df['kota'].nunique()`",
        "`df['kota'].sum()`",
        "`df['kota'].describe()`"
      ],
      correctIndex: 0,
      explanation:
        "`.value_counts()` menghitung frekuensi kemunculan tiap nilai unik dan mengurutkannya dari yang terbanyak."
    },
    {
      question:
        "Apa perbedaan antara `df['kota'].unique()` dan `df['kota'].nunique()`?",
      options: [
        "Tidak ada perbedaan",
        "`.unique()` mengembalikan daftar/array nama kota uniknya, sedangkan `.nunique()` mengembalikan jumlah (angka) banyaknya kota unik",
        "`.nunique()` hanya bisa untuk angka, `.unique()` untuk teks",
        "`.unique()` menghapus nilai duplikat secara permanen dari DataFrame"
      ],
      correctIndex: 1,
      explanation:
        "`nunique` berarti *number of unique values* (jumlah kategori unik), sedangkan `unique` mengembalikan daftar nilai uniknya."
    },
    {
      question:
        "Bagaimana cara yang benar untuk menghitung total `'terjual'` untuk setiap `'kategori'` di dalam DataFrame `df`?",
      options: [
        "`df.groupby('kategori')['terjual'].sum()`",
        "`df.sum('terjual').by('kategori')`",
        "`df['kategori'].groupby('terjual').sum()`",
        "`df.groupby['kategori']['terjual'].sum()`"
      ],
      correctIndex: 0,
      explanation:
        "Kita memanggil `df.groupby('kategori')`, memilih kolom `'terjual'`, lalu memanggil fungsi agregasi `.sum()`."
    },
    {
      question:
        "Apa yang dimaksud dengan konsep **Split-Apply-Combine** pada operasi `groupby` di Pandas?",
      options: [
        "Membagi kolom menjadi dua file CSV lalu menggabungkannya",
        "Memecah data ke dalam kelompok kategori (*Split*), menerapkan fungsi statistik pada tiap kelompok (*Apply*), dan menyatukan hasilnya menjadi tabel ringkasan (*Combine*)",
        "Mengurutkan baris dari atas ke bawah lalu membalik urutannya",
        "Menghapus baris kosong lalu mengisi nilai rata-rata"
      ],
      correctIndex: 1,
      explanation:
        "Split-Apply-Combine adalah tahapan kerja internal `groupby`: memisahkan baris per grup, menghitung agregasi tiap grup, dan menyusun tabel hasil."
    },
    {
      question:
        "Fungsi agregasi manakah yang digunakan pada `groupby` untuk mencari nilai rata-rata per kelompok?",
      options: [
        "`.sum()`",
        "`.count()`",
        "`.mean()`",
        "`.max()`"
      ],
      correctIndex: 2,
      explanation:
        "Method `.mean()` menghitung rata-rata aritmatika untuk setiap kelompok."
    },
    {
      question:
        "Bagaimana cara menampilkan nilai terkecil, terbesar, dan rata-rata sekaligus pada sebuah kolom setelah melakukan `groupby`?",
      options: [
        "Memanggil `.agg(['min', 'max', 'mean'])`",
        "Memanggil `.all_stats()`",
        "Memanggil `.min().max().mean()` secara berantai",
        "Memanggil `.sum(['min', 'max', 'mean'])`"
      ],
      correctIndex: 0,
      explanation:
        "Method `.agg([...])` menerima list berisi nama-nama fungsi agregasi yang ingin dihitung sekaligus."
    },
    {
      question:
        "Perhatikan kode: `df.groupby('divisi').agg({'gaji': 'mean', 'id': 'count'})`. Apa yang dihasilkan oleh kode tersebut?",
      options: [
        "Tabel ringkasan per divisi yang berisi rata-rata gaji dan jumlah karyawan",
        "Error karena fungsi agregasi harus sama untuk semua kolom",
        "Menghapus kolom gaji dan id",
        "Mengurutkan karyawan berdasarkan divisi"
      ],
      correctIndex: 0,
      explanation:
        "Memberikan Dictionary pada `.agg()` memungkinkan kita menentukan fungsi agregasi spesifik untuk masing-masing kolom."
    },
    {
      question:
        "Apa yang terjadi jika kita hanya menulis `print(df.groupby('kota'))` tanpa memanggil fungsi agregasi di belakangnya?",
      options: [
        "Menampilkan seluruh isi tabel yang sudah diurutkan per kota",
        "Hanya mencetak informasi objek `_DataFrameGroupBy` karena belum ada perhitungan agregasi yang dijalankan",
        "Menghasilkan `SyntaxError`",
        "Menghitung jumlah baris per kota secara otomatis"
      ],
      correctIndex: 1,
      explanation:
        "`df.groupby('kota')` bersifat *lazy* (baru mengelompokkan referensi indeks) dan menunggu fungsi agregasi seperti `.sum()` atau `.mean()` untuk menghasilkan nilai."
    },
    {
      question:
        "Secara default, bagaimana urutan hasil dari `df['kategori'].value_counts()`?",
      options: [
        "Diurutkan dari frekuensi kemunculan paling banyak ke paling sedikit (`ascending=False`)",
        "Diurutkan dari frekuensi paling sedikit ke paling banyak",
        "Diurutkan berdasarkan abjad nama kategori",
        "Tidak diurutkan"
      ],
      correctIndex: 0,
      explanation:
        "Secara default `.value_counts()` mengurutkan hasil secara menurun dari kategori yang paling sering muncul."
    },
    {
      question:
        "Fungsi agregasi manakah pada `df.groupby('kelas')['nama'].count()` yang dijalankan?",
      options: [
        "Menjumlahkan huruf pada kolom nama",
        "Menghitung banyaknya baris/siswa (yang tidak kosong) di dalam masing-masing kelas",
        "Mencari nama siswa terpanjang di tiap kelas",
        "Mengurutkan nama siswa per kelas"
      ],
      correctIndex: 1,
      explanation:
        "Method `.count()` menghitung jumlah elemen tidak kosong (*non-null*) di setiap grup."
    }
  ]
};
