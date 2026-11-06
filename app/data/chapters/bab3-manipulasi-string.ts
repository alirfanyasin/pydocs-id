import { DocSection } from "../types";

export const bab3ManipulasiString: DocSection = {
  id: "bab3-manipulasi-string",
  number: 3,
  filePath: "app/data/chapters/bab3-manipulasi-string.ts",
  title: "Manipulasi String & Formatting",
  subtitle:
    "Mengolah teks di Python menggunakan indexing, slicing `[awal:akhir]`, `f-string`, fungsi `len()`, serta method bawaan string.",
  level: "Pemula",
  readTime: "12 menit",
  summary:
    "String (`str`) adalah deretan karakter yang digunakan untuk merepresentasikan teks. Di Python, setiap karakter di dalam string memiliki nomor posisi (indeks) yang dimulai dari `0` dari sebelah kiri, atau `-1` dari sebelah kanan. Selain itu, Python menyediakan teknik *slicing* untuk memotong bagian teks, fungsi `len()` untuk menghitung panjang karakter, serta berbagai method bawaan seperti `.strip()`, `.upper()`, `.lower()`, `.title()`, `.replace()`, dan `.split()`.",
  keyPoints: [
    "Indexing `teks[i]`: Mengambil satu karakter pada indeks ke-`i` (huruf pertama adalah `teks[0]`, huruf terakhir adalah `teks[-1]`).",
    "Slicing `teks[awal:akhir]`: Memotong teks mulai dari indeks `awal` hingga **sebelum** indeks `akhir`. Contoh: `teks[:2]` mengambil 2 huruf pertama, `teks[-4:]` mengambil 4 huruf terakhir, dan `teks[::-1]` membalikkan urutan teks.",
    "Fungsi `len(teks)` menghitung jumlah seluruh karakter (termasuk spasi) di dalam string.",
    "Method pembersih & pengubah huruf: `.strip()` (hapus spasi di ujung kiri-kanan), `.upper()` (huruf besar semua), `.lower()` (huruf kecil semua), `.title()` (huruf awal tiap kata kapital).",
    "Method modifikasi & pemecah: `.replace(lama, baru)` untuk mengganti kata, dan `.split(pemisah)` untuk memecah string menjadi `List`.",
    "Formatting modern dengan `f-string`: tulis huruf `f` di depan tanda kutip dan masukkan nama variabel di dalam `{variabel}`."
  ],
  conceptTable: {
    title: "Operasi & Method String Bawaan Python",
    headers: ["Operasi / Method", "Contoh Kode", "Hasil", "Kegunaan"],
    rows: [
      ["len(teks)", 'len("Halo 123")', "8", "Menghitung jumlah karakter termasuk spasi."],
      ["Slicing [:n]", '"ID-2026"[:2]', '"ID"', "Mengambil 2 karakter pertama dari awal string."],
      ["Slicing [-n:]", '"ID-9981"[-4:]', '"9981"', "Mengambil 4 karakter terakhir dari ujung kanan."],
      ["Slicing [::-1]", '"NOHTYP"[::-1]', '"PYTHON"', "Membalikkan urutan karakter dari belakang ke depan."],
      [".strip()", '"  rina  ".strip()', '"rina"', "Menghapus spasi berlebih di ujung kiri dan kanan."],
      [".title() / .lower()", '"RINA".lower()', '"rina"', "Mengubah huruf kapital/kecil pada teks."],
      [".replace(a, b)", '"sulit".replace("sulit", "mudah")', '"mudah"', "Mengganti potongan teks lama dengan teks baru."],
      [".split(sep)", '"A,B,C".split(",")', "['A', 'B', 'C']", "Memecah string berdasarkan pemisah menjadi List."]
    ]
  },
  examples: [
    {
      id: "bab3-ex1",
      title: "1. Indexing, Slicing [awal:akhir], dan Membalikkan Teks [::-1]",
      description:
        "Kita dapat mengekstrak kode awalan dengan `[:2]`, mengambil 4 karakter terakhir dengan `[-4:]`, atau membalikkan kata dengan `[::-1]`.",
      code: `kode_pesanan = "ID-2026-9981"

print("Teks utuh             :", kode_pesanan)
print("Panjang karakter      :", len(kode_pesanan))
print("Huruf pertama [0]     :", kode_pesanan[0])
print("Huruf terakhir [-1]   :", kode_pesanan[-1])

# Slicing untuk mengambil bagian tertentu
print("2 huruf awal [:2]     :", kode_pesanan[:2])
print("4 angka akhir [-4:]   :", kode_pesanan[-4:])

# Membalikkan teks dengan step -1 [::-1]
kata_rahasia = "NOHTYP"
print("Balik teks [::-1]     :", kata_rahasia[::-1].lower())`,
      output: `Teks utuh             : ID-2026-9981
Panjang karakter      : 12
Huruf pertama [0]     : I
Huruf terakhir [-1]   : 1
2 huruf awal [:2]     : ID
4 angka akhir [-4:]   : 9981
Balik teks [::-1]     : python`,
      lineExplanations: [
        {
          line: "kode_pesanan[:2]",
          explanation: "Mengambil karakter dari awal (indeks 0) hingga sebelum indeks 2, yaitu `'ID'`."
        },
        {
          line: "kode_pesanan[-4:]",
          explanation: "Mengambil mulai dari 4 karakter dari belakang sampai ujung akhir string, yaitu `'9981'`."
        },
        {
          line: "kata_rahasia[::-1].lower()",
          explanation: "`[::-1]` membalikkan `'NOHTYP'` menjadi `'PYTHON'`, lalu `.lower()` mengubahnya menjadi huruf kecil `'python'`."
        }
      ]
    },
    {
      id: "bab3-ex2",
      title: "2. Membersihkan Spasi (.strip), Mengubah Huruf (.title), dan Mengganti Kata (.replace)",
      description:
        "Method string dapat digabungkan secara beruntun (*method chaining*), misalnya `.strip().title()`, atau beberapa kali `.replace()`.",
      code: `nama_kotor = "   rina kartika sari   "

# Menggabungkan .strip() dan .title()
nama_rapi = nama_kotor.strip().title()
print(f"Nama Bersih      : {nama_rapi}")
print(f"Panjang Karakter : {len(nama_rapi)}")

# Mengganti kata di dalam kalimat dengan .replace()
kalimat = "Belajar coding itu sulit dan membosankan."
kalimat_positif = kalimat.replace("sulit", "mudah").replace("membosankan", "menyenangkan")
print("Kalimat Baru     :", kalimat_positif)`,
      output: `Nama Bersih      : Rina Kartika Sari
Panjang Karakter : 17
Kalimat Baru     : Belajar coding itu mudah dan menyenangkan.`,
      lineExplanations: [
        {
          line: "nama_rapi = nama_kotor.strip().title()",
          explanation: "Pertama `.strip()` membuang spasi di kiri-kanan, lalu `.title()` mengubah huruf awal tiap kata menjadi kapital."
        },
        {
          line: 'kalimat.replace("sulit", "mudah").replace("membosankan", "menyenangkan")',
          explanation: "Kita bisa memanggil `.replace()` secara beruntun untuk mengganti lebih dari satu kata."
        }
      ]
    },
    {
      id: "bab3-ex3",
      title: "3. Memecah Teks (.split) dan Formatting f-string",
      description:
        "Method `.split(',')` memecah teks yang dipisahkan koma menjadi sebuah `List`. Sedangkan `f-string` memudahkan kita memformat teks dan angka.",
      code: `# Memecah data yang dipisahkan koma (CSV) dengan .split(",")
data_csv = "Andi,Bandung,Developer"
daftar_info = data_csv.split(",")
print("Hasil Split  :", daftar_info)

# Formatting angka ribuan dan desimal dengan f-string
produk = "Laptop Gaming"
harga = 14500000
diskon = 12.567
print(f"Produk       : {produk} | Harga: Rp{harga:,} | Diskon: {diskon:.2f}%")`,
      output: `Hasil Split  : ['Andi', 'Bandung', 'Developer']
Produk       : Laptop Gaming | Harga: Rp14,500,000 | Diskon: 12.57%`,
      lineExplanations: [
        {
          line: 'daftar_info = data_csv.split(",")',
          explanation: "Memecah string setiap kali bertemu tanda koma `,` dan menghasilkan List `['Andi', 'Bandung', 'Developer']`."
        },
        {
          line: 'print(f"... Rp{harga:,} | Diskon: {diskon:.2f}%")',
          explanation: "Format `:,` memberi koma pemisah ribuan, sedangkan `:.2f` membulatkan desimal menjadi 2 angka di belakang titik."
        }
      ]
    }
  ],
  tips: [
    "String di Python bersifat *immutable* (tidak dapat diubah langsung per karakter seperti `kata[0] = 'B'`). Gunakan `.replace()` atau `f-string` untuk menghasilkan string baru."
  ],
  commonMistakes: [
    {
      wrong: 'nama = "Andi"\nprint("Umur saya " + 20)',
      correct: 'nama = "Andi"\nprint(f"Umur saya {20}")',
      reason: "Menggabungkan string dan integer secara langsung dengan `+` akan memicu `TypeError`. Gunakan `f-string` agar angka otomatis diubah menjadi teks."
    }
  ],
  caseStudies: [
    {
      id: "bab3-case1",
      title: "Pembersihan Data Pendaftaran Pasien Rumah Sakit",
      difficulty: "Mudah",
      scenario:
        "Pada sistem pendaftaran online rumah sakit, pasien sering tidak sengaja mengetik spasi berlebih dan huruf kecil semua saat mengisi nama (`'   budi santosowijoyo   '`), sementara bagian administrasi juga perlu mengambil 4 digit nomor urut terakhir dari kode rekam medis (`'RM-2026-0419'`).",
      instructions:
        "Bersihkan variabel `input_nama` menggunakan `.strip()` dan `.title()`, serta ambil 4 karakter terakhir dari `kode_rm` menggunakan *slicing* `[-4:]`!",
      tasks: [
        "Simpan hasil `input_nama.strip().title()` ke variabel `nama_pasien`.",
        "Simpan hasil `kode_rm[-4:]` ke variabel `nomor_antrian`."
      ],
      starterCode: `input_nama = "   budi santosowijoyo   "
kode_rm = "RM-2026-0419"

# Bersihkan nama dan ambil 4 digit terakhir kode_rm:
nama_pasien = 
nomor_antrian = 

print(f"Nama Pasien  : {nama_pasien}")
print(f"Nomor Urut   : {nomor_antrian}")`,
      expectedOutput: `Nama Pasien  : Budi Santosowijoyo
Nomor Urut   : 0419`,
      hint: "Gunakan `input_nama.strip().title()` dan `kode_rm[-4:]`.",
      solutionCode: `input_nama = "   budi santosowijoyo   "
kode_rm = "RM-2026-0419"

nama_pasien = input_nama.strip().title()
nomor_antrian = kode_rm[-4:]

print(f"Nama Pasien  : {nama_pasien}")
print(f"Nomor Urut   : {nomor_antrian}")`
    },
    {
      id: "bab3-case2",
      title: "Pembuatan URL Slug Otomatis pada Portal Berita Online",
      difficulty: "Sedang",
      scenario:
        "Setiap kali jurnalis mengunggah judul berita baru seperti `'  Tips Belajar Python Dasar Untuk Pemula  '`, sistem website berita harus otomatis mengubah judul tersebut menjadi *URL slug* yang bersih (huruf kecil semua dan spasi diganti tanda hubung `-`).",
      instructions:
        "Bersihkan spasi pinggir pada `judul_berita` dengan `.strip()`, ubah ke huruf kecil semua dengan `.lower()`, lalu ganti spasi `' '` menjadi `'-'` menggunakan `.replace(' ', '-')`!",
      tasks: [
        "Gabungkan `.strip().lower().replace(' ', '-')` pada `judul_berita`.",
        "Simpan ke dalam variabel `slug_url`."
      ],
      starterCode: `judul_berita = "  Tips Belajar Python Dasar Untuk Pemula  "

# Buat slug_url dari judul_berita:
slug_url = 

print(f"URL Artikel: https://pydocs.id/berita/{slug_url}")`,
      expectedOutput: `URL Artikel: https://pydocs.id/berita/tips-belajar-python-dasar-untuk-pemula`,
      hint: 'Tulis: `slug_url = judul_berita.strip().lower().replace(" ", "-")`',
      solutionCode: `judul_berita = "  Tips Belajar Python Dasar Untuk Pemula  "

slug_url = judul_berita.strip().lower().replace(" ", "-")

print(f"URL Artikel: https://pydocs.id/berita/{slug_url}")`
    }
  ],
  codingChallenges: [
    {
      id: "bab3-challenge1",
      title: "Membersihkan & Memformat Nama Peserta",
      difficulty: "Mudah",
      instructions:
        "Variabel `nama_kotor` berisi `'   rina kartika sari   '`. Hapus spasi berlebih di kiri-kanannya menggunakan `.strip()` dan ubah menjadi huruf kapital di setiap awal kata menggunakan `.title()` (lihat Contoh 2 pada materi di atas)!",
      tasks: [
        "Gunakan `nama_kotor.strip().title()` dan simpan ke variabel `nama_rapi`.",
        "Cetak hasilnya beserta panjang karakternya menggunakan `len()`."
      ],
      starterCode: `nama_kotor = "   rina kartika sari   "

# Bersihkan spasi dan ubah ke format Title Case:
nama_rapi = 

print(f"Nama Bersih: {nama_rapi}")
print(f"Panjang Karakter: {len(nama_rapi)}")`,
      expectedOutput: `Nama Bersih: Rina Kartika Sari
Panjang Karakter: 17`,
      hint: "Tulis: `nama_rapi = nama_kotor.strip().title()`",
      solutionCode: `nama_kotor = "   rina kartika sari   "

nama_rapi = nama_kotor.strip().title()

print(f"Nama Bersih: {nama_rapi}")
print(f"Panjang Karakter: {len(nama_rapi)}")`
    },
    {
      id: "bab3-challenge2",
      title: "Mengekstrak Kode Negara & Nomor dengan Slicing",
      difficulty: "Mudah",
      instructions:
        "Diberikan `kode_pesanan = 'ID-2026-9981'`. Ambil 2 huruf pertama (`'ID'`) menggunakan slicing `[:2]`, dan 4 angka terakhir (`'9981'`) menggunakan slicing `[-4:]` (lihat Contoh 1 pada materi di atas).",
      tasks: [
        "Isi variabel `negara` dengan `kode_pesanan[:2]`.",
        "Isi variabel `nomor_urut` dengan `kode_pesanan[-4:]`."
      ],
      starterCode: `kode_pesanan = "ID-2026-9981"

# Gunakan teknik slicing [awal:akhir] di bawah ini:
negara = 
nomor_urut = 

print(f"Kode Negara: {negara}")
print(f"Nomor Urut : {nomor_urut}")`,
      expectedOutput: `Kode Negara: ID
Nomor Urut : 9981`,
      hint: "Gunakan `kode_pesanan[:2]` untuk `negara` dan `kode_pesanan[-4:]` untuk `nomor_urut`.",
      solutionCode: `kode_pesanan = "ID-2026-9981"

negara = kode_pesanan[:2]
nomor_urut = kode_pesanan[-4:]

print(f"Kode Negara: {negara}")
print(f"Nomor Urut : {nomor_urut}")`
    },
    {
      id: "bab3-challenge3",
      title: "Mengganti Kata di Dalam Kalimat (.replace)",
      difficulty: "Sedang",
      instructions:
        "Ganti kata `'sulit'` menjadi `'mudah'` dan kata `'membosankan'` menjadi `'menyenangkan'` pada variabel `kalimat` menggunakan method `.replace()` (lihat Contoh 2 pada materi di atas)!",
      tasks: [
        "Gunakan `.replace('sulit', 'mudah')` dan `.replace('membosankan', 'menyenangkan')`.",
        "Cetak kalimat hasil perubahannya."
      ],
      starterCode: `kalimat = "Belajar coding itu sulit dan membosankan."

# Gunakan .replace() untuk memperbaiki kalimat di atas:
kalimat_positif = 

print(kalimat_positif)`,
      expectedOutput: `Belajar coding itu mudah dan menyenangkan.`,
      hint: 'Tulis: `kalimat_positif = kalimat.replace("sulit", "mudah").replace("membosankan", "menyenangkan")`',
      solutionCode: `kalimat = "Belajar coding itu sulit dan membosankan."

kalimat_positif = kalimat.replace("sulit", "mudah").replace("membosankan", "menyenangkan")

print(kalimat_positif)`
    },
    {
      id: "bab3-challenge4",
      title: "Memecah Data CSV Menjadi List (.split)",
      difficulty: "Sedang",
      instructions:
        "Diberikan `data_csv = 'Andi,Bandung,Developer'`. Pecah string tersebut berdasarkan tanda koma (`','`) menggunakan `.split(',')`, lalu cetak hasilnya (lihat Contoh 3 pada materi di atas)!",
      tasks: [
        "Gunakan `data_csv.split(',')` dan simpan ke variabel `daftar_info`.",
        "Cetak isi `daftar_info`."
      ],
      starterCode: `data_csv = "Andi,Bandung,Developer"

# Pecah string berdasarkan tanda koma (","):
daftar_info = 

print("Hasil Split:", daftar_info)`,
      expectedOutput: `Hasil Split: ['Andi', 'Bandung', 'Developer']`,
      hint: 'Tulis: `daftar_info = data_csv.split(",")`',
      solutionCode: `data_csv = "Andi,Bandung,Developer"

daftar_info = data_csv.split(",")

print("Hasil Split:", daftar_info)`
    },
    {
      id: "bab3-challenge5",
      title: "Membalikkan Kata dengan Slicing [::-1]",
      difficulty: "Menantang",
      instructions:
        "Balikkan urutan karakter pada variabel `kata_rahasia = 'NOHTYP'` menggunakan teknik slicing step negatif `[::-1]` dan ubah menjadi huruf kecil semua dengan `.lower()` (lihat Contoh 1 pada materi di atas)!",
      tasks: [
        "Balikkan `kata_rahasia` dengan `[::-1]`.",
        "Ubah hasilnya ke huruf kecil dengan `.lower()`."
      ],
      starterCode: `kata_rahasia = "NOHTYP"

# Balikkan kata dan ubah ke huruf kecil semua:
hasil = 

print("Kata Terbuka:", hasil)`,
      expectedOutput: `Kata Terbuka: python`,
      hint: "Tulis: `hasil = kata_rahasia[::-1].lower()`",
      solutionCode: `kata_rahasia = "NOHTYP"

hasil = kata_rahasia[::-1].lower()

print("Kata Terbuka:", hasil)`
    }
  ],
  quizzes: [
    {
      question: "Apakah output dari kode `'PYTHON'[1:4]`?",
      options: ["PYT", "YTH", "YTHO", "PYTH"],
      correctIndex: 1,
      explanation: "Indeks 0='P', 1='Y', 2='T', 3='H', 4='O'. Slicing `[1:4]` mengambil indeks 1, 2, dan 3 (berhenti sebelum 4), yaitu `'YTH'`."
    },
    {
      question: "Karakter apakah yang diambil oleh `'INDONESIA'[-1]`?",
      options: ["I", "N", "A", "Error"],
      correctIndex: 2,
      explanation: "Indeks negatif `-1` selalu mengacu pada karakter paling akhir dari sebuah string, yaitu `'A'`."
    },
    {
      question: "Method string manakah yang berfungsi menghapus spasi berlebih di ujung kiri dan kanan teks?",
      options: [".clean()", ".trim()", ".strip()", ".remove()"],
      correctIndex: 2,
      explanation: "Di Python, method `.strip()` digunakan untuk menghapus spasi (*whitespace*) di bagian awal dan akhir string."
    },
    {
      question: "Apa hasil dari `'apel,jeruk,mangga'.split(',')`?",
      options: [
        "'apel jeruk mangga'",
        "['apel', 'jeruk', 'mangga']",
        "('apel', 'jeruk', 'mangga')",
        "3"
      ],
      correctIndex: 1,
      explanation: "Method `.split(',')` memecah string berdasarkan tanda koma dan mengembalikan hasilnya dalam bentuk `List`."
    },
    {
      question: "Berapakah nilai yang dihasilkan oleh `len('Halo 123')`?",
      options: ["7", "8", "3", "Halo 123"],
      correctIndex: 1,
      explanation: "Fungsi `len()` menghitung seluruh karakter termasuk spasi: `'H','a','l','o',' ','1','2','3'` berjumlah 8 karakter."
    }
  ]
};
