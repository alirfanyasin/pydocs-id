import { DocSection } from "../types";

export const bab1ClassObject: DocSection = {
  id: "oop-bab1-class-object",
  number: 1,
  filePath: "app/data/oop-chapters/bab1-class-object.ts",
  title: "Pengenalan OOP: Membuat Class & Object Pertama",
  subtitle:
    "Memahami paradigma *Object-Oriented Programming* (OOP), perbedaan `class` (*blueprint*) dan `object` (*instance*), aturan penamaan `PascalCase`, atribut objek, serta pembuatan *method* dasar.",
  level: "Dasar",
  readTime: "12 menit",
  summary:
    "*Object-Oriented Programming* (OOP) adalah cara menyusun program dengan mengelompokkan **data** (disebut *atribut*) dan **perilaku/fungsi** (disebut *method*) ke dalam satu kesatuan yang disebut **Object**. Untuk membuat *object*, kita terlebih dahulu mendefinisikan cetakan atau cetak birunya menggunakan kata kunci `class`. Sesuai standar PEP 8, nama `class` di Python selalu ditulis menggunakan gaya **PascalCase** (setiap kata diawali huruf kapital tanpa garis bawah, contoh: `MobilListrik`, `AkunBank`).",
  keyPoints: [
    "`class NamaClass:` digunakan untuk membuat cetak biru (*blueprint*). Nama class wajib menggunakan gaya **PascalCase** (contoh: `class Kucing:`, `class ProdukToko:`).",
    "**Object** (atau *Instance*) adalah wujud nyata yang dibuat dari sebuah `class` dengan cara memanggil nama class diikuti tanda kurung `()`, contoh: `kucing1 = Kucing()`.",
    "**Atribut** adalah variabel yang menempel pada `class` atau `object`, diakses menggunakan tanda titik (`.`), contoh: `kucing1.nama`.",
    "Atribut pada sebuah `object` dapat diubah atau ditambahkan secara langsung menggunakan operator `=`, contoh: `kucing1.umur = 2`.",
    "**Method** adalah fungsi yang didefinisikan di dalam blok `class` menggunakan `def` dan wajib memiliki `self` sebagai parameter pertamanya, contoh: `def bersuara(self):`.",
    "Kata kunci `pass` dapat ditulis di dalam `class` kosong jika kita belum ingin menambahkan atribut atau *method* apa pun."
  ],
  conceptTable: {
    title: "Istilah Penting dalam Dasar Class & Object Python",
    headers: ["Istilah OOP", "Contoh Sintaks Python", "Analogi Dunia Nyata", "Penjelasan Singkat"],
    rows: [
      ["Class", "class Mobil:", "Denah / Cetakan Mobil", "Cetak biru (*blueprint*) yang menentukan atribut dan method."],
      ["Object / Instance", "mobil_saya = Mobil()", "Mobil fisik di garasi", "Objek nyata yang diciptakan dari sebuah `class`."],
      ["Atribut", "mobil_saya.warna = 'Merah'", "Warna cat, merek, jumlah roda", "Data atau properti yang dimiliki oleh objek."],
      ["Method", "def klakson(self):", "Maju, mengerem, membunyikan klakson", "Fungsi di dalam `class` yang menjadi perilaku objek."],
      ["type(obj)", "type(mobil_saya)", "Mengecek jenis cetakan", "Mengembalikan class asal dari objek tersebut (`<class '__main__.Mobil'>`)."]
    ]
  },
  examples: [
    {
      id: "oop-bab1-ex1",
      title: "1. Membuat Class, Menciptakan Object (Instansiasi) & Mengakses Atribut",
      description:
        "Cara mendefinisikan `class` dengan atribut bawaan, membuat dua *object* berbeda dari satu `class`, serta mengakses dan mengubah atributnya menggunakan tanda titik (`.`).",
      code: `# Mendefinisikan class dengan gaya PascalCase
class RobotPelayan:
    merek = "PyBot"
    status = "Siaga"

# Membuat dua object (instance) dari class RobotPelayan
robot_a = RobotPelayan()
robot_b = RobotPelayan()

# Mengubah atribut pada robot_b tanpa memengaruhi robot_a
robot_b.status = "Sedang Mengantar Pesanan"

print("Merek Robot A  :", robot_a.merek)
print("Status Robot A :", robot_a.status)
print("Status Robot B :", robot_b.status)
print("Tipe Objek     :", type(robot_a))`,
      output: `Merek Robot A  : PyBot
Status Robot A : Siaga
Status Robot B : Sedang Mengantar Pesanan
Tipe Objek     : <class '__main__.RobotPelayan'>`,
      lineExplanations: [
        {
          line: "class RobotPelayan:",
          explanation: "Mendefinisikan cetak biru bernama `RobotPelayan` menggunakan gaya penulisan *PascalCase*."
        },
        {
          line: "robot_a = RobotPelayan()",
          explanation: "Proses *instansiasi*: menciptakan objek nyata `robot_a` dari class `RobotPelayan`."
        },
        {
          line: 'robot_b.status = "Sedang Mengantar Pesanan"',
          explanation: "Mengubah nilai atribut `status` khusus milik objek `robot_b` menggunakan notasi titik (`.`)."
        }
      ]
    },
    {
      id: "oop-bab1-ex2",
      title: "2. Menambahkan Atribut Spesifik pada Object & Class Kosong (pass)",
      description:
        "Kita dapat membuat `class` kosong dengan kata kunci `pass`, lalu memberikan atribut spesifik pada masing-masing *object* yang dibuat.",
      code: `# Membuat class kosong dengan pass
class KartuMember:
    pass

# Membuat object dan menambahkan atribut menggunakan tanda titik (.)
member1 = KartuMember()
member1.nama = "Andi Pratama"
member1.poin = 150

member2 = KartuMember()
member2.nama = "Siti Rahma"
member2.poin = 320

print(f"Member 1: {member1.nama} ({member1.poin} poin)")
print(f"Member 2: {member2.nama} ({member2.poin} poin)")`,
      output: `Member 1: Andi Pratama (150 poin)
Member 2: Siti Rahma (320 poin)`,
      lineExplanations: [
        {
          line: "class KartuMember:\n    pass",
          explanation: "Kata kunci `pass` memberi tahu Python bahwa blok `class` ini sengaja dibiarkan kosong tanpa error."
        },
        {
          line: 'member1.nama = "Andi Pratama"',
          explanation: "Menempelkan atribut `.nama` secara langsung pada objek `member1`."
        }
      ]
    },
    {
      id: "oop-bab1-ex3",
      title: "3. Membuat Method di Dalam Class & Memanggilnya dari Object",
      description:
        "Method adalah fungsi di dalam `class` yang selalu menerima `self` (merujuk pada objek yang memanggilnya) sebagai parameter pertama.",
      code: `class LampuPintar:
    ruangan = "Ruang Tamu"
    menyala = False

    def nyalakan(self):
        self.menyala = True
        return f"Lampu {self.ruangan} sekarang MENYALA"

    def matikan(self):
        self.menyala = False
        return f"Lampu {self.ruangan} sekarang MATI"

lampu_utama = LampuPintar()
print("Status awal menyala? :", lampu_utama.menyala)
print(lampu_utama.nyalakan())
print("Status kini menyala? :", lampu_utama.menyala)
print(lampu_utama.matikan())`,
      output: `Status awal menyala? : False
Lampu Ruang Tamu sekarang MENYALA
Status kini menyala? : True
Lampu Ruang Tamu sekarang MATI`,
      lineExplanations: [
        {
          line: "def nyalakan(self):",
          explanation: "Setiap *method* di dalam `class` wajib mencantumkan `self` sebagai parameter pertama agar bisa mengakses atribut objek tersebut (`self.ruangan`)."
        },
        {
          line: "lampu_utama.nyalakan()",
          explanation: "Saat memanggil *method* melalui objek, tanda kurung `()` wajib ditulis dan kita TIDAK perlu mengisi argumen `self` secara manual."
        }
      ]
    }
  ],
  tips: [
    "Gunakan **PascalCase** untuk nama `class` (contoh: `RekeningBank`) dan **snake_case** untuk nama variabel objek maupun *method* (contoh: `rekening_andi`, `cek_saldo()`).",
    "Jangan lupa tanda kurung `()` saat membuat objek baru dari class: `obj = NamaClass()`, bukan `obj = NamaClass`."
  ],
  commonMistakes: [
    {
      wrong: "class Kucing:\n    def mengeong():  # Lupa menulis parameter self\n        return 'Meong!'",
      correct: "class Kucing:\n    def mengeong(self):\n        return 'Meong!'",
      reason: "Tanpa parameter `self` di definisi method, pemanggilan `kucingku.mengeong()` akan memicu `TypeError` karena Python otomatis mengirimkan objek itu sendiri sebagai argumen pertama."
    }
  ],
  caseStudies: [
    {
      id: "oop-bab1-case1",
      title: "Sistem Label Buku di Perpustakaan Sekolah",
      difficulty: "Mudah",
      scenario:
        "Pustakawan sekolah ingin mendata buku menggunakan konsep OOP. Setiap objek dari class `BukuPerpustakaan` memiliki atribut bawaan `kategori = 'Pemrograman'` dan sebuah method `info_buku(self)` yang mengembalikan teks informasi judul beserta kategorinya.",
      instructions:
        "Lengkapi class `BukuPerpustakaan`, buat objek `buku1 = BukuPerpustakaan()`, beri atribut `buku1.judul = 'Python Dasar'`, lalu cetak hasil pemanggilan `buku1.info_buku()`!",
      tasks: [
        "Buat objek `buku1 = BukuPerpustakaan()`.",
        "Isi atribut `buku1.judul = 'Python Dasar'`.",
        "Cetak hasil `buku1.info_buku()`."
      ],
      starterCode: `class BukuPerpustakaan:
    kategori = "Pemrograman"

    def info_buku(self):
        return f"Buku: {self.judul} | Kategori: {self.kategori}"

# 1. Buat objek buku1 dari class BukuPerpustakaan:
buku1 = 

# 2. Beri atribut judul = "Python Dasar" pada buku1:


print(buku1.info_buku())`,
      expectedOutput: `Buku: Python Dasar | Kategori: Pemrograman`,
      hint: 'Tulis `buku1 = BukuPerpustakaan()` lalu di bawahnya `buku1.judul = "Python Dasar"`.',
      solutionCode: `class BukuPerpustakaan:
    kategori = "Pemrograman"

    def info_buku(self):
        return f"Buku: {self.judul} | Kategori: {self.kategori}"

buku1 = BukuPerpustakaan()
buku1.judul = "Python Dasar"

print(buku1.info_buku())`
    },
    {
      id: "oop-bab1-case2",
      title: "Mesin Tiket Parkir Otomatis Gedung Perkantoran",
      difficulty: "Sedang",
      scenario:
        "Pengelola gedung perkantoran memiliki class `MesinParkir` dengan atribut `lokasi = 'Gedung Cyber'` dan `tarif_flat = 5000`. Ketika pengendara menekan tombol tiket, method `cetak_tiket(self)` dipanggil untuk mengembalikan teks struk parkir.",
      instructions:
        "Definisikan method `cetak_tiket(self)` di dalam class `MesinParkir` yang mengembalikan string `f'Tiket {self.lokasi} - Tarif: Rp{self.tarif_flat}'`, lalu panggil method tersebut dari objek `mesin_utara`!",
      tasks: [
        "Tambahkan method `def cetak_tiket(self):` di dalam `MesinParkir`.",
        "Kembalikan `f'Tiket {self.lokasi} - Tarif: Rp{self.tarif_flat}'`.",
        "Cetak hasil `mesin_utara.cetak_tiket()`."
      ],
      starterCode: `class MesinParkir:
    lokasi = "Gedung Cyber"
    tarif_flat = 5000

    # Buat method cetak_tiket(self) di bawah ini:
    

mesin_utara = MesinParkir()
print(mesin_utara.cetak_tiket())`,
      expectedOutput: `Tiket Gedung Cyber - Tarif: Rp5000`,
      hint: 'Di dalam class, tulis `def cetak_tiket(self):` lalu `return f"Tiket {self.lokasi} - Tarif: Rp{self.tarif_flat}"`.',
      solutionCode: `class MesinParkir:
    lokasi = "Gedung Cyber"
    tarif_flat = 5000

    def cetak_tiket(self):
        return f"Tiket {self.lokasi} - Tarif: Rp{self.tarif_flat}"

mesin_utara = MesinParkir()
print(mesin_utara.cetak_tiket())`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab1-challenge1",
      title: "Membuat Class & Object Pertama",
      difficulty: "Mudah",
      instructions:
        "Buatlah sebuah class bernama `Hewan` yang memiliki atribut `jenis = 'Kucing'`. Kemudian buat objek bernama `peliharaan` dari class `Hewan` dan cetak nilai `peliharaan.jenis`!",
      tasks: [
        "Definisikan `class Hewan:` dengan atribut `jenis = 'Kucing'`.",
        "Buat objek `peliharaan = Hewan()`."
      ],
      starterCode: `# 1. Buat class Hewan dengan atribut jenis = "Kucing":
class Hewan:
    jenis = "Kucing"

# 2. Buat objek peliharaan dari class Hewan:
peliharaan = 

print("Jenis Hewan:", peliharaan.jenis)`,
      expectedOutput: `Jenis Hewan: Kucing`,
      hint: "Tulis: `peliharaan = Hewan()`",
      solutionCode: `class Hewan:
    jenis = "Kucing"

peliharaan = Hewan()

print("Jenis Hewan:", peliharaan.jenis)`
    },
    {
      id: "oop-bab1-challenge2",
      title: "Mengubah Nilai Atribut pada Object",
      difficulty: "Mudah",
      instructions:
        "Diberikan class `AkunGame` dengan atribut `level = 1`. Buat objek `pemain = AkunGame()`, lalu ubah atribut `pemain.level` menjadi `10`!",
      tasks: [
        "Ubah nilai `pemain.level` menjadi `10` setelah objek dibuat."
      ],
      starterCode: `class AkunGame:
    level = 1

pemain = AkunGame()
print("Level Awal :", pemain.level)

# Ubah atribut level milik pemain menjadi 10:


print("Level Baru :", pemain.level)`,
      expectedOutput: `Level Awal : 1
Level Baru : 10`,
      hint: "Tulis: `pemain.level = 10`",
      solutionCode: `class AkunGame:
    level = 1

pemain = AkunGame()
print("Level Awal :", pemain.level)

pemain.level = 10

print("Level Baru :", pemain.level)`
    },
    {
      id: "oop-bab1-challenge3",
      title: "Menambahkan Atribut pada Class Kosong (pass)",
      difficulty: "Sedang",
      instructions:
        "Diberikan class kosong `Siswa` yang menggunakan `pass`. Buat objek `siswa1 = Siswa()`, lalu tambahkan atribut `siswa1.nama = 'Rina'` dan `siswa1.kelas = '10-A'`!",
      tasks: [
        "Isi `siswa1.nama = 'Rina'`.",
        "Isi `siswa1.kelas = '10-A'`."
      ],
      starterCode: `class Siswa:
    pass

siswa1 = Siswa()
# Tambahkan atribut nama dan kelas pada objek siswa1:


print(f"Siswa: {siswa1.nama} - Kelas: {siswa1.kelas}")`,
      expectedOutput: `Siswa: Rina - Kelas: 10-A`,
      hint: 'Tulis `siswa1.nama = "Rina"` dan `siswa1.kelas = "10-A"`.',
      solutionCode: `class Siswa:
    pass

siswa1 = Siswa()
siswa1.nama = "Rina"
siswa1.kelas = "10-A"

print(f"Siswa: {siswa1.nama} - Kelas: {siswa1.kelas}")`
    },
    {
      id: "oop-bab1-challenge4",
      title: "Membuat Method Sapaan di Dalam Class",
      difficulty: "Sedang",
      instructions:
        "Tambahkan method bernama `sapa(self)` di dalam class `AsistenVirtual` yang mengembalikan (`return`) teks `'Halo, saya asisten Python!'`.",
      tasks: [
        "Definisikan `def sapa(self):` di dalam `class AsistenVirtual:`.",
        "Kembalikan string `'Halo, saya asisten Python!'` dengan `return`."
      ],
      starterCode: `class AsistenVirtual:
    # Buat method sapa(self) di sini:
    

bot = AsistenVirtual()
print(bot.sapa())`,
      expectedOutput: `Halo, saya asisten Python!`,
      hint: 'Di dalam class, tulis `def sapa(self):` lalu di baris bawahnya `return "Halo, saya asisten Python!"`.',
      solutionCode: `class AsistenVirtual:
    def sapa(self):
        return "Halo, saya asisten Python!"

bot = AsistenVirtual()
print(bot.sapa())`
    },
    {
      id: "oop-bab1-challenge5",
      title: "Method yang Mengakses & Mengubah Atribut self",
      difficulty: "Menantang",
      instructions:
        "Di dalam class `Penghitung Klik`, buatlah method `tambah_klik(self)` yang menambah nilai `self.jumlah` sebesar `1` (`self.jumlah += 1`) setiap kali dipanggil!",
      tasks: [
        "Buat method `def tambah_klik(self):`.",
        "Tambahkan `self.jumlah += 1` di dalam method tersebut."
      ],
      starterCode: `class PenghitungKlik:
    jumlah = 0

    # Buat method tambah_klik(self) untuk menambah self.jumlah sebesar 1:
    

tombol = PenghitungKlik()
tombol.tambah_klik()
tombol.tambah_klik()
tombol.tambah_klik()

print("Total Klik:", tombol.jumlah)`,
      expectedOutput: `Total Klik: 3`,
      hint: "Tulis `def tambah_klik(self):` lalu di dalamnya `self.jumlah += 1`.",
      solutionCode: `class PenghitungKlik:
    jumlah = 0

    def tambah_klik(self):
        self.jumlah += 1

tombol = PenghitungKlik()
tombol.tambah_klik()
tombol.tambah_klik()
tombol.tambah_klik()

print("Total Klik:", tombol.jumlah)`
    }
  ],
  quizzes: [
    {
      question: "Kata kunci apakah yang digunakan untuk mendefinisikan cetak biru (*blueprint*) objek di Python?",
      options: ["object", "class", "def", "struct"],
      correctIndex: 1,
      explanation: "Kata kunci `class` digunakan untuk membuat cetak biru baru di dalam pemrograman berorientasi objek Python."
    },
    {
      question: "Sesuai panduan gaya komunitas Python (PEP 8), manakah penulisan nama `class` yang paling tepat (PascalCase)?",
      options: ["rekening_bank", "RekeningBank", "rekeningBank", "REKENING_BANK"],
      correctIndex: 1,
      explanation: "Nama `class` di Python menggunakan konvensi **PascalCase**, di mana setiap awal kata ditulis dengan huruf kapital tanpa pemisah garis bawah (`RekeningBank`)."
    },
    {
      question: "Disebut apakah wujud nyata yang diciptakan dari sebuah `class` (misalnya `m1 = Mobil()`)?",
      options: ["Blueprint", "Module", "Object / Instance", "Function"],
      correctIndex: 2,
      explanation: "Hasil penciptaan nyata dari sebuah `class` disebut sebagai **Object** atau **Instance**."
    },
    {
      question: "Bagaimana cara yang benar untuk membuat objek baru bernama `laptop` dari `class Komputer:`?",
      options: [
        "laptop = class Komputer",
        "laptop = new Komputer()",
        "laptop = Komputer()",
        "laptop = Komputer.create()"
      ],
      correctIndex: 2,
      explanation: "Di Python, instansiasi objek dilakukan dengan memanggil nama class diikuti tanda kurung `()` tanpa kata kunci `new`, yaitu `laptop = Komputer()`."
    },
    {
      question: "Simbol apakah yang digunakan untuk mengakses atribut atau memanggil *method* milik sebuah objek?",
      options: ["Tanda panah (->)", "Tanda titik (.)", "Titik dua (:)", "Garis miring (/)"],
      correctIndex: 1,
      explanation: "Python menggunakan notasi titik (`.`) untuk mengakses atribut (`obj.atribut`) maupun memanggil method (`obj.method()`)."
    },
    {
      question: "Disebut apakah fungsi yang didefinisikan di dalam blok `class`?",
      options: ["Atribut", "Method", "Variabel Global", "Komentar"],
      correctIndex: 1,
      explanation: "Fungsi yang berada di dalam sebuah `class` dan menggambarkan perilaku objek disebut **Method**."
    },
    {
      question: "Parameter apakah yang WAJIB ditulis sebagai parameter pertama pada setiap *instance method* biasa di dalam `class`?",
      options: ["this", "cls", "self", "init"],
      correctIndex: 2,
      explanation: "Parameter pertama pada method biasa wajib ditulis `self`, yang merujuk pada objek (*instance*) yang memanggil method tersebut."
    },
    {
      question: "Kata kunci apakah yang digunakan saat kita ingin membuat `class` kosong tanpa isi agar tidak memicu `IndentationError`?",
      options: ["empty", "None", "pass", "continue"],
      correctIndex: 2,
      explanation: "Kata kunci `pass` berfungsi sebagai pengisi blok kosong (*placeholder*) yang sah di Python."
    },
    {
      question: "Jika `k1 = Kucing()` dan `k2 = Kucing()`, lalu kita mengubah `k1.warna = 'Putih'`, apa yang terjadi pada `k2.warna`?",
      options: [
        "Ikut berubah menjadi 'Putih'",
        "Tidak ikut berubah (tetap menggunakan nilai semula)",
        "Menghasilkan AttributeError",
        "Menghapus objek k2"
      ],
      correctIndex: 1,
      explanation: "Mengubah atribut pada satu objek (`k1.warna`) hanya memengaruhi objek `k1` itu sendiri dan tidak mengubah atribut milik objek `k2`."
    },
    {
      question: "Mengapa kode `class Burung: def terbang(): return 'Terbang'` akan menghasilkan `TypeError` saat dipanggil dengan `b = Burung(); b.terbang()`?",
      options: [
        "Karena nama class tidak boleh menggunakan huruf kapital",
        "Karena method terbang() lupa mencantumkan parameter pertama self",
        "Karena method di dalam class tidak boleh menggunakan return",
        "Karena objek b belum dicetak dengan print()"
      ],
      correctIndex: 1,
      explanation: "Saat `b.terbang()` dipanggil, Python otomatis mengirimkan objek `b` sebagai argumen pertama. Tanpa parameter `self` pada `def terbang(self):`, terjadi `TypeError`."
    }
  ]
};

