import { DocSection } from "../types";

export const bab5InputKonversi: DocSection = {
  id: "bab5-input-konversi",
  number: 5,
  filePath: "app/data/chapters/bab5-input-konversi.ts",
  title: "Input Pengguna & Konversi Tipe Data",
  subtitle:
    "Membuat program interaktif dengan fungsi `input()`, mengubah tipe data (*Type Casting*) `int()`, `float()`, `str()`, `bool()`, serta pembulatan `round()`.",
  level: "Pemula",
  readTime: "10 menit",
  summary:
    "Program yang interaktif dapat menerima masukan dari penggunanya. Di Python, fungsi `input()` digunakan untuk membaca teks yang diketikkan pengguna. Aturan emas yang wajib diingat: nilai yang dikembalikan oleh `input()` SELALU bertipe String (`str`), meskipun pengguna mengetik angka. Jika dua hasil `input()` langsung dijumlahkan dengan `+` tanpa dikonversi, keduanya hanya akan digabung sebagai teks (contoh: `'10' + '20'` menjadi `'1020'`). Oleh sebab itu, kita wajib melakukan konversi tipe data (*Type Casting*) menggunakan `int()` atau `float()` sebelum menghitungnya.",
  keyPoints: [
    "Fungsi `input()` selalu mengembalikan data bertipe `str` (teks). Bungkus dengan `int(input())` untuk bilangan bulat atau `float(input())` untuk bilangan desimal.",
    "`int(nilai)`: Mengubah string angka bulat menjadi integer (contoh: `int('25000')` menjadi `25000`), atau memotong desimal tanpa pembulatan ke atas (contoh: `int(19.99)` menjadi `19`).",
    "`float(nilai)`: Mengubah string desimal atau integer menjadi bilangan `float` (contoh: `float('64.789')` menjadi `64.789`).",
    "`str(nilai)`: Mengubah angka menjadi teks string agar bisa digabungkan menggunakan operator `+` (contoh: `'A-' + str(45)` menghasilkan `'A-45'`).",
    "`round(angka, n)`: Membulatkan bilangan desimal hingga `n` angka di belakang koma (contoh: `round(3.14159, 2)` menghasilkan `3.14`).",
    "`bool(nilai)`: Mengonversi nilai menjadi `True` atau `False`. Hanya nilai kosong (`''`, `0`, `None`) yang menghasilkan `False`; string yang ada isinya (termasuk `bool('False')` atau `bool('0')`) tetap menghasilkan `True`."
  ],
  conceptTable: {
    title: "Fungsi Konversi Tipe Data (Type Casting) & Pembulatan",
    headers: ["Fungsi", "Contoh Kode", "Hasil", "Keterangan"],
    rows: [
      ["int()", 'int("25000")', "25000", "Mengubah string angka bulat menjadi `int`."],
      ["int()", "int(19.99)", "19", "Memotong bagian desimal ke bilangan bulat (tanpa dibulatkan ke 20)."],
      ["float()", 'float("64.789")', "64.789", "Mengubah string desimal menjadi `float`."],
      ["str()", '"A-" + str(45)', '"A-45"', "Mengubah angka menjadi `str` agar bisa digabung dengan teks."],
      ["round()", "round(64.789, 1)", "64.8", "Membulatkan desimal menjadi 1 angka di belakang koma."],
      ["bool()", 'bool("") vs bool("isi")', "False vs True", "String kosong `''` bernilai `False`, string berisi bernilai `True`."]
    ]
  },
  examples: [
    {
      id: "bab5-ex1",
      title: "1. Membaca Input dengan int(input()) & Mengubah Angka ke str()",
      description:
        "Contoh membaca input angka sebagai integer menggunakan `int(input())`, serta mengubah angka menjadi string dengan `str()` agar bisa digabung dengan `+`.",
      defaultStdin: "Andi Pratama\n2004",
      code: `# 1. Membaca input teks (otomatis bertipe str)
nama = input("Masukkan nama Anda: ")

# 2. Membaca tahun lahir lalu dikonversi ke int
tahun_lahir = int(input("Masukkan tahun lahir: "))
umur = 2026 - tahun_lahir

# 3. Mengubah angka menjadi teks dengan str() untuk digabung dengan +
kode_peserta = "PY-" + str(tahun_lahir)

print("\\n--- Data Peserta ---")
print("Nama         :", nama)
print("Kode Peserta :", kode_peserta)
print(f"Umur (2026)  : {umur} tahun")`,
      output: `Masukkan nama Anda: Masukkan tahun lahir: 
--- Data Peserta ---
Nama         : Andi Pratama
Kode Peserta : PY-2004
Umur (2026)  : 22 tahun`,
      lineExplanations: [
        {
          line: 'tahun_lahir = int(input("Masukkan tahun lahir: "))',
          explanation: "Membungkus `input()` di dalam `int()` agar teks `'2004'` langsung diubah menjadi angka bulat `2004`."
        },
        {
          line: 'kode_peserta = "PY-" + str(tahun_lahir)',
          explanation: "Fungsi `str(tahun_lahir)` mengubah angka `2004` menjadi `'2004'` sehingga aman digabung dengan `'PY-'` menggunakan `+`."
        }
      ]
    },
    {
      id: "bab5-ex2",
      title: "2. Konversi Desimal float() & Pembulatan round(angka, n)",
      description:
        "Mengolah angka desimal dari string atau `input()` menggunakan `float()`, lalu membulatkan jumlah digit di belakang koma dengan `round(angka, n)`.",
      defaultStdin: "80\n85\n92",
      code: `# Membaca 3 nilai ujian menggunakan float(input())
n1 = float(input("Nilai 1: "))
n2 = float(input("Nilai 2: "))
n3 = float(input("Nilai 3: "))

rerata_asli = (n1 + n2 + n3) / 3
rerata_1_desimal = round(rerata_asli, 1)
rerata_2_desimal = round(rerata_asli, 2)

print("\\n--- Hasil Perhitungan Rata-Rata ---")
print("Rata-rata asli      :", rerata_asli)
print("Dibulatkan 1 desimal:", rerata_1_desimal)
print("Dibulatkan 2 desimal:", rerata_2_desimal)`,
      output: `Nilai 1: Nilai 2: Nilai 3: 
--- Hasil Perhitungan Rata-Rata ---
Rata-rata asli      : 85.66666666666667
Dibulatkan 1 desimal: 85.7
Dibulatkan 2 desimal: 85.67`,
      lineExplanations: [
        {
          line: "rerata_1_desimal = round(rerata_asli, 1)",
          explanation: "Membulatkan nilai desimal menjadi tepat 1 angka di belakang koma."
        },
        {
          line: "rerata_2_desimal = round(rerata_asli, 2)",
          explanation: "Membulatkan nilai desimal menjadi tepat 2 angka di belakang koma."
        }
      ]
    },
    {
      id: "bab5-ex3",
      title: "3. Pemotongan Desimal int(float) & Logika bool()",
      description:
        "Melihat bagaimana `int()` memotong angka di belakang koma tanpa pembulatan ke atas, serta aturan konversi `bool()`.",
      code: `# 1. int() pada bilangan desimal hanya memotong koma (truncate)
harga_promo = 19.99
print("int(19.99)          ->", int(harga_promo))

# 2. Konversi ke boolean dengan bool()
print("bool('') [kosong]   ->", bool(""))
print("bool(0)  [nol]      ->", bool(0))
print("bool('False') [isi] ->", bool("False"))
print("bool(-1) [bukan 0]  ->", bool(-1))`,
      output: `int(19.99)          -> 19
bool('') [kosong]   -> False
bool(0)  [nol]      -> False
bool('False') [isi] -> True
bool(-1) [bukan 0]  -> True`,
      lineExplanations: [
        {
          line: "int(harga_promo)",
          explanation: "`int(19.99)` menghasilkan `19` (bukan `20`) karena `int()` hanya membuang angka di belakang titik desimal."
        },
        {
          line: 'bool("") vs bool("False")',
          explanation: "Hanya string yang benar-benar kosong `''` yang bernilai `False`. String `'False'` tetap memiliki 5 karakter sehingga bernilai `True`!"
        }
      ]
    }
  ],
  tips: [
    "Gunakan `round(angka, 2)` saat menampilkan hasil rata-rata atau perhitungan desimal agar output terlihat rapi.",
    "Jika input pengguna bisa berupa angka berkoma (seperti berat badan `64.5`), selalu gunakan `float(input())`."
  ],
  commonMistakes: [
    {
      wrong: 'a = input()  # user ketik 10\nb = input()  # user ketik 20\nprint(a + b) # Hasilnya "1020", bukan 30!',
      correct: "a = int(input())\nb = int(input())\nprint(a + b) # Hasilnya 30",
      reason: "Tanpa `int()`, hasil `input()` masih bertipe `str` sehingga operator `+` hanya menempelkan teks `'10'` dan `'20'` menjadi `'1020'`."
    }
  ],
  caseStudies: [
    {
      id: "bab5-case1",
      title: "Kalkulator Patungan Makan Malam Bersama Teman (Split Bill)",
      difficulty: "Mudah",
      scenario:
        "Empat orang sahabat makan malam bersama di restoran dengan total tagihan makanan Rp350.000. Restoran mengenakan pajak & layanan sebesar 10% (sehingga total tagihan dikali `1.10`). Mereka ingin menghitung berapa rupiah yang harus dibayar masing-masing orang secara adil.",
      instructions:
        "Baca `tagihan_awal` menggunakan `float(input())` dan `jumlah_orang` menggunakan `int(input())`. Hitung tagihan + pajak 10% (`tagihan_awal * 1.10`), bagi dengan `jumlah_orang`, lalu bulatkan ke bilangan bulat terdekat menggunakan `round()`!",
      tasks: [
        "Baca `tagihan_awal = float(input())` dan `jumlah_orang = int(input())`.",
        "Hitung `per_orang = round((tagihan_awal * 1.10) / jumlah_orang)`."
      ],
      defaultStdin: "350000\n4",
      starterCode: `tagihan_awal = float(input())
jumlah_orang = int(input())

# Hitung iuran per orang setelah pajak 10% dan bulatkan dengan round():
per_orang = 

print(f"Iuran per orang: Rp{per_orang:,}")`,
      expectedOutput: `Iuran per orang: Rp96,250`,
      hint: "Tulis: `per_orang = round((tagihan_awal * 1.10) / jumlah_orang)`",
      solutionCode: `tagihan_awal = float(input())
jumlah_orang = int(input())

per_orang = round((tagihan_awal * 1.10) / jumlah_orang)

print(f"Iuran per orang: Rp{per_orang:,}")`
    },
    {
      id: "bab5-case2",
      title: "Timbangan Paket Ekspedisi & Pembuatan Nomor Resi Otomatis",
      difficulty: "Sedang",
      scenario:
        "Di loket kurir ekspedisi, petugas menimbang paket dalam satuan gram (`1750` gram) dan memasukkan nomor loket (`12`). Sistem perlu mengubah berat gram ke kilogram (`/ 1000`) dengan pembulatan 2 angka desimal menggunakan `round()`, serta membuat kode resi `'RESI-' + str(nomor_loket)`.",
      instructions:
        "Baca `nomor_loket` sebagai `int` dan `berat_gram` sebagai `float`. Buat variabel `kode_resi` menggunakan `str()` dan `berat_kg` menggunakan `round(..., 2)`!",
      tasks: [
        "Buat `kode_resi = 'RESI-' + str(nomor_loket)`.",
        "Hitung `berat_kg = round(berat_gram / 1000, 2)`."
      ],
      defaultStdin: "12\n1750",
      starterCode: `nomor_loket = int(input())
berat_gram = float(input())

# Buat kode_resi dengan str() dan hitung berat_kg dengan round(..., 2):
kode_resi = 
berat_kg = 

print(f"Kode Resi : {kode_resi}")
print(f"Berat     : {berat_kg} kg")`,
      expectedOutput: `Kode Resi : RESI-12
Berat     : 1.75 kg`,
      hint: 'Tulis `kode_resi = "RESI-" + str(nomor_loket)` dan `berat_kg = round(berat_gram / 1000, 2)`.',
      solutionCode: `nomor_loket = int(input())
berat_gram = float(input())

kode_resi = "RESI-" + str(nomor_loket)
berat_kg = round(berat_gram / 1000, 2)

print(f"Kode Resi : {kode_resi}")
print(f"Berat     : {berat_kg} kg")`
    }
  ],
  codingChallenges: [
    {
      id: "bab5-challenge1",
      title: "Konversi String Harga & Jumlah ke Integer",
      difficulty: "Mudah",
      instructions:
        "Diberikan dua variabel bertipe string dari form kasir: `teks_harga = '25000'` dan `teks_jumlah = '4'`. Konversikan keduanya menjadi integer menggunakan `int()` lalu kalikan keduanya!",
      tasks: [
        "Ubah `teks_harga` dan `teks_jumlah` menjadi `int`.",
        "Kalikan keduanya dan simpan ke dalam variabel `total_harga`."
      ],
      starterCode: `teks_harga = "25000"
teks_jumlah = "4"

# Konversikan ke int dan kalikan:
total_harga = 

print(f"Total Harga: Rp{total_harga}")`,
      expectedOutput: `Total Harga: Rp100000`,
      hint: "Gunakan `int(teks_harga) * int(teks_jumlah)`.",
      solutionCode: `teks_harga = "25000"
teks_jumlah = "4"

total_harga = int(teks_harga) * int(teks_jumlah)

print(f"Total Harga: Rp{total_harga}")`
    },
    {
      id: "bab5-challenge2",
      title: "Membaca Input Panjang & Lebar Persegi Panjang",
      difficulty: "Mudah",
      instructions:
        "Baca dua baris angka dari `input()` menggunakan `int(input())`, yaitu `panjang` dan `lebar`, kemudian cetak luas dan keliling persegi panjang tersebut!",
      tasks: [
        "Baca `panjang = int(input())` dan `lebar = int(input())`.",
        "Hitung `luas = panjang * lebar` dan `keliling = 2 * (panjang + lebar)`."
      ],
      defaultStdin: "10\n5",
      starterCode: `# Baca input panjang dan lebar sebagai integer:
panjang = int(input())
lebar = 

luas = panjang * lebar
keliling = 2 * (panjang + lebar)

print(f"Luas: {luas}")
print(f"Keliling: {keliling}")`,
      expectedOutput: `Luas: 50
Keliling: 30`,
      hint: "Isi `lebar = int(input())` pada baris ke-3.",
      solutionCode: `panjang = int(input())
lebar = int(input())

luas = panjang * lebar
keliling = 2 * (panjang + lebar)

print(f"Luas: {luas}")
print(f"Keliling: {keliling}")`
    },
    {
      id: "bab5-challenge3",
      title: "Konversi String Desimal dengan float() & Pembulatan round()",
      difficulty: "Sedang",
      instructions:
        "Ubahlah `teks_berat = '64.789'` menjadi bilangan desimal menggunakan `float()`, lalu bulatkan menjadi 1 angka di belakang koma menggunakan fungsi `round(angka, 1)`!",
      tasks: [
        "Konversikan `teks_berat` dengan `float()`.",
        "Bulatkan hasilnya ke 1 angka desimal dengan `round(..., 1)`."
      ],
      starterCode: `teks_berat = "64.789"

# Konversi ke float lalu bulatkan 1 angka di belakang koma:
berat_bulat = 

print(f"Berat Badan: {berat_bulat} kg")`,
      expectedOutput: `Berat Badan: 64.8 kg`,
      hint: "Tulis: `berat_bulat = round(float(teks_berat), 1)`",
      solutionCode: `teks_berat = "64.789"

berat_bulat = round(float(teks_berat), 1)

print(f"Berat Badan: {berat_bulat} kg")`
    },
    {
      id: "bab5-challenge4",
      title: "Mengubah Angka Menjadi String dengan str()",
      difficulty: "Sedang",
      instructions:
        "Gabungkan variabel `kode_blok = 'A-'` dengan `nomor_rumah = 45` menggunakan operator `+` setelah mengubah `nomor_rumah` menjadi string dengan fungsi `str()`!",
      tasks: [
        "Gunakan `str(nomor_rumah)` agar bisa digabungkan dengan `kode_blok` menggunakan `+`.",
        "Simpan hasilnya ke `alamat_lengkap`."
      ],
      starterCode: `kode_blok = "A-"
nomor_rumah = 45

# Gabungkan keduanya menggunakan str():
alamat_lengkap = 

print("Nomor Rumah:", alamat_lengkap)`,
      expectedOutput: `Nomor Rumah: A-45`,
      hint: "Tulis: `alamat_lengkap = kode_blok + str(nomor_rumah)`",
      solutionCode: `kode_blok = "A-"
nomor_rumah = 45

alamat_lengkap = kode_blok + str(nomor_rumah)

print("Nomor Rumah:", alamat_lengkap)`
    },
    {
      id: "bab5-challenge5",
      title: "Kalkulator Rata-Rata 3 Nilai Input",
      difficulty: "Menantang",
      instructions:
        "Baca 3 nilai ujian dari `input()` menggunakan `float(input())`, hitung nilai rata-ratanya, dan bulatkan hingga 2 angka di belakang koma dengan `round(rerata, 2)`!",
      tasks: [
        "Baca `n1`, `n2`, dan `n3` menggunakan `float(input())`.",
        "Hitung rata-rata `(n1 + n2 + n3) / 3` dan bulatkan 2 desimal dengan `round(..., 2)`."
      ],
      defaultStdin: "80\n85\n92",
      starterCode: `n1 = float(input())
n2 = float(input())
n3 = float(input())

# Hitung rata-rata dan bulatkan 2 angka desimal dengan round():
rerata = 

print("Rata-rata Nilai:", rerata)`,
      expectedOutput: `Rata-rata Nilai: 85.67`,
      hint: "Tulis: `rerata = round((n1 + n2 + n3) / 3, 2)`",
      solutionCode: `n1 = float(input())
n2 = float(input())
n3 = float(input())

rerata = round((n1 + n2 + n3) / 3, 2)

print("Rata-rata Nilai:", rerata)`
    }
  ],
  quizzes: [
    {
      question: "Jika pengguna mengetik `10` dan `20` pada kode `a = input(); b = input(); print(a + b)`, apakah output-nya?",
      options: ["30", "1020", "10 20", "TypeError"],
      correctIndex: 1,
      explanation: "Karena hasil `input()` bertipe string (`'10'` dan `'20'`) dan belum dikonversi dengan `int()`, operator `+` menggabungkan kedua teks tersebut menjadi `'1020'`."
    },
    {
      question: "Tipe data apakah yang SELALU dikembalikan oleh fungsi `input()`?",
      options: ["int", "float", "str", "Tergantung yang diketik user"],
      correctIndex: 2,
      explanation: "Fungsi `input()` di Python selalu mengembalikan nilai bertipe `str` (string)."
    },
    {
      question: "Berapakah nilai dari `int(19.99)` di Python?",
      options: ["20", "19", "19.99", "ValueError"],
      correctIndex: 1,
      explanation: "Fungsi `int()` pada angka `float` akan memotong (*truncate*) bagian desimalnya tanpa membulatkan ke atas, sehingga menghasilkan `19`."
    },
    {
      question: "Fungsi manakah yang tepat untuk membulatkan angka `3.14159` menjadi 2 angka di belakang koma (`3.14`)?",
      options: ["int(3.14159, 2)", "round(3.14159, 2)", "float(3.14159, 2)", "str(3.14159, 2)"],
      correctIndex: 1,
      explanation: "Fungsi `round(angka, n)` membulatkan bilangan desimal hingga `n` digit di belakang titik desimal."
    },
    {
      question: "Manakah dari pemanggilan fungsi `bool()` berikut yang menghasilkan `False`?",
      options: ["bool('False')", "bool(-1)", "bool('')", "bool('0')"],
      correctIndex: 2,
      explanation: "String kosong `''` bernilai `False`. Sebaliknya, string yang berisi karakter apa pun (termasuk `'False'` atau `'0'`) bernilai `True`."
    }
  ]
};
