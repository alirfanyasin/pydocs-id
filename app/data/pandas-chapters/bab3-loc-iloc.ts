import { DocSection } from "../types";

export const bab3LocIloc: DocSection = {
  id: "pandas-bab3-loc-iloc",
  number: 3,
  title: "Seleksi Kolom & Baris dengan .loc[] dan .iloc[]",
  subtitle:
    "Mengambil satu atau beberapa kolom, serta memahami perbedaan seleksi berbasis label (.loc) dan berbasis posisi angka (.iloc).",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "Mengambil bagian tertentu dari sebuah `DataFrame` adalah operasi paling mendasar di Pandas. Untuk memilih **kolom**, kita cukup menuliskan nama kolom di dalam kurung siku `df['nama_kolom']` (menghasilkan `Series`) atau daftar kolom di dalam kurung siku ganda `df[['kol1', 'kol2']]` (menghasilkan `DataFrame`). Sedangkan untuk memilih **baris dan kolom sekaligus**, Pandas menyediakan dua pengindeks khusus yang sangat tegas perbedaannya: **`.loc[baris, kolom]`** yang bekerja berdasarkan **label/nama** dan **`.iloc[baris, kolom]`** yang bekerja berdasarkan **posisi urutan bilangan bulat (`0, 1, 2, ...`)**.",
  keyPoints: [
    "`df['kolom']` dengan satu kurung siku mengembalikan objek 1D `Series`. `df[['kol1', 'kol2']]` dengan kurung siku ganda (list nama kolom) mengembalikan tabel 2D `DataFrame`.",
    "**`.loc[label_baris, label_kolom]`** memilih data berdasarkan **label indeks dan nama kolom**. Sangat penting: saat melakukan slicing dengan `.loc['A':'C']`, **batas akhir `'C'` IKUT DISERTAKAN (inklusif)**!",
    "**`.iloc[posisi_baris, posisi_kolom]`** memilih data berdasarkan **nomor urutan integer mulai dari `0`**. Saat melakukan slicing dengan `.iloc[0:2]`, **batas akhir `2` TIDAK DISERTAKAN (eksklusif)**, persis seperti slicing list Python dan NumPy.",
    "Kita dapat mengambil satu sel spesifik dengan `df.loc['B01', 'harga']` atau `df.iloc[0, 2]`.",
    "Gunakan tanda titik dua `:` untuk memilih semua baris atau semua kolom, misalnya `df.loc[:, ['nama', 'gaji']]` atau `df.iloc[0:3, :]`."
  ],
  conceptTable: {
    title: "Referensi Seleksi Kolom, .loc[] (Label) & .iloc[] (Integer Position)",
    headers: ["Sintaks", "Basis Pencarian", "Penjelasan Hasil"],
    rows: [
      [
        "df['nama']",
        "Nama Kolom",
        "Mengambil 1 kolom sebagai objek Series"
      ],
      [
        "df[['nama', 'nilai']]",
        "List Nama Kolom",
        "Mengambil beberapa kolom sebagai tabel DataFrame"
      ],
      [
        "df.loc['K1']",
        "Label Baris",
        "Mengambil seluruh kolom pada baris berlabel 'K1'"
      ],
      [
        "df.loc['K1', 'gaji']",
        "Label Baris & Kolom",
        "Mengambil satu nilai sel pada baris 'K1' dan kolom 'gaji'"
      ],
      [
        "df.loc['K1':'K3', 'nama':'gaji']",
        "Slicing Label (Inklusif)",
        "Mengambil baris K1 s/d K3 (K3 ikut masuk!)"
      ],
      [
        "df.iloc[0, 2]",
        "Posisi Integer",
        "Mengambil sel pada baris ke-0 dan kolom ke-2"
      ],
      [
        "df.iloc[0:2, 0:3]",
        "Slicing Posisi (Eksklusif)",
        "Mengambil baris indeks 0..1 dan kolom indeks 0..2 (batas akhir tidak ikut)"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab3-ex1",
      title: "1. Mengambil Satu Kolom (Series) vs Beberapa Kolom (DataFrame)",
      description:
        "Membedakan penggunaan kurung siku tunggal df['kolom'] dan kurung siku ganda df[['kol1', 'kol2']].",
      code: `import pandas as pd

df = pd.read_csv("siswa.csv")

# 1. Mengambil 1 kolom -> menghasilkan Series
kolom_nama = df["nama"]
print("Satu Kolom (Series):")
print(kolom_nama)

print("-" * 35)

# 2. Mengambil 2 kolom dengan kurung siku ganda -> menghasilkan DataFrame
rekap_ringkas = df[["nama", "matematika"]]
print("Dua Kolom (DataFrame):")
print(rekap_ringkas)`,
      output: `Satu Kolom (Series):
0    Budi
1    Siti
2    Andi
3    Dewi
4    Riko
Name: nama, dtype: object
-----------------------------------
Dua Kolom (DataFrame):
   nama  matematika
0  Budi          85
1  Siti          92
2  Andi          76
3  Dewi          88
4  Riko          65`,
      lineExplanations: [
        {
          line: 'kolom_nama = df["nama"]',
          explanation: "Mengembalikan satu kolom `'nama'` dalam bentuk objek `Series`."
        },
        {
          line: 'rekap_ringkas = df[["nama", "matematika"]]',
          explanation: "Kurung siku luar adalah pengindeks `df[...]`, sedangkan kurung siku dalam `['nama', 'matematika']` adalah `list` kolom yang diminta."
        }
      ]
    },
    {
      id: "pd-bab3-ex2",
      title: "2. Seleksi Berbasis Label dengan .loc[baris, kolom]",
      description:
        "Mengakses sel dan rentang baris/kolom menggunakan nama label (batas akhir ikut masuk).",
      code: `import pandas as pd

df = pd.DataFrame(
    {
        "produk": ["Laptop", "Mouse", "Keyboard", "Monitor"],
        "stok": [12, 45, 30, 18],
        "harga": [8500000, 150000, 350000, 2200000]
    },
    index=["P1", "P2", "P3", "P4"]
)

# 1. Mengambil satu sel spesifik pada baris 'P2' dan kolom 'harga'
print("Harga P2 (.loc['P2', 'harga']):", df.loc["P2", "harga"])

# 2. Slicing dengan .loc -> batas akhir 'P3' IKUT MASUK!
print("\\nIrisan .loc['P1':'P3', ['produk', 'stok']]:")
print(df.loc["P1":"P3", ["produk", "stok"]])`,
      output: `Harga P2 (.loc['P2', 'harga']): 150000

Irisan .loc['P1':'P3', ['produk', 'stok']]:
      produk  stok
P1    Laptop    12
P2     Mouse    45
P3  Keyboard    30`,
      lineExplanations: [
        {
          line: 'df.loc["P2", "harga"]',
          explanation: "Mengambil nilai pada baris berlabel `'P2'` dan kolom bernama `'harga'` (`150000`)."
        },
        {
          line: 'df.loc["P1":"P3", ["produk", "stok"]]',
          explanation: "Pada `.loc`, irisan `'P1':'P3'` bersifat **inklusif**, sehingga baris `'P1'`, `'P2'`, dan `'P3'` semuanya diambil."
        }
      ]
    },
    {
      id: "pd-bab3-ex3",
      title: "3. Seleksi Berbasis Posisi Urutan dengan .iloc[baris, kolom]",
      description:
        "Mengakses baris dan kolom menggunakan nomor indeks integer mulai dari 0 (batas akhir slicing tidak masuk).",
      code: `import pandas as pd

df = pd.read_csv("toko.csv")
print("Tabel Lengkap:")
print(df)

# 1. Sel pada baris ke-0, kolom ke-1 (kota)
print("\\nSel iloc[0, 1]:", df.iloc[0, 1])

# 2. Slicing 2 baris pertama (0:2) dan 3 kolom pertama (0:3)
print("\\nIrisan iloc[0:2, 0:3]:")
print(df.iloc[0:2, 0:3])`,
      output: `Tabel Lengkap:
     cabang        kota     omzet  pelanggan
0  Cabang A     Jakarta  50000000        420
1  Cabang B     Bandung  35000000        310
2  Cabang C    Surabaya  45000000        390
3  Cabang D  Yogyakarta  30000000        280

Sel iloc[0, 1]: Jakarta

Irisan iloc[0:2, 0:3]:
     cabang     kota     omzet
0  Cabang A  Jakarta  50000000
1  Cabang B  Bandung  35000000`,
      lineExplanations: [
        {
          line: "df.iloc[0, 1]",
          explanation: "Mengambil baris urutan ke-0 (`Cabang A`) dan kolom urutan ke-1 (`kota`), yaitu `'Jakarta'`."
        },
        {
          line: "df.iloc[0:2, 0:3]",
          explanation: "Pada `.iloc`, batas akhir bersifat **eksklusif**, sehingga `0:2` mengambil baris 0 dan 1, sedangkan `0:3` mengambil kolom 0, 1, dan 2."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import pandas as pd
df = pd.read_csv("siswa.csv")
# Lupa kurung siku ganda saat memilih lebih dari satu kolom
sub = df["nama", "kelas"]`,
      correct: `import pandas as pd
df = pd.read_csv("siswa.csv")
# Bungkus daftar nama kolom di dalam list -> kurung siku ganda [[...]]
sub = df[["nama", "kelas"]]`,
      reason:
        "Menulis `df['nama', 'kelas']` mengirim sebuah tuple ke pengindeks kolom dan memicu `KeyError`. Untuk memilih beberapa kolom, kirimkan sebuah `list`: `df[['nama', 'kelas']]`."
    },
    {
      wrong: `import pandas as pd
df = pd.read_csv("siswa.csv")
# Memasukkan nama kolom string ke dalam .iloc
print(df.iloc[0, "nama"])`,
      correct: `import pandas as pd
df = pd.read_csv("siswa.csv")
# Gunakan .loc untuk nama label, atau nomor indeks integer pada .iloc
print(df.loc[0, "nama"])`,
      reason:
        "`.iloc` (**integer** location) hanya menerima angka indeks bulat. Jika ingin menyebutkan nama kolom seperti `'nama'`, gunakan `.loc`."
    }
  ],
  tips: [
    "Ingat singkatan mudahnya: **`.loc` = Label (Nama)**, sedangkan **`.iloc` = Integer (Angka Urutan)**.",
    "Hati-hati saat tabel menggunakan indeks angka default `0, 1, 2`: `df.loc[0:2]` menghasilkan **3 baris** (`0, 1, 2`), sedangkan `df.iloc[0:2]` menghasilkan **2 baris** (`0, 1`)."
  ],
  caseStudies: [
    {
      id: "pd-bab3-case1",
      title: "Studi Kasus 1: Ekstraksi Profil Gaji Karyawan Berdasarkan Kode ID (.loc)",
      difficulty: "Mudah",
      instructions:
        "Tabel data karyawan `df` memiliki label index `'K01'` sampai `'K04'`. Gunakan `.loc` untuk: (1) mencetak gaji milik `'K02'` (`df.loc['K02', 'gaji']`), dan (2) mencetak sub-tabel baris `'K01'` sampai `'K03'` khusus kolom `['nama', 'divisi']`!",
      tasks: [
        "Cetak `Gaji K02: <df.loc['K02', 'gaji']>`.",
        "Cetak sub-tabel `df.loc['K01':'K03', ['nama', 'divisi']]`."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame(
    {
        "nama": ["Arif", "Bunga", "Candra", "Dinda"],
        "divisi": ["IT", "HR", "IT", "Finance"],
        "gaji": [9000000, 7500000, 9500000, 8500000]
    },
    index=["K01", "K02", "K03", "K04"]
)

# 1. Cetak gaji K02 dengan .loc:
print("Gaji K02:", )

# 2. Cetak baris K01 s/d K03 untuk kolom ['nama', 'divisi']:
print()`,
      expectedOutput: `Gaji K02: 7500000
       nama  divisi
K01    Arif      IT
K02   Bunga      HR
K03  Candra      IT`,
      hint: 'Gunakan `df.loc["K02", "gaji"]` dan `df.loc["K01":"K03", ["nama", "divisi"]]`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame(
    {
        "nama": ["Arif", "Bunga", "Candra", "Dinda"],
        "divisi": ["IT", "HR", "IT", "Finance"],
        "gaji": [9000000, 7500000, 9500000, 8500000]
    },
    index=["K01", "K02", "K03", "K04"]
)

print("Gaji K02:", df.loc["K02", "gaji"])
print(df.loc["K01":"K03", ["nama", "divisi"]])`
    },
    {
      id: "pd-bab3-case2",
      title: "Studi Kasus 2: Mengambil Sampel Baris & Kolom dengan Posisi .iloc",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'siswa.csv'`, gunakan `.iloc` untuk: (1) mengambil nama siswa pada baris paling akhir (`df.iloc[-1, 0]`), dan (2) memotong sub-tabel **3 baris pertama (`0:3`)** dan **2 kolom pertama (`0:2`)**!",
      tasks: [
        "Baca `df = pd.read_csv('siswa.csv')`.",
        "Cetak `Siswa Terakhir: <df.iloc[-1, 0]>`.",
        "Cetak `df.iloc[0:3, 0:2]`."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

# 1. Ambil sel baris terakhir (-1), kolom pertama (0) dengan .iloc:
print("Siswa Terakhir:", )

# 2. Ambil 3 baris pertama (0:3) dan 2 kolom pertama (0:2) dengan .iloc:
print()`,
      expectedOutput: `Siswa Terakhir: Riko
   nama  kelas
0  Budi    10A
1  Siti    10B
2  Andi    10A`,
      hint: "Gunakan `df.iloc[-1, 0]` dan `df.iloc[0:3, 0:2]`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("siswa.csv")

print("Siswa Terakhir:", df.iloc[-1, 0])
print(df.iloc[0:3, 0:2])`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab3-ch1",
      title: "Latihan Praktik #1: Mengambil Satu Kolom sebagai Series",
      difficulty: "Mudah",
      instructions:
        "Baca dataset `'penjualan.csv'`, lalu ambil dan cetak hanya kolom `'produk'` sebagai objek `Series`!",
      tasks: [
        "Gunakan `df['produk']`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Ambil kolom 'produk' dan cetak:
`,
      expectedOutput: `0      Laptop
1       Mouse
2    Keyboard
3     Monitor
4     Headset
Name: produk, dtype: object`,
      hint: 'Tulis `print(df["produk"])`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
print(df["produk"])`
    },
    {
      id: "pd-bab3-ch2",
      title: "Latihan Praktik #2: Mengambil Dua Kolom sebagai DataFrame",
      difficulty: "Mudah",
      instructions:
        "Dari dataset `'penjualan.csv'`, ambil kolom `'produk'` dan `'harga'` sekaligus sebagai sebuah `DataFrame` menggunakan kurung siku ganda `[['produk', 'harga']]`, lalu cetak hasilnya!",
      tasks: [
        "Gunakan `df[['produk', 'harga']]`.",
        "Cetak DataFrame yang dihasilkan."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")

# Ambil kolom 'produk' dan 'harga' sebagai DataFrame:
daftar_harga = 

print(daftar_harga)`,
      expectedOutput: `     produk    harga
0    Laptop  8500000
1     Mouse   150000
2  Keyboard   350000
3   Monitor  2200000
4   Headset   250000`,
      hint: 'Tulis `daftar_harga = df[["produk", "harga"]]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("penjualan.csv")
daftar_harga = df[["produk", "harga"]]

print(daftar_harga)`
    },
    {
      id: "pd-bab3-ch3",
      title: "Latihan Praktik #3: Mengakses Sel Tunggal dengan .loc",
      difficulty: "Mudah",
      instructions:
        "Diberikan `DataFrame` `df` dengan index `['A', 'B', 'C']`. Gunakan `.loc` untuk mencetak nilai pada baris `'B'` dan kolom `'skor'`!",
      tasks: [
        "Panggil `df.loc['B', 'skor']`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.DataFrame(
    {"tim": ["Elang", "Harimau", "Rajawali"], "skor": [85, 92, 78]},
    index=["A", "B", "C"]
)

# Cetak nilai baris 'B' kolom 'skor' dengan .loc:
print("Skor B:", )`,
      expectedOutput: `Skor B: 92`,
      hint: 'Gunakan `df.loc["B", "skor"]`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame(
    {"tim": ["Elang", "Harimau", "Rajawali"], "skor": [85, 92, 78]},
    index=["A", "B", "C"]
)

print("Skor B:", df.loc["B", "skor"])`
    },
    {
      id: "pd-bab3-ch4",
      title: "Latihan Praktik #4: Slicing Baris & Kolom dengan .iloc",
      difficulty: "Sedang",
      instructions:
        "Baca dataset `'karyawan.csv'`. Gunakan `.iloc` untuk memotong **baris indeks 1 sampai 3 (`1:4`)** dan **kolom indeks 1 sampai 2 (`1:3`)**, lalu cetak hasilnya!",
      tasks: [
        "Gunakan `df.iloc[1:4, 1:3]`.",
        "Cetak sub-tabel hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")

# Potong baris 1:4 dan kolom 1:3 dengan .iloc:
potongan = 

print(potongan)`,
      expectedOutput: `     nama   divisi
1   Bunga       HR
2  Candra       IT
3   Dinda  Finance`,
      hint: "Tulis `potongan = df.iloc[1:4, 1:3]`.",
      solutionCode: `import pandas as pd

df = pd.read_csv("karyawan.csv")
potongan = df.iloc[1:4, 1:3]

print(potongan)`
    },
    {
      id: "pd-bab3-ch5",
      title: "Latihan Praktik #5: Memilih Semua Baris dan Kolom Tertentu dengan .loc",
      difficulty: "Sedang",
      instructions:
        "Dari dataset `'toko.csv'`, gunakan `.loc[:, ['kota', 'omzet']]` untuk mengambil seluruh baris tetapi hanya untuk kolom `'kota'` dan `'omzet'`, lalu cetak hasilnya!",
      tasks: [
        "Gunakan `df.loc[:, ['kota', 'omzet']]`.",
        "Cetak hasilnya."
      ],
      starterCode: `import pandas as pd

df = pd.read_csv("toko.csv")

# Ambil seluruh baris (:) untuk kolom ['kota', 'omzet'] dengan .loc:
rekap_omzet = 

print(rekap_omzet)`,
      expectedOutput: `         kota     omzet
0     Jakarta  50000000
1     Bandung  35000000
2    Surabaya  45000000
3  Yogyakarta  30000000`,
      hint: 'Tulis `rekap_omzet = df.loc[:, ["kota", "omzet"]]`.',
      solutionCode: `import pandas as pd

df = pd.read_csv("toko.csv")
rekap_omzet = df.loc[:, ["kota", "omzet"]]

print(rekap_omzet)`
    }
  ],
  quizzes: [
    {
      question:
        "Tipe objek apakah yang dikembalikan ketika kita mengambil satu kolom menggunakan kurung siku tunggal `df['harga']`?",
      options: ["DataFrame", "Series", "dict", "tuple"],
      correctIndex: 1,
      explanation:
        "Mengambil satu kolom dengan `df['harga']` menghasilkan objek 1 dimensi `pd.Series`."
    },
    {
      question:
        "Bagaimana sintaks yang BENAR untuk mengambil dua kolom `'nama'` dan `'kota'` sekaligus sebagai sebuah `DataFrame`?",
      options: [
        "df['nama', 'kota']",
        "df[['nama', 'kota']]",
        "df('nama', 'kota')",
        "df.columns['nama', 'kota']"
      ],
      correctIndex: 1,
      explanation:
        "Untuk memilih beberapa kolom, masukkan sebuah `list` berisi nama-nama kolom ke dalam pengindeks `df[...]`, yaitu `df[['nama', 'kota']]`."
    },
    {
      question:
        "Apa perbedaan utama antara pengindeks `.loc[]` dan `.iloc[]` pada DataFrame?",
      options: [
        ".loc hanya untuk baris, sedangkan .iloc hanya untuk kolom",
        ".loc mengakses data berdasarkan nama label index/kolom, sedangkan .iloc mengakses data berdasarkan posisi urutan integer (0, 1, 2, ...)",
        ".loc lebih lambat daripada .iloc",
        "Tidak ada perbedaan"
      ],
      correctIndex: 1,
      explanation:
        "`.loc` berbasis *label*, sedangkan `.iloc` (*integer location*) berbasis posisi indeks bilangan bulat."
    },
    {
      question:
        "Jika sebuah DataFrame memiliki index standar `0, 1, 2, 3, 4`, berapa banyak baris yang diambil oleh `df.loc[1:3]`?",
      options: [
        "2 baris (indeks 1 dan 2)",
        "3 baris (indeks 1, 2, dan 3 karena batas akhir pada .loc bersifat inklusif)",
        "1 baris (indeks 1 saja)",
        "4 baris"
      ],
      correctIndex: 1,
      explanation:
        "Pada `.loc[start:stop]`, batas akhir `stop` **ikut disertakan (inklusif)**, sehingga `1:3` mengambil baris berlabel `1`, `2`, dan `3`."
    },
    {
      question:
        "Berapa banyak baris yang diambil oleh `df.iloc[1:3]`?",
      options: [
        "2 baris (posisi indeks 1 dan 2, karena batas akhir pada .iloc bersifat eksklusif)",
        "3 baris (indeks 1, 2, dan 3)",
        "1 baris",
        "Seluruh baris"
      ],
      correctIndex: 0,
      explanation:
        "Pada `.iloc[start:stop]`, batas akhir `stop` **tidak disertakan (eksklusif)**, sehingga `1:3` hanya mengambil posisi `1` dan `2`."
    },
    {
      question:
        "Bagaimana cara mengambil nilai sel pada **baris paling akhir** dan **kolom pertama** menggunakan `.iloc`?",
      options: [
        "df.iloc[0, -1]",
        "df.iloc[-1, 0]",
        "df.loc[-1, 0]",
        "df.iloc[last, first]"
      ],
      correctIndex: 1,
      explanation:
        "Formatnya adalah `[baris, kolom]`. Baris terakhir adalah `-1` dan kolom pertama adalah `0`, sehingga ditulis `df.iloc[-1, 0]`."
    },
    {
      question:
        "Apa arti dari tanda titik dua `:` pada ekspresi `df.loc[:, 'nama']`?",
      options: [
        "Hanya mengambil baris pertama",
        "Mengambil seluruh baris pada kolom 'nama'",
        "Menghapus kolom 'nama'",
        "Mengambil baris terakhir"
      ],
      correctIndex: 1,
      explanation:
        "Tanda `:` pada posisi baris berarti memilih **seluruh baris** yang ada di dalam `DataFrame`."
    },
    {
      question:
        "Manakah dari kode berikut yang akan menghasilkan **Error**?",
      options: [
        "df.loc[0, 'nama']",
        "df.iloc[0, 1]",
        "df.iloc[0, 'nama']",
        "df[['nama']]"
      ],
      correctIndex: 2,
      explanation:
        "`df.iloc` hanya menerima indeks posisi berupa bilangan bulat (`int`), sehingga memberikan string `'nama'` pada `.iloc` akan memicu `ValueError` / `TypeError`."
    },
    {
      question:
        "Jika kita ingin mengubah nilai gaji pada baris berlabel `'K01'` menjadi `10000000`, sintaks manakah yang paling tepat?",
      options: [
        "df.iloc['K01', 'gaji'] = 10000000",
        "df.loc['K01', 'gaji'] = 10000000",
        "df('K01', 'gaji') = 10000000",
        "df.set('K01', 10000000)"
      ],
      correctIndex: 1,
      explanation:
        "`df.loc[label_baris, nama_kolom] = nilai_baru` adalah cara standar di Pandas untuk mengubah nilai sel tertentu berdasarkan label."
    },
    {
      question:
        "Apa perbedaan tipe hasil antara `df['nama']` (satu kurung siku) dan `df[['nama']]` (dua kurung siku)?",
      options: [
        "Keduanya menghasilkan Series",
        "df['nama'] menghasilkan Series (1D), sedangkan df[['nama']] menghasilkan DataFrame (2D dengan 1 kolom)",
        "df[['nama']] menghasilkan error",
        "df['nama'] menghasilkan DataFrame"
      ],
      correctIndex: 1,
      explanation:
        "Memberikan `list` di dalam pengindeks (`df[['nama']]`) selalu menghasilkan objek tabel `DataFrame`, meskipun list tersebut hanya berisi 1 nama kolom."
    }
  ]
};

