import { DocSection } from "../types";

export const bab9UjianPandas: DocSection = {
  id: "pandas-bab9-ujian-akhir",
  number: 9,
  title: "🏆 Ujian Akhir Modul Python Pandas & Analisis Data",
  subtitle:
    "Uji penguasaan pengolahan tabel dan analisis data di Python melalui 15 tantangan praktik ngoding dan 10 soal pemahaman komprehensif (Bab 1 s/d Bab 8).",
  level: "Ujian Akhir",
  readTime: "45 menit",
  filePath: "app/data/pandas-chapters/bab9-ujian-pandas.ts",
  isExam: true,
  summary:
    "Selamat telah menyelesaikan seluruh materi pada modul **Python Pandas & Analisis Data**! Pada bab **Ujian Akhir** ini, kamu akan menguji penguasaan pengolahan data tabel dari Bab 1 hingga Bab 8: pembuatan `Series` & `DataFrame`, pembacaan CSV (`pd.read_csv`) & inspeksi tabel (`.head`, `.tail`, `.shape`, `.dtypes`, `.describe`), seleksi baris/kolom dengan `.loc[]` & `.iloc[]`, penyaringan kondisi (`&`, `|`, `.isin`, `.between`), manipulasi kolom (`.apply`, `.map`, `.rename`, `.drop`, `.sort_values`), pembersihan data (`.isna`, `.dropna`, `.fillna`, `.drop_duplicates`), agregasi `.value_counts()` & `.groupby()`, hingga penggabungan tabel `pd.concat()` & `pd.merge()`. Selesaikan **15 Soal Praktik Ngoding** dan **10 Soal Pemahaman** di bawah ini untuk menuntaskan modul Python Pandas!",
  keyPoints: [
    "Ujian ini terdiri dari **15 Soal Praktik Ngoding** dan **10 Soal Pemahaman Pilihan Ganda** (Total 25 Soal).",
    "Seluruh soal diambil murni dari materi Bab 1 hingga Bab 8 pada modul Python Pandas & Analisis Data.",
    "Klik tombol **▶ Jalankan & Cek Jawaban** pada setiap soal praktik untuk memvalidasi output programmu.",
    "Setelah ke-25 soal terjawab, klik tombol penyelesaian di bagian paling bawah untuk menandai Ujian Akhir Pandas selesai."
  ],
  examples: [],
  codingChallenges: [
    {
      id: "pd-exam-ch1",
      title: "Ujian Praktik #1: Membuat Series dengan Index Kustom (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Buatlah objek `Series` bernama `stok_buah` dengan nilai `[40, 25, 60]` dan index label `['Apel', 'Jeruk', 'Mangga']`. Cetak seluruh `stok_buah` lalu cetak jumlah stok `'Jeruk'`!",
      tasks: [
        "Gunakan `pd.Series([40, 25, 60], index=['Apel', 'Jeruk', 'Mangga'])`.",
        "Cetak `stok_buah` dan `Stok Jeruk: 25`."
      ],
      starterCode: `import pandas as pd

# Buat Series stok_buah dengan index kustom:
stok_buah = 

print(stok_buah)
print("Stok Jeruk:", stok_buah["Jeruk"])`,
      expectedOutput: `Apel      40
Jeruk     25
Mangga    60
dtype: int64
Stok Jeruk: 25`,
      hint: 'Tulis `stok_buah = pd.Series([40, 25, 60], index=["Apel", "Jeruk", "Mangga"])`.',
      solutionCode: `import pandas as pd

stok_buah = pd.Series([40, 25, 60], index=["Apel", "Jeruk", "Mangga"])

print(stok_buah)
print("Stok Jeruk:", stok_buah["Jeruk"])`
    },
    {
      id: "pd-exam-ch2",
      title: "Ujian Praktik #2: Membuat DataFrame dari Dictionary (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Buatlah `DataFrame` bernama `df` dari dictionary dengan kolom `'menu'`: `['Nasi Goreng', 'Mie Ayam']` dan `'harga'`: `[22000, 18000]`. Cetak `df`!",
      tasks: [
        "Gunakan `pd.DataFrame({'menu': ['Nasi Goreng', 'Mie Ayam'], 'harga': [22000, 18000]})`.",
        "Cetak `df`."
      ],
      starterCode: `import pandas as pd

# Buat DataFrame df:
df = 

print(df)`,
      expectedOutput: `          menu  harga
0  Nasi Goreng  22000
1     Mie Ayam  18000`,
      hint: 'Gunakan `pd.DataFrame({"menu": ["Nasi Goreng", "Mie Ayam"], "harga": [22000, 18000]})`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "menu": ["Nasi Goreng", "Mie Ayam"],
    "harga": [22000, 18000]
})

print(df)`
    },
    {
      id: "pd-exam-ch3",
      title: "Ujian Praktik #3: Membaca CSV & Inspeksi .shape dan .head() (Bab 2)",
      difficulty: "Mudah",
      instructions:
        "Baca dataset `'toko.csv'` ke dalam variabel `df`. Cetak ukuran tabel menggunakan `.shape`, lalu cetak 2 baris pertama tabel menggunakan `.head(2)`!",
      tasks: [
        "Baca `df = pd.read_csv('toko.csv')`.",
        "Cetak `Shape: (4, 4)` dan `df.head(2)`."
      ],
      starterCode: `import pandas as pd

df = 

print("Shape:", df.shape)
print(df.head(2))`,
      expectedOutput: `Shape: (4, 4)
     cabang     kota     omzet  pelanggan
0  Cabang A  Jakarta  50000000        420
1  Cabang B  Bandung  35000000        310`,
      hint: 'Tulis `df = pd.read_csv("toko.csv")`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("toko.csv")

print("Shape:", df.shape)
print(df.head(2))`
    },
    {
      id: "pd-exam-ch4",
      title: "Ujian Praktik #4: Statistik Deskriptif Kolom dengan .describe() (Bab 2)",
      difficulty: "Mudah",
      instructions:
        "Baca dataset `'siswa.csv'`. Tampilkan ringkasan statistik `.describe()` khusus untuk kolom `['matematika', 'ipa']`!",
      tasks: [
        "Baca `df = pd.read_csv('siswa.csv')`.",
        "Cetak `df[['matematika', 'ipa']].describe()`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Cetak .describe() untuk kolom ['matematika', 'ipa']:
`,
      expectedOutput: `        matematika   ipa
 count         5.0   5.0
  mean        81.2  84.2
   min        65.0  70.0
median        85.0  89.0
   max        92.0  94.0`,
      hint: 'Gunakan `print(df[["matematika", "ipa"]].describe())`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
print(df[["matematika", "ipa"]].describe())`
    },
    {
      id: "pd-exam-ch5",
      title: "Ujian Praktik #5: Seleksi Label Baris & Kolom dengan .loc[] (Bab 3)",
      difficulty: "Sedang",
      instructions:
        "Baca dataset `'penjualan.csv'`. Gunakan `.loc[]` untuk mengambil baris index `1` sampai `3` (inklusif) dan hanya menampilkan kolom `['produk', 'harga']`. Cetak hasilnya!",
      tasks: [
        "Gunakan `df.loc[1:3, ['produk', 'harga']]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Ambil baris 1 s/d 3 dan kolom ['produk', 'harga'] dengan .loc:
potongan = 

print(potongan)`,
      expectedOutput: `     produk    harga
1     Mouse   150000
2  Keyboard   350000
3   Monitor  2200000`,
      hint: 'Tulis `potongan = df.loc[1:3, ["produk", "harga"]]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
potongan = df.loc[1:3, ["produk", "harga"]]

print(potongan)`
    },
    {
      id: "pd-exam-ch6",
      title: "Ujian Praktik #6: Seleksi Posisi Integer dengan .iloc[] (Bab 3)",
      difficulty: "Sedang",
      instructions:
        "Baca dataset `'karyawan.csv'`. Gunakan `.iloc[]` untuk mengambil 3 baris pertama (`0:3`) dan 2 kolom pertama (`0:2`). Cetak hasilnya!",
      tasks: [
        "Gunakan `df.iloc[0:3, 0:2]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# Ambil 3 baris pertama dan 2 kolom pertama dengan .iloc:
hasil = 

print(hasil)`,
      expectedOutput: `    id    nama
0  101    Arif
1  102   Bunga
2  103  Candra`,
      hint: "Tulis `hasil = df.iloc[0:3, 0:2]`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
hasil = df.iloc[0:3, 0:2]

print(hasil)`
    },
    {
      id: "pd-exam-ch7",
      title: "Ujian Praktik #7: Penyaringan Ganda dengan Operator & (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'siswa.csv'`, saring dan cetak siswa yang berada di kelas `'10A'` **DAN** memiliki nilai `'matematika'` minimal `75` (`matematika >= 75`)!",
      tasks: [
        "Gunakan `df[(df['kelas'] == '10A') & (df['matematika'] >= 75)]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Saring kelas == '10A' DAN matematika >= 75:
tersaring = 

print(tersaring)`,
      expectedOutput: `   nama  kelas  matematika  bahasa  ipa
0  Budi    10A          85      88   90
2  Andi    10A          76      80   78`,
      hint: 'Tulis `tersaring = df[(df["kelas"] == "10A") & (df["matematika"] >= 75)]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
tersaring = df[(df["kelas"] == "10A") & (df["matematika"] >= 75)]

print(tersaring)`
    },
    {
      id: "pd-exam-ch8",
      title: "Ujian Praktik #8: Penyaringan Kategori dengan .isin() (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'karyawan.csv'`, saring dan cetak hanya karyawan yang berada di divisi `'IT'` atau `'Finance'` menggunakan method `.isin(['IT', 'Finance'])`!",
      tasks: [
        "Gunakan `df[df['divisi'].isin(['IT', 'Finance'])]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# Saring divisi IT atau Finance dengan .isin():
hasil = 

print(hasil)`,
      expectedOutput: `    id    nama   divisi     gaji
0  101    Arif       IT  9000000
2  103  Candra       IT  9500000
3  104   Dinda  Finance  8500000`,
      hint: 'Gunakan `hasil = df[df["divisi"].isin(["IT", "Finance"])]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
hasil = df[df["divisi"].isin(["IT", "Finance"])]

print(hasil)`
    },
    {
      id: "pd-exam-ch9",
      title: "Ujian Praktik #9: Membuat Kolom Baru & Mengurutkan .sort_values() (Bab 5)",
      difficulty: "Sedang",
      instructions:
        "Baca dataset `'toko.csv'`. Buat kolom baru bernama `'rata_belanja'` dari pembagian `df['omzet'] / df['pelanggan']` yang dibulatkan ke integer dengan `.apply(int)`. Urutkan berdasarkan `'omzet'` menurun (`ascending=False`) dan cetak kolom `['cabang', 'kota', 'omzet', 'rata_belanja']`!",
      tasks: [
        "Hitung `df['rata_belanja'] = (df['omzet'] / df['pelanggan']).apply(int)`.",
        "Urutkan dengan `df.sort_values(by='omzet', ascending=False)`.",
        "Cetak 4 kolom yang diminta."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("toko.csv")

# 1. Buat kolom rata_belanja:
df["rata_belanja"] = (df["omzet"] / df["pelanggan"]).apply(int)

# 2. Urutkan berdasarkan omzet descending:
urut = 

print(urut[["cabang", "kota", "omzet", "rata_belanja"]])`,
      expectedOutput: `     cabang        kota     omzet  rata_belanja
0  Cabang A     Jakarta  50000000        119047
2  Cabang C    Surabaya  45000000        115384
1  Cabang B     Bandung  35000000        112903
3  Cabang D  Yogyakarta  30000000        107142`,
      hint: 'Tulis `urut = df.sort_values(by="omzet", ascending=False)`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("toko.csv")
df["rata_belanja"] = (df["omzet"] / df["pelanggan"]).apply(int)
urut = df.sort_values(by="omzet", ascending=False)

print(urut[["cabang", "kota", "omzet", "rata_belanja"]])`
    },
    {
      id: "pd-exam-ch10",
      title: "Ujian Praktik #10: Transformasi .apply() & Rename Kolom (Bab 5)",
      difficulty: "Sedang",
      instructions:
        "Diberikan DataFrame `df` produk. Buat kolom `'status_stok'` dengan `.apply()`: jika `stok < 15` maka `'Restock'`, selain itu `'Aman'`. Kemudian ubah nama kolom `'brg'` menjadi `'barang'` dengan `.rename(columns={'brg': 'barang'})`. Cetak hasilnya!",
      tasks: [
        "Gunakan `df['status_stok'] = df['stok'].apply(lambda s: 'Restock' if s < 15 else 'Aman')`.",
        "Gunakan `df = df.rename(columns={'brg': 'barang'})`.",
        "Cetak `df`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "brg": ["Kertas A4", "Tinta Printer", "Map Plastik"],
    "stok": [50, 8, 12]
})

# Buat kolom status_stok dan rename kolom 'brg' -> 'barang':
df["status_stok"] = 
df = 

print(df)`,
      expectedOutput: `          barang  stok  status_stok
0      Kertas A4    50         Aman
1  Tinta Printer     8      Restock
2    Map Plastik    12      Restock`,
      hint: 'Tulis `df["status_stok"] = df["stok"].apply(lambda s: "Restock" if s < 15 else "Aman")` lalu `df = df.rename(columns={"brg": "barang"})`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "brg": ["Kertas A4", "Tinta Printer", "Map Plastik"],
    "stok": [50, 8, 12]
})

df["status_stok"] = df["stok"].apply(lambda s: "Restock" if s < 15 else "Aman")
df = df.rename(columns={"brg": "barang"})

print(df)`
    },
    {
      id: "pd-exam-ch11",
      title: "Ujian Praktik #11: Mendeteksi & Mengisi Missing Values .fillna() (Bab 6)",
      difficulty: "Sedang",
      instructions:
        "Pada DataFrame `df` di bawah ini, cetak jumlah nilai kosong per kolom dengan `df.isna().sum()`, lalu isi nilai kosong pada kolom `'diskon'` dengan `0` dan kolom `'voucher'` dengan `'TANPA_KODE'` menggunakan `.fillna({...})`. Cetak DataFrame bersihnya!",
      tasks: [
        "Cetak `df.isna().sum()`.",
        "Isi nilai kosong dengan `df_bersih = df.fillna({'diskon': 0, 'voucher': 'TANPA_KODE'})`.",
        "Cetak `df_bersih`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "item": ["Sepatu", "Jaket", "Topi"],
    "diskon": [20000, None, 5000],
    "voucher": [None, "HEMAT10", None]
})

print("Missing values:")
print(df.isna().sum())

# Isi nilai kosong dengan .fillna():
df_bersih = 

print("\\nTabel Bersih:")
print(df_bersih)`,
      expectedOutput: `Missing values:
item       0
diskon     1
voucher    2
dtype: int64

Tabel Bersih:
     item   diskon     voucher
0  Sepatu  20000.0  TANPA_KODE
1   Jaket      0.0     HEMAT10
2    Topi   5000.0  TANPA_KODE`,
      hint: 'Gunakan `df_bersih = df.fillna({"diskon": 0, "voucher": "TANPA_KODE"})`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "item": ["Sepatu", "Jaket", "Topi"],
    "diskon": [20000, None, 5000],
    "voucher": [None, "HEMAT10", None]
})

print("Missing values:")
print(df.isna().sum())

df_bersih = df.fillna({"diskon": 0, "voucher": "TANPA_KODE"})

print("\\nTabel Bersih:")
print(df_bersih)`
    },
    {
      id: "pd-exam-ch12",
      title: "Ujian Praktik #12: Menghapus Duplikat & Baris Kosong (Bab 6)",
      difficulty: "Menantang",
      instructions:
        "Bersihkan `df` dengan menghapus baris duplikat menggunakan `.drop_duplicates()`, lalu hapus baris yang masih memiliki nilai kosong (`None`) menggunakan `.dropna()`. Cetak hasil akhirnya!",
      tasks: [
        "Panggil `df.drop_duplicates().dropna()`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "id": ["T1", "T2", "T1", "T3"],
    "nominal": [100000, None, 100000, 250000]
})

# Hapus duplikat lalu hapus baris bernilai kosong (NaN):
bersih = 

print(bersih)`,
      expectedOutput: `   id   nominal
0  T1  100000.0
3  T3  250000.0`,
      hint: "Tulis `bersih = df.drop_duplicates().dropna()`.",
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "id": ["T1", "T2", "T1", "T3"],
    "nominal": [100000, None, 100000, 250000]
})

