import { DocSection } from "../types";

export const bab5ManipulasiKolomSort: DocSection = {
  id: "pandas-bab5-manipulasi-kolom-sort",
  number: 5,
  title: "Manipulasi Kolom, .apply(), & Pengurutan Data (.sort_values())",
  subtitle:
    "Membuat kolom baru hasil perhitungan (Feature Engineering), mengubah nama kolom (.rename), menghapus kolom (.drop), mentransformasi nilai dengan .apply() & .map(), serta mengurutkan baris tabel menggunakan .sort_values().",
  level: "Menengah",
  readTime: "15 menit",
  filePath: "app/data/pandas-chapters/bab5-manipulasi-kolom-sort.ts",
  summary:
    "Dalam proses pengolahan data (**Data Wrangling**), data mentah jarang langsung siap dipakai. Kita sering perlu menambahkan kolom baru hasil perhitungan antar kolom (seperti `df['total'] = df['harga'] * df['terjual']`), mengganti nilai menggunakan kamus `.map()` atau fungsi kustom `.apply()`, merapikan nama kolom dengan `.rename(columns=...)`, membuang kolom yang tidak relevan dengan `.drop(columns=...)`, serta mengurutkan laporan dari nilai tertinggi ke terendah dengan `.sort_values(by=..., ascending=False)`.",
  keyPoints: [
    "Menambah atau memperbarui kolom cukup menggunakan syntax `df['kolom_baru'] = ekspresi_vektor` (operasi otomatis dihitung per baris tanpa `for` loop).",
    "Method `df['kolom'].apply(fungsi)` menjalankan fungsi Python (atau `lambda x: ...`) pada setiap elemen di dalam `Series` tersebut.",
    "Method `df['kolom'].map(kamus_dict)` menerjemahkan atau memetakan nilai lama menjadi nilai baru berdasarkan pasangan `key: value` pada Dictionary.",
    "Method `df.rename(columns={'lama': 'baru'})` menghasilkan DataFrame dengan nama kolom baru, sedangkan `df.drop(columns=['kolom_a'])` menghapus kolom yang disebutkan.",
    "Method `df.sort_values(by='kolom', ascending=True/False)` mengurutkan baris tabel: `ascending=True` (default, kecil ke besar / A-Z) atau `ascending=False` (besar ke kecil / Z-A)."
  ],
  conceptTable: {
    title: "Operasi Manipulasi Kolom & Pengurutan DataFrame",
    headers: ["Syntax / Method", "Fungsi Utama", "Contoh Penggunaan"],
    rows: [
      [
        "df['baru'] = df['a'] * df['b']",
        "Membuat kolom baru dari operasi vektor antar kolom",
        "df['total'] = df['harga'] * df['terjual']"
      ],
      [
        "df['kol'].apply(fn)",
        "Menerapkan fungsi kustom / lambda ke setiap elemen kolom",
        "df['harga'].apply(lambda x: 'Mahal' if x > 1000000 else 'Murah')"
      ],
      [
        "df['kol'].map(dict)",
        "Memetakan nilai kolom menggunakan Dictionary",
        "df['kode'].map({'JKT': 'Jakarta', 'BDG': 'Bandung'})"
      ],
      [
        "df.rename(columns={...})",
        "Mengubah nama satu atau beberapa kolom",
        "df.rename(columns={'produk': 'nama_produk'})"
      ],
      [
        "df.drop(columns=[...])",
        "Menghapus satu atau beberapa kolom dari DataFrame",
        "df.drop(columns=['id', 'catatan'])"
      ],
      [
        "df.sort_values(by=..., ascending=...)",
        "Mengurutkan baris berdasarkan nilai kolom tertentu",
        "df.sort_values(by='harga', ascending=False)"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab5-ex1",
      title: "1. Membuat Kolom Baru & Menerapkan Fungsi .apply()",
      description:
        "Menghitung kolom omzet dari perkalian vektor harga * terjual, lalu membuat kolom segmen dengan .apply(lambda ...).",
      code: `import pandas as pd

df = pd.DataFrame({
    "produk": ["Mouse", "Keyboard", "Monitor"],
    "harga": [150000, 350000, 2200000],
    "terjual": [20, 10, 5]
})

# 1. Membuat kolom baru dari operasi antar kolom
df["omzet"] = df["harga"] * df["terjual"]

# 2. Membuat kolom baru menggunakan .apply() dan fungsi lambda
df["segmen"] = df["harga"].apply(lambda h: "Premium" if h >= 1000000 else "Reguler")

print(df)`,
      output: `     produk    harga  terjual     omzet   segmen
0     Mouse   150000       20   3000000  Reguler
1  Keyboard   350000       10   3500000  Reguler
2   Monitor  2200000        5  11000000  Premium`,
      lineExplanations: [
        {
          line: 'df["omzet"] = df["harga"] * df["terjual"]',
          explanation:
            "Mengalikan nilai `harga` dan `terjual` di setiap baris secara serentak dan menyimpannya ke kolom baru bernama `omzet`."
        },
        {
          line: 'df["segmen"] = df["harga"].apply(lambda h: "Premium" if h >= 1000000 else "Reguler")',
          explanation:
            "Menjalankan fungsi `lambda` untuk mengecek setiap nilai harga `h`: jika `>= 1000000` menghasilkan `'Premium'`, selain itu `'Reguler'`."
        }
      ]
    },
    {
      id: "pd-bab5-ex2",
      title: "2. Mengubah Nama Kolom (.rename) & Menghapus Kolom (.drop)",
      description:
        "Mengganti nama kolom agar lebih rapi menggunakan .rename(columns=...) dan membuang kolom yang tidak diperlukan dengan .drop(columns=...).",
      code: `import pandas as pd

df = pd.DataFrame({
    "kd": ["P01", "P02"],
    "nm_brg": ["Laptop", "Webcam"],
    "hrg": [8500000, 450000],
    "temp_flag": [1, 0]
})

# Hapus kolom temp_flag
df_bersih = df.drop(columns=["temp_flag"])

# Ubah nama kolom agar mudah dibaca
df_rapi = df_bersih.rename(columns={
    "kd": "kode",
    "nm_brg": "nama_barang",
    "hrg": "harga"
})

print(df_rapi)`,
      output: `   kode  nama_barang    harga
0   P01       Laptop  8500000
1   P02       Webcam   450000`,
      lineExplanations: [
        {
          line: 'df_bersih = df.drop(columns=["temp_flag"])',
          explanation:
            "Menghasilkan DataFrame baru tanpa kolom `'temp_flag'` (DataFrame asli `df` tidak berubah kecuali disimpan kembali)."
        },
        {
          line: 'df_rapi = df_bersih.rename(columns={"kd": "kode", ...})',
          explanation:
            "Memetakan nama kolom lama menjadi nama kolom baru menggunakan Dictionary pada parameter `columns`."
        }
      ]
    },
    {
      id: "pd-bab5-ex3",
      title: "3. Mengurutkan Data dengan .sort_values()",
      description:
        "Mengurutkan daftar siswa berdasarkan nilai matematika tertinggi ke terendah (ascending=False) untuk menentukan peringkat juara kelas.",
      code: `import pandas as pd

df = pd.read_csv("siswa.csv")

# Urutkan berdasarkan matematika dari tertinggi ke terendah
urut_mtk = df.sort_values(by="matematika", ascending=False)
print("=== Top 3 Nilai Matematika ===")
print(urut_mtk[["nama", "kelas", "matematika"]].head(3))`,
      output: `=== Top 3 Nilai Matematika ===
   nama  kelas  matematika
1  Siti    10B          92
3  Dewi    10B          88
0  Budi    10A          85`,
      lineExplanations: [
        {
          line: 'urut_mtk = df.sort_values(by="matematika", ascending=False)',
          explanation:
            "Mengurutkan seluruh baris DataFrame berdasarkan nilai kolom `matematika` secara menurun (descending / terbesar di atas)."
        },
        {
          line: 'print(urut_mtk[["nama", "kelas", "matematika"]].head(3))',
          explanation:
            "Menampilkan 3 baris teratas setelah diurutkan."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `df.drop(["kolom_a"]) # Tanpa parameter columns=`,
      correct: `df.drop(columns=["kolom_a"])`,
      reason:
        "Secara default `df.drop()` mencari label pada **baris** (`axis=0`). Gunakan parameter eksplisit `columns=['kolom_a']` agar Pandas tahu kamu ingin menghapus kolom."
    },
    {
      wrong: `df.sort_values(by="harga", ascending=False)\nprint(df) # Mengira df otomatis berubah`,
      correct: `df_urut = df.sort_values(by="harga", ascending=False)\nprint(df_urut)`,
      reason:
        "Method `.sort_values()`, `.rename()`, dan `.drop()` secara default mengembalikan DataFrame **baru** dan tidak mengubah variabel `df` asli kecuali kamu menyimpannya kembali (`df = df.sort_values(...)`)."
    }
  ],
  tips: [
    "Gunakan `.map(dict)` ketika ingin mengganti kode singkat menjadi teks lengkap (misal `{'IT': 'Teknologi', 'HR': 'Personalia'}`) karena lebih ringkas dibanding menulis `if-else` di `.apply()`.",
    "Kamu bisa mengurutkan berdasarkan lebih dari satu kolom dengan memberikan list pada `by`, contoh: `df.sort_values(by=['kelas', 'matematika'], ascending=[True, False])`."
  ],
  caseStudies: [
    {
      id: "pd-bab5-case1",
      title: "Studi Kasus 1: Perhitungan Gaji Bersih & Pajak Karyawan",
      difficulty: "Mudah",
      instructions:
        "Dari dataset `'karyawan.csv'`, tim Payroll ingin menghitung kolom `'pajak'` sebesar 5% dari `'gaji'` (`(df['gaji'] * 0.05).apply(int)`), lalu menghitung `'gaji_bersih'` (`df['gaji'] - df['pajak']`), dan mengurutkannya dari `'gaji_bersih'` tertinggi ke terendah (`ascending=False`). Cetak kolom `['nama', 'divisi', 'gaji_bersih']` untuk 3 baris teratas (`.head(3)`)!",
      tasks: [
        "Baca `df = pd.read_csv('karyawan.csv')`.",
        "Hitung `df['pajak'] = (df['gaji'] * 0.05).apply(int)` dan `df['gaji_bersih'] = df['gaji'] - df['pajak']`.",
        "Urutkan dengan `df.sort_values(by='gaji_bersih', ascending=False)` lalu cetak `[['nama', 'divisi', 'gaji_bersih']].head(3)`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# 1. Buat kolom pajak dan gaji_bersih:
df["pajak"] = (df["gaji"] * 0.05).apply(int)
df["gaji_bersih"] = 

# 2. Urutkan dari gaji_bersih tertinggi dan ambil 3 teratas:
top_gaji = 

print(top_gaji[["nama", "divisi", "gaji_bersih"]].head(3))`,
      expectedOutput: `     nama   divisi  gaji_bersih
2  Candra       IT      9025000
0    Arif       IT      8550000
3   Dinda  Finance      8075000`,
      hint: 'Isi `df["gaji_bersih"] = df["gaji"] - df["pajak"]` lalu `top_gaji = df.sort_values(by="gaji_bersih", ascending=False)`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
df["pajak"] = (df["gaji"] * 0.05).apply(int)
df["gaji_bersih"] = df["gaji"] - df["pajak"]
top_gaji = df.sort_values(by="gaji_bersih", ascending=False)

print(top_gaji[["nama", "divisi", "gaji_bersih"]].head(3))`
    },
    {
      id: "pd-bab5-case2",
      title: "Studi Kasus 2: Kalkulasi Rata-Rata Nilai & Predikat Kelulusan Siswa",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'siswa.csv'`, hitung kolom `'total'` yang merupakan penjumlahan `matematika + bahasa + ipa`. Kemudian buat kolom `'status'` menggunakan `.apply()`: jika `total >= 260` maka `'Cumlaude'`, selain itu `'Lulus'`. Cetak kolom `['nama', 'kelas', 'total', 'status']`!",
      tasks: [
        "Baca `df = pd.read_csv('siswa.csv')`.",
        "Hitung `df['total'] = df['matematika'] + df['bahasa'] + df['ipa']`.",
        "Buat `df['status'] = df['total'].apply(lambda t: 'Cumlaude' if t >= 260 else 'Lulus')`.",
        "Cetak `df[['nama', 'kelas', 'total', 'status']]`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# 1. Hitung kolom total (matematika + bahasa + ipa):
df["total"] = 

# 2. Buat kolom status dengan .apply():
df["status"] = 

print(df[["nama", "kelas", "total", "status"]])`,
      expectedOutput: `   nama  kelas  total    status
0  Budi    10A    263  Cumlaude
1  Siti    10B    276  Cumlaude
2  Andi    10A    234     Lulus
3  Dewi    10B    272  Cumlaude
4  Riko    10A    207     Lulus`,
      hint: 'Tulis `df["total"] = df["matematika"] + df["bahasa"] + df["ipa"]` dan `df["status"] = df["total"].apply(lambda t: "Cumlaude" if t >= 260 else "Lulus")`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")
df["total"] = df["matematika"] + df["bahasa"] + df["ipa"]
df["status"] = df["total"].apply(lambda t: "Cumlaude" if t >= 260 else "Lulus")

print(df[["nama", "kelas", "total", "status"]])`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab5-ch1",
      title: "Latihan Praktik #1: Membuat Kolom Baru dari Perkalian Antar Kolom",
      difficulty: "Mudah",
      instructions:
        "Diberikan DataFrame `df` berisi `barang`, `harga`, dan `qty`. Buatlah kolom baru bernama `'subtotal'` yang merupakan hasil perkalian kolom `'harga'` dan `'qty'`, lalu cetak `df`!",
      tasks: [
        "Gunakan `df['subtotal'] = df['harga'] * df['qty']`.",
        "Cetak `df`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "barang": ["Buku", "Pulpen", "Tas"],
    "harga": [15000, 5000, 120000],
    "qty": [4, 10, 2]
})

# Buat kolom subtotal di bawah ini:
df["subtotal"] = 

print(df)`,
      expectedOutput: `   barang   harga  qty  subtotal
0    Buku   15000    4     60000
1  Pulpen    5000   10     50000
2     Tas  120000    2    240000`,
      hint: 'Tulis `df["subtotal"] = df["harga"] * df["qty"]`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "barang": ["Buku", "Pulpen", "Tas"],
    "harga": [15000, 5000, 120000],
    "qty": [4, 10, 2]
})

df["subtotal"] = df["harga"] * df["qty"]
print(df)`
    },
    {
      id: "pd-bab5-ch2",
      title: "Latihan Praktik #2: Transformasi Nilai Kolom dengan .apply()",
      difficulty: "Mudah",
      instructions:
        "Gunakan method `.apply()` pada kolom `'nilai'` untuk membuat kolom baru bernama `'predikat'` dengan aturan: jika nilai `>= 80` hasilnya `'Lulus'`, selain itu `'Remedial'`. Cetak `df`!",
      tasks: [
        "Tulis `df['predikat'] = df['nilai'].apply(lambda x: 'Lulus' if x >= 80 else 'Remedial')`.",
        "Cetak `df`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "siswa": ["Alya", "Budi", "Fajar"],
    "nilai": [88, 72, 90]
})

# Buat kolom predikat dengan .apply():
df["predikat"] = 

print(df)`,
      expectedOutput: `   siswa  nilai  predikat
0   Alya     88     Lulus
1   Budi     72  Remedial
2  Fajar     90     Lulus`,
      hint: 'Gunakan `df["nilai"].apply(lambda x: "Lulus" if x >= 80 else "Remedial")`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "siswa": ["Alya", "Budi", "Fajar"],
    "nilai": [88, 72, 90]
})

df["predikat"] = df["nilai"].apply(lambda x: "Lulus" if x >= 80 else "Remedial")
print(df)`
    },
    {
      id: "pd-bab5-ch3",
      title: "Latihan Praktik #3: Memetakan Kode dengan .map()",
      difficulty: "Sedang",
      instructions:
        "Gunakan method `.map()` pada kolom `'kode_kota'` menggunakan dictionary `peta_kota` untuk membuat kolom baru bernama `'nama_kota'`, lalu cetak `df`!",
      tasks: [
        "Panggil `df['kode_kota'].map(peta_kota)` dan simpan ke `df['nama_kota']`.",
        "Cetak `df`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "cabang": ["C1", "C2", "C3"],
    "kode_kota": ["JKT", "BDG", "SBY"]
})

peta_kota = {"JKT": "Jakarta", "BDG": "Bandung", "SBY": "Surabaya"}

# Buat kolom nama_kota dengan .map():
df["nama_kota"] = 

print(df)`,
      expectedOutput: `   cabang  kode_kota  nama_kota
0      C1        JKT    Jakarta
1      C2        BDG    Bandung
2      C3        SBY   Surabaya`,
      hint: 'Tulis `df["nama_kota"] = df["kode_kota"].map(peta_kota)`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "cabang": ["C1", "C2", "C3"],
    "kode_kota": ["JKT", "BDG", "SBY"]
})

peta_kota = {"JKT": "Jakarta", "BDG": "Bandung", "SBY": "Surabaya"}

df["nama_kota"] = df["kode_kota"].map(peta_kota)
print(df)`
    },
    {
      id: "pd-bab5-ch4",
      title: "Latihan Praktik #4: Menghapus & Mengubah Nama Kolom (.drop & .rename)",
      difficulty: "Sedang",
      instructions:
        "Pada DataFrame `df` berikut, hapus kolom `'ket_lama'` menggunakan `.drop(columns=...)`, lalu ubah nama kolom `'nm'` menjadi `'nama'` dan `'skor'` menjadi `'skor_akhir'` menggunakan `.rename(columns=...)`. Cetak DataFrame hasilnya!",
      tasks: [
        "Gunakan `df.drop(columns=['ket_lama'])`.",
        "Gunakan `.rename(columns={'nm': 'nama', 'skor': 'skor_akhir'})`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame({
    "nm": ["Rina", "Tono"],
    "skor": [95, 82],
    "ket_lama": ["x", "y"]
})

# Hapus kolom 'ket_lama' dan rename kolom 'nm' serta 'skor':
hasil = 

print(hasil)`,
      expectedOutput: `   nama  skor_akhir
0  Rina          95
1  Tono          82`,
      hint: 'Gunakan `hasil = df.drop(columns=["ket_lama"]).rename(columns={"nm": "nama", "skor": "skor_akhir"})`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "nm": ["Rina", "Tono"],
    "skor": [95, 82],
    "ket_lama": ["x", "y"]
})

