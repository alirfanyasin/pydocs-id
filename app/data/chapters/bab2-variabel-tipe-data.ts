import { DocSection } from "../types";

export const bab2VariabelTipeData: DocSection = {
  id: "bab2-variabel-tipe-data",
  number: 2,
  filePath: "app/data/chapters/bab2-variabel-tipe-data.ts",
  title: "Variabel & Tipe Data Dasar",
  subtitle:
    "Menyimpan informasi ke dalam memori dengan variabel, aturan penamaan PEP 8 (`snake_case`), serta mengenal `str`, `int`, `float`, `bool`, dan `None`.",
  level: "Pemula",
  readTime: "10 menit",
  summary:
    "Variabel adalah wadah bernama di memori komputer untuk menyimpan nilai data. Python menerapkan sistem *Dynamic Typing*, artinya kamu tidak perlu menuliskan tipe data secara eksplisit saat membuat variabel—Python secara otomatis mengenali tipe datanya berdasarkan nilai yang kamu berikan di sebelah kanan tanda sama dengan (`=`). Nilai di dalam variabel juga bersifat dinamis, sehingga dapat diperbarui atau dihitung ulang kapan saja pada baris berikutnya.",
  keyPoints: [
    "Aturan nama variabel: Hanya boleh terdiri dari huruf, angka, dan garis bawah (`_`), serta TIDAK BOLEH diawali dengan angka atau memakai spasi.",
    "Standar komunitas Python (PEP 8) menyarankan gaya `snake_case` (huruf kecil semua dipisah garis bawah `_`, contoh: `nama_lengkap_siswa`).",
    "Lima tipe data primitif utama: `str` (teks), `int` (bilangan bulat), `float` (bilangan desimal dengan titik), `bool` (`True`/`False`), dan `NoneType` (`None`).",
    "Gunakan fungsi bawaan `type(variabel)` untuk memeriksa tipe data dari sebuah nilai atau variabel.",
    "Kita bisa mengisi beberapa variabel dalam satu baris (*Multiple Assignment*: `x, y, z = 10, 20, 30`) atau menukar isi dua variabel (`a, b = b, a`)."
  ],
  conceptTable: {
    title: "Ringkasan Tipe Data Dasar & Operasi Variabel di Python",
    headers: ["Tipe / Teknik", "Kode Python", "Contoh Penulisan", "Keterangan"],
    rows: [
      ["String", "str", 'nama = "Headphone"', "Teks atau deretan karakter di dalam tanda kutip."],
      ["Integer", "int", "stok = 15", "Bilangan bulat positif maupun negatif tanpa desimal."],
      ["Float", "float", "berat = 65.5", "Bilangan desimal menggunakan tanda titik (`.`), bukan koma."],
      ["Boolean", "bool", "tersedia = True", "Nilai logika kebenaran (`True` atau `False`, huruf awal kapital)."],
      ["NoneType", "None", "data = None", "Menandakan ketiadaan nilai (kosong / belum diisi)."],
      ["Cek Tipe", "type(x)", "print(type(stok))", "Menampilkan tipe data variabel, misalnya `<class 'int'>`."]
    ]
  },
  examples: [
    {
      id: "bab2-ex1",
      title: "1. Membuat Variabel & Memeriksa Tipe Datanya dengan type()",
      description:
        "Contoh pembuatan kelima tipe data dasar (`str`, `int`, `float`, `bool`, `None`) beserta cara memeriksa tipe datanya menggunakan fungsi `type()`.",
      code: `nama_produk = "Headphone Bluetooth"  # String (str)
stok = 15                             # Integer (int)
rating = 4.95                         # Float (float)
tersedia = True                       # Boolean (bool)
kode_voucher = None                   # NoneType (None)

print("Produk   :", nama_produk)
print("Stok     :", stok)
print("Tersedia :", tersedia)

# Mengecek tipe data dengan fungsi type()
print(type(nama_produk))
print(type(stok))
print(type(rating))
print(type(tersedia))`,
      output: `Produk   : Headphone Bluetooth
Stok     : 15
Tersedia : True
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>`,
      lineExplanations: [
        {
          line: 'nama_produk = "Headphone Bluetooth"',
          explanation: "Operator `=` menyimpan teks di sebelah kanan ke dalam variabel `nama_produk`."
        },
        {
          line: "tersedia = True",
          explanation: "Nilai boolean `True` dan `False` ditulis tanpa tanda kutip dan wajib diawali huruf kapital."
        },
        {
          line: "print(type(nama_produk))",
          explanation: "Fungsi `type()` mengembalikan kelas tipe data dari variabel tersebut."
        }
      ]
    },
    {
      id: "bab2-ex2",
      title: "2. Multiple Assignment Satu Baris & Menukar Isi Variabel (Swap)",
      description:
        "Di Python, kita dapat mengisi tiga variabel berbeda hanya dalam satu baris (`panjang, lebar, tinggi = 10, 5, 4`), atau menukar isi dua variabel secara langsung (`a, b = b, a`).",
      code: `# 1. Mengisi 3 variabel sekaligus dalam satu baris (Multiple Assignment)
panjang, lebar, tinggi = 10, 5, 4
volume = panjang * lebar * tinggi
print("Volume Balok:", volume)

# 2. Menukar isi dua variabel secara langsung (Swap)
kota_asal = "Surabaya"
kota_tujuan = "Jakarta"

kota_asal, kota_tujuan = kota_tujuan, kota_asal
print("Asal   :", kota_asal)
print("Tujuan :", kota_tujuan)`,
      output: `Volume Balok: 200
Asal   : Jakarta
Tujuan : Surabaya`,
      lineExplanations: [
        {
          line: "panjang, lebar, tinggi = 10, 5, 4",
          explanation: "Mengisi `panjang = 10`, `lebar = 5`, dan `tinggi = 4` secara berurutan hanya dalam satu baris."
        },
        {
          line: "kota_asal, kota_tujuan = kota_tujuan, kota_asal",
          explanation: "Menukar nilai kedua variabel secara instan tanpa memerlukan variabel bantuan."
        }
      ]
    },
    {
      id: "bab2-ex3",
      title: "3. Memperbarui Nilai Variabel & Penulisan Angka Jutaan (_)",
      description:
        "Nilai variabel dapat diperbarui kapan saja dengan menimpanya atau menambahkan nilai baru ke nilai lama (`saldo = saldo + 25000`). Untuk angka jutaan, kita juga boleh memakai garis bawah `_` agar mudah dibaca.",
      code: `# Memperbarui nilai variabel berdasarkan nilai sebelumnya
saldo = 50000
print("Saldo Awal :", saldo)

saldo = saldo + 25000
print("Saldo Akhir:", saldo)

# Menggunakan garis bawah (_) untuk memperjelas angka jutaan
harga_rumah = 750_000_000
print("Harga Rumah:", harga_rumah)`,
      output: `Saldo Awal : 50000
Saldo Akhir: 75000
Harga Rumah: 750000000`,
      lineExplanations: [
        {
          line: "saldo = saldo + 25000",
          explanation: "Python mengambil nilai `saldo` lama (`50000`), menambahkannya dengan `25000`, lalu menyimpan hasil barunya (`75000`) kembali ke variabel `saldo`."
        },
        {
          line: "harga_rumah = 750_000_000",
          explanation: "Karakter `_` di tengah angka hanya sebagai pemisah ribuan visual dan tetap dianggap integer `750000000`."
        }
      ]
    }
  ],
  tips: [
    "Hindari menggunakan nama fungsi bawaan Python sebagai nama variabel, seperti `list = ...`, `str = ...`, `print = ...`, atau `type = ...`, karena akan menimpa fungsi asli Python.",
    "Gunakan huruf kapital semua untuk variabel yang nilainya bersifat konstanta tetap, contohnya: `PI = 3.14159`."
  ],
  commonMistakes: [
    {
      wrong: "1_juara = 'Andi'\ntotal-harga = 5000",
      correct: "juara_1 = 'Andi'\ntotal_harga = 5000",
      reason: "Nama variabel tidak boleh diawali angka dan tidak boleh mengandung tanda kurang (`-`) karena dianggap operasi pengurangan."
    },
    {
      wrong: "berat_badan = 65,5",
      correct: "berat_badan = 65.5",
      reason: "Gunakan titik (`.`) untuk bilangan desimal `float`. Penggunaan koma (`65,5`) akan membuat Python menganggapnya sebagai Tuple `(65, 5)`."
    }
  ],
  caseStudies: [
    {
      id: "bab2-case1",
      title: "Pertukaran Kamar Hotel Dua Tamu (Room Swap)",
      difficulty: "Mudah",
      scenario:
        "Resepsionis Hotel Nusantara mendapati dua keluarga tamu tidak sengaja tertukar kunci kamar: `kamar_201` tercatat atas nama `'Keluarga Pak Budi'`, sedangkan `kamar_202` tercatat atas nama `'Keluarga Pak Hendra'`. Resepsionis harus menukar data penghuni kedua kamar tersebut di sistem.",
      instructions:
        "Gunakan teknik *Swap Variabel* satu baris khas Python untuk menukar isi variabel `kamar_201` dan `kamar_202`, lalu tampilkan hasilnya!",
      tasks: [
        "Tukar nilai `kamar_201` dan `kamar_202` dengan `kamar_201, kamar_202 = kamar_202, kamar_201`.",
        "Pastikan hasil cetakan sesuai dengan Target Output."
      ],
      starterCode: `kamar_201 = "Keluarga Pak Budi"
kamar_202 = "Keluarga Pak Hendra"

# Tukar isi kedua variabel kamar dalam 1 baris:


print(f"Kamar 201 ditempati: {kamar_201}")
print(f"Kamar 202 ditempati: {kamar_202}")`,
      expectedOutput: `Kamar 201 ditempati: Keluarga Pak Hendra
Kamar 202 ditempati: Keluarga Pak Budi`,
      hint: "Tulis: `kamar_201, kamar_202 = kamar_202, kamar_201`",
      solutionCode: `kamar_201 = "Keluarga Pak Budi"
kamar_202 = "Keluarga Pak Hendra"

kamar_201, kamar_202 = kamar_202, kamar_201

print(f"Kamar 201 ditempati: {kamar_201}")
print(f"Kamar 202 ditempati: {kamar_202}")`
    },
    {
      id: "bab2-case2",
      title: "Pencatatan Stok & Nilai Aset Barang di Gudang Minimarket",
      difficulty: "Sedang",
      scenario:
        "Staf gudang minimarket sedang mendata stok minyak goreng. Awalnya terdapat `stok_awal = 120` botol dengan `harga_per_botol = 18500`. Siang harinya datang kiriman baru sebanyak `80` botol sehingga stok diperbarui, lalu staf harus mencetak total nilai aset barang dalam format ribuan Rupiah (`{nilai:,}`).",
      instructions:
        "Perbarui variabel `stok_awal` dengan menambahkan `80`, hitung `total_aset = stok_awal * harga_per_botol`, lalu cetak laporannya menggunakan *f-string*!",
      tasks: [
        "Perbarui `stok_awal = stok_awal + 80`.",
        "Hitung `total_aset = stok_awal * harga_per_botol`.",
        "Cetak menggunakan format ribuan `Rp{total_aset:,}`."
      ],
      starterCode: `nama_barang = "Minyak Goreng 1L"
stok_awal = 120
harga_per_botol = 18500

# 1. Perbarui stok_awal dengan menambah 80 botol:
stok_awal = 

# 2. Hitung total_aset (stok_awal dikali harga_per_botol):
total_aset = 

print(f"Barang     : {nama_barang}")
print(f"Stok Akhir : {stok_awal} botol")
print(f"Total Aset : Rp{total_aset:,}")`,
      expectedOutput: `Barang     : Minyak Goreng 1L
Stok Akhir : 200 botol
Total Aset : Rp3,700,000`,
      hint: "Isi `stok_awal = stok_awal + 80` dan `total_aset = stok_awal * harga_per_botol`.",
      solutionCode: `nama_barang = "Minyak Goreng 1L"
stok_awal = 120
harga_per_botol = 18500

stok_awal = stok_awal + 80
total_aset = stok_awal * harga_per_botol

print(f"Barang     : {nama_barang}")
print(f"Stok Akhir : {stok_awal} botol")
print(f"Total Aset : Rp{total_aset:,}")`
    }
  ],
  codingChallenges: [
    {
      id: "bab2-challenge1",
      title: "Membuat Variabel Profil Produk",
      difficulty: "Mudah",
      instructions:
        "Buatlah 3 variabel bernama `nama_produk`, `stok`, dan `tersedia` sesuai dengan nilai yang diminta, lalu tampilkan hasilnya (lihat Contoh 1 pada materi di atas).",
      tasks: [
        'Isi variabel `nama_produk` dengan string `"Headphone Bluetooth"`',
        "Isi variabel `stok` dengan integer `15`",
        "Isi variabel `tersedia` dengan boolean `True`"
      ],
      starterCode: `# Buat 3 variabel di bawah ini:
nama_produk = "Headphone Bluetooth"
# Lengkapi variabel stok dan tersedia:


print("Produk:", nama_produk)
print("Stok:", stok)
print("Tersedia:", tersedia)`,
      expectedOutput: `Produk: Headphone Bluetooth
Stok: 15
Tersedia: True`,
      hint: "Tulis `stok = 15` dan `tersedia = True` (huruf T kapital) sebelum baris `print()`.",
      solutionCode: `nama_produk = "Headphone Bluetooth"
stok = 15
tersedia = True

print("Produk:", nama_produk)
print("Stok:", stok)
print("Tersedia:", tersedia)`
    },
    {
      id: "bab2-challenge2",
      title: "Menukar Isi Dua Variabel (Swap)",
      difficulty: "Mudah",
      instructions:
        "Terdapat dua variabel: `kota_asal = 'Surabaya'` dan `kota_tujuan = 'Jakarta'`. Tukar nilai kedua variabel tersebut agar `kota_asal` menjadi `'Jakarta'` dan `kota_tujuan` menjadi `'Surabaya'` (lihat Contoh 2 pada materi di atas).",
      tasks: [
        "Gunakan teknik *swap* satu baris (`kota_asal, kota_tujuan = kota_tujuan, kota_asal`).",
        "Jangan mengubah baris `print()` di bagian bawah."
      ],
      starterCode: `kota_asal = "Surabaya"
kota_tujuan = "Jakarta"

# Tukar isi kedua variabel di baris bawah ini:


print("Asal:", kota_asal)
print("Tujuan:", kota_tujuan)`,
      expectedOutput: `Asal: Jakarta
Tujuan: Surabaya`,
      hint: "Gunakan satu baris: `kota_asal, kota_tujuan = kota_tujuan, kota_asal`",
      solutionCode: `kota_asal = "Surabaya"
kota_tujuan = "Jakarta"

kota_asal, kota_tujuan = kota_tujuan, kota_asal

print("Asal:", kota_asal)
print("Tujuan:", kota_tujuan)`
    },
    {
      id: "bab2-challenge3",
      title: "Mencetak Tipe Data Variabel dengan type()",
      difficulty: "Sedang",
      instructions:
        "Cetak tipe data dari ketiga variabel yang sudah disediakan (`teks`, `bulat`, `desimal`) menggunakan fungsi bawaan `type()` (lihat Contoh 1 pada materi di atas).",
      tasks: [
        "Gunakan `print(type(teks))`, `print(type(bulat))`, dan `print(type(desimal))`."
      ],
      starterCode: `teks = "Python 3"
bulat = 2026
desimal = 99.9

# Cetak tipe data masing-masing variabel ke bawah:
print(type(teks))
`,
      expectedOutput: `<class 'str'>
<class 'int'>
<class 'float'>`,
      hint: "Tambahkan `print(type(bulat))` dan `print(type(desimal))` di bawahnya.",
      solutionCode: `teks = "Python 3"
bulat = 2026
desimal = 99.9

print(type(teks))
print(type(bulat))
print(type(desimal))`
    },
    {
      id: "bab2-challenge4",
      title: "Multiple Assignment Satu Baris",
      difficulty: "Sedang",
      instructions:
        "Isi variabel `panjang`, `lebar`, dan `tinggi` dengan nilai `10`, `5`, dan `4` hanya dalam SATU baris kode menggunakan *multiple assignment*, lalu cetak volumenya (lihat Contoh 2 pada materi di atas).",
      tasks: [
        "Tulis `panjang, lebar, tinggi = 10, 5, 4`.",
        "Biarkan baris perhitungan `volume` dan `print()` di bawahnya."
      ],
      starterCode: `# Isi panjang, lebar, tinggi dengan 10, 5, 4 dalam satu baris:


volume = panjang * lebar * tinggi
print("Volume Balok:", volume)`,
      expectedOutput: `Volume Balok: 200`,
      hint: "Tulis: `panjang, lebar, tinggi = 10, 5, 4`",
      solutionCode: `panjang, lebar, tinggi = 10, 5, 4

volume = panjang * lebar * tinggi
print("Volume Balok:", volume)`
    },
    {
      id: "bab2-challenge5",
      title: "Memperbarui Nilai Variabel Secara Bertahap",
      difficulty: "Menantang",
      instructions:
        "Variabel `saldo` awalnya bernilai `50000`. Di baris berikutnya, perbarui nilai `saldo` menjadi `saldo + 25000`, lalu cetak saldo akhir (lihat Contoh 3 pada materi di atas).",
      tasks: [
        "Perbarui variabel `saldo` dengan `saldo = saldo + 25000`.",
        "Pastikan output mencetak `Saldo Akhir: 75000`."
      ],
      starterCode: `saldo = 50000
print("Saldo Awal:", saldo)

# Perbarui nilai variabel saldo dengan menambah 25000:


print("Saldo Akhir:", saldo)`,
      expectedOutput: `Saldo Awal: 50000
Saldo Akhir: 75000`,
      hint: "Tulis: `saldo = saldo + 25000`",
      solutionCode: `saldo = 50000
print("Saldo Awal:", saldo)

saldo = saldo + 25000

print("Saldo Akhir:", saldo)`
    }
  ],
  quizzes: [
    {
      question: "Manakah di bawah ini yang merupakan nama variabel yang VALID di Python?",
      options: ["2nama_siswa", "nama-siswa", "nama_siswa_2", "nama siswa"],
      correctIndex: 2,
      explanation: "Nama variabel hanya boleh berisi huruf, angka, dan underscore (`_`), serta tidak boleh diawali angka maupun menggunakan spasi/tanda kurang."
    },
    {
      question: "Apa tipe data dari nilai `x = 175.5` di Python?",
      options: ["int", "float", "str", "bool"],
      correctIndex: 1,
      explanation: "Angka yang memiliki titik desimal seperti `175.5` bertipe `float` (Floating Point)."
    },
    {
      question: "Manakah penulisan nilai Boolean yang benar di Python?",
      options: ["true dan false", "TRUE dan FALSE", "True dan False", "'True' dan 'False'"],
      correctIndex: 2,
      explanation: "Boolean di Python wajib diawali huruf kapital: `True` dan `False` (tanpa tanda kutip)."
    },
    {
      question: "Fungsi bawaan apakah yang digunakan untuk memeriksa tipe data sebuah variabel?",
      options: ["check()", "typeof()", "type()", "datatype()"],
      correctIndex: 2,
      explanation: "Fungsi `type(variabel)` mengembalikan tipe data dari variabel tersebut."
    },
    {
      question: "Apa output dari kode `a = 10; a = 25; print(a)`?",
      options: ["10", "25", "35", "Error karena a dideklarasikan dua kali"],
      correctIndex: 1,
      explanation: "Nilai variabel dapat diperbarui kapan saja. Nilai `25` menimpa nilai lama `10`, sehingga yang tercetak adalah `25`."
    }
  ]
};
