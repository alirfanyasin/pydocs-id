import { DocSection } from "../types";

export const bab6DataCleaning: DocSection = {
  id: "pandas-bab6-data-cleaning",
  number: 6,
  title: "Pembersihan Data (Data Cleaning): Missing Values & Duplikat",
  subtitle:
    "Mendeteksi data kosong (NaN / None) dengan .isna() & .isna().sum(), membersihkan baris kosong dengan .dropna(), mengisi nilai kosong dengan .fillna(), serta menghapus baris ganda dengan .drop_duplicates().",
  level: "Menengah",
  readTime: "15 menit",
  filePath: "app/data/pandas-chapters/bab6-data-cleaning.ts",
  summary:
    "Di dunia nyata, data dari formulir pelanggan, sensor IoT, maupun hasil *export* database hampir selalu memiliki cacat: ada sel yang kosong (**Missing Values**, direpresentasikan sebagai `NaN` / `None` di Pandas) atau baris transaksi yang tercatat dua kali (**Duplicate Rows**). Tahap **Data Cleaning** memastikan kualitas data sebelum dianalisis: kita menggunakan `.isna().sum()` untuk menghitung jumlah nilai kosong per kolom, `.dropna()` untuk membuang baris yang tidak lengkap, `.fillna()` untuk menambal nilai kosong (misalnya dengan angka `0` atau nilai rata-rata), dan `.drop_duplicates()` untuk menyingkirkan baris kembar.",
  keyPoints: [
    "Method `df.isna()` (atau `df.isnull()`) menghasilkan tabel boolean `True` pada sel yang kosong (`NaN`/`None`) dan `False` pada sel yang terisi.",
    "Memanggil `df.isna().sum()` menghitung total nilai kosong (`NaN`) pada masing-masing kolom secara cepat.",
    "Method `df.dropna()` menghapus setiap baris yang memiliki minimal satu nilai kosong (`NaN`). Gunakan `df.dropna(subset=['kolom_a'])` jika hanya ingin mengecek kekosongan pada kolom tertentu.",
    "Method `df.fillna(nilai)` mengganti seluruh sel `NaN` dengan `nilai` pengganti (bisa berupa angka konstan seperti `0`, teks `'Tidak Diketahui'`, atau nilai statistik seperti `df['kolom'].mean()`).",
    "Method `df.drop_duplicates()` menghapus baris yang isinya kembar identik sehingga hanya menyisakan baris unik."
  ],
  conceptTable: {
    title: "Method Pembersihan Data (Data Cleaning) di Pandas",
    headers: ["Method", "Kegunaan", "Contoh Kode"],
    rows: [
      [
        "df.isna() / df.isnull()",
        "Mengecek posisi sel yang bernilai kosong (NaN / None)",
        "df['harga'].isna()"
      ],
      [
        "df.isna().sum()",
        "Menghitung jumlah nilai kosong (NaN) di setiap kolom",
        "print(df.isna().sum())"
      ],
      [
        "df.notna()",
        "Kebalikan .isna(), bernilai True jika sel TIDAK kosong",
        "df[df['email'].notna()]"
      ],
      [
        "df.dropna()",
        "Menghapus baris yang mengandung nilai kosong (NaN)",
        "df_bersih = df.dropna()"
      ],
      [
        "df.fillna(nilai)",
        "Mengisi sel yang kosong (NaN) dengan nilai tertentu",
        "df['diskon'] = df['diskon'].fillna(0)"
      ],
      [
        "df.drop_duplicates()",
        "Menghapus baris duplikat (kembar)",
        "df_unik = df.drop_duplicates()"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab6-ex1",
      title: "1. Mendeteksi Jumlah Missing Values dengan .isna().sum()",
      description:
        "Memeriksa kolom mana saja yang memiliki nilai kosong (None / NaN) beserta jumlahnya.",
      code: `import pandas as pd

df = pd.DataFrame({
    "nama": ["Alya", "Budi", "Citra", "Dewi"],
    "umur": [21, None, 23, None],
    "kota": ["Jakarta", "Bandung", None, "Surabaya"]
})

print("=== Tabel Data Mentah ===")
print(df)

print("\\n=== Jumlah Nilai Kosong per Kolom ===")
print(df.isna().sum())`,
      output: `=== Tabel Data Mentah ===
    nama  umur      kota
0   Alya  21.0   Jakarta
1   Budi   NaN   Bandung
2  Citra  23.0       NaN
3   Dewi   NaN  Surabaya

=== Jumlah Nilai Kosong per Kolom ===
nama    0
umur    2
kota    1
dtype: int64`,
      lineExplanations: [
        {
          line: '"umur": [21, None, 23, None]',
          explanation:
            "Nilai `None` di dalam kolom numerik otomatis ditandai sebagai `NaN` (*Not a Number*) oleh Pandas."
        },
        {
          line: "print(df.isna().sum())",
          explanation:
            "Menghitung jumlah nilai `True` (kosong) pada setiap kolom: `nama` (0 kosong), `umur` (2 kosong), `kota` (1 kosong)."
        }
      ]
    },
    {
      id: "pd-bab6-ex2",
      title: "2. Mengisi Nilai Kosong dengan .fillna() vs Menghapus dengan .dropna()",
      description:
        "Membandingkan cara menambal nilai NaN menggunakan .fillna() dan membuang baris tidak lengkap dengan .dropna().",
      code: `import pandas as pd

df = pd.DataFrame({
    "produk": ["Mouse", "Keyboard", "Monitor", "Webcam"],
    "terjual": [15, None, 8, 12],
    "catatan": ["Promo", None, "Reguler", None]
})

# Cara 1: Isi nilai kosong pada kolom terjual dengan 0 dan catatan dengan 'Normal'
df_isi = df.fillna({"terjual": 0, "catatan": "Normal"})
print("=== Hasil .fillna() ===")
print(df_isi)

# Cara 2: Hapus baris yang memiliki nilai kosong pada kolom terjual
df_buang = df.dropna(subset=["terjual"])
print("\\n=== Hasil .dropna(subset=['terjual']) ===")
print(df_buang)`,
      output: `=== Hasil .fillna() ===
     produk  terjual  catatan
0     Mouse     15.0    Promo
1  Keyboard      0.0   Normal
2   Monitor      8.0  Reguler
3    Webcam     12.0   Normal

=== Hasil .dropna(subset=['terjual']) ===
    produk  terjual  catatan
0    Mouse     15.0    Promo
2  Monitor      8.0  Reguler
3   Webcam     12.0      NaN`,
      lineExplanations: [
        {
          line: 'df_isi = df.fillna({"terjual": 0, "catatan": "Normal"})',
          explanation:
            "Memberikan dictionary pada `.fillna()` memungkinkan kita mengisi nilai pengganti yang berbeda untuk tiap kolom."
        },
        {
          line: 'df_buang = df.dropna(subset=["terjual"])',
          explanation:
            "Hanya menghapus baris jika kolom `'terjual'` bernilai `NaN` (baris Webcam tetap dipertahankan meskipun `catatan`-nya `NaN`)."
        }
      ]
    },
    {
      id: "pd-bab6-ex3",
      title: "3. Menghapus Data Ganda dengan .drop_duplicates()",
      description:
        "Membersihkan catatan transaksi yang tidak sengaja terinput dua kali.",
      code: `import pandas as pd

df = pd.DataFrame({
    "id_order": ["INV-01", "INV-02", "INV-01", "INV-03"],
    "pelanggan": ["Andi", "Siti", "Andi", "Bima"],
    "total": [150000, 280000, 150000, 95000]
})

print("Jumlah baris awal:", len(df))

df_unik = df.drop_duplicates()
print("Jumlah baris setelah drop_duplicates:", len(df_unik))
print(df_unik)`,
      output: `Jumlah baris awal: 4
Jumlah baris setelah drop_duplicates: 3
   id_order  pelanggan   total
0    INV-01       Andi  150000
1    INV-02       Siti  280000
3    INV-03       Bima   95000`,
      lineExplanations: [
        {
          line: "df_unik = df.drop_duplicates()",
          explanation:
            "Mendeteksi baris ke-2 (index 2) yang identik persis dengan baris ke-0 (`INV-01`, `Andi`, `150000`) lalu menghapus duplikatnya."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `df[df["umur"] == None] # Mencari nilai kosong dengan operator ==`,
      correct: `df[df["umur"].isna()]`,
      reason:
        "Di Python dan Pandas, nilai `NaN` tidak pernah sama dengan dirinya sendiri (`NaN == NaN` bernilai `False`). Selalu gunakan `.isna()` atau `.notna()` untuk memfilter nilai kosong."
    },
    {
      wrong: `df.dropna() # Langsung membuang semua baris tanpa cek jumlah NaN`,
      correct: `print(df.isna().sum()) # Periksa dulu sebelum memutuskan dropna atau fillna`,
      reason:
        "Jika sebuah kolom opsional (seperti `catatan_tambahan`) memiliki 90% nilai `NaN`, memanggil `df.dropna()` secara membabi buta akan menghapus 90% data utamamu! Periksa dulu dengan `.isna().sum()`."
    }
  ],
  tips: [
    "Untuk mengisi nilai numerik yang kosong dengan nilai rata-rata kolom tersebut (teknik **Mean Imputation**), gunakan: `df['nilai'] = df['nilai'].fillna(df['nilai'].mean())`.",
    "Gunakan parameter `subset=['email']` pada `df.drop_duplicates(subset=['email'])` jika kamu ingin menghapus duplikat berdasarkan kolom kunci tertentu saja."
  ],
  caseStudies: [
    {
      id: "pd-bab6-case1",
      title: "Studi Kasus 1: Pembersihan Data Survei Pelanggan E-Commerce",
      difficulty: "Mudah",
      instructions:
        "Tim Data Analyst menerima hasil survei pelanggan yang memiliki baris kiriman ganda serta nilai kosong (`None`) pada kolom `'kota'` dan `'rating'`. Hapus baris duplikat terlebih dahulu dengan `.drop_duplicates()`, kemudian isi nilai kosong pada kolom `'kota'` dengan `'Tidak Diketahui'` dan kolom `'rating'` dengan angka `4` menggunakan `.fillna({...})`. Cetak tabel bersihnya!",
      tasks: [
        "Panggil `df_bersih = df.drop_duplicates()`.",
        "Lanjutkan `df_bersih = df_bersih.fillna({'kota': 'Tidak Diketahui', 'rating': 4})`.",
        "Cetak `df_bersih`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "user": ["U01", "U02", "U01", "U03", "U04"],
    "kota": ["Jakarta", None, "Jakarta", "Bandung", None],
    "rating": [5, 4, 5, None, 3]
})

# 1. Hapus duplikat:
df_bersih = 

# 2. Isi missing values:
df_bersih = 

print(df_bersih)`,
      expectedOutput: `   user             kota  rating
0   U01          Jakarta     5.0
1   U02  Tidak Diketahui     4.0
3   U03          Bandung     4.0
4   U04  Tidak Diketahui     3.0`,
      hint: 'Tulis `df_bersih = df.drop_duplicates()` lalu `df_bersih = df_bersih.fillna({"kota": "Tidak Diketahui", "rating": 4})`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "user": ["U01", "U02", "U01", "U03", "U04"],
    "kota": ["Jakarta", None, "Jakarta", "Bandung", None],
    "rating": [5, 4, 5, None, 3]
})

df_bersih = df.drop_duplicates()
df_bersih = df_bersih.fillna({"kota": "Tidak Diketahui", "rating": 4})

print(df_bersih)`
    },
    {
      id: "pd-bab6-case2",
      title: "Studi Kasus 2: Imputasi Nilai Ujian Siswa dengan Rata-Rata (.mean())",
      difficulty: "Sedang",
      instructions:
        "Dalam rekap nilai ujian laboratorium, terdapat 2 siswa yang nilainya belum masuk (`None`). Hitung nilai rata-rata dari kolom `'skor'` menggunakan `df['skor'].mean()`, lalu gunakan nilai rata-rata tersebut di dalam `.fillna()` untuk menambal nilai kosong pada kolom `'skor'`. Cetak rata-rata skor dan DataFrame hasilnya!",
      tasks: [
        "Hitung `rata_skor = df['skor'].mean()`.",
        "Isi nilai kosong dengan `df['skor'] = df['skor'].fillna(rata_skor)`.",
        "Cetak `rata_skor` dan `df`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "nama": ["Alya", "Budi", "Citra", "Dewi", "Eka"],
    "skor": [80, None, 90, 70, None]
})

# Hitung rata-rata kolom skor:
rata_skor = 
print("Rata-rata skor:", rata_skor)

# Isi nilai kosong pada kolom skor dengan rata_skor:
df["skor"] = 

print(df)`,
      expectedOutput: `Rata-rata skor: 80.0
    nama  skor
0   Alya  80.0
1   Budi  80.0
2  Citra  90.0
3   Dewi  70.0
4    Eka  80.0`,
      hint: 'Gunakan `rata_skor = df["skor"].mean()` lalu `df["skor"] = df["skor"].fillna(rata_skor)`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "nama": ["Alya", "Budi", "Citra", "Dewi", "Eka"],
    "skor": [80, None, 90, 70, None]
})

rata_skor = df["skor"].mean()
print("Rata-rata skor:", rata_skor)

df["skor"] = df["skor"].fillna(rata_skor)
print(df)`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab6-ch1",
      title: "Latihan Praktik #1: Menghitung Jumlah Missing Values per Kolom (.isna().sum())",
      difficulty: "Mudah",
      instructions:
        "Diberikan DataFrame `df` yang memiliki beberapa nilai `None`. Cetak jumlah nilai kosong pada setiap kolom menggunakan `.isna().sum()`!",
      tasks: [
        "Panggil `df.isna().sum()` di dalam `print()`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "kode": ["A1", "A2", "A3", "A4"],
    "harga": [10000, None, 25000, None],
    "stok": [5, 12, None, 8]
})

# Cetak jumlah nilai kosong per kolom:
`,
      expectedOutput: `kode     0
harga    2
stok     1
dtype: int64`,
      hint: "Gunakan `print(df.isna().sum())`.",
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "kode": ["A1", "A2", "A3", "A4"],
    "harga": [10000, None, 25000, None],
    "stok": [5, 12, None, 8]
})

print(df.isna().sum())`
    },
    {
      id: "pd-bab6-ch2",
      title: "Latihan Praktik #2: Menghapus Baris yang Mengandung Nilai Kosong (.dropna())",
      difficulty: "Mudah",
      instructions:
        "Hapus seluruh baris yang mengandung nilai kosong (`None` / `NaN`) pada DataFrame `df` menggunakan `.dropna()`, lalu cetak hasilnya!",
      tasks: [
        "Panggil `df.dropna()`.",
        "Cetak DataFrame hasil pembersihan."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "nama": ["Andi", "Siti", "Bima", "Laras"],
    "nilai": [85, None, 92, None]
})

# Hapus baris yang memiliki nilai kosong lalu cetak:
df_bersih = 

print(df_bersih)`,
      expectedOutput: `   nama  nilai
0  Andi   85.0
2  Bima   92.0`,
      hint: "Gunakan `df_bersih = df.dropna()`.",
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "nama": ["Andi", "Siti", "Bima", "Laras"],
    "nilai": [85, None, 92, None]
})

df_bersih = df.dropna()
print(df_bersih)`
    },
    {
      id: "pd-bab6-ch3",
      title: "Latihan Praktik #3: Mengisi Nilai Kosong dengan .fillna()",
      difficulty: "Sedang",
      instructions:
        "Pada DataFrame `df`, isi nilai kosong (`None`) pada kolom `'bonus'` dengan angka `0` menggunakan `.fillna(0)`, lalu cetak `df`!",
      tasks: [
        "Gunakan `df['bonus'] = df['bonus'].fillna(0)`.",
        "Cetak `df`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "karyawan": ["Andi", "Siti", "Rudi"],
    "bonus": [1500000, None, 2000000]
})

# Isi nilai kosong pada kolom bonus dengan 0:
df["bonus"] = 

print(df)`,
      expectedOutput: `   karyawan      bonus
0      Andi  1500000.0
1      Siti        0.0
2      Rudi  2000000.0`,
      hint: 'Tulis `df["bonus"] = df["bonus"].fillna(0)`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "karyawan": ["Andi", "Siti", "Rudi"],
    "bonus": [1500000, None, 2000000]
})

df["bonus"] = df["bonus"].fillna(0)
print(df)`
    },
    {
      id: "pd-bab6-ch4",
      title: "Latihan Praktik #4: Menghapus Baris Duplikat (.drop_duplicates())",
      difficulty: "Sedang",
      instructions:
        "DataFrame `df` memiliki baris transaksi kembar. Gunakan `.drop_duplicates()` untuk menghapus baris ganda, lalu cetak DataFrame hasilnya!",
      tasks: [
        "Panggil `df.drop_duplicates()`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "kode": ["P01", "P02", "P01", "P03"],
    "barang": ["Mouse", "Keyboard", "Mouse", "Monitor"]
})

