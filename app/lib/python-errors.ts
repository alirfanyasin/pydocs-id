export function getFriendlyErrorExplanation(cleanStderr: string): string {
  if (!cleanStderr) return "";

  if (cleanStderr.includes("SyntaxError:")) {
    if (cleanStderr.includes("unexpected character after line continuation")) {
      return "💡 Penjelasan Error (SyntaxError): Penulisan garis miring terbalik (\\) salah posisi. Untuk mencetak tanda kutip ganda di dalam string, tulis \\\" (garis miring terbalik SEBELUM tanda kutip, contoh: \\\"Python\\\"), atau gunakan kutip tunggal '...' di bagian luar string.";
    }
    if (cleanStderr.includes("unterminated string literal")) {
      return "💡 Penjelasan Error (SyntaxError): Tanda kutip pembuka string belum ditutup dengan tanda kutip yang sejenis di akhir teks.";
    }
    return "💡 Penjelasan Error (SyntaxError): Terdapat kesalahan penulisan sintaks Python. Periksa kembali tanda kurung (), tanda kutip \"\", titik dua (:), atau simbol operator pada baris yang ditunjuk tanda panah (^).";
  }

  if (cleanStderr.includes("IndentationError:")) {
    return "💡 Penjelasan Error (IndentationError): Spasi di awal baris (indentasi) tidak rapi atau belum menjorok 4 spasi setelah baris if, elif, else, for, while, class, atau def.";
  }

  if (cleanStderr.includes("NameError:")) {
    const match = cleanStderr.match(/name '([^']+)' is not defined/);
    const varName = match ? `'${match[1]}'` : "tersebut";
    return `💡 Penjelasan Error (NameError): Nama variabel, class, atau fungsi ${varName} tidak dikenali. Pastikan ejaan huruf besar/kecilnya sudah benar (atau sudah menulis 'import numpy as np' bila memakai np).`;
  }

  if (cleanStderr.includes("AttributeError:")) {
    return "💡 Penjelasan Error (AttributeError): Atribut atau method yang dipanggil tidak ditemukan pada objek/class tersebut. Periksa kembali penulisan nama atribut/method atau apakah atribut bersifat private (__).";
  }

  if (cleanStderr.includes("TypeError:")) {
    return "💡 Penjelasan Error (TypeError): Operasi dilakukan pada tipe data yang tidak cocok (misalnya menjumlahkan teks str dengan angka int secara langsung, atau jumlah argumen fungsi/method kurang/lebih).";
  }

  if (cleanStderr.includes("ValueError:")) {
    if (cleanStderr.includes("cannot reshape array")) {
      return "💡 Penjelasan Error (ValueError): Ukuran baru pada .reshape(baris, kolom) tidak cocok dengan total elemen array (.size). Hasil kali baris × kolom harus sama persis dengan jumlah elemen.";
    }
    if (cleanStderr.includes("could not be broadcast")) {
      return "💡 Penjelasan Error (ValueError): Dimensi (.shape) kedua array tidak kompatibel untuk dioperasikan (Broadcasting gagal). Pastikan ukuran dimensi keduanya sama atau salah satunya berukuran 1.";
    }
    return "💡 Penjelasan Error (ValueError): Nilai atau dimensi yang diberikan tidak valid untuk operasi tersebut.";
  }

  if (cleanStderr.includes("IndexError:")) {
    return "💡 Penjelasan Error (IndexError): Nomor indeks yang diakses berada di luar batas ukuran array/list (ingat bahwa indeks dimulai dari 0).";
  }

  if (cleanStderr.includes("KeyError:")) {
    return "💡 Penjelasan Error (KeyError): Kunci (key) yang dicari tidak ditemukan di dalam Dictionary.";
  }

  if (cleanStderr.includes("ZeroDivisionError:")) {
    return "💡 Penjelasan Error (ZeroDivisionError): Tidak dapat membagi suatu angka dengan nol (0).";
  }

  if (cleanStderr.includes("EOFError:")) {
    return "💡 Penjelasan Error (EOFError): Fungsi input() membutuhkan data masukan di kotak 'Input Pengujian (stdin)', tetapi baris inputnya masih kosong atau kurang.";
  }

  return "";
}

