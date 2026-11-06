import { DocSection } from "../types";

export const bab1Pengenalan: DocSection = {
  id: "bab1-pengenalan",
  number: 1,
  filePath: "app/data/chapters/bab1-pengenalan.ts",
  title: "Pengenalan Python & Fungsi print()",
  subtitle:
    "Memahami karakteristik bahasa Python, cara kerja fungsi `print()`, parameter `sep` & `end`, komentar `#`, serta karakter escape `\\n`, `\\t`, dan `\\\"`.",
  level: "Pemula",
  readTime: "10 menit",
  summary:
    "Python adalah bahasa pemrograman tingkat tinggi yang dibuat oleh Guido van Rossum pada tahun 1991. Python sangat populer untuk pengembangan web, kecerdasan buatan (AI), analisis data, dan otomasi karena sintaksnya yang bersih dan menyerupai bahasa manusia. Berbeda dengan bahasa C++ atau Java yang mewajibkan titik koma (`;`) dan kurung kurawal `{}`, Python menggunakan baris baru dan indentasi (spasi) untuk mengatur struktur blok kode. Fungsi paling dasar yang wajib dikuasai pertama kali adalah `print()` untuk menampilkan data ke layar.",
  keyPoints: [
    "Gunakan fungsi `print()` (huruf kecil semua) untuk menampilkan teks, angka, atau hasil perhitungan ke layar terminal.",
    "Teks (`str`) wajib diapit oleh tanda kutip ganda (`\"...\"`) atau kutip tunggal (`'...'`).",
    "Jika kita mengirim beberapa nilai ke dalam `print(\"A\", \"B\", \"C\")` yang dipisahkan koma (`,`), Python otomatis memisahkannya dengan spasi.",
    "Parameter `sep='...'` di dalam `print()` mengubah pemisah antar kata (bawaannya spasi `' '`), sedangkan parameter `end='...'` mengubah akhiran baris (bawaannya pindah baris `'\\n'`).",
    "Komentar một baris diawali tanda pagar (`#`) dan diabaikan sepenuhnya oleh Python saat program dijalankan.",
    "Karakter Escape diawali garis miring terbalik (`\\`), seperti `\\n` (baris baru), `\\t` (tab), dan `\\\"` (menampilkan tanda kutip ganda di dalam string)."
  ],
  conceptTable: {
    title: "Daftar Fitur print() & Karakter Escape yang Wajib Dikuasai",
    headers: ["Sintaks / Kode", "Nama Fitur", "Fungsi & Contoh Penggunaan"],
    rows: [
      ['print("Halo")', "Cetak Teks", "Mencetak teks string ke layar lalu otomatis pindah ke baris baru."],
      ['print("A", "B", sep="-")', "Parameter sep", "Mengganti spasi pemisah antar argumen menjadi '-' sehingga mencetak A-B."],
      ['print("Halo", end=" ")', "Parameter end", "Mencegah print() pindah ke baris baru dan menggantinya dengan spasi di akhir."],
      ["\\n", "Escape Newline", 'Membuat baris baru di tengah teks, contoh: print("Baris 1\\nBaris 2").'],
      ["\\t", "Escape Tab", 'Memberikan jarak tabulasi (Tab), contoh: print("Nama:\\tBudi").'],
      ['\\"', "Escape Kutip Ganda", 'Mencetak tanda kutip ganda di dalam string kutip ganda: print("Dia berkata, \\"Halo!\\"").']
    ]
  },
  examples: [
    {
      id: "bab1-ex1",
      title: "1. Dasar Penggunaan print() & Komentar (#)",
      description:
        "Fungsi `print()` dapat mencetak satu kalimat, beberapa kata sekaligus yang dipisahkan tanda koma (`,`), maupun angka hasil perhitungan matematika secara langsung.",
      code: `# Baris yang diawali tanda # adalah komentar dan tidak dieksekusi
print("Halo, saya sedang belajar Python!")
print("Target saya: Menguasai dasar Python.")

# Mencetak beberapa teks sekaligus (dipisahkan tanda koma)
print("Belajar", "Python", "Mulai", "Dari", "Dasar")

# Mencetak angka dan perhitungan matematika tanpa tanda kutip
print("Tahun belajar:", 2026)
print("Hasil 25 + 75 =", 25 + 75)`,
      output: `Halo, saya sedang belajar Python!
Target saya: Menguasai dasar Python.
Belajar Python Mulai Dari Dasar
Tahun belajar: 2026
Hasil 25 + 75 = 100`,
      lineExplanations: [
        {
          line: "# Baris yang diawali tanda # adalah komentar...",
          explanation: "Komentar menggunakan simbol `#` hanya berfungsi sebagai catatan bagi programmer dan diabaikan oleh Python."
        },
        {
          line: 'print("Belajar", "Python", "Mulai", "Dari", "Dasar")',
          explanation: "Memisahkan beberapa nilai dengan koma (`,`) di dalam `print()` otomatis memberi jarak 1 spasi di antara kata."
        },
        {
          line: 'print("Hasil 25 + 75 =", 25 + 75)',
          explanation: "Angka dan operasi matematika ditulis tanpa tanda kutip agar dihitung hasilnya terlebih dahulu oleh Python."
        }
      ]
    },
    {
      id: "bab1-ex2",
      title: "2. Mengatur Pemisah Kata (sep) dan Akhiran Baris (end)",
      description:
        "Secara bawaan, `print()` memisahkan setiap argumen dengan spasi (`sep=' '`) dan mengakhiri cetakan dengan baris baru (`end='\\n'`). Kita bisa mengubah keduanya sesuai kebutuhan.",
      code: `# 1. Parameter sep: mengubah pemisah spasi menjadi tanda titik dua (:) atau tanda hubung (-)
print("08", "30", "00", sep=":")
print("2026", "11", "06", sep="-")

# 2. Parameter end: mencegah print() pindah ke baris baru
print("Belajar Python", end=" ")
print("Sangat Seru!")`,
      output: `08:30:00
2026-11-06
Belajar Python Sangat Seru!`,
      lineExplanations: [
        {
          line: 'print("08", "30", "00", sep=":")',
          explanation: "Parameter `sep=\":\"` menyambungkan ketiga teks menggunakan tanda titik dua sehingga menghasilkan `08:30:00`."
        },
        {
          line: 'print("Belajar Python", end=" ")',
          explanation: "Parameter `end=\" \"` membuat akhir cetakan tidak turun ke baris baru, melainkan disambung dengan spasi oleh `print()` di bawahnya."
        }
      ]
    },
    {
      id: "bab1-ex3",
      title: "3. Karakter Escape Baris Baru (\\n) dan Tabulasi (\\t)",
      description:
        "Kita dapat mencetak beberapa baris sekaligus hanya dengan satu perintah `print()` menggunakan `\\n`, atau merapikan posisi titik dua menggunakan `\\t`.",
      code: `# Mencetak 3 baris ke bawah hanya dengan satu print() menggunakan \\n
print("Apel\\nJeruk\\nMangga")

print("-" * 30)

# Merapikan tampilan biodata dengan kombinasi \\n dan \\t
print("Biodata Peserta:\\nNama\\t: Budi Santoso\\nKota\\t: Bandung")`,
      output: `Apel
Jeruk
Mangga
------------------------------
Biodata Peserta:
Nama	: Budi Santoso
Kota	: Bandung`,
      lineExplanations: [
        {
          line: 'print("Apel\\nJeruk\\nMangga")',
          explanation: "Setiap kali Python menemukan `\\n` di dalam string, teks setelahnya langsung diturunkan ke baris baru."
        },
        {
          line: 'print("Biodata Peserta:\\nNama\\t: Budi Santoso...")',
          explanation: "Karakter `\\t` memberikan jarak tabulasi horizontal supaya posisi tanda titik dua (`:`) sejajar rapi."
        }
      ]
    },
    {
      id: "bab1-ex4",
      title: "4. Mencetak Tanda Kutip di Dalam Kalimat (\\\" atau Kutip Tunggal)",
      description:
        "Bagaimana jika kita ingin mencetak tanda kutip ganda `\"` di dalam teks? Ada 2 cara mudah: gunakan garis miring terbalik SEBELUM tanda kutip (`\\\"`), atau apit bagian luar string dengan kutip tunggal (`'...'`).",
      code: `# Cara 1: Menggunakan karakter escape \\" (garis miring terbalik SEBELUM tanda kutip)
print("Guru berkata, \\"Python itu mudah!\\"")

# Cara 2: Mengapit string luar dengan kutip tunggal '...'
print('Guru berkata, "Python itu mudah!"')

# Mencetak teks beberapa baris dengan tiga tanda kutip """
print("""Catatan Penting:
- Gunakan \\" untuk kutip ganda di dalam "..."
- Atau gunakan '...' di bagian luar""")`,
      output: `Guru berkata, "Python itu mudah!"
Guru berkata, "Python itu mudah!"
Catatan Penting:
- Gunakan " untuk kutip ganda di dalam "..."
- Atau gunakan '...' di bagian luar`,
      lineExplanations: [
        {
          line: 'print("Guru berkata, \\"Python itu mudah!\\"")',
          explanation: "Perhatikan urutan penulisannya: garis miring terbalik ditulis SEBELUM tanda kutip (`\\\"`), bukan sesudahnya (`\"\\`)."
        },
        {
          line: 'print(\'Guru berkata, "Python itu mudah!"\')',
          explanation: "Jika bagian luar string memakai kutip tunggal `'...'`, maka tanda kutip ganda `\"...\"` di dalamnya bisa langsung ditulis tanpa `\\`."
        }
      ]
    }
  ],
  tips: [
    "Python bersifat *case-sensitive* (membedakan huruf besar dan kecil). Selalu tulis `print()` dengan huruf kecil semua.",
    "Saat menulis escape quote `\\\"`, pastikan tanda `\\` berada tepat **di depan** tanda kutip yang ingin ditampilkan, contoh: `\\\"Python\\\"`."
  ],
  commonMistakes: [
    {
      wrong: 'print("Guru berkata, "\\Python itu mudah!\\"")',
      correct: 'print("Guru berkata, \\"Python itu mudah!\\"")',
      reason: "Menaruh tanda kutip sebelum garis miring (\"\\) menutup string terlalu cepat dan menyebabkan SyntaxError. Tulis garis miring terbalik terlebih dahulu: \\\"."
    },
    {
      wrong: 'Print("Halo Python")',
      correct: 'print("Halo Python")',
      reason: "Menulis huruf P kapital pada Print() akan menghasilkan NameError karena fungsi bawaan Python selalu menggunakan huruf kecil."
    }
  ],
  caseStudies: [
    {
      id: "bab1-case1",
      title: "Mencetak Tiket Antrian Klinik Kesehatan",
      difficulty: "Mudah",
      scenario:
        "Sebuah mesin antrian otomatis di Klinik Sehat Sentosa perlu mencetak struk nomor antrian pasien yang menampilkan nama klinik, nomor urut dengan jarak tabulasi (`\\t`), serta kutipan slogan pelayanan menggunakan karakter escape `\\\"` dan `\\n`.",
      instructions:
        "Gunakan fungsi `print()` beserta karakter escape `\\n`, `\\t`, dan `\\\"` untuk mencetak struk antrian persis seperti pada Target Output!",
      tasks: [
        'Cetak baris pertama: `=== KLINIK SEHAT SENTOSA ===`',
        'Cetak baris kedua dengan tabulasi `\\t`: `No. Antrian\\t: A-015`',
        'Cetak baris ketiga dengan escape quote `\\"`: `Slogan\\t\\t: "Melayani Sepenuh Hati"`'
      ],
      starterCode: `# Gunakan print() dengan \\n, \\t, dan \\" sesuai Target Output:
print("=== KLINIK SEHAT SENTOSA ===")
print("No. Antrian\\t: A-015")
# Lengkapi baris ketiga di bawah ini:
`,
      expectedOutput: `=== KLINIK SEHAT SENTOSA ===
No. Antrian\t: A-015
Slogan\t\t: "Melayani Sepenuh Hati"`,
      hint: 'Tambahkan `print("Slogan\\t\\t: \\"Melayani Sepenuh Hati\\"")` pada baris terakhir.',
      solutionCode: `print("=== KLINIK SEHAT SENTOSA ===")
print("No. Antrian\\t: A-015")
print("Slogan\\t\\t: \\"Melayani Sepenuh Hati\\"")`
    },
    {
      id: "bab1-case2",
      title: "Layar Papan Informasi Rute Kereta Api di Stasiun",
      difficulty: "Sedang",
      scenario:
        "Layar informasi digital di Stasiun Gambir menampilkan rute perjalanan kereta api (`Gambir -> Cirebon -> Yogyakarta`) menggunakan pemisah `sep=' -> '` dan langsung menyambung status keberangkatan di baris yang sama menggunakan `end=' [TEPAT WAKTU]\\n'`.",
      instructions:
        "Lengkapi parameter `sep` dan `end` pada perintah `print()` pertama agar menampilkan rute beserta status keberangkatan persis seperti Target Output!",
      tasks: [
        "Gunakan parameter `sep=\" -> \"` untuk memisahkan ketiga nama stasiun.",
        "Gunakan parameter `end=\" [TEPAT WAKTU]\\n\"` di akhir perintah `print()` tersebut."
      ],
      starterCode: `# Lengkapi parameter sep dan end pada fungsi print di bawah ini:
print("Gambir", "Cirebon", "Yogyakarta")`,
      expectedOutput: `Gambir -> Cirebon -> Yogyakarta [TEPAT WAKTU]`,
      hint: 'Tulis: `print("Gambir", "Cirebon", "Yogyakarta", sep=" -> ", end=" [TEPAT WAKTU]\\n")`',
      solutionCode: `print("Gambir", "Cirebon", "Yogyakarta", sep=" -> ", end=" [TEPAT WAKTU]\\n")`
    }
  ],
  codingChallenges: [
    {
      id: "bab1-challenge1",
      title: "Mencetak Kartu Perkenalan Diri",
      difficulty: "Mudah",
      instructions:
        "Lengkapi kode Python di bawah ini menggunakan fungsi `print()` untuk menampilkan dua baris perkenalan sesuai dengan Target Output (lihat Contoh 1 pada materi di atas).",
      tasks: [
        'Cetak baris pertama: `Halo, saya sedang belajar Python!`',
        'Cetak baris kedua: `Target saya: Menguasai dasar Python.`'
      ],
      starterCode: `# Tulis 2 perintah print() di bawah ini:
print("Halo, saya sedang belajar Python!")
# Lengkapi baris kedua di bawah:
`,
      expectedOutput: `Halo, saya sedang belajar Python!
Target saya: Menguasai dasar Python.`,
      hint: 'Tambahkan `print("Target saya: Menguasai dasar Python.")` pada baris berikutnya.',
      solutionCode: `print("Halo, saya sedang belajar Python!")
print("Target saya: Menguasai dasar Python.")`
    },
    {
      id: "bab1-challenge2",
      title: "Format Jam Digital dengan Parameter sep",
      difficulty: "Mudah",
      instructions:
        "Gunakan satu fungsi `print()` dengan parameter `sep=':'` untuk mencetak jam `'08'`, menit `'30'`, dan detik `'00'` sehingga membentuk format jam digital `08:30:00` (lihat Contoh 2 pada materi di atas).",
      tasks: [
        "Tambahkan parameter `sep=\":\"` di dalam fungsi `print(\"08\", \"30\", \"00\")`.",
        "Pastikan output menghasilkan `08:30:00`."
      ],
      starterCode: `# Gunakan parameter sep=":" di dalam fungsi print berikut:
print("08", "30", "00")`,
      expectedOutput: `08:30:00`,
      hint: 'Ubah menjadi: `print("08", "30", "00", sep=":")`.',
      solutionCode: `print("08", "30", "00", sep=":")`
    },
    {
      id: "bab1-challenge3",
      title: "Menggabungkan Dua print() di Baris yang Sama (end)",
      difficulty: "Sedang",
      instructions:
        "Gunakan parameter `end=' '` pada perintah `print()` pertama agar teks `'Belajar Python'` dan `'Sangat Seru!'` tercetak dalam satu baris yang sama (lihat Contoh 2 pada materi di atas).",
      tasks: [
        "Tambahkan parameter `end=\" \"` pada `print()` pertama.",
        "Biarkan `print()` kedua mencetak `'Sangat Seru!'`."
      ],
      starterCode: `# Tambahkan parameter end=" " pada print pertama:
print("Belajar Python")
print("Sangat Seru!")`,
      expectedOutput: `Belajar Python Sangat Seru!`,
      hint: 'Ubah baris pertama menjadi: `print("Belajar Python", end=" ")`',
      solutionCode: `print("Belajar Python", end=" ")
print("Sangat Seru!")`
    },
    {
      id: "bab1-challenge4",
      title: "Membuat Baris Baru dengan Karakter Escape \\n",
      difficulty: "Sedang",
      instructions:
        "Gunakan HANYA SATU perintah `print()` dengan karakter escape `\\n` untuk mencetak daftar 3 nama buah (`Apel`, `Jeruk`, `Mangga`) ke bawah (lihat Contoh 3 pada materi di atas).",
      tasks: [
        "Gunakan `\\n` di antara kata `Apel`, `Jeruk`, dan `Mangga`.",
        "Pastikan ketiganya tercetak pada baris yang berbeda."
      ],
      starterCode: `# Cetak Apel, Jeruk, dan Mangga ke bawah dengan \\n:
print("Apel")`,
      expectedOutput: `Apel
Jeruk
Mangga`,
      hint: 'Tulis: `print("Apel\\nJeruk\\nMangga")`',
      solutionCode: `print("Apel\\nJeruk\\nMangga")`
    },
    {
      id: "bab1-challenge5",
      title: "Mencetak Kutipan Kalimat dengan Escape Quote (\\\")",
      difficulty: "Menantang",
      instructions:
        'Cetak kalimat yang mengandung tanda kutip ganda di dalamnya persis seperti Target Output: `Guru berkata, "Python itu mudah!"` (lihat Contoh 4 pada materi di atas).',
      tasks: [
        'Gunakan `\\"` (garis miring terbalik SEBELUM tanda kutip, yaitu `\\"Python itu mudah!\\"`) atau apit string luar dengan kutip tunggal `\'...\'`.',
        'Pastikan hasil cetakan: `Guru berkata, "Python itu mudah!"`'
      ],
      starterCode: `# Cetak kalimat: Guru berkata, "Python itu mudah!"
# Ingat: garis miring terbalik ditulis SEBELUM tanda kutip (\\")
print()`,
      expectedOutput: `Guru berkata, "Python itu mudah!"`,
      hint: 'Tulis `print(\'Guru berkata, "Python itu mudah!"\')` atau `print("Guru berkata, \\"Python itu mudah!\\"")` (perhatikan posisi `\\` berada di depan `"`).',
      solutionCode: `print("Guru berkata, \\"Python itu mudah!\\"")`
    }
  ],
  quizzes: [
    {
      question: "Manakah cara yang benar untuk menampilkan teks 'Halo Python' ke layar?",
      options: [
        'print("Halo Python")',
        'Print("Halo Python")',
        'echo "Halo Python"',
        'console.log("Halo Python")'
      ],
      correctIndex: 0,
      explanation: "Di Python, fungsi bawaan untuk mencetak teks ke layar adalah `print()` dengan huruf kecil semua."
    },
    {
      question: "Apa output dari kode `print('A', 'B', 'C', sep='-')`?",
      options: ["A B C", "A-B-C", "ABC-", "A, B, C"],
      correctIndex: 1,
      explanation: "Parameter `sep='-'` menggantikan spasi pemisah bawaan di antara argumen menjadi tanda hubung (`-`), sehingga mencetak `A-B-C`."
    },
    {
      question: "Simbol apakah yang digunakan untuk membuat komentar satu baris di Python?",
      options: ["//", "/* */", "#", "--"],
      correctIndex: 2,
      explanation: "Python menggunakan tanda pagar (`#`) untuk menandai komentar satu baris."
    },
    {
      question: "Karakter escape manakah yang berfungsi untuk memindahkan teks ke baris baru?",
      options: ["\\t", "\\n", "\\r", "\\b"],
      correctIndex: 1,
      explanation: "Kode `\\n` (newline) memerintahkan Python untuk menurunkan teks setelahnya ke baris baru."
    },
    {
      question: "Apa fungsi dari parameter `end=' '` di dalam fungsi `print('Halo', end=' ')`?",
      options: [
        "Menghentikan program setelah mencetak Halo",
        "Menghapus huruf terakhir dari kata Halo",
        "Mencegah print() pindah ke baris baru dan menggantinya dengan spasi",
        "Memberi jarak spasi di antara setiap huruf H-a-l-o"
      ],
      correctIndex: 2,
      explanation: "Secara bawaan `end` bernilai `'\\n'` (baris baru). Mengubahnya menjadi `end=' '` membuat `print()` berikutnya tercetak di baris yang sama setelah spasi."
    }
  ]
};
