import { DocSection } from "../types";

export const bab4Encapsulation: DocSection = {
  id: "oop-bab4-encapsulation",
  number: 4,
  filePath: "app/data/oop-chapters/bab4-encapsulation.ts",
  title: "Encapsulation, Private Attribute (__) & @property",
  subtitle:
    "Melindungi data sensitif objek menggunakan konsep *Encapsulation*, atribut *Private* (`__`), method *Getter/Setter*, serta dekorator Pythonic `@property`.",
  level: "Menengah",
  readTime: "14 menit",
  summary:
    "**Encapsulation** (Enkapsulasi) adalah prinsip OOP untuk membungkus data dan membatasi akses langsung ke atribut sensitif dari luar `class` (seperti saldo rekening, PIN, atau nilai rapor) agar tidak diubah sembarangan menjadi nilai yang tidak valid. Di Python, atribut biasa bersifat **Public** (`self.nama`), atribut dengan satu garis bawah bersifat **Protected** (`self._nik` — konvensi internal), dan atribut dengan **dua garis bawah di depan** bersifat **Private** (`self.__saldo`). Untuk membaca dan mengubah atribut *Private* dengan aman, kita menggunakan method **Getter & Setter** atau dekorator modern `@property`.",
  keyPoints: [
    "**Public Attribute** (`self.nama`): Bebas diakses dan diubah dari luar `class`.",
    "**Protected Attribute** (`self._kode`): Diawali 1 garis bawah (`_`). Memberi tanda kepada programmer lain bahwa atribut ini sebaiknya hanya diakses di dalam `class` atau *subclass*.",
    "**Private Attribute** (`self.__saldo`): Diawali 2 garis bawah (`__`). Tidak bisa diakses langsung dari luar seperti `obj.__saldo` (akan memicu `AttributeError`).",
    "**Getter & Setter Method**: Method khusus seperti `get_saldo(self)` untuk membaca nilai `__saldo` dan `set_saldo(self, nilai)` untuk memvalidasi data sebelum disimpan.",
    "Dekorator `@property` (Getter) dan `@nama_properti.setter` (Setter) memungkinkan kita memanggil method validasi seolah-olah mengakses atribut biasa (`obj.harga = 50000`)."
  ],
  conceptTable: {
    title: "Tingkat Akses Atribut (Access Modifiers) di Python",
    headers: ["Tingkat Akses", "Penulisan di __init__", "Akses Langsung dari Luar?", "Kegunaan Utama"],
    rows: [
      ["Public", "self.nama = nama", "Bisa (`obj.nama`)", "Data umum yang aman diakses langsung."],
      ["Protected", "self._divisi = divisi", "Bisa, tapi tidak disarankan", "Atribut internal untuk class dan turunannya (*subclass*)."],
      ["Private", "self.__saldo = saldo", "Tidak (`AttributeError`)", "Data sensitif yang wajib divalidasi lewat method / `@property`."],
      ["@property", "@property\ndef saldo(self):", "Diakses seperti atribut (`obj.saldo`)", "Membaca atribut private dengan sintaks yang bersih."],
      ["@x.setter", "@saldo.setter\ndef saldo(self, v):", "Diubah seperti atribut (`obj.saldo = v`)", "Memvalidasi nilai baru sebelum disimpan ke atribut private."]
    ]
  },
  examples: [
    {
      id: "oop-bab4-ex1",
      title: "1. Melindungi Data dengan Private Attribute (__) & Getter/Setter",
      description:
        "Atribut `__saldo` tidak dapat diubah sembarangan dari luar `class`. Perubahan saldo hanya bisa dilakukan melalui method yang memvalidasi nominalnya.",
      code: `class RekeningTabungan:
    def __init__(self, pemilik, saldo_awal):
        self.pemilik = pemilik       # Public attribute
        self.__saldo = saldo_awal    # Private attribute (diawali __)

    # Getter method untuk melihat saldo
    def get_saldo(self):
        return self.__saldo

    # Setter / Mutator method dengan validasi keamanan
    def setor_tunai(self, nominal):
        if nominal > 0:
            self.__saldo += nominal
            return f"Setor Rp{nominal:,} berhasil!"
        return "Nominal setor harus lebih dari 0!"

rekening = RekeningTabungan("Andi", 500000)
print("Pemilik Rekening :", rekening.pemilik)
print("Saldo Awal       : Rp" + f"{rekening.get_saldo():,}")
print(rekening.setor_tunai(250000))
print("Saldo Sekarang   : Rp" + f"{rekening.get_saldo():,}")`,
      output: `Pemilik Rekening : Andi
Saldo Awal       : Rp500,000
Setor Rp250,000 berhasil!
Saldo Sekarang   : Rp750,000`,
      lineExplanations: [
        {
          line: "self.__saldo = saldo_awal",
          explanation: "Dua garis bawah di depan (`__saldo`) menjadikan atribut ini *Private* sehingga terlindung dari akses langsung `rekening.__saldo`."
        },
        {
          line: "def get_saldo(self):\n        return self.__saldo",
          explanation: "Di dalam blok `class` itu sendiri, kita tetap bisa membaca `self.__saldo` dan mengembalikannya lewat method *Getter*."
        }
      ]
    },
    {
      id: "oop-bab4-ex2",
      title: "2. Cara Pythonic Menggunakan @property dan @setter",
      description:
        "Dengan `@property`, kita bisa membaca dan mengubah atribut *private* menggunakan sintaks titik biasa (`produk.harga = ...`) namun tetap melewati pengecekan validasi!",
      code: `class ProdukElektronik:
    def __init__(self, nama, harga):
        self.nama = nama
        self.__harga = harga

    @property
    def harga(self):
        return self.__harga

    @harga.setter
    def harga(self, harga_baru):
        if harga_baru >= 0:
            self.__harga = harga_baru
        else:
            print("Peringatan: Harga tidak boleh negatif!")

laptop = ProdukElektronik("Laptop Pro", 12000000)
print(f"Harga awal {laptop.nama} : Rp{laptop.harga:,}")

# Mencoba mengubah dengan angka negatif (akan ditolak oleh setter)
laptop.harga = -5000

# Mengubah dengan harga yang valid
laptop.harga = 11500000
print(f"Harga promo {laptop.nama}: Rp{laptop.harga:,}")`,
      output: `Harga awal Laptop Pro : Rp12,000,000
Peringatan: Harga tidak boleh negatif!
Harga promo Laptop Pro: Rp11,500,000`,
      lineExplanations: [
        {
          line: "@property\n    def harga(self):",
          explanation: "Mengizinkan pemanggilan `laptop.harga` tanpa tanda kurung `()` untuk membaca nilai `self.__harga`."
        },
        {
          line: "@harga.setter\n    def harga(self, harga_baru):",
          explanation: "Otomatis dijalankan saat kita menulis `laptop.harga = ...`, sehingga harga negatif dapat dicegah."
        }
      ]
    },
    {
      id: "oop-bab4-ex3",
      title: "3. Read-Only Property (Properti Hitungan Otomatis dengan @property)",
      description:
        "Dekorator `@property` tanpa `@setter` juga sangat berguna untuk membuat atribut *Read-Only* (hanya bisa dibaca) yang nilainya dihitung otomatis dari atribut lain.",
      code: `class KaryawanKontrak:
    def __init__(self, nama, gaji_pokok, bonus):
        self.nama = nama
        self.gaji_pokok = gaji_pokok
        self.bonus = bonus

    @property
    def total_penghasilan(self):
        return self.gaji_pokok + self.bonus

staf = KaryawanKontrak("Budi Santoso", 5000000, 1200000)
print(f"Karyawan          : {staf.nama}")
print(f"Total Penghasilan : Rp{staf.total_penghasilan:,}")`,
      output: `Karyawan          : Budi Santoso
Total Penghasilan : Rp6,200,000`,
      lineExplanations: [
        {
          line: "@property\n    def total_penghasilan(self):",
          explanation: "Membuat `staf.total_penghasilan` dapat diakses seperti atribut biasa, tetapi nilainya selalu dihitung segar dari `gaji_pokok + bonus`."
        }
      ]
    }
  ],
  tips: [
    "Gunakan atribut *Private* (`__nama`) ketika sebuah atribut membutuhkan aturan validasi ketat (misalnya umur tidak boleh negatif, nilai ujian harus antara 0–100).",
    "Nama method pada `@property` dan `@nama.setter` harus sama persis."
  ],
  commonMistakes: [
    {
      wrong: "akun = RekeningTabungan('Andi', 100000)\nprint(akun.__saldo)  # Akses langsung ke atribut private",
      correct: "akun = RekeningTabungan('Andi', 100000)\nprint(akun.get_saldo())",
      reason: "Mengakses `akun.__saldo` secara langsung dari luar `class` akan memicu `AttributeError` karena atribut dengan awalan `__` disembunyikan oleh Python."
    }
  ],
  caseStudies: [
    {
      id: "oop-bab4-case1",
      title: "Sistem Pengaturan Suhu AC Ruangan Server (Getter & Setter)",
      difficulty: "Mudah",
      scenario:
        "Ruang server perusahaan menggunakan AC otomatis `ACServer` yang suhunya (`__suhu`) dikunci sebagai atribut *Private*. Teknisi hanya diizinkan mengubah suhu melalui method `atur_suhu(self, suhu_baru)` apabila nilainya berada di rentang aman antara `16` hingga `24` derajat Celcius.",
      instructions:
        "Lengkapi method getter `get_suhu(self)` dan setter `atur_suhu(self, suhu_baru)` yang hanya mengubah `self.__suhu = suhu_baru` jika `16 <= suhu_baru <= 24`!",
      tasks: [
        "Kembalikan `self.__suhu` pada method `get_suhu(self)`.",
        "Di dalam `atur_suhu`, cek `if 16 <= suhu_baru <= 24:` lalu simpan `self.__suhu = suhu_baru`."
      ],
      starterCode: `class ACServer:
    def __init__(self, suhu_awal):
        self.__suhu = suhu_awal

    def get_suhu(self):
        # Kembalikan nilai self.__suhu:
        

    def atur_suhu(self, suhu_baru):
        # Ubah self.__suhu hanya jika 16 <= suhu_baru <= 24:
        if 16 <= suhu_baru <= 24:
            

ac = ACServer(20)
ac.atur_suhu(30)  # Di luar batas aman (diabaikan)
ac.atur_suhu(18)  # Di dalam batas aman (diterima)
print(f"Suhu AC Server: {ac.get_suhu()}°C")`,
      expectedOutput: `Suhu AC Server: 18°C`,
      hint: "Tulis `return self.__suhu` di `get_suhu`, dan `self.__suhu = suhu_baru` di dalam blok `if`.",
      solutionCode: `class ACServer:
    def __init__(self, suhu_awal):
        self.__suhu = suhu_awal

    def get_suhu(self):
        return self.__suhu

    def atur_suhu(self, suhu_baru):
        if 16 <= suhu_baru <= 24:
            self.__suhu = suhu_baru

ac = ACServer(20)
ac.atur_suhu(30)
ac.atur_suhu(18)
print(f"Suhu AC Server: {ac.get_suhu()}°C")`
    },
    {
      id: "oop-bab4-case2",
      title: "Validasi Nilai Rapor Siswa dengan @property dan @setter",
      difficulty: "Sedang",
      scenario:
        "Aplikasi rapor digital sekolah menggunakan class `RaporSiswa` dengan atribut private `__nilai`. Guru dapat membaca dan mengubah nilai menggunakan properti `rapor.nilai`, di mana `@nilai.setter` memastikan nilai yang dimasukkan berada di antara `0` sampai `100`.",
      instructions:
        "Lengkapi `@property` `nilai(self)` dan `@nilai.setter` `nilai(self, angka)` pada class `RaporSiswa`!",
      tasks: [
        "Pada `@property def nilai(self):`, kembalikan `self.__nilai`.",
        "Pada `@nilai.setter def nilai(self, angka):`, simpan `self.__nilai = angka` jika `0 <= angka <= 100`."
      ],
      starterCode: `class RaporSiswa:
    def __init__(self, nama, nilai_awal):
        self.nama = nama
        self.__nilai = nilai_awal

    @property
    def nilai(self):
        # Kembalikan self.__nilai:
        

    @nilai.setter
    def nilai(self, angka):
        if 0 <= angka <= 100:
            self.__nilai = angka

siswa = RaporSiswa("Citra", 85)
siswa.nilai = 150  # Tidak valid, diabaikan
siswa.nilai = 95   # Valid, disimpan
print(f"Rapor {siswa.nama}: {siswa.nilai}")`,
      expectedOutput: `Rapor Citra: 95`,
      hint: "Di dalam `@property def nilai(self):`, tulis `return self.__nilai`.",
      solutionCode: `class RaporSiswa:
    def __init__(self, nama, nilai_awal):
        self.nama = nama
        self.__nilai = nilai_awal

    @property
    def nilai(self):
        return self.__nilai

    @nilai.setter
    def nilai(self, angka):
        if 0 <= angka <= 100:
            self.__nilai = angka

siswa = RaporSiswa("Citra", 85)
siswa.nilai = 150
siswa.nilai = 95
print(f"Rapor {siswa.nama}: {siswa.nilai}")`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab4-challenge1",
      title: "Membuat Private Attribute (__) dan Getter Method",
      difficulty: "Mudah",
      instructions:
        "Buatlah atribut private `self.__pin = pin` di dalam `__init__` milik class `KartuATM`, lalu kembalikan nilainya melalui method `lihat_pin(self)`!",
      tasks: [
        "Simpan `self.__pin = pin` di dalam `__init__`.",
        "Kembalikan `self.__pin` di dalam `lihat_pin(self)`."
      ],
      starterCode: `class KartuATM:
    def __init__(self, pin):
        # Simpan ke atribut private self.__pin:
        

    def lihat_pin(self):
        # Return nilai self.__pin:
        

kartu = KartuATM("889900")
print("PIN Kartu:", kartu.lihat_pin())`,
      expectedOutput: `PIN Kartu: 889900`,
      hint: "Tulis `self.__pin = pin` di `__init__` dan `return self.__pin` di `lihat_pin`.",
      solutionCode: `class KartuATM:
    def __init__(self, pin):
        self.__pin = pin

    def lihat_pin(self):
        return self.__pin

kartu = KartuATM("889900")
print("PIN Kartu:", kartu.lihat_pin())`
    },
    {
      id: "oop-bab4-challenge2",
      title: "Setter Method dengan Validasi Stok Tidak Boleh Negatif",
      difficulty: "Mudah",
      instructions:
        "Lengkapi method `ubah_stok(self, jumlah_baru)` pada class `ItemGudang` agar mengubah `self.__stok = jumlah_baru` hanya jika `jumlah_baru >= 0`!",
      tasks: [
        "Cek `if jumlah_baru >= 0:`.",
        "Jika terpenuhi, isi `self.__stok = jumlah_baru`."
      ],
      starterCode: `class ItemGudang:
    def __init__(self, stok):
        self.__stok = stok

    def get_stok(self):
        return self.__stok

    def ubah_stok(self, jumlah_baru):
        # Validasi agar jumlah_baru >= 0:
        

item = ItemGudang(25)
item.ubah_stok(-10)  # Ditolak
item.ubah_stok(40)   # Diterima
print("Stok Gudang:", item.get_stok())`,
      expectedOutput: `Stok Gudang: 40`,
      hint: "Tulis `if jumlah_baru >= 0:` lalu di dalamnya `self.__stok = jumlah_baru`.",
      solutionCode: `class ItemGudang:
    def __init__(self, stok):
        self.__stok = stok

    def get_stok(self):
        return self.__stok

    def ubah_stok(self, jumlah_baru):
        if jumlah_baru >= 0:
            self.__stok = jumlah_baru

item = ItemGudang(25)
item.ubah_stok(-10)
item.ubah_stok(40)
print("Stok Gudang:", item.get_stok())`
    },
    {
      id: "oop-bab4-challenge3",
      title: "Membuat Getter Pythonic dengan Dekorator @property",
      difficulty: "Sedang",
      instructions:
        "Gunakan dekorator `@property` untuk membuat method `saldo(self)` yang mengembalikan nilai atribut private `self.__saldo`!",
      tasks: [
        "Tambahkan `@property` di atas `def saldo(self):`.",
        "Kembalikan `self.__saldo`."
      ],
      starterCode: `class EWallet:
    def __init__(self, saldo):
        self.__saldo = saldo

    # Buat @property saldo(self) di bawah ini:
    

dompet = EWallet(175000)
print(f"Saldo E-Wallet: Rp{dompet.saldo:,}")`,
      expectedOutput: `Saldo E-Wallet: Rp175,000`,
      hint: "Tulis `@property`, lalu `def saldo(self):`, lalu `return self.__saldo`.",
      solutionCode: `class EWallet:
    def __init__(self, saldo):
        self.__saldo = saldo

    @property
    def saldo(self):
        return self.__saldo

dompet = EWallet(175000)
print(f"Saldo E-Wallet: Rp{dompet.saldo:,}")`
    },
    {
      id: "oop-bab4-challenge4",
      title: "Membuat Properti Hitungan Otomatis dengan @property",
      difficulty: "Sedang",
      instructions:
        "Pada class `Lingkaran`, buatlah `@property` bernama `diameter(self)` yang mengembalikan hasil `self.jari_jari * 2`!",
      tasks: [
        "Tambahkan `@property` di atas `def diameter(self):`.",
        "Kembalikan `self.jari_jari * 2`."
      ],
      starterCode: `class Lingkaran:
    def __init__(self, jari_jari):
        self.jari_jari = jari_jari

    # Buat @property diameter(self) di bawah ini:
    

roda = Lingkaran(14)
print("Jari-jari :", roda.jari_jari)
print("Diameter  :", roda.diameter)`,
      expectedOutput: `Jari-jari : 14
Diameter  : 28`,
      hint: "Tulis `@property`, lalu `def diameter(self):`, lalu `return self.jari_jari * 2`.",
      solutionCode: `class Lingkaran:
    def __init__(self, jari_jari):
        self.jari_jari = jari_jari

    @property
    def diameter(self):
        return self.jari_jari * 2

roda = Lingkaran(14)
print("Jari-jari :", roda.jari_jari)
print("Diameter  :", roda.diameter)`
    },
    {
      id: "oop-bab4-challenge5",
      title: "Menggabungkan @property dan @setter untuk Validasi Umur",
      difficulty: "Menantang",
      instructions:
        "Lengkapi `@umur.setter` pada class `ProfilMember` agar hanya memperbarui `self.__umur = nilai` apabila `nilai > 0`!",
      tasks: [
        "Tambahkan `@umur.setter` di atas `def umur(self, nilai):`.",
        "Cek `if nilai > 0:` lalu simpan `self.__umur = nilai`."
      ],
      starterCode: `class ProfilMember:
    def __init__(self, umur):
        self.__umur = umur

    @property
    def umur(self):
        return self.__umur

    # Tambahkan @umur.setter di bawah ini:
    def umur(self, nilai):
        if nilai > 0:
            self.__umur = nilai

m = ProfilMember(20)
m.umur = -5  # Diabaikan
m.umur = 24  # Disimpan
print("Umur Member:", m.umur)`,
      expectedOutput: `Umur Member: 24`,
      hint: "Tambahkan baris `@umur.setter` tepat di atas `def umur(self, nilai):`.",
      solutionCode: `class ProfilMember:
    def __init__(self, umur):
        self.__umur = umur

    @property
    def umur(self):
        return self.__umur

    @umur.setter
    def umur(self, nilai):
        if nilai > 0:
            self.__umur = nilai

m = ProfilMember(20)
m.umur = -5
m.umur = 24
print("Umur Member:", m.umur)`
    }
  ],
  quizzes: [
    {
      question: "Apa tujuan utama dari prinsip *Encapsulation* dalam OOP?",
      options: [
        "Mempercepat koneksi internet program",
        "Membungkus data dan melindungi atribut sensitif agar tidak diubah secara sembarangan dari luar class",
        "Menghapus seluruh fungsi di dalam program",
        "Mengubah semua angka menjadi teks"
      ],
      correctIndex: 1,
      explanation: "*Encapsulation* menjaga integritas data objek dengan menyembunyikan detail atribut sensitif dan menyediakan akses terkontrol melalui method atau properti."
    },
    {
      question: "Bagaimana cara menandai sebuah atribut sebagai **Private Attribute** di dalam class Python?",
      options: [
        "Mengawali nama atribut dengan kata kunci private",
        "Mengawali nama atribut dengan dua garis bawah (__), misalnya self.__saldo",
        "Mengakhiri nama atribut dengan tanda seru (!)",
        "Menulis nama atribut dengan huruf kapital semua"
      ],
      correctIndex: 1,
      explanation: "Di Python, atribut yang diawali dengan dua garis bawah (`self.__nama`) otomatis disembunyikan (*name mangling*) sehingga bersifat *Private*."
    },
    {
      question: "Apa yang terjadi jika kita mencoba mengakses atribut private `self.__pin` secara langsung dari luar class menggunakan `kartu.__pin`?",
      options: [
        "Menampilkan nilai PIN dengan normal",
        "Menampilkan None",
        "Memicu AttributeError",
        "Mengubah PIN menjadi 0"
      ],
      correctIndex: 2,
      explanation: "Atribut *Private* (`__pin`) tidak dapat diakses langsung dari luar class menggunakan `kartu.__pin` dan akan menghasilkan `AttributeError`."
    },
    {
      question: "Apakah arti konvensi atribut yang diawali dengan **satu** garis bawah (contoh: `self._kode`)?",
      options: [
        "Atribut Protected (konvensi bahwa atribut tersebut untuk penggunaan internal class dan subclass)",
        "Atribut yang otomatis terhapus",
        "Variabel global di luar class",
        "SyntaxError di Python"
      ],
      correctIndex: 0,
      explanation: "Satu garis bawah di depan (`_kode`) menandakan atribut *Protected*, yaitu sinyal bagi programmer bahwa atribut tersebut bersifat internal."
    },
    {
      question: "Disebut apakah pasangan method yang bertugas untuk **membaca** dan **mengubah** nilai atribut private secara aman?",
      options: [
        "Start dan Stop",
        "Getter dan Setter",
        "Input dan Output",
        "Push dan Pop"
      ],
      correctIndex: 1,
      explanation: "Method pembaca disebut **Getter** (misal `get_saldo()`) dan method pengubah yang disertai validasi disebut **Setter** (misal `set_saldo()`)."
    },
    {
      question: "Dekorator apakah yang digunakan di Python agar sebuah method *Getter* dapat diakses seperti atribut biasa tanpa tanda kurung `()`?",
      options: ["@getter", "@attribute", "@property", "@private"],
      correctIndex: 2,
      explanation: "Dekorator `@property` mengubah method menjadi properti yang bisa dibaca cukup dengan `obj.nama_properti`."
    },
    {
      question: "Jika kita telah membuat `@property def harga(self):`, dekorator apakah yang digunakan untuk membuat *Setter*-nya?",
      options: ["@setter.harga", "@harga.setter", "@set_harga", "@property.setter"],
      correctIndex: 1,
      explanation: "Setter untuk `@property` bernama `harga` ditulis menggunakan dekorator `@harga.setter`."
    },
    {
      question: "Jika sebuah atribut memiliki `@property` namun TIDAK memiliki `@nama.setter`, bagaimana sifat properti tersebut?",
      options: [
        "Read-Only (hanya bisa dibaca dan tidak bisa diubah langsung dari luar)",
        "Write-Only (hanya bisa diubah)",
        "Menghasilkan SyntaxError saat class dibuat",
        "Selalu bernilai 0"
      ],
      correctIndex: 0,
      explanation: "Properti yang hanya memiliki `@property` tanpa `@setter` bersifat *Read-Only* (hanya baca)."
    },
    {
      question: "Mengapa penggunaan `@setter` lebih aman dibandingkan membiarkan atribut bersifat *Public*?",
      options: [
        "Karena kita bisa menyisipkan logika if untuk memvalidasi nilai baru (misal menolak angka negatif) sebelum disimpan",
        "Karena @setter tidak membutuhkan memori",
        "Karena atribut public tidak bisa menyimpan angka integer",
        "Karena @setter otomatis mencetak nilai ke layar"
      ],
      correctIndex: 0,
      explanation: "Di dalam `@setter`, kita dapat memeriksa keabsahan data terlebih dahulu sehingga objek tidak pernah menyimpan data yang rusak/tidak logis."
    },
    {
      question: "Di manakah atribut private `self.__saldo` BOLEH diakses secara langsung?",
      options: [
        "Di luar class mana pun",
        "Di dalam method-method yang berada di dalam class itu sendiri",
        "Tidak bisa diakses di mana pun termasuk di dalam class-nya sendiri",
        "Hanya di dalam fungsi print()"
      ],
      correctIndex: 1,
      explanation: "Atribut `self.__saldo` dapat dibaca dan dimodifikasi secara penuh oleh seluruh method yang berada di dalam blok `class` yang sama."
    }
  ]
};