hasil = df.drop(columns=["ket_lama"]).rename(columns={"nm": "nama", "skor": "skor_akhir"})
print(hasil)`
    },
    {
      id: "pd-bab5-ch5",
      title: "Latihan Praktik #5: Mengurutkan Data dari Terbesar ke Terkecil (.sort_values)",
      difficulty: "Menantang",
      instructions:
        "Baca file `'penjualan.csv'`. Buat kolom baru `'total'` (`harga * terjual`), lalu urutkan DataFrame berdasarkan kolom `'total'` dari nilai terbesar ke terkecil (`ascending=False`). Cetak kolom `['produk', 'kategori', 'total']` untuk 3 baris teratas (`.head(3)`)!",
      tasks: [
        "Buat kolom `df['total'] = df['harga'] * df['terjual']`.",
        "Urutkan dengan `df.sort_values(by='total', ascending=False)`.",
        "Pilih kolom `['produk', 'kategori', 'total']` dan panggil `.head(3)`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Buat kolom total, urutkan descending, dan cetak 3 teratas:
df["total"] = 
urut = 

print(urut[["produk", "kategori", "total"]].head(3))`,
      expectedOutput: `     produk    kategori      total
0    Laptop  Elektronik  102000000
3   Monitor  Elektronik   39600000
2  Keyboard   Aksesoris   10500000`,
      hint: 'Hitung `df["total"] = df["harga"] * df["terjual"]` lalu `urut = df.sort_values(by="total", ascending=False)`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
