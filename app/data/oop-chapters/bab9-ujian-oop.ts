import { DocSection } from "../types";

export const bab9UjianOop: DocSection = {
  id: "oop-bab9-ujian-akhir",
  number: 9,
  isExam: true,
  filePath: "app/data/oop-chapters/bab9-ujian-oop.ts",
  title: "Ujian Akhir Modul: Python OOP (Object-Oriented)",
  subtitle:
    "Evaluasi komprehensif seluruh materi Python OOP (Bab 1 hingga Bab 8) melalui **15 Soal Praktik Ngoding** dan **10 Soal Pemahaman Konsep**.",
  level: "Ujian Akhir",
  readTime: "35 menit",
  summary:
    "Selamat telah mempelajari seluruh bab pada modul **Python OOP (Object-Oriented Programming)**! Bab terakhir ini adalah **Ujian Akhir** untuk menguji penguasaanmu terhadap pembuatan `class` & `object`, constructor `__init__()` & `self`, *Class vs Instance Variable*, `@classmethod` & `@staticmethod`, *Encapsulation* (`__private` & `@property`), *Inheritance* (`super()`), *Polymorphism* & *Abstract Class* (`ABC`), *Magic Methods* (`__str__`, `__len__`, `__eq__`, `__add__`), hingga *Composition* dan `@dataclass`. Selesaikan **15 Soal Praktik** dan **10 Soal Pemahaman** (total 25 soal) untuk menuntaskan modul Python OOP!",
  keyPoints: [
    "Terdiri dari **15 Soal Praktik Ngoding** (Hands-On) dan **10 Soal Pemahaman** pilihan ganda.",
    "Seluruh soal **100% diambil dari materi Bab 1 hingga Bab 8 Python OOP** tanpa ada pertanyaan di luar materi.",
    "Setelah menjawab ke-25 soal ujian, klik tombol **Selesaikan Ujian Akhir** di bagian bawah halaman untuk menandai modul ini selesai."
  ],
  conceptTable: {
    title: "Kisi-Kisi Ujian Akhir Python OOP (Bab 1 – Bab 8)",
    headers: ["Asal Bab", "Topik OOP yang Diujikan", "Nomor Soal Praktik", "Nomor Soal Pemahaman"],
    rows: [
      ["Bab 1", "Pembuatan `class`, instansiasi `object`, akses atribut `.`, & *method* dasar", "Praktik #1 – #2", "Pemahaman #1"],
      ["Bab 2", "Constructor `__init__()`, `self`, *default parameter*, & interaksi antar *method*", "Praktik #3 – #4", "Pemahaman #2"],
      ["Bab 3", "*Class Variable* vs *Instance Variable*, `@classmethod` (`cls`), & `@staticmethod`", "Praktik #5 – #6", "Pemahaman #3 – #4"],
      ["Bab 4", "*Encapsulation*, *Private Attribute* (`__`), *Getter/Setter*, & `@property`", "Praktik #7 – #8", "Pemahaman #5"],
      ["Bab 5", "*Inheritance* `class Anak(Induk):`, `super().__init__()`, & `isinstance()`", "Praktik #9 – #10", "Pemahaman #6"],
      ["Bab 6", "*Polymorphism*, *Method Overriding*, & *Abstract Base Class* (`ABC`)", "Praktik #11 – #12", "Pemahaman #7 – #8"],
      ["Bab 7", "*Magic / Dunder Methods* (`__str__`, `__len__`, `__eq__`, `__add__`)", "Praktik #13 – #14", "Pemahaman #9"],
      ["Bab 8", "*Object Composition* (*Has-A*) & dekorator `@dataclass`", "Praktik #15", "Pemahaman #10"]
    ]
  },
  examples: [],
  codingChallenges: [
    {
      id: "oop-exam-challenge1",
      title: "Ujian Praktik #1: Membuat Class, Object & Mengakses Atribut (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Buatlah class `Kamera` dengan atribut `resolusi = '48 MP'`. Buat objek `kamera_saya = Kamera()`, lalu cetak nilai `kamera_saya.resolusi`!",
      tasks: [
        "Buat objek `kamera_saya = Kamera()`.",
        "Pastikan hasil cetakan adalah `Resolusi Kamera: 48 MP`."
      ],
      starterCode: `class Kamera:
    resolusi = "48 MP"

# Buat objek kamera_saya dari class Kamera:
kamera_saya = 

print("Resolusi Kamera:", kamera_saya.resolusi)`,
      expectedOutput: `Resolusi Kamera: 48 MP`,
      hint: "Tulis: `kamera_saya = Kamera()`",
      solutionCode: `class Kamera:
    resolusi = "48 MP"

kamera_saya = Kamera()

print("Resolusi Kamera:", kamera_saya.resolusi)`
    },
    {
      id: "oop-exam-challenge2",
      title: "Ujian Praktik #2: Method Dasar Pengubah Status Objek (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Pada class `PintuPintar`, buatlah method `kunci_pintu(self)` yang mengubah atribut `self.terkunci = True` dan mengembalikan `'Pintu berhasil dikunci!'`.",
      tasks: [
        "Definisikan `def kunci_pintu(self):`.",
        "Ubah `self.terkunci = True` dan `return 'Pintu berhasil dikunci!'`."
      ],
      starterCode: `class PintuPintar:
    terkunci = False

    # Buat method kunci_pintu(self) di bawah ini:
    

pintu = PintuPintar()
print(pintu.kunci_pintu())
print("Status Terkunci:", pintu.terkunci)`,
      expectedOutput: `Pintu berhasil dikunci!
Status Terkunci: True`,
      hint: 'Tulis `def kunci_pintu(self):`, lalu di dalamnya `self.terkunci = True` dan `return "Pintu berhasil dikunci!"`.',
      solutionCode: `class PintuPintar:
    terkunci = False

    def kunci_pintu(self):
        self.terkunci = True
        return "Pintu berhasil dikunci!"

pintu = PintuPintar()
print(pintu.kunci_pintu())
print("Status Terkunci:", pintu.terkunci)`
    },
    {
      id: "oop-exam-challenge3",
      title: "Ujian Praktik #3: Constructor __init__() & Default Parameter (Bab 2)",
      difficulty: "Mudah",
      instructions:
        "Lengkapi constructor `def __init__(self, judul, bahasa='Indonesia'):` pada class `Artikel` agar menyimpan `self.judul = judul` dan `self.bahasa = bahasa`!",
      tasks: [
        "Simpan `self.judul = judul` dan `self.bahasa = bahasa`."
      ],
      starterCode: `class Artikel:
    def __init__(self, judul, bahasa="Indonesia"):
        # Simpan judul dan bahasa ke atribut self:
        

a1 = Artikel("Belajar OOP Python")
a2 = Artikel("Python Data Science", "Inggris")

print(f"{a1.judul} ({a1.bahasa})")
print(f"{a2.judul} ({a2.bahasa})")`,
      expectedOutput: `Belajar OOP Python (Indonesia)
Python Data Science (Inggris)`,
      hint: "Tulis `self.judul = judul` dan `self.bahasa = bahasa` di dalam `__init__`.",
      solutionCode: `class Artikel:
    def __init__(self, judul, bahasa="Indonesia"):
        self.judul = judul
        self.bahasa = bahasa

a1 = Artikel("Belajar OOP Python")
a2 = Artikel("Python Data Science", "Inggris")

print(f"{a1.judul} ({a1.bahasa})")
print(f"{a2.judul} ({a2.bahasa})")`
    },
    {
      id: "oop-exam-challenge4",
      title: "Ujian Praktik #4: Memanggil Method Lain dengan self (Bab 2)",
      difficulty: "Sedang",
      instructions:
        "Pada class `PesananMakanan`, method `harga_kotor(self)` mengembalikan `self.harga * self.porsi`. Lengkapi method `total_bersih(self)` agar memanggil `self.harga_kotor()` dikurangi `self.voucher`!",
      tasks: [
        "Di dalam `total_bersih(self)`, kembalikan `self.harga_kotor() - self.voucher`."
      ],
      starterCode: `class PesananMakanan:
    def __init__(self, harga, porsi, voucher):
        self.harga = harga
        self.porsi = porsi
        self.voucher = voucher

    def harga_kotor(self):
        return self.harga * self.porsi

    def total_bersih(self):
        # Panggil self.harga_kotor() lalu kurangi dengan self.voucher:
        

p = PesananMakanan(30000, 3, 15000)
print(f"Total Bayar: Rp{p.total_bersih():,}")`,
      expectedOutput: `Total Bayar: Rp75,000`,
      hint: "Tulis: `return self.harga_kotor() - self.voucher`",
      solutionCode: `class PesananMakanan:
    def __init__(self, harga, porsi, voucher):
        self.harga = harga
        self.porsi = porsi
        self.voucher = voucher

    def harga_kotor(self):
        return self.harga * self.porsi

    def total_bersih(self):
        return self.harga_kotor() - self.voucher

p = PesananMakanan(30000, 3, 15000)
print(f"Total Bayar: Rp{p.total_bersih():,}")`
    },
    {
      id: "oop-exam-challenge5",
      title: "Ujian Praktik #5: Penghitung Objek dengan Class Variable (Bab 3)",
      difficulty: "Sedang",
      instructions:
        "Tambahkan `CabangToko.jumlah_cabang += 1` di dalam `__init__` milik class `CabangToko` untuk menghitung total cabang yang telah dibuka!",
      tasks: [
        "Tambahkan `CabangToko.jumlah_cabang += 1` di dalam `__init__`."
      ],
      starterCode: `class CabangToko:
    jumlah_cabang = 0

    def __init__(self, kota):
        self.kota = kota
        # Tambah CabangToko.jumlah_cabang sebesar 1:
        

c1 = CabangToko("Jakarta")
c2 = CabangToko("Bandung")
c3 = CabangToko("Surabaya")

print("Total Cabang Dibuka:", CabangToko.jumlah_cabang)`,
      expectedOutput: `Total Cabang Dibuka: 3`,
      hint: "Tulis: `CabangToko.jumlah_cabang += 1`",
      solutionCode: `class CabangToko:
    jumlah_cabang = 0

    def __init__(self, kota):
        self.kota = kota
        CabangToko.jumlah_cabang += 1

c1 = CabangToko("Jakarta")
c2 = CabangToko("Bandung")
c3 = CabangToko("Surabaya")

print("Total Cabang Dibuka:", CabangToko.jumlah_cabang)`
    },
    {
      id: "oop-exam-challenge6",
      title: "Ujian Praktik #6: Membuat Fungsi Utilitas dengan @staticmethod (Bab 3)",
      difficulty: "Sedang",
      instructions:
        "Buatlah `@staticmethod` bernama `format_rupiah(angka)` di dalam class `AlatKasir` yang mengembalikan string `f'Rp{angka:,}'`!",
      tasks: [
        "Tambahkan dekorator `@staticmethod`.",
        "Buat `def format_rupiah(angka):` dengan `return f'Rp{angka:,}'`."
      ],
      starterCode: `class AlatKasir:
    # Buat @staticmethod format_rupiah(angka) di bawah ini:
    

print(AlatKasir.format_rupiah(1250000))`,
      expectedOutput: `Rp1,250,000`,
      hint: 'Tulis `@staticmethod`, lalu `def format_rupiah(angka):`, lalu `return f"Rp{angka:,}"`.',
      solutionCode: `class AlatKasir:
    @staticmethod
    def format_rupiah(angka):
        return f"Rp{angka:,}"

print(AlatKasir.format_rupiah(1250000))`
    },
    {
      id: "oop-exam-challenge7",
      title: "Ujian Praktik #7: Encapsulation dengan Private Attribute & Getter (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Simpan parameter `kode_rahasia` ke atribut private `self.__kode_rahasia` di dalam `__init__` milik class `Brankas`, lalu kembalikan nilainya pada method `buka_brankas(self)`!",
      tasks: [
        "Simpan `self.__kode_rahasia = kode_rahasia`.",
        "Kembalikan `self.__kode_rahasia` di dalam `buka_brankas(self)`."
      ],
      starterCode: `class Brankas:
    def __init__(self, kode_rahasia):
        # Simpan ke atribut private self.__kode_rahasia:
        

    def buka_brankas(self):
        # Return self.__kode_rahasia:
        

b = Brankas("VAULT-99")
print("Isi Kode Brankas:", b.buka_brankas())`,
      expectedOutput: `Isi Kode Brankas: VAULT-99`,
      hint: "Tulis `self.__kode_rahasia = kode_rahasia` dan `return self.__kode_rahasia`.",
      solutionCode: `class Brankas:
    def __init__(self, kode_rahasia):
        self.__kode_rahasia = kode_rahasia

    def buka_brankas(self):
        return self.__kode_rahasia

b = Brankas("VAULT-99")
print("Isi Kode Brankas:", b.buka_brankas())`
    },
    {
      id: "oop-exam-challenge8",
      title: "Ujian Praktik #8: Validasi Kecepatan dengan @property & @setter (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Lengkapi `@kecepatan.setter` pada class `KeretaCepat` agar mengubah `self.__kecepatan = nilai` hanya jika `0 <= nilai <= 350`!",
      tasks: [
        "Cek `if 0 <= nilai <= 350:` di dalam `@kecepatan.setter`.",
        "Simpan `self.__kecepatan = nilai`."
      ],
      starterCode: `class KeretaCepat:
    def __init__(self, kecepatan):
        self.__kecepatan = kecepatan

    @property
    def kecepatan(self):
        return self.__kecepatan

    @kecepatan.setter
    def kecepatan(self, nilai):
        # Validasi agar 0 <= nilai <= 350:
        

whoosh = KeretaCepat(250)
whoosh.kecepatan = 500  # Ditolak (melebihi 350)
whoosh.kecepatan = 320  # Diterima
print(f"Kecepatan Kereta: {whoosh.kecepatan} km/jam")`,
      expectedOutput: `Kecepatan Kereta: 320 km/jam`,
      hint: "Tulis `if 0 <= nilai <= 350:` lalu di dalamnya `self.__kecepatan = nilai`.",
      solutionCode: `class KeretaCepat:
    def __init__(self, kecepatan):
        self.__kecepatan = kecepatan

    @property
    def kecepatan(self):
        return self.__kecepatan

    @kecepatan.setter
    def kecepatan(self, nilai):
        if 0 <= nilai <= 350:
            self.__kecepatan = nilai

whoosh = KeretaCepat(250)
whoosh.kecepatan = 500
whoosh.kecepatan = 320
print(f"Kecepatan Kereta: {whoosh.kecepatan} km/jam")`
    },
    {
      id: "oop-exam-challenge9",
      title: "Ujian Praktik #9: Pewarisan Class & super().__init__() (Bab 5)",
      difficulty: "Sedang",
      instructions:
        "Pada class `DokterSpesialis(Dokter)`, panggil `super().__init__(nama)` di dalam `__init__` lalu simpan atribut `self.bidang = bidang`!",
      tasks: [
        "Panggil `super().__init__(nama)`.",
        "Simpan `self.bidang = bidang`."
      ],
      starterCode: `class Dokter:
    def __init__(self, nama):
        self.nama = nama

class DokterSpesialis(Dokter):
    def __init__(self, nama, bidang):
        # Panggil super().__init__(nama) dan simpan self.bidang:
        

dr = DokterSpesialis("dr. Andi", "Jantung")
print(f"{dr.nama} - Spesialis {dr.bidang}")`,
      expectedOutput: `dr. Andi - Spesialis Jantung`,
      hint: "Tulis `super().__init__(nama)` lalu `self.bidang = bidang`.",
      solutionCode: `class Dokter:
    def __init__(self, nama):
        self.nama = nama

class DokterSpesialis(Dokter):
    def __init__(self, nama, bidang):
        super().__init__(nama)
        self.bidang = bidang

dr = DokterSpesialis("dr. Andi", "Jantung")
print(f"{dr.nama} - Spesialis {dr.bidang}")`
    },
    {
      id: "oop-exam-challenge10",
      title: "Ujian Praktik #10: Memperluas Method Induk dengan super() (Bab 5)",
      difficulty: "Sedang",
      instructions:
        "Pada class `KamarSuite(KamarStandar)`, override method `fasilitas(self)` agar mengembalikan `super().fasilitas() + ', Kolam Renang Pribadi'`!",
      tasks: [
        "Gunakan `return super().fasilitas() + ', Kolam Renang Pribadi'`."
      ],
      starterCode: `class KamarStandar:
    def fasilitas(self):
        return "AC, TV, Wi-Fi"

class KamarSuite(KamarStandar):
    def fasilitas(self):
        # Gabungkan super().fasilitas() dengan ", Kolam Renang Pribadi":
        

suite = KamarSuite()
print("Fasilitas Suite:", suite.fasilitas())`,
      expectedOutput: `Fasilitas Suite: AC, TV, Wi-Fi, Kolam Renang Pribadi`,
      hint: 'Tulis: `return super().fasilitas() + ", Kolam Renang Pribadi"`',
      solutionCode: `class KamarStandar:
    def fasilitas(self):
        return "AC, TV, Wi-Fi"

class KamarSuite(KamarStandar):
    def fasilitas(self):
        return super().fasilitas() + ", Kolam Renang Pribadi"

suite = KamarSuite()
print("Fasilitas Suite:", suite.fasilitas())`
    },
    {
      id: "oop-exam-challenge11",
      title: "Ujian Praktik #11: Method Overriding & Polymorphism (Bab 6)",
      difficulty: "Sedang",
      instructions:
        "Override method `hitung_biaya(self)` pada class `PengirimanUdara(Pengiriman)` agar mengembalikan `self.berat * 25000`!",
      tasks: [
        "Definisikan `def hitung_biaya(self):` di dalam `PengirimanUdara`.",
        "Kembalikan `self.berat * 25000`."
      ],
      starterCode: `class Pengiriman:
    def __init__(self, berat):
        self.berat = berat

    def hitung_biaya(self):
        return self.berat * 10000

class PengirimanUdara(Pengiriman):
    # Override method hitung_biaya(self) menjadi self.berat * 25000:
    

paket_darat = Pengiriman(4)
paket_udara = PengirimanUdara(4)

print(f"Biaya Darat : Rp{paket_darat.hitung_biaya():,}")
print(f"Biaya Udara : Rp{paket_udara.hitung_biaya():,}")`,
      expectedOutput: `Biaya Darat : Rp40,000
Biaya Udara : Rp100,000`,
      hint: "Tulis `def hitung_biaya(self):` lalu `return self.berat * 25000`.",
      solutionCode: `class Pengiriman:
    def __init__(self, berat):
        self.berat = berat

    def hitung_biaya(self):
        return self.berat * 10000

class PengirimanUdara(Pengiriman):
    def hitung_biaya(self):
        return self.berat * 25000

paket_darat = Pengiriman(4)
paket_udara = PengirimanUdara(4)

print(f"Biaya Darat : Rp{paket_darat.hitung_biaya():,}")
print(f"Biaya Udara : Rp{paket_udara.hitung_biaya():,}")`
    },
    {
      id: "oop-exam-challenge12",
      title: "Ujian Praktik #12: Implementasi Abstract Base Class (ABC) (Bab 6)",
      difficulty: "Menantang",
      instructions:
        "Implementasikan abstract method `proses_pembayaran(self, nominal)` pada class `PembayaranQRIS(MetodeBayar)` agar mengembalikan `f'Lunas Rp{nominal:,} via QRIS'`!",
      tasks: [
        "Definisikan `def proses_pembayaran(self, nominal):` di dalam `PembayaranQRIS`.",
        "Kembalikan `f'Lunas Rp{nominal:,} via QRIS'`."
      ],
      starterCode: `from abc import ABC, abstractmethod

class MetodeBayar(ABC):
    @abstractmethod
    def proses_pembayaran(self, nominal):
        pass

class PembayaranQRIS(MetodeBayar):
    # Implementasikan proses_pembayaran(self, nominal) di sini:
    

qris = PembayaranQRIS()
print(qris.proses_pembayaran(150000))`,
      expectedOutput: `Lunas Rp150,000 via QRIS`,
      hint: 'Tulis `def proses_pembayaran(self, nominal):` lalu `return f"Lunas Rp{nominal:,} via QRIS"`.',
      solutionCode: `from abc import ABC, abstractmethod

class MetodeBayar(ABC):
    @abstractmethod
    def proses_pembayaran(self, nominal):
        pass

class PembayaranQRIS(MetodeBayar):
    def proses_pembayaran(self, nominal):
        return f"Lunas Rp{nominal:,} via QRIS"

qris = PembayaranQRIS()
print(qris.proses_pembayaran(150000))`
    },
    {
      id: "oop-exam-challenge13",
      title: "Ujian Praktik #13: Magic Methods __str__() dan __len__() (Bab 7)",
      difficulty: "Menantang",
      instructions:
        "Pada class `RakBuku`, lengkapi `__len__(self)` agar mengembalikan `len(self.daftar_judul)` dan `__str__(self)` agar mengembalikan `f'Rak berisi {len(self)} buku'`!",
      tasks: [
        "Kembalikan `len(self.daftar_judul)` di dalam `__len__(self)`.",
        "Kembalikan `f'Rak berisi {len(self)} buku'` di dalam `__str__(self)`."
      ],
      starterCode: `class RakBuku:
    def __init__(self, daftar_judul):
        self.daftar_judul = daftar_judul

    def __len__(self):
        # Return panjang self.daftar_judul:
        

    def __str__(self):
        # Return f"Rak berisi {len(self)} buku":
        

rak = RakBuku(["Python Dasar", "Python OOP", "Python NumPy"])
print("Hasil len(rak) :", len(rak))
print("Hasil print    :", rak)`,
      expectedOutput: `Hasil len(rak) : 3
Hasil print    : Rak berisi 3 buku`,
      hint: 'Tulis `return len(self.daftar_judul)` di `__len__` dan `return f"Rak berisi {len(self)} buku"` di `__str__`.',
      solutionCode: `class RakBuku:
    def __init__(self, daftar_judul):
        self.daftar_judul = daftar_judul

    def __len__(self):
        return len(self.daftar_judul)

    def __str__(self):
        return f"Rak berisi {len(self)} buku"

rak = RakBuku(["Python Dasar", "Python OOP", "Python NumPy"])
print("Hasil len(rak) :", len(rak))
print("Hasil print    :", rak)`
    },
    {
      id: "oop-exam-challenge14",
      title: "Ujian Praktik #14: Magic Method Penjumlahan Objek __add__() (Bab 7)",
      difficulty: "Menantang",
      instructions:
        "Pada class `DompetPoin`, buatlah method `__add__(self, other)` yang mengembalikan objek baru `DompetPoin(self.poin + other.poin)`!",
      tasks: [
        "Definisikan `def __add__(self, other):`.",
        "Kembalikan `DompetPoin(self.poin + other.poin)`."
      ],
      starterCode: `class DompetPoin:
    def __init__(self, poin):
        self.poin = poin

    def __str__(self):
        return f"Total Poin Gabungan: {self.poin}"

    # Buat method __add__(self, other) di sini:
    

p1 = DompetPoin(250)
p2 = DompetPoin(400)
hasil = p1 + p2
print(hasil)`,
      expectedOutput: `Total Poin Gabungan: 650`,
      hint: "Tulis `def __add__(self, other):` lalu `return DompetPoin(self.poin + other.poin)`.",
      solutionCode: `class DompetPoin:
    def __init__(self, poin):
        self.poin = poin

    def __str__(self):
        return f"Total Poin Gabungan: {self.poin}"

    def __add__(self, other):
        return DompetPoin(self.poin + other.poin)

p1 = DompetPoin(250)
p2 = DompetPoin(400)
hasil = p1 + p2
print(hasil)`
    },
    {
      id: "oop-exam-challenge15",
      title: "Ujian Praktik #15: Menggabungkan @dataclass & Object Composition (Bab 8)",
      difficulty: "Menantang",
      instructions:
        "Diberikan `@dataclass` `Produk(nama: str, harga: int)`. Di dalam class `NotaBelanja`, lengkapi method `hitung_total(self)` untuk menjumlahkan `p.harga` dari seluruh objek `Produk` di dalam `self.daftar_produk`!",
      tasks: [
        "Telusuri `for p in self.daftar_produk:` dan tambahkan `p.harga` ke `total`.",
        "Kembalikan `total`."
      ],
      starterCode: `from dataclasses import dataclass

@dataclass
class Produk:
    nama: str
    harga: int

class NotaBelanja:
    def __init__(self):
        self.daftar_produk = []

    def tambah(self, produk):
        self.daftar_produk.append(produk)

    def hitung_total(self):
        total = 0
        # Jumlahkan p.harga untuk setiap p di self.daftar_produk:
        
        return total

nota = NotaBelanja()
nota.tambah(Produk("Keyboard", 350000))
nota.tambah(Produk("Mouse", 150000))

print(f"Total Nota: Rp{nota.hitung_total():,}")`,
      expectedOutput: `Total Nota: Rp500,000`,
      hint: "Tulis `for p in self.daftar_produk:` lalu di dalamnya `total += p.harga`.",
      solutionCode: `from dataclasses import dataclass

@dataclass
class Produk:
    nama: str
    harga: int

class NotaBelanja:
    def __init__(self):
        self.daftar_produk = []

    def tambah(self, produk):
        self.daftar_produk.append(produk)

    def hitung_total(self):
        total = 0
        for p in self.daftar_produk:
            total += p.harga
        return total

nota = NotaBelanja()
nota.tambah(Produk("Keyboard", 350000))
nota.tambah(Produk("Mouse", 150000))

print(f"Total Nota: Rp{nota.hitung_total():,}")`
    }
  ],
  quizzes: [
    {
      question: "Manakah pernyataan yang paling tepat mengenai hubungan antara `class` dan `object`?",
      options: [
        "Object adalah cetak biru, sedangkan class adalah hasil nyatanya",
        "Class adalah cetak biru (blueprint), sedangkan object adalah wujud nyata (instance) yang dibuat dari class tersebut",
        "Satu class hanya boleh membuat maksimal satu object",
        "Class dan object tidak bisa memiliki method"
      ],
      correctIndex: 1,
      explanation: "`class` adalah kerangka/cetak biru, sedangkan `object` adalah *instance* nyata yang diciptakan dari `class` tersebut."
    },
    {
      question: "Apa fungsi utama dari parameter `self` pada method `def __init__(self, nama):`?",
      options: [
        "Mewakili objek (instance) yang sedang dibuat atau dipanggil agar atribut menempel pada objek tersebut",
        "Menjadikan atribut bersifat global untuk seluruh file Python",
        "Menghapus atribut setelah fungsi selesai",
        "Menggantikan kata kunci return"
      ],
      correctIndex: 0,
      explanation: "`self` merujuk pada objek (*instance*) saat ini sehingga setiap objek menyimpan datanya masing-masing."
    },
    {
      question: "Jika sebuah variabel dideklarasikan langsung di bawah baris `class Toko:` (di luar `__init__`), disebut apakah variabel tersebut?",
      options: [
        "Local Variable",
        "Instance Variable",
        "Class Variable (milik bersama seluruh objek dari class Toko)",
        "Private Method"
      ],
      correctIndex: 2,
      explanation: "Variabel yang dideklarasikan di tingkat class di luar method disebut *Class Variable* dan nilainya dibagi bersama oleh seluruh objek."
    },
    {
      question: "Pasangan dekorator dan parameter pertama manakah yang BENAR di Python OOP?",
      options: [
        "@classmethod menggunakan parameter pertama cls, sedangkan @staticmethod tidak membutuhkan self maupun cls",
        "@classmethod menggunakan self, sedangkan @staticmethod menggunakan cls",
        "Keduanya wajib menggunakan self",
        "@staticmethod wajib menggunakan super()"
      ],
      correctIndex: 0,
      explanation: "`@classmethod` menerima `cls` (class itu sendiri), sedangkan `@staticmethod` adalah fungsi mandiri di dalam class tanpa `self` maupun `cls`."
    },
    {
      question: "Bagaimana cara membuat atribut `saldo` bersifat **Private** dan menyediakannya sebagai properti yang aman dibaca di Python?",
      options: [
        "Menulis self.__saldo di __init__ dan membuat method dengan dekorator @property",
        "Menulis self.saldo_private dan mencetaknya dengan print()",
        "Menggunakan kata kunci private saldo",
        "Menulis @staticmethod di atas __init__"
      ],
      correctIndex: 0,
      explanation: "Dua garis bawah di depan (`self.__saldo`) menjadikannya *Private*, dan dekorator `@property` menyediakan akses baca yang bersih."
    },
    {
      question: "Pada kode `class MobilListrik(Kendaraan):`, bagaimana cara memanggil constructor `__init__(merek)` milik `Kendaraan` dari dalam `MobilListrik`?",
      options: [
        "Kendaraan.init(merek)",
        "super().__init__(merek)",
        "self.parent(merek)",
        "__init__.super(merek)"
      ],
      correctIndex: 1,
      explanation: "Fungsi `super().__init__(merek)` memanggil constructor milik *Parent Class* (`Kendaraan`)."
    },
    {
      question: "Apa yang dimaksud dengan **Method Overriding** pada pewarisan class?",
      options: [
        "Menghapus semua method di dalam Parent Class",
        "Mendefinisikan ulang method di Child Class dengan nama yang sama seperti di Parent Class untuk mengganti perilakunya",
        "Membuat dua class dengan nama yang sama",
        "Mengubah atribut menjadi fungsi"
      ],
      correctIndex: 1,
      explanation: "*Method Overriding* memungkinkan *Child Class* menyediakan implementasi spesifik untuk method yang sudah ada di *Parent Class*."
    },
    {
      question: "Apa fungsi dari dekorator `@abstractmethod` pada class yang mewarisi `ABC` (*Abstract Base Class*)?",
      options: [
        "Membuat method tersebut berjalan 2 kali lebih cepat",
        "Mewajibkan setiap Child Class untuk mengimplementasikan (override) method tersebut sebelum bisa dibuat objeknya",
        "Menyembunyikan method agar tidak bisa dipanggil",
        "Mengubah method menjadi variabel"
      ],
      correctIndex: 1,
      explanation: "`@abstractmethod` menetapkan kontrak wajib bagi seluruh *subclass* dari *Abstract Base Class* tersebut."
    },
    {
      question: "Pasangan *Magic Method* dan pemicunya manakah yang TEPAT di bawah ini?",
      options: [
        "__str__ dipicu oleh len(obj), sedangkan __len__ dipicu oleh print(obj)",
        "__str__ dipicu oleh print(obj), __eq__ dipicu oleh obj1 == obj2, dan __add__ dipicu oleh obj1 + obj2",
        "__init__ dipicu oleh obj1 + obj2",
        "__repr__ dipicu oleh operator =="
      ],
      correctIndex: 1,
      explanation: "`__str__` menangani `print(obj)`, `__eq__` menangani `==`, dan `__add__` menangani `+`."
    },
    {
      question: "Apa keuntungan utama menggunakan dekorator `@dataclass` saat membuat class penyimpan data?",
      options: [
        "Otomatis membuatkan method __init__(), __repr__(), dan __eq__() berdasarkan anotasi tipe atribut tanpa perlu menulisnya manual",
        "Membuat class tidak membutuhkan nama",
        "Mengubah semua atribut menjadi fungsi",
        "Menghapus kebutuhan import modul"
      ],
      correctIndex: 0,
      explanation: "`@dataclass` menghemat penulisan kode *boilerplate* dengan mengenerate `__init__`, `__repr__`, dan `__eq__` secara otomatis."
    }
  ]
};
