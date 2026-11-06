import { DocSection } from "../types";

export const bab7Perulangan: DocSection = {
  id: "bab7-perulangan",
  number: 7,
  filePath: "app/data/chapters/bab7-perulangan.ts",
  title: "Perulangan (for, while, break, continue & enumerate)",
  subtitle:
    "Menjalankan blok kode berulang kali secara otomatis menggunakan `for` loop, `range()`, `enumerate()`, `while` loop, hingga *List Comprehension*.",
  level: "Dasar",
  readTime: "12 menit",
  summary:
    "Perulangan (*Looping*) adalah teknik untuk mengeksekusi serangkaian instruksi berulang kali tanpa harus menduplikasi baris kode. Python menyediakan dua perulangan utama: `for` loop (digunakan ketika kita sudah tahu jumlah putaran dengan `range()` atau ingin menelusuri isi koleksi data seperti `List`) dan `while` loop (digunakan ketika perulangan terus berjalan selama suatu kondisi masih bernilai `True`).",
  keyPoints: [
    "`for i in range(start, stop, step):` Mengulang urutan angka mulai dari `start`, berhenti tepat **sebelum** `stop`, dengan loncatan `step`. Jika hanya `range(n)`, angka dimulai dari `0` hingga `n - 1`.",
    "`enumerate(koleksi, start=1)`: Memberikan pasangan `(nomor_urut, item)` secara otomatis saat melakukan `for` loop pada sebuah `List`.",
    "`while kondisi:` Terus mengulang blok kode selama `kondisi` bernilai `True`. Jangan lupa memperbarui variabel kondisi (misalnya `n -= 1` atau `i += 1`) agar tidak terjadi *Infinite Loop*.",
    "`break`: Menghentikan paksa seluruh proses perulangan saat itu juga dan keluar dari loop.",
    "`continue`: Melompati sisa kode pada putaran saat ini dan langsung lanjut ke putaran berikutnya.",
    "List Comprehension: Cara ringkas membuat `List` baru dalam satu baris, contoh: `[x * 10 for x in data]`."
  ],
  conceptTable: {
    title: "Variasi Fungsi range() & Kontrol Loop di Python",
    headers: ["Sintaks", "Deretan / Efek yang Dihasilkan", "Penjelasan Lengkap"],
    rows: [
      ["range(4)", "0, 1, 2, 3", "Dimulai dari `0` dan berhenti sebelum `4` (menghasilkan 4 angka)."],
      ["range(1, 6)", "1, 2, 3, 4, 5", "Dimulai dari `1` dan berhenti tepat sebelum `6`."],
      ["range(2, 10, 3)", "2, 5, 8", "Dimulai dari `2`, loncat `+3` setiap putaran, berhenti sebelum `10` (3 kali putaran)."],
      ["enumerate(list, start=1)", "(1, item1), (2, item2), ...", "Mengambil nomor urut mulai dari `1` sekaligus nilai elemennya."],
      ["break", "Keluar dari loop", "Menghentikan seluruh perulangan `for` atau `while` seketika."],
      ["continue", "Lompat ke iterasi berikutnya", "Melewati sisa baris di putaran saat ini dan lanjut ke putaran berikutnya."]
    ]
  },
  examples: [
    {
      id: "bab7-ex1",
      title: "1. Perulangan for dengan range(), Menjumlahkan Data, dan enumerate()",
      description:
        "Cara mencetak tabel perkalian dengan `range(1, 6)`, menjumlahkan bilangan genap di dalam `List`, serta memberi nomor urut otomatis menggunakan `enumerate()`.",
      code: `# 1. Mencetak tabel perkalian 3 dengan range(1, 6)
print("--- Tabel Perkalian 3 ---")
for i in range(1, 6):
    print(f"3 x {i} = {3 * i}")

# 2. Menelusuri List & menjumlahkan hanya angka genap
angka = [12, 7, 18, 5, 20, 9]
total_genap = 0
for x in angka:
    if x % 2 == 0:
        total_genap += x
print(f"\\nTotal angka genap: {total_genap}")

# 3. Menampilkan nomor urut otomatis dengan enumerate(..., start=1)
peserta = ["Andi", "Siti", "Budi"]
print("\\n--- Daftar Juara ---")
for nomor, nama in enumerate(peserta, start=1):
    print(f"Juara {nomor}: {nama}")`,
      output: `--- Tabel Perkalian 3 ---
3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15

Total angka genap: 50

--- Daftar Juara ---
Juara 1: Andi
Juara 2: Siti
Juara 3: Budi`,
      lineExplanations: [
        {
          line: "for i in range(1, 6):",
          explanation: "Menghasilkan angka `1, 2, 3, 4, 5` secara berurutan (berhenti sebelum angka `6`)."
        },
        {
          line: "if x % 2 == 0:\n        total_genap += x",
          explanation: "Memeriksa apakah elemen `x` genap; jika ya, nilainya ditambahkan ke variabel akumulator `total_genap`."
        },
        {
          line: "for nomor, nama in enumerate(peserta, start=1):",
          explanation: "Fungsi `enumerate()` menghasilkan nomor urut mulai dari `1` (`nomor`) beserta isi datanya (`nama`)."
        }
      ]
    },
    {
      id: "bab7-ex2",
      title: "2. Perulangan while (Hitung Mundur) serta Kontrol break & continue",
      description:
        "Contoh hitung mundur dengan `while` dan `n -= 1`, serta bagaimana `continue` melewati 1 putaran dan `break` menghentikan loop sepenuhnya.",
      code: `# 1. Hitung mundur sederhana dengan while loop
n = 3
print("--- Hitung Mundur ---")
while n >= 1:
    print(n)
    n -= 1
print("Mulai!\\n")

# 2. Kontrol continue (lompati) dan break (hentikan loop)
print("--- Filter Angka Ganjil ---")
angka = 0
while angka < 10:
    angka += 1
    if angka % 2 == 0:
        continue  # Lewati angka genap, lanjut ke putaran berikutnya
    if angka == 7:
        print(f"Angka {angka} ditemukan! Hentikan loop dengan break.")
        break
    print(f"Angka ganjil: {angka}")`,
      output: `--- Hitung Mundur ---
3
2
1
Mulai!

--- Filter Angka Ganjil ---
Angka ganjil: 1
Angka ganjil: 3
Angka ganjil: 5
Angka 7 ditemukan! Hentikan loop dengan break.`,
      lineExplanations: [
        {
          line: "n -= 1",
          explanation: "Mengurangi nilai `n` sebesar 1 setiap putaran agar kondisi `n >= 1` akhirnya menjadi `False` dan loop berhenti."
        },
        {
          line: "continue",
          explanation: "Melewati sisa baris kode di bawahnya pada putaran saat ini dan langsung kembali mengecek kondisi `while`."
        },
        {
          line: "break",
          explanation: "Menghentikan seluruh perulangan `while` saat itu juga meskipun `angka` belum mencapai 10."
        }
      ]
    },
    {
      id: "bab7-ex3",
      title: "3. List Comprehension Satu Baris",
      description:
        "Cara khas Python (*Pythonic*) untuk membuat `List` baru hasil transformasi dari `List` lain hanya dalam satu baris kode.",
      code: `data_awal = [1, 2, 3, 4, 5]

# Mengalikan setiap elemen dengan 10 menggunakan List Comprehension
kali_sepuluh = [x * 10 for x in data_awal]

# Memangkatkan setiap elemen dengan 2
kuadrat = [x ** 2 for x in data_awal]

print("Data Awal    :", data_awal)
print("Kali Sepuluh :", kali_sepuluh)
print("Kuadrat      :", kuadrat)`,
      output: `Data Awal    : [1, 2, 3, 4, 5]
Kali Sepuluh : [10, 20, 30, 40, 50]
Kuadrat      : [1, 4, 9, 16, 25]`,
      lineExplanations: [
        {
          line: "kali_sepuluh = [x * 10 for x in data_awal]",
          explanation: "Mengambil setiap elemen `x` di dalam `data_awal`, mengalikannya dengan `10`, dan menyimpannya ke dalam `List` baru."
        }
      ]
    }
  ],
  tips: [
    "Gunakan `for` loop jika jumlah putaran atau koleksi datanya sudah jelas. Gunakan `while` loop jika perulangan bergantung pada syarat yang belum pasti kapan berhentinya.",
    "Ingat bahwa batas akhir `stop` pada `range(start, stop)` tidak ikut disertakan!"
  ],
  commonMistakes: [
    {
      wrong: "n = 3\nwhile n >= 1:\n    print(n)  # Lupa menulis n -= 1",
      correct: "n = 3\nwhile n >= 1:\n    print(n)\n    n -= 1",
      reason: "Tanpa `n -= 1`, nilai `n` akan selalu `3` (`3 >= 1` selalu `True`) sehingga memicu perulangan tanpa henti (*Infinite Loop*)."
    }
  ],
  caseStudies: [
    {
      id: "bab7-case1",
      title: "Simulasi Target Tabungan Pembelian Laptop Baru (for & break)",
      difficulty: "Mudah",
      scenario:
        "Rizky menabung setiap bulan untuk membeli perlengkapan kerja seharga Rp2.000.000. Catatan setoran bulanannya adalah `setoran = [600000, 750000, 800000, 500000]`. Begitu total tabungannya sudah mencapai atau melewati `2000000`, perulangan harus langsung dihentikan menggunakan `break`.",
      instructions:
        "Gunakan `for` loop untuk menambahkan setiap `uang` di dalam `setoran` ke `total_tabungan`, dan hentikan loop dengan `break` apabila `total_tabungan >= 2000000`!",
      tasks: [
        "Tambahkan `total_tabungan += uang` di dalam `for` loop.",
        "Gunakan `if total_tabungan >= 2000000: break` agar perulangan berhenti begitu target tercapai."
      ],
      starterCode: `setoran = [600000, 750000, 800000, 500000]
total_tabungan = 0

for uang in setoran:
    total_tabungan += uang
    # Hentikan loop dengan break jika total_tabungan >= 2000000:
    

print(f"Tabungan saat target tercapai: Rp{total_tabungan:,}")`,
      expectedOutput: `Tabungan saat target tercapai: Rp2,150,000`,
      hint: "Di dalam loop `for`, tambahkan `if total_tabungan >= 2000000:` lalu di bawahnya `break`.",
      solutionCode: `setoran = [600000, 750000, 800000, 500000]
total_tabungan = 0

for uang in setoran:
    total_tabungan += uang
    if total_tabungan >= 2000000:
        break

print(f"Tabungan saat target tercapai: Rp{total_tabungan:,}")`
    },
    {
      id: "bab7-case2",
      title: "Pemotongan Harga Flash Sale 10% Katalog Toko (List Comprehension)",
      difficulty: "Sedang",
      scenario:
        "Sebuah minimarket mengadakan *Flash Sale* diskon 10% untuk semua barang di etalase depan (`harga_normal = [20000, 50000, 100000, 150000]`). Setelah dipotong 10%, harga barang menjadi `int(h * 0.9)`. Kasir membutuhkan daftar harga promo baru secara cepat.",
      instructions:
        "Gunakan *List Comprehension* satu baris untuk membuat list `harga_promo` yang berisi `int(h * 0.9)` untuk setiap `h` di dalam `harga_normal`!",
      tasks: [
        "Tulis list comprehension `[int(h * 0.9) for h in harga_normal]`.",
        "Pastikan hasil cetakan adalah `[18000, 45000, 90000, 135000]`."
      ],
      starterCode: `harga_normal = [20000, 50000, 100000, 150000]

# Buat list harga_promo dengan List Comprehension 1 baris:
harga_promo = 

print("Harga Normal :", harga_normal)
print("Harga Promo  :", harga_promo)`,
      expectedOutput: `Harga Normal : [20000, 50000, 100000, 150000]
Harga Promo  : [18000, 45000, 90000, 135000]`,
      hint: "Tulis: `harga_promo = [int(h * 0.9) for h in harga_normal]`",
      solutionCode: `harga_normal = [20000, 50000, 100000, 150000]

harga_promo = [int(h * 0.9) for h in harga_normal]

print("Harga Normal :", harga_normal)
print("Harga Promo  :", harga_promo)`
    }
  ],
  codingChallenges: [
    {
      id: "bab7-challenge1",
      title: "Mencetak Tabel Perkalian 5",
      difficulty: "Mudah",
      instructions:
        "Gunakan perulangan `for` dan `range(1, 6)` untuk mencetak tabel perkalian angka 5 mulai dari `5 x 1 = 5` hingga `5 x 5 = 25`!",
      tasks: [
        "Buat perulangan `for i in range(1, 6):`.",
        "Cetak dengan format `f'5 x {i} = {5 * i}'` di setiap putarannya."
      ],
      starterCode: `# Tulis perulangan for untuk tabel perkalian 5 (dari 1 sampai 5):
for i in range(1, 6):
    # Cetak hasil perkalian di sini:
    `,
      expectedOutput: `5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25`,
      hint: 'Di dalam blok `for`, tulis: `print(f"5 x {i} = {5 * i}")`',
      solutionCode: `for i in range(1, 6):
    print(f"5 x {i} = {5 * i}")`
    },
    {
      id: "bab7-challenge2",
      title: "Hitung Mundur dengan while Loop",
      difficulty: "Mudah",
      instructions:
        "Gunakan perulangan `while` untuk mencetak angka hitung mundur dari `3`, `2`, `1`, lalu setelah loop selesai cetak `'Mulai!'`.",
      tasks: [
        "Selama `n >= 1`, cetak nilai `n` lalu kurangi `n` sebesar 1 (`n -= 1`).",
        "Setelah loop selesai, cetak `'Mulai!'`."
      ],
      starterCode: `n = 3

while n >= 1:
    print(n)
    # Kurangi nilai n sebesar 1 di sini:
    

print("Mulai!")`,
      expectedOutput: `3
2
1
Mulai!`,
      hint: "Tambahkan `n -= 1` di dalam blok `while` tepat di bawah `print(n)`.",
      solutionCode: `n = 3

while n >= 1:
    print(n)
    n -= 1

print("Mulai!")`
    },
    {
      id: "bab7-challenge3",
      title: "Menjumlahkan Hanya Bilangan Genap di Dalam List",
      difficulty: "Sedang",
      instructions:
        "Diberikan daftar `angka = [12, 7, 18, 5, 20, 9]`. Gunakan perulangan `for` dan kondisi `if` untuk menjumlahkan HANYA angka yang genap ke dalam variabel `total_genap`!",
      tasks: [
        "Telusuri setiap item `x` di dalam list `angka`.",
        "Jika `x % 2 == 0`, tambahkan `x` ke variabel `total_genap` (`total_genap += x`)."
      ],
      starterCode: `angka = [12, 7, 18, 5, 20, 9]
total_genap = 0

# Tulis perulangan for dan pengecekan genap di bawah ini:
for x in angka:
    

print(f"Total bilangan genap: {total_genap}")`,
      expectedOutput: `Total bilangan genap: 50`,
      hint: "Di dalam loop `for`, tambahkan `if x % 2 == 0:` lalu di dalamnya `total_genap += x`.",
      solutionCode: `angka = [12, 7, 18, 5, 20, 9]
total_genap = 0

for x in angka:
    if x % 2 == 0:
        total_genap += x

print(f"Total bilangan genap: {total_genap}")`
    },
    {
      id: "bab7-challenge4",
      title: "Menampilkan Daftar Juara dengan enumerate()",
      difficulty: "Sedang",
      instructions:
        "Gunakan fungsi `enumerate(peserta, start=1)` di dalam `for` loop untuk mencetak daftar juara dengan nomor urut mulai dari 1!",
      tasks: [
        "Gunakan `for nomor, nama in enumerate(peserta, start=1):`.",
        "Cetak `f'Juara {nomor}: {nama}'`."
      ],
      starterCode: `peserta = ["Andi", "Siti", "Budi"]

# Gunakan enumerate(peserta, start=1) di bawah ini:
for nomor, nama in enumerate(peserta, start=1):
    `,
      expectedOutput: `Juara 1: Andi
Juara 2: Siti
Juara 3: Budi`,
      hint: 'Di dalam loop `for`, tulis: `print(f"Juara {nomor}: {nama}")`',
      solutionCode: `peserta = ["Andi", "Siti", "Budi"]

for nomor, nama in enumerate(peserta, start=1):
    print(f"Juara {nomor}: {nama}")`
    },
    {
      id: "bab7-challenge5",
      title: "Membuat List Kelipatan 10 dengan List Comprehension",
      difficulty: "Menantang",
      instructions:
        "Gunakan *List Comprehension* satu baris untuk mengalikan setiap angka di dalam `data = [1, 2, 3, 4]` dengan `10` sehingga menghasilkan `[10, 20, 30, 40]`!",
      tasks: [
        "Tulis list comprehension `[x * 10 for x in data]`.",
        "Cetak isi variabel `hasil`."
      ],
      starterCode: `data = [1, 2, 3, 4]

# Buat list comprehension [x * 10 for x in data]:
hasil = 

print("Hasil:", hasil)`,
      expectedOutput: `Hasil: [10, 20, 30, 40]`,
      hint: "Tulis: `hasil = [x * 10 for x in data]`",
      solutionCode: `data = [1, 2, 3, 4]

hasil = [x * 10 for x in data]

print("Hasil:", hasil)`
    }
  ],
  quizzes: [
    {
      question: "Berapa kali perintah `print('Halo')` akan dijalankan pada kode `for i in range(2, 10, 3): print('Halo')`?",
      options: ["2 kali", "3 kali", "4 kali", "8 kali"],
      correctIndex: 1,
      explanation: "`range(2, 10, 3)` menghasilkan angka `2`, `5`, dan `8` (berhenti sebelum `10`). Karena ada 3 angka, maka `print` dijalankan 3 kali."
    },
    {
      question: "Deretan angka apakah yang dihasilkan oleh `list(range(4))`?",
      options: ["[1, 2, 3, 4]", "[0, 1, 2, 3]", "[0, 1, 2, 3, 4]", "[4]"],
      correctIndex: 1,
      explanation: "`range(n)` selalu dimulai dari `0` dan berhenti tepat sebelum `n`, sehingga `range(4)` menghasilkan `[0, 1, 2, 3]`."
    },
    {
      question: "Perintah manakah yang digunakan untuk menghentikan paksa seluruh perulangan saat itu juga?",
      options: ["stop", "exit", "break", "continue"],
      correctIndex: 2,
      explanation: "Kata kunci `break` langsung menghentikan perulangan `for` atau `while` dan keluar dari blok loop."
    },
    {
      question: "Apa perbedaan utama antara `break` dan `continue` di dalam perulangan?",
      options: [
        "break melompati 1 putaran, sedangkan continue menghentikan seluruh loop",
        "break menghentikan seluruh loop, sedangkan continue melompati sisa kode di putaran saat ini dan lanjut ke putaran berikutnya",
        "break hanya untuk while, sedangkan continue hanya untuk for",
        "Keduanya memiliki fungsi yang sama persis"
      ],
      correctIndex: 1,
      explanation: "`break` mengakhiri loop sepenuhnya, sedangkan `continue` hanya melewati putaran saat ini dan melanjutkan ke iterasi berikutnya."
    },
    {
      question: "Fungsi apakah yang memudahkan kita mendapatkan nomor urut sekaligus nilai elemen saat melakukan `for` loop pada sebuah `List`?",
      options: ["range()", "enumerate()", "index()", "len()"],
      correctIndex: 1,
      explanation: "Fungsi `enumerate(list)` mengembalikan pasangan `(nomor_indeks, nilai)` di setiap putaran loop."
    }
  ]
};
