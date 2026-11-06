import { DocSection } from "../types";

export const bab4Operator: DocSection = {
  id: "bab4-operator",
  number: 4,
  filePath: "app/data/chapters/bab4-operator.ts",
  title: "Operator Matematika, Perbandingan & Logika",
  subtitle:
    "Menguasai seluruh operator perhitungan aritmatika (`+`, `-`, `*`, `/`, `//`, `%`, `**`), penugasan (`+=`, `-=`, `*=`), perbandingan (`==`, `!=`, `>=`), logika (`and`, `or`, `not`), serta keanggotaan (`in`, `not in`).",
  level: "Pemula",
  readTime: "11 menit",
  summary:
    "Operator adalah simbol khusus yang memberi instruksi kepada Python untuk melakukan perhitungan matematika, membandingkan dua nilai, atau menguji logika kebenaran. Pemahaman yang kuat tentang operator sangat penting karena akan selalu dipakai di dalam rumus perhitungan, percabangan (`if`), dan perulangan (`while`).",
  keyPoints: [
    "Operator Aritmatika: `+` (tambah), `-` (kurang), `*` (kali), `/` (pembagian desimal `float`), `//` (pembagian bulat ke bawah / *floor division*), `%` (sisa bagi / *modulo*), dan `**` (perpangkatan).",
    "Operator Assignment Gabungan: `x += 5` sama artinya dengan `x = x + 5`. Berlaku juga untuk `x -= 3` (`x = x - 3`), `x *= 2` (`x = x * 2`), dan `x /= 2`.",
    "Operator Perbandingan: `==` (sama dengan), `!=` (tidak sama dengan), `>`, `<`, `>=`, `<=` selalu menghasilkan nilai boolean `True` atau `False`.",
    "Operator Logika: `and` (`True` hanya jika kedua kondisi `True`), `or` (`True` jika minimal salah satu kondisi `True`), dan `not` (membalik `True` menjadi `False` dan sebaliknya).",
    "Operator Keanggotaan: `in` memeriksa apakah sebuah teks/elemen ada di dalam koleksi, sedangkan `not in` memeriksa apakah elemen tersebut TIDAK ada."
  ],
  conceptTable: {
    title: "Tabel Lengkap Operator Matematika, Logika & Keanggotaan",
    headers: ["Operator", "Nama Operasi", "Contoh Kode", "Hasil", "Penjelasan Singkat"],
    rows: [
      ["/", "Pembagian Biasa", "15 / 4", "3.75", "Selalu menghasilkan tipe data `float` (desimal)."],
      ["//", "Floor Division", "15 // 4", "3", "Membagi lalu membulatkan hasilnya ke bawah (tanpa desimal)."],
      ["%", "Modulo (Sisa Bagi)", "15 % 4", "3", "Karena `15 = (4 * 3) + 3`, maka sisa pembagiannya adalah `3`."],
      ["**", "Perpangkatan", "2 ** 10", "1024", "Menghitung 2 pangkat 10."],
      ["+=, -=, *=", "Assignment Gabungan", "skor += 30", "skor + 30", "Menambah, mengurangi, atau mengalikan nilai variabel secara langsung."],
      ["and, or, not", "Operator Logika", "True and False", "False", "Menggabungkan beberapa ekspresi boolean sekaligus."],
      ["in, not in", "Operator Keanggotaan", "'py' in 'python'", "True", "Mengecek apakah substring ada (`in`) atau tidak ada (`not in`)."]
    ]
  },
  examples: [
    {
      id: "bab4-ex1",
      title: "1. Operator Aritmatika Lengkap (/, //, %, **)",
      description:
        "Perhatikan perbedaan antara pembagian biasa (`/`), pembagian bulat (`//`), sisa bagi (`%`), dan perpangkatan (`**`).",
      code: `total_permen = 47
kapasitas_kotak = 6

# Pembagian biasa (/), pembagian bulat (//), dan sisa bagi (%)
hasil_desimal = total_permen / kapasitas_kotak
kotak_penuh = total_permen // kapasitas_kotak
sisa_permen = total_permen % kapasitas_kotak

print(f"47 / 6  = {hasil_desimal:.2f} (pembagian biasa)")
print(f"47 // 6 = {kotak_penuh} kotak penuh (pembagian bulat //)")
print(f"47 % 6  = {sisa_permen} permen tersisa (modulo %)")

# Operator perpangkatan (**)
pangkat_dua = 2 ** 10
print(f"2 ** 10 = {pangkat_dua} (2 pangkat 10)")

# Mengecek bilangan genap dengan modulo (% 2 == 0)
angka = 28
print(f"Apakah {angka} genap? {angka % 2 == 0}")`,
      output: `47 / 6  = 7.83 (pembagian biasa)
47 // 6 = 7 kotak penuh (pembagian bulat //)
47 % 6  = 5 permen tersisa (modulo %)
2 ** 10 = 1024 (2 pangkat 10)
Apakah 28 genap? True`,
      lineExplanations: [
        {
          line: "kotak_penuh = total_permen // kapasitas_kotak",
          explanation: "Operator `//` membagi 47 dengan 6 dan mengambil bagian bulatnya saja (`7`)."
        },
        {
          line: "sisa_permen = total_permen % kapasitas_kotak",
          explanation: "Operator `%` menghitung sisa dari 47 dibagi 6. Karena `7 * 6 = 42`, sisanya adalah `47 - 42 = 5`."
        },
        {
          line: "pangkat_dua = 2 ** 10",
          explanation: "Operator `**` digunakan untuk perpangkatan (2 dipangkatkan 10 menghasilkan `1024`)."
        }
      ]
    },
    {
      id: "bab4-ex2",
      title: "2. Operator Assignment Gabungan (+=, -=, *=)",
      description:
        "Cara ringkas memperbarui nilai variabel secara berurutan tanpa harus mengetik ulang nama variabelnya.",
      code: `skor = 100
print("Skor awal              :", skor)

skor += 50   # Sama artinya dengan: skor = skor + 50
print("Setelah bonus (+= 50)  :", skor)

skor -= 30   # Sama artinya dengan: skor = skor - 30
print("Setelah penalti (-= 30):", skor)

skor *= 2    # Sama artinya dengan: skor = skor * 2
print("Setelah lipat 2 (*= 2) :", skor)`,
      output: `Skor awal              : 100
Setelah bonus (+= 50)  : 150
Setelah penalti (-= 30): 120
Setelah lipat 2 (*= 2) : 240`,
      lineExplanations: [
        {
          line: "skor += 50",
          explanation: "Menambahkan `50` ke nilai `skor` saat ini (`100 + 50 = 150`) dan menyimpannya kembali ke `skor`."
        },
        {
          line: "skor *= 2",
          explanation: "Mengalikan nilai `skor` saat ini dengan `2` (`120 * 2 = 240`)."
        }
      ]
    },
    {
      id: "bab4-ex3",
      title: "3. Operator Perbandingan, Logika (and, or, not) & Keanggotaan (in, not in)",
      description:
        "Menggabungkan syarat menggunakan `and`, `or`, `not`, serta memeriksa kata di dalam string dengan `in` dan `not in`.",
      code: `total_belanja = 150000
member_vip = False
memakai_kupon = True

# Menggabungkan perbandingan (>=) dengan logika and & or
berhak_diskon = (total_belanja >= 100000) and (member_vip or memakai_kupon)
print("Berhak mendapat diskon? :", berhak_diskon)
print("Kebalikan (not)         :", not berhak_diskon)

# Operator Keanggotaan: in dan not in
email = "admin@pydocs.id"
print("Ada kata 'admin' (in)?  :", "admin" in email)
print("Bebas spasi (not in)?   :", " " not in email)`,
      output: `Berhak mendapat diskon? : True
Kebalikan (not)         : False
Ada kata 'admin' (in)?  : True
Bebas spasi (not in)?   : True`,
      lineExplanations: [
        {
          line: "berhak_diskon = (total_belanja >= 100000) and (member_vip or memakai_kupon)",
          explanation: "Bagian kiri `total_belanja >= 100000` bernilai `True`, dan bagian kanan `(member_vip or memakai_kupon)` bernilai `True`, sehingga hasil `and` adalah `True`."
        },
        {
          line: '"admin" in email',
          explanation: "Operator `in` menghasilkan `True` karena teks `'admin'` ditemukan di dalam `email`."
        },
        {
          line: '" " not in email',
          explanation: "Operator `not in` menghasilkan `True` karena karakter spasi `' '` memang TIDAK ada di dalam `email`."
        }
      ]
    }
  ],
  tips: [
    "Gunakan tanda kurung `(...)` saat menggabungkan operator `and` dan `or` agar urutan evaluasi logikanya jelas dan mudah dibaca.",
    "Ingat perbedaan `=` (mengisi nilai ke variabel) dan `==` (membandingkan apakah dua nilai sama)."
  ],
  commonMistakes: [
    {
      wrong: "x = 10\nprint(x = 10)  # Bermaksud membandingkan kesamaan",
      correct: "x = 10\nprint(x == 10)",
      reason: "Satu tanda sama dengan (`=`) adalah operator pengisian variabel, sedangkan dua tanda sama dengan (`==`) adalah operator perbandingan."
    },
    {
      wrong: "pangkat = 2 ^ 3  # Mengira ^ adalah pangkat",
      correct: "pangkat = 2 ** 3",
      reason: "Di Python, operator perpangkatan adalah `**` (dua bintang), bukan `^`."
    }
  ],
  caseStudies: [
    {
      id: "bab4-case1",
      title: "Pengemasan Karton Susu di Pabrik Minuman (// dan %)",
      difficulty: "Mudah",
      scenario:
        "Mesin pengemas di pabrik minuman memproduksi `250` botol susu segar setiap jam. Setiap karton pengiriman hanya dapat memuat tepat `12` botol. Kepala gudang perlu mengetahui berapa karton penuh yang siap diangkut ke truk dan berapa botol sisa yang menunggu kloter berikutnya.",
      instructions:
        "Hitung `karton_penuh` menggunakan operator pembagian bulat (`//`) dan `botol_sisa` menggunakan operator modulo (`%`)!",
      tasks: [
        "Gunakan `produksi_botol // isi_per_karton` untuk menghitung `karton_penuh`.",
        "Gunakan `produksi_botol % isi_per_karton` untuk menghitung `botol_sisa`."
      ],
      starterCode: `produksi_botol = 250
isi_per_karton = 12

# Hitung karton_penuh (//) dan botol_sisa (%):
karton_penuh = 
botol_sisa = 

print(f"Karton Siap Kirim : {karton_penuh} karton")
print(f"Sisa Botol        : {botol_sisa} botol")`,
      expectedOutput: `Karton Siap Kirim : 20 karton
Sisa Botol        : 10 botol`,
      hint: "Tulis `karton_penuh = produksi_botol // isi_per_karton` dan `botol_sisa = produksi_botol % isi_per_karton`.",
      solutionCode: `produksi_botol = 250
isi_per_karton = 12

karton_penuh = produksi_botol // isi_per_karton
botol_sisa = produksi_botol % isi_per_karton

print(f"Karton Siap Kirim : {karton_penuh} karton")
print(f"Sisa Botol        : {botol_sisa} botol")`
    },
    {
      id: "bab4-case2",
      title: "Verifikasi Otomatis Peminjaman Buku Perpustakaan Kota",
      difficulty: "Sedang",
      scenario:
        "Mesin peminjaman mandiri di Perpustakaan Kota hanya mengizinkan pengunjung meminjam buku baru apabila pengunjung tersebut sedang meminjam kurang dari 3 buku (`buku_dipinjam < 3`), tidak memiliki denda tertunggak (`denda == 0`), dan status kartunya mengandung kata `'Aktif'`.",
      instructions:
        "Gunakan operator perbandingan (`<`, `==`), operator logika `and`, serta operator keanggotaan `in` untuk menentukan nilai boolean `izinkan_pinjam`!",
      tasks: [
        "Gabungkan ketiga syarat `(buku_dipinjam < 3)`, `(denda == 0)`, dan `('Aktif' in status_kartu)` menggunakan `and`."
      ],
      starterCode: `buku_dipinjam = 2
denda = 0
status_kartu = "Member Perpustakaan - Aktif"

# Tulis ekspresi logika untuk izinkan_pinjam:
izinkan_pinjam = 

print("Peminjaman Diizinkan:", izinkan_pinjam)`,
      expectedOutput: `Peminjaman Diizinkan: True`,
      hint: 'Tulis: `izinkan_pinjam = (buku_dipinjam < 3) and (denda == 0) and ("Aktif" in status_kartu)`',
      solutionCode: `buku_dipinjam = 2
denda = 0
status_kartu = "Member Perpustakaan - Aktif"

izinkan_pinjam = (buku_dipinjam < 3) and (denda == 0) and ("Aktif" in status_kartu)

print("Peminjaman Diizinkan:", izinkan_pinjam)`
    }
  ],
  codingChallenges: [
    {
      id: "bab4-challenge1",
      title: "Membagi Permen ke Dalam Kotak (// dan %)",
      difficulty: "Mudah",
      instructions:
        "Terdapat 47 buah permen yang akan dimasukkan ke dalam kotak, di mana setiap kotak berisi tepat 6 permen. Hitung berapa kotak penuh yang terbentuk menggunakan `//` dan berapa sisa permen yang tidak muat menggunakan `%`.",
      tasks: [
        "Hitung `jumlah_kotak` menggunakan operator pembagian bulat (`//`).",
        "Hitung `sisa_permen` menggunakan operator modulo (`%`)."
      ],
      starterCode: `total_permen = 47
kapasitas_kotak = 6

# Lengkapi rumus di bawah ini:
jumlah_kotak = 
sisa_permen = 

print(f"Kotak penuh : {jumlah_kotak}")
print(f"Sisa permen : {sisa_permen}")`,
      expectedOutput: `Kotak penuh : 7
Sisa permen : 5`,
      hint: "Gunakan `total_permen // kapasitas_kotak` dan `total_permen % kapasitas_kotak`.",
      solutionCode: `total_permen = 47
kapasitas_kotak = 6

jumlah_kotak = total_permen // kapasitas_kotak
sisa_permen = total_permen % kapasitas_kotak

print(f"Kotak penuh : {jumlah_kotak}")
print(f"Sisa permen : {sisa_permen}")`
    },
    {
      id: "bab4-challenge2",
      title: "Menghitung Pangkat Bilangan (**)",
      difficulty: "Mudah",
      instructions:
        "Hitung nilai dari 2 pangkat 10 menggunakan operator perpangkatan (`**`) dan simpan ke dalam variabel `hasil_pangkat`!",
      tasks: [
        "Gunakan operator `**` untuk menghitung `2 ** 10`.",
        "Pastikan hasil cetakan adalah `2 pangkat 10 = 1024`."
      ],
      starterCode: `# Hitung 2 pangkat 10 dengan operator **:
hasil_pangkat = 

print("2 pangkat 10 =", hasil_pangkat)`,
      expectedOutput: `2 pangkat 10 = 1024`,
      hint: "Tulis: `hasil_pangkat = 2 ** 10`",
      solutionCode: `hasil_pangkat = 2 ** 10

print("2 pangkat 10 =", hasil_pangkat)`
    },
    {
      id: "bab4-challenge3",
      title: "Verifikasi Syarat Diskon Toko Online (and & or)",
      difficulty: "Sedang",
      instructions:
        "Pelanggan berhak mendapatkan diskon apabila `total_belanja >= 100000` DAN (`member_vip` ATAU `memakai_kupon`). Tulis ekspresi logikanya!",
      tasks: [
        "Gunakan operator perbandingan `>=` serta operator logika `and` dan `or`.",
        "Pastikan hasil akhirnya bernilai `True`."
      ],
      starterCode: `total_belanja = 120000
member_vip = False
memakai_kupon = True

# Tulis rumus logika untuk berhak_diskon:
berhak_diskon = 

print("Berhak mendapat diskon?", berhak_diskon)`,
      expectedOutput: `Berhak mendapat diskon? True`,
      hint: "Tulis: `(total_belanja >= 100000) and (member_vip or memakai_kupon)`",
      solutionCode: `total_belanja = 120000
member_vip = False
memakai_kupon = True

berhak_diskon = (total_belanja >= 100000) and (member_vip or memakai_kupon)

print("Berhak mendapat diskon?", berhak_diskon)`
    },
    {
      id: "bab4-challenge4",
      title: "Memperbarui Skor Game dengan Assignment Gabungan (+=, *=)",
      difficulty: "Sedang",
      instructions:
        "Skor awal pemain adalah `50`. Tambahkan 30 poin menggunakan `+= 30`, kemudian kalikan total skornya dengan 2 menggunakan `*= 2`!",
      tasks: [
        "Gunakan `skor += 30` pada langkah pertama.",
        "Gunakan `skor *= 2` pada langkah kedua."
      ],
      starterCode: `skor = 50

# 1. Tambah skor sebesar 30 dengan +=:

# 2. Kalikan skor dengan 2 menggunakan *=:


print("Skor Akhir Pemain:", skor)`,
      expectedOutput: `Skor Akhir Pemain: 160`,
      hint: "Tulis `skor += 30` di baris pertama, lalu `skor *= 2` di baris berikutnya.",
      solutionCode: `skor = 50

skor += 30
skor *= 2

print("Skor Akhir Pemain:", skor)`
    },
    {
      id: "bab4-challenge5",
      title: "Mengecek Kata Kunci dengan Operator Keanggotaan (in & not in)",
      difficulty: "Menantang",
      instructions:
        "Periksa apakah kata `'admin'` terdapat di dalam variabel `email` menggunakan operator `in`, dan pastikan tidak ada spasi (`' '`) di dalam `email` menggunakan `not in`!",
      tasks: [
        "Isi `adalah_admin` dengan pengecekan `'admin' in email`.",
        "Isi `tanpa_spasi` dengan pengecekan `' ' not in email`."
      ],
      starterCode: `email = "admin@pydocs.id"

# Gunakan operator in dan not in:
adalah_admin = 
tanpa_spasi = 

print("Apakah email admin? :", adalah_admin)
print("Apakah bebas spasi? :", tanpa_spasi)`,
      expectedOutput: `Apakah email admin? : True
Apakah bebas spasi? : True`,
      hint: 'Tulis `adalah_admin = "admin" in email` dan `tanpa_spasi = " " not in email`',
      solutionCode: `email = "admin@pydocs.id"

adalah_admin = "admin" in email
tanpa_spasi = " " not in email

print("Apakah email admin? :", adalah_admin)
print("Apakah bebas spasi? :", tanpa_spasi)`
    }
  ],
  quizzes: [
    {
      question: "Apakah hasil dari ekspresi logika `(10 > 5) and (4 == 5)`?",
      options: ["True", "False", "10", "Error"],
      correctIndex: 1,
      explanation: "Meskipun `(10 > 5)` bernilai `True`, `(4 == 5)` bernilai `False`. Pada operator `and`, jika salah satu bernilai `False` maka hasil akhirnya adalah `False`."
    },
    {
      question: "Berapakah hasil dari operasi `20 // 6` dan `20 % 6` secara berurutan?",
      options: ["3.33 dan 2", "3 dan 2", "2 dan 3", "3 dan 4"],
      correctIndex: 1,
      explanation: "`20 // 6` menghasilkan `3` bulat (`3 * 6 = 18`) dan `20 % 6` menyisakan `2` (`20 - 18 = 2`)."
    },
    {
      question: "Operator manakah yang digunakan untuk menghitung perpangkatan (misalnya 5 pangkat 3) di Python?",
      options: ["5 ^ 3", "5 ** 3", "5 * 3", "5 // 3"],
      correctIndex: 1,
      explanation: "Di Python, operator perpangkatan adalah dua tanda bintang (`**`)."
    },
    {
      question: "Jika awalnya `x = 12`, berapakah nilai `x` setelah menjalankan `x -= 5`?",
      options: ["17", "7", "-5", "12"],
      correctIndex: 1,
      explanation: "`x -= 5` adalah bentuk singkat dari `x = x - 5`, sehingga `12 - 5 = 7`."
    },
    {
      question: "Apa hasil dari ekspresi `'py' in 'python'`?",
      options: ["True", "False", "0", "'py'"],
      correctIndex: 0,
      explanation: "Operator `in` memeriksa apakah teks `'py'` terdapat di dalam `'python'`, dan hasilnya adalah `True`."
    }
  ]
};