bersih = df.drop_duplicates().dropna()
print(bersih)`
    },
    {
      id: "pd-exam-ch13",
      title: "Ujian Praktik #13: Agregasi Pengelompokan .groupby() & .agg() (Bab 7)",
      difficulty: "Menantang",
      instructions:
        "Baca dataset `'penjualan.csv'`. Kelompokkan berdasarkan `'kategori'`, lalu hitung total `'terjual'` (`'sum'`) dan rata-rata `'harga'` (`'mean'`) menggunakan `.agg({'terjual': 'sum', 'harga': 'mean'})`. Cetak hasilnya!",
      tasks: [
        "Gunakan `df.groupby('kategori').agg({'terjual': 'sum', 'harga': 'mean'})`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Kelompokkan per kategori dan hitung sum(terjual) serta mean(harga):
rekap = 

print(rekap)`,
      expectedOutput: `            terjual      harga
Elektronik       30  5350000.0
 Aksesoris      100   250000.0`,
      hint: 'Gunakan `rekap = df.groupby("kategori").agg({"terjual": "sum", "harga": "mean"})`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
rekap = df.groupby("kategori").agg({"terjual": "sum", "harga": "mean"})

print(rekap)`
    },
    {
      id: "pd-exam-ch14",
      title: "Ujian Praktik #14: Menggabungkan Tabel dengan pd.concat() (Bab 8)",
      difficulty: "Menantang",
      instructions:
        "Gabungkan `df_cabang1` dan `df_cabang2` secara vertikal dengan `pd.concat([df_cabang1, df_cabang2], ignore_index=True)`, lalu cetak frekuensi kemunculan tiap `'produk'` menggunakan `.value_counts()`!",
      tasks: [
        "Gabungkan dengan `df_all = pd.concat([df_cabang1, df_cabang2], ignore_index=True)`.",
        "Cetak `df_all['produk'].value_counts()`."
      ],
      starterCode: `import pandas as pd

