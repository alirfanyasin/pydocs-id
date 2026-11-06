import { DocSection } from "../types";

export const bab6Percabangan: DocSection = {
  id: "bab6-percabangan",
  number: 6,
  filePath: "app/data/chapters/bab6-percabangan.ts",
  title: "Percabangan (if, elif, else & match-case)",
  subtitle:
    "Mengatur alur keputusan program menggunakan `if`, `elif`, `else`, percabangan bersarang (*nested if*), *ternary operator*, hingga `match-case`.",
  level: "Dasar",
  readTime: "11 menit",
  summary:
    "Percabangan (*Conditional Statement*) memungkinkan program mengambil tindakan yang berbeda tergantung pada apakah suatu syarat bernilai `True` atau `False`. Di Python, setiap baris kondisi `if`, `elif`, dan `else` wajib diakhiri dengan tanda titik dua (`:`), dan baris kode di dalamnya wajib diberi indentasi (4 spasi). Python memeriksa kondisi secara berurutan dari atas ke bawah—begitu satu kondisi bernilai `True`, cabang `elif` atau `else` di bawahnya langsung dilewati.",
  keyPoints: [
    "`if kondisi:`: Menjalankan blok kode di dalamnya hanya jika kondisi bernilai `True`.",
    "`elif kondisi_lain:`: Singkatan dari *else if*, diperiksa hanya apabila kondisi `if` atau `elif` di atasnya bernilai `False`.",
    "`else:`: Blok penutup opsional yang dijalankan apabila SEMUA kondisi `if` dan `elif` di atasnya bernilai `False`.",
    "Ternary Operator (1 Baris): Bentuk ringkas mengisi variabel berdasarkan kondisi: `hasil = nilai_jika_true if kondisi else nilai_jika_false`.",
    "`match-case` (Python 3.10+): Struktur pencocokan pola pengganti *switch-case*, menggunakan `case _:` sebagai cabang default jika tidak ada pilihan yang cocok."
  ],
  conceptTable: {
    title: "Struktur Kata Kunci Percabangan di Python",
    headers: ["Kata Kunci", "Contoh Penulisan", "Kapan Dijalankan?", "Keterangan"],
    rows: [
      ["if", "if suhu <= 0:", "Saat kondisi pertama bernilai `True`.", "Wajib ada di awal percabangan."],
      ["elif", "elif suhu >= 100:", "Saat kondisi di atasnya `False` dan kondisi ini `True`.", "Opsional, boleh ditulis berkali-kali."],
      ["else", "else:", "Saat semua kondisi `if` dan `elif` bernilai `False`.", "Opsional, maksimal 1 di bagian paling akhir."],
      ["Ternary", '"Lulus" if skor >= 75 else "Remedial"', "Evaluasi `if-else` singkat dalam satu baris.", "Sangat praktis untuk mengisi nilai variabel."],
      ["match-case", "match warna:\n    case _:", "Mencocokkan nilai variabel terhadap sejumlah `case`.", "`case _:` berfungsi sebagai cabang default (`else`)."]
    ]
  },
  examples: [
    {
      id: "bab6-ex1",
      title: "1. Struktur Lengkap if, elif, dan else & Pengecekan Genap/Ganjil",
      description:
        "Python mengecek kondisi dari atas ke bawah. Begitu satu cabang terpenuhi (`True`), seluruh cabang di bawahnya langsung dilewati.",
      code: `nilai = 84

# 1. Rangkaian if - elif - else penentuan Grade
if nilai >= 90:
    grade = "A"
elif nilai >= 80:
    grade = "B"
elif nilai >= 70:
    grade = "C"
else:
    grade = "D"

print(f"Nilai {nilai} mendapatkan Grade: {grade}")

# 2. Pengecekan bilangan Genap atau Ganjil dengan modulo (%)
angka = 37
if angka % 2 == 0:
    jenis = "Genap"
else:
    jenis = "Ganjil"

print(f"Angka {angka} adalah bilangan {jenis}")`,
      output: `Nilai 84 mendapatkan Grade: B
Angka 37 adalah bilangan Ganjil`,
      lineExplanations: [
        {
          line: "elif nilai >= 80:",
          explanation: "Karena `84 >= 90` bernilai `False`, Python lanjut mengecek `elif nilai >= 80:`. Karena `True`, `grade` diisi `'B'` dan cabang di bawahnya dilewati."
        },
        {
          line: "if angka % 2 == 0:",
          explanation: "Jika sisa pembagian `angka` dengan 2 adalah `0`, maka bilangan tersebut `'Genap'`, selain itu masuk ke `else:` yaitu `'Ganjil'`."
        }
      ]
    },
    {
      id: "bab6-ex2",
      title: "2. Percabangan Bersarang (Nested If) & Ternary Operator Satu Baris",
      description:
        "Menempatkan `if` di dalam `if` lainnya (*Nested If*), serta menulis kondisi satu baris menggunakan *Ternary Operator*.",
      code: `total_belanja = 250000
member_aktif = True

# 1. Nested If (if di dalam if)
if total_belanja >= 200000:
    if member_aktif:
        diskon = 0.20  # Diskon 20%
    else:
        diskon = 0.10  # Diskon 10%
else:
    diskon = 0.0

bayar = int(total_belanja * (1 - diskon))

# 2. Ternary Operator satu baris: nilai_true if kondisi else nilai_false
status_ongkir = "Gratis Ongkir" if bayar >= 150000 else "Ongkir Rp15.000"

print(f"Total Bayar   : Rp{bayar:,}")
print(f"Status Ongkir : {status_ongkir}")`,
      output: `Total Bayar   : Rp200,000
Status Ongkir : Gratis Ongkir`,
      lineExplanations: [
        {
          line: 'status_ongkir = "Gratis Ongkir" if bayar >= 150000 else "Ongkir Rp15.000"',
          explanation: "Ternary operator: menghasilkan nilai di sebelah kiri `if` apabila kondisi `True`, atau nilai di sebelah kanan `else` apabila kondisi `False`."
        }
      ]
    },
    {
      id: "bab6-ex3",
      title: "3. Struktur match-case dengan Cabang Default (case _:)",
      description:
        "Menggunakan `match-case` untuk mencocokkan nilai variabel dengan daftar pilihan yang tersedia.",
      code: `warna_lampu = "Kuning"

match warna_lampu:
    case "Merah":
        aksi = "Berhenti"
    case "Kuning":
        aksi = "Hati-hati"
    case "Hijau":
        aksi = "Jalan"
    case _:
        aksi = "Lampu Rusak"

print(f"Warna Lampu : {warna_lampu}")
print(f"Instruksi   : {aksi}")`,
      output: `Warna Lampu : Kuning
Instruksi   : Hati-hati`,
      lineExplanations: [
        {
          line: 'case "Kuning":',
          explanation: "Cocok dengan nilai `warna_lampu = 'Kuning'`, sehingga variabel `aksi` diisi dengan `'Hati-hati'`."
        },
        {
          line: "case _:",
          explanation: "Simbol garis bawah `_` pada `case _:` berfungsi sebagai cabang default (setara dengan `else:`) jika tidak ada `case` di atasnya yang cocok."
        }
      ]
    }
  ],
  tips: [
    "Urutkan kondisi `if` dan `elif` dari yang paling spesifik (atau dari batas angka tertinggi ke terendah) agar tidak salah masuk ke cabang di atasnya.",
    "Jangan lupa tanda titik dua (`:`) di akhir baris `if`, `elif`, `else`, `match`, dan `case`."
  ],
  commonMistakes: [
    {
      wrong: "nilai = 85\nif nilai >= 70:\n    print('A')\nelif nilai >= 80:\n    print('B')",
      correct: "nilai = 85\nif nilai >= 80:\n    print('B')\nelif nilai >= 70:\n    print('A')",
      reason: "Pada kode yang salah, karena `85 >= 70` di baris pertama sudah `True`, Python langsung mencetak `'A'` dan tidak pernah mengecek `elif nilai >= 80:` di bawahnya."
    }
  ],
  caseStudies: [
    {
      id: "bab6-case1",
      title: "Mesin Hitung Tarif Parkir Otomatis Pusat Perbelanjaan",
      difficulty: "Mudah",
      scenario:
        "Gerbang parkir otomatis di sebuah pusat perbelanjaan menetapkan tarif parkir mobil sebagai berikut: parkir `<= 1` jam dikenakan biaya `Rp5.000`, parkir `<= 3` jam dikenakan total `Rp10.000`, parkir `<= 5` jam dikenakan total `Rp15.000`, dan di atas 5 jam dikenakan tarif maksimal seharian `Rp25.000`.",
      instructions:
        "Buatlah percabangan `if-elif-else` untuk menentukan nilai `tarif` berdasarkan `durasi_jam = 4`!",
      tasks: [
        "Gunakan `if durasi_jam <= 1:`, `elif durasi_jam <= 3:`, `elif durasi_jam <= 5:`, dan `else:`.",
        "Pastikan untuk `durasi_jam = 4` menghasilkan `Tarif Parkir (4 jam): Rp15,000`."
      ],
      starterCode: `durasi_jam = 4

# Tulis percabangan if-elif-else penentuan tarif parkir:
if durasi_jam <= 1:
    tarif = 5000


print(f"Tarif Parkir ({durasi_jam} jam): Rp{tarif:,}")`,
      expectedOutput: `Tarif Parkir (4 jam): Rp15,000`,
      hint: "Tambahkan `elif durasi_jam <= 3: tarif = 10000`, `elif durasi_jam <= 5: tarif = 15000`, dan `else: tarif = 25000`.",
      solutionCode: `durasi_jam = 4

if durasi_jam <= 1:
    tarif = 5000
elif durasi_jam <= 3:
    tarif = 10000
elif durasi_jam <= 5:
    tarif = 15000
else:
    tarif = 25000

print(f"Tarif Parkir ({durasi_jam} jam): Rp{tarif:,}")`
    },
    {
      id: "bab6-case2",
      title: "Papan Peringatan Kualitas Udara Kota (AQI) & Imbauan Masker",
      difficulty: "Sedang",
      scenario:
        "Dinas Lingkungan Hidup memasang sensor kualitas udara (AQI) di taman kota. Jika `indeks_aqi <= 50` kategori `'Baik'`, jika `<= 100` kategori `'Sedang'`, dan di atas `100` kategori `'Tidak Sehat'`. Selain itu, layar menampilkan imbauan singkat menggunakan *Ternary Operator*: `'Wajib Masker'` jika `indeks_aqi > 100`, selain itu `'Udara Aman'`.",
      instructions:
        "Lengkapi percabangan `if-elif-else` untuk mengisi `kategori`, lalu gunakan *Ternary Operator* satu baris untuk mengisi `imbauan`!",
      tasks: [
        "Tentukan `kategori` dengan `if-elif-else`.",
        "Tentukan `imbauan = 'Wajib Masker' if indeks_aqi > 100 else 'Udara Aman'`."
      ],
      starterCode: `indeks_aqi = 135

if indeks_aqi <= 50:
    kategori = "Baik"
elif indeks_aqi <= 100:
    kategori = "Sedang"
else:
    kategori = "Tidak Sehat"

# Gunakan Ternary Operator 1 baris untuk mengisi variabel imbauan:
imbauan = 

print(f"AQI {indeks_aqi} ({kategori}) -> {imbauan}")`,
      expectedOutput: `AQI 135 (Tidak Sehat) -> Wajib Masker`,
      hint: 'Tulis: `imbauan = "Wajib Masker" if indeks_aqi > 100 else "Udara Aman"`',
      solutionCode: `indeks_aqi = 135

if indeks_aqi <= 50:
    kategori = "Baik"
elif indeks_aqi <= 100:
    kategori = "Sedang"
else:
    kategori = "Tidak Sehat"

imbauan = "Wajib Masker" if indeks_aqi > 100 else "Udara Aman"

print(f"AQI {indeks_aqi} ({kategori}) -> {imbauan}")`
    }
  ],
  codingChallenges: [
    {
      id: "bab6-challenge1",
      title: "Menentukan Kategori Suhu Air (if, elif, else)",
      difficulty: "Mudah",
      instructions:
        "Buatlah percabangan `if-elif-else` untuk menentukan wujud air berdasarkan `suhu` (dalam derajat Celcius): jika `suhu <= 0` maka `'Beku (Es)'`, jika `suhu >= 100` maka `'Mendidih (Uap)'`, selain itu `'Cair'`.",
      tasks: [
        "Gunakan `if suhu <= 0:`, `elif suhu >= 100:`, dan `else:`.",
        "Pastikan untuk `suhu = 28` menghasilkan `'Wujud air pada 28°C: Cair'`."
      ],
      starterCode: `suhu = 28

if suhu <= 0:
    wujud = "Beku (Es)"
# Lengkapi elif dan else di bawah ini:


print(f"Wujud air pada {suhu}°C: {wujud}")`,
      expectedOutput: `Wujud air pada 28°C: Cair`,
      hint: 'Tambahkan `elif suhu >= 100:` dengan `wujud = "Mendidih (Uap)"`, lalu `else:` dengan `wujud = "Cair"`.',
      solutionCode: `suhu = 28

if suhu <= 0:
    wujud = "Beku (Es)"
elif suhu >= 100:
    wujud = "Mendidih (Uap)"
else:
    wujud = "Cair"

print(f"Wujud air pada {suhu}°C: {wujud}")`
    },
    {
      id: "bab6-challenge2",
      title: "Cek Bilangan Genap atau Ganjil",
      difficulty: "Mudah",
      instructions:
        "Gunakan `if-else` dan operator modulo (`%`) untuk menentukan apakah `angka = 37` adalah bilangan `'Genap'` atau `'Ganjil'`!",
      tasks: [
        "Cek apakah `angka % 2 == 0`.",
        "Jika `True`, isi `jenis = 'Genap'`, selain itu isi `jenis = 'Ganjil'`."
      ],
      starterCode: `angka = 37

# Tulis if-else pengecekan genap/ganjil:


print(f"Angka {angka} adalah bilangan {jenis}")`,
      expectedOutput: `Angka 37 adalah bilangan Ganjil`,
      hint: 'Gunakan `if angka % 2 == 0:` dengan `jenis = "Genap"` dan `else:` dengan `jenis = "Ganjil"`.',
      solutionCode: `angka = 37

if angka % 2 == 0:
    jenis = "Genap"
else:
    jenis = "Ganjil"

print(f"Angka {angka} adalah bilangan {jenis}")`
    },
    {
      id: "bab6-challenge3",
      title: "Penentuan Harga Tiket Bioskop Berdasarkan Usia",
      difficulty: "Sedang",
      instructions:
        "Tentukan `harga_tiket` berdasarkan `usia` penonton: `usia < 5` tahun gratis (`0`), `usia <= 12` tahun `25000`, `usia <= 59` tahun `45000`, dan selebihnya (`else:`) `30000`.",
      tasks: [
        "Gunakan rangkaian `if`, `elif`, dan `else` untuk mengisi variabel `harga_tiket`.",
        "Uji untuk `usia = 10` sehingga mencetak `'Harga Tiket: Rp25,000'`."
      ],
      starterCode: `usia = 10

# Tulis percabangan penentuan harga_tiket di bawah ini:
if usia < 5:
    harga_tiket = 0


print(f"Harga Tiket: Rp{harga_tiket:,}")`,
      expectedOutput: `Harga Tiket: Rp25,000`,
      hint: "Gunakan `elif usia <= 12: harga_tiket = 25000`, `elif usia <= 59: harga_tiket = 45000`, dan `else: harga_tiket = 30000`.",
      solutionCode: `usia = 10

if usia < 5:
    harga_tiket = 0
elif usia <= 12:
    harga_tiket = 25000
elif usia <= 59:
    harga_tiket = 45000
else:
    harga_tiket = 30000

print(f"Harga Tiket: Rp{harga_tiket:,}")`
    },
    {
      id: "bab6-challenge4",
      title: "Ternary Operator Satu Baris untuk Status Kelulusan",
      difficulty: "Sedang",
      instructions:
        "Gunakan *Ternary Operator* satu baris untuk mengisi variabel `status` dengan `'Lulus'` jika `skor >= 75`, atau `'Remedial'` jika kurang dari `75`!",
      tasks: [
        "Tulis ekspresi ternary: `'Lulus' if skor >= 75 else 'Remedial'`."
      ],
      starterCode: `skor = 80

# Gunakan ternary operator 1 baris:
status = 

print(f"Skor {skor} -> Status: {status}")`,
      expectedOutput: `Skor 80 -> Status: Lulus`,
      hint: 'Tulis: `status = "Lulus" if skor >= 75 else "Remedial"`',
      solutionCode: `skor = 80

status = "Lulus" if skor >= 75 else "Remedial"

print(f"Skor {skor} -> Status: {status}")`
    },
    {
      id: "bab6-challenge5",
      title: "Lampu Lalu Lintas dengan match-case",
      difficulty: "Menantang",
      instructions:
        "Gunakan struktur `match-case` untuk mencocokkan variabel `warna_lampu`: `'Merah'` -> `'Berhenti'`, `'Kuning'` -> `'Hati-hati'`, `'Hijau'` -> `'Jalan'`, dan lainnya (`_`) -> `'Lampu Rusak'`.",
      tasks: [
        "Lengkapi blok `match warna_lampu:` beserta `case`-nya.",
        "Pastikan untuk `warna_lampu = 'Kuning'` mencetak `'Instruksi: Hati-hati'`."
      ],
      starterCode: `warna_lampu = "Kuning"

match warna_lampu:
    case "Merah":
        aksi = "Berhenti"
    # Lengkapi case Kuning, Hijau, dan _ di bawah ini:
    

print(f"Instruksi: {aksi}")`,
      expectedOutput: `Instruksi: Hati-hati`,
      hint: 'Tambahkan `case "Kuning": aksi = "Hati-hati"`, `case "Hijau": aksi = "Jalan"`, dan `case _: aksi = "Lampu Rusak"`.',
      solutionCode: `warna_lampu = "Kuning"

match warna_lampu:
    case "Merah":
        aksi = "Berhenti"
    case "Kuning":
        aksi = "Hati-hati"
    case "Hijau":
        aksi = "Jalan"
    case _:
        aksi = "Lampu Rusak"

print(f"Instruksi: {aksi}")`
    }
  ],
  quizzes: [
    {
      question: "Apa output dari kode `x = 15; print('Besar' if x > 20 else 'Kecil')`?",
      options: ["Besar", "Kecil", "True", "15"],
      correctIndex: 1,
      explanation: "Karena `x = 15` dan kondisi `x > 20` bernilai `False`, maka *ternary operator* mengembalikan nilai di sebelah kanan `else`, yaitu `'Kecil'`."
    },
    {
      question: "Kata kunci apakah yang digunakan di Python untuk menulis cabang 'else if'?",
      options: ["elseif", "else if", "elif", "case"],
      correctIndex: 2,
      explanation: "Python menggunakan kata kunci `elif` sebagai singkatan dari *else if*."
    },
    {
      question: "Karakter apakah yang wajib ditulis di akhir baris kondisi `if`, `elif`, dan `else`?",
      options: ["Titik koma (;)", "Titik dua (:)", "Kurung kurawal ({)", "Tanda panah (->)"],
      correctIndex: 1,
      explanation: "Setiap baris header blok di Python (`if`, `elif`, `else`, `for`, `while`, `def`) wajib diakhiri dengan tanda titik dua (`:`)."
    },
    {
      question: "Pada struktur `match-case` di Python, pola apakah yang digunakan sebagai cabang default (setara dengan `else:`)?",
      options: ["default:", "else:", "case _:", "case *:"],
      correctIndex: 2,
      explanation: "Pada `match-case`, pola `case _:` menangkap semua nilai yang tidak cocok dengan `case` di atasnya."
    },
    {
      question: "Jika `nilai = 85`, apa yang dicetak oleh `if nilai >= 70: print('A')` diikuti `elif nilai >= 80: print('B')`?",
      options: ["A", "B", "A dan B", "Tidak mencetak apa pun"],
      correctIndex: 0,
      explanation: "Karena kondisi pertama `nilai >= 70` sudah bernilai `True` untuk `85`, maka Python langsung mengeksekusi blok pertama (`'A'`) dan melewati seluruh `elif` di bawahnya."
    }
  ]
};
