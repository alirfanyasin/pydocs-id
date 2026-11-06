import { DocSection } from "../types";

export const bab1SeriesDataFrame: DocSection = {
  id: "pandas-bab1-series-dataframe",
  number: 1,
  title: "Pengenalan Pandas: Struktur Data Series & DataFrame",
  subtitle:
    "Memahami pustaka analisis data Pandas, membuat data 1D berlabel dengan pd.Series(), serta membangun tabel 2D dengan pd.DataFrame().",
  level: "Menengah",
  readTime: "13 menit",
  summary:
    "**Pandas** (*Panel Data*) adalah pustaka utama Python untuk pengolahan dan analisis data berbentuk tabel (seperti lembar kerja Excel atau tabel database SQL). Pandas memiliki dua struktur data inti: **`Series`** (data 1 dimensi menyerupai satu kolom tabel yang dilengkapi label indeks) dan **`DataFrame`** (tabel 2 dimensi yang terdiri dari baris dan kolom, di mana setiap kolomnya sebenarnya adalah sebuah objek `Series`). Berbeda dengan `ndarray` NumPy yang seluruh selnya wajib bertipe sama, sebuah `DataFrame` dapat menyimpan kolom teks (`object`), angka bulat (`int64`), dan desimal (`float64`) secara berdampingan.",
  keyPoints: [
    "Gunakan konvensi standar `import pandas as pd` di bagian paling atas kode Python.",
    "`pd.Series(data, index=...)` membuat struktur 1D yang memasangkan setiap nilai dengan label **index** (secara default bernomor `0, 1, 2, ...`). Gunakan `.values` untuk mengambil nilainya dan `.index` untuk melihat daftar label indeksnya.",
    "Kita juga dapat membuat `pd.Series()` langsung dari sebuah `dictionary` Python, di mana *key* otomatis menjadi label `index` dan *value* menjadi isi datanya.",
    "`pd.DataFrame(data)` membuat tabel 2D berbaris dan berkolom. Cara paling umum membuatnya adalah dari **dictionary berisi list** (`{'nama': ['A', 'B'], 'nilai': [80, 90]}`) atau dari **list berisi dictionary**.",
    "Kita dapat mengatur label baris khusus menggunakan parameter `index=[...]` pada saat membuat `Series` maupun `DataFrame`."
  ],
  conceptTable: {
    title: "Referensi Pembuatan Series & DataFrame di Pandas",
    headers: ["Sintaks / Atribut", "Contoh Penggunaan", "Penjelasan Fungsi"],
    rows: [
      [
        "import pandas as pd",
        "import pandas as pd",
        "Mengimpor pustaka Pandas dengan alias standar pd"
      ],
      [
        "pd.Series(list)",
        "s = pd.Series([10, 20, 30])",
        "Membuat Series 1D dengan indeks bawaan 0, 1, 2"
      ],
      [
        "pd.Series(data, index=...)",
        "s = pd.Series([80, 90], index=['A', 'B'])",
        "Membuat Series 1D dengan label indeks kustom"
      ],
      [
        "s.values / s.index",
        "print(s.index)",
        "Mengambil array nilai / daftar label indeks pada Series"
      ],
      [
        "pd.DataFrame(dict)",
        "df = pd.DataFrame({'a': [1, 2], 'b': [3, 4]})",
        "Membuat tabel DataFrame dari dictionary (key = nama kolom)"
      ],
      [
        "pd.DataFrame(list_of_dicts)",
        "df = pd.DataFrame([{'a': 1}, {'a': 2}])",
        "Membuat DataFrame dari daftar dictionary per baris"
      ],
      [
        "pd.DataFrame(..., index=...)",
        "pd.DataFrame(data, index=['R1', 'R2'])",
        "Membuat DataFrame dengan label indeks baris kustom"
      ]
    ]
  },
  examples: [
    {
      id: "pd-bab1-ex1",
      title: "1. Membuat pd.Series dengan Indeks Bawaan & Indeks Kustom",
      description:
        "Membuat objek Series 1 dimensi dari list serta memberikan label indeks khusus.",
      code: `import pandas as pd

# 1. Series dengan indeks otomatis (0, 1, 2)
skor_koor = pd.Series([85, 90, 78])
print("Series Indeks Default:")
print(skor_koor)

print("-" * 35)

# 2. Series dengan label indeks kustom
omzet_cabang = pd.Series([120, 150, 95], index=["Jakarta", "Bandung", "Surabaya"])
print("Series Indeks Kustom:")
print(omzet_cabang)
print("Daftar Index :", omzet_cabang.index)
print("Nilai Bandung:", omzet_cabang["Bandung"])`,
      output: `Series Indeks Default:
0    85
1    90
2    78
dtype: int64
-----------------------------------
Series Indeks Kustom:
Jakarta     120
Bandung     150
Surabaya     95
dtype: int64
Daftar Index : ['Jakarta', 'Bandung', 'Surabaya']
Nilai Bandung: 150`,
      lineExplanations: [
        {
          line: "skor_koor = pd.Series([85, 90, 78])",
          explanation: "Membuat Series 1D. Karena tidak diberi `index=`, Pandas otomatis memberi nomor indeks `0, 1, 2`."
        },
        {
          line: 'omzet_cabang = pd.Series([120, 150, 95], index=["Jakarta", "Bandung", "Surabaya"])',
          explanation: "Mengganti indeks angka menjadi label nama kota sehingga kita bisa mengakses `omzet_cabang['Bandung']`."
        }
      ]
    },
    {
      id: "pd-bab1-ex2",
      title: "2. Membuat DataFrame dari Dictionary of Lists",
      description:
        "Cara paling populer membuat tabel DataFrame menggunakan dictionary di mana setiap key menjadi nama kolom.",
      code: `import pandas as pd

data_siswa = {
    "nama": ["Budi", "Siti", "Andi"],
    "kelas": ["10A", "10B", "10A"],
    "nilai": [88, 94, 79]
}

df_siswa = pd.DataFrame(data_siswa)
print("Tabel DataFrame Siswa:")
print(df_siswa)`,
      output: `Tabel DataFrame Siswa:
   nama  kelas  nilai
0  Budi    10A     88
1  Siti    10B     94
2  Andi    10A     79`,
      lineExplanations: [
        {
          line: 'data_siswa = {"nama": [...], "kelas": [...], "nilai": [...]}',
          explanation: "Setiap *key* (`nama`, `kelas`, `nilai`) menjadi judul kolom, dan setiap elemen list di dalamnya menjadi baris."
        },
        {
          line: "df_siswa = pd.DataFrame(data_siswa)",
          explanation: "Mengonversi dictionary menjadi tabel 2D rapi dengan 3 baris dan 3 kolom."
        }
      ]
    },
    {
      id: "pd-bab1-ex3",
      title: "3. Membuat DataFrame dengan Label Index Kustom & List of Dicts",
      description:
        "Menentukan kode unik sebagai index baris pada DataFrame.",
      code: `import pandas as pd

daftar_produk = [
    {"produk": "Laptop", "stok": 15, "harga": 8500000},
    {"produk": "Mouse", "stok": 50, "harga": 150000},
    {"produk": "Monitor", "stok": 20, "harga": 2100000}
]

df_produk = pd.DataFrame(daftar_produk, index=["P01", "P02", "P03"])
print(df_produk)`,
      output: `      produk  stok    harga
P01   Laptop    15  8500000
P02    Mouse    50   150000
P03  Monitor    20  2100000`,
      lineExplanations: [
        {
          line: "daftar_produk = [{...}, {...}, {...}]",
          explanation: "Setiap dictionary di dalam list merepresentasikan **satu baris data**."
        },
        {
          line: 'df_produk = pd.DataFrame(daftar_produk, index=["P01", "P02", "P03"])',
          explanation: "Memberikan label baris `P01`, `P02`, dan `P03` sebagai pengganti indeks `0, 1, 2`."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      wrong: `import pandas as pd
# Panjang list antar kolom tidak sama (3 elemen vs 2 elemen)
df = pd.DataFrame({"nama": ["A", "B", "C"], "nilai": [80, 90]})`,
      correct: `import pandas as pd
# Pastikan seluruh list di dalam dictionary memiliki jumlah elemen yang sama
df = pd.DataFrame({"nama": ["A", "B", "C"], "nilai": [80, 90, 85]})`,
      reason:
        "Saat membuat `DataFrame` dari dictionary of lists, semua list wajib memiliki panjang yang sama persis. Jika berbeda, Pandas akan memicu `ValueError`."
    }
  ],
  tips: [
    "Gunakan `pd.Series` ketika datamu hanya berupa satu deret pengukuran (1 kolom), dan gunakan `pd.DataFrame` ketika datamu memiliki beberapa atribut/kolom.",
    "Perhatikan huruf kapital pada **`pd.Series`** dan **`pd.DataFrame`** (huruf `S`, `D`, dan `F` wajib huruf besar karena keduanya adalah nama Class!)."
  ],
  caseStudies: [
    {
      id: "pd-bab1-case1",
      title: "Studi Kasus 1: Pencatatan Suhu Udara 4 Kota dengan pd.Series",
      difficulty: "Mudah",
      instructions:
        "Badan cuaca mencatat suhu siang hari di 4 kota: `[32, 24, 34, 29]` dengan label kota `['Jakarta', 'Bandung', 'Surabaya', 'Malang']`. Buatlah objek `pd.Series` bernama `suhu_kota` dengan label index keempat kota tersebut, lalu cetak seluruh Series serta suhu khusus untuk kota `'Bandung'`!",
      tasks: [
        "Buat `suhu_kota = pd.Series([32, 24, 34, 29], index=['Jakarta', 'Bandung', 'Surabaya', 'Malang'])`.",
        "Cetak `suhu_kota`.",
        "Cetak `Suhu Bandung: <suhu_kota['Bandung']>`."
      ],
      starterCode: `import pandas as pd

# Buat Series suhu_kota dengan index nama kota:
suhu_kota = 

print(suhu_kota)
print("Suhu Bandung:", suhu_kota["Bandung"])`,
      expectedOutput: `Jakarta     32
Bandung     24
Surabaya    34
Malang      29
dtype: int64
Suhu Bandung: 24`,
      hint: "Gunakan `pd.Series([32, 24, 34, 29], index=['Jakarta', 'Bandung', 'Surabaya', 'Malang'])`.",
      solutionCode: `import pandas as pd

suhu_kota = pd.Series(
    [32, 24, 34, 29],
    index=["Jakarta", "Bandung", "Surabaya", "Malang"]
)

print(suhu_kota)
print("Suhu Bandung:", suhu_kota["Bandung"])`
    },
    {
      id: "pd-bab1-case2",
      title: "Studi Kasus 2: Menyusun Tabel Inventaris Gudang Minimarket (DataFrame)",
      difficulty: "Sedang",
      instructions:
        "Seorang kepala gudang ingin menyusun tabel inventaris berisi 3 barang dengan kolom `'barang'`: `['Beras', 'Minyak', 'Gula']`, kolom `'stok'`: `[40, 25, 60]`, dan kolom `'harga'`: `[65000, 18000, 15000]`. Buat `DataFrame` dengan label index baris `['B01', 'B02', 'B03']` dan cetak tabelnya!",
      tasks: [
        "Susun dictionary data dengan key `'barang'`, `'stok'`, dan `'harga'`.",
        "Buat `df_gudang = pd.DataFrame(data, index=['B01', 'B02', 'B03'])`.",
        "Cetak `df_gudang`."
      ],
      starterCode: `import pandas as pd

data = {
    "barang": ["Beras", "Minyak", "Gula"],
    "stok": [40, 25, 60],
    "harga": [65000, 18000, 15000]
}

# Buat DataFrame dengan index ["B01", "B02", "B03"]:
df_gudang = 

print(df_gudang)`,
      expectedOutput: `     barang  stok  harga
B01   Beras    40  65000
B02  Minyak    25  18000
B03    Gula    60  15000`,
      hint: 'Tulis `df_gudang = pd.DataFrame(data, index=["B01", "B02", "B03"])`.',
      solutionCode: `import pandas as pd

data = {
    "barang": ["Beras", "Minyak", "Gula"],
    "stok": [40, 25, 60],
    "harga": [65000, 18000, 15000]
}

df_gudang = pd.DataFrame(data, index=["B01", "B02", "B03"])
print(df_gudang)`
    }
  ],
  codingChallenges: [
    {
      id: "pd-bab1-ch1",
      title: "Latihan Praktik #1: Membuat Series Pertama",
      difficulty: "Mudah",
      instructions:
        "Impor `pandas as pd`, lalu buat sebuah `Series` bernama `poin` dari list `[100, 200, 300]` dan cetak hasilnya!",
      tasks: [
        "Buat `poin = pd.Series([100, 200, 300])`.",
        "Cetak `poin`."
      ],
      starterCode: `import pandas as pd

# Buat Series berisi [100, 200, 300]:
poin = 

print(poin)`,
      expectedOutput: `0    100
1    200
2    300
dtype: int64`,
      hint: "Tulis `poin = pd.Series([100, 200, 300])`.",
      solutionCode: `import pandas as pd

poin = pd.Series([100, 200, 300])
print(poin)`
    },
    {
      id: "pd-bab1-ch2",
      title: "Latihan Praktik #2: Membuat Series dari Dictionary",
      difficulty: "Mudah",
      instructions:
        "Buatlah `pd.Series` bernama `stok_buah` langsung dari dictionary `{'Apel': 25, 'Jeruk': 40, 'Mangga': 15}`, lalu cetak Series tersebut!",
      tasks: [
        " Masukkan dictionary ke dalam `pd.Series(...)`.",
        "Cetak `stok_buah`."
      ],
      starterCode: `import pandas as pd

data_buah = {"Apel": 25, "Jeruk": 40, "Mangga": 15}

# Buat Series dari dictionary data_buah:
stok_buah = 

print(stok_buah)`,
      expectedOutput: `Apel      25
Jeruk     40
Mangga    15
dtype: int64`,
      hint: "Tulis `stok_buah = pd.Series(data_buah)`.",
      solutionCode: `import pandas as pd

data_buah = {"Apel": 25, "Jeruk": 40, "Mangga": 15}
stok_buah = pd.Series(data_buah)

print(stok_buah)`
    },
    {
      id: "pd-bab1-ch3",
      title: "Latihan Praktik #3: Membuat DataFrame Sederhana",
      difficulty: "Mudah",
      instructions:
        "Buatlah sebuah `DataFrame` bernama `df` dari dictionary yang memiliki kolom `'kota'`: `['Solo', 'Yogya']` dan kolom `'kode'`: `[10, 20]`, lalu cetak `df`!",
      tasks: [
        "Gunakan `pd.DataFrame({'kota': ['Solo', 'Yogya'], 'kode': [10, 20]})`.",
        "Cetak `df`."
      ],
      starterCode: `import pandas as pd

# Buat DataFrame dengan kolom 'kota' dan 'kode':
df = 

print(df)`,
      expectedOutput: `    kota  kode
0   Solo    10
1  Yogya    20`,
      hint: 'Tulis `df = pd.DataFrame({"kota": ["Solo", "Yogya"], "kode": [10, 20]})`.',
      solutionCode: `import pandas as pd

df = pd.DataFrame({
    "kota": ["Solo", "Yogya"],
    "kode": [10, 20]
})

print(df)`
    },
    {
      id: "pd-bab1-ch4",
      title: "Latihan Praktik #4: Memeriksa Index dan Name pada Series",
      difficulty: "Sedang",
      instructions:
        "Buatlah `pd.Series` bernama `nilai` berisi `[85, 92]` dengan `index=['Ujian1', 'Ujian2']` dan parameter `name='Matematika'`. Cetak Series tersebut!",
      tasks: [
        "Gunakan `pd.Series([85, 92], index=['Ujian1', 'Ujian2'], name='Matematika')`.",
        "Cetak `nilai`."
      ],
      starterCode: `import pandas as pd

# Buat Series dengan index=['Ujian1', 'Ujian2'] dan name='Matematika':
nilai = 

print(nilai)`,
      expectedOutput: `Ujian1    85
Ujian2    92
Name: Matematika, dtype: int64`,
      hint: 'Tulis `nilai = pd.Series([85, 92], index=["Ujian1", "Ujian2"], name="Matematika")`.',
      solutionCode: `import pandas as pd

nilai = pd.Series([85, 92], index=["Ujian1", "Ujian2"], name="Matematika")
print(nilai)`
    },
    {
      id: "pd-bab1-ch5",
      title: "Latihan Praktik #5: Membuat DataFrame dari List of Dictionaries",
      difficulty: "Sedang",
      instructions:
        "Diberikan list berisi 2 dictionary `baris_data`. Ubah menjadi `pd.DataFrame` dengan label `index=['K1', 'K2']`, simpan ke variabel `df_karyawan`, dan cetak hasilnya!",
      tasks: [
        "Gunakan `pd.DataFrame(baris_data, index=['K1', 'K2'])`.",
        "Cetak `df_karyawan`."
      ],
      starterCode: `import pandas as pd

baris_data = [
    {"nama": "Rina", "divisi": "IT"},
    {"nama": "Dodi", "divisi": "HR"}
]

# Buat DataFrame dengan index=["K1", "K2"]:
df_karyawan = 

print(df_karyawan)`,
      expectedOutput: `    nama  divisi
K1  Rina      IT
K2  Dodi      HR`,
      hint: 'Tulis `df_karyawan = pd.DataFrame(baris_data, index=["K1", "K2"])`.',
      solutionCode: `import pandas as pd

baris_data = [
    {"nama": "Rina", "divisi": "IT"},
    {"nama": "Dodi", "divisi": "HR"}
]

df_karyawan = pd.DataFrame(baris_data, index=["K1", "K2"])
print(df_karyawan)`
    }
  ],
  quizzes: [
    {
      question:
        "Apa perbedaan utama antara struktur data `Series` dan `DataFrame` di Pandas?",
      options: [
        "Series hanya untuk teks, sedangkan DataFrame hanya untuk angka",
        "Series adalah data berlabel 1 dimensi (satu kolom), sedangkan DataFrame adalah tabel 2 dimensi yang memiliki baris dan kolom",
        "Series tidak memiliki index, sedangkan DataFrame memiliki index",
        "DataFrame hanya bisa menampung maksimal 2 kolom"
      ],
      correctIndex: 1,
      explanation:
        "`Series` adalah array berlabel 1 dimensi (1 kolom), sedangkan `DataFrame` adalah tabel 2 dimensi yang tersusun dari kumpulan `Series`."
    },
    {
      question:
        "Bagaimana konvensi standar komunitas Python untuk mengimpor pustaka Pandas?",
      options: [
        "import pandas as pn",
        "import pandas as pd",
        "import pandas as pds",
        "from pandas import table"
      ],
      correctIndex: 1,
      explanation:
        "`import pandas as pd` adalah konvensi standar yang digunakan di seluruh dokumentasi resmi dan proyek Data Analysis."
    },
    {
      question:
        "Jika kita membuat `s = pd.Series([10, 20, 30])` tanpa menentukan parameter `index`, apakah label indeks yang dibuat otomatis oleh Pandas?",
      options: [
        "['a', 'b', 'c']",
        "[1, 2, 3]",
        "[0, 1, 2]",
        "Tidak ada indeks"
      ],
      correctIndex: 2,
      explanation:
        "Secara default, Pandas memberikan indeks bilangan bulat berurutan mulai dari `0` (`0, 1, 2, ...`)."
    },
    {
      question:
        "Ketika kita membuat `DataFrame` dari sebuah `dictionary` Python (`pd.DataFrame({'nama': ['A', 'B'], 'skor': [80, 90]})`), bagian manakah yang menjadi **nama kolom**?",
      options: [
        "Nilai di dalam list (['A', 'B'])",
        "Key dari dictionary ('nama' dan 'skor')",
        "Indeks 0 dan 1",
        "Nama variabel dictionary-nya"
      ],
      correctIndex: 1,
      explanation:
        "Pada `pd.DataFrame(dict)`, setiap *key* pada dictionary otomatis menjadi judul kolom tabel."
    },
    {
      question:
        "Atribut apakah yang digunakan untuk melihat daftar label indeks dari sebuah `Series`?",
      options: ["s.labels", "s.keys", "s.index", "s.rows"],
      correctIndex: 2,
      explanation:
        "Atribut `s.index` menyimpan daftar label indeks dari `Series` maupun `DataFrame`."
    },
    {
      question:
        "Jika kita membuat `pd.Series({'Jan': 100, 'Feb': 150})`, apakah yang menjadi label `index` pada Series tersebut?",
      options: [
        "[0, 1]",
        "['Jan', 'Feb']",
        "[100, 150]",
        "Error karena Series tidak menerima dictionary"
      ],
      correctIndex: 1,
      explanation:
        "Saat `pd.Series()` dibuat dari dictionary, *key* dictionary (`'Jan'`, `'Feb'`) otomatis menjadi label `index`."
    },
    {
      question:
        "Apakah sebuah `DataFrame` boleh memiliki kolom dengan tipe data yang berbeda-beda (misalnya kolom 1 teks `str`, kolom 2 angka `int`, kolom 3 desimal `float`)?",
      options: [
        "Tidak boleh, semua kolom wajib bertipe sama seperti NumPy",
        "Boleh, setiap kolom di dalam DataFrame dapat memiliki tipe datanya masing-masing",
        "Hanya boleh jika jumlah barisnya kurang dari 10",
        "Hanya boleh antara int dan float saja"
      ],
      correctIndex: 1,
      explanation:
        "Keunggulan utama `DataFrame` adalah kemampuannya menyimpan berbagai tipe data yang berbeda antar kolom (heterogen antar kolom, homogen di dalam tiap kolom)."
    },
    {
      question:
        "Manakah penulisan nama class yang BENAR untuk membuat tabel di Pandas?",
      options: [
        "pd.dataframe(data)",
        "pd.Dataframe(data)",
        "pd.DataFrame(data)",
        "pd.DATAFRAME(data)"
      ],
      correctIndex: 2,
      explanation:
        "Huruf `D` dan `F` pada `pd.DataFrame` wajib ditulis kapital (PascalCase)."
    },
    {
      question:
        "Apa yang terjadi jika kita membuat `pd.DataFrame({'A': [1, 2], 'B': [10, 20, 30]})`?",
      options: [
        "Kolom A otomatis ditambah angka 0",
        "Baris ke-3 pada kolom B dihapus otomatis",
        "Terjadi ValueError karena panjang list antar kolom tidak sama",
        "Menghasilkan tabel kosong"
      ],
      correctIndex: 2,
      explanation:
        "Seluruh list kolom di dalam dictionary wajib memiliki jumlah elemen yang sama persis."
    },
    {
      question:
        "Parameter apakah yang digunakan pada `pd.DataFrame(data, ...)` untuk memberikan label nama baris khusus seperti `['Baris1', 'Baris2']`?",
      options: [
        "rows=['Baris1', 'Baris2']",
        "index=['Baris1', 'Baris2']",
        "labels=['Baris1', 'Baris2']",
        "keys=['Baris1', 'Baris2']"
      ],
      correctIndex: 1,
      explanation:
        "Parameter `index=[...]` digunakan untuk menentukan label indeks baris pada `Series` dan `DataFrame`."
    }
  ]
};

