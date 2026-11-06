import { DocSection } from "../types";

export const bab8ConcatMerge: DocSection = {
  id: "pandas-bab8-concat-merge",
  number: 8,
  title: "Menggabungkan Tabel Data: pd.concat() dan pd.merge()",
  subtitle:
    "Menumpuk beberapa DataFrame secara vertikal atau berdampingan dengan pd.concat(), serta merelasikan dua tabel berdasarkan kolom kunci (SQL Join) menggunakan pd.merge().",
  level: "Menengah",
  readTime: "16 menit",
  filePath: "app/data/pandas-chapters/bab8-concat-merge.ts",
  summary:
    "Dalam aplikasi bisnis, data hampir tidak pernah tersimpan di dalam satu tabel raksasa saja. Data transaksi bulanan mungkin terpisah menjadi tabel Januari dan Februari, sementara informasi nama pelanggan dan daftar produk disimpan di tabel master tersendiri. Pandas menyediakan dua fungsi utama untuk menyatukan tabel: **`pd.concat()`** untuk menumpuk beberapa tabel yang memiliki struktur kolom serupa (baik dari atas ke bawah `axis=0` maupun menyamping `axis=1`), serta **`pd.merge()`** untuk menggabungkan dua tabel berdasarkan kolom kunci yang sama (persis seperti operasi `JOIN` di database SQL atau `VLOOKUP` di Excel).",
  keyPoints: [
    "Fungsi `pd.concat([df1, df2], ignore_index=True)` menumpuk baris `df2` tepat di bawah `df1` dan mereset nomor index baris menjadi berurutan `0, 1, 2, ...`.",
    "Jika kita menggunakan `pd.concat([df1, df2], axis=1)`, kedua tabel akan digabungkan secara menyamping (kolom `df2` diletakkan di sebelah kanan `df1`).",
    "Fungsi `pd.merge(df_kiri, df_kanan, on='kolom_kunci', how='inner')` mencocokkan baris dari kedua tabel berdasarkan nilai yang sama pada `'kolom_kunci'`.",
    "Jenis penggabungan `how` pada `pd.merge()`: `'inner'` (hanya kunci yang ada di kedua tabel), `'left'` (semua baris tabel kiri dipertahankan), `'right'` (semua baris tabel kanan dipertahankan), dan `'outer'` (gabungan seluruh kunci dari kedua tabel).",
    "Jika kedua tabel memiliki nama kolom kunci yang berbeda (misal `'id_div'` dan `'kode_div'`), gunakan parameter `left_on='id_div', right_on='kode_div'`."
  ],
  conceptTable: {
    title: "Perbandingan Fungsi Penggabungan Tabel di Pandas",
    headers: ["Fungsi / Parameter", "Kegunaan Utama", "Contoh Penggunaan"],
    rows: [
      [
        "pd.concat([df1, df2])",
        "Menumpuk tabel secara vertikal (baris ditambah ke bawah)",
        "pd.concat([df_jan, df_feb], ignore_index=True)"
      ],
      [
        "pd.concat([df1, df2], axis=1)",
        "Menggabungkan tabel secara horizontal (kolom berdampingan)",
        "pd.concat([df_profil, df_nilai], axis=1)"
      ],
      [
        "pd.merge(df1, df2, on='kunci')",
        "Inner Join: hanya baris dengan kunci yang cocok di kedua tabel",
        "pd.merge(df_order, df_produk, on='id_produk')"
      ],
      [
        "pd.merge(..., how='left')",
        "Left Join: semua baris tabel kiri tampil, yang tidak cocok diisi NaN",
        "pd.merge(df_siswa, df_ekskul, on='nama', how='left')"
      ],
      [
        "pd.merge(..., how='outer')",
        "Full Outer Join: menampilkan seluruh baris dari kedua tabel",
        "pd.merge(df_a, df_b, on='kode', how='outer')"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab8-ex1",
      title: "1. Menumpuk Tabel Transaksi dengan pd.concat()",
      description:
        "Menggabungkan tabel penjualan cabang pagi dan cabang sore menjadi satu tabel rekap harian dengan nomor index yang rapi (ignore_index=True).",
      code: `import pandas as pd

df_pagi = pd.DataFrame({
    "produk": ["Kopi", "Roti"],
    "qty": [15, 8]
})

df_sore = pd.DataFrame({
    "produk": ["Teh", "Kopi"],
    "qty": [10, 12]
})

# Gabungkan secara vertikal dan reset index
df_harian = pd.concat([df_pagi, df_sore], ignore_index=True)
print("=== Rekap Penjualan Harian ===")
print(df_harian)`,
      output: `=== Rekap Penjualan Harian ===
   produk  qty
0    Kopi   15
1    Roti    8
2     Teh   10
3    Kopi   12`,
      lineExplanations: [
        {
          line: "df_harian = pd.concat([df_pagi, df_sore], ignore_index=True)",
          explanation:
            "Menumpuk `df_sore` di bawah `df_pagi`. Parameter `ignore_index=True` membuat nomor index berlanjut `0, 1, 2, 3` (bukan `0, 1, 0, 1`)."
        }
      ]
    },
    {
      id: "pd-bab8-ex2",
      title: "2. Merelasikan Dua Tabel dengan pd.merge() (Inner Join)",
      description:
        "Menggabungkan tabel karyawan dengan tabel lokasi gedung berdasarkan kolom kunci divisi.",
      code: `import pandas as pd

df_kar = pd.DataFrame({
    "nama": ["Arif", "Bunga", "Candra"],
    "divisi": ["IT", "HR", "IT"]
})

df_gedung = pd.DataFrame({
    "divisi": ["IT", "HR", "Finance"],
    "lantai": ["Lantai 5", "Lantai 2", "Lantai 3"]
})

# Gabungkan berdasarkan kolom 'divisi'
gabung = pd.merge(df_kar, df_gedung, on="divisi", how="inner")
print(gabung)`,
      output: `     nama  divisi    lantai
0    Arif      IT  Lantai 5
1   Bunga      HR  Lantai 2
2  Candra      IT  Lantai 5`,
      lineExplanations: [
        {
          line: 'gabung = pd.merge(df_kar, df_gedung, on="divisi", how="inner")',
          explanation:
            "Mencocokkan nilai kolom `'divisi'` di kedua tabel dan menyertakan kolom `'lantai'` yang sesuai untuk setiap karyawan."
        }
      ]
    },
    {
      id: "pd-bab8-ex3",
      title: "3. Perbedaan Inner Join vs Left Join pada pd.merge()",
      description:
        "Melihat bagaimana how='left' mempertahankan semua baris di tabel kiri meskipun belum memiliki pasangan di tabel kanan.",
      code: `import pandas as pd

df_siswa = pd.DataFrame({
    "id": [1, 2, 3],
    "nama": ["Budi", "Siti", "Andi"]
})

df_beasiswa = pd.DataFrame({
    "id": [1, 3],
    "program": ["Prestasi", "Sains"]
})

print("=== Hasil Inner Join ===")
print(pd.merge(df_siswa, df_beasiswa, on="id", how="inner"))

print("\\n=== Hasil Left Join ===")
print(pd.merge(df_siswa, df_beasiswa, on="id", how="left"))`,
      output: `=== Hasil Inner Join ===
   id  nama   program
0   1  Budi  Prestasi
1   3  Andi     Sains

=== Hasil Left Join ===
   id  nama   program
0   1  Budi  Prestasi
1   2  Siti       NaN
2   3  Andi     Sains`,
      lineExplanations: [
        {
          line: 'pd.merge(df_siswa, df_beasiswa, on="id", how="inner")',
          explanation:
            "Hanya menampilkan siswa yang `id`-nya ada di kedua tabel (Budi dan Andi; Siti tidak muncul)."
        },
        {
          line: 'pd.merge(df_siswa, df_beasiswa, on="id", how="left")',
          explanation:
            "Mempertahankan seluruh siswa dari `df_siswa` (tabel kiri). Karena Siti (`id=2`) tidak ada di `df_beasiswa`, kolom `program`-nya diisi `NaN`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `pd.concat(df1, df2) # Tanpa tanda kurung siku list [...]`,
      correct: `pd.concat([df1, df2], ignore_index=True)`,
      reason:
        "Argumen pertama `pd.concat()` wajib berupa **list** yang berisi DataFrame (`[df1, df2]`), bukan dua argumen terpisah."
    },
    {
      wrong: `pd.merge(df1, df2, on="kota") # Padahal kita ingin tetap menampilkan semua data df1 walaupun kotanya belum terdaftar di df2`,
      correct: `pd.merge(df1, df2, on="kota", how="left")`,
      reason:
        "Secara default `pd.merge()` menggunakan `how='inner'` yang akan membuang baris jika kuncinya tidak ditemukan di tabel kanan. Gunakan `how='left'` agar baris utama di tabel kiri tidak hilang."
    }
  ],
  tips: [
    "Setelah melakukan `Left Join` (`how='left'`), kamu bisa langsung merapikan nilai `NaN` pada kolom hasil penggabungan menggunakan `.fillna('Belum Ada')`.",
    "Selalu gunakan `ignore_index=True` saat menumpuk baris dengan `pd.concat([df1, df2])` agar nomor indeks baris tidak duplikat."
  ],
  caseStudies: [
    {
      id: "pd-bab8-case1",
      title: "Studi Kasus 1: Konsolidasi Laporan Penjualan Kuartal 1 & Kuartal 2",
      difficulty: "Mudah",
      instructions:
        "Manajer Keuangan memiliki dua tabel rekap pendapatan cabang dari `df_q1` dan `df_q2`. Gabungkan kedua tabel tersebut secara vertikal menggunakan `pd.concat([df_q1, df_q2], ignore_index=True)`, lalu hitung total `'pendapatan'` per `'cabang'` dengan `.groupby('cabang')['pendapatan'].sum()`. Cetak tabel gabungan dan hasil total per cabangnya!",
      tasks: [
        "Gunakan `df_gabung = pd.concat([df_q1, df_q2], ignore_index=True)`.",
        "Cetak `df_gabung`.",
        "Hitung dan cetak `df_gabung.groupby('cabang')['pendapatan'].sum()`."
      ],
      starterCode: `import pandas as pd

df_q1 = pd.DataFrame({
    "cabang": ["Jakarta", "Bandung"],
    "pendapatan": [50000000, 30000000]
})

df_q2 = pd.DataFrame({
    "cabang": ["Jakarta", "Bandung"],
    "pendapatan": [65000000, 40000000]
})

# 1. Gabungkan df_q1 dan df_q2 dengan pd.concat (ignore_index=True):
df_gabung = 
print(df_gabung)

# 2. Hitung total pendapatan per cabang:
print("\\nTotal per Cabang:")
print(df_gabung.groupby("cabang")["pendapatan"].sum())`,
      expectedOutput: `    cabang  pendapatan
0  Jakarta    50000000
1  Bandung    30000000
2  Jakarta    65000000
3  Bandung    40000000

Total per Cabang:
Jakarta    115000000
Bandung     70000000
Name: pendapatan, dtype: int64`,
      hint: "Tulis `df_gabung = pd.concat([df_q1, df_q2], ignore_index=True)`.",
      solutionCode: `import pandas as pd

df_q1 = pd.DataFrame({
    "cabang": ["Jakarta", "Bandung"],
    "pendapatan": [50000000, 30000000]
})

df_q2 = pd.DataFrame({
    "cabang": ["Jakarta", "Bandung"],
    "pendapatan": [65000000, 40000000]
})

df_gabung = pd.concat([df_q1, df_q2], ignore_index=True)
print(df_gabung)

print("\\nTotal per Cabang:")
print(df_gabung.groupby("cabang")["pendapatan"].sum())`
    },
    {
      id: "pd-bab8-case2",
      title: "Studi Kasus 2: Menggabungkan Data Karyawan & Tunjangan Divisi (pd.merge)",
      difficulty: "Sedang",
      instructions:
        "Baca dataset `'karyawan.csv'`. Diberikan pula DataFrame `df_tunjangan` yang berisi besaran `'tunjangan'` untuk tiap `'divisi'`. Gabungkan `df_kar` dan `df_tunjangan` berdasarkan kolom `'divisi'` menggunakan `pd.merge(..., on='divisi', how='left')`, lalu buat kolom `'total_terima'` (`gaji + tunjangan`). Cetak kolom `['nama', 'divisi', 'gaji', 'tunjangan', 'total_terima']`!",
      tasks: [
        "Gabungkan dengan `df_full = pd.merge(df_kar, df_tunjangan, on='divisi', how='left')`.",
        "Hitung `df_full['total_terima'] = df_full['gaji'] + df_full['tunjangan']`.",
        "Cetak `df_full[['nama', 'divisi', 'gaji', 'tunjangan', 'total_terima']]`."
      ],
      starterCode: `import pandas as pd

df_kar = pd.read_csv("karyawan.csv")

df_tunjangan = pd.DataFrame({
    "divisi": ["IT", "HR", "Finance"],
    "tunjangan": [1500000, 1000000, 1200000]
})

# 1. Merge df_kar dan df_tunjangan berdasarkan kolom 'divisi':
df_full = 

# 2. Buat kolom total_terima (gaji + tunjangan):
df_full["total_terima"] = 

print(df_full[["nama", "divisi", "gaji", "tunjangan", "total_terima"]])`,
      expectedOutput: `     nama   divisi     gaji  tunjangan  total_terima
0    Arif       IT  9000000    1500000      10500000
1   Bunga       HR  7500000    1000000       8500000
2  Candra       IT  9500000    1500000      11000000
3   Dinda  Finance  8500000    1200000       9700000
4     Eka       HR  7800000    1000000       8800000`,
      hint: 'Gunakan `df_full = pd.merge(df_kar, df_tunjangan, on="divisi", how="left")` lalu `df_full["total_terima"] = df_full["gaji"] + df_full["tunjangan"]`.',
      solutionCode: `import pandas as pd

df_kar = pd.read_csv("karyawan.csv")

df_tunjangan = pd.DataFrame({
    "divisi": ["IT", "HR", "Finance"],
    "tunjangan": [1500000, 1000000, 1200000]
})

df_full = pd.merge(df_kar, df_tunjangan, on="divisi", how="left")
df_full["total_terima"] = df_full["gaji"] + df_full["tunjangan"]

print(df_full[["nama", "divisi", "gaji", "tunjangan", "total_terima"]])`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab8-ch1",
      title: "Latihan Praktik #1: Menumpuk Dua DataFrame secara Vertikal (pd.concat)",
      difficulty: "Mudah",
      instructions:
        "Gabungkan `df1` dan `df2` secara vertikal menggunakan `pd.concat([df1, df2], ignore_index=True)` lalu cetak hasilnya!",
      tasks: [
        "Panggil `pd.concat([df1, df2], ignore_index=True)`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df1 = pd.DataFrame({"nama": ["Alya", "Budi"], "skor": [85, 90]})
df2 = pd.DataFrame({"nama": ["Citra", "Dewi"], "skor": [88, 92]})

# Gabungkan df1 dan df2 dengan pd.concat (ignore_index=True):
gabung = 

print(gabung)`,
      expectedOutput: `    nama  skor
0   Alya    85
1   Budi    90
2  Citra    88
3   Dewi    92`,
      hint: "Tulis `gabung = pd.concat([df1, df2], ignore_index=True)`.",
      solutionCode: `import pandas as pd

df1 = pd.DataFrame({"nama": ["Alya", "Budi"], "skor": [85, 90]})
df2 = pd.DataFrame({"nama": ["Citra", "Dewi"], "skor": [88, 92]})

gabung = pd.concat([df1, df2], ignore_index=True)
print(gabung)`
    },
    {
      id: "pd-bab8-ch2",
      title: "Latihan Praktik #2: Menggabungkan Kolom Berdampingan (axis=1)",
      difficulty: "Mudah",
      instructions:
        "Gabungkan `df_nama` dan `df_nilai` secara menyamping (horizontal) menggunakan `pd.concat([df_nama, df_nilai], axis=1)` lalu cetak hasilnya!",
      tasks: [
        "Gunakan parameter `axis=1` pada `pd.concat([df_nama, df_nilai], axis=1)`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df_nama = pd.DataFrame({"siswa": ["Budi", "Siti", "Andi"]})
df_nilai = pd.DataFrame({"nilai": [85, 92, 78]})

# Gabungkan secara horizontal (axis=1):
hasil = 

print(hasil)`,
      expectedOutput: `   siswa  nilai
0   Budi     85
1   Siti     92
2   Andi     78`,
      hint: "Gunakan `hasil = pd.concat([df_nama, df_nilai], axis=1)`.",
      solutionCode: `import pandas as pd

df_nama = pd.DataFrame({"siswa": ["Budi", "Siti", "Andi"]})
df_nilai = pd.DataFrame({"nilai": [85, 92, 78]})

hasil = pd.concat([df_nama, df_nilai], axis=1)
print(hasil)`
    },
    {
      id: "pd-bab8-ch3",
      title: "Latihan Praktik #3: Menggabungkan Dua Tabel dengan pd.merge() (Inner Join)",
      difficulty: "Sedang",
      instructions:
        "Gabungkan `df_produk` dan `df_stok` berdasarkan kolom `'kode'` menggunakan `pd.merge(df_produk, df_stok, on='kode', how='inner')`, lalu cetak hasilnya!",
      tasks: [
        "Gunakan `pd.merge(df_produk, df_stok, on='kode', how='inner')`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df_produk = pd.DataFrame({
    "kode": ["P1", "P2", "P3"],
    "barang": ["Mouse", "Keyboard", "Monitor"]
})

df_stok = pd.DataFrame({
    "kode": ["P1", "P3"],
    "stok": [25, 10]
})

# Lakukan inner merge berdasarkan kolom 'kode':
hasil = 

print(hasil)`,
      expectedOutput: `   kode   barang  stok
0    P1    Mouse    25
1    P3  Monitor    10`,
      hint: 'Tulis `hasil = pd.merge(df_produk, df_stok, on="kode", how="inner")`.',
      solutionCode: `import pandas as pd

df_produk = pd.DataFrame({
    "kode": ["P1", "P2", "P3"],
    "barang": ["Mouse", "Keyboard", "Monitor"]
})

df_stok = pd.DataFrame({
    "kode": ["P1", "P3"],
    "stok": [25, 10]
})

hasil = pd.merge(df_produk, df_stok, on="kode", how="inner")
print(hasil)`
    },
    {
      id: "pd-bab8-ch4",
      title: "Latihan Praktik #4: Mempertahankan Semua Baris Kiri dengan Left Join",
      difficulty: "Sedang",
      instructions:
        "Gabungkan `df_toko` (dari `'toko.csv'`) dengan `df_manajer` berdasarkan kolom `'kota'` menggunakan `how='left'` agar seluruh cabang toko tetap tampil meskipun kotanya belum ada di daftar manajer. Cetak kolom `['cabang', 'kota', 'manajer']`!",
      tasks: [
        "Gunakan `pd.merge(df_toko, df_manajer, on='kota', how='left')`.",
        "Cetak kolom `['cabang', 'kota', 'manajer']`."
      ],
      starterCode: `import pandas as pd

df_toko = pd.read_csv("toko.csv")

df_manajer = pd.DataFrame({
    "kota": ["Jakarta", "Bandung", "Surabaya"],
    "manajer": ["Pak Budi", "Bu Siti", "Pak Andi"]
})

# Lakukan left merge berdasarkan kolom 'kota':
gabung = 

print(gabung[["cabang", "kota", "manajer"]])`,
      expectedOutput: `     cabang        kota   manajer
0  Cabang A     Jakarta  Pak Budi
1  Cabang B     Bandung   Bu Siti
2  Cabang C    Surabaya  Pak Andi
3  Cabang D  Yogyakarta       NaN`,
      hint: 'Tulis `gabung = pd.merge(df_toko, df_manajer, on="kota", how="left")`.',
      solutionCode: `import pandas as pd

df_toko = pd.read_csv("toko.csv")

df_manajer = pd.DataFrame({
    "kota": ["Jakarta", "Bandung", "Surabaya"],
    "manajer": ["Pak Budi", "Bu Siti", "Pak Andi"]
})

gabung = pd.merge(df_toko, df_manajer, on="kota", how="left")
print(gabung[["cabang", "kota", "manajer"]])`
    },
    {
      id: "pd-bab8-ch5",
      title: "Latihan Praktik #5: Left Merge Dilanjutkan Pembersihan .fillna()",
      difficulty: "Menantang",
      instructions:
        "Gabungkan `df_siswa` dan `df_ekskul` berdasarkan kolom `'nama'` dengan `how='left'`. Karena ada siswa yang belum memilih ekstrakurikuler (`NaN`), ganti nilai kosong pada kolom `'ekskul'` menjadi `'Belum Pilih'` menggunakan `.fillna('Belum Pilih')`. Cetak hasil akhirnya!",
      tasks: [
        "Lakukan `hasil = pd.merge(df_siswa, df_ekskul, on='nama', how='left')`.",
        "Isi nilai kosong dengan `hasil['ekskul'] = hasil['ekskul'].fillna('Belum Pilih')`.",
        "Cetak `hasil`."
      ],
      starterCode: `import pandas as pd

df_siswa = pd.DataFrame({
    "nama": ["Budi", "Siti", "Andi"],
    "kelas": ["10A", "10B", "10A"]
})

df_ekskul = pd.DataFrame({
    "nama": ["Budi", "Andi"],
    "ekskul": ["Basket", "Robotik"]
})

# 1. Left merge berdasarkan 'nama':
hasil = 

# 2. Isi NaN pada kolom 'ekskul' dengan 'Belum Pilih':
hasil["ekskul"] = 

print(hasil)`,
      expectedOutput: `   nama  kelas       ekskul
0  Budi    10A       Basket
1  Siti    10B  Belum Pilih
2  Andi    10A      Robotik`,
      hint: 'Gunakan `hasil = pd.merge(df_siswa, df_ekskul, on="nama", how="left")` lalu `hasil["ekskul"] = hasil["ekskul"].fillna("Belum Pilih")`.',
      solutionCode: `import pandas as pd

df_siswa = pd.DataFrame({
    "nama": ["Budi", "Siti", "Andi"],
    "kelas": ["10A", "10B", "10A"]
})

df_ekskul = pd.DataFrame({
    "nama": ["Budi", "Andi"],
    "ekskul": ["Basket", "Robotik"]
})

hasil = pd.merge(df_siswa, df_ekskul, on="nama", how="left")
hasil["ekskul"] = hasil["ekskul"].fillna("Belum Pilih")
print(hasil)`
    }
  ],
  quizzes: [
    {
      question:
        "Fungsi Pandas manakah yang paling tepat untuk menumpuk baris dari dua DataFrame yang memiliki kolom-kolom yang sama (misal laporan bulan Januari dan Februari)?",
      options: [
        "`pd.concat([df_jan, df_feb], ignore_index=True)`",
        "`pd.groupby([df_jan, df_feb])`",
        "`pd.sort_values([df_jan, df_feb])`",
        "`pd.dropna([df_jan, df_feb])`"
      ],
      correctIndex: 0,
      explanation:
        "`pd.concat()` digunakan untuk menumpuk beberapa DataFrame secara vertikal (`axis=0`) maupun horizontal (`axis=1`)."
    },
    {
      question:
        "Apa fungsi dari parameter `ignore_index=True` di dalam `pd.concat([df1, df2], ignore_index=True)`?",
      options: [
        "Menghapus kolom pertama dari tabel",
        "Mengurutkan data berdasarkan abjad",
        "Menata ulang nomor index baris pada tabel gabungan agar berurutan dari `0, 1, 2, ...`",
        "Mengabaikan baris yang memiliki nilai kosong"
      ],
      correctIndex: 2,
      explanation:
        "Tanpa `ignore_index=True`, index asli dari masing-masing DataFrame akan dipertahankan (misal `0, 1, 0, 1`). Dengan `ignore_index=True`, index di-reset menjadi `0, 1, 2, 3`."
    },
    {
      question:
        "Jika kita ingin menggabungkan dua DataFrame secara menyamping (kolom-kolom `df2` diletakkan di sebelah kanan `df1`), parameter apa yang harus ditambahkan pada `pd.concat()`?",
      options: [
        "`axis=0`",
        "`axis=1`",
        "`how='side'`",
        "`on='columns'`"
      ],
      correctIndex: 1,
      explanation:
        "Pada `pd.concat()`, `axis=0` berarti vertikal (menambah baris), sedangkan `axis=1` berarti horizontal (menambah kolom di sampingnya)."
    },
    {
      question:
        "Fungsi manakah yang bekerja seperti operasi `JOIN` di SQL untuk menggabungkan dua tabel berdasarkan kolom kunci yang sama?",
      options: [
        "`pd.concat()`",
        "`pd.merge()`",
        "`pd.apply()`",
        "`pd.describe()`"
      ],
      correctIndex: 1,
      explanation:
        "`pd.merge()` mencocokkan baris antara dua DataFrame berdasarkan satu atau lebih kolom kunci (`on=...`)."
    },
    {
      question:
        "Pada `pd.merge(df_kiri, df_kanan, on='id', how='inner')`, baris mana saja yang akan masuk ke dalam tabel hasil?",
      options: [
        "Semua baris dari `df_kiri` meskipun tidak ada di `df_kanan`",
        "Semua baris dari `df_kanan` meskipun tidak ada di `df_kiri`",
        "Hanya baris yang nilai `'id'`-nya ditemukan di KEDUA tabel (`df_kiri` dan `df_kanan`)",
        "Hanya baris yang memiliki nilai `NaN`"
      ],
      correctIndex: 2,
      explanation:
        "`how='inner'` (Inner Join) hanya mengambil irisan kunci yang cocok di kedua tabel."
    },
    {
      question:
        "Jika kita ingin mempertahankan seluruh daftar siswa di `df_siswa` (tabel kiri) dan mencocokkannya dengan `df_beasiswa` (tabel kanan) tanpa menghilangkan siswa yang tidak dapat beasiswa, jenis `how` apakah yang harus dipakai?",
      options: [
        "`how='inner'`",
        "`how='left'`",
        "`how='right'`",
        "`how='drop'`"
      ],
      correctIndex: 1,
      explanation:
        "`how='left'` (Left Join) menjaga seluruh baris dari DataFrame sebelah kiri; baris yang tidak punya pasangan di tabel kanan akan diberi nilai `NaN`."
    },
    {
      question:
        "Apa nilai yang diberikan Pandas pada kolom tabel kanan ketika sebuah baris pada `Left Join` (`how='left'`) tidak menemukan pasangan kunci yang cocok?",
      options: [
        "`0`",
        "`False`",
        "`NaN` (*Not a Number*)",
        "`'Kosong'`"
      ],
      correctIndex: 2,
      explanation:
        "Nilai yang tidak memiliki pasangan saat proses *join* otomatis diisi dengan `NaN`."
    },
    {
      question:
        "Parameter apakah pada `pd.merge()` yang digunakan untuk menyebutkan nama kolom kunci penghubung jika nama kolom tersebut SAMA di kedua tabel?",
      options: [
        "`by=`",
        "`on=`",
        "`key=`",
        "`index=`"
      ],
      correctIndex: 1,
      explanation:
        "Parameter `on='nama_kolom'` digunakan untuk menentukan kolom kunci yang identik di kedua DataFrame."
    },
    {
      question:
        "Bagaimana jika nama kolom kunci di tabel kiri adalah `'id_divisi'` sedangkan di tabel kanan namanya `'kode_divisi'`?",
      options: [
        "Tidak bisa digabungkan dengan `pd.merge()`",
        "Gunakan parameter `left_on='id_divisi', right_on='kode_divisi'`",
        "Gunakan parameter `on=['id_divisi', 'kode_divisi']`",
        "Gunakan `pd.concat()`"
      ],
      correctIndex: 1,
      explanation:
        "Parameter `left_on` dan `right_on` digunakan saat nama kolom kunci di tabel kiri dan tabel kanan berbeda."
    },
    {
      question:
        "Jenis `how` manakah pada `pd.merge()` yang menggabungkan seluruh kunci dari kedua tabel (baik yang cocok, yang hanya ada di kiri, maupun yang hanya ada di kanan)?",
      options: [
        "`how='inner'`",
        "`how='left'`",
        "`how='right'`",
        "`how='outer'`"
      ],
      correctIndex: 3,
      explanation:
        "`how='outer'` (Full Outer Join) mengambil gabungan (*union*) dari semua kunci di kedua tabel."
    }
  ]
};
