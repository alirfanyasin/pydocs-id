import { DocSection } from "../types";

export const bab8StrukturData: DocSection = {
  id: "bab8-struktur-data",
  number: 8,
  filePath: "app/data/chapters/bab8-struktur-data.ts",
  title: "Struktur Data Koleksi (List, Tuple, Set, Dictionary)",
  subtitle:
    "Mengelola sekumpulan data menggunakan keempat struktur data koleksi bawaan Python: `List` `[]`, `Tuple` `()`, `Set` `{}`, dan `Dictionary` `{k: v}`.",
  level: "Dasar",
  readTime: "14 menit",
  summary:
    "Dalam pemrograman nyata, kita hampir selalu bekerja dengan sekumpulan data—seperti daftar belanjaan, koordinat GPS, daftar kota unik, hingga profil pengguna. Python menyediakan 4 struktur data koleksi utama: `List`, `Tuple`, `Set`, dan `Dictionary` yang masing-masing memiliki karakteristik dan kegunaan spesifik.",
  keyPoints: [
    "`List` `[...]`: Berurutan (indeks mulai dari `0`), **bisa diubah** isinya (*mutable*) menggunakan `list[i] = nilai_baru` atau `.append(item)`, serta mendukung fungsi statistik `min()`, `max()`, `sum()`, dan `len()`.",
    "`Tuple` `(...)`: Berurutan, namun **TIDAK DAPAT diubah** setelah dibuat (*immutable*). Mendukung teknik *Tuple Unpacking* seperti `r, g, b = (255, 128, 0)`.",
    "`Set` `{...}` atau `set(list)`: Tidak berurutan dan secara otomatis **menghapus nilai kembar/duplikat** sehingga hanya menyisakan elemen-elemen yang unik.",
    "`Dictionary` `{kunci: nilai}`: Menyimpan data terstruktur berpasangan *Key-Value*. Gunakan `dict[kunci] = nilai` untuk mengubah/menambah data, atau `dict.get('kunci', 'default')` agar aman dari `KeyError`."
  ],
  conceptTable: {
    title: "Tabel Perbandingan 4 Struktur Data Koleksi di Python",
    headers: ["Struktur Data", "Contoh Sintaks", "Berurutan (Indeks)?", "Bisa Diubah (Mutable)?", "Ciri Khas Utama"],
    rows: [
      ["List", '["Buku", "Pulpen"]', "Ya (`0, 1, ...`)", "Ya (`append`, ubah indeks)", "Fleksibel untuk daftar data yang sering berubah."],
      ["Tuple", "(255, 128, 0)", "Ya (`0, 1, ...`)", "Tidak (*Immutable*)", "Aman untuk data tetap; mendukung *Tuple Unpacking*."],
      ["Set", '{"Bali", "Bandung"}', "Tidak punya indeks", "Ya (`add`, `remove`)", "Otomatis menghapus elemen kembar/duplikat."],
      ["Dictionary", '{"stok": 10}', "Diakses lewat *Key*", "Ya (ubah/tambah *Key*)", "Pencarian cepat berbasis pasangan `kunci: nilai`."]
    ]
  },
  examples: [
    {
      id: "bab8-ex1",
      title: "1. Operasi Lengkap pada List [] (Indeks, .append(), min(), max(), sum())",
      description:
        "Cara mengakses indeks `List` (mulai dari `0`), menambah item di akhir dengan `.append()`, mengubah elemen pada indeks tertentu, serta menghitung `min()`, `max()`, dan `sum()`.",
      code: `keranjang = ["Buku", "Pulpen"]
print("Keranjang awal      :", keranjang)
print("Item pertama [0]    :", keranjang[0])

# 1. Menambah item baru ke bagian paling akhir dengan .append()
keranjang.append("Tas")

# 2. Mengubah elemen pada indeks ke-1 ('Pulpen' -> 'Pensil')
keranjang[1] = "Pensil"
print("Setelah diubah      :", keranjang)
print("Total barang (len)  :", len(keranjang))

# 3. Statistik angka pada List dengan min(), max(), dan sum()
penjualan = [120, 85, 200, 150]
print("\\n--- Statistik Penjualan ---")
print("Terkecil (min) :", min(penjualan))
print("Terbesar (max) :", max(penjualan))
print("Total (sum)    :", sum(penjualan))`,
      output: `Keranjang awal      : ['Buku', 'Pulpen']
Item pertama [0]    : Buku
Setelah diubah      : ['Buku', 'Pensil', 'Tas']
Total barang (len)  : 3

--- Statistik Penjualan ---
Terkecil (min) : 85
Terbesar (max) : 200
Total (sum)    : 555`,
      lineExplanations: [
        {
          line: 'keranjang.append("Tas")',
          explanation: "Method `.append()` menambahkan elemen `'Tas'` ke urutan paling akhir dari `List`."
        },
        {
          line: 'keranjang[1] = "Pensil"',
          explanation: "Mengganti elemen pada indeks ke-1 (elemen kedua) dari `'Pulpen'` menjadi `'Pensil'`."
        },
        {
          line: "min(penjualan) / max(penjualan) / sum(penjualan)",
          explanation: "Fungsi bawaan Python untuk mencari angka terkecil (`min`), terbesar (`max`), dan jumlah total (`sum`) di dalam `List`."
        }
      ]
    },
    {
      id: "bab8-ex2",
      title: "2. Tuple Unpacking () & Menghapus Duplikat dengan Set {}",
      description:
        "Mengekstrak isi `Tuple` langsung ke beberapa variabel (*Tuple Unpacking*), serta menggunakan `set()` untuk membuang data kembar.",
      code: `# 1. Tuple bersifat immutable, bisa dibongkar dengan Tuple Unpacking
warna_rgb = (255, 128, 0)
merah, hijau, biru = warna_rgb
print(f"Hasil Unpacking Tuple -> R={merah}, G={hijau}, B={biru}")

# 2. Mengubah List ke Set menggunakan set() untuk menghapus duplikat
kota_kunjungan = ["Bali", "Bandung", "Bali", "Yogyakarta", "Bandung"]
kota_unik = set(kota_kunjungan)

print("\\nList Awal (ada duplikat):", kota_kunjungan)
print("Setelah diubah ke Set   :", sorted(kota_unik))
print("Jumlah Kota Unik (len)  :", len(kota_unik))`,
      output: `Hasil Unpacking Tuple -> R=255, G=128, B=0

List Awal (ada duplikat): ['Bali', 'Bandung', 'Bali', 'Yogyakarta', 'Bandung']
Setelah diubah ke Set   : ['Bali', 'Bandung', 'Yogyakarta']
Jumlah Kota Unik (len)  : 3`,
      lineExplanations: [
        {
          line: "merah, hijau, biru = warna_rgb",
          explanation: "Teknik *Tuple Unpacking* memasukkan nilai ke-0, ke-1, dan ke-2 dari `Tuple` langsung ke variabel `merah`, `hijau`, dan `biru`."
        },
        {
          line: "kota_unik = set(kota_kunjungan)",
          explanation: "Fungsi `set()` otomatis menyaring elemen kembar sehingga `'Bali'` dan `'Bandung'` hanya tersisa masing-masing satu."
        }
      ]
    },
    {
      id: "bab8-ex3",
      title: "3. Mengelola Dictionary {key: value} & Method Aman .get()",
      description:
        "Cara mengakses, memperbarui nilai dengan `+=`, menambah *key* baru, serta mengambil data secara aman menggunakan `.get()`.",
      code: `barang = {
    "nama": "Monitor LED",
    "stok": 10
}

# 1. Memperbarui nilai key yang sudah ada & menambah key baru
barang["stok"] += 5
barang["lokasi"] = "Gudang A"

print("Nama Barang :", barang["nama"])
print("Stok Baru   :", barang["stok"])
print("Lokasi      :", barang["lokasi"])

# 2. Mengakses key yang belum ada secara aman dengan .get(key, default)
garansi = barang.get("garansi", "Tidak diketahui")
print("Info Garansi:", garansi)`,
      output: `Nama Barang : Monitor LED
Stok Baru   : 15
Lokasi      : Gudang A
Info Garansi: Tidak diketahui`,
      lineExplanations: [
        {
          line: 'barang["stok"] += 5',
          explanation: "Menambahkan `5` ke nilai `barang['stok']` saat ini (`10 + 5 = 15`)."
        },
        {
          line: 'barang["lokasi"] = "Gudang A"',
          explanation: "Karena kunci `'lokasi'` belum ada sebelumnya, Python otomatis menambahkan pasangan `'lokasi': 'Gudang A'` ke dalam `Dictionary`."
        },
        {
          line: 'barang.get("garansi", "Tidak diketahui")',
          explanation: "Method `.get()` mencegah `KeyError` dengan mengembalikan nilai cadangan `'Tidak diketahui'` apabila kunci tidak ditemukan."
        }
      ]
    }
  ],
  tips: [
    "Gunakan `dict.get('kunci', 'Nilai Default')` saat membaca data dari `Dictionary` jika kamu tidak yakin apakah kuncinya selalu tersedia.",
    "Ingat bahwa indeks `List` dan `Tuple` selalu dimulai dari `0`, sehingga elemen ke-3 berada di indeks `[2]`."
  ],
  commonMistakes: [
    {
      wrong: "data = (1, 2, 3)\ndata[0] = 99  # Mencoba mengubah isi Tuple",
      correct: "data = [1, 2, 3]\ndata[0] = 99  # Gunakan List jika ingin diubah",
      reason: "`Tuple` `(...)` bersifat *immutable* (tidak dapat diubah isinya setelah dibuat), sehingga mengubah `data[0]` akan memicu `TypeError`."
    }
  ],
  caseStudies: [
    {
      id: "bab8-case1",
      title: "Penyaringan Daftar Hadir Peserta Seminar (Set & len)",
      difficulty: "Mudah",
      scenario:
        "Pada meja registrasi seminar nasional, pemindai kartu (scanner) mencatat nama peserta setiap kali mereka keluar-masuk ruangan: `log_scanner = ['Andi', 'Citra', 'Budi', 'Andi', 'Dewi', 'Citra']`. Panitia ingin mengetahui daftar nama peserta yang unik tanpa duplikat beserta jumlah kehadirannya.",
      instructions:
        "Gunakan fungsi `set()` pada `log_scanner` untuk menghapus nama-nama yang tercatat ganda, lalu hitung jumlah peserta uniknya menggunakan `len()`!",
      tasks: [
        "Konversikan `log_scanner` ke `Set` menggunakan `peserta_unik = set(log_scanner)`.",
        "Hitung jumlahnya di `total_hadir = len(peserta_unik)`."
      ],
      starterCode: `log_scanner = ["Andi", "Citra", "Budi", "Andi", "Dewi", "Citra"]

# 1. Saring nama kembar dengan set():
peserta_unik = 

# 2. Hitung banyak peserta unik dengan len():
total_hadir = 

print("Peserta Unik :", sorted(peserta_unik))
print("Total Hadir  :", total_hadir, "orang")`,
      expectedOutput: `Peserta Unik : ['Andi', 'Budi', 'Citra', 'Dewi']
Total Hadir  : 4 orang`,
      hint: "Tulis `peserta_unik = set(log_scanner)` dan `total_hadir = len(peserta_unik)`.",
      solutionCode: `log_scanner = ["Andi", "Citra", "Budi", "Andi", "Dewi", "Citra"]

peserta_unik = set(log_scanner)
total_hadir = len(peserta_unik)

print("Peserta Unik :", sorted(peserta_unik))
print("Total Hadir  :", total_hadir, "orang")`
    },
    {
      id: "bab8-case2",
      title: "Pencatatan Lokasi Rak & Update Stok Apotek (Tuple & Dictionary)",
      difficulty: "Sedang",
      scenario:
        "Sistem inventaris Apotek Sehat menyimpan posisi rak obat sebagai `Tuple` `posisi_rak = ('Rak B', 3)` dan data stok obat sebagai `Dictionary` `obat = {'nama': 'Paracetamol', 'stok': 40}`. Saat ada pengiriman masuk sebanyak `25` strip baru, apoteker memperbarui stok dan menempelkan label rak pada data obat.",
      instructions:
        "Bongkar `posisi_rak` ke variabel `nama_rak, nomor_baris` (*Tuple Unpacking*), tambahkan `obat['stok'] += 25`, dan simpan `obat['rak'] = nama_rak`!",
      tasks: [
        "Gunakan `nama_rak, nomor_baris = posisi_rak`.",
        "Tambahkan stok dengan `obat['stok'] += 25` dan isi `obat['rak'] = nama_rak`."
      ],
      starterCode: `posisi_rak = ("Rak B", 3)
obat = {
    "nama": "Paracetamol",
    "stok": 40
}

# 1. Bongkar tuple posisi_rak ke nama_rak dan nomor_baris:
nama_rak, nomor_baris = 

# 2. Tambah stok obat sebesar 25 dan tambahkan key "rak" = nama_rak:


print(f"Obat : {obat['nama']} ({obat['rak']} - Baris {nomor_baris})")
print(f"Stok : {obat['stok']} strip")`,
      expectedOutput: `Obat : Paracetamol (Rak B - Baris 3)
Stok : 65 strip`,
      hint: 'Tulis `nama_rak, nomor_baris = posisi_rak`, `obat["stok"] += 25`, dan `obat["rak"] = nama_rak`.',
      solutionCode: `posisi_rak = ("Rak B", 3)
obat = {
    "nama": "Paracetamol",
    "stok": 40
}

nama_rak, nomor_baris = posisi_rak
obat["stok"] += 25
obat["rak"] = nama_rak

print(f"Obat : {obat['nama']} ({obat['rak']} - Baris {nomor_baris})")
print(f"Stok : {obat['stok']} strip")`
    }
  ],
  codingChallenges: [
    {
      id: "bab8-challenge1",
      title: "Mengelola Keranjang Belanja dengan List",
      difficulty: "Mudah",
      instructions:
        "Terdapat list `keranjang = ['Buku', 'Pulpen']`. Tambahkan item `'Tas'` ke akhir list menggunakan `.append()`, lalu ubah elemen indeks ke-1 (`'Pulpen'`) menjadi `'Pensil'`!",
      tasks: [
        "Panggil `keranjang.append('Tas')`.",
        "Ubah `keranjang[1]` menjadi `'Pensil'`."
      ],
      starterCode: `keranjang = ["Buku", "Pulpen"]

# 1. Tambahkan "Tas" dengan .append():

# 2. Ubah indeks ke-1 menjadi "Pensil":


print("Isi Keranjang:", keranjang)
print("Total Barang :", len(keranjang))`,
      expectedOutput: `Isi Keranjang: ['Buku', 'Pensil', 'Tas']
Total Barang : 3`,
      hint: 'Tulis `keranjang.append("Tas")` dan `keranjang[1] = "Pensil"`.',
      solutionCode: `keranjang = ["Buku", "Pulpen"]

keranjang.append("Tas")
keranjang[1] = "Pensil"

print("Isi Keranjang:", keranjang)
print("Total Barang :", len(keranjang))`
    },
    {
      id: "bab8-challenge2",
      title: "Menghitung Statistik List Angka (min, max, sum)",
      difficulty: "Mudah",
      instructions:
        "Gunakan fungsi bawaan `min()`, `max()`, dan `sum()` pada list `penjualan = [120, 85, 200, 150]` untuk mencetak nilai terkecil, terbesar, dan total keseluruhannya!",
      tasks: [
        "Isi variabel `terkecil` dengan `min(penjualan)`.",
        "Isi variabel `terbesar` dengan `max(penjualan)` dan `total` dengan `sum(penjualan)`."
      ],
      starterCode: `penjualan = [120, 85, 200, 150]

terkecil = min(penjualan)
# Lengkapi terbesar dan total di bawah ini:
terbesar = 
total = 

print("Terkecil:", terkecil)
print("Terbesar:", terbesar)
print("Total   :", total)`,
      expectedOutput: `Terkecil: 85
Terbesar: 200
Total   : 555`,
      hint: "Gunakan `max(penjualan)` untuk `terbesar` dan `sum(penjualan)` untuk `total`.",
      solutionCode: `penjualan = [120, 85, 200, 150]

terkecil = min(penjualan)
terbesar = max(penjualan)
total = sum(penjualan)

print("Terkecil:", terkecil)
print("Terbesar:", terbesar)
print("Total   :", total)`
    },
    {
      id: "bab8-challenge3",
      title: "Membongkar Tuple (Tuple Unpacking)",
      difficulty: "Sedang",
      instructions:
        "Diberikan tuple `warna_rgb = (255, 128, 0)`. Ekstrak ketiga nilainya langsung ke dalam variabel `merah`, `hijau`, dan `biru` menggunakan teknik *Tuple Unpacking*!",
      tasks: [
        "Tulis `merah, hijau, biru = warna_rgb`.",
        "Pastikan hasil cetakan sesuai dengan Target Output."
      ],
      starterCode: `warna_rgb = (255, 128, 0)

# Ekstrak tuple warna_rgb ke variabel merah, hijau, biru:


print(f"R={merah}, G={hijau}, B={biru}")`,
      expectedOutput: `R=255, G=128, B=0`,
      hint: "Tulis: `merah, hijau, biru = warna_rgb`",
      solutionCode: `warna_rgb = (255, 128, 0)

merah, hijau, biru = warna_rgb

print(f"R={merah}, G={hijau}, B={biru}")`
    },
    {
      id: "bab8-challenge4",
      title: "Menghapus Data Duplikat Menggunakan Set",
      difficulty: "Sedang",
      instructions:
        "Diberikan list `kota_kunjungan = ['Bali', 'Bandung', 'Bali', 'Yogyakarta', 'Bandung']`. Ubah menjadi `Set` menggunakan `set()` untuk menghapus duplikat, lalu hitung berapa banyak kota unik yang dikunjungi!",
      tasks: [
        "Konversikan `kota_kunjungan` menjadi `Set` dengan `set(kota_kunjungan)`.",
        "Cetak jumlah kota unik dengan `len()`."
      ],
      starterCode: `kota_kunjungan = ["Bali", "Bandung", "Bali", "Yogyakarta", "Bandung"]

# Ubah ke set untuk menyaring duplikat:
kota_unik = 

print("Daftar Unik (Terurut):", sorted(kota_unik))
print("Jumlah Kota Unik     :", len(kota_unik))`,
      expectedOutput: `Daftar Unik (Terurut): ['Bali', 'Bandung', 'Yogyakarta']
Jumlah Kota Unik     : 3`,
      hint: "Tulis: `kota_unik = set(kota_kunjungan)`",
      solutionCode: `kota_kunjungan = ["Bali", "Bandung", "Bali", "Yogyakarta", "Bandung"]

kota_unik = set(kota_kunjungan)

print("Daftar Unik (Terurut):", sorted(kota_unik))
print("Jumlah Kota Unik     :", len(kota_unik))`
    },
    {
      id: "bab8-challenge5",
      title: "Mengupdate Stok Barang pada Dictionary",
      difficulty: "Menantang",
      instructions:
        "Diberikan dictionary `barang = {'nama': 'Monitor LED', 'stok': 10}`. Tambahkan jumlah stok sebanyak `5` sehingga menjadi `15`, dan tambahkan key baru `'lokasi'` dengan nilai `'Gudang A'`!",
      tasks: [
        "Perbarui nilai `barang['stok']` menjadi `15` (gunakan `barang['stok'] += 5`).",
        "Tambahkan key baru `barang['lokasi'] = 'Gudang A'`."
      ],
      starterCode: `barang = {
    "nama": "Monitor LED",
    "stok": 10
}

# Tambah stok sebesar 5 dan tambahkan key "lokasi":


print(f"Barang: {barang['nama']}")
print(f"Stok  : {barang['stok']}")
print(f"Lokasi: {barang['lokasi']}")`,
      expectedOutput: `Barang: Monitor LED
Stok  : 15
Lokasi: Gudang A`,
      hint: 'Gunakan `barang["stok"] += 5` dan `barang["lokasi"] = "Gudang A"`.',
      solutionCode: `barang = {
    "nama": "Monitor LED",
    "stok": 10
}

barang["stok"] += 5
barang["lokasi"] = "Gudang A"

print(f"Barang: {barang['nama']}")
print(f"Stok  : {barang['stok']}")
print(f"Lokasi: {barang['lokasi']}")`
    }
  ],
  quizzes: [
    {
      question: "Struktur data manakah yang secara otomatis menghapus nilai kembar/duplikat?",
      options: ["List", "Tuple", "Set", "Dictionary"],
      correctIndex: 2,
      explanation: "`Set` (`{...}`) adalah struktur data himpunan di Python yang hanya menyimpan elemen-elemen unik tanpa duplikasi."
    },
    {
      question: "Pada list `buah = ['Apel', 'Jeruk', 'Mangga', 'Pisang']`, apakah nilai dari `buah[2]`?",
      options: ["Jeruk", "Mangga", "Pisang", "Apel"],
      correctIndex: 1,
      explanation: "Indeks dimulai dari `0` (`'Apel'`), `1` (`'Jeruk'`), sehingga indeks ke-`2` adalah `'Mangga'`."
    },
    {
      question: "Method apakah yang digunakan untuk menambahkan satu elemen baru ke bagian paling akhir sebuah `List`?",
      options: [".add()", ".push()", ".append()", ".insert_last()"],
      correctIndex: 2,
      explanation: "Pada `List` Python, method `.append(item)` digunakan untuk menambahkan elemen di ujung akhir list."
    },
    {
      question: "Mengapa kode `data = (1, 2, 3); data[0] = 99` menghasilkan `TypeError`?",
      options: [
        "Karena indeks Tuple dimulai dari 1",
        "Karena Tuple bersifat immutable (tidak dapat diubah isinya setelah dibuat)",
        "Karena angka 99 terlalu besar",
        "Karena Tuple tidak mendukung angka integer"
      ],
      correctIndex: 1,
      explanation: "`Tuple` `(...)` bersifat *immutable*, artinya elemen di dalamnya tidak bisa diubah, ditambah, atau dihapus setelah dibuat."
    },
    {
      question: "Pada Dictionary `user = {'nama': 'Budi', 'umur': 20}`, cara manakah yang paling aman untuk mengambil nilai kunci `'kota'` tanpa menyebabkan `KeyError` jika kuncinya belum ada?",
      options: [
        "user['kota']",
        "user.get('kota', 'Tidak diketahui')",
        "user.find('kota')",
        "user.kota"
      ],
      correctIndex: 1,
      explanation: "Method `.get(key, default)` mengembalikan nilai default jika kunci tidak ditemukan, sehingga program tetap aman dari `KeyError`."
    }
  ]
};
