import { DocSection } from "../types";

export const bab5Inheritance: DocSection = {
  id: "oop-bab5-inheritance",
  number: 5,
  filePath: "app/data/oop-chapters/bab5-inheritance.ts",
  title: "Inheritance (Pewarisan Class) & Fungsi super()",
  subtitle:
    "Mewariskan atribut dan *method* dari *Parent Class* ke *Child Class*, memperluas constructor dengan `super().__init__()`, serta memeriksa hierarki dengan `isinstance()` dan `issubclass()`.",
  level: "Menengah",
  readTime: "15 menit",
  summary:
    "**Inheritance** (Pewarisan) memungkinkan kita membuat `class` baru (**Child Class** / *Subclass*) yang mewarisi seluruh atribut dan *method* dari `class` yang sudah ada (**Parent Class** / *Superclass*). Dengan pewarisan, kita tidak perlu menulis ulang kode yang sama berulang kali. Cukup tulis nama *Parent Class* di dalam tanda kurung saat mendefinisikan *Child Class*: `class Anak(Induk):`. Jika *Child Class* ingin menambahkan atribut baru di dalam `__init__()`, kita dapat memanggil constructor milik induknya terlebih dahulu menggunakan fungsi `super().__init__(...)`.",
  keyPoints: [
    "Sintaks pewarisan: `class ChildClass(ParentClass):` membuat `ChildClass` otomatis memiliki semua atribut dan *method* milik `ParentClass`.",
    "**Parent Class** (*Superclass*): Class induk yang mewariskan sifat-sifat umum (contoh: `Kendaraan`, `Pegawai`).",
    "**Child Class** (*Subclass*): Class anak yang mewarisi sifat induk sekaligus bisa memiliki atribut dan *method* tambahan yang lebih spesifik (contoh: `MobilListrik(Kendaraan)`, `Manajer(Pegawai)`).",
    "`super().__init__(...)`: Memanggil constructor `__init__` milik *Parent Class* dari dalam `__init__` milik *Child Class* agar atribut induk tetap terinisialisasi dengan benar.",
    "`isinstance(obj, NamaClass)`: Mengembalikan `True` jika `obj` merupakan objek dari `NamaClass` atau turunannya.",
    "`issubclass(KelasAnak, KelasInduk)`: Mengembalikan `True` jika `KelasAnak` merupakan turunan dari `KelasInduk`."
  ],
  conceptTable: {
    title: "Komponen Utama Inheritance (Pewarisan) di Python",
    headers: ["Sintaks / Fungsi", "Contoh Penulisan", "Kegunaan Utama"],
    rows: [
      ["class Anak(Induk):", "class Mobil(Kendaraan):", "Mendefinisikan `Mobil` sebagai *Child Class* dari `Kendaraan`."],
      ["super().__init__()", "super().__init__(merek, tahun)", "Menjalankan `__init__` milik *Parent Class* untuk mengisi atribut dasar."],
      ["super().method()", "super().info_dasar()", "Memanggil method milik *Parent Class* dari dalam *Child Class*."],
      ["isinstance(obj, Cls)", "isinstance(m1, Kendaraan)", "Mengecek apakah objek `m1` berasal dari class `Kendaraan` (atau turunannya)."],
      ["issubclass(A, B)", "issubclass(Mobil, Kendaraan)", "Mengecek apakah class `Mobil` adalah subclass dari `Kendaraan`."]
    ]
  },
  examples: [
    {
      id: "oop-bab5-ex1",
      title: "1. Dasar Pewarisan: Child Class Mewarisi Method Parent Class",
      description:
        "Class anak (`Kucing` dan `Anjing`) otomatis memiliki atribut dan method `info_hewan()` milik class induk (`HewanPeliharaan`), ditambah method spesifiknya sendiri.",
      code: `class HewanPeliharaan:
    def __init__(self, nama, umur):
        self.nama = nama
        self.umur = umur

    def info_hewan(self):
        return f"{self.nama} (Umur: {self.umur} tahun)"

# Child Class mewarisi HewanPeliharaan
class Kucing(HewanPeliharaan):
    def mengeong(self):
        return f"{self.nama} berkata: Meong!"

class Anjing(HewanPeliharaan):
    def menggonggong(self):
        return f"{self.nama} berkata: Guk guk!"

k = Kucing("Milo", 2)
a = Anjing("Bruno", 4)

print(k.info_hewan(), "->", k.mengeong())
print(a.info_hewan(), "->", a.menggonggong())`,
      output: `Milo (Umur: 2 tahun) -> Milo berkata: Meong!
Bruno (Umur: 4 tahun) -> Bruno berkata: Guk guk!`,
      lineExplanations: [
        {
          line: "class Kucing(HewanPeliharaan):",
          explanation: "Karena `Kucing` tidak mendefinisikan `__init__` baru, ia otomatis menggunakan `__init__` dan `info_hewan()` milik `HewanPeliharaan`."
        }
      ]
    },
    {
      id: "oop-bab5-ex2",
      title: "2. Menambah Atribut Baru di Child Class dengan super().__init__()",
      description:
        "Saat *Child Class* membutuhkan atribut tambahan (misal `tunjangan_jabatan`), gunakan `super().__init__()` agar atribut dasar di *Parent Class* tetap diisi.",
      code: `class Pegawai:
    def __init__(self, nama, gaji_pokok):
        self.nama = nama
        self.gaji_pokok = gaji_pokok

    def info_dasar(self):
        return f"{self.nama} (Gaji Pokok: Rp{self.gaji_pokok:,})"

class Manajer(Pegawai):
    def __init__(self, nama, gaji_pokok, divisi):
        # Panggil __init__ milik Pegawai dengan super()
        super().__init__(nama, gaji_pokok)
        self.divisi = divisi

    def info_manajer(self):
        return f"{self.info_dasar()} | Divisi: {self.divisi}"

m1 = Manajer("Siti Rahma", 10000000, "Teknologi Informasi")
print(m1.info_manajer())`,
      output: `Siti Rahma (Gaji Pokok: Rp10,000,000) | Divisi: Teknologi Informasi`,
      lineExplanations: [
        {
          line: "super().__init__(nama, gaji_pokok)",
          explanation: "Meneruskan `nama` dan `gaji_pokok` ke constructor `Pegawai` sehingga `self.nama` dan `self.gaji_pokok` otomatis tersimpan."
        },
        {
          line: "self.divisi = divisi",
          explanation: "Menambahkan atribut baru `divisi` yang khusus dimiliki oleh objek `Manajer`."
        }
      ]
    },
    {
      id: "oop-bab5-ex3",
      title: "3. Memeriksa Hubungan Objek dan Class dengan isinstance() & issubclass()",
      description:
        "Objek dari *Child Class* juga diakui sebagai bagian (*instance*) dari *Parent Class*-nya.",
      code: `class Kendaraan:
    pass

class Mobil(Kendaraan):
    pass

class Motor(Kendaraan):
    pass

sedan = Mobil()

print("Apakah sedan adalah Mobil?      :", isinstance(sedan, Mobil))
print("Apakah sedan adalah Kendaraan?  :", isinstance(sedan, Kendaraan))
print("Apakah sedan adalah Motor?      :", isinstance(sedan, Motor))
print("Apakah Mobil turunan Kendaraan? :", issubclass(Mobil, Kendaraan))`,
      output: `Apakah sedan adalah Mobil?      : True
Apakah sedan adalah Kendaraan?  : True
Apakah sedan adalah Motor?      : False
Apakah Mobil turunan Kendaraan? : True`,
      lineExplanations: [
        {
          line: "isinstance(sedan, Kendaraan)",
          explanation: "Menghasilkan `True` karena `Mobil` adalah turunan dari `Kendaraan`, sehingga setiap `Mobil` pasti merupakan sebuah `Kendaraan`."
        },
        {
          line: "issubclass(Mobil, Kendaraan)",
          explanation: "Memeriksa apakah class pertama (`Mobil`) merupakan turunan dari class kedua (`Kendaraan`)."
        }
      ]
    }
  ],
  tips: [
    "Saat memanggil `super().__init__(arg1, arg2)`, kamu **tidak perlu** menuliskan `self` di dalam tanda kurung `__init__` karena `super()` sudah otomatis menyertakan `self`.",
    "Gunakan pewarisan ketika terdapat hubungan **'Adalah Sebuah' (*Is-A Relationship*)**, misalnya: `MobilListrik` *adalah sebuah* `Kendaraan`, `DokterAnak` *adalah seorang* `Dokter`."
  ],
  commonMistakes: [
    {
      wrong: "class Manajer(Pegawai):\n    def __init__(self, nama, gaji, divisi):\n        super().__init__(self, nama, gaji)  # Salah: menulis self lagi!",
      correct: "class Manajer(Pegawai):\n    def __init__(self, nama, gaji, divisi):\n        super().__init__(nama, gaji)        # Benar: tanpa self",
      reason: "Ketika menggunakan `super().__init__(...)`, Python sudah otomatis meneruskan `self`. Menulis `self` lagi di dalamnya akan menyebabkan kelebihan argumen (`TypeError`)."
    }
  ],
  caseStudies: [
    {
      id: "oop-bab5-case1",
      title: "Hierarki Kendaraan & Mobil Listrik dengan Kapasitas Baterai",
      difficulty: "Mudah",
      scenario:
        "Sebuah dealer otomotif mendata seluruh kendaraannya dengan class induk `Kendaraan(merek, tahun)`. Untuk lini mobil ramah lingkungan, mereka membuat class turunan `MobilListrik(Kendaraan)` yang mewarisi `merek` dan `tahun` via `super().__init__()`, serta menambahkan atribut `kapasitas_kwh`.",
      instructions:
        "Lengkapi constructor `MobilListrik` menggunakan `super().__init__(merek, tahun)` dan simpan `self.kapasitas_kwh = kapasitas_kwh`!",
      tasks: [
        "Panggil `super().__init__(merek, tahun)` di dalam `__init__` milik `MobilListrik`.",
        "Simpan `self.kapasitas_kwh = kapasitas_kwh`."
      ],
      starterCode: `class Kendaraan:
    def __init__(self, merek, tahun):
        self.merek = merek
        self.tahun = tahun

class MobilListrik(Kendaraan):
    def __init__(self, merek, tahun, kapasitas_kwh):
        # Panggil super().__init__ dan simpan kapasitas_kwh:
        

    def spek_lengkap(self):
        return f"{self.merek} ({self.tahun}) - Baterai: {self.kapasitas_kwh} kWh"

ev = MobilListrik("Hyundai Ioniq", 2026, 72)
print(ev.spek_lengkap())`,
      expectedOutput: `Hyundai Ioniq (2026) - Baterai: 72 kWh`,
      hint: "Tulis `super().__init__(merek, tahun)` lalu di bawahnya `self.kapasitas_kwh = kapasitas_kwh`.",
      solutionCode: `class Kendaraan:
    def __init__(self, merek, tahun):
        self.merek = merek
        self.tahun = tahun

class MobilListrik(Kendaraan):
    def __init__(self, merek, tahun, kapasitas_kwh):
        super().__init__(merek, tahun)
        self.kapasitas_kwh = kapasitas_kwh

    def spek_lengkap(self):
        return f"{self.merek} ({self.tahun}) - Baterai: {self.kapasitas_kwh} kWh"

ev = MobilListrik("Hyundai Ioniq", 2026, 72)
print(ev.spek_lengkap())`
    },
    {
      id: "oop-bab5-case2",
      title: "Sistem Tiket Pesawat Reguler & Tiket Kelas Bisnis (VIP)",
      difficulty: "Sedang",
      scenario:
        "Sistem reservasi maskapai memiliki class induk `TiketPesawat(penumpang, rute, harga_dasar)`. Untuk penumpang VIP, terdapat subclass `TiketBisnis(TiketPesawat)` yang mengenakan biaya tambahan layanan lounge (`biaya_lounge`) sehingga total harganya menjadi `self.harga_dasar + self.biaya_lounge`.",
      instructions:
        "Lengkapi class `TiketBisnis` agar mewarisi `TiketPesawat` menggunakan `super().__init__()` dan buat method `total_bayar(self)` yang mengembalikan `self.harga_dasar + self.biaya_lounge`!",
      tasks: [
        "Gunakan `super().__init__(penumpang, rute, harga_dasar)` di dalam `__init__` milik `TiketBisnis`.",
        "Kembalikan `self.harga_dasar + self.biaya_lounge` pada method `total_bayar(self)`."
      ],
      starterCode: `class TiketPesawat:
    def __init__(self, penumpang, rute, harga_dasar):
        self.penumpang = penumpang
        self.rute = rute
        self.harga_dasar = harga_dasar

class TiketBisnis(TiketPesawat):
    def __init__(self, penumpang, rute, harga_dasar, biaya_lounge):
        # Panggil super().__init__ dan simpan biaya_lounge:
        super().__init__(penumpang, rute, harga_dasar)
        self.biaya_lounge = biaya_lounge

    def total_bayar(self):
        # Kembalikan penjumlahan harga_dasar dan biaya_lounge:
        

tiket_vip = TiketBisnis("Budi Santoso", "CGK-DPS", 1500000, 350000)
print(f"Penumpang : {tiket_vip.penumpang} ({tiket_vip.rute})")
print(f"Total VIP : Rp{tiket_vip.total_bayar():,}")`,
      expectedOutput: `Penumpang : Budi Santoso (CGK-DPS)
Total VIP : Rp1,850,000`,
      hint: "Di dalam `total_bayar(self)`, tulis: `return self.harga_dasar + self.biaya_lounge`",
      solutionCode: `class TiketPesawat:
    def __init__(self, penumpang, rute, harga_dasar):
        self.penumpang = penumpang
        self.rute = rute
        self.harga_dasar = harga_dasar

class TiketBisnis(TiketPesawat):
    def __init__(self, penumpang, rute, harga_dasar, biaya_lounge):
        super().__init__(penumpang, rute, harga_dasar)
        self.biaya_lounge = biaya_lounge

    def total_bayar(self):
        return self.harga_dasar + self.biaya_lounge

tiket_vip = TiketBisnis("Budi Santoso", "CGK-DPS", 1500000, 350000)
print(f"Penumpang : {tiket_vip.penumpang} ({tiket_vip.rute})")
print(f"Total VIP : Rp{tiket_vip.total_bayar():,}")`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab5-challenge1",
      title: "Membuat Child Class yang Mewarisi Parent Class",
      difficulty: "Mudah",
      instructions:
        "Buatlah class `Smartphone` yang mewarisi class `PerangkatElektronik` (`class Smartphone(PerangkatElektronik):`) sehingga objeknya dapat memanggil method `nyalakan()`!",
      tasks: [
        "Definisikan `class Smartphone(PerangkatElektronik):`."
      ],
      starterCode: `class PerangkatElektronik:
    def __init__(self, merek):
        self.merek = merek

    def nyalakan(self):
        return f"Perangkat {self.merek} menyala!"

# Buat class Smartphone yang mewarisi PerangkatElektronik:
class Smartphone(PerangkatElektronik):
    pass

hp = Smartphone("Galaxy S26")
print(hp.nyalakan())`,
      expectedOutput: `Perangkat Galaxy S26 menyala!`,
      hint: "Kode sudah hampir lengkap, cukup jalankan atau pastikan tertulis `class Smartphone(PerangkatElektronik):`.",
      solutionCode: `class PerangkatElektronik:
    def __init__(self, merek):
        self.merek = merek

    def nyalakan(self):
        return f"Perangkat {self.merek} menyala!"

class Smartphone(PerangkatElektronik):
    pass

hp = Smartphone("Galaxy S26")
print(hp.nyalakan())`
    },
    {
      id: "oop-bab5-challenge2",
      title: "Menambahkan Method Khusus pada Child Class",
      difficulty: "Mudah",
      instructions:
        "Pada class turunan `BurungElang(Burung)`, tambahkan method `berburu(self)` yang mengembalikan string `f'{self.nama} sedang terbang berburu!'`.",
      tasks: [
        "Buat method `def berburu(self):` di dalam `BurungElang`.",
        "Kembalikan `f'{self.nama} sedang terbang berburu!'`."
      ],
      starterCode: `class Burung:
    def __init__(self, nama):
        self.nama = nama

class BurungElang(Burung):
    # Tambahkan method berburu(self) di sini:
    

elang = BurungElang("Garuda")
print(elang.berburu())`,
      expectedOutput: `Garuda sedang terbang berburu!`,
      hint: 'Tulis `def berburu(self):` lalu di dalamnya `return f"{self.nama} sedang terbang berburu!"`.',
      solutionCode: `class Burung:
    def __init__(self, nama):
        self.nama = nama

class BurungElang(Burung):
    def berburu(self):
        return f"{self.nama} sedang terbang berburu!"

elang = BurungElang("Garuda")
print(elang.berburu())`
    },
    {
      id: "oop-bab5-challenge3",
      title: "Memanggil Constructor Induk dengan super().__init__()",
      difficulty: "Sedang",
      instructions:
        "Di dalam `__init__` milik class `Dosen(TenagaPendidik)`, panggil `super().__init__(nama)` lalu simpan atribut `self.mata_kuliah = mata_kuliah`!",
      tasks: [
        "Panggil `super().__init__(nama)`.",
        "Simpan `self.mata_kuliah = mata_kuliah`."
      ],
      starterCode: `class TenagaPendidik:
    def __init__(self, nama):
        self.nama = nama

class Dosen(TenagaPendidik):
    def __init__(self, nama, mata_kuliah):
        # Panggil super().__init__(nama) dan simpan mata_kuliah:
        

d1 = Dosen("Dr. Hendra", "Kecerdasan Buatan")
print(f"Dosen: {d1.nama} | Mengajar: {d1.mata_kuliah}")`,
      expectedOutput: `Dosen: Dr. Hendra | Mengajar: Kecerdasan Buatan`,
      hint: "Tulis `super().__init__(nama)` lalu di baris berikutnya `self.mata_kuliah = mata_kuliah`.",
      solutionCode: `class TenagaPendidik:
    def __init__(self, nama):
        self.nama = nama

class Dosen(TenagaPendidik):
    def __init__(self, nama, mata_kuliah):
        super().__init__(nama)
        self.mata_kuliah = mata_kuliah

d1 = Dosen("Dr. Hendra", "Kecerdasan Buatan")
print(f"Dosen: {d1.nama} | Mengajar: {d1.mata_kuliah}")`
    },
    {
      id: "oop-bab5-challenge4",
      title: "Memanggil Method Parent Class Menggunakan super()",
      difficulty: "Sedang",
      instructions:
        "Di dalam class `MemberVIP(MemberReguler)`, lengkapi method `info_benefit(self)` agar memanggil `super().info_benefit()` dan menggabungkannya dengan `' + Akses Ruang VIP'`!",
      tasks: [
        "Gunakan `return super().info_benefit() + ' + Akses Ruang VIP'`."
      ],
      starterCode: `class MemberReguler:
    def info_benefit(self):
        return "Diskon Belanja 10%"

class MemberVIP(MemberReguler):
    def info_benefit(self):
        # Gabungkan hasil super().info_benefit() dengan " + Akses Ruang VIP":
        

vip = MemberVIP()
print("Benefit VIP:", vip.info_benefit())`,
      expectedOutput: `Benefit VIP: Diskon Belanja 10% + Akses Ruang VIP`,
      hint: 'Tulis: `return super().info_benefit() + " + Akses Ruang VIP"`',
      solutionCode: `class MemberReguler:
    def info_benefit(self):
        return "Diskon Belanja 10%"

class MemberVIP(MemberReguler):
    def info_benefit(self):
        return super().info_benefit() + " + Akses Ruang VIP"

vip = MemberVIP()
print("Benefit VIP:", vip.info_benefit())`
    },
    {
      id: "oop-bab5-challenge5",
      title: "Mengecek Pewarisan dengan isinstance() dan issubclass()",
      difficulty: "Menantang",
      instructions:
        "Gunakan fungsi `isinstance(bus_kota, KendaraanUmum)` dan `issubclass(Bus, KendaraanUmum)` untuk memeriksa hubungan antara objek dan class!",
      tasks: [
        "Isi `cek_objek = isinstance(bus_kota, KendaraanUmum)`.",
        "Isi `cek_kelas = issubclass(Bus, KendaraanUmum)`."
      ],
      starterCode: `class KendaraanUmum:
    pass

class Bus(KendaraanUmum):
    pass

bus_kota = Bus()

# Gunakan isinstance() dan issubclass():
cek_objek = 
cek_kelas = 

print("Apakah bus_kota termasuk KendaraanUmum? :", cek_objek)
print("Apakah Bus adalah subclass KendaraanUmum?:", cek_kelas)`,
      expectedOutput: `Apakah bus_kota termasuk KendaraanUmum? : True
Apakah Bus adalah subclass KendaraanUmum?: True`,
      hint: "Tulis `cek_objek = isinstance(bus_kota, KendaraanUmum)` dan `cek_kelas = issubclass(Bus, KendaraanUmum)`.",
      solutionCode: `class KendaraanUmum:
    pass

class Bus(KendaraanUmum):
    pass

bus_kota = Bus()

cek_objek = isinstance(bus_kota, KendaraanUmum)
cek_kelas = issubclass(Bus, KendaraanUmum)

print("Apakah bus_kota termasuk KendaraanUmum? :", cek_objek)
print("Apakah Bus adalah subclass KendaraanUmum?:", cek_kelas)`
    }
  ],
  quizzes: [
    {
      question: "Disebut apakah konsep OOP di mana sebuah `class` baru mewarisi atribut dan *method* dari `class` yang sudah ada?",
      options: ["Encapsulation", "Inheritance", "Instantiation", "Compilation"],
      correctIndex: 1,
      explanation: "**Inheritance** (Pewarisan) memungkinkan *Child Class* mewarisi sifat dan perilaku dari *Parent Class*."
    },
    {
      question: "Bagaimana penulisan sintaks yang benar agar class `DokterAnak` mewarisi class `Dokter`?",
      options: [
        "class DokterAnak extends Dokter:",
        "class DokterAnak(Dokter):",
        "class DokterAnak -> Dokter:",
        "class DokterAnak inherits Dokter:"
      ],
      correctIndex: 1,
      explanation: "Di Python, pewarisan ditulis dengan mencantumkan nama *Parent Class* di dalam tanda kurung: `class DokterAnak(Dokter):`."
    },
    {
      question: "Fungsi bawaan apakah yang digunakan di dalam *Child Class* untuk memanggil `__init__()` atau *method* milik *Parent Class*?",
      options: ["parent()", "base()", "super()", "this()"],
      correctIndex: 2,
      explanation: "Fungsi `super()` mengembalikan referensi ke *Parent Class* (*Superclass*)."
    },
    {
      question: "Manakah cara yang benar untuk memanggil constructor induk dari dalam `__init__(self, nama, nim)` milik *Child Class*?",
      options: [
        "super().__init__(self, nama)",
        "super().__init__(nama)",
        "Parent.__init__()",
        "self.super(nama)"
      ],
      correctIndex: 1,
      explanation: "Saat menggunakan `super().__init__(nama)`, argumen `self` tidak perlu ditulis lagi karena otomatis disertakan oleh `super()`."
    },
    {
      question: "Jika `class Kucing(Hewan): pass` tidak memiliki method `__init__()` sendiri, apa yang terjadi saat kita membuat objek `k = Kucing('Milo')`?",
      options: [
        "Python otomatis menjalankan method __init__() milik class induk Hewan",
        "Terjadi SyntaxError",
        "Objek k tidak memiliki atribut apa pun",
        "Python menolak membuat objek"
      ],
      correctIndex: 0,
      explanation: "Jika *Child Class* tidak mendefinisikan `__init__()` sendiri, Python secara otomatis mencari dan menjalankan `__init__()` milik *Parent Class*-nya."
    },
    {
      question: "Jika `mobil_listrik` adalah objek dari `class MobilListrik(Kendaraan):`, apakah hasil dari `isinstance(mobil_listrik, Kendaraan)`?",
      options: ["True", "False", "None", "TypeError"],
      correctIndex: 0,
      explanation: "Setiap objek dari *Child Class* (`MobilListrik`) secara otomatis juga merupakan *instance* dari *Parent Class*-nya (`Kendaraan`), sehingga menghasilkan `True`."
    },
    {
      question: "Fungsi manakah yang digunakan untuk memeriksa apakah `class Manajer` merupakan turunan dari `class Pegawai`?",
      options: [
        "isinstance(Manajer, Pegawai)",
        "issubclass(Manajer, Pegawai)",
        "ischild(Manajer, Pegawai)",
        "type(Manajer) == Pegawai"
      ],
      correctIndex: 1,
      explanation: "Fungsi `issubclass(KelasAnak, KelasInduk)` digunakan untuk menguji hubungan pewarisan antar dua `class`."
    },
    {
      question: "Apakah *Parent Class* ikut mewarisi atribut atau *method* baru yang ditambahkan khusus di dalam *Child Class*?",
      options: [
        "Ya, Parent Class otomatis memiliki semua method Child Class",
        "Tidak, pewarisan berjalan satu arah dari Parent Class ke Child Class",
        "Hanya jika menggunakan @staticmethod",
        "Hanya jika atributnya bersifat Private"
      ],
      correctIndex: 1,
      explanation: "Pewarisan bersifat satu arah dari atas ke bawah: *Child Class* mewarisi milik *Parent Class*, tetapi *Parent Class* tidak memiliki fitur spesifik milik *Child Class*."
    },
    {
      question: "Berapa banyak *Child Class* berbeda yang boleh mewarisi satu *Parent Class* yang sama (misal `Kendaraan`)?",
      options: [
        "Maksimal 1 Child Class",
        "Maksimal 2 Child Class",
        "Tidak terbatas (boleh sebanyak mungkin sesuai kebutuhan, seperti Mobil, Motor, Truk, Bus)",
        "Tidak boleh sama sekali"
      ],
      correctIndex: 2,
      explanation: "Satu *Parent Class* dapat diwariskan ke banyak *Child Class* sekaligus tanpa batas."
    },
    {
      question: "Apa keuntungan utama menggunakan `Inheritance` dalam pengembangan aplikasi besar?",
      options: [
        "Menghindari duplikasi kode (kode umum cukup ditulis 1 kali di Parent Class dan dipakai ulang oleh semua Child Class)",
        "Membuat kode tidak membutuhkan fungsi def",
        "Menghilangkan kebutuhan variabel",
        "Mengubah bahasa Python menjadi C++"
      ],
      correctIndex: 0,
      explanation: "*Inheritance* mendukung prinsip *Code Reusability* (penggunaan ulang kode) sehingga pemeliharaan program jauh lebih mudah."
    }
  ]
};
