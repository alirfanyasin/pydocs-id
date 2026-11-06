import { DocSection } from "../types";

export const bab6Polymorphism: DocSection = {
  id: "oop-bab6-polymorphism",
  number: 6,
  filePath: "app/data/oop-chapters/bab6-polymorphism.ts",
  title: "Polymorphism, Method Overriding & Abstract Class (abc)",
  subtitle:
    "Menguasai konsep *Polymorphism* (banyak bentuk), menimpa perilaku induk dengan *Method Overriding*, serta membuat kontrak struktur menggunakan *Abstract Base Class* (`ABC`).",
  level: "Menengah",
  readTime: "15 menit",
  summary:
    "**Polymorphism** berasal dari bahasa Yunani yang berarti *'banyak bentuk'*. Dalam OOP, *Polymorphism* memungkinkan beberapa `class` yang berbeda memiliki **nama method yang sama**, namun masing-masing menjalankan **perilaku atau rumus yang berbeda** sesuai jenis objeknya. Teknik ketika *Child Class* mendefinisikan ulang method dengan nama yang sama seperti di *Parent Class* disebut **Method Overriding**. Selain itu, Python menyediakan modul `abc` (*Abstract Base Class*) dengan dekorator `@abstractmethod` untuk mewajibkan setiap *Child Class* mengimplementasikan method tertentu.",
  keyPoints: [
    "**Method Overriding**: Mendefinisikan ulang sebuah *method* di *Child Class* dengan nama yang sama persis seperti di *Parent Class* untuk mengganti perilakunya.",
    "**Polymorphism dalam Loop**: Karena beberapa class memiliki nama method yang sama (misal `.proses_bayar()` atau `.hitung_luas()`), kita dapat memanggilnya secara seragam di dalam perulangan `for`.",
    "**Abstract Base Class (`ABC`)**: Class kerangka dasar dari modul `from abc import ABC, abstractmethod` yang **tidak bisa dibuat objeknya secara langsung**.",
    "`@abstractmethod`: Menandai bahwa method tersebut wajib di-*override* (dibuat implementasinya) oleh setiap *Child Class* yang mewarisi *Abstract Class* tersebut."
  ],
  conceptTable: {
    title: "Konsep Polymorphism, Method Overriding & Abstract Class",
    headers: ["Konsep", "Contoh Penerapan", "Perilaku Saat Dijalankan"],
    rows: [
      ["Method Overriding", "Child Class mendefinisikan ulang `def bersuara(self):`", "Python memprioritaskan method milik *Child Class* dibanding *Parent Class*."],
      ["Polymorphism", "for alat in [Gitar(), Piano()]:\n    alat.mainkan()", "Memanggil `.mainkan()` yang sama namun menghasilkan suara yang berbeda."],
      ["Abstract Class", "class Bentuk(ABC):", "Tidak bisa diinstansiasi langsung (`Bentuk()` akan memicu `TypeError`)."],
      ["@abstractmethod", "@abstractmethod\ndef luas(self): pass", "Mewajibkan seluruh subclass (`Persegi`, `Lingkaran`) membuat method `luas()`."]
    ]
  },
  examples: [
    {
      id: "oop-bab6-ex1",
      title: "1. Method Overriding pada Child Class",
      description:
        "Setiap jenis pengiriman (`KurirReguler`, `KurirKilat`) menimpa (*override*) method `hitung_ongkir()` milik `Kurir` dengan rumus perhitungannya masing-masing.",
      code: `class Kurir:
    def __init__(self, berat_kg):
        self.berat_kg = berat_kg

    def hitung_ongkir(self):
        return self.berat_kg * 10000

class KurirReguler(Kurir):
    # Meng-override method hitung_ongkir
    def hitung_ongkir(self):
        return self.berat_kg * 9000

class KurirKilat(Kurir):
    # Meng-override method hitung_ongkir dengan biaya ekspres + asuransi
    def hitung_ongkir(self):
        return (self.berat_kg * 18000) + 5000

paket_reg = KurirReguler(3)
paket_kilat = KurirKilat(3)

print(f"Ongkir Reguler (3 kg) : Rp{paket_reg.hitung_ongkir():,}")
print(f"Ongkir Kilat (3 kg)   : Rp{paket_kilat.hitung_ongkir():,}")`,
      output: `Ongkir Reguler (3 kg) : Rp27,000
Ongkir Kilat (3 kg)   : Rp59,000`,
      lineExplanations: [
        {
          line: "def hitung_ongkir(self):",
          explanation: "Karena ditulis ulang di dalam `KurirKilat`, Python akan menjalankan versi `KurirKilat` alih-alih versi induk `Kurir` (*Method Overriding*)."
        }
      ]
    },
    {
      id: "oop-bab6-ex2",
      title: "2. Polymorphism dalam Perulangan (Berbagai Metode Pembayaran)",
      description:
        "Meskipun objek berasal dari class yang berbeda-beda (`TransferBank`, `DompetDigital`, `KartuKredit`), kasir cukup memanggil method `.bayar(nominal)` yang seragam di dalam `for` loop!",
      code: `class TransferBank:
    def bayar(self, nominal):
        return f"Transfer Bank Rp{nominal:,} (Admin Rp2.500)"

class DompetDigital:
    def bayar(self, nominal):
        return f"QRIS E-Wallet Rp{nominal:,} (Bebas Admin)"

class KartuKredit:
    def bayar(self, nominal):
        return f"Kartu Kredit Rp{nominal:,} (Cicilan 0%)"

# Polymorphism: memproses berbagai objek berbeda dengan satu antarmuka method yang sama
daftar_metode = [TransferBank(), DompetDigital(), KartuKredit()]

for metode in daftar_metode:
    print("->", metode.bayar(250000))`,
      output: `-> Transfer Bank Rp250,000 (Admin Rp2.500)
-> QRIS E-Wallet Rp250,000 (Bebas Admin)
-> Kartu Kredit Rp250,000 (Cicilan 0%)`,
      lineExplanations: [
        {
          line: "for metode in daftar_metode:\n    print(\"->\", metode.bayar(250000))",
          explanation: "Loop tidak perlu mengecek `if` jenis class satu per satu, karena setiap objek sudah memiliki method `.bayar()` masing-masing."
        }
      ]
    },
    {
      id: "oop-bab6-ex3",
      title: "3. Membuat Kontrak Wajib dengan Abstract Base Class (ABC)",
      description:
        "Menggunakan `ABC` dan `@abstractmethod` agar setiap bangun datar turunan `BangunDatar` diwajibkan memiliki method `hitung_luas()`.",
      code: `from abc import ABC, abstractmethod

class BangunDatar(ABC):
    @abstractmethod
    def hitung_luas(self):
        pass

class Persegi(BangunDatar):
    def __init__(self, sisi):
        self.sisi = sisi

    def hitung_luas(self):
        return self.sisi * self.sisi

class Segitiga(BangunDatar):
    def __init__(self, alas, tinggi):
        self.alas = alas
        self.tinggi = tinggi

    def hitung_luas(self):
        return int(0.5 * self.alas * self.tinggi)

bentuk1 = Persegi(8)
bentuk2 = Segitiga(10, 6)

print("Luas Persegi  :", bentuk1.hitung_luas())
print("Luas Segitiga :", bentuk2.hitung_luas())`,
      output: `Luas Persegi  : 64
Luas Segitiga : 30`,
      lineExplanations: [
        {
          line: "class BangunDatar(ABC):",
          explanation: "Mewarisi `ABC` menjadikan `BangunDatar` sebagai *Abstract Class* yang berfungsi sebagai kontrak/kerangka."
        },
        {
          line: "@abstractmethod\n    def hitung_luas(self):",
          explanation: "Setiap class turunan dari `BangunDatar` WAJIB membuat method `hitung_luas(self)` atau Python akan menolak membuat objeknya."
        }
      ]
    }
  ],
  tips: [
    "Gunakan *Polymorphism* untuk menggantikan rangkaian `if-elif-else` yang terlalu panjang ketika memproses berbagai tipe objek yang sejenis.",
    "Ingat bahwa *Abstract Class* yang memiliki `@abstractmethod` tidak bisa dibuat objeknya secara langsung (hanya class turunannya yang sudah melengkapi method abstrak tersebut yang bisa diinstansiasi)."
  ],
  commonMistakes: [
    {
      wrong: "from abc import ABC, abstractmethod\nclass Alat(ABC):\n    @abstractmethod\n    def nyala(self): pass\na = Alat()  # Mencoba membuat objek langsung dari Abstract Class",
      correct: "class Kipas(Alat):\n    def nyala(self): return 'Berputar'\nk = Kipas()",
      reason: "*Abstract Class* yang memiliki `@abstractmethod` tidak boleh diinstansiasi secara langsung (`Alat()` akan memicu `TypeError: Can't instantiate abstract class`)."
    }
  ],
  caseStudies: [
    {
      id: "oop-bab6-case1",
      title: "Sistem Notifikasi Multi-Channel Aplikasi Perbankan (Polymorphism)",
      difficulty: "Mudah",
      scenario:
        "Sistem keamanan bank mengirimkan pesan peringatan transaksi melalui berbagai saluran: `NotifikasiEmail` dan `NotifikasiSMS`. Keduanya memiliki method dengan nama yang sama yaitu `kirim(self, pesan)`, namun format pengirimannya berbeda.",
      instructions:
        "Lengkapi method `kirim(self, pesan)` pada `NotifikasiSMS` agar mengembalikan `f'[SMS] {pesan}'`, lalu jalankan perulangan *Polymorphism*-nya!",
      tasks: [
        "Definisikan `def kirim(self, pesan):` di dalam `NotifikasiSMS`.",
        "Kembalikan `f'[SMS] {pesan}'`."
      ],
      starterCode: `class NotifikasiEmail:
    def kirim(self, pesan):
        return f"[EMAIL] {pesan}"

class NotifikasiSMS:
    # Buat method kirim(self, pesan) yang me-return f"[SMS] {pesan}":
    

saluran_aktif = [NotifikasiEmail(), NotifikasiSMS()]
for saluran in saluran_aktif:
    print(saluran.kirim("Kode OTP Anda: 8821"))`,
      expectedOutput: `[EMAIL] Kode OTP Anda: 8821
[SMS] Kode OTP Anda: 8821`,
      hint: 'Di dalam `NotifikasiSMS`, tulis `def kirim(self, pesan):` lalu `return f"[SMS] {pesan}"`.',
      solutionCode: `class NotifikasiEmail:
    def kirim(self, pesan):
        return f"[EMAIL] {pesan}"

class NotifikasiSMS:
    def kirim(self, pesan):
        return f"[SMS] {pesan}"

saluran_aktif = [NotifikasiEmail(), NotifikasiSMS()]
for saluran in saluran_aktif:
    print(saluran.kirim("Kode OTP Anda: 8821"))`
    },
    {
      id: "oop-bab6-case2",
      title: "Perhitungan Pajak Kendaraan Bermotor dengan Abstract Class",
      difficulty: "Sedang",
      scenario:
        "Samsat daerah membuat *Abstract Base Class* `PajakKendaraan(ABC)` dengan `@abstractmethod def hitung_pajak(self):`. Class turunan `PajakMotor` menghitung pajak sebesar `nilai_jual * 0.02`, sedangkan `PajakMobil` menghitung pajak sebesar `nilai_jual * 0.05`.",
      instructions:
        "Implementasikan method `hitung_pajak(self)` pada class `PajakMobil` agar mengembalikan `int(self.nilai_jual * 0.05)`!",
      tasks: [
        "Buat method `def hitung_pajak(self):` di dalam `PajakMobil`.",
        "Kembalikan `int(self.nilai_jual * 0.05)`."
      ],
      starterCode: `from abc import ABC, abstractmethod

class PajakKendaraan(ABC):
    def __init__(self, nilai_jual):
        self.nilai_jual = nilai_jual

    @abstractmethod
    def hitung_pajak(self):
        pass

class PajakMotor(PajakKendaraan):
    def hitung_pajak(self):
        return int(self.nilai_jual * 0.02)

class PajakMobil(PajakKendaraan):
    # Implementasikan method hitung_pajak(self) untuk PajakMobil (5%):
    

motor = PajakMotor(20000000)
mobil = PajakMobil(200000000)

print(f"Pajak Motor : Rp{motor.hitung_pajak():,}")
print(f"Pajak Mobil : Rp{mobil.hitung_pajak():,}")`,
      expectedOutput: `Pajak Motor : Rp400,000
Pajak Mobil : Rp10,000,000`,
      hint: "Di dalam `PajakMobil`, tulis `def hitung_pajak(self):` lalu `return int(self.nilai_jual * 0.05)`.",
      solutionCode: `from abc import ABC, abstractmethod

class PajakKendaraan(ABC):
    def __init__(self, nilai_jual):
        self.nilai_jual = nilai_jual

    @abstractmethod
    def hitung_pajak(self):
        pass

class PajakMotor(PajakKendaraan):
    def hitung_pajak(self):
        return int(self.nilai_jual * 0.02)

class PajakMobil(PajakKendaraan):
    def hitung_pajak(self):
        return int(self.nilai_jual * 0.05)

motor = PajakMotor(20000000)
mobil = PajakMobil(200000000)

print(f"Pajak Motor : Rp{motor.hitung_pajak():,}")
print(f"Pajak Mobil : Rp{mobil.hitung_pajak():,}")`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab6-challenge1",
      title: "Method Overriding Suara Hewan",
      difficulty: "Mudah",
      instructions:
        "Override method `bersuara(self)` di dalam class `Sapi(Hewan)` agar mengembalikan `'Mooo!'`!",
      tasks: [
        "Definisikan `def bersuara(self):` di dalam `class Sapi(Hewan):`.",
        "Kembalikan string `'Mooo!'`."
      ],
      starterCode: `class Hewan:
    def bersuara(self):
        return "Suara hewan..."

class Sapi(Hewan):
    # Override method bersuara(self) di sini:
    

s = Sapi()
print("Suara Sapi:", s.bersuara())`,
      expectedOutput: `Suara Sapi: Mooo!`,
      hint: 'Tulis `def bersuara(self):` lalu `return "Mooo!"`.',
      solutionCode: `class Hewan:
    def bersuara(self):
        return "Suara hewan..."

class Sapi(Hewan):
    def bersuara(self):
        return "Mooo!"

s = Sapi()
print("Suara Sapi:", s.bersuara())`
    },
    {
      id: "oop-bab6-challenge2",
      title: "Override Perhitungan Diskon Pelanggan",
      difficulty: "Mudah",
      instructions:
        "Class `PelangganBiasa` memberikan diskon `0`. Override method `hitung_diskon(self, belanja)` pada class `PelangganGold(PelangganBiasa)` agar mengembalikan potongan 10% (`int(belanja * 0.10)`)!",
      tasks: [
        "Definisikan `def hitung_diskon(self, belanja):` di dalam `PelangganGold`.",
        "Kembalikan `int(belanja * 0.10)`."
      ],
      starterCode: `class PelangganBiasa:
    def hitung_diskon(self, belanja):
        return 0

class PelangganGold(PelangganBiasa):
    # Override hitung_diskon(self, belanja) agar me-return int(belanja * 0.10):
    

p = PelangganGold()
print("Diskon Gold:", p.hitung_diskon(200000))`,
      expectedOutput: `Diskon Gold: 20000`,
      hint: "Tulis `def hitung_diskon(self, belanja):` lalu `return int(belanja * 0.10)`.",
      solutionCode: `class PelangganBiasa:
    def hitung_diskon(self, belanja):
        return 0

class PelangganGold(PelangganBiasa):
    def hitung_diskon(self, belanja):
        return int(belanja * 0.10)

p = PelangganGold()
print("Diskon Gold:", p.hitung_diskon(200000))`
    },
    {
      id: "oop-bab6-challenge3",
      title: "Menjalankan Polymorphism di Dalam Perulangan for",
      difficulty: "Sedang",
      instructions:
        "Terdapat objek `DokumenPDF()` dan `DokumenWord()` yang sama-sama memiliki method `ekspor()`. Panggil `dok.ekspor()` di dalam perulangan `for`!",
      tasks: [
        "Di dalam loop `for dok in daftar_dokumen:`, cetak `print(dok.ekspor())`."
      ],
      starterCode: `class DokumenPDF:
    def ekspor(self):
        return "Mengekspor ke format .pdf"

class DokumenWord:
    def ekspor(self):
        return "Mengekspor ke format .docx"

daftar_dokumen = [DokumenPDF(), DokumenWord()]

for dok in daftar_dokumen:
    # Cetak hasil dok.ekspor() di sini:
    `,
      expectedOutput: `Mengekspor ke format .pdf
Mengekspor ke format .docx`,
      hint: "Di dalam loop `for`, tulis: `print(dok.ekspor())`",
      solutionCode: `class DokumenPDF:
    def ekspor(self):
        return "Mengekspor ke format .pdf"

class DokumenWord:
    def ekspor(self):
        return "Mengekspor ke format .docx"

daftar_dokumen = [DokumenPDF(), DokumenWord()]

for dok in daftar_dokumen:
    print(dok.ekspor())`
    },
    {
      id: "oop-bab6-challenge4",
      title: "Membuat Abstract Base Class dengan @abstractmethod",
      difficulty: "Sedang",
      instructions:
        "Tambahkan dekorator `@abstractmethod` pada method `jalankan_mesin(self)` di dalam abstract class `KendaraanAbstrak(ABC)`, lalu implementasikan pada class `KeretaApi`!",
      tasks: [
        "Tambahkan `@abstractmethod` di atas `def jalankan_mesin(self):` pada `KendaraanAbstrak`.",
        "Pastikan `KeretaApi` mengembalikan `'Mesin lokomotif aktif!'`."
      ],
      starterCode: `from abc import ABC, abstractmethod

class KendaraanAbstrak(ABC):
    # Tambahkan dekorator @abstractmethod di bawah ini:
    def jalankan_mesin(self):
        pass

class KeretaApi(KendaraanAbstrak):
    def jalankan_mesin(self):
        return "Mesin lokomotif aktif!"

ka = KeretaApi()
print(ka.jalankan_mesin())`,
      expectedOutput: `Mesin lokomotif aktif!`,
      hint: "Tulis `@abstractmethod` tepat di atas `def jalankan_mesin(self):` di dalam `KendaraanAbstrak`.",
      solutionCode: `from abc import ABC, abstractmethod

class KendaraanAbstrak(ABC):
    @abstractmethod
    def jalankan_mesin(self):
        pass

class KeretaApi(KendaraanAbstrak):
    def jalankan_mesin(self):
        return "Mesin lokomotif aktif!"

ka = KeretaApi()
print(ka.jalankan_mesin())`
    },
    {
      id: "oop-bab6-challenge5",
      title: "Polymorphism Perhitungan Gaji Pegawai Tetap vs Freelancer",
      difficulty: "Menantang",
      instructions:
        "Baik `PegawaiTetap` maupun `Freelancer` merupakan turunan `Pekerja(ABC)` dan wajib mengimplementasikan `hitung_upah(self)`. Lengkapi `hitung_upah(self)` pada `Freelancer` agar mengembalikan `self.jam_kerja * self.tarif_per_jam`!",
      tasks: [
        "Implementasikan `def hitung_upah(self):` di dalam `Freelancer`.",
        "Kembalikan `self.jam_kerja * self.tarif_per_jam`."
      ],
      starterCode: `from abc import ABC, abstractmethod

class Pekerja(ABC):
    @abstractmethod
    def hitung_upah(self):
        pass

class PegawaiTetap(Pekerja):
    def __init__(self, gaji_bulanan):
        self.gaji_bulanan = gaji_bulanan

    def hitung_upah(self):
        return self.gaji_bulanan

class Freelancer(Pekerja):
    def __init__(self, jam_kerja, tarif_per_jam):
        self.jam_kerja = jam_kerja
        self.tarif_per_jam = tarif_per_jam

    # Implementasikan method hitung_upah(self) di sini:
    

tim = [PegawaiTetap(6000000), Freelancer(40, 100000)]
for orang in tim:
    print(f"Upah: Rp{orang.hitung_upah():,}")`,
      expectedOutput: `Upah: Rp6,000,000
Upah: Rp4,000,000`,
      hint: "Di dalam `Freelancer`, tulis `def hitung_upah(self):` lalu `return self.jam_kerja * self.tarif_per_jam`.",
      solutionCode: `from abc import ABC, abstractmethod

class Pekerja(ABC):
    @abstractmethod
    def hitung_upah(self):
        pass

class PegawaiTetap(Pekerja):
    def __init__(self, gaji_bulanan):
        self.gaji_bulanan = gaji_bulanan

    def hitung_upah(self):
        return self.gaji_bulanan

class Freelancer(Pekerja):
    def __init__(self, jam_kerja, tarif_per_jam):
        self.jam_kerja = jam_kerja
        self.tarif_per_jam = tarif_per_jam

    def hitung_upah(self):
        return self.jam_kerja * self.tarif_per_jam

tim = [PegawaiTetap(6000000), Freelancer(40, 100000)]
for orang in tim:
    print(f"Upah: Rp{orang.hitung_upah():,}")`
    }
  ],
  quizzes: [
    {
      question: "Apa arti dari istilah **Polymorphism** di dalam pemrograman berorientasi objek?",
      options: [
        "Menyembunyikan atribut menggunakan dua garis bawah",
        "Kemampuan berbagai objek dari class berbeda untuk merespons pemanggilan nama method yang sama dengan perilaku masing-masing",
        "Menghapus class induk setelah objek dibuat",
        "Membatasi class agar hanya memiliki satu objek"
      ],
      correctIndex: 1,
      explanation: "*Polymorphism* (banyak bentuk) memungkinkan beberapa class berbeda memiliki nama method yang sama namun implementasi berbeda."
    },
    {
      question: "Disebut apakah teknik ketika *Child Class* menulis ulang method dengan nama yang sama persis seperti yang ada di *Parent Class*?",
      options: [
        "Method Overriding",
        "Method Deleting",
        "Variable Swapping",
        "Type Casting"
      ],
      correctIndex: 0,
      explanation: "Menimpa atau mendefinisikan ulang method milik *Parent Class* di dalam *Child Class* disebut **Method Overriding**."
    },
    {
      question: "Jika *Child Class* telah melakukan *override* pada method `cetak()`, method manakah yang akan dijalankan saat `anak.cetak()` dipanggil?",
      options: [
        "Method cetak() milik Parent Class",
        "Method cetak() versi baru milik Child Class",
        "Keduanya dijalankan bersamaan secara otomatis",
        "Tidak ada yang dijalankan"
      ],
      correctIndex: 1,
      explanation: "Python selalu memprioritaskan method yang telah di-*override* di dalam *Child Class*."
    },
    {
      question: "Dari modul bawaan manakah kita mengimpor `ABC` dan `abstractmethod` di Python?",
      options: [
        "from oop import ABC, abstractmethod",
        "from abc import ABC, abstractmethod",
        "from sys import ABC, abstractmethod",
        "from class import ABC, abstractmethod"
      ],
      correctIndex: 1,
      explanation: "Modul standar Python untuk *Abstract Base Classes* bernama `abc` (`from abc import ABC, abstractmethod`)."
    },
    {
      question: "Apa yang terjadi jika kita mencoba membuat objek langsung dari sebuah *Abstract Class* yang memiliki `@abstractmethod`?",
      options: [
        "Objek berhasil dibuat dengan nilai None",
        "Python memunculkan TypeError karena Abstract Class tidak bisa diinstansiasi secara langsung",
        "Python otomatis menghapus @abstractmethod",
        "Program berhenti tanpa pesan apa pun"
      ],
      correctIndex: 1,
      explanation: "*Abstract Class* yang memiliki `@abstractmethod` hanya berfungsi sebagai kerangka kontrak dan tidak boleh dibuat objeknya secara langsung."
    },
    {
      question: "Apa syarat wajib bagi sebuah *Child Class* yang mewarisi *Abstract Base Class* agar bisa dibuat objeknya?",
      options: [
        "Harus mengimplementasikan (meng-override) seluruh method yang ditandai @abstractmethod pada Parent Class",
        "Tidak boleh memiliki __init__()",
        "Harus menggunakan kata kunci pass",
        "Harus memiliki minimal 10 atribut"
      ],
      correctIndex: 0,
      explanation: "Seluruh `@abstractmethod` dari class induk wajib dibuat implementasinya di dalam *Child Class*."
    },
    {
      question: "Apa yang terjadi jika sebuah *Child Class* mewarisi *Abstract Class* namun LUPA mengimplementasikan salah satu `@abstractmethod`-nya?",
      options: [
        "Child Class tersebut ikut dianggap abstrak dan memicu TypeError saat dibuat objeknya",
        "Python otomatis mengisi method tersebut dengan angka 0",
        "Program tetap berjalan normal",
        "Terjadi ZeroDivisionError"
      ],
      correctIndex: 0,
      explanation: "Jika ada satu saja `@abstractmethod` yang belum diimplementasikan, *Child Class* tersebut tidak diizinkan untuk diinstansiasi (`TypeError`)."
    },
    {
      question: "Apakah *Polymorphism* di Python hanya bekerja jika class-class tersebut mewarisi *Parent Class* yang sama?",
      options: [
        "Ya, wajib memiliki Parent Class yang sama",
        "Tidak, berkat Duck Typing di Python, class apa pun yang memiliki nama method yang sama dapat dipanggil secara polimorfik",
        "Hanya bekerja untuk tipe data angka",
        "Hanya bekerja di dalam fungsi lambda"
      ],
      correctIndex: 1,
      explanation: "Python mendukung *Duck Typing*: selama beberapa objek memiliki nama method yang sama (misal `.bayar()`), mereka dapat diproses secara polimorfik di dalam perulangan."
    },
    {
      question: "Apa manfaat utama menggabungkan *Abstract Base Class* (`ABC`) dan *Polymorphism* dalam kerja tim developer?",
      options: [
        "Menjamin bahwa setiap developer yang membuat class turunan baru pasti menyediakan nama method standar yang seragam",
        "Membuat ukuran file kode menjadi 0 byte",
        "Menghilangkan kebutuhan pengujian program",
        "Menggantikan fungsi perulangan for"
      ],
      correctIndex: 0,
      explanation: "*Abstract Class* bertindak sebagai kontrak resmi sehingga semua class turunan pasti memiliki antarmuka method yang konsisten."
    },
    {
      question: "Pada kode `for hewan in [Kucing(), Anjing()]: print(hewan.suara())`, mengapa kita tidak perlu menulis `if isinstance(hewan, Kucing):`?",
      options: [
        "Karena Python tidak memiliki fungsi isinstance",
        "Karena melalui Polymorphism, masing-masing objek otomatis menjalankan method .suara() miliknya sendiri",
        "Karena Kucing dan Anjing adalah objek yang sama",
        "Karena perulangan for hanya berjalan 1 kali"
      ],
      correctIndex: 1,
      explanation: "Itulah keunggulan utama *Polymorphism*: objek secara cerdas mengeksekusi method miliknya sendiri tanpa perlu percabangan `if-else` manual."
    }
  ]
};

