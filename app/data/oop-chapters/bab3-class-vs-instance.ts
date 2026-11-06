import { DocSection } from "../types";

export const bab3ClassVsInstance: DocSection = {
  id: "oop-bab3-class-vs-instance",
  number: 3,
  filePath: "app/data/oop-chapters/bab3-class-vs-instance.ts",
  title: "Instance vs Class Variable & Method (@classmethod, @staticmethod)",
  subtitle:
    "Membedakan atribut milik pribadi objek (*Instance Variable*) dan atribut milik bersama (*Class Variable*), serta menguasai `@classmethod` dan `@staticmethod`.",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "Di dalam sebuah `class`, terdapat dua jenis atribut: **Instance Variable** (didefinisikan di dalam `__init__` dengan `self.nama_atribut`, nilainya unik untuk setiap objek) dan **Class Variable** (didefinisikan langsung di bawah baris `class` di luar method, nilainya dibagi bersama oleh seluruh objek dari class tersebut). Selain itu, Python menyediakan tiga jenis method: *Instance Method* (`self`), **Class Method** (`@classmethod` dengan parameter `cls`), dan **Static Method** (`@staticmethod` tanpa parameter `self` maupun `cls`).",
  keyPoints: [
    "**Instance Variable** (`self.atribut`): Milik masing-masing objek. Mengubah `obj1.nama` tidak akan mengubah `obj2.nama`.",
    "**Class Variable** (`NamaClass.atribut`): Dideklarasikan di luar `__init__()`. Nilainya dipakai bersama oleh semua objek (contoh: `pajak = 0.11` atau penghitung `jumlah_objek = 0`).",
    "Untuk mengubah *Class Variable* secara global bagi seluruh objek, ubahlah melalui nama class-nya (`NamaClass.atribut = nilai_baru`) atau melalui `@classmethod` (`cls.atribut = nilai_baru`).",
    "`@classmethod`: Menggunakan parameter pertama `cls` (merujuk pada `class`, bukan objek). Sering dipakai untuk mengakses/mengubah *Class Variable* atau membuat *Alternative Constructor*.",
    "`@staticmethod`: Fungsi utilitas di dalam `class` yang tidak membutuhkan `self` maupun `cls`, dipanggil langsung lewat `NamaClass.nama_method()`."
  ],
  conceptTable: {
    title: "Perbandingan Instance Method, @classmethod, dan @staticmethod",
    headers: ["Jenis Method", "Dekorator", "Parameter Pertama", "Akses ke self (Objek)?", "Akses ke cls (Class)?"],
    rows: [
      ["Instance Method", "(Tidak ada)", "self", "Ya (Penuh)", "Ya (lewat `self.__class__`)"],
      ["Class Method", "@classmethod", "cls", "Tidak", "Ya (Mengakses/mengubah Class Variable)"],
      ["Static Method", "@staticmethod", "(Bebas / Tidak wajib)", "Tidak", "Tidak (Fungsi bantuan mandiri)"]
    ]
  },
  examples: [
    {
      id: "oop-bab3-ex1",
      title: "1. Perbedaan Class Variable vs Instance Variable & Penghitung Objek",
      description:
        "Menggunakan *Class Variable* `total_karyawan` untuk menghitung secara otomatis berapa banyak objek `Karyawan` yang telah diciptakan.",
      code: `class Karyawan:
    # Class Variable (milik bersama seluruh objek)
    perusahaan = "PT Teknologi Nusantara"
    total_karyawan = 0

    def __init__(self, nama, posisi):
        # Instance Variable (unik milik masing-masing objek)
        self.nama = nama
        self.posisi = posisi
        # Menambah Class Variable setiap kali objek baru dibuat
        Karyawan.total_karyawan += 1

k1 = Karyawan("Andi", "Backend Engineer")
k2 = Karyawan("Siti", "Data Analyst")
k3 = Karyawan("Budi", "UI/UX Designer")

print("Perusahaan k1  :", k1.perusahaan)
print("Perusahaan k2  :", k2.perusahaan)
print("Total Karyawan :", Karyawan.total_karyawan)`,
      output: `Perusahaan k1  : PT Teknologi Nusantara
Perusahaan k2  : PT Teknologi Nusantara
Total Karyawan : 3`,
      lineExplanations: [
        {
          line: "perusahaan = \"PT Teknologi Nusantara\"\n    total_karyawan = 0",
          explanation: "Kedua variabel ini ditulis di luar `__init__()`, sehingga menjadi *Class Variable* yang dibagi bersama ke seluruh objek."
        },
        {
          line: "Karyawan.total_karyawan += 1",
          explanation: "Setiap kali `Karyawan(...)` dipanggil, `__init__` berjalan dan menambah `Karyawan.total_karyawan` sebesar 1."
        }
      ]
    },
    {
      id: "oop-bab3-ex2",
      title: "2. Menggunakan @classmethod untuk Mengubah Class Variable & Alternative Constructor",
      description:
        "Method dengan dekorator `@classmethod` menerima `cls` sebagai parameter pertama dan dapat dipanggil langsung dari nama class-nya.",
      code: `class ProdukToko:
    persen_diskon = 0  # Class Variable

    def __init__(self, nama, harga):
        self.nama = nama
        self.harga = harga

    def harga_akhir(self):
        potongan = self.harga * (ProdukToko.persen_diskon / 100)
        return int(self.harga - potongan)

    @classmethod
    def atur_diskon_global(cls, persen_baru):
        cls.persen_diskon = persen_baru

    @classmethod
    def dari_teks_csv(cls, teks):
        nama_item, harga_str = teks.split(",")
        return cls(nama_item, int(harga_str))

# Membuat objek menggunakan Alternative Constructor @classmethod
item = ProdukToko.dari_teks_csv("Headset Gaming,300000")
print(f"Harga awal {item.nama}   : Rp{item.harga_akhir():,}")

# Mengubah diskon untuk seluruh produk menggunakan @classmethod
ProdukToko.atur_diskon_global(20)
print(f"Setelah diskon 20%      : Rp{item.harga_akhir():,}")`,
      output: `Harga awal Headset Gaming   : Rp300,000
Setelah diskon 20%      : Rp240,000`,
      lineExplanations: [
        {
          line: "@classmethod\n    def atur_diskon_global(cls, persen_baru):",
          explanation: "Dekorator `@classmethod` membuat method menerima `cls` (yaitu class `ProdukToko`) sehingga bisa mengubah `cls.persen_diskon`."
        },
        {
          line: "return cls(nama_item, int(harga_str))",
          explanation: "Memanggil `cls(...)` di dalam `@classmethod` sama artinya dengan membuat objek baru `ProdukToko(...)`."
        }
      ]
    },
    {
      id: "oop-bab3-ex3",
      title: "3. Menggunakan @staticmethod untuk Fungsi Utilitas di Dalam Class",
      description:
        "`@staticmethod` digunakan ketika sebuah fungsi berkaitan erat dengan topik `class`, tetapi tidak perlu membaca atribut `self` maupun `cls`.",
      code: `class KonverterSuhu:
    @staticmethod
    def celcius_ke_fahrenheit(c):
        return (c * 9 / 5) + 32

    @staticmethod
    def apakah_suhu_beku(c):
        return c <= 0

# Dapat dipanggil langsung melalui nama Class tanpa membuat objek
print("25°C dalam Fahrenheit :", KonverterSuhu.celcius_ke_fahrenheit(25))
print("Apakah -4°C membeku?  :", KonverterSuhu.apakah_suhu_beku(-4))`,
      output: `25°C dalam Fahrenheit : 77.0
Apakah -4°C membeku?  : True`,
      lineExplanations: [
        {
          line: "@staticmethod\n    def celcius_ke_fahrenheit(c):",
          explanation: "Dengan `@staticmethod`, kita tidak perlu menulis parameter `self` atau `cls`, dan bisa langsung memanggil `KonverterSuhu.celcius_ke_fahrenheit(25)`."
        }
      ]
    }
  ],
  tips: [
    "Gunakan `NamaClass.nama_variabel` saat memodifikasi *Class Variable* di dalam `__init__()`, karena jika kamu menulis `self.nama_variabel = ...`, Python justru akan membuat *Instance Variable* baru yang menutupi *Class Variable* tersebut.",
    "Gunakan `@staticmethod` untuk fungsi validasi atau perhitungan rumus murni yang tidak bergantung pada atribut objek."
  ],
  commonMistakes: [
    {
      wrong: "class Kalkulator:\n    @staticmethod\n    def tambah(self, a, b):\n        return a + b",
      correct: "class Kalkulator:\n    @staticmethod\n    def tambah(a, b):\n        return a + b",
      reason: "`@staticmethod` tidak mengirimkan `self` secara otomatis. Jika kamu menulis `self` di parameternya, Python akan menganggap `self` sebagai argumen angka pertama!"
    }
  ],
  caseStudies: [
    {
      id: "oop-bab3-case1",
      title: "Penghitung Otomatis Jumlah Tiket Konser yang Terjual",
      difficulty: "Mudah",
      scenario:
        "Panitia konser musik ingin memantau total tiket yang sudah diterbitkan menggunakan *Class Variable* `total_terjual = 0` pada class `TiketKonser`. Setiap kali objek tiket baru dibuat untuk pembeli, `TiketKonser.total_terjual` otomatis bertambah `1`.",
      instructions:
        "Lengkapi constructor `__init__(self, nama_pembeli)` agar menyimpan `self.nama_pembeli` dan menambah `TiketKonser.total_terjual += 1`!",
      tasks: [
        "Simpan `self.nama_pembeli = nama_pembeli`.",
        "Tambahkan `TiketKonser.total_terjual += 1` di dalam `__init__`."
      ],
      starterCode: `class TiketKonser:
    total_terjual = 0

    def __init__(self, nama_pembeli):
        # Simpan nama_pembeli dan tambah TiketKonser.total_terjual sebesar 1:
        

t1 = TiketKonser("Andi")
t2 = TiketKonser("Budi")
t3 = TiketKonser("Citra")

print("Pembeli Pertama    :", t1.nama_pembeli)
print("Total Tiket Terjual:", TiketKonser.total_terjual)`,
      expectedOutput: `Pembeli Pertama    : Andi
Total Tiket Terjual: 3`,
      hint: "Di dalam `__init__`, tulis `self.nama_pembeli = nama_pembeli` dan `TiketKonser.total_terjual += 1`.",
      solutionCode: `class TiketKonser:
    total_terjual = 0

    def __init__(self, nama_pembeli):
        self.nama_pembeli = nama_pembeli
        TiketKonser.total_terjual += 1

t1 = TiketKonser("Andi")
t2 = TiketKonser("Budi")
t3 = TiketKonser("Citra")

print("Pembeli Pertama    :", t1.nama_pembeli)
print("Total Tiket Terjual:", TiketKonser.total_terjual)`
    },
    {
      id: "oop-bab3-case2",
      title: "Pengaturan Suku Bunga Global Bank dengan @classmethod",
      difficulty: "Sedang",
      scenario:
        "Sebuah bank memiliki class `TabunganBerjangka` dengan *Class Variable* `bunga_tahunan = 0.05` (5%). Ketika kebijakan bank berubah, direksi memanggil `@classmethod` bernama `ubah_bunga(cls, bunga_baru)` untuk memperbarui suku bunga seluruh nasabah sekaligus.",
      instructions:
        "Buatlah `@classmethod` `ubah_bunga(cls, bunga_baru)` yang mengubah `cls.bunga_tahunan = bunga_baru`!",
      tasks: [
        "Tambahkan dekorator `@classmethod`.",
        "Definisikan `def ubah_bunga(cls, bunga_baru):` yang mengisi `cls.bunga_tahunan = bunga_baru`."
      ],
      starterCode: `class TabunganBerjangka:
    bunga_tahunan = 0.05

    def __init__(self, nasabah, pokok):
        self.nasabah = nasabah
        self.pokok = pokok

    def hitung_bunga(self):
        return int(self.pokok * TabunganBerjangka.bunga_tahunan)

    # Buat @classmethod ubah_bunga(cls, bunga_baru) di bawah ini:
    

akun = TabunganBerjangka("Siti", 10000000)
print(f"Bunga Awal (5%) : Rp{akun.hitung_bunga():,}")

TabunganBerjangka.ubah_bunga(0.08)
print(f"Bunga Baru (8%) : Rp{akun.hitung_bunga():,}")`,
      expectedOutput: `Bunga Awal (5%) : Rp500,000
Bunga Baru (8%) : Rp800,000`,
      hint: "Tulis `@classmethod`, lalu `def ubah_bunga(cls, bunga_baru):`, lalu `cls.bunga_tahunan = bunga_baru`.",
      solutionCode: `class TabunganBerjangka:
    bunga_tahunan = 0.05

    def __init__(self, nasabah, pokok):
        self.nasabah = nasabah
        self.pokok = pokok

    def hitung_bunga(self):
        return int(self.pokok * TabunganBerjangka.bunga_tahunan)

    @classmethod
    def ubah_bunga(cls, bunga_baru):
        cls.bunga_tahunan = bunga_baru

akun = TabunganBerjangka("Siti", 10000000)
print(f"Bunga Awal (5%) : Rp{akun.hitung_bunga():,}")

TabunganBerjangka.ubah_bunga(0.08)
print(f"Bunga Baru (8%) : Rp{akun.hitung_bunga():,}")`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab3-challenge1",
      title: "Membuat Class Variable untuk Tarif Pajak Restoran",
      difficulty: "Mudah",
      instructions:
        "Tambahkan *Class Variable* `pajak = 0.10` pada class `TagihanResto` agar semua objek berbagi tarif pajak yang sama!",
      tasks: [
        "Tulis `pajak = 0.10` sebagai *Class Variable* di bawah baris `class TagihanResto:`."
      ],
      starterCode: `class TagihanResto:
    # Tambahkan Class Variable pajak = 0.10 di sini:
    

    def __init__(self, meja, subtotal):
        self.meja = meja
        self.subtotal = subtotal

t1 = TagihanResto("Meja 1", 200000)
print("Meja        :", t1.meja)
print("Tarif Pajak :", TagihanResto.pajak)`,
      expectedOutput: `Meja        : Meja 1
Tarif Pajak : 0.1`,
      hint: "Tulis `pajak = 0.10` di dalam `class TagihanResto:` sebelum `def __init__`.",
      solutionCode: `class TagihanResto:
    pajak = 0.10

    def __init__(self, meja, subtotal):
        self.meja = meja
        self.subtotal = subtotal

t1 = TagihanResto("Meja 1", 200000)
print("Meja        :", t1.meja)
print("Tarif Pajak :", TagihanResto.pajak)`
    },
    {
      id: "oop-bab3-challenge2",
      title: "Menghitung Jumlah Objek yang Dibuat dengan Class Variable",
      difficulty: "Mudah",
      instructions:
        "Di dalam `__init__` milik class `SensorSuhu`, tambahkan `SensorSuhu.jumlah_sensor += 1` agar setiap objek baru tercatat di *Class Variable*!",
      tasks: [
        "Tambahkan `SensorSuhu.jumlah_sensor += 1` di dalam `__init__`."
      ],
      starterCode: `class SensorSuhu:
    jumlah_sensor = 0

    def __init__(self, ruangan):
        self.ruangan = ruangan
        # Tambah SensorSuhu.jumlah_sensor sebesar 1:
        

s1 = SensorSuhu("Lab Kimia")
s2 = SensorSuhu("Ruang Server")

print("Total Sensor Aktif:", SensorSuhu.jumlah_sensor)`,
      expectedOutput: `Total Sensor Aktif: 2`,
      hint: "Tulis: `SensorSuhu.jumlah_sensor += 1`",
      solutionCode: `class SensorSuhu:
    jumlah_sensor = 0

    def __init__(self, ruangan):
        self.ruangan = ruangan
        SensorSuhu.jumlah_sensor += 1

s1 = SensorSuhu("Lab Kimia")
s2 = SensorSuhu("Ruang Server")

print("Total Sensor Aktif:", SensorSuhu.jumlah_sensor)`
    },
    {
      id: "oop-bab3-challenge3",
      title: "Membuat @classmethod Pengubah Nama Sekolah",
      difficulty: "Sedang",
      instructions:
        "Gunakan dekorator `@classmethod` untuk membuat method `ganti_sekolah(cls, nama_baru)` yang mengubah *Class Variable* `cls.nama_sekolah = nama_baru`!",
      tasks: [
        "Gunakan `@classmethod`.",
        "Buat `def ganti_sekolah(cls, nama_baru):` yang mengubah `cls.nama_sekolah = nama_baru`."
      ],
      starterCode: `class Pelajar:
    nama_sekolah = "SMA Negeri 1"

    # Buat @classmethod ganti_sekolah(cls, nama_baru) di sini:
    

Pelajar.ganti_sekolah("SMA Unggulan Nusantara")
print("Sekolah:", Pelajar.nama_sekolah)`,
      expectedOutput: `Sekolah: SMA Unggulan Nusantara`,
      hint: "Tulis `@classmethod`, lalu `def ganti_sekolah(cls, nama_baru):`, lalu `cls.nama_sekolah = nama_baru`.",
      solutionCode: `class Pelajar:
    nama_sekolah = "SMA Negeri 1"

    @classmethod
    def ganti_sekolah(cls, nama_baru):
        cls.nama_sekolah = nama_baru

Pelajar.ganti_sekolah("SMA Unggulan Nusantara")
print("Sekolah:", Pelajar.nama_sekolah)`
    },
    {
      id: "oop-bab3-challenge4",
      title: "Membuat @staticmethod untuk Validasi Panjang PIN",
      difficulty: "Sedang",
      instructions:
        "Buatlah `@staticmethod` bernama `pin_valid(pin_teks)` di dalam class `KeamananATM` yang mengembalikan `True` jika `len(pin_teks) == 6`, atau `False` jika tidak!",
      tasks: [
        "Tambahkan dekorator `@staticmethod`.",
        "Definisikan `def pin_valid(pin_teks):` dengan `return len(pin_teks) == 6`."
      ],
      starterCode: `class KeamananATM:
    # Buat @staticmethod pin_valid(pin_teks) di bawah ini:
    

print("PIN '123456' valid? :", KeamananATM.pin_valid("123456"))
print("PIN '1234' valid?   :", KeamananATM.pin_valid("1234"))`,
      expectedOutput: `PIN '123456' valid? : True
PIN '1234' valid?   : False`,
      hint: "Tulis `@staticmethod`, lalu `def pin_valid(pin_teks):`, lalu `return len(pin_teks) == 6`.",
      solutionCode: `class KeamananATM:
    @staticmethod
    def pin_valid(pin_teks):
        return len(pin_teks) == 6

print("PIN '123456' valid? :", KeamananATM.pin_valid("123456"))
print("PIN '1234' valid?   : ", KeamananATM.pin_valid("1234"))`.replace("?   : ", "?   :")
    },
    {
      id: "oop-bab3-challenge5",
      title: "Alternative Constructor dengan @classmethod",
      difficulty: "Menantang",
      instructions:
        "Lengkapi `@classmethod` `dari_tahun_lahir(cls, nama, tahun_lahir)` pada class `PesertaUjian` agar menghitung `umur = 2026 - tahun_lahir` dan mengembalikan objek baru `cls(nama, umur)`!",
      tasks: [
        "Hitung `umur = 2026 - tahun_lahir`.",
        "Kembalikan `cls(nama, umur)` dengan `return`."
      ],
      starterCode: `class PesertaUjian:
    def __init__(self, nama, umur):
        self.nama = nama
        self.umur = umur

    @classmethod
    def dari_tahun_lahir(cls, nama, tahun_lahir):
        # Hitung umur (2026 - tahun_lahir) dan return cls(nama, umur):
        

p = PesertaUjian.dari_tahun_lahir("Dewi", 2005)
print(f"Peserta: {p.nama} ({p.umur} tahun)")`,
      expectedOutput: `Peserta: Dewi (21 tahun)`,
      hint: "Tulis `umur = 2026 - tahun_lahir` lalu `return cls(nama, umur)`.",
      solutionCode: `class PesertaUjian:
    def __init__(self, nama, umur):
        self.nama = nama
        self.umur = umur

    @classmethod
    def dari_tahun_lahir(cls, nama, tahun_lahir):
        umur = 2026 - tahun_lahir
        return cls(nama, umur)

p = PesertaUjian.dari_tahun_lahir("Dewi", 2005)
print(f"Peserta: {p.nama} ({p.umur} tahun)")`
    }
  ],
  quizzes: [
    {
      question: "Apa perbedaan utama antara *Class Variable* dan *Instance Variable*?",
      options: [
        "Class Variable hanya bisa menyimpan angka, sedangkan Instance Variable menyimpan teks",
        "Class Variable dibagi bersama untuk seluruh objek, sedangkan Instance Variable unik milik masing-masing objek",
        "Instance Variable ditulis di luar __init__, sedangkan Class Variable di dalam __init__",
        "Tidak ada perbedaan sama sekali"
      ],
      correctIndex: 1,
      explanation: "*Class Variable* didefinisikan di tingkat class dan dibagi bersama ke semua objek, sedangkan *Instance Variable* (`self.atribut`) dimiliki secara terpisah oleh tiap objek."
    },
    {
      question: "Di manakah posisi deklarasi sebuah *Class Variable* ditulis?",
      options: [
        "Di luar class sama sekali",
        "Di dalam blok class namun di luar method __init__()",
        "Di dalam parameter fungsi print()",
        "Hanya di dalam @staticmethod"
      ],
      correctIndex: 1,
      explanation: "*Class Variable* ditulis langsung di dalam blok `class` (biasanya tepat di bawah baris `class NamaClass:`) di luar method mana pun."
    },
    {
      question: "Dekorator apakah yang digunakan untuk membuat *Class Method* di Python?",
      options: ["@class", "@classmethod", "@staticmethod", "@method"],
      correctIndex: 1,
      explanation: "Dekorator `@classmethod` digunakan untuk menandai bahwa sebuah method menerima `cls` (class itu sendiri) sebagai parameter pertamanya."
    },
    {
      question: "Apakah nama konvensi parameter pertama pada sebuah `@classmethod`?",
      options: ["self", "cls", "this", "obj"],
      correctIndex: 1,
      explanation: "Pada `@classmethod`, parameter pertama ditulis `cls` (singkatan dari *class*)."
    },
    {
      question: "Jenis method manakah yang TIDAK menerima parameter otomatis `self` maupun `cls`?",
      options: ["Instance Method", "Constructor __init__", "@classmethod", "@staticmethod"],
      correctIndex: 3,
      explanation: "`@staticmethod` berfungsi seperti fungsi biasa yang ditempatkan di dalam namespace class, sehingga tidak menerima `self` maupun `cls`."
    },
    {
      question: "Apa kegunaan populer dari `@classmethod` selain mengubah *Class Variable*?",
      options: [
        "Menghapus class dari memori",
        "Membuat Alternative Constructor (cara alternatif menciptakan objek dari format data lain)",
        "Menggantikan fungsi print()",
        "Membuat perulangan while"
      ],
      correctIndex: 1,
      explanation: "`@classmethod` sering digunakan sebagai *Alternative Constructor* (seperti `Produk.dari_csv(...)` atau `Peserta.dari_tahun_lahir(...)`) dengan memanggil `return cls(...)`."
    },
    {
      question: "Bagaimana cara memanggil `@staticmethod` `cek_valid(x)` yang berada di dalam `class Validator:`?",
      options: [
        "Hanya bisa lewat objek v = Validator()",
        "Bisa langsung dipanggil melalui nama class: Validator.cek_valid(x)",
        "Harus menggunakan kata kunci super()",
        "Harus di-import terlebih dahulu"
      ],
      correctIndex: 1,
      explanation: "Baik `@staticmethod` maupun `@classmethod` dapat dipanggil secara langsung melalui nama class-nya (`Validator.cek_valid(x)`) tanpa harus membuat objek terlebih dahulu."
    },
    {
      question: "Jika `Mobil.jumlah_roda = 4` adalah *Class Variable*, apa yang terjadi jika kita menjalankan `Mobil.jumlah_roda = 6`?",
      options: [
        "Nilai jumlah_roda berubah menjadi 6 untuk semua objek Mobil yang mengakses Class Variable tersebut",
        "Menghasilkan SyntaxError",
        "Hanya mengubah objek terakhir yang dibuat",
        "Nilai jumlah_roda tetap 4"
      ],
      correctIndex: 0,
      explanation: "Mengubah *Class Variable* melalui nama class-nya (`Mobil.jumlah_roda = 6`) akan memperbarui nilai tersebut bagi seluruh objek dari class `Mobil`."
    },
    {
      question: "Mengapa kita menulis `Karyawan.total += 1` di dalam `__init__()` untuk menghitung jumlah objek yang dibuat?",
      options: [
        "Karena __init__() otomatis dipanggil setiap kali objek Karyawan baru diciptakan",
        "Karena __init__() hanya berjalan satu kali saat program ditutup",
        "Karena total adalah variabel lokal",
        "Supaya objek tidak memiliki atribut"
      ],
      correctIndex: 0,
      explanation: "Karena `__init__()` dieksekusi setiap kali objek baru dibuat, menaikkan *Class Variable* di dalamnya akan menghitung total objek secara akurat."
    },
    {
      question: "Apa yang terjadi jika di dalam `@classmethod def buat(cls, nama):` kita menjalankan `return cls(nama)`?",
      options: [
        "Mengembalikan string nama class",
        "Menciptakan dan mengembalikan objek baru dari class tersebut",
        "Menghasilkan NameError",
        "Mengembalikan nilai None"
      ],
      correctIndex: 1,
      explanation: "Karena `cls` merujuk pada `class` itu sendiri, memanggil `cls(nama)` sama persis dengan memanggil `NamaClass(nama)` untuk membuat objek baru."
    }
  ]
};

