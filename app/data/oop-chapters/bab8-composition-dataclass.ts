import { DocSection } from "../types";

export const bab8CompositionDataclass: DocSection = {
  id: "oop-bab8-composition-dataclass",
  number: 8,
  filePath: "app/data/oop-chapters/bab8-composition-dataclass.ts",
  title: "Object Composition (Relasi Antar Objek) & @dataclass",
  subtitle:
    "Menghubungkan beberapa objek dengan konsep *Composition* (*Has-A Relationship*), mengelola koleksi objek di dalam `List`, serta membuat class ringkas dengan `@dataclass`.",
  level: "Menengah",
  readTime: "15 menit",
  summary:
    "Dalam membangun aplikasi nyata, satu `class` jarang berdiri sendiri. Selain hubungan pewarisan (*Is-A*), terdapat hubungan **Composition** (*Has-A Relationship* / 'Memiliki'), yaitu ketika sebuah objek menyimpan objek lain sebagai atributnya—misalnya objek `Mobil` memiliki objek `Mesin`, atau objek `Perpustakaan` menyimpan `List` berisi kumpulan objek `Buku`. Di samping itu, sejak Python 3.7 tersedia dekorator `@dataclass` dari modul `dataclasses` yang secara otomatis membuatkan `__init__()`, `__repr__()`, dan `__eq__()` hanya dengan menuliskan nama atribut beserta tipe datanya!",
  keyPoints: [
    "**Composition (*Has-A Relationship*)**: Menyimpan sebuah objek sebagai atribut di dalam objek lain (contoh: `self.mesin = Mesin('V8')`).",
    "**Koleksi Objek di dalam Class**: Sebuah objek wadah (seperti `KeranjangBelanja` atau `KelasSekolah`) dapat memiliki atribut `self.daftar_item = []` yang menampung banyak objek dari class lain.",
    "`from dataclasses import dataclass`: Dekorator `@dataclass` menyederhanakan pembuatan `class` penyimpan data tanpa perlu menulis `def __init__(self, ...):` secara manual.",
    "Pada `@dataclass`, kita cukup mendeklarasikan atribut dengan *Type Hint* seperti `nama: str` dan `harga: int = 0` (mendukung nilai default).",
    "Class yang menggunakan `@dataclass` tetap bisa memiliki *method* tambahan biasa maupun `@property` seperti class pada umumnya."
  ],
  conceptTable: {
    title: "Perbandingan Inheritance vs Composition & Keunggulan @dataclass",
    headers: ["Konsep / Fitur", "Jenis Hubungan", "Contoh Penerapan", "Kapan Digunakan?"],
    rows: [
      ["Inheritance", "Is-A (Adalah Sebuah)", "class Mobil(Kendaraan):", "Saat class anak adalah versi khusus dari class induk."],
      ["Composition (1 Objek)", "Has-A (Memiliki)", "self.mesin = Mesin(2000)", "Saat objek besar tersusun dari komponen objek lain."],
      ["Composition (List Objek)", "Has-Many (Memiliki Banyak)", "self.daftar_buku.append(obj_buku)", "Saat sebuah class mengelola sekumpulan objek lain."],
      ["@dataclass", "Generator Otomatis", "@dataclass\nclass Barang:\n    nama: str\n    harga: int", "Saat membuat class yang fokus menyimpan data terstruktur."]
    ]
  },
  examples: [
    {
      id: "oop-bab8-ex1",
      title: "1. Object Composition: Objek di Dalam Objek (Has-A Relationship)",
      description:
        "Class `Komputer` memiliki atribut `self.prosesor` yang nilainya merupakan sebuah objek dari class `Prosesor`.",
      code: `class Prosesor:
    def __init__(self, seri, jumlah_core):
        self.seri = seri
        self.jumlah_core = jumlah_core

    def info_cpu(self):
        return f"{self.seri} ({self.jumlah_core}-Core)"

class Komputer:
    def __init__(self, merek_pc, objek_prosesor):
        self.merek_pc = merek_pc
        # Menyimpan objek Prosesor sebagai atribut (Composition)
        self.prosesor = objek_prosesor

    def spesifikasi(self):
        return f"PC {self.merek_pc} ditenagai CPU {self.prosesor.info_cpu()}"

cpu_ryzen = Prosesor("Ryzen 7", 8)
pc_gaming = Komputer("ROG Strix", cpu_ryzen)

print(pc_gaming.spesifikasi())
print("Jumlah Core CPU:", pc_gaming.prosesor.jumlah_core)`,
      output: `PC ROG Strix ditenagai CPU Ryzen 7 (8-Core)
Jumlah Core CPU: 8`,
      lineExplanations: [
        {
          line: "self.prosesor = objek_prosesor",
          explanation: "Atribut `self.prosesor` tidak berisi string/angka biasa, melainkan menyimpan objek `Prosesor` secara utuh."
        },
        {
          line: "self.prosesor.info_cpu()",
          explanation: "Kita dapat memanggil method milik objek `Prosesor` langsung dari dalam method `Komputer`."
        }
      ]
    },
    {
      id: "oop-bab8-ex2",
      title: "2. Mengelola List Berisi Banyak Objek (Toko & Produk)",
      description:
        "Pola yang sangat sering dipakai di dunia kerja: class `Keranjang` menampung banyak objek `Item` di dalam sebuah `List` dan menghitung total harganya.",
      code: `class Item:
    def __init__(self, nama, harga):
        self.nama = nama
        self.harga = harga

class Keranjang:
    def __init__(self):
        self.daftar_item = []

    def tambah_item(self, item_baru):
        self.daftar_item.append(item_baru)

    def total_belanja(self):
        total = 0
        for item in self.daftar_item:
            total += item.harga
        return total

keranjang_andi = Keranjang()
keranjang_andi.tambah_item(Item("Buku Python", 95000))
keranjang_andi.tambah_item(Item("Mouse Pad", 35000))
keranjang_andi.tambah_item(Item("Lampu Meja", 120000))

print("Jumlah Barang :", len(keranjang_andi.daftar_item))
print(f"Total Belanja : Rp{keranjang_andi.total_belanja():,}")`,
      output: `Jumlah Barang : 3
Total Belanja : Rp250,000`,
      lineExplanations: [
        {
          line: "self.daftar_item.append(item_baru)",
          explanation: "Menambahkan objek `Item` ke dalam `List` `self.daftar_item`."
        },
        {
          line: "for item in self.daftar_item:\n            total += item.harga",
          explanation: "Menelusuri setiap objek `Item` di dalam list dan mengakses atribut `.harga`-nya."
        }
      ]
    },
    {
      id: "oop-bab8-ex3",
      title: "3. Membuat Class Modern & Ringkas dengan @dataclass",
      description:
        "Dengan `@dataclass`, kita tidak perlu mengetik `def __init__` panjang lebar. Python otomatis menyediakan `__init__`, `__repr__`, dan `__eq__`!",
      code: `from dataclasses import dataclass

@dataclass
class MenuKafe:
    nama: str
    harga: int
    tersedia: bool = True

    def harga_setelah_pajak(self):
        return int(self.harga * 1.10)

m1 = MenuKafe("Matcha Latte", 28000)
m2 = MenuKafe("Matcha Latte", 28000)

# Otomatis memiliki format print (__repr__) dan perbandingan == (__eq__)
print("Objek m1             :", m1)
print("Apakah m1 == m2?     :", m1 == m2)
print(f"Harga + Pajak 10%    : Rp{m1.harga_setelah_pajak():,}")`,
      output: `Objek m1             : MenuKafe(nama='Matcha Latte', harga=28000, tersedia=True)
Apakah m1 == m2?     : True
Harga + Pajak 10%    : Rp30,800`,
      lineExplanations: [
        {
          line: "@dataclass\nclass MenuKafe:",
          explanation: "Dekorator `@dataclass` secara otomatis membuatkan constructor `__init__(self, nama, harga, tersedia=True)`."
        },
        {
          line: "tersedia: bool = True",
          explanation: "Memberikan nilai default `True` pada atribut `tersedia` jika tidak diisi saat objek dibuat."
        }
      ]
    }
  ],
  tips: [
    "Gunakan `@dataclass` ketika kamu membuat class yang tugas utamanya menyimpan data (seperti data produk, koordinat, atau respons API).",
    "Saat menaruh atribut dengan nilai default di dalam `@dataclass`, pastikan atribut yang memiliki nilai default diletakkan **di bawah** atribut yang wajib diisi."
  ],
  commonMistakes: [
    {
      wrong: "@dataclass\nclass Siswa:\n    nama = 'Andi'  # Lupa menulis anotasi tipe data (: str)",
      correct: "@dataclass\nclass Siswa:\n    nama: str = 'Andi'",
      reason: "Di dalam `@dataclass`, setiap atribut wajib mencantumkan anotasi tipe data menggunakan titik dua (seperti `nama: str` atau `umur: int`) agar dikenali sebagai *field*."
    }
  ],
  caseStudies: [
    {
      id: "oop-bab8-case1",
      title: "Sistem Perpustakaan yang Menyimpan Daftar Objek Buku (Composition)",
      difficulty: "Mudah",
      scenario:
        "Sebuah aplikasi perpustakaan memiliki class `Buku(judul, penulis)` dan class `Perpustakaan`. Objek `Perpustakaan` menyimpan kumpulan objek `Buku` di dalam list `self.koleksi = []` melalui method `tambah_buku(self, buku_baru)`.",
      instructions:
        "Lengkapi method `tambah_buku(self, buku_baru)` dengan `self.koleksi.append(buku_baru)` dan method `jumlah_koleksi(self)` yang mengembalikan `len(self.koleksi)`!",
      tasks: [
        "Tambahkan `self.koleksi.append(buku_baru)` di dalam `tambah_buku`.",
        "Kembalikan `len(self.koleksi)` di dalam `jumlah_koleksi`."
      ],
      starterCode: `class Buku:
    def __init__(self, judul):
        self.judul = judul

class Perpustakaan:
    def __init__(self):
        self.koleksi = []

    def tambah_buku(self, buku_baru):
        # Masukkan buku_baru ke list self.koleksi:
        

    def jumlah_koleksi(self):
        # Return panjang list self.koleksi:
        

perpus = Perpustakaan()
perpus.tambah_buku(Buku("Python Dasar"))
perpus.tambah_buku(Buku("Python OOP"))

print("Total Buku:", perpus.jumlah_koleksi())
print("Buku Pertama:", perpus.koleksi[0].judul)`,
      expectedOutput: `Total Buku: 2
Buku Pertama: Python Dasar`,
      hint: "Tulis `self.koleksi.append(buku_baru)` di `tambah_buku`, dan `return len(self.koleksi)` di `jumlah_koleksi`.",
      solutionCode: `class Buku:
    def __init__(self, judul):
        self.judul = judul

class Perpustakaan:
    def __init__(self):
        self.koleksi = []

    def tambah_buku(self, buku_baru):
        self.koleksi.append(buku_baru)

    def jumlah_koleksi(self):
        return len(self.koleksi)

perpus = Perpustakaan()
perpus.tambah_buku(Buku("Python Dasar"))
perpus.tambah_buku(Buku("Python OOP"))

print("Total Buku:", perpus.jumlah_koleksi())
print("Buku Pertama:", perpus.koleksi[0].judul)`
    },
    {
      id: "oop-bab8-case2",
      title: "Pencatatan Paket Pengiriman Kurir dengan @dataclass",
      difficulty: "Sedang",
      scenario:
        "Perusahaan logistik menggunakan `@dataclass` untuk mendefinisikan class `PaketKiriman` yang memiliki 3 atribut bertipe data: `resi: str`, `berat_kg: int`, dan `tarif_per_kg: int = 10000`, serta sebuah method `total_ongkir(self)`.",
      instructions:
        "Lengkapi deklarasi `@dataclass` `PaketKiriman` beserta method `total_ongkir(self)` yang mengembalikan `self.berat_kg * self.tarif_per_kg`!",
      tasks: [
        "Deklarasikan `resi: str`, `berat_kg: int`, dan `tarif_per_kg: int = 10000`.",
        "Kembalikan `self.berat_kg * self.tarif_per_kg` pada `total_ongkir(self)`."
      ],
      starterCode: `from dataclasses import dataclass

@dataclass
class PaketKiriman:
    resi: str
    berat_kg: int
    tarif_per_kg: int = 10000

    def total_ongkir(self):
        # Kembalikan hasil berat_kg dikali tarif_per_kg:
        

paket1 = PaketKiriman("JKT-001", 4)
print(f"Resi {paket1.resi} ({paket1.berat_kg} kg) -> Ongkir: Rp{paket1.total_ongkir():,}")`,
      expectedOutput: `Resi JKT-001 (4 kg) -> Ongkir: Rp40,000`,
      hint: "Di dalam `total_ongkir(self)`, tulis: `return self.berat_kg * self.tarif_per_kg`",
      solutionCode: `from dataclasses import dataclass

@dataclass
class PaketKiriman:
    resi: str
    berat_kg: int
    tarif_per_kg: int = 10000

    def total_ongkir(self):
        return self.berat_kg * self.tarif_per_kg

paket1 = PaketKiriman("JKT-001", 4)
print(f"Resi {paket1.resi} ({paket1.berat_kg} kg) -> Ongkir: Rp{paket1.total_ongkir():,}")`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab8-challenge1",
      title: "Composition: Objek Mobil yang Memiliki Objek Mesin",
      difficulty: "Mudah",
      instructions:
        "Simpan parameter `objek_mesin` ke dalam atribut `self.mesin = objek_mesin` pada constructor class `Mobil`, lalu cetak `mobil_balap.mesin.tenaga_hp`!",
      tasks: [
        "Isi `self.mesin = objek_mesin` di dalam `__init__` milik `Mobil`."
      ],
      starterCode: `class Mesin:
    def __init__(self, tenaga_hp):
        self.tenaga_hp = tenaga_hp

class Mobil:
    def __init__(self, merek, objek_mesin):
        self.merek = merek
        # Simpan objek_mesin ke atribut self.mesin:
        

mesin_turbo = Mesin(320)
mobil_balap = Mobil("Civic Type R", mesin_turbo)

print(f"{mobil_balap.merek} - Tenaga: {mobil_balap.mesin.tenaga_hp} HP")`,
      expectedOutput: `Civic Type R - Tenaga: 320 HP`,
      hint: "Tulis: `self.mesin = objek_mesin`",
      solutionCode: `class Mesin:
    def __init__(self, tenaga_hp):
        self.tenaga_hp = tenaga_hp

class Mobil:
    def __init__(self, merek, objek_mesin):
        self.merek = merek
        self.mesin = objek_mesin

mesin_turbo = Mesin(320)
mobil_balap = Mobil("Civic Type R", mesin_turbo)

print(f"{mobil_balap.merek} - Tenaga: {mobil_balap.mesin.tenaga_hp} HP")`
    },
    {
      id: "oop-bab8-challenge2",
      title: "Membuat Class Ringkas dengan @dataclass",
      difficulty: "Mudah",
      instructions:
        "Tambahkan dekorator `@dataclass` di atas `class Koordinat:` yang memiliki atribut `x: int` dan `y: int`!",
      tasks: [
        "Tambahkan `@dataclass` tepat di atas `class Koordinat:`."
      ],
      starterCode: `from dataclasses import dataclass

# Tambahkan dekorator @dataclass di bawah ini:
class Koordinat:
    x: int
    y: int

titik = Koordinat(15, 30)
print(titik)`,
      expectedOutput: `Koordinat(x=15, y=30)`,
      hint: "Tulis `@dataclass` di baris tepat sebelum `class Koordinat:`.",
      solutionCode: `from dataclasses import dataclass

@dataclass
class Koordinat:
    x: int
    y: int

titik = Koordinat(15, 30)
print(titik)`
    },
    {
      id: "oop-bab8-challenge3",
      title: "Memberikan Nilai Default pada @dataclass",
      difficulty: "Sedang",
      instructions:
        "Pada `@dataclass` `AkunMember`, tambahkan atribut `nama: str` dan atribut dengan nilai default `poin: int = 100`!",
      tasks: [
        "Deklarasikan `nama: str`.",
        "Deklarasikan `poin: int = 100`."
      ],
      starterCode: `from dataclasses import dataclass

@dataclass
class AkunMember:
    # Deklarasikan nama: str dan poin: int = 100 di sini:
    

m = AkunMember("Andi")
print(f"Member: {m.nama} | Poin Awal: {m.poin}")`,
      expectedOutput: `Member: Andi | Poin Awal: 100`,
      hint: "Tulis `nama: str` di baris pertama dan `poin: int = 100` di baris kedua.",
      solutionCode: `from dataclasses import dataclass

@dataclass
class AkunMember:
    nama: str
    poin: int = 100

m = AkunMember("Andi")
print(f"Member: {m.nama} | Poin Awal: {m.poin}")`
    },
    {
      id: "oop-bab8-challenge4",
      title: "Menjumlahkan Nilai Objek Siswa di Dalam Kelas (Composition)",
      difficulty: "Sedang",
      instructions:
        "Class `KelasUjian` menyimpan daftar objek `Siswa(nama, nilai)` di dalam `self.daftar_siswa`. Lengkapi method `total_nilai(self)` untuk menjumlahkan `s.nilai` dari seluruh siswa di `self.daftar_siswa`!",
      tasks: [
        "Telusuri `for s in self.daftar_siswa:` dan jumlahkan `s.nilai`.",
        "Kembalikan totalnya."
      ],
      starterCode: `class Siswa:
    def __init__(self, nama, nilai):
        self.nama = nama
        self.nilai = nilai

class KelasUjian:
    def __init__(self):
        self.daftar_siswa = []

    def tambah(self, siswa):
        self.daftar_siswa.append(siswa)

    def total_nilai(self):
        total = 0
        # Jumlahkan s.nilai untuk setiap s di self.daftar_siswa:
        
        return total

kelas = KelasUjian()
kelas.tambah(Siswa("Andi", 85))
kelas.tambah(Siswa("Siti", 95))

print("Total Nilai Kelas:", kelas.total_nilai())`,
      expectedOutput: `Total Nilai Kelas: 180`,
      hint: "Tulis `for s in self.daftar_siswa:` lalu di dalamnya `total += s.nilai`.",
      solutionCode: `class Siswa:
    def __init__(self, nama, nilai):
        self.nama = nama
        self.nilai = nilai

class KelasUjian:
    def __init__(self):
        self.daftar_siswa = []

    def tambah(self, siswa):
        self.daftar_siswa.append(siswa)

    def total_nilai(self):
        total = 0
        for s in self.daftar_siswa:
            total += s.nilai
        return total

kelas = KelasUjian()
kelas.tambah(Siswa("Andi", 85))
kelas.tambah(Siswa("Siti", 95))

print("Total Nilai Kelas:", kelas.total_nilai())`
    },
    {
      id: "oop-bab8-challenge5",
      title: "Menggabungkan @dataclass dengan Method Perhitungan",
      difficulty: "Menantang",
      instructions:
        "Buatlah `@dataclass` `TagihanListrik` dengan atribut `pelanggan: str`, `pemakaian_kwh: int`, dan `tarif_per_kwh: int = 1500`, serta method `hitung_bayar(self)` yang mengembalikan `self.pemakaian_kwh * self.tarif_per_kwh`!",
      tasks: [
        "Lengkapi atribut pada `@dataclass` `TagihanListrik`.",
        "Kembalikan `self.pemakaian_kwh * self.tarif_per_kwh` pada `hitung_bayar(self)`."
      ],
      starterCode: `from dataclasses import dataclass

@dataclass
class TagihanListrik:
    pelanggan: str
    pemakaian_kwh: int
    tarif_per_kwh: int = 1500

    # Buat method hitung_bayar(self) di bawah ini:
    

t = TagihanListrik("Pak Budi", 200)
print(f"Tagihan {t.pelanggan}: Rp{t.hitung_bayar():,}")`,
      expectedOutput: `Tagihan Pak Budi: Rp300,000`,
      hint: "Tulis `def hitung_bayar(self):` lalu `return self.pemakaian_kwh * self.tarif_per_kwh`.",
      solutionCode: `from dataclasses import dataclass

@dataclass
class TagihanListrik:
    pelanggan: str
    pemakaian_kwh: int
    tarif_per_kwh: int = 1500

    def hitung_bayar(self):
        return self.pemakaian_kwh * self.tarif_per_kwh

t = TagihanListrik("Pak Budi", 200)
print(f"Tagihan {t.pelanggan}: Rp{t.hitung_bayar():,}")`
    }
  ],
  quizzes: [
    {
      question: "Disebut apakah prinsip perancangan OOP ketika sebuah objek menyimpan objek lain sebagai atributnya (hubungan 'Memiliki' / *Has-A*)?",
      options: ["Inheritance", "Composition", "Compilation", "Recursion"],
      correctIndex: 1,
      explanation: "**Composition** (*Has-A Relationship*) terjadi ketika sebuah objek disusun dari satu atau lebih objek komponen lainnya."
    },
    {
      question: "Manakah contoh hubungan yang paling tepat menggambarkan **Composition** (*Has-A*) dibanding *Inheritance* (*Is-A*)?",
      options: [
        "Kucing adalah seekor Hewan",
        "Mobil memiliki sebuah Mesin",
        "Manajer adalah seorang Pegawai",
        "Persegi adalah sebuah BangunDatar"
      ],
      correctIndex: 1,
      explanation: "'Mobil **memiliki** sebuah Mesin' adalah *Has-A Relationship* (*Composition*), sedangkan ketiganya yang lain adalah *Is-A Relationship* (*Inheritance*)."
    },
    {
      question: "Jika objek `komputer` memiliki atribut `self.cpu` yang berisi objek `Prosesor`, bagaimana cara mengakses atribut `kecepatan` milik objek `Prosesor` tersebut?",
      options: [
        "komputer->cpu->kecepatan",
        "komputer.cpu.kecepatan",
        "komputer(cpu.kecepatan)",
        "Prosesor.komputer.kecepatan"
      ],
      correctIndex: 1,
      explanation: "Kita menggunakan rantai tanda titik (`komputer.cpu.kecepatan`) untuk mengakses atribut milik objek yang berada di dalam objek lain."
    },
    {
      question: "Dari modul bawaan manakah dekorator `@dataclass` diimpor pada Python?",
      options: [
        "from oop import dataclass",
        "from dataclasses import dataclass",
        "from struct import dataclass",
        "from types import dataclass"
      ],
      correctIndex: 1,
      explanation: "Dekorator `@dataclass` berada di dalam modul standar `dataclasses` (`from dataclasses import dataclass`)."
    },
    {
      question: "Method khusus apa sajakah yang dibuatkan secara OTOMATIS oleh Python ketika kita menambahkan dekorator `@dataclass` pada sebuah class?",
      options: [
        "__init__(), __repr__(), dan __eq__()",
        "Hanya __len__()",
        "Hanya @staticmethod",
        "Tidak ada method yang dibuat otomatis"
      ],
      correctIndex: 0,
      explanation: "`@dataclass` secara otomatis mengenerate constructor `__init__()`, representasi cetak `__repr__()`, dan pembanding kesamaan `__eq__()`."
    },
    {
      question: "Bagaimana cara mendeklarasikan atribut `nama` bertipe string dan `stok` bertipe integer di dalam sebuah `@dataclass`?",
      options: [
        "self.nama = str; self.stok = int",
        "nama: str dan stok: int",
        "var nama, var stok",
        "def nama(str):"
      ],
      correctIndex: 1,
      explanation: "Pada `@dataclass`, atribut ditulis menggunakan anotasi tipe data (*type hints*), yaitu `nama: str` dan `stok: int`."
    },
    {
      question: "Jika kita membuat dua objek `@dataclass` dengan nilai atribut yang sama persis (`b1 = Barang('Buku', 5000)` dan `b2 = Barang('Buku', 5000)`), apakah hasil dari `b1 == b2`?",
      options: [
        "True, karena @dataclass otomatis menyediakan __eq__() yang membandingkan seluruh isi atributnya",
        "False, karena alamat memorinya berbeda",
        "TypeError",
        "None"
      ],
      correctIndex: 0,
      explanation: "Salah satu keunggulan `@dataclass` adalah otomatis mengimplementasikan `__eq__()` berdasarkan kesamaan nilai atribut-atributnya."
    },
    {
      question: "Di dalam `@dataclass`, di manakah atribut yang memiliki nilai default (misal `aktif: bool = True`) harus diletakkan?",
      options: [
        "Wajib di baris paling pertama sebelum atribut tanpa default",
        "Wajib diletakkan SETELAH semua atribut yang tidak memiliki nilai default",
        "Di luar class",
        "Di dalam fungsi print()"
      ],
      correctIndex: 1,
      explanation: "Sama seperti aturan parameter pada `__init__()`, atribut dengan nilai default harus diletakkan setelah atribut wajib."
    },
    {
      question: "Apakah sebuah class yang menggunakan `@dataclass` masih boleh memiliki *method* buatan kita sendiri (seperti `def hitung_total(self):`)?",
      options: [
        "Tidak boleh sama sekali",
        "Boleh, kita bebas menambahkan method biasa, @property, maupun @staticmethod di dalam @dataclass",
        "Hanya boleh jika tidak memiliki atribut",
        "Hanya boleh menggunakan fungsi lambda"
      ],
      correctIndex: 1,
      explanation: "`@dataclass` adalah class Python normal yang hanya dibantu pembuatan `__init__`-nya, sehingga kita bebas menambahkan method apa pun di dalamnya."
    },
    {
      question: "Pada contoh class `Keranjang` yang memiliki `self.daftar_item = []`, tipe data apakah yang disimpan di dalam list `self.daftar_item` saat kita memanggil `keranjang.tambah_item(Item('Buku', 50000))`?",
      options: [
        "Hanya string 'Buku'",
        "Hanya angka 50000",
        "Objek utuh dari class Item (yang memiliki atribut .nama dan .harga)",
        "Nilai boolean True"
      ],
      correctIndex: 2,
      explanation: "List tersebut menyimpan objek `Item` secara utuh, sehingga di dalam perulangan kita bisa mengakses `item.nama` maupun `item.harga`."
    }
  ]
};

