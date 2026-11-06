import { DocSection } from "../types";

export const bab9Fungsi: DocSection = {
  id: "bab9-fungsi",
  number: 9,
  filePath: "app/data/chapters/bab9-fungsi.ts",
  title: "Fungsi Lengkap (def, return, Default Param, *args & lambda)",
  subtitle:
    "Membuat kode modular yang dapat digunakan berulang kali dengan `def`, parameter, `return` banyak nilai, `*args`, hingga fungsi anonim `lambda`.",
  level: "Menengah Dasar",
  readTime: "15 menit",
  summary:
    "Fungsi (*Function*) adalah blok kode terorganisir yang diberi nama dan dirancang untuk menjalankan satu tugas spesifik. Dengan membagi program ke dalam fungsi, kode menjadi rapi, mudah diuji, dan tidak perlu ditulis berulang-ulang. Di Python, fungsi dibuat menggunakan kata kunci `def` diikuti nama fungsi dan tanda kurung `():`. Hasil perhitungan dikirim keluar dari fungsi menggunakan kata kunci `return`. Apabila sebuah fungsi tidak memiliki perintah `return`, maka fungsi tersebut secara otomatis mengembalikan nilai `None`.",
  keyPoints: [
    "`def nama_fungsi(parameter):` Mendefinisikan fungsi baru beserta variabel input-nya.",
    "`return nilai`: Mengirimkan hasil perhitungan keluar dari fungsi. Tanpa `return`, fungsi secara otomatis mengembalikan `None`.",
    "Return Banyak Nilai: Fungsi di Python bisa mengembalikan lebih dari satu nilai sekaligus dengan memisahkannya memakai koma (contoh: `return luas, keliling`) yang otomatis dikemas sebagai `Tuple`.",
    "Default Parameter: Parameter yang diberi nilai bawaan (contoh: `def hitung_tagihan(subtotal, ongkir=10000):`) sehingga argumen `ongkir` bersifat opsional saat fungsi dipanggil.",
    "`*args`: Parameter dengan satu tanda bintang (contoh: `def total_skor(*poin):`) mengumpulkan berapa pun argumen angka yang dikirim menjadi sebuah **Tuple**.",
    "`lambda`: Fungsi kecil satu baris tanpa nama dengan sintaks `lambda parameter: ekspresi` (contoh: `lipat_tiga = lambda x: x * 3`)."
  ],
  conceptTable: {
    title: "Ringkasan Sintaks Fungsi & Jenis Parameter di Python",
    headers: ["Konsep / Fitur", "Contoh Penulisan", "Nilai Kembalian / Tipe", "Kegunaan Utama"],
    rows: [
      ["Fungsi Dasar", "def kuadrat(x):\n    return x * x", "Hasil ekspresi `return`", "Membungkus rumus agar bisa dipanggil berulang kali."],
      ["Tanpa return", "def cetak_halo():\n    print('Halo')", "None", "Jika tidak ada `return`, nilai kembaliannya adalah `None`."],
      ["Return >1 Nilai", "return luas, keliling", "Tuple `(luas, keliling)`", "Mengembalikan dua atau lebih hasil sekaligus."],
      ["Default Parameter", "def sapa(nama, pesan='Selamat Pagi'):", "Sesuai `return`", "Memberi nilai cadangan jika argumen kedua tidak diisi."],
      ["*args", "def total_skor(*poin):", "`poin` bertipe `Tuple`", "Menerima jumlah argumen posisi tak terbatas."],
      ["Fungsi lambda", "kali = lambda a, b: a * b", "Hasil `a * b`", "Membuat fungsi singkat satu baris."]
    ]
  },
  examples: [
    {
      id: "bab9-ex1",
      title: "1. Fungsi def dengan return Tunggal, return 2 Nilai, & Tanpa return",
      description:
        "Membandingkan fungsi yang mengembalikan satu nilai, mengembalikan dua nilai sekaligus (`return luas, keliling`), serta fungsi tanpa `return` yang menghasilkan `None`.",
      code: `# 1. Fungsi konversi suhu dengan 1 nilai return
def celcius_ke_fahrenheit(c):
    return (c * 9 / 5) + 32

print("0°C   =", celcius_ke_fahrenheit(0), "°F")
print("100°C =", celcius_ke_fahrenheit(100), "°F")

# 2. Fungsi yang mengembalikan DUA nilai sekaligus (Tuple)
def hitung_persegi(sisi):
    luas = sisi * sisi
    keliling = 4 * sisi
    return luas, keliling

l, k = hitung_persegi(6)
print(f"\\nPersegi sisi 6 -> Luas: {l}, Keliling: {k}")

# 3. Fungsi tanpa return otomatis mengembalikan None
def tampilkan_info():
    pesan = "Hanya proses internal"

print("Hasil fungsi tanpa return:", tampilkan_info())`,
      output: `0°C   = 32.0 °F
100°C = 212.0 °F

Persegi sisi 6 -> Luas: 36, Keliling: 24
Hasil fungsi tanpa return: None`,
      lineExplanations: [
        {
          line: "return (c * 9 / 5) + 32",
          explanation: "Mengirimkan hasil perhitungan kembali ke pemanggil fungsi."
        },
        {
          line: "return luas, keliling",
          explanation: "Mengembalikan dua nilai sekaligus yang langsung ditangkap oleh variabel `l` dan `k`."
        },
        {
          line: "print(\"Hasil fungsi tanpa return:\", tampilkan_info())",
          explanation: "Karena `tampilkan_info()` tidak memiliki perintah `return`, Python secara otomatis mengembalikan `None`."
        }
      ]
    },
    {
      id: "bab9-ex2",
      title: "2. Default Parameter & Argumen Tak Terbatas (*args)",
      description:
        "Menggunakan nilai bawaan (*Default Parameter*) agar argumen menjadi opsional, serta menggunakan `*args` (yang diterima sebagai `Tuple`) untuk menjumlahkan banyak angka.",
      code: `# 1. Fungsi dengan Default Parameter (ongkir=10000)
def hitung_tagihan(subtotal, ongkir=10000):
    return subtotal + ongkir

print("Tagihan (ongkir default):", hitung_tagihan(50000))
print("Tagihan (ongkir khusus) :", hitung_tagihan(50000, 25000))

# 2. Parameter *args mengumpulkan semua argumen ke dalam Tuple
def total_skor(*poin):
    print("Isi *poin (Tuple):", poin)
    return sum(poin)

print("\\nSkor 3 ronde:", total_skor(10, 20, 30))
print("Skor 5 ronde:", total_skor(5, 15, 25, 35, 20))`,
      output: `Tagihan (ongkir default): 60000
Tagihan (ongkir khusus) : 75000

Isi *poin (Tuple): (10, 20, 30)
Skor 3 ronde: 60
Isi *poin (Tuple): (5, 15, 25, 35, 20)
Skor 5 ronde: 100`,
      lineExplanations: [
        {
          line: "def hitung_tagihan(subtotal, ongkir=10000):",
          explanation: "Jika pemanggil hanya mengirim 1 argumen `hitung_tagihan(50000)`, maka `ongkir` otomatis bernilai `10000`."
        },
        {
          line: "def total_skor(*poin):",
          explanation: "Tanda bintang `*poin` mengumpulkan seluruh argumen posisi yang dikirim menjadi sebuah `Tuple`, sehingga bisa langsung dijumlahkan dengan `sum(poin)`."
        }
      ]
    },
    {
      id: "bab9-ex3",
      title: "3. Fungsi Anonim Satu Baris (lambda)",
      description:
        "Membuat fungsi singkat satu baris dengan kata kunci `lambda` untuk1 atau 2 parameter.",
      code: `# 1. Fungsi lambda dengan 1 parameter
lipat_tiga = lambda x: x * 3
print("7 x 3  =", lipat_tiga(7))
print("12 x 3 =", lipat_tiga(12))

# 2. Fungsi lambda dengan 2 parameter
kali_dua_angka = lambda a, b: a * b
print("4 x 6  =", kali_dua_angka(4, 6))`,
      output: `7 x 3  = 21
12 x 3 = 36
4 x 6  = 24`,
      lineExplanations: [
        {
          line: "lipat_tiga = lambda x: x * 3",
          explanation: "Menerima parameter `x` dan langsung mengembalikan hasil `x * 3` tanpa perlu menulis blok `def` dan `return`."
        },
        {
          line: "kali_dua_angka = lambda a, b: a * b",
          explanation: "Fungsi `lambda` juga bisa menerima dua parameter (`a, b`) dan mengembalikan hasil perkaliannya (`a * b`)."
        }
      ]
    }
  ],
  tips: [
    "Gunakan `return` di dalam fungsi alih-alih `print()` apabila hasil perhitungannya ingin disimpan ke variabel atau diolah lagi.",
    "Letakkan parameter yang memiliki nilai default di sebelah kanan setelah parameter wajib (contoh: `def fungsi(wajib, opsional=10):`)."
  ],
  commonMistakes: [
    {
      wrong: "def tambah(a, b):\n    hasil = a + b  # Lupa menulis return hasil",
      correct: "def tambah(a, b):\n    hasil = a + b\n    return hasil",
      reason: "Tanpa perintah `return`, pemanggilan `tambah(3, 4)` hanya akan menghasilkan `None`."
    }
  ],
  caseStudies: [
    {
      id: "bab9-case1",
      title: "Fungsi Kalkulator Gaji Bersih Karyawan dengan Default Tunjangan",
      difficulty: "Mudah",
      scenario:
        "Divisi HRD sebuah perusahaan membutuhkan fungsi Python `hitung_gaji_bersih(gaji_pokok, tunjangan=750000)` untuk menghitung total gaji bulanan karyawan. Jika karyawan reguler tidak memiliki tunjangan khusus, sistem otomatis memberikan tunjangan bawaan Rp750.000.",
      instructions:
        "Lengkapi fungsi `hitung_gaji_bersih(gaji_pokok, tunjangan=750000)` agar mengembalikan (`return`) hasil penjumlahan `gaji_pokok + tunjangan`!",
      tasks: [
        "Gunakan `return gaji_pokok + tunjangan` di dalam fungsi `hitung_gaji_bersih`."
      ],
      starterCode: `def hitung_gaji_bersih(gaji_pokok, tunjangan=750000):
    # Kembalikan hasil penjumlahan gaji_pokok dan tunjangan:
    

gaji_staf = hitung_gaji_bersih(5000000)
gaji_manajer = hitung_gaji_bersih(8000000, 2000000)

print(f"Gaji Staf    : Rp{gaji_staf:,}")
print(f"Gaji Manajer : Rp{gaji_manajer:,}")`,
      expectedOutput: `Gaji Staf    : Rp5,750,000
Gaji Manajer : Rp10,000,000`,
      hint: "Tulis: `return gaji_pokok + tunjangan` di dalam fungsi.",
      solutionCode: `def hitung_gaji_bersih(gaji_pokok, tunjangan=750000):
    return gaji_pokok + tunjangan

gaji_staf = hitung_gaji_bersih(5000000)
gaji_manajer = hitung_gaji_bersih(8000000, 2000000)

print(f"Gaji Staf    : Rp{gaji_staf:,}")
print(f"Gaji Manajer : Rp{gaji_manajer:,}")`
    },
    {
      id: "bab9-case2",
      title: "Fungsi Rekap Omzet Harian Cabang Toko dengan *args & Return 2 Nilai",
      difficulty: "Sedang",
      scenario:
        "Seorang pemilik kedai kopi ingin merekap total pemasukan harian dan nilai transaksi tertinggi dari berapa pun jumlah pesanan yang masuk menggunakan satu fungsi fleksibel `rekap_kasir(*nominal_pesanan)`.",
      instructions:
        "Buat fungsi `rekap_kasir(*nominal_pesanan)` yang mengembalikan 2 nilai sekaligus: `sum(nominal_pesanan)` (total omzet) dan `max(nominal_pesanan)` (pesanan tertinggi)!",
      tasks: [
        "Hitung `total = sum(nominal_pesanan)` dan `tertinggi = max(nominal_pesanan)`.",
        "Kembalikan keduanya dengan `return total, tertinggi`."
      ],
      starterCode: `def rekap_kasir(*nominal_pesanan):
    # Hitung total (sum) dan tertinggi (max), lalu return keduanya:
    

omzet, maks_pesanan = rekap_kasir(45000, 120000, 85000, 60000)
print(f"Total Omzet       : Rp{omzet:,}")
print(f"Pesanan Tertinggi : Rp{maks_pesanan:,}")`,
      expectedOutput: `Total Omzet       : Rp310,000
Pesanan Tertinggi : Rp120,000`,
      hint: "Di dalam fungsi, tulis: `return sum(nominal_pesanan), max(nominal_pesanan)`",
      solutionCode: `def rekap_kasir(*nominal_pesanan):
    return sum(nominal_pesanan), max(nominal_pesanan)

omzet, maks_pesanan = rekap_kasir(45000, 120000, 85000, 60000)
print(f"Total Omzet       : Rp{omzet:,}")
print(f"Pesanan Tertinggi : Rp{maks_pesanan:,}")`
    }
  ],
  codingChallenges: [
    {
      id: "bab9-challenge1",
      title: "Membuat Fungsi Konversi Suhu Celcius ke Fahrenheit",
      difficulty: "Mudah",
      instructions:
        "Buatlah fungsi bernama `celcius_ke_fahrenheit(c)` yang mengembalikan (`return`) hasil konversi suhu menggunakan rumus: `(c * 9 / 5) + 32`.",
      tasks: [
        "Definisikan fungsi `celcius_ke_fahrenheit(c)`.",
        "Kembalikan nilai hasil perhitungan `(c * 9 / 5) + 32` menggunakan `return`."
      ],
      starterCode: `# Lengkapi fungsi di bawah ini:
def celcius_ke_fahrenheit(c):
    # Tulis rumus dan return hasilnya:
    

print("0°C   =", celcius_ke_fahrenheit(0), "°F")
print("100°C =", celcius_ke_fahrenheit(100), "°F")`,
      expectedOutput: `0°C   = 32.0 °F
100°C = 212.0 °F`,
      hint: "Di dalam fungsi, tulis: `return (c * 9 / 5) + 32`",
      solutionCode: `def celcius_ke_fahrenheit(c):
    return (c * 9 / 5) + 32

print("0°C   =", celcius_ke_fahrenheit(0), "°F")
print("100°C =", celcius_ke_fahrenheit(100), "°F")`
    },
    {
      id: "bab9-challenge2",
      title: "Fungsi Hitung Total Belanja dengan Default Parameter Ongkir",
      difficulty: "Mudah",
      instructions:
        "Buat fungsi `hitung_tagihan(subtotal, ongkir=10000)` yang mengembalikan jumlah `subtotal + ongkir`. Jika argumen `ongkir` tidak diisi saat dipanggil, otomatis bernilai `10000`!",
      tasks: [
        "Pastikan parameter fungsi adalah `(subtotal, ongkir=10000)`.",
        "Gunakan `return subtotal + ongkir`."
      ],
      starterCode: `# Buat fungsi hitung_tagihan dengan default parameter ongkir=10000:
def hitung_tagihan(subtotal, ongkir=10000):
    

print("Tagihan 1 (ongkir default):", hitung_tagihan(50000))
print("Tagihan 2 (ongkir khusus) :", hitung_tagihan(50000, 25000))`,
      expectedOutput: `Tagihan 1 (ongkir default): 60000
Tagihan 2 (ongkir khusus) : 75000`,
      hint: "Cukup tulis `return subtotal + ongkir` di dalam fungsi `hitung_tagihan`.",
      solutionCode: `def hitung_tagihan(subtotal, ongkir=10000):
    return subtotal + ongkir

print("Tagihan 1 (ongkir default):", hitung_tagihan(50000))
print("Tagihan 2 (ongkir khusus) :", hitung_tagihan(50000, 25000))`
    },
    {
      id: "bab9-challenge3",
      title: "Fungsi Mengembalikan Dua Nilai Sekaligus (Luas & Keliling)",
      difficulty: "Sedang",
      instructions:
        "Buatlah fungsi `hitung_persegi(sisi)` yang mengembalikan 2 nilai sekaligus: `luas` (`sisi * sisi`) dan `keliling` (`4 * sisi`)!",
      tasks: [
        "Hitung `luas = sisi * sisi` dan `keliling = 4 * sisi`.",
        "Kembalikan keduanya dengan `return luas, keliling`."
      ],
      starterCode: `def hitung_persegi(sisi):
    luas = sisi * sisi
    keliling = 4 * sisi
    # Kembalikan luas dan keliling sekaligus:
    

l, k = hitung_persegi(6)
print(f"Luas: {l}, Keliling: {k}")`,
      expectedOutput: `Luas: 36, Keliling: 24`,
      hint: "Tulis: `return luas, keliling`",
      solutionCode: `def hitung_persegi(sisi):
    luas = sisi * sisi
    keliling = 4 * sisi
    return luas, keliling

l, k = hitung_persegi(6)
print(f"Luas: {l}, Keliling: {k}")`
    },
    {
      id: "bab9-challenge4",
      title: "Fungsi Penjumlahan Fleksibel dengan *args",
      difficulty: "Sedang",
      instructions:
        "Buatlah fungsi `total_skor(*poin)` yang menerima jumlah argumen angka tak terbatas dan mengembalikan jumlah totalnya menggunakan `sum(poin)`!",
      tasks: [
        "Gunakan parameter `*poin` pada fungsi `total_skor`.",
        "Kembalikan hasil `sum(poin)` dengan `return`."
      ],
      starterCode: `def total_skor(*poin):
    # Kembalikan jumlah seluruh isi poin dengan sum():
    

print("Skor 3 ronde:", total_skor(10, 20, 30))
print("Skor 5 ronde:", total_skor(5, 15, 25, 35, 20))`,
      expectedOutput: `Skor 3 ronde: 60
Skor 5 ronde: 100`,
      hint: "Di dalam fungsi `total_skor`, tulis: `return sum(poin)`",
      solutionCode: `def total_skor(*poin):
    return sum(poin)

print("Skor 3 ronde:", total_skor(10, 20, 30))
print("Skor 5 ronde:", total_skor(5, 15, 25, 35, 20))`
    },
    {
      id: "bab9-challenge5",
      title: "Membuat Fungsi Anonim Satu Baris dengan lambda",
      difficulty: "Menantang",
      instructions:
        "Buatlah fungsi `lambda` bernama `lipat_tiga` yang menerima satu parameter `x` dan mengembalikan hasil `x * 3`!",
      tasks: [
        "Gunakan sintaks `lambda x: x * 3`.",
        "Pastikan pemanggilan `lipat_tiga(7)` menghasilkan `21` dan `lipat_tiga(12)` menghasilkan `36`."
      ],
      starterCode: `# Buat fungsi lambda x: x * 3 di bawah ini:
lipat_tiga = 

print("7 x 3  =", lipat_tiga(7))
print("12 x 3 =", lipat_tiga(12))`,
      expectedOutput: `7 x 3  = 21
12 x 3 = 36`,
      hint: "Tulis: `lipat_tiga = lambda x: x * 3`",
      solutionCode: `lipat_tiga = lambda x: x * 3

print("7 x 3  =", lipat_tiga(7))
print("12 x 3 =", lipat_tiga(12))`
    }
  ],
  quizzes: [
    {
      question: "Apakah nilai yang dikembalikan oleh sebuah fungsi di Python jika fungsi tersebut TIDAK memiliki perintah `return`?",
      options: ["0", "False", "None", "'' (String kosong)"],
      correctIndex: 2,
      explanation: "Setiap fungsi di Python yang berakhir tanpa mengeksekusi perintah `return` secara otomatis mengembalikan nilai `None`."
    },
    {
      question: "Kata kunci apakah yang digunakan untuk mendefinisikan fungsi baru di Python?",
      options: ["function", "def", "fun", "proc"],
      correctIndex: 1,
      explanation: "Python menggunakan kata kunci `def` (singkatan dari *define*) untuk membuat fungsi."
    },
    {
      question: "Jika sebuah fungsi ditulis `def sapa(nama, pesan='Selamat Pagi'):`, apa yang terjadi jika kita memanggil `sapa('Budi')`?",
      options: [
        "Terjadi TypeError karena kurang 1 argumen",
        "Parameter pesan otomatis bernilai 'Selamat Pagi'",
        "Parameter nama bernilai 'Selamat Pagi'",
        "Fungsi mengembalikan None"
      ],
      correctIndex: 1,
      explanation: "Karena parameter `pesan` memiliki nilai default `'Selamat Pagi'`, nilai tersebut otomatis dipakai saat argumen kedua tidak diberikan."
    },
    {
      question: "Tipe data apakah yang diterima oleh parameter `*args` di dalam sebuah fungsi?",
      options: ["List", "Tuple", "Dictionary", "Set"],
      correctIndex: 1,
      explanation: "Parameter `*args` mengumpulkan seluruh argumen posisi tambahan ke dalam sebuah **Tuple**."
    },
    {
      question: "Apa hasil dari pemanggilan fungsi anonim `f = lambda a, b: a * b; print(f(4, 6))`?",
      options: ["10", "24", "46", "lambda"],
      correctIndex: 1,
      explanation: "Fungsi `lambda` tersebut mengalikan `a` dan `b` (`4 * 6`), sehingga menghasilkan `24`."
    }
  ]
};