df_cabang1 = pd.DataFrame({"produk": ["Laptop", "Mouse", "Laptop"]})
df_cabang2 = pd.DataFrame({"produk": ["Mouse", "Laptop", "Keyboard"]})

# Gabungkan kedua tabel dan cetak value_counts() dari kolom 'produk':
df_all = 

print(df_all["produk"].value_counts())`,
      expectedOutput: `Laptop      3
Mouse       2
Keyboard    1
Name: count, dtype: int64`,
      hint: 'Gunakan `df_all = pd.concat([df_cabang1, df_cabang2], ignore_index=True)` lalu `print(df_all["produk"].value_counts())`.',
      solutionCode: `import pandas as pd

df_cabang1 = pd.DataFrame({"produk": ["Laptop", "Mouse", "Laptop"]})
df_cabang2 = pd.DataFrame({"produk": ["Mouse", "Laptop", "Keyboard"]})

df_all = pd.concat([df_cabang1, df_cabang2], ignore_index=True)
print(df_all["produk"].value_counts())`
    },
    {
      id: "pd-exam-ch15",
      title: "Ujian Praktik #15: Analisis End-to-End dengan pd.merge() & GroupBy (Bab 1-8)",
      difficulty: "Menantang",
      instructions:
        "Diberikan tabel transaksi `df_trx` dan tabel harga produk `df_harga`. (1) Gabungkan keduanya dengan `pd.merge(df_trx, df_harga, on='produk', how='inner')`, (2) Buat kolom `'omzet'` (`qty * harga`), (3) Kelompokkan berdasarkan `'kota'` dan cetak total `'omzet'` per kota menggunakan `.groupby('kota')['omzet'].sum()`!",
      tasks: [
        "Gabungkan `df = pd.merge(df_trx, df_harga, on='produk', how='inner')`.",
        "Hitung `df['omzet'] = df['qty'] * df['harga']`.",
        "Cetak `df.groupby('kota')['omzet'].sum()`."
      ],
      starterCode: `import pandas as pd

