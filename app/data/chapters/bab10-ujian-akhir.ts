import { DocSection } from "../types";

export const bab10UjianAkhir: DocSection = {
  id: "bab10-ujian-akhir",
  number: 10,
  isExam: true,
  filePath: "app/data/chapters/bab10-ujian-akhir.ts",
  title: "Ujian Akhir Modul: Python Dasar",
  subtitle:
    "Evaluasi komprehensif seluruh materi Bab 1 hingga Bab 9 melalui **15 Soal Praktik Ngoding** dan **10 Soal Pemahaman Konsep**.",
  level: "Ujian Akhir",
  readTime: "30 menit",
  summary:
    "Selamat telah mempelajari seluruh materi di modul **Python Dasar**! Bab terakhir ini adalah **Ujian Akhir** untuk menguji penguasaanmu terhadap seluruh konsep dari Bab 1 sampai Bab 9. Seluruh soal di bawah ini **100% diambil dari materi yang telah kamu pelajari**. Selesaikan **15 Soal Praktik Ngoding** dan **10 Soal Pemahaman** (total 25 soal) untuk menuntaskan modul Python Dasar secara penuh!",
  keyPoints: [
    "Terdiri dari **15 Soal Praktik Ngoding** (Hands-On) yang menguji kemampuan menulis kode Python dari dasar hingga fungsi.",
    "Terdiri dari **10 Soal Pemahaman** pilihan ganda untuk menguji ketelitian konsep sintaks dan logika Python.",
    "Seluruh soal murni menguji materi Bab 1–9: `print()`, *Escape Character*, variabel & tipe data, *Slicing* & *Method String*, operator aritmatika/logika, `input()` & *Type Casting*, percabangan `if-elif-else` & `match-case`, perulangan `for`/`while` & *List Comprehension*, struktur data (`List`, `Tuple`, `Set`, `Dictionary`), serta fungsi (`def`, `return`, `*args`, `lambda`).",
    "Jika kamu berhasil menjawab ke-25 soal di halaman ini lalu menekan tombol **Selesaikan Ujian Akhir** di bagian paling bawah, bab Ujian ini akan otomatis ditandai **Sudah Selesai**."
  ],
  conceptTable: {
    title: "Kisi-Kisi Materi Ujian Akhir Python Dasar (Bab 1 – Bab 9)",
    headers: ["Asal Bab", "Topik Utama yang Diujikan", "Nomor Soal Praktik", "Nomor Soal Pemahaman"],
    rows: [
      ["Bab 1", "`print()`, parameter `sep` & `end`, serta *Escape Character* (`\\n`, `\\\"`)", "Praktik #1 – #2", "Pemahaman #1"],
      ["Bab 2", "Variabel, `type()`, *Multiple Assignment*, *Swap* (`x, y = y, x`), & *f-string*", "Praktik #3 – #4", "Pemahaman #2"],
      ["Bab 3", "*String Indexing*, *Slicing* `[::-1]`, `.strip()`, `.title()`, `.replace()`, `.split()`", "Praktik #5 – #6", "Pemahaman #3"],
      ["Bab 4", "Operator `//`, `%`, `**`, `+=`, serta logika `and`, `or`, `in`, `not in`", "Praktik #7 – #8", "Pemahaman #4"],
      ["Bab 5", "`input()`, konversi `int()`, `float()`, `str()`, `bool()`, dan `round(x, n)`", "Praktik #9", "Pemahaman #5"],
      ["Bab 6", "Percabangan `if`, `elif`, `else`, *Ternary Operator*, & `match-case`", "Praktik #10 – #11", "Pemahaman #6"],
      ["Bab 7", "Perulangan `for`, `range()`, `enumerate()`, `while`, `break`, & *List Comprehension*", "Praktik #12 – #13", "Pemahaman #7 – #8"],
      ["Bab 8", "Struktur Data `List`, *Tuple Unpacking*, `Set` unik, & `Dictionary` (`.get()`)", "Praktik #14", "Pemahaman #9"],
      ["Bab 9", "Fungsi `def`, `return` banyak nilai, *Default Parameter*, `*args`, & `lambda`", "Praktik #15", "Pemahaman #10"]
    ]
  },
  examples: [],
  codingChallenges: [
    {
      id: "bab10-exam-challenge1",
      title: "Ujian Praktik #1: Format Nomor Invoice dengan Parameter sep & end (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Gunakan `print()` dengan parameter `sep='/'` untuk mencetak `'INV'`, `'2026'`, `'009'` dan akhiri dengan `end=' [LUNAS]\\n'` sehingga menghasilkan `'INV/2026/009 [LUNAS]'`!",
      tasks: [
        "Gunakan `sep='/'` dan `end=' [LUNAS]\\n'` pada fungsi `print()`."
      ],
      starterCode: `# Lengkapi parameter sep dan end pada print di bawah ini:
print("INV", "2026", "009")`,
      expectedOutput: `INV/2026/009 [LUNAS]`,
      hint: 'Tulis: `print("INV", "2026", "009", sep="/", end=" [LUNAS]\\n")`',
      solutionCode: `print("INV", "2026", "009", sep="/", end=" [LUNAS]\\n")`
    },
    {
      id: "bab10-exam-challenge2",
      title: "Ujian Praktik #2: Mencetak Kutipan & Baris Baru dengan Escape Character (Bab 1)",
      difficulty: "Mudah",
      instructions:
        "Gunakan satu fungsi `print()` dengan karakter escape `\\\"` dan `\\n` untuk mencetak dua baris persis seperti pada Target Output!",
      tasks: [
        "Baris 1: `Motto: \"Belajar Python Setiap Hari\"`",
        "Baris 2: `Status: Siap Ujian!`"
      ],
      starterCode: `# Cetak kedua baris menggunakan \\" dan \\n dalam satu print():
print()`,
      expectedOutput: `Motto: "Belajar Python Setiap Hari"
Status: Siap Ujian!`,
      hint: 'Tulis: `print("Motto: \\"Belajar Python Setiap Hari\\"\\nStatus: Siap Ujian!")`',
      solutionCode: `print("Motto: \\"Belajar Python Setiap Hari\\"\\nStatus: Siap Ujian!")`
    },
    {
      id: "bab10-exam-challenge3",
      title: "Ujian Praktik #3: Menukar Isi Dua Variabel (Swap) Satu Baris (Bab 2)",
      difficulty: "Mudah",
      instructions:
        "Terdapat variabel `kursi_a = 'Budi'` dan `kursi_b = 'Siti'`. Tukar isi kedua variabel tersebut menggunakan teknik *Swap* satu baris khas Python!",
      tasks: [
        "Gunakan `kursi_a, kursi_b = kursi_b, kursi_a`.",
        "Pastikan hasil cetakan adalah `Kursi A: Siti` dan `Kursi B: Budi`."
      ],
      starterCode: `kursi_a = "Budi"
kursi_b = "Siti"

# Tukar isi kursi_a dan kursi_b dalam 1 baris:


print("Kursi A:", kursi_a)
print("Kursi B:", kursi_b)`,
      expectedOutput: `Kursi A: Siti
Kursi B: Budi`,
      hint: "Tulis: `kursi_a, kursi_b = kursi_b, kursi_a`",
      solutionCode: `kursi_a = "Budi"
kursi_b = "Siti"

kursi_a, kursi_b = kursi_b, kursi_a

print("Kursi A:", kursi_a)
print("Kursi B:", kursi_b)`
    },
    {
      id: "bab10-exam-challenge4",
      title: "Ujian Praktik #4: Menghitung Tagihan & Format Ribuan f-string (Bab 2)",
      difficulty: "Mudah",
      instructions:
        "Diberikan `harga_satuan = 125000` dan `jumlah_beli = 4`. Hitung `total = harga_satuan * jumlah_beli` lalu cetak dengan *f-string* berformat pemisah ribuan `{total:,}`!",
      tasks: [
        "Hitung `total = harga_satuan * jumlah_beli`.",
        "Cetak `f'Total Tagihan: Rp{total:,}'`."
      ],
      starterCode: `harga_satuan = 125000
jumlah_beli = 4

# Hitung total dan cetak dengan format ribuan {total:,}:
total = 
print()`,
      expectedOutput: `Total Tagihan: Rp500,000`,
      hint: 'Isi `total = harga_satuan * jumlah_beli` lalu `print(f"Total Tagihan: Rp{total:,}")`.',
      solutionCode: `harga_satuan = 125000
jumlah_beli = 4

total = harga_satuan * jumlah_beli
print(f"Total Tagihan: Rp{total:,}")`
    },
    {
      id: "bab10-exam-challenge5",
      title: "Ujian Praktik #5: Ekstraksi & Membalik Teks dengan String Slicing (Bab 3)",
      difficulty: "Mudah",
      instructions:
        "Diberikan `kode_rahasia = 'PYT-98765'`. Ambil 3 karakter pertama (`'PYT'`) menggunakan slicing `[:3]`, dan balikkan 5 karakter terakhir (`'98765'` menjadi `'56789'`) menggunakan slicing `[::-1]`!",
      tasks: [
        "Ambil `awalan = kode_rahasia[:3]`.",
        "Ambil `angka_terbalik = kode_rahasia[4:][::-1]`."
      ],
      starterCode: `kode_rahasia = "PYT-98765"

# Gunakan teknik slicing:
awalan = 
angka_terbalik = 

print(f"Awalan : {awalan}")
print(f"Balikan: {angka_terbalik}")`,
      expectedOutput: `Awalan : PYT
Balikan: 56789`,
      hint: "Tulis `awalan = kode_rahasia[:3]` dan `angka_terbalik = kode_rahasia[4:][::-1]`.",
      solutionCode: `kode_rahasia = "PYT-98765"

awalan = kode_rahasia[:3]
angka_terbalik = kode_rahasia[4:][::-1]

print(f"Awalan : {awalan}")
print(f"Balikan: {angka_terbalik}")`
    },
    {
      id: "bab10-exam-challenge6",
      title: "Ujian Praktik #6: Merapikan Data Teks dengan .strip(), .title() & .replace() (Bab 3)",
      difficulty: "Sedang",
      instructions:
        "Bersihkan `teks_kotor = '   kelas_python_dasar   '` dengan menghapus spasi pinggir menggunakan `.strip()`, mengganti `'_'` menjadi spasi `' '` dengan `.replace('_', ' ')`, dan mengubahnya menjadi Huruf Kapital Tiap Kata dengan `.title()`!",
      tasks: [
        "Gabungkan method `.strip().replace('_', ' ').title()` pada `teks_kotor`.",
        "Simpan hasilnya ke `teks_rapi`."
      ],
      starterCode: `teks_kotor = "   kelas_python_dasar   "

# Bersihkan dan rapikan teks_kotor:
teks_rapi = 

print("Nama Kelas:", teks_rapi)`,
      expectedOutput: `Nama Kelas: Kelas Python Dasar`,
      hint: 'Tulis: `teks_rapi = teks_kotor.strip().replace("_", " ").title()`',
      solutionCode: `teks_kotor = "   kelas_python_dasar   "

teks_rapi = teks_kotor.strip().replace("_", " ").title()

print("Nama Kelas:", teks_rapi)`
    },
    {
      id: "bab10-exam-challenge7",
      title: "Ujian Praktik #7: Konversi Total Menit ke Jam & Sisa Menit dengan // dan % (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Diberikan `total_menit = 145`. Hitung berapa `jam` penuh yang terbentuk menggunakan pembagian bulat `// 60`, dan berapa `sisa_menit`-nya menggunakan modulo `% 60`!",
      tasks: [
        "Hitung `jam = total_menit // 60`.",
        "Hitung `sisa_menit = total_menit % 60`."
      ],
      starterCode: `total_menit = 145

# Hitung jam dan sisa_menit menggunakan // dan %:
jam = 
sisa_menit = 

print(f"Durasi: {jam} jam {sisa_menit} menit")`,
      expectedOutput: `Durasi: 2 jam 25 menit`,
      hint: "Gunakan `total_menit // 60` dan `total_menit % 60`.",
      solutionCode: `total_menit = 145

jam = total_menit // 60
sisa_menit = total_menit % 60

print(f"Durasi: {jam} jam {sisa_menit} menit")`
    },
    {
      id: "bab10-exam-challenge8",
      title: "Ujian Praktik #8: Seleksi Kandidat dengan Operator Logika & in (Bab 4)",
      difficulty: "Sedang",
      instructions:
        "Seorang pelamar dinyatakan `lolos_seleksi` apabila `skor_tes >= 80` DAN kata `'Python'` terdapat di dalam `keahlian` (gunakan operator `in`). Tulis ekspresi logikanya!",
      tasks: [
        "Gunakan `skor_tes >= 80`, operator `and`, dan `'Python' in keahlian`."
      ],
      starterCode: `skor_tes = 85
keahlian = " Analisis Data, Python, SQL "

# Tulis rumus logika untuk lolos_seleksi:
lolos_seleksi = 

print("Lolos Seleksi:", lolos_seleksi)`,
      expectedOutput: `Lolos Seleksi: True`,
      hint: 'Tulis: `lolos_seleksi = (skor_tes >= 80) and ("Python" in keahlian)`',
      solutionCode: `skor_tes = 85
keahlian = " Analisis Data, Python, SQL "

lolos_seleksi = (skor_tes >= 80) and ("Python" in keahlian)

print("Lolos Seleksi:", lolos_seleksi)`
    },
    {
      id: "bab10-exam-challenge9",
      title: "Ujian Praktik #9: Membaca Input Desimal & Pembulatan round() (Bab 5)",
      difficulty: "Sedang",
      instructions:
        "Baca jari-jari lingkaran `r` dari `input()` sebagai `float`, hitung luas lingkaran dengan rumus `luas = 3.14159 * (r ** 2)`, lalu bulatkan hasilnya hingga 2 angka di belakang koma menggunakan `round(luas, 2)`!",
      tasks: [
        "Baca `r = float(input())`.",
        "Hitung `luas = round(3.14159 * (r ** 2), 2)`."
      ],
      defaultStdin: "7",
      starterCode: `# Baca r sebagai float dari input():
r = float(input())

# Hitung luas lingkaran dan bulatkan 2 angka di belakang koma:
luas = 

print(f"Luas Lingkaran: {luas}")`,
      expectedOutput: `Luas Lingkaran: 153.94`,
      hint: "Tulis: `luas = round(3.14159 * (r ** 2), 2)`",
      solutionCode: `r = float(input())

luas = round(3.14159 * (r ** 2), 2)

print(f"Luas Lingkaran: {luas}")`
    },
    {
      id: "bab10-exam-challenge10",
      title: "Ujian Praktik #10: Penentuan Kategori Diskon Belanja (if-elif-else) (Bab 6)",
      difficulty: "Sedang",
      instructions:
        "Buatlah percabangan `if-elif-else`: jika `belanja >= 500000` maka `potongan = 50000`, jika `belanja >= 250000` maka `potongan = 20000`, selain itu `potongan = 0`. Hitung `bayar = belanja - potongan`!",
      tasks: [
        "Lengkapi blok `if`, `elif`, dan `else` untuk menentukan nilai `potongan`.",
        "Pastikan untuk `belanja = 300000` menghasilkan `Total Bayar: Rp280,000`."
      ],
      starterCode: `belanja = 300000

# Tulis percabangan if-elif-else di bawah ini:
if belanja >= 500000:
    potongan = 50000


bayar = belanja - potongan
print(f"Total Bayar: Rp{bayar:,}")`,
      expectedOutput: `Total Bayar: Rp280,000`,
      hint: "Tambahkan `elif belanja >= 250000: potongan = 20000` dan `else: potongan = 0`.",
      solutionCode: `belanja = 300000

if belanja >= 500000:
    potongan = 50000
elif belanja >= 250000:
    potongan = 20000
else:
    potongan = 0

bayar = belanja - potongan
print(f"Total Bayar: Rp{bayar:,}")`
    },
    {
      id: "bab10-exam-challenge11",
      title: "Ujian Praktik #11: Pencocokan Layanan Kurir dengan match-case (Bab 6)",
      difficulty: "Sedang",
      instructions:
        "Gunakan `match-case` untuk mencocokkan variabel `kode_kurir`: `'INST'` -> `'Pengiriman Instan (2 Jam)'`, `'REG'` -> `'Pengiriman Reguler (2-3 Hari)'`, dan lainnya (`case _:`) -> `'Kode Tidak Dikenal'`.",
      tasks: [
        "Lengkapi struktur `match kode_kurir:` beserta seluruh `case`-nya."
      ],
      starterCode: `kode_kurir = "REG"

match kode_kurir:
    case "INST":
        layanan = "Pengiriman Instan (2 Jam)"
    # Lengkapi case "REG" dan case _ di bawah ini:
    

print("Layanan:", layanan)`,
      expectedOutput: `Layanan: Pengiriman Reguler (2-3 Hari)`,
      hint: 'Tambahkan `case "REG": layanan = "Pengiriman Reguler (2-3 Hari)"` dan `case _: layanan = "Kode Tidak Dikenal"`.',
      solutionCode: `kode_kurir = "REG"

match kode_kurir:
    case "INST":
        layanan = "Pengiriman Instan (2 Jam)"
    case "REG":
        layanan = "Pengiriman Reguler (2-3 Hari)"
    case _:
        layanan = "Kode Tidak Dikenal"

print("Layanan:", layanan)`
    },
    {
      id: "bab10-exam-challenge12",
      title: "Ujian Praktik #12: Menjumlahkan Deret Angka dengan for & range() (Bab 7)",
      difficulty: "Sedang",
      instructions:
        "Gunakan perulangan `for` dan `range(1, 11)` untuk menjumlahkan seluruh angka dari 1 sampai 10 ke dalam variabel `total`!",
      tasks: [
        "Gunakan `for i in range(1, 11):`.",
        "Tambahkan `i` ke `total` (`total += i`) pada setiap putaran."
      ],
      starterCode: `total = 0

# Jumlahkan angka 1 sampai 10 menggunakan for dan range(1, 11):
for i in range(1, 11):
    

print("Jumlah 1 s/d 10:", total)`,
      expectedOutput: `Jumlah 1 s/d 10: 55`,
      hint: "Di dalam loop `for`, tulis: `total += i`",
      solutionCode: `total = 0

for i in range(1, 11):
    total += i

print("Jumlah 1 s/d 10:", total)`
    },
    {
      id: "bab10-exam-challenge13",
      title: "Ujian Praktik #13: Transformasi Data dengan List Comprehension (Bab 7)",
      difficulty: "Menantang",
      instructions:
        "Diberikan `daftar_angka = [2, 4, 6, 8]`. Buatlah `List` baru bernama `pangkat_dua` yang berisi hasil kuadrat (`x ** 2`) dari setiap elemen menggunakan *List Comprehension* satu baris!",
      tasks: [
        "Tulis `[x ** 2 for x in daftar_angka]`.",
        "Pastikan hasil cetakan adalah `[4, 16, 36, 64]`."
      ],
      starterCode: `daftar_angka = [2, 4, 6, 8]

# Gunakan List Comprehension 1 baris:
pangkat_dua = 

print("Hasil Kuadrat:", pangkat_dua)`,
      expectedOutput: `Hasil Kuadrat: [4, 16, 36, 64]`,
      hint: "Tulis: `pangkat_dua = [x ** 2 for x in daftar_angka]`",
      solutionCode: `daftar_angka = [2, 4, 6, 8]

pangkat_dua = [x ** 2 for x in daftar_angka]

print("Hasil Kuadrat:", pangkat_dua)`
    },
    {
      id: "bab10-exam-challenge14",
      title: "Ujian Praktik #14: Mengolah List, Set & Dictionary Sekaligus (Bab 8)",
      difficulty: "Menantang",
      instructions:
        "Diberikan `nilai_mentah = [80, 90, 80, 100, 90]`. Hapus nilai duplikat dengan mengubahnya menjadi `Set` (`nilai_unik = set(nilai_mentah)`), lalu simpan jumlah nilai tertinggi (`max`) dan terendah (`min`) ke dalam dictionary `rekap`!",
      tasks: [
        "Buat `nilai_unik = set(nilai_mentah)`.",
        "Isi `rekap['tertinggi'] = max(nilai_unik)` dan `rekap['terendah'] = min(nilai_unik)`."
      ],
      starterCode: `nilai_mentah = [80, 90, 80, 100, 90]
rekap = {}

# 1. Buat set nilai_unik dari nilai_mentah:
nilai_unik = 

# 2. Isi key 'tertinggi' dan 'terendah' pada dictionary rekap:
rekap["tertinggi"] = 
rekap["terendah"] = 

print("Banyak Nilai Unik:", len(nilai_unik))
print("Nilai Tertinggi  :", rekap["tertinggi"])
print("Nilai Terendah   :", rekap["terendah"])`,
      expectedOutput: `Banyak Nilai Unik: 3
Nilai Tertinggi  : 100
Nilai Terendah   : 80`,
      hint: "Gunakan `set(nilai_mentah)`, `max(nilai_unik)`, dan `min(nilai_unik)`.",
      solutionCode: `nilai_mentah = [80, 90, 80, 100, 90]
rekap = {}

nilai_unik = set(nilai_mentah)

rekap["tertinggi"] = max(nilai_unik)
rekap["terendah"] = min(nilai_unik)

print("Banyak Nilai Unik:", len(nilai_unik))
print("Nilai Tertinggi  :", rekap["tertinggi"])
print("Nilai Terendah   :", rekap["terendah"])`
    },
    {
      id: "bab10-exam-challenge15",
      title: "Ujian Praktik #15: Membuat Fungsi Rekap Nilai dengan *args & return 2 Nilai (Bab 9)",
      difficulty: "Menantang",
      instructions:
        "Buatlah fungsi `rekap_skor(*skor)` yang menerima sejumlah angka menggunakan `*skor` lalu mengembalikan 2 nilai sekaligus: `total` (`sum(skor)`) dan `banyak_data` (`len(skor)`)!",
      tasks: [
        "Hitung `total = sum(skor)` dan `banyak_data = len(skor)` di dalam fungsi.",
        "Kembalikan keduanya dengan `return total, banyak_data`."
      ],
      starterCode: `def rekap_skor(*skor):
    # Hitung total dan banyak_data, lalu return keduanya:
    

total_poin, jumlah_laga = rekap_skor(20, 35, 45, 50)
print(f"Total Poin : {total_poin}")
print(f"Jumlah Laga: {jumlah_laga}")`,
      expectedOutput: `Total Poin : 150
Jumlah Laga: 4`,
      hint: "Di dalam fungsi `rekap_skor`, tulis: `return sum(skor), len(skor)`",
      solutionCode: `def rekap_skor(*skor):
    return sum(skor), len(skor)

total_poin, jumlah_laga = rekap_skor(20, 35, 45, 50)
print(f"Total Poin : {total_poin}")
print(f"Jumlah Laga: {jumlah_laga}")`
    }
  ],
  quizzes: [
    {
      question: "Apakah output dari perintah `print('Python', '3', sep='-', end='!')`?",
      options: ["Python-3!", "Python 3!", "Python-3-!", "Python!3-"],
      correctIndex: 0,
      explanation: "Parameter `sep='-'` menyisipkan tanda hubung di antara `'Python'` dan `'3'`, sedangkan `end='!'` menutup cetakan dengan tanda seru."
    },
    {
      question: "Manakah di bawah ini yang merupakan nama variabel yang VALID dan sesuai standar PEP 8 (`snake_case`) di Python?",
      options: ["2_nama_siswa", "nama-siswa", "nama_siswa_aktif", "nama siswa"],
      correctIndex: 2,
      explanation: "Nama variabel hanya boleh menggunakan huruf, angka, dan garis bawah (`_`), serta tidak boleh diawali angka atau mengandung spasi/tanda minus."
    },
    {
      question: "Jika `kata = 'INDONESIA'`, apakah hasil dari ekspresi slicing `kata[:4]` dan `kata[-1]` secara berurutan?",
      options: ["'INDO' dan 'A'", "'INDON' dan 'I'", "'INDO' dan 'I'", "'NDON' dan 'A'"],
      correctIndex: 0,
      explanation: "`kata[:4]` mengambil karakter indeks 0, 1, 2, 3 (`'INDO'`), sedangkan `kata[-1]` mengambil karakter paling akhir (`'A'`)."
    },
    {
      question: "Berapakah hasil dari operasi matematika `17 // 5` dan `17 % 5` secara berurutan?",
      options: ["3.4 dan 2", "3 dan 2", "2 dan 3", "3 dan 5"],
      correctIndex: 1,
      explanation: "`17 // 5` menghasilkan pembagian bulat `3` (`3 * 5 = 15`), dan `17 % 5` menghasilkan sisa bagi `2` (`17 - 15 = 2`)."
    },
    {
      question: "Apa yang terjadi jika kita menjalankan kode `x = input(); y = input(); print(int(x) + int(y))` ketika pengguna mengetik `15` lalu `25`?",
      options: ["Mencetak 1525", "Mencetak 40", "Memicu TypeError", "Mencetak '15 + 25'"],
      correctIndex: 1,
      explanation: "Karena kedua hasil `input()` sudah dikonversi menjadi integer menggunakan `int()`, operator `+` melakukan penjumlahan matematika `15 + 25 = 40`."
    },
    {
      question: "Pada struktur percabangan `if - elif - else`, kapan blok kode di dalam `else:` akan dijalankan?",
      options: [
        "Selalu dijalankan di setiap akhir program",
        "Hanya ketika kondisi if pertama bernilai True",
        "Ketika SEMUA kondisi if dan elif di atasnya bernilai False",
        "Ketika terdapat kesalahan sintaks di dalam elif"
      ],
      correctIndex: 2,
      explanation: "Blok `else:` adalah cabang terakhir yang hanya dieksekusi apabila seluruh kondisi `if` dan `elif` di atasnya bernilai `False`."
    },
    {
      question: "Deretan angka apakah yang dihasilkan oleh fungsi `range(1, 10, 3)`?",
      options: ["1, 4, 7", "1, 4, 7, 10", "1, 3, 6, 9", "0, 3, 6, 9"],
      correctIndex: 0,
      explanation: "`range(1, 10, 3)` dimulai dari `1`, bertambah `3` setiap langkah (`1, 4, 7`), dan berhenti sebelum mencapai batas `10`."
    },
    {
      question: "Di dalam perulangan `while` atau `for`, perintah apakah yang digunakan untuk melewati sisa kode pada putaran saat ini dan langsung melompat ke putaran berikutnya?",
      options: ["break", "skip", "continue", "return"],
      correctIndex: 2,
      explanation: "Perintah `continue` melompati sisa kode pada iterasi saat ini dan langsung melanjutkan ke iterasi berikutnya, sedangkan `break` menghentikan seluruh loop."
    },
    {
      question: "Pasangan karakteristik manakah yang TEPAT mengenai struktur data di Python?",
      options: [
        "List tidak bisa diubah (immutable), sedangkan Tuple bisa diubah (mutable)",
        "Set otomatis menghapus elemen duplikat, sedangkan Tuple tidak bisa diubah (immutable)",
        "Dictionary menggunakan indeks angka 0, 1, 2 dan tidak memiliki key",
        "Tuple menggunakan kurung kurawal {} dan menyimpan pasangan key: value"
      ],
      correctIndex: 1,
      explanation: "`Set` `{...}` selalu menyimpan elemen unik (tanpa duplikat), sedangkan `Tuple` `(...)` bersifat *immutable* (tidak dapat diubah setelah dibuat)."
    },
    {
      question: "Apa output dari kode fungsi berikut: `def hitung(a, b=5): return a * b` jika dipanggil dengan `print(hitung(4))`?",
      options: ["4", "9", "20", "TypeError"],
      correctIndex: 2,
      explanation: "Saat dipanggil `hitung(4)`, parameter `a` bernilai `4` dan parameter `b` menggunakan nilai default `5`, sehingga `4 * 5` menghasilkan `20`."
    }
  ]
};

