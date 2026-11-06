import { DocSection } from "../types";

export const bab2InitSelf: DocSection = {
  id: "oop-bab2-init-self",
  number: 2,
  filePath: "app/data/oop-chapters/bab2-init-self.ts",
  title: "Constructor __init__() & Peran Parameter self",
  subtitle:
    "Menginisialisasi atribut objek secara otomatis saat diciptakan menggunakan method khusus `__init__()`, memahami cara kerja `self`, serta interaksi antar *method*.",
  level: "Dasar",
  readTime: "13 menit",
  summary:
    "Pada Bab 1, kita harus mengisi atribut objek satu per satu setelah objek dibuat. Cara tersebut kurang praktis jika objek memiliki banyak atribut. Di Python, kita menggunakan method khusus bernama **Constructor** `__init__(self, ...)` (diawali dan diakhiri dengan **dua garis bawah** / *double underscore*). Method `__init__()` akan **dijalankan secara otomatis** oleh Python tepat pada saat objek baru diciptakan, sehingga kita bisa langsung mengirim data awal ke dalam tanda kurung `NamaClass(argumen)`.",
  keyPoints: [
    "`def __init__(self, param1, param2):` adalah *constructor* yang otomatis dieksekusi setiap kali objek baru dibuat dari `class`.",
    "Parameter `self` merujuk pada objek yang sedang dibuat atau dipanggil. Menyimpan `self.nama = nama` berarti menempelkan nilai parameter `nama` sebagai atribut permanen milik objek tersebut.",
    "Kita dapat memberikan **Default Parameter** pada `__init__()` (contoh: `def __init__(self, nama, saldo=0):`) agar argumen tersebut bersifat opsional saat objek dibuat.",
    "Setiap *method* lain di dalam `class` dapat membaca maupun memperbarui atribut yang sudah didaftarkan di `__init__()` melalui `self.nama_atribut`.",
    "Sebuah *method* juga dapat memanggil *method* lain di dalam `class` yang sama menggunakan sintaks `self.nama_method_lain()`."
  ],
  conceptTable: {
    title: "Alur Kerja Constructor __init__() dan Parameter self",
    headers: ["Komponen Kode", "Penulisan di dalam Class", "Saat Objek Dibuat / Dipanggil", "Penjelasan"],
    rows: [
      ["__init__()", "def __init__(self, merek):", "hp = Handphone('Samsung')", "Otomatis dipanggil saat `Handphone('Samsung')` dieksekusi."],
      ["self", "self.merek = merek", "hp.merek -> 'Samsung'", "`self` mewakili objek `hp` itu sendiri."],
      ["Default Param", "def __init__(self, nama, stok=10):", "p = Produk('Buku')", "Jika `stok` tidak diisi, otomatis `p.stok` bernilai `10`."],
      ["Update Atribut", "def tambah_stok(self, jml):\n    self.stok += jml", "p.tambah_stok(5)", "Mengubah nilai atribut `self.stok` milik objek `p`."],
      ["Panggil Method Lain", "self.info_ringkas()", "Otomatis dari dalam method lain", "Memanggil method milik objek yang sama melalui `self`."]
    ]
  },
  examples: [
    {
      id: "oop-bab2-ex1",
      title: "1. Menggunakan Constructor __init__() untuk Mengisi Atribut Objek",
      description:
        "Bandingkan betapa ringkasnya membuat banyak objek berbeda ketika `class` memiliki constructor `__init__()`.",
      code: `class Mahasiswa:
    def __init__(self, nama, nim, jurusan):
        self.nama = nama
        self.nim = nim
        self.jurusan = jurusan

    def perkenalan(self):
        return f"[{self.nim}] {self.nama} - Jurusan {self.jurusan}"

# Mengirim data langsung saat objek dibuat
mhs1 = Mahasiswa("Andi Pratama", "2026001", "Informatika")
mhs2 = Mahasiswa("Citra Lestari", "2026002", "Sistem Informasi")

print(mhs1.perkenalan())
print(mhs2.perkenalan())`,
      output: `[2026001] Andi Pratama - Jurusan Informatika
[2026002] Citra Lestari - Jurusan Sistem Informasi`,
      lineExplanations: [
        {
          line: "def __init__(self, nama, nim, jurusan):",
          explanation: "Constructor `__init__` menerima `self` beserta 3 parameter (`nama`, `nim`, `jurusan`) yang dikirim saat objek dibuat."
        },
        {
          line: "self.nama = nama",
          explanation: "Menyimpan nilai parameter `nama` ke dalam atribut `self.nama` milik objek masing-masing."
        }
      ]
    },
    {
      id: "oop-bab2-ex2",
      title: "2. Default Parameter pada __init__() & Method Pengubah Atribut",
      description:
        "Memberikan nilai bawaan (*default*) pada `__init__()` serta membuat *method* untuk menambah atau mengurangi atribut objek.",
      code: `class DompetDigital:
    def __init__(self, pemilik, saldo=0):
        self.pemilik = pemilik
        self.saldo = saldo

    def top_up(self, nominal):
        self.saldo += nominal
        return f"Top-up Rp{nominal:,} berhasil!"

    def bayar(self, tagihan):
        if self.saldo >= tagihan:
            self.saldo -= tagihan
            return f"Pembayaran Rp{tagihan:,} sukses!"
        return "Saldo tidak mencukupi!"

dompet_budi = DompetDigital("Budi")  # saldo otomatis 0
print(f"Saldo awal {dompet_budi.pemilik}: Rp{dompet_budi.saldo:,}")
print(dompet_budi.top_up(100000))
print(dompet_budi.bayar(35000))
print(f"Saldo akhir {dompet_budi.pemilik}: Rp{dompet_budi.saldo:,}")`,
      output: `Saldo awal Budi: Rp0
Top-up Rp100,000 berhasil!
Pembayaran Rp35,000 sukses!
Saldo akhir Budi: Rp65,000`,
      lineExplanations: [
        {
          line: "def __init__(self, pemilik, saldo=0):",
          explanation: "Jika saat instansiasi argumen kedua tidak diisi (`DompetDigital('Budi')`), maka `self.saldo` otomatis bernilai `0`."
        },
        {
          line: "self.saldo += nominal",
          explanation: "Menambahkan nilai `nominal` langsung ke atribut `self.saldo` milik objek tersebut."
        }
      ]
    },
    {
      id: "oop-bab2-ex3",
      title: "3. Memanggil Method Lain di Dalam Class Menggunakan self",
      description:
        "Sebuah *method* dapat memanggil *method* lain di dalam `class` yang sama dengan mengawalinya menggunakan `self.`.",
      code: `class PesananKopi:
    def __init__(self, menu, harga_satuan, jumlah):
        self.menu = menu
        self.harga_satuan = harga_satuan
        self.jumlah = jumlah

    def hitung_total(self):
        return self.harga_satuan * self.jumlah

    def cetak_struk(self):
        # Memanggil method hitung_total() melalui self
        total = self.hitung_total()
        return f"Pesanan: {self.jumlah}x {self.menu} | Total: Rp{total:,}"

pesanan1 = PesananKopi("Kopi Susu Aren", 22000, 3)
print(pesanan1.cetak_struk())`,
      output: `Pesanan: 3x Kopi Susu Aren | Total: Rp66,000`,
      lineExplanations: [
        {
          line: "total = self.hitung_total()",
          explanation: "Di dalam method `cetak_struk()`, kita memanggil method `hitung_total()` milik objek yang sama menggunakan `self.hitung_total()`."
        }
      ]
    }
  ],
  tips: [
    "Pastikan penulisan `__init__` menggunakan **dua** garis bawah (`__`) di kiri dan **dua** garis bawah (`__`) di kanan. Jika hanya satu (`_init_`), fungsi tersebut tidak akan otomatis dijalankan saat objek dibuat!",
    "Method `__init__()` tidak boleh mengembalikan nilai dengan `return` (selain `None`)."
  ],
  commonMistakes: [
    {
      wrong: "class Buku:\n    def _init_(self, judul):  # Hanya 1 underscore!\n        self.judul = judul",
      correct: "class Buku:\n    def __init__(self, judul):  # Wajib 2 underscore (__)\n        self.judul = judul",
      reason: "Menulis `_init_` dengan satu garis bawah membuatnya dianggap sebagai method biasa, sehingga `Buku('Python')` akan memicu `TypeError`."
    }
  ],
  caseStudies: [
    {
      id: "oop-bab2-case1",
      title: "Sistem Kartu Kamar Hotel & Perpanjangan Menginap",
      difficulty: "Mudah",
      scenario:
        "Hotel Grand Nusantara mencatat data tamu menggunakan class `TamuHotel`. Saat *check-in*, objek dibuat dengan `nama_tamu`, `nomor_kamar`, dan `jumlah_malam`. Jika tamu ingin memperpanjang masa menginap, resepsionis memanggil method `tambah_malam(self, tambahan)` untuk menambah `self.jumlah_malam`.",
      instructions:
        "Lengkapi constructor `__init__()` dan method `tambah_malam(self, tambahan)` pada class `TamuHotel` di bawah ini!",
      tasks: [
        "Simpan `self.nama_tamu = nama_tamu`, `self.nomor_kamar = nomor_kamar`, dan `self.jumlah_malam = jumlah_malam` di dalam `__init__`.",
        "Di dalam `tambah_malam`, tambahkan `self.jumlah_malam += tambahan`."
      ],
      starterCode: `class TamuHotel:
    def __init__(self, nama_tamu, nomor_kamar, jumlah_malam):
        # Simpan ketiga parameter ke atribut self:
        

    def tambah_malam(self, tambahan):
        # Tambahkan tambahan ke self.jumlah_malam:
        

tamu1 = TamuHotel("Pak Hendra", 305, 2)
tamu1.tambah_malam(3)
print(f"Tamu: {tamu1.nama_tamu} | Kamar: {tamu1.nomor_kamar} | Menginap: {tamu1.jumlah_malam} malam")`,
      expectedOutput: `Tamu: Pak Hendra | Kamar: 305 | Menginap: 5 malam`,
      hint: "Isi `self.nama_tamu = nama_tamu`, `self.nomor_kamar = nomor_kamar`, `self.jumlah_malam = jumlah_malam`, lalu di method bawahnya `self.jumlah_malam += tambahan`.",
      solutionCode: `class TamuHotel:
    def __init__(self, nama_tamu, nomor_kamar, jumlah_malam):
        self.nama_tamu = nama_tamu
        self.nomor_kamar = nomor_kamar
        self.jumlah_malam = jumlah_malam

    def tambah_malam(self, tambahan):
        self.jumlah_malam += tambahan

tamu1 = TamuHotel("Pak Hendra", 305, 2)
tamu1.tambah_malam(3)
print(f"Tamu: {tamu1.nama_tamu} | Kamar: {tamu1.nomor_kamar} | Menginap: {tamu1.jumlah_malam} malam")`
    },
    {
      id: "oop-bab2-case2",
      title: "Keranjang Item Toko Online dengan Perhitungan Diskon Member",
      difficulty: "Sedang",
      scenario:
        "Sebuah aplikasi *e-commerce* memiliki class `ItemBelanja` dengan constructor `__init__(self, nama_barang, harga, jumlah=1)`. Class ini memiliki method `subtotal(self)` yang menghitung `self.harga * self.jumlah`, serta method `ringkasan(self)` yang memanggil `self.subtotal()` untuk menampilkan total belanja barang tersebut.",
      instructions:
        "Lengkapi default parameter `jumlah=1` pada `__init__()`, method `subtotal(self)`, dan pemanggilan `self.subtotal()` di dalam `ringkasan(self)`!",
      tasks: [
        "Simpan atribut di `__init__(self, nama_barang, harga, jumlah=1)`.",
        "Kembalikan `self.harga * self.jumlah` pada method `subtotal(self)`.",
        "Panggil `self.subtotal()` di dalam `ringkasan(self)`."
      ],
      starterCode: `class ItemBelanja:
    def __init__(self, nama_barang, harga, jumlah=1):
        self.nama_barang = nama_barang
        self.harga = harga
        self.jumlah = jumlah

    def subtotal(self):
        # Kembalikan hasil perkalian self.harga dan self.jumlah:
        

    def ringkasan(self):
        total = self.subtotal()
        return f"{self.nama_barang} (x{self.jumlah}): Rp{total:,}"

item1 = ItemBelanja("Mouse Wireless", 150000)
item2 = ItemBelanja("SSD 512GB", 600000, 2)

print(item1.ringkasan())
print(item2.ringkasan())`,
      expectedOutput: `Mouse Wireless (x1): Rp150,000
SSD 512GB (x2): Rp1,200,000`,
      hint: "Di dalam `subtotal(self)`, tulis: `return self.harga * self.jumlah`",
      solutionCode: `class ItemBelanja:
    def __init__(self, nama_barang, harga, jumlah=1):
        self.nama_barang = nama_barang
        self.harga = harga
        self.jumlah = jumlah

    def subtotal(self):
        return self.harga * self.jumlah

    def ringkasan(self):
        total = self.subtotal()
        return f"{self.nama_barang} (x{self.jumlah}): Rp{total:,}"

item1 = ItemBelanja("Mouse Wireless", 150000)
item2 = ItemBelanja("SSD 512GB", 600000, 2)

print(item1.ringkasan())
print(item2.ringkasan())`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab2-challenge1",
      title: "Membuat Constructor __init__ pada Class Produk",
      difficulty: "Mudah",
      instructions:
        "Lengkapi constructor `__init__(self, nama, harga)` pada class `Produk` agar menyimpan `self.nama = nama` dan `self.harga = harga`!",
      tasks: [
        "Isi `self.nama = nama`.",
        "Isi `self.harga = harga`."
      ],
      starterCode: `class Produk:
    def __init__(self, nama, harga):
        # Simpan nama dan harga ke dalam atribut self:
        

p1 = Produk("Keyboard Mekanik", 450000)
print(f"Produk: {p1.nama} - Harga: Rp{p1.harga:,}")`,
      expectedOutput: `Produk: Keyboard Mekanik - Harga: Rp450,000`,
      hint: "Tulis `self.nama = nama` dan `self.harga = harga` di dalam `__init__`.",
      solutionCode: `class Produk:
    def __init__(self, nama, harga):
        self.nama = nama
        self.harga = harga

p1 = Produk("Keyboard Mekanik", 450000)
print(f"Produk: {p1.nama} - Harga: Rp{p1.harga:,}")`
    },
    {
      id: "oop-bab2-challenge2",
      title: "Constructor dengan Default Parameter",
      difficulty: "Mudah",
      instructions:
        "Buatlah constructor `def __init__(self, username, role='Member'):` pada class `Pengguna` sehingga jika `role` tidak diisi saat membuat objek, nilainya otomatis `'Member'`!",
      tasks: [
        "Tambahkan default parameter `role='Member'` pada `__init__`.",
        "Simpan `self.username = username` dan `self.role = role`."
      ],
      starterCode: `class Pengguna:
    # Buat __init__ dengan parameter username dan default role="Member":
    def __init__(self, username, role="Member"):
        

u1 = Pengguna("andi_dev")
u2 = Pengguna("siti_admin", "Administrator")

print(f"{u1.username} -> {u1.role}")
print(f"{u2.username} -> {u2.role}")`,
      expectedOutput: `andi_dev -> Member
siti_admin -> Administrator`,
      hint: "Di dalam `__init__`, tulis `self.username = username` dan `self.role = role`.",
      solutionCode: `class Pengguna:
    def __init__(self, username, role="Member"):
        self.username = username
        self.role = role

u1 = Pengguna("andi_dev")
u2 = Pengguna("siti_admin", "Administrator")

print(f"{u1.username} -> {u1.role}")
print(f"{u2.username} -> {u2.role}")`
    },
    {
      id: "oop-bab2-challenge3",
      title: "Method Menghitung Luas & Keliling Persegi Panjang",
      difficulty: "Sedang",
      instructions:
        "Pada class `PersegiPanjang`, lengkapi method `hitung_luas(self)` yang mengembalikan `self.panjang * self.lebar` dan `hitung_keliling(self)` yang mengembalikan `2 * (self.panjang + self.lebar)`!",
      tasks: [
        "Kembalikan `self.panjang * self.lebar` pada `hitung_luas`.",
        "Kembalikan `2 * (self.panjang + self.lebar)` pada `hitung_keliling`."
      ],
      starterCode: `class PersegiPanjang:
    def __init__(self, panjang, lebar):
        self.panjang = panjang
        self.lebar = lebar

    def hitung_luas(self):
        # Return luas di sini:
        

    def hitung_keliling(self):
        # Return keliling di sini:
        

kotak = PersegiPanjang(10, 6)
print("Luas     :", kotak.hitung_luas())
print("Keliling :", kotak.hitung_keliling())`,
      expectedOutput: `Luas     : 60
Keliling : 32`,
      hint: "Tulis `return self.panjang * self.lebar` dan `return 2 * (self.panjang + self.lebar)`.",
      solutionCode: `class PersegiPanjang:
    def __init__(self, panjang, lebar):
        self.panjang = panjang
        self.lebar = lebar

    def hitung_luas(self):
        return self.panjang * self.lebar

    def hitung_keliling(self):
        return 2 * (self.panjang + self.lebar)

kotak = PersegiPanjang(10, 6)
print("Luas     :", kotak.hitung_luas())
print("Keliling :", kotak.hitung_keliling())`
    },
    {
      id: "oop-bab2-challenge4",
      title: "Memperbarui Atribut Stok Melalui Method",
      difficulty: "Sedang",
      instructions:
        "Pada class `GudangBarang`, buatlah method `kurangi_stok(self, terjual)` yang mengurangi `self.stok` sebesar `terjual` (`self.stok -= terjual`)!",
      tasks: [
        "Definisikan `def kurangi_stok(self, terjual):`.",
        "Kurangi `self.stok` dengan `terjual`."
      ],
      starterCode: `class GudangBarang:
    def __init__(self, nama, stok):
        self.nama = nama
        self.stok = stok

    # Buat method kurangi_stok(self, terjual) di bawah ini:
    

barang = GudangBarang("Monitor 24 Inci", 50)
barang.kurangi_stok(12)
print(f"Sisa stok {barang.nama}: {barang.stok} unit")`,
      expectedOutput: `Sisa stok Monitor 24 Inci: 38 unit`,
      hint: "Tulis `def kurangi_stok(self, terjual):` lalu di dalamnya `self.stok -= terjual`.",
      solutionCode: `class GudangBarang:
    def __init__(self, nama, stok):
        self.nama = nama
        self.stok = stok

    def kurangi_stok(self, terjual):
        self.stok -= terjual

barang = GudangBarang("Monitor 24 Inci", 50)
barang.kurangi_stok(12)
print(f"Sisa stok {barang.nama}: {barang.stok} unit")`
    },
    {
      id: "oop-bab2-challenge5",
      title: "Memanggil Method Lain dengan self.nama_method()",
      difficulty: "Menantang",
      instructions:
        "Di dalam class `Karyawan`, method `gaji_tahunan(self)` menghitung `self.gaji_bulanan * 12`. Lengkapi method `slip_tahunan(self)` agar memanggil `self.gaji_tahunan()` dan mengembalikan string sesuai Target Output!",
      tasks: [
        "Panggil `self.gaji_tahunan()` di dalam `slip_tahunan(self)`.",
        "Kembalikan `f'{self.nama}: Rp{total:,}/tahun'`."
      ],
      starterCode: `class Karyawan:
    def __init__(self, nama, gaji_bulanan):
        self.nama = nama
        self.gaji_bulanan = gaji_bulanan

    def gaji_tahunan(self):
        return self.gaji_bulanan * 12

    def slip_tahunan(self):
        # Panggil self.gaji_tahunan() lalu return format teksnya:
        

k1 = Karyawan("Rina", 6000000)
print(k1.slip_tahunan())`,
      expectedOutput: `Rina: Rp72,000,000/tahun`,
      hint: 'Tulis `total = self.gaji_tahunan()` lalu `return f"{self.nama}: Rp{total:,}/tahun"`.',
      solutionCode: `class Karyawan:
    def __init__(self, nama, gaji_bulanan):
        self.nama = nama
        self.gaji_bulanan = gaji_bulanan

    def gaji_tahunan(self):
        return self.gaji_bulanan * 12

    def slip_tahunan(self):
        total = self.gaji_tahunan()
        return f"{self.nama}: Rp{total:,}/tahun"

k1 = Karyawan("Rina", 6000000)
print(k1.slip_tahunan())`
    }
  ],
  quizzes: [
    {
      question: "Apakah nama method khusus di Python yang berfungsi sebagai *constructor* dan dijalankan otomatis saat objek dibuat?",
      options: ["__start__()", "__init__()", "__create__()", "__new_object__()"],
      correctIndex: 1,
      explanation: "Method `__init__(self, ...)` adalah *constructor* standar di Python untuk menginisialisasi atribut objek baru."
    },
    {
      question: "Kapan method `__init__()` dieksekusi oleh Python?",
      options: [
        "Saat program selesai dijalankan",
        "Hanya ketika dipanggil secara manual dengan obj.__init__()",
        "Secara otomatis tepat pada saat objek baru diciptakan dari class",
        "Saat sebuah class didefinisikan sebelum ada objek yang dibuat"
      ],
      correctIndex: 2,
      explanation: "Python secara otomatis mengeksekusi `__init__()` setiap kali kita membuat *instance* baru, misalnya `m = Mobil('Avanza')`."
    },
    {
      question: "Apa arti dari baris kode `self.harga = harga` di dalam `__init__(self, harga)`?",
      options: [
        "Menghapus parameter harga dari memori",
        "Menyimpan nilai parameter harga ke dalam atribut harga milik objek yang sedang dibuat",
        "Membuat variabel global bernama self",
        "Membandingkan apakah self.harga sama dengan harga"
      ],
      correctIndex: 1,
      explanation: "`self.harga` adalah atribut yang menempel pada objek, sedangkan `harga` di sebelah kanan `=` adalah nilai parameter yang dikirim saat instansiasi."
    },
    {
      question: "Berapa banyak garis bawah (*underscore*) yang mengapit kata `init` pada penulisan constructor Python?",
      options: [
        "1 di kiri dan 1 di kanan (_init_)",
        "2 di kiri dan 2 di kanan (__init__)",
        "2 di kiri saja (__init)",
        "Tidak menggunakan garis bawah (init)"
      ],
      correctIndex: 1,
      explanation: "Constructor Python adalah *dunder method* (*double underscore*), sehingga wajib ditulis dengan 2 garis bawah di kiri dan 2 di kanan: `__init__`."
    },
    {
      question: "Jika sebuah class memiliki `def __init__(self, merk, warna='Hitam'):`, manakah cara pembuatan objek yang VALID?",
      options: [
        "Hanya Mobil('Toyota', 'Merah')",
        "Hanya Mobil('Toyota')",
        "Mobil('Toyota') maupun Mobil('Toyota', 'Merah') keduanya valid",
        "Mobil() tanpa argumen apa pun"
      ],
      correctIndex: 2,
      explanation: "Karena `warna` memiliki nilai default `'Hitam'`, kita boleh mengisi 1 argumen (`Mobil('Toyota')`) ataupun 2 argumen (`Mobil('Toyota', 'Merah')`)."
    },
    {
      question: "Bagaimana cara sebuah method `cetak_info(self)` memanggil method lain bernama `hitung_pajak(self)` yang berada di dalam `class` yang sama?",
      options: [
        "hitung_pajak()",
        "self.hitung_pajak()",
        "class.hitung_pajak()",
        "init.hitung_pajak()"
      ],
      correctIndex: 1,
      explanation: "Untuk memanggil method lain milik objek yang sama dari dalam class, gunakan referensi `self.hitung_pajak()`."
    },
    {
      question: "Nilai apakah yang TIDAK BOLEH dikembalikan secara eksplisit menggunakan perintah `return` di dalam method `__init__()`?",
      options: [
        "Nilai selain None (seperti angka int atau teks str)",
        "None",
        "Atribut self",
        "Tidak ada aturan khusus"
      ],
      correctIndex: 0,
      explanation: "Method `__init__()` bertugas menginisialisasi objek dan secara aturan Python tidak boleh mengembalikan nilai apa pun selain `None` (jika mengembalikan angka/string akan memicu `TypeError`)."
    },
    {
      question: "Pada kode `class Akun: def __init__(self, saldo): self.saldo = saldo`, apa yang terjadi jika kita memanggil `a = Akun()` tanpa argumen?",
      options: [
        "Atribut a.saldo otomatis bernilai 0",
        "Atribut a.saldo bernilai None",
        "Terjadi TypeError karena kurang 1 argumen wajib (saldo)",
        "Program tetap berjalan tanpa error"
      ],
      correctIndex: 2,
      explanation: "Karena parameter `saldo` tidak memiliki nilai default, memanggil `Akun()` tanpa argumen akan memicu `TypeError: missing 1 required positional argument: 'saldo'`."
    },
    {
      question: "Saat kita memanggil `mobil1.tambah_kecepatan(20)`, berapa banyak argumen yang kita tulis di dalam tanda kurung pemanggilan?",
      options: [
        "2 argumen: (self, 20)",
        "1 argumen: (20), karena self otomatis diisi oleh Python",
        "0 argumen",
        "3 argumen"
      ],
      correctIndex: 1,
      explanation: "Meskipun definisinya `def tambah_kecepatan(self, tambahan):`, saat dipanggil lewat objek `mobil1.tambah_kecepatan(20)` kita cukup mengirim `20` karena `self` diisi otomatis oleh Python."
    },
    {
      question: "Apakah nilai `self` pada objek `user_a` sama dengan `self` pada objek `user_b`?",
      options: [
        "Sama persis karena berasal dari class yang sama",
        "Berbeda, karena self selalu merujuk pada masing-masing objek yang sedang aktif dipanggil",
        "self selalu bernilai None",
        "self hanya berlaku untuk objek pertama yang dibuat"
      ],
      correctIndex: 1,
      explanation: "`self` bersifat dinamis merujuk pada *instance* mana yang sedang memanggil method tersebut (`user_a` atau `user_b`)."
    }
  ]
};

