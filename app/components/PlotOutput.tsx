/* eslint-disable @next/next/no-img-element -- PNG results from the Python worker. */
export default function PlotOutput({ images, caption = "Hasil visualisasi" }: { images: string[]; caption?: string }) {
  return images.map((src, index) => (
    <figure key={index} className="mt-3 rounded-md bg-white p-2 overflow-auto">
      <img src={src} alt={`${caption} — grafik ${index + 1}`} loading="lazy" className="mx-auto max-w-full h-auto" />
      <figcaption className="text-center text-xs text-slate-600 py-1">{caption}{images.length > 1 ? ` (${index + 1})` : ""}</figcaption>
    </figure>
  ));
}