# Hapus baris duplikat dan cetak hasilnya:
df_unik = 

print(df_unik)`,
      expectedOutput: `   kode    barang
0   P01     Mouse
1   P02  Keyboard
3   P03   Monitor`,
      hint: "Gunakan `df_unik = df.drop_duplicates()`.",
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "kode": ["P01", "P02", "P01", "P03"],
    "barang": ["Mouse", "Keyboard", "Mouse", "Monitor"]
})

df_unik = df.drop_duplicates()
print(df_unik)`
    },
    {
      id: "pd-bab6-ch5",
      title: "Latihan Praktik #5: Pipeline Pembersihan Lengkap: Duplikat & Missing Values",
      difficulty: "Menantang",
      instructions:
        "Lakukan pembersihan bertahap pada `df`: (1) Hapus baris duplikat dengan `.drop_duplicates()`, (2) Isi nilai kosong pada kolom `'kategori'` dengan `'Umum'` dan kolom `'stok'` dengan `0` menggunakan `.fillna({...})`. Cetak DataFrame akhir!",
      tasks: [
        "Panggil `df.drop_duplicates()`.",
        "Lanjutkan dengan `.fillna({'kategori': 'Umum', 'stok': 0})`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "produk": ["Buku", "Pulpen", "Buku", "Penggaris"],
    "kategori": ["Alat Tulis", None, "Alat Tulis", None],
    "stok": [20, 50, 20, None]
})

