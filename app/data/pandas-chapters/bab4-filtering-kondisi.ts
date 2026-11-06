import { DocSection } from "../types";

export const bab4FilteringKondisi: DocSection = {
  id: "pandas-bab4-filtering-kondisi",
  number: 4,
  title: "Penyaringan Data (Filtering Kondisi, &, |, .isin(), .between())",
  subtitle:
    "Menyaring baris DataFrame menggunakan kondisi logika, menggabungkan multi-kriteria dengan & dan |, serta memakai .isin() dan .between().",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "Dalam analisis data, kita hampir selalu perlu menjawab pertanyaan spesifik seperti: *\"Siapa saja siswa yang nilai Matematikanya di atas 85?\"* atau *\"Transaksi mana saja yang berasal dari kota Jakarta atau Bandung?\"*. Di Pandas, kita menyaring baris dengan menuliskan kondisi di dalam kurung siku `df[kondisi]`. Untuk menggabungkan beberapa kriteria sekaligus, gunakan operator `&` (AND), `|` (OR), dan `~` (NOT) dengan tanda kurung pada tiap kondisi. Selain itu, Pandas menyediakan method khusus yang sangat elegan yaitu **`.isin([...])`** untuk mencocokkan daftar nilai, dan **`.between(bawah, atas)`** untuk menyaring rentang angka.",
  keyPoints: [
    "Menuliskan perbandingan pada kolom seperti `df['gaji'] >= 8000000` menghasilkan sebuah `Series` bertipe `bool` (`True`/`False`).",
    "Memasukkan kondisi tersebut ke dalam `df[df['gaji'] >= 8000000]` akan menyaring dan mengembalikan `DataFrame` yang hanya berisi baris-baris yang bernilai `True`.",
    "Saat menggabungkan dua kondisi atau lebih, gunakan **`&` untuk DAN (AND)** serta **`|` untuk ATAU (OR)**, dan **wajib mengapit setiap kondisi dengan tanda kurung `(...)`**, contoh: `df[(df['kelas'] == '10A') & (df['ipa'] >= 80)]`.",
    "Gunakan `df['kolom'].isin(['Nilai1', 'Nilai2'])` sebagai pengganti operator `|` yang berulang-ulang saat memeriksa apakah nilai kolom termasuk dalam suatu daftar.",
    "Gunakan `df['kolom'].between(batas_bawah, batas_atas)` untuk menyaring angka di dalam rentang inklusif (`batas_bawah <= nilai <= batas_atas`)."
  ],
  conceptTable: {
    title: "Referensi Sintaks Filtering Baris pada DataFrame",
    headers: ["Sintaks Filtering", "Contoh Penggunaan", "Penjelasan Fungsi"],
    rows: [
      [
        "df[df['kol'] > nilai]",
        "df[df['harga'] > 500000]",
        "Menyaring baris yang kolom harganya di atas 500.000"
      ],
      [
        "df[(kond1) & (kond2)]",
        "df[(df['divisi'] == 'IT') & (df['gaji'] >= 9000000)]",
        "Menyaring baris yang memenuhi KEDUA kondisi (AND)"
      ],
      [
        "df[(kond1) | (kond2)]",
        "df[(df['kota'] == 'Jakarta') | (df['kota'] == 'Bandung')]",
        "Menyaring baris yang memenuhi SALAH SATU kondisi (OR)"
      ],
      [
        "df[~kondisi]",
        "df[~(df['divisi'] == 'HR')]",
        "Menyaring baris yang TIDAK memenuhi kondisi (NOT)"
      ],
      [
        "df[df['kol'].isin(list)]",
        "df[df['divisi'].isin(['IT', 'Finance'])]",
        "Menyaring baris yang nilai kolomnya ada di dalam list"
      ],
      [
        "df[df['kol'].between(a, b)]",
        "df[df['nilai'].between(80, 90)]",
        "Menyaring baris dengan nilai antara a sampai b (inklusif)"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab4-ex1",
      title: "1. Filtering Satu Kondisi & Multi-Kondisi (& dan |)",
      description:
        "Menyaring karyawan berdasarkan gaji dan divisi menggunakan operator & (AND).",
      code: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# 1. Karyawan dengan gaji di atas 8.000.000
gaji_tinggi = df[df["gaji"] > 8000000]
print("=== Gaji > 8.000.000 ===")
print(gaji_tinggi)

# 2. Karyawan divisi 'IT' DAN gaji >= 9.000.000
it_senior = df[(df["divisi"] == "IT") & (df["gaji"] >= 9000000)]
print("\\n=== Divisi IT & Gaji >= 9.000.000 ===")
print(it_senior)`,
      output: `=== Gaji > 8.000.000 ===
    id    nama   divisi     gaji
0  101    Arif       IT  9000000
2  103  Candra       IT  9500000
3  104   Dinda  Finance  8500000

=== Divisi IT & Gaji >= 9.000.000 ===
    id    nama  divisi     gaji
0  101    Arif      IT  9000000
2  103  Candra      IT  9500000`,
      lineExplanations: [
        {
          line: 'gaji_tinggi = df[df["gaji"] > 8000000]',
          explanation: "Menyaring hanya baris di mana kolom `gaji` bernilai lebih dari `8000000`."
        },
        {
          line: 'it_senior = df[(df["divisi"] == "IT") & (df["gaji"] >= 9000000)]',
          explanation: "Menggabungkan dua syarat dengan `&` (AND). Perhatikan tanda kurung `(...)` pada masing-masing syarat."
        }
      ]
    },
    {
      id: "pd-bab4-ex2",
      title: "2. Menyaring Daftar Kategori dengan .isin() & Rentang .between()",
      description:
        "Cara bersih dan ringkas untuk mencocokkan beberapa kategori atau rentang nilai.",
      code: `import pandas as pd

df_toko = pd.read_csv("toko.csv")

# 1. Menyaring cabang yang berada di kota Jakarta atau Surabaya dengan .isin()
kota_besar = df_toko[df_toko["kota"].isin(["Jakarta", "Surabaya"])]
print("=== Cabang di Jakarta atau Surabaya (.isin) ===")
print(kota_besar)

# 2. Menyaring cabang dengan jumlah pelanggan antara 300 s/d 400 (.between)
pelanggan_menengah = df_toko[df_toko["pelanggan"].between(300, 400)]
print("\\n=== Pelanggan 300 s/d 400 (.between) ===")
print(pelanggan_menengah)`,
      output: `=== Cabang di Jakarta atau Surabaya (.isin) ===
     cabang      kota     omzet  pelanggan
0  Cabang A   Jakarta  50000000        420
2  Cabang C  Surabaya  45000000        390

=== Pelanggan 300 s/d 400 (.between) ===
     cabang      kota     omzet  pelanggan
1  Cabang B   Bandung  35000000        310
2  Cabang C  Surabaya  45000000        390`,
      lineExplanations: [
        {
          line: 'df_toko["kota"].isin(["Jakarta", "Surabaya"])',
          explanation: "Menghasilkan `True` jika nama kota ada di dalam list `['Jakarta', 'Surabaya']`, jauh lebih rapi daripada menulis dua kondisi `|`."
        },
        {
          line: 'df_toko["pelanggan"].between(300, 400)',
          explanation: "Menyaring baris yang nilai `pelanggan`-nya berada di antara `300` hingga `400` (inklusif)."
        }
      ]
    },
    {
      id: "pd-bab4-ex3",
      title: "3. Menggabungkan Filter Baris dengan Seleksi Kolom (.loc)",
      description:
        "Menyaring baris berdasarkan kondisi sekaligus memilih kolom tertentu saja yang ingin ditampilkan.",
      code: `import pandas as pd

df_siswa = pd.read_csv("siswa.csv")

# Ambil hanya kolom 'nama' dan 'matematika' untuk siswa yang nilai matematikanya >= 85
unggulan = df_siswa.loc[df_siswa["matematika"] >= 85, ["nama", "matematika"]]
print("Siswa Unggulan Matematika (>= 85):")
print(unggulan)`,
      output: `Siswa Unggulan Matematika (>= 85):
   nama  matematika
0  Budi          85
1  Siti          92
3  Dewi          88`,
      lineExplanations: [
        {
          line: 'df_siswa.loc[df_siswa["matematika"] >= 85, ["nama", "matematika"]]',
          explanation: "Argumen pertama sebelum koma menyaring **baris** (`matematika >= 85`), sedangkan argumen kedua setelah koma memilih **kolom** (`['nama', 'matematika']`)."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import pandas as pd
df = pd.read_csv("siswa.csv")
# Menggunakan kata kunci 'and' atau lupa kurung pada tiap kondisi
hasil = df[df["kelas"] == "10A" and df["ipa"] > 80]`,
      correct: `import pandas as pd
df = pd.read_csv("siswa.csv")
# Gunakan simbol '&' dan apit setiap kondisi dengan tanda kurung ()
hasil = df[(df["kelas"] == "10A") & (df["ipa"] > 80)]`,
      reason:
        "Sama seperti NumPy, objek `Series` tidak bisa digabungkan dengan kata kunci `and` / `or` biasa. Gunakan `&` (AND) dan `|` (OR) serta tanda kurung di setiap kondisi."
    }
  ],
  tips: [
    "Gunakan `.isin([...])` setiap kali kamu ingin menyaring satu kolom terhadap 2 atau lebih kemungkinan nilai teks/kategori.",
    "Gunakan `.between(a, b)` untuk menggantikan penulisan `(df['kol'] >= a) & (df['kol'] <= b)` agar kodemu lebih singkat dan mudah dibaca."
  ],
  caseStudies: [
    {
      id: "pd-bab4-case1",
      title: "Studi Kasus 1: Penyaringan Produk Elektronik & Produk Terlaris",
      difficulty: "Mudah",
      instructions:
        "Dari dataset `'penjualan.csv'`, manajer toko meminta daftar produk yang termasuk dalam kategori `'Aksesoris'` **DAN** jumlah terjualnya minimal `30` unit (`terjual >= 30`). Saring dan cetak tabel produk tersebut!",
      tasks: [
        "Baca `df = pd.read_csv('penjualan.csv')`.",
        "Saring dengan `laris = df[(df['kategori'] == 'Aksesoris') & (df['terjual'] >= 30)]`.",
        "Cetak `laris`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Saring kategori == "Aksesoris" DAN terjual >= 30:
laris = 

print(laris)`,
      expectedOutput: `     produk   kategori   harga  terjual
1     Mouse  Aksesoris  150000       45
2  Keyboard  Aksesoris  350000       30`,
      hint: 'Tulis `laris = df[(df["kategori"] == "Aksesoris") & (df["terjual"] >= 30)]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
laris = df[(df["kategori"] == "Aksesoris") & (df["terjual"] >= 30)]

print(laris)`
    },
    {
      id: "pd-bab4-case2",
      title: "Studi Kasus 2: Seleksi Kandidat Olimpiade IPA dengan .between() & .loc",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'siswa.csv'`, sekolah mencari siswa yang nilai `'ipa'`-nya berada di rentang **85 hingga 95** menggunakan `.between(85, 95)`. Tampilkan hanya kolom `['nama', 'kelas', 'ipa']` dari siswa yang terpilih!",
      tasks: [
        "Baca `df = pd.read_csv('siswa.csv')`.",
        "Saring baris di mana `df['ipa'].between(85, 95)` dan ambil kolom `['nama', 'kelas', 'ipa']`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Saring siswa dengan nilai ipa antara 85 s/d 95, tampilkan kolom ['nama', 'kelas', 'ipa']:
kandidat = 

print(kandidat)`,
      expectedOutput: `   nama  kelas  ipa
0  Budi    10A   90
1  Siti    10B   89
3  Dewi    10B   94`,
      hint: 'Gunakan `kandidat = df.loc[df["ipa"].between(85, 95), ["nama", "kelas", "ipa"]]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
kandidat = df.loc[df["ipa"].between(85, 95), ["nama", "kelas", "ipa"]]

print(kandidat)`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab4-ch1",
      title: "Latihan Praktik #1: Menyaring Baris dengan Satu Kondisi",
      difficulty: "Mudah",
      instructions:
        "Baca dataset `'toko.csv'`, lalu saring dan cetak hanya baris cabang toko yang memiliki `omzet >= 40000000`!",
      tasks: [
        "Gunakan `df[df['omzet'] >= 40000000]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("toko.csv")

# Saring cabang dengan omzet >= 40000000:
cabang_utama = 

print(cabang_utama)`,
      expectedOutput: `     cabang      kota     omzet  pelanggan
0  Cabang A   Jakarta  50000000        420
2  Cabang C  Surabaya  45000000        390`,
      hint: 'Tulis `cabang_utama = df[df["omzet"] >= 40000000]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("toko.csv")
cabang_utama = df[df["omzet"] >= 40000000]

print(cabang_utama)`
    },
    {
      id: "pd-bab4-ch2",
      title: "Latihan Praktik #2: Menyaring Berdasarkan Kesamaan Teks (==)",
      difficulty: "Mudah",
      instructions:
        "Dari dataset `'siswa.csv'`, saring dan cetak hanya siswa yang berada di kelas `'10B'` (`df['kelas'] == '10B'`)!",
      tasks: [
        "Gunakan `df[df['kelas'] == '10B']`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Saring siswa kelas '10B':
kelas_10b = 

print(kelas_10b)`,
      expectedOutput: `   nama  kelas  matematika  bahasa  ipa
1  Siti    10B          92      95   89
3  Dewi    10B          88      90   94`,
      hint: 'Tulis `kelas_10b = df[df["kelas"] == "10B"]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
kelas_10b = df[df["kelas"] == "10B"]

print(kelas_10b)`
    },
    {
      id: "pd-bab4-ch3",
      title: "Latihan Praktik #3: Menggabungkan Dua Kondisi dengan & (AND)",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'siswa.csv'`, saring siswa yang berada di kelas `'10A'` **DAN** memiliki nilai `'matematika'` minimal `75` (`>= 75`)!",
      tasks: [
        "Gunakan `df[(df['kelas'] == '10A') & (df['matematika'] >= 75)]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Saring kelas == '10A' DAN matematika >= 75:
lulus_10a = 

print(lulus_10a)`,
      expectedOutput: `   nama  kelas  matematika  bahasa  ipa
0  Budi    10A          85      88   90
2  Andi    10A          76      80   78`,
      hint: 'Tulis `lulus_10a = df[(df["kelas"] == "10A") & (df["matematika"] >= 75)]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
lulus_10a = df[(df["kelas"] == "10A") & (df["matematika"] >= 75)]

print(lulus_10a)`
    },
    {
      id: "pd-bab4-ch4",
      title: "Latihan Praktik #4: Menyaring Daftar Divisi dengan .isin()",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'karyawan.csv'`, gunakan method `.isin(['HR', 'Finance'])` pada kolom `'divisi'` untuk menampilkan karyawan yang bekerja di divisi HR atau Finance!",
      tasks: [
        "Gunakan `df[df['divisi'].isin(['HR', 'Finance'])]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# Saring karyawan divisi 'HR' atau 'Finance' dengan .isin():
non_it = 

print(non_it)`,
      expectedOutput: `    id   nama   divisi     gaji
1  102  Bunga       HR  7500000
3  104  Dinda  Finance  8500000
4  105    Eka       HR  7800000`,
      hint: 'Tulis `non_it = df[df["divisi"].isin(["HR", "Finance"])]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
non_it = df[df["divisi"].isin(["HR", "Finance"])]

print(non_it)`
    },
    {
      id: "pd-bab4-ch5",
      title: "Latihan Praktik #5: Menyaring Rentang Harga dengan .between()",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'penjualan.csv'`, saring produk yang harganya berada di antara `200000` hingga `3000000` (inklusif) menggunakan method `.between(200000, 3000000)`!",
      tasks: [
        "Gunakan `df[df['harga'].between(200000, 3000000)]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Saring produk dengan harga antara 200000 s/d 3000000:
produk_menengah = 

print(produk_menengah)`,
      expectedOutput: `     produk    kategori    harga  terjual
2  Keyboard   Aksesoris   350000       30
3   Monitor  Elektronik  2200000       18
4   Headset   Aksesoris   250000       25`,
      hint: 'Tulis `produk_menengah = df[df["harga"].between(200000, 3000000)]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
produk_menengah = df[df["harga"].between(200000, 3000000)]

print(produk_menengah)`
    }
  ],
  quizzes: [
    {
      question:
        "Apa yang dihasilkan oleh ekspresi `df['nilai'] >= 80` sebelum dimasukkan ke dalam `df[...]`?",
      options: [
        "Sebuah DataFrame baru",
        "Sebuah Series bertipe boolean (True/False) untuk setiap baris",
        "Satu angka rata-rata",
        "Daftar nama kolom"
      ],
      correctIndex: 1,
      explanation:
        "Membandingkan sebuah kolom `Series` dengan nilai tertentu menghasilkan `Series` boolean berisi `True` atau `False` di setiap barisnya."
    },
    {
      question:
        "Manakah sintaks yang BENAR untuk menyaring baris di mana kolom `'kota'` bernilai `'Bandung'` DAN kolom `'omzet'` lebih dari `100`?",
      options: [
        "df[df['kota'] == 'Bandung' and df['omzet'] > 100]",
        "df[(df['kota'] == 'Bandung') & (df['omzet'] > 100)]",
        "df[df['kota'] == 'Bandung' & df['omzet'] > 100]",
        "df[(df['kota'] = 'Bandung') & (df['omzet'] > 100)]"
      ],
      correctIndex: 1,
      explanation:
        "Setiap kondisi wajib dikurung `(...)` dan dihubungkan dengan operator bitwise `&`."
    },
    {
      question:
        "Method apakah yang paling ringkas untuk menyaring baris yang kolom `'kota'`-nya bernilai `'Jakarta'`, `'Bandung'`, atau `'Surabaya'`?",
      options: [
        "df['kota'].contains(['Jakarta', 'Bandung', 'Surabaya'])",
        "df['kota'].isin(['Jakarta', 'Bandung', 'Surabaya'])",
        "df['kota'].in_list(['Jakarta', 'Bandung', 'Surabaya'])",
        "df['kota'].match(['Jakarta', 'Bandung', 'Surabaya'])"
      ],
      correctIndex: 1,
      explanation:
        "Method `.isin(list_nilai)` memeriksa apakah nilai tiap baris terdapat di dalam list yang diberikan."
    },
    {
      question:
        "Ekspresi `df['skor'].between(70, 90)` setara dengan kondisi logika...",
      options: [
        "(df['skor'] > 70) & (df['skor'] < 90)",
        "(df['skor'] >= 70) & (df['skor'] <= 90)",
        "(df['skor'] < 70) | (df['skor'] > 90)",
        "df['skor'] == 80"
      ],
      correctIndex: 1,
      explanation:
        "Secara default, `.between(left, right)` bersifat inklusif di kedua ujung (`left <= nilai <= right`)."
    },
    {
      question:
        "Operator apakah yang digunakan untuk membalikkan kondisi filter (NOT / memilih baris yang **TIDAK** memenuhi kondisi) di Pandas?",
      options: ["!", "not", "~", "^"],
      correctIndex: 2,
      explanation:
        "Operator tilde `~` membalik nilai `True` menjadi `False` dan sebaliknya pada `Series` boolean (contoh: `df[~df['divisi'].isin(['HR'])]`)."
    },
    {
      question:
        "Jika kita ingin menyaring baris dengan `df['gaji'] > 8000000` dan langsung memilih hanya kolom `['nama', 'gaji']`, sintaks manakah yang paling direkomendasikan?",
      options: [
        "df.iloc[df['gaji'] > 8000000, ['nama', 'gaji']]",
        "df.loc[df['gaji'] > 8000000, ['nama', 'gaji']]",
        "df[df['gaji'] > 8000000, ['nama', 'gaji']]",
        "df.filter(gaji > 8000000, ['nama', 'gaji'])"
      ],
      correctIndex: 1,
      explanation:
        "`df.loc[kondisi_baris, daftar_kolom]` memungkinkan penyaringan baris dengan boolean mask sekaligus pemilihan kolom dalam satu langkah."
    },
    {
      question:
        "Apa yang terjadi jika tidak ada satu pun baris pada `DataFrame` yang memenuhi kondisi filter `df[df['harga'] > 999999999]`?",
      options: [
        "Terjadi KeyError",
        "Mengembalikan Empty DataFrame (DataFrame kosong dengan kolom yang tetap utuh namun 0 baris)",
        "Mengembalikan angka 0",
        "Menghapus DataFrame asli"
      ],
      correctIndex: 1,
      explanation:
        "Jika tidak ada baris yang cocok, Pandas mengembalikan `Empty DataFrame` (0 baris) tanpa menimbulkan error."
    },
    {
      question:
        "Simbol operator manakah yang digunakan untuk menggabungkan dua kondisi dengan logika **ATAU (OR)** pada DataFrame?",
      options: ["or", "||", "|", "+"],
      correctIndex: 2,
      explanation:
        "Simbol pipa vertikal `|` digunakan untuk operasi logika OR antar `Series` boolean di Pandas."
    },
    {
      question:
        "Bagaimana cara menyaring karyawan yang **BUKAN** berasal dari divisi `'IT'`?",
      options: [
        "df[df['divisi'] != 'IT']",
        "df[df['divisi'] <> 'IT']",
        "df[not df['divisi'] == 'IT']",
        "df.exclude(divisi='IT')"
      ],
      correctIndex: 0,
      explanation:
        "Operator ketidaksamaan `!=` digunakan untuk memilih baris yang nilai kolomnya tidak sama dengan `'IT'`."
    },
    {
      question:
        "Apakah operasi penyaringan seperti `hasil = df[df['nilai'] > 80]` mengubah isi `df` asli?",
      options: [
        "Ya, baris yang kurang dari 80 otomatis terhapus dari df",
        "Tidak, df asli tetap utuh dan hasil penyaringan dikembalikan sebagai DataFrame baru",
        "Hanya mengubah jika jumlah barisnya sedikit",
        "Ya, kecuali kita memanggil reset()"
      ],
      correctIndex: 1,
      explanation:
        "Filtering dengan `df[kondisi]` tidak menghapus baris dari `df` asli, melainkan menghasilkan objek `DataFrame` baru hasil penyaringan."
    }
  ]
};