df["total"] = df["harga"] * df["terjual"]
urut = df.sort_values(by="total", ascending=False)

print(urut[["produk", "kategori", "total"]].head(3))`
    }
  ],
  quizzes: [
    {
      question:
        "Bagaimana cara membuat kolom baru bernama `'total'` yang nilainya hasil perkalian kolom `'harga'` dan `'qty'`?",
      options: [
        "`df['total'] = df['harga'] * df['qty']`",
        "`df.add_column('total', harga * qty)`",
        "`df.new('total') = df['harga'] * df['qty']`",
        "`df['harga' * 'qty'] = 'total'`"
      ],
      correctIndex: 0,
      explanation:
        "Menetapkan ekspresi vektor ke `df['nama_kolom_baru']` akan otomatis membuat kolom baru di DataFrame."
    },
    {
      question:
        "Apa kegunaan utama dari method `df['kolom'].apply(fungsi)`?",
      options: [
        "Menghapus kolom dari DataFrame",
        "Menjalankan fungsi kustom (atau `lambda`) pada setiap nilai elemen di dalam kolom tersebut",
        "Mengurutkan kolom berdasarkan abjad",
        "Mengubah nama kolom di tabel"
      ],
      correctIndex: 1,
      explanation:
        "Method `.apply()` mengeksekusi fungsi yang diberikan terhadap setiap elemen di dalam `Series` dan mengembalikan `Series` hasil transformasinya."
    },
    {
      question:
        "Method manakah yang paling tepat untuk memetakan kode `'L'` menjadi `'Laki-laki'` dan `'P'` menjadi `'Perempuan'` menggunakan sebuah Dictionary?",
      options: [
        "`df['gender'].sort_values({'L': 'Laki-laki', 'P': 'Perempuan'})`",
        "`df['gender'].drop({'L': 'Laki-laki', 'P': 'Perempuan'})`",
        "`df['gender'].map({'L': 'Laki-laki', 'P': 'Perempuan'})`",
        "`df['gender'].rename({'L': 'Laki-laki', 'P': 'Perempuan'})`"
      ],
      correctIndex: 2,
      explanation:
        "Method `.map(dict)` pada `Series` digunakan untuk mengganti setiap nilai sesuai pasangan `key: value` di dalam Dictionary."
    },
    {
      question:
        "Bagaimana penulisan syntax yang benar untuk mengubah nama kolom `'hrg'` menjadi `'harga'`?",
      options: [
        "`df.rename(columns={'hrg': 'harga'})`",
        "`df.rename_column('hrg', 'harga')`",
        "`df.columns('hrg' -> 'harga')`",
        "`df.change({'hrg': 'harga'})`"
      ],
      correctIndex: 0,
      explanation:
        "Method `df.rename(columns={'nama_lama': 'nama_baru'})` mengubah nama kolom sesuai dictionary yang diberikan."
    },
    {
      question:
        "Bagaimana cara menghapus kolom `'catatan'` dan `'kode_lama'` dari DataFrame `df`?",
      options: [
        "`df.remove(['catatan', 'kode_lama'])`",
        "`df.delete(columns=['catatan', 'kode_lama'])`",
        "`df.drop(columns=['catatan', 'kode_lama'])`",
        "`df.pop_all(['catatan', 'kode_lama'])`"
      ],
      correctIndex: 2,
      explanation:
        "Method `df.drop(columns=[...])` menghapus satu atau beberapa kolom dari DataFrame."
    },
    {
      question:
        "Jika kita memanggil `df.sort_values(by='gaji', ascending=False)`, bagaimana urutan baris yang dihasilkan?",
      options: [
        "Diurutkan dari gaji terkecil ke terbesar",
        "Diurutkan dari gaji terbesar ke terkecil (menurun / descending)",
        "Diurutkan secara acak",
        "Diurutkan berdasarkan nomor index baris"
      ],
      correctIndex: 1,
      explanation:
        "Parameter `ascending=False` menginstruksikan Pandas untuk mengurutkan nilai dari yang paling besar ke paling kecil (descending)."
    },
    {
      question:
        "Apa nilai default dari parameter `ascending` pada `df.sort_values(by='nama')` jika tidak dituliskan?",
      options: [
        "`False` (Z ke A / besar ke kecil)",
        "`True` (A ke Z / kecil ke besar)",
        "`None` (tidak diurutkan)",
        "`0`"
      ],
      correctIndex: 1,
      explanation:
        "Secara default `ascending=True`, sehingga angka diurutkan dari terkecil ke terbesar dan teks dari A ke Z."
    },
    {
      question:
        "Apa yang terjadi jika kita menulis `df['harga'] = df['harga'] + 5000` sedangkan kolom `'harga'` sudah ada di dalam `df`?",
      options: [
        "Muncul error `ColumnAlreadyExistsError`",
        "Membuat kolom baru bernama `'harga_2'`",
        "Nilai di dalam kolom `'harga'` yang lama akan diperbarui (ditambah 5000 pada setiap baris)",
        "Kolom `'harga'` akan terhapus"
      ],
      correctIndex: 2,
      explanation:
        "Jika nama kolom sudah ada, menetapkan nilai baru ke `df['harga']` akan menimpa/memperbarui kolom tersebut."
    },
    {
      question:
        "Perhatikan kode: `df['nama'].apply(lambda s: s.upper())`. Apa hasil dari kode tersebut?",
      options: [
        "Menghitung panjang karakter setiap nama",
        "Mengubah seluruh teks di kolom `'nama'` menjadi huruf kapital (huruf besar semua)",
        "Mengurutkan nama berdasarkan huruf kapital",
        "Menghapus nama yang menggunakan huruf kecil"
      ],
      correctIndex: 1,
      explanation:
        "Method string `.upper()` di dalam `lambda` dijalankan untuk setiap teks nama pada kolom `'nama'`, menghasilkan `Series` berisi nama berhuruf kapital."
    },
    {
      question:
        "Mengapa memanggil `df.drop(columns=['temp'])` saja tanpa menyimpannya ke variabel (`df = ...`) tidak mengubah isi `df` ketika dicetak kembali?",
      options: [
        "Karena `.drop()` hanya bisa menghapus baris, bukan kolom",
        "Karena secara default operasi `.drop()`, `.rename()`, dan `.sort_values()` mengembalikan DataFrame baru tanpa memodifikasi DataFrame asli secara langsung",
        "Karena kolom `'temp'` bersifat terkunci",
        "Karena harus memanggil `df.save()` terlebih dahulu"
      ],
      correctIndex: 1,
      explanation:
        "Sebagian besar method transformasi di Pandas bersifat *non-mutating* secara default (mengembalikan salinan DataFrame baru) agar data asli tetap aman."
    }
  ]
};