# Bersihkan duplikat lalu isi missing values:
bersih = 

print(bersih)`,
      expectedOutput: `      produk    kategori  stok
0       Buku  Alat Tulis  20.0
1     Pulpen        Umum  50.0
3  Penggaris        Umum   0.0`,
      hint: 'Gunakan `bersih = df.drop_duplicates().fillna({"kategori": "Umum", "stok": 0})`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "produk": ["Buku", "Pulpen", "Buku", "Penggaris"],
    "kategori": ["Alat Tulis", None, "Alat Tulis", None],
    "stok": [20, 50, 20, None]
})

bersih = df.drop_duplicates().fillna({"kategori": "Umum", "stok": 0})
print(bersih)`
    }
  ],
  quizzes: [
    {
      question:
        "Bagaimana Pandas merepresentasikan nilai yang hilang atau kosong (*Missing Value*) di dalam kolom numerik?",
      options: [
        "`0`",
        "`NaN` (*Not a Number*)",
        "`Empty`",
        "`False`"
      ],
      correctIndex: 1,
      explanation:
        "Pandas menandai nilai kosong dengan `NaN` (*Not a Number*) atau `None`."
    },
    {
      question:
        "Perintah manakah yang paling tepat untuk menghitung jumlah nilai kosong (`NaN`) di setiap kolom dalam DataFrame `df`?",
      options: [
        "`df.count_nan()`",
        "`df.isna().sum()`",
        "`df.dropna().count()`",
        "`df.fillna().sum()`"
      ],
      correctIndex: 1,
      explanation:
        "`df.isna()` menghasilkan nilai `True` (bernilai 1) untuk sel kosong, dan `.sum()` menjumlahkannya per kolom."
    },
    {
      question:
        "Apa fungsi dari method `df.dropna()` jika dipanggil tanpa argumen tambahan?",
      options: [
        "Menghapus seluruh kolom di DataFrame",
        "Mengganti semua nilai `NaN` menjadi `0`",
        "Menghapus setiap baris yang mengandung minimal satu nilai kosong (`NaN`)",
        "Menghapus baris yang kembar"
      ],
      correctIndex: 2,
      explanation:
        "Secara default `df.dropna()` membuang baris mana pun yang memiliki setidaknya satu sel `NaN`."
    },
    {
      question:
        "Jika kita hanya ingin menghapus baris ketika kolom `'email'` bernilai kosong, tetapi membiarkan baris yang kolom `'telepon'`-nya kosong, perintah apa yang digunakan?",
      options: [
        "`df.dropna(subset=['email'])`",
        "`df.dropna(columns=['email'])`",
        "`df.fillna('email')`",
        "`df.drop(columns=['email'])`"
      ],
      correctIndex: 0,
      explanation:
        "Parameter `subset=['email']` pada `.dropna()` membatasi pengecekan `NaN` hanya pada kolom yang disebutkan di dalam `subset`."
    },
    {
      question:
        "Bagaimana cara mengganti seluruh nilai kosong (`NaN`) pada kolom `'diskon'` dengan angka `0`?",
      options: [
        "`df['diskon'] = df['diskon'].dropna(0)`",
        "`df['diskon'] = df['diskon'].fillna(0)`",
        "`df['diskon'] = df['diskon'].isna(0)`",
        "`df['diskon'] = df['diskon'].replace_nan(0)`"
      ],
      correctIndex: 1,
      explanation:
        "Method `.fillna(0)` mengisi setiap nilai `NaN` dengan angka `0`."
    },
    {
      question:
        "Apa kegunaan dari method `df.drop_duplicates()`?",
      options: [
        "Menghapus nilai `NaN` yang muncul lebih dari sekali",
        "Menghapus baris-baris yang memiliki isi data kembar/identik sehingga hanya menyisakan baris unik",
        "Menggandakan jumlah baris di dalam tabel",
        "Menghapus kolom yang bertipe angka"
      ],
      correctIndex: 1,
      explanation:
        "`.drop_duplicates()` menyaring baris duplikat dan mempertahankan kemunculan pertamanya secara default."
    },
    {
      question:
        "Mengapa kita TIDAK boleh menggunakan `df[df['umur'] == None]` untuk mencari baris yang kolom `'umur'`-nya kosong?",
      options: [
        "Karena operator `==` hanya untuk teks",
        "Karena di Pandas perbandingan langsung dengan `None` / `NaN` menggunakan `==` tidak menghasilkan `True`; kita wajib memakai `.isna()`",
        "Karena `None` adalah nama variabel",
        "Karena kolom `'umur'` akan terhapus"
      ],
      correctIndex: 1,
      explanation:
        "Menurut standar IEEE floating-point dan Pandas, `NaN == NaN` selalu bernilai `False`. Gunakan `df['umur'].isna()` untuk mengecek kekosongan."
    },
    {
      question:
        "Apa hasil dari ekspresi `df['email'].notna()`?",
      options: [
        "`Series` boolean yang bernilai `True` untuk baris yang kolom `'email'`-nya TIDAK kosong (sudah terisi)",
        "Jumlah email yang kosong",
        "Menghapus kolom `'email'`",
        "`Series` boolean yang bernilai `True` untuk email yang kosong"
      ],
      correctIndex: 0,
      explanation:
        "Method `.notna()` adalah kebalikan dari `.isna()`, menghasilkan `True` jika sel memiliki nilai valid (bukan `NaN`/`None`)."
    },
    {
      question:
        "Apa keuntungan memberikan argumen berbentuk Dictionary pada `df.fillna({'stok': 0, 'kota': 'Pusat'})`?",
      options: [
        "Menghapus kolom `'stok'` dan `'kota'` sekaligus",
        "Kita dapat menentukan nilai pengganti `NaN` yang spesifik dan berbeda untuk masing-masing kolom dalam satu perintah",
        "Mengurutkan kolom `'stok'` dan `'kota'`",
        "Mengubah tipe data seluruh tabel menjadi string"
      ],
      correctIndex: 1,
      explanation:
        "Dengan Dictionary, Pandas mengisi `NaN` di kolom `'stok'` dengan `0` dan di kolom `'kota'` dengan `'Pusat'` secara serentak."
    },
    {
      question:
        "Ketika menghitung rata-rata dengan `df['skor'].mean()` pada kolom yang memiliki beberapa nilai `NaN`, apa yang dilakukan Pandas secara default?",
      options: [
        "Menghasilkan error `ValueError`",
        "Menganggap `NaN` sebagai angka `0`",
        "Mengabaikan baris `NaN` dan menghitung rata-rata hanya dari angka yang tersedia",
        "Menghapus kolom `'skor'`"
      ],
      correctIndex: 2,
      explanation:
        "Secara default (`skipna=True`), fungsi statistik Pandas seperti `.mean()` dan `.sum()` mengabaikan nilai `NaN`."
    }
  ]
};
