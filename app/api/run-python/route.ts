// Python runs in a browser worker; Vercel's Node runtime does not need Python.
export async function POST() {
  return Response.json(
    {
      output: "",
      error: "Eksekusi Python sudah dipindahkan ke browser. Muat ulang halaman untuk menggunakan versi terbaru.",
      errorHint: "",
      executionTimeMs: 0,
    },
    { status: 410 }
  );
}