df_trx = pd.DataFrame({
    "kota": ["Jakarta", "Bandung", "Jakarta", "Bandung"],
    "produk": ["Mouse", "Keyboard", "Keyboard", "Mouse"],
    "qty": [10, 5, 4, 8]
})

df_harga = pd.DataFrame({
    "produk": ["Mouse", "Keyboard"],
    "harga": [150000, 300000]
})

# 1. Merge df_trx dan df_harga:
df = 

# 2. Hitung kolom omzet (qty * harga):
df["omzet"] = 

# 3. Cetak total omzet per kota:
print(df.groupby("kota")["omzet"].sum())`,
      expectedOutput: `Jakarta    2700000
Bandung    2700000
Name: omzet, dtype: int64`,
      hint: 'Tulis `df = pd.merge(df_trx, df_harga, on="produk", how="inner")` lalu `df["omzet"] = df["qty"] * df["harga"]`.',
      solutionCode: `import pandas as pd

df_trx = pd.DataFrame({
    "kota": ["Jakarta", "Bandung", "Jakarta", "Bandung"],
    "produk": ["Mouse", "Keyboard", "Keyboard", "Mouse"],
    "qty": [10, 5, 4, 8]
})

df_harga = pd.DataFrame({
    "produk": ["Mouse", "Keyboard"],
    "harga": [150000, 300000]
})

