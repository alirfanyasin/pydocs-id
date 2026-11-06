import { DocSection } from "../types";

export const bab7MagicMethods: DocSection = {
  id: "oop-bab7-magic-methods",
  number: 7,
  filePath: "app/data/oop-chapters/bab7-magic-methods.ts",
  title: "Magic / Dunder Methods (__str__, __len__, __eq__, __add__)",
  subtitle:
    "Mengatur bagaimana objek ditampilkan dengan `print()` menggunakan `__str__()`, dihitung panjangnya dengan `len()` (`__len__()`), serta mendukung operator `==` (`__eq__()`) dan `+` (`__add__()`).",
  level: "Menengah",
  readTime: "15 menit",
  summary:
    "**Magic Methods** atau **Dunder Methods** (*Double Underscore Methods*) adalah method khusus bawaan Python yang diawali dan diakhiri oleh dua garis bawah (`__nama__`). Jika kita mencetak sebuah objek biasa menggunakan `print(obj)` tanpa mendefinisikan `__str__()`, Python hanya akan menampilkan alamat memori yang sulit dibaca seperti `<__main__.Buku object at 0x...>`. Dengan mendefinisikan *Magic Methods*, kita bisa membuat objek buatan kita berperilaku alami layaknya tipe data bawaan Python: bisa dicetak rapi dengan `print()`, diukur dengan `len()`, dibandingkan dengan `==`, hingga dijumlahkan dengan operator `+`!",
  keyPoints: [
    "`def __str__(self):` Mengembalikan representasi string yang ramah pembaca ketika objek dicetak dengan `print(obj)` atau diubah dengan `str(obj)`.",
    "`def __repr__(self):` Mengembalikan representasi teknis objek untuk keperluan *debugging* developer (dipanggil oleh `repr(obj)`).",
    "`def __len__(self):` Mengembalikan angka integer ketika objek dimasukkan ke dalam fungsi `len(obj)`.",
    "`def __eq__(self, other):` Menentukan logika perbandingan kesamaan ketika dua objek dibandingkan menggunakan operator `obj1 == obj2`.",
    "`def __add__(self, other):` Menentukan perilaku penjumlahan ketika dua objek dijumlahkan menggunakan operator `obj1 + obj2`."
  ],
  conceptTable: {
    title: "Daftar Magic / Dunder Methods Populer di Python",
    headers: ["Magic Method", "Dipicu Saat Menjalankan", "Tipe Nilai Return Wajib", "Kegunaan Utama"],
    rows: [
      ["__init__(self, ...)", "obj = NamaClass(...)", "None", "Menginisialisasi atribut awal objek baru."],
      ["__str__(self)", "print(obj) atau str(obj)", "str (Teks)", "Menampilkan teks deskriptif yang rapi bagi pengguna."],
      ["__repr__(self)", "repr(obj)", "str (Teks)", "Representasi resmi/teknis objek bagi developer."],
      ["__len__(self)", "len(obj)", "int (Bilangan bulat >= 0)", "Menghitung ukuran atau jumlah item di dalam objek."],
      ["__eq__(self, other)", "obj1 == obj2", "bool (True / False)", "Membandingkan apakah dua objek bernilai setara."],
      ["__add__(self, other)", "obj1 + obj2", "Bebas (Angka / Objek baru)", "Menjumlahkan atau menggabungkan dua objek."]
    ]
  },
  examples: [
    {
      id: "oop-bab7-ex1",
      title: "1. Menampilkan Objek Secara Rapi dengan __str__() dan __repr__()",
      description:
        "Tanpa `__str__()`, `print(buku)` hanya mencetak kode memori. Dengan `__str__()`, `print(buku)` langsung menampilkan informasi yang kita format.",
      code: `class Buku:
    def __init__(self, judul, penulis, halaman):
        self.judul = judul
        self.penulis = penulis
        self.halaman = halaman

    def __str__(self):
        return f"'{self.judul}' karya {self.penulis} ({self.halaman} hlm)"

    def __repr__(self):
        return f"Buku(judul='{self.judul}', halaman={self.halaman})"

b1 = Buku("Algoritma Python", "Rizky Pratama", 240)

# Otomatis memanggil __str__()
print("Hasil print(b1) :", b1)
# Otomatis memanggil __repr__()
print("Hasil repr(b1)  :", repr(b1))`,
      output: `Hasil print(b1) : 'Algoritma Python' karya Rizky Pratama (240 hlm)
Hasil repr(b1)  : Buku(judul='Algoritma Python', halaman=240)`,
      lineExplanations: [
        {
          line: "def __str__(self):",
          explanation: "Otomatis dieksekusi oleh Python setiap kali objek dimasukkan ke dalam `print(b1)` atau `str(b1)`."
        },
        {
          line: "def __repr__(self):",
          explanation: "Dipanggil oleh fungsi `repr(b1)` untuk menampilkan format konstruksi objek yang jelas bagi programmer."
        }
      ]
    },
    {
      id: "oop-bab7-ex2",
      title: "2. Mendukung Fungsi len() dengan __len__()",
      description:
        "Membuat objek koleksi seperti `PlaylistMusik` dapat dihitung jumlah lagunya menggunakan fungsi bawaan `len()`.",
      code: `class PlaylistMusik:
    def __init__(self, nama_playlist, daftar_lagu):
        self.nama_playlist = nama_playlist
        self.daftar_lagu = daftar_lagu

    def __len__(self):
        return len(self.daftar_lagu)

    def __str__(self):
        return f"Playlist '{self.nama_playlist}' ({len(self)} lagu)"

favorit = PlaylistMusik("Fokus Ngoding", ["Lo-Fi Beats", "Piano Chill", "Synthwave"])
print(favorit)
print("Jumlah lagu dengan len():", len(favorit))`,
      output: `Playlist 'Fokus Ngoding' (3 lagu)
Jumlah lagu dengan len(): 3`,
      lineExplanations: [
        {
          line: "def __len__(self):\n        return len(self.daftar_lagu)",
          explanation: "Saat `len(favorit)` dipanggil, Python menjalankan `__len__()` dan mengembalikan jumlah elemen di dalam `self.daftar_lagu`."
        }
      ]
    },
    {
      id: "oop-bab7-ex3",
      title: "3. Operator Overloading: Membandingkan (==) dengan __eq__ & Menjumlahkan (+) dengan __add__",
      description:
        "Mengajarkan objek cara membandingkan kesamaan dengan `==` (`__eq__`) dan cara menjumlahkan dua objek menggunakan `+` (`__add__`).",
      code: `class VoucherBelanja:
    def __init__(self, kode, nominal):
        self.kode = kode
        self.nominal = nominal

    # Dipanggil saat v1 == v2
    def __eq__(self, other):
        return self.kode == other.kode and self.nominal == other.nominal

    # Dipanggil saat v1 + v2
    def __add__(self, other):
        return self.nominal + other.nominal

v1 = VoucherBelanja("HEMAT50", 50000)
v2 = VoucherBelanja("HEMAT50", 50000)
v3 = VoucherBelanja("ONGKIR20", 20000)

print("Apakah v1 == v2?         :", v1 == v2)
print("Apakah v1 == v3?         :", v1 == v3)
print(f"Gabungan v1 + v3 (Rp)    : Rp{v1 + v3:,}")`,
      output: `Apakah v1 == v2?         : True
Apakah v1 == v3?         : False
Gabungan v1 + v3 (Rp)    : Rp70,000`,
      lineExplanations: [
        {
          line: "def __eq__(self, other):",
          explanation: "`self` adalah objek di sebelah kiri `==` (`v1`), sedangkan `other` adalah objek di sebelah kanan `==` (`v2`)."
        },
        {
          line: "def __add__(self, other):",
          explanation: "Saat `v1 + v3` dijalankan, Python memanggil `v1.__add__(v3)` dan mengembalikan penjumlahan kedua nominalnya."
        }
      ]
    }
  ],
  tips: [
    "Method `__str__(self)` **wajib** mengembalikan nilai bertipe `str` (menggunakan `return`, bukan `print()`).",
    "Method `__len__(self)` **wajib** mengembalikan nilai bertipe `int` (bilangan bulat `>= 0`)."
  ],
  commonMistakes: [
    {
      wrong: "class Produk:\n    def __str__(self):\n        print(self.nama)  # Salah: menggunakan print, bukan return!",
      correct: "class Produk:\n    def __str__(self):\n        return self.nama  # Benar: wajib me-return string",
      reason: "Jika `__str__()` menggunakan `print()` tanpa `return` string, maka `__str__()` akan mengembalikan `None` dan memicu `TypeError: __str__ returned non-string (type NoneType)`."
    }
  ],
  caseStudies: [
    {
      id: "oop-bab7-case1",
      title: "Format Cetak Tiket Bioskop & Pengecekan Kursi Kembar (__str__ & __eq__)",
      difficulty: "Mudah",
      scenario:
        "Sistem tiket bioskop memiliki class `TiketBioskop(film, kursi)`. Agar tiket mudah dicetak ke layar kasir, digunakan `__str__(self)`. Selain itu, untuk mencegah *double booking* (dua tiket di film dan nomor kursi yang sama), digunakan `__eq__(self, other)`.",
      instructions:
        "Lengkapi `__str__(self)` agar mengembalikan `f'Tiket {self.film} - Kursi {self.kursi}'` dan `__eq__(self, other)` agar mengembalikan `self.film == other.film and self.kursi == other.kursi`!",
      tasks: [
        "Implementasikan `__str__(self)`.",
        "Implementasikan `__eq__(self, other)`."
      ],
      starterCode: `class TiketBioskop:
    def __init__(self, film, kursi):
        self.film = film
        self.kursi = kursi

    def __str__(self):
        # Return f"Tiket {self.film} - Kursi {self.kursi}":
        

    def __eq__(self, other):
        # Return perbandingan apakah film dan kursi keduanya sama:
        

t1 = TiketBioskop("Petualangan Python", "A-12")
t2 = TiketBioskop("Petualangan Python", "A-12")

print(t1)
print("Apakah kursi bentrok (t1 == t2)?", t1 == t2)`,
      expectedOutput: `Tiket Petualangan Python - Kursi A-12
Apakah kursi bentrok (t1 == t2)? True`,
      hint: 'Tulis `return f"Tiket {self.film} - Kursi {self.kursi}"` di `__str__`, dan `return self.film == other.film and self.kursi == other.kursi` di `__eq__`.',
      solutionCode: `class TiketBioskop:
    def __init__(self, film, kursi):
        self.film = film
        self.kursi = kursi

    def __str__(self):
        return f"Tiket {self.film} - Kursi {self.kursi}"

    def __eq__(self, other):
        return self.film == other.film and self.kursi == other.kursi

t1 = TiketBioskop("Petualangan Python", "A-12")
t2 = TiketBioskop("Petualangan Python", "A-12")

print(t1)
print("Apakah kursi bentrok (t1 == t2)?", t1 == t2)`
    },
    {
      id: "oop-bab7-case2",
      title: "Penggabungan Berat Dua Koper Bagasi Penumpang Pesawat (__add__ & __str__)",
      difficulty: "Sedang",
      scenario:
        "Di konter *check-in* bandara, seorang penumpang membawa dua koper (`KoperBagasi`). Petugas ingin menjumlahkan berat kedua koper tersebut langsung menggunakan operator `+` (`koper1 + koper2`) yang menghasilkan objek `KoperBagasi` gabungan dengan total berat keduanya.",
      instructions:
        "Lengkapi method `__add__(self, other)` pada `KoperBagasi` agar mengembalikan `KoperBagasi(self.berat_kg + other.berat_kg)`!",
      tasks: [
        "Di dalam `__add__(self, other)`, kembalikan objek baru `KoperBagasi(self.berat_kg + other.berat_kg)`."
      ],
      starterCode: `class KoperBagasi:
    def __init__(self, berat_kg):
        self.berat_kg = berat_kg

    def __str__(self):
        return f"Total Bagasi: {self.berat_kg} kg"

    def __add__(self, other):
        # Return objek KoperBagasi baru dengan berat_kg gabungan:
        

koper1 = KoperBagasi(12)
koper2 = KoperBagasi(8)
gabungan = koper1 + koper2

print(gabungan)`,
      expectedOutput: `Total Bagasi: 20 kg`,
      hint: "Di dalam `__add__`, tulis: `return KoperBagasi(self.berat_kg + other.berat_kg)`",
      solutionCode: `class KoperBagasi:
    def __init__(self, berat_kg):
        self.berat_kg = berat_kg

    def __str__(self):
        return f"Total Bagasi: {self.berat_kg} kg"

    def __add__(self, other):
        return KoperBagasi(self.berat_kg + other.berat_kg)

koper1 = KoperBagasi(12)
koper2 = KoperBagasi(8)
gabungan = koper1 + koper2

print(gabungan)`
    }
  ],
  codingChallenges: [
    {
      id: "oop-bab7-challenge1",
      title: "Membuat Representasi Teks Objek dengan __str__()",
      difficulty: "Mudah",
      instructions:
        "Tambahkan method `__str__(self)` pada class `KontakTelepon` yang mengembalikan string `f'{self.nama}: {self.nomor}'`!",
      tasks: [
        "Definisikan `def __str__(self):`.",
        "Kembalikan `f'{self.nama}: {self.nomor}'`."
      ],
      starterCode: `class KontakTelepon:
    def __init__(self, nama, nomor):
        self.nama = nama
        self.nomor = nomor

    # Buat method __str__(self) di sini:
    

k = KontakTelepon("Ambulans", "119")
print(k)`,
      expectedOutput: `Ambulans: 119`,
      hint: 'Tulis `def __str__(self):` lalu `return f"{self.nama}: {self.nomor}"`.',
      solutionCode: `class KontakTelepon:
    def __init__(self, nama, nomor):
        self.nama = nama
        self.nomor = nomor

    def __str__(self):
        return f"{self.nama}: {self.nomor}"

k = KontakTelepon("Ambulans", "119")
print(k)`
    },
    {
      id: "oop-bab7-challenge2",
      title: "Menghitung Jumlah Isi Tim dengan __len__()",
      difficulty: "Mudah",
      instructions:
        "Buatlah method `__len__(self)` pada class `TimLomba` yang mengembalikan jumlah elemen di dalam list `self.anggota` menggunakan `len(self.anggota)`!",
      tasks: [
        "Definisikan `def __len__(self):`.",
        "Kembalikan `len(self.anggota)`."
      ],
      starterCode: `class TimLomba:
    def __init__(self, anggota):
        self.anggota = anggota

    # Buat method __len__(self) di bawah ini:
    

tim_a = TimLomba(["Andi", "Budi", "Citra", "Dewi"])
print("Jumlah Anggota Tim:", len(tim_a))`,
      expectedOutput: `Jumlah Anggota Tim: 4`,
      hint: "Tulis `def __len__(self):` lalu `return len(self.anggota)`.",
      solutionCode: `class TimLomba:
    def __init__(self, anggota):
        self.anggota = anggota

    def __len__(self):
        return len(self.anggota)

tim_a = TimLomba(["Andi", "Budi", "Citra", "Dewi"])
print("Jumlah Anggota Tim:", len(tim_a))`
    },
    {
      id: "oop-bab7-challenge3",
      title: "Membandingkan Kesamaan Dua Objek dengan __eq__()",
      difficulty: "Sedang",
      instructions:
        "Buatlah method `__eq__(self, other)` pada class `KoinGame` yang mengembalikan `True` apabila `self.nilai == other.nilai`!",
      tasks: [
        "Definisikan `def __eq__(self, other):`.",
        "Kembalikan `self.nilai == other.nilai`."
      ],
      starterCode: `class KoinGame:
    def __init__(self, nilai):
        self.nilai = nilai

    # Buat method __eq__(self, other) di sini:
    

k1 = KoinGame(100)
k2 = KoinGame(100)
k3 = KoinGame(50)

print("k1 == k2 :", k1 == k2)
print("k1 == k3 :", k1 == k3)`,
      expectedOutput: `k1 == k2 : True
k1 == k3 : False`,
      hint: "Tulis `def __eq__(self, other):` lalu `return self.nilai == other.nilai`.",
      solutionCode: `class KoinGame:
    def __init__(self, nilai):
        self.nilai = nilai

    def __eq__(self, other):
        return self.nilai == other.nilai

k1 = KoinGame(100)
k2 = KoinGame(100)
k3 = KoinGame(50)

print("k1 == k2 :", k1 == k2)
print("k1 == k3 :", k1 == k3)`
    },
    {
      id: "oop-bab7-challenge4",
      title: "Menjumlahkan Dua Objek dengan __add__()",
      difficulty: "Sedang",
      instructions:
        "Buatlah method `__add__(self, other)` pada class `KotakDonasi` yang mengembalikan hasil penjumlahan `self.dana + other.dana`!",
      tasks: [
        "Definisikan `def __add__(self, other):`.",
        "Kembalikan `self.dana + other.dana`."
      ],
      starterCode: `class KotakDonasi:
    def __init__(self, dana):
        self.dana = dana

    # Buat method __add__(self, other) di bawah ini:
    

kotak1 = KotakDonasi(150000)
kotak2 = KotakDonasi(350000)

total = kotak1 + kotak2
print(f"Total Donasi: Rp{total:,}")`,
      expectedOutput: `Total Donasi: Rp500,000`,
      hint: "Tulis `def __add__(self, other):` lalu `return self.dana + other.dana`.",
      solutionCode: `class KotakDonasi:
    def __init__(self, dana):
        self.dana = dana

    def __add__(self, other):
        return self.dana + other.dana

kotak1 = KotakDonasi(150000)
kotak2 = KotakDonasi(350000)

total = kotak1 + kotak2
print(f"Total Donasi: Rp{total:,}")`
    },
    {
      id: "oop-bab7-challenge5",
      title: "Membuat Representasi Debugging dengan __repr__()",
      difficulty: "Menantang",
      instructions:
        "Lengkapi method `__repr__(self)` pada class `TitikKoordinat` agar mengembalikan string `f'TitikKoordinat(x={self.x}, y={self.y})'`!",
      tasks: [
        "Definisikan `def __repr__(self):`.",
        "Kembalikan `f'TitikKoordinat(x={self.x}, y={self.y})'`."
      ],
      starterCode: `class TitikKoordinat:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    # Buat method __repr__(self) di bawah ini:
    

p = TitikKoordinat(10, 25)
print(repr(p))`,
      expectedOutput: `TitikKoordinat(x=10, y=25)`,
      hint: 'Tulis `def __repr__(self):` lalu `return f"TitikKoordinat(x={self.x}, y={self.y})"`.',
      solutionCode: `class TitikKoordinat:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"TitikKoordinat(x={self.x}, y={self.y})"

p = TitikKoordinat(10, 25)
print(repr(p))`
    }
  ],
  quizzes: [
    {
      question: "Mengapa *Magic Methods* di Python sering disebut juga sebagai **Dunder Methods**?",
      options: [
        "Karena hanya bisa digunakan di sistem operasi Windows",
        "Karena namanya diawali dan diakhiri oleh Double Underscore (dua garis bawah, contoh: __str__)",
        "Karena dibuat untuk menghapus variabel",
        "Karena tidak membutuhkan kata kunci def"
      ],
      correctIndex: 1,
      explanation: "Istilah *Dunder* adalah singkatan dari **D**ouble **Under**score (`__`)."
    },
    {
      question: "Magic method manakah yang otomatis dipanggil ketika kita mencetak objek menggunakan `print(obj)`?",
      options: ["__print__(self)", "__str__(self)", "__text__(self)", "__show__(self)"],
      correctIndex: 1,
      explanation: "Fungsi `print(obj)` dan `str(obj)` secara otomatis memanggil method `__str__(self)` pada objek tersebut."
    },
    {
      question: "Tipe data apakah yang WAJIB dikembalikan oleh method `__str__(self)`?",
      options: ["int", "bool", "str (String)", "None"],
      correctIndex: 2,
      explanation: "Method `__str__(self)` wajib mengembalikan nilai bertipe `str`. Jika mengembalikan tipe lain (seperti `int` atau `None`), Python akan memunculkan `TypeError`."
    },
    {
      question: "Apa yang ditampilkan oleh `print(obj)` apabila sebuah `class` TIDAK mendefinisikan `__str__()` maupun `__repr__()`?",
      options: [
        "Menampilkan seluruh isi atribut objek secara otomatis",
        "Menampilkan nama class beserta alamat memori objek (contoh: <__main__.Buku object at 0x...>)",
        "Memicu SyntaxError",
        "Mencetak angka 0"
      ],
      correctIndex: 1,
      explanation: "Perilaku bawaan Python saat mencetak objek tanpa `__str__()` adalah menampilkan nama class dan lokasi heksadesimalnya di memori."
    },
    {
      question: "Magic method manakah yang memungkinkan objek kita dimasukkan ke dalam fungsi `len(obj)`?",
      options: ["__size__(self)", "__count__(self)", "__len__(self)", "__length__(self)"],
      correctIndex: 2,
      explanation: "Fungsi bawaan `len(obj)` memanggil magic method `__len__(self)` milik objek tersebut."
    },
    {
      question: "Ketika kita membandingkan dua objek dengan ekspresi `obj1 == obj2`, magic method apakah yang dieksekusi di balik layar?",
      options: [
        "__same__(self, other)",
        "__eq__(self, other)",
        "__add__(self, other)",
        "__init__(self, other)"
      ],
      correctIndex: 1,
      explanation: "Operator perbandingan kesamaan `==` memicu pemanggilan `__eq__(self, other)` (*equal*)."
    },
    {
      question: "Magic method apakah yang dijalankan ketika dua objek dijumlahkan menggunakan operator `+` (`obj1 + obj2`)?",
      options: [
        "__plus__(self, other)",
        "__sum__(self, other)",
        "__add__(self, other)",
        "__join__(self, other)"
      ],
      correctIndex: 2,
      explanation: "Operator `+` pada objek memanggil method `__add__(self, other)`."
    },
    {
      question: "Pada definisi `def __add__(self, other):`, apakah yang diwakili oleh parameter `other` saat menjalankan `kotak_a + kotak_b`?",
      options: [
        "Mewakili objek di sebelah kiri tanda + (kotak_a)",
        "Mewakili objek di sebelah kanan tanda + (kotak_b)",
        "Selalu bernilai 0",
        "Mewakili nama class"
      ],
      correctIndex: 1,
      explanation: "Pada `kotak_a + kotak_b`, `self` adalah `kotak_a` (sebelah kiri) dan `other` adalah `kotak_b` (sebelah kanan)."
    },
    {
      question: "Fungsi bawaan apakah yang digunakan untuk memanggil magic method `__repr__(self)` secara eksplisit?",
      options: ["str(obj)", "repr(obj)", "len(obj)", "type(obj)"],
      correctIndex: 1,
      explanation: "Fungsi `repr(obj)` memanggil `__repr__(self)` untuk menghasilkan representasi teknis dari objek."
    },
    {
      question: "Tipe data apakah yang wajib dikembalikan oleh method `__len__(self)`?",
      options: ["float", "str", "int (bilangan bulat >= 0)", "list"],
      correctIndex: 2,
      explanation: "Fungsi `len()` di Python mensyaratkan `__len__(self)` untuk selalu mengembalikan bilangan bulat (`int`) yang tidak negatif."
    }
  ]
};