df = pd.merge(df_trx, df_harga, on="produk", how="inner")
df["omzet"] = df["qty"] * df["harga"]

print(df.groupby("kota")["omzet"].sum())`
    }
  ],
  quizzes: [
    {
      question:
        "Apa perbedaan mendasar antara `Series` dan `DataFrame` di dalam pustaka Pandas?",
      options: [
        "`Series` hanya bisa menyimpan teks, sedangkan `DataFrame` hanya menyimpan angka",
        "`Series` adalah struktur data 1 dimensi (satu kolom berlabel), sedangkan `DataFrame` adalah tabel 2 dimensi yang terdiri dari baris dan kolom",
        "`Series` tidak memiliki index, sedangkan `DataFrame` memiliki index",
        "`DataFrame` tidak bisa dibuat dari Dictionary"
      ],
      correctIndex: 1,
      explanation:
        "`Series` merepresentasikan satu kolom data 1D berindeks, sementara `DataFrame` adalah tabel 2D yang tersusun dari kumpulan `Series`."
    },
    {
      question:
        "Atribut atau method manakah yang mengembalikan tuple `(jumlah_baris, jumlah_kolom)` dari sebuah DataFrame `df`?",
      options: [
        "`df.shape`",
        "`df.head()`",
        "`df.dtypes`",
        "`df.describe()`"
      ],
      correctIndex: 0,
      explanation:
        "Atribut `df.shape` mengembalikan tuple `(baris, kolom)` tanpa tanda kurung pemanggilan fungsi."
    },
    {
      question:
        "Apa perbedaan perilaku slicing antara `df.loc[0:2]` dan `df.iloc[0:2]`?",
      options: [
        "`df.loc[0:2]` menyertakan label akhir `2` (3 baris: 0, 1, 2), sedangkan `df.iloc[0:2]` mengecualikan batas akhir `2` (2 baris: posisi 0 dan 1)",
        "`df.iloc[0:2]` menyertakan indeks `2`, sedangkan `df.loc[0:2]` tidak",
        "Keduanya menghasilkan jumlah baris yang persis sama",
        "`.loc[]` hanya untuk memilih kolom, sedangkan `.iloc[]` hanya untuk baris"
      ],
      correctIndex: 0,
      explanation:
        "Slicing pada `.loc[start:stop]` bersifat inklusif terhadap `stop`, sedangkan `.iloc[start:stop]` mengikuti aturan slicing Python standar (eksklusif terhadap `stop`)."
    },
    {
      question:
        "Manakah penulisan filter multi-kondisi yang BENAR di Pandas untuk memilih baris dengan `harga > 100000` DAN `kategori == 'Aksesoris'`?",
      options: [
        "`df[df['harga'] > 100000 and df['kategori'] == 'Aksesoris']`",
        "`df[(df['harga'] > 100000) & (df['kategori'] == 'Aksesoris')]`",
        "`df[df['harga'] > 100000 && df['kategori'] == 'Aksesoris']`",
        "`df.filter(harga > 100000, kategori == 'Aksesoris')`"
      ],
      correctIndex: 1,
      explanation:
        "Di Pandas, penggabungan kondisi wajib menggunakan operator bitwise `&` (AND) atau `|` (OR) dan setiap kondisi wajib diapit tanda kurung `(...)`."
    },
    {
      question:
        "Method manakah yang digunakan untuk memeriksa apakah nilai suatu kolom berada di dalam sebuah daftar pilihan (misalnya `['Jakarta', 'Bandung']`)?",
      options: [
        "`df['kota'].between(['Jakarta', 'Bandung'])`",
        "`df['kota'].isin(['Jakarta', 'Bandung'])`",
        "`df['kota'].apply(['Jakarta', 'Bandung'])`",
        "`df['kota'].map(['Jakarta', 'Bandung'])`"
      ],
      correctIndex: 1,
      explanation:
        "Method `.isin([...])` mengembalikan `Series` boolean yang bernilai `True` jika elemen termasuk di dalam list yang diberikan."
    },
    {
      question:
        "Bagaimana cara mengurutkan DataFrame `df` berdasarkan kolom `'omzet'` dari nilai tertinggi ke terendah?",
      options: [
        "`df.sort_values(by='omzet', ascending=False)`",
        "`df.sort_values(by='omzet', ascending=True)`",
        "`df.order_by('omzet', desc=True)`",
        "`df['omzet'].reverse()`"
      ],
      correctIndex: 0,
      explanation:
        "`df.sort_values(by='omzet', ascending=False)` mengurutkan baris secara menurun (descending)."
    },
    {
      question:
        "Perintah manakah yang digunakan untuk menghitung jumlah nilai kosong (`NaN`) pada masing-masing kolom di DataFrame `df`?",
      options: [
        "`df.dropna().sum()`",
        "`df.isna().sum()`",
        "`df.fillna().count()`",
        "`df.isnull_count()`"
      ],
      correctIndex: 1,
      explanation:
        "`df.isna().sum()` menjumlahkan nilai `True` (kosong) pada setiap kolom."
    },
    {
      question:
        "Apa perbedaan utama antara `df.dropna()` dan `df.fillna(0)`?",
      options: [
        "`df.dropna()` menghapus baris yang mengandung `NaN`, sedangkan `df.fillna(0)` mempertahankan barisnya dan mengganti sel `NaN` dengan angka `0`",
        "`df.dropna()` menghapus kolom duplikat, sedangkan `df.fillna(0)` menghapus baris ke-0",
        "Keduanya menghapus baris yang kosong",
        "`df.fillna(0)` hanya bekerja pada kolom bertipe teks"
      ],
      correctIndex: 0,
      explanation:
        "`.dropna()` membuang baris yang tidak lengkap, sementara `.fillna(0)` menambal sel yang kosong dengan nilai `0`."
    },
    {
      question:
        "Jika kita ingin menghitung total `'gaji'` dan nilai maksimum `'gaji'` sekaligus untuk setiap `'divisi'`, perintah manakah yang paling tepat?",
      options: [
        "`df.groupby('divisi')['gaji'].agg(['sum', 'max'])`",
        "`df.groupby('gaji')['divisi'].sum_max()`",
        "`df['divisi'].value_counts(['sum', 'max'])`",
        "`df.merge('divisi', on=['sum', 'max'])`"
      ],
      correctIndex: 0,
      explanation:
        "Method `.agg(['sum', 'max'])` pada objek `groupby` menghitung beberapa fungsi agregasi sekaligus."
    },
    {
      question:
        "Kapan kita harus memilih `pd.merge(df1, df2, on='id', how='left')` dibandingkan `how='inner'`?",
      options: [
        "Saat kita ingin menumpuk baris `df2` di bawah `df1`",
        "Saat kita ingin mempertahankan seluruh baris dari tabel kiri (`df1`) meskipun belum memiliki pasangan `'id'` yang cocok di tabel kanan (`df2`)",
        "Saat kita ingin menghapus semua baris di tabel kiri",
        "Saat kedua tabel tidak memiliki kolom yang bisa dihubungkan"
      ],
      correctIndex: 1,
      explanation:
        "`Left Join` (`how='left'`) menjamin tidak ada data dari tabel utama di sebelah kiri yang terbuang akibat ketiadaan referensi di tabel kanan."
    }
  ]
};
