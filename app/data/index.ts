import { DocSection } from "./types";
import { withMatplotlibPreviews } from "./with-matplotlib-previews";
import { bab1Pengenalan } from "./chapters/bab1-pengenalan";
import { bab2VariabelTipeData } from "./chapters/bab2-variabel-tipe-data";
import { bab3ManipulasiString } from "./chapters/bab3-manipulasi-string";
import { bab4Operator } from "./chapters/bab4-operator";
import { bab5InputKonversi } from "./chapters/bab5-input-konversi";
import { bab6Percabangan } from "./chapters/bab6-percabangan";
import { bab7Perulangan } from "./chapters/bab7-perulangan";
import { bab8StrukturData } from "./chapters/bab8-struktur-data";
import { bab9Fungsi } from "./chapters/bab9-fungsi";
import { bab10UjianAkhir } from "./chapters/bab10-ujian-akhir";

import { bab1ClassObject } from "./oop-chapters/bab1-class-object";
import { bab2InitSelf } from "./oop-chapters/bab2-init-self";
import { bab3ClassVsInstance } from "./oop-chapters/bab3-class-vs-instance";
import { bab4Encapsulation } from "./oop-chapters/bab4-encapsulation";
import { bab5Inheritance } from "./oop-chapters/bab5-inheritance";
import { bab6Polymorphism } from "./oop-chapters/bab6-polymorphism";
import { bab7MagicMethods } from "./oop-chapters/bab7-magic-methods";
import { bab8CompositionDataclass } from "./oop-chapters/bab8-composition-dataclass";
import { bab9UjianOop } from "./oop-chapters/bab9-ujian-oop";

import { bab1PengenalanNdarray } from "./numpy-chapters/bab1-pengenalan-ndarray";
import { bab2GeneratorArray } from "./numpy-chapters/bab2-generator-array";
import { bab3IndexingSlicing } from "./numpy-chapters/bab3-indexing-slicing";
import { bab4VectorizationBroadcasting } from "./numpy-chapters/bab4-vectorization-broadcasting";
import { bab5BooleanMaskingWhere } from "./numpy-chapters/bab5-boolean-masking-where";
import { bab6ReshapeJoin } from "./numpy-chapters/bab6-reshape-join";
import { bab7StatistikAgregasi } from "./numpy-chapters/bab7-statistik-agregasi";
import { bab8AljabarLinear } from "./numpy-chapters/bab8-aljabar-linear";
import { bab9UjianNumpy } from "./numpy-chapters/bab9-ujian-numpy";

import { bab1SeriesDataFrame } from "./pandas-chapters/bab1-series-dataframe";
import { bab2ReadCsvInspeksi } from "./pandas-chapters/bab2-read-csv-inspeksi";
import { bab3LocIloc } from "./pandas-chapters/bab3-loc-iloc";
import { bab4FilteringKondisi } from "./pandas-chapters/bab4-filtering-kondisi";
import { bab5ManipulasiKolomSort } from "./pandas-chapters/bab5-manipulasi-kolom-sort";
import { bab6DataCleaning } from "./pandas-chapters/bab6-data-cleaning";
import { bab7GroupbyAgregasi } from "./pandas-chapters/bab7-groupby-agregasi";
import { bab8ConcatMerge } from "./pandas-chapters/bab8-concat-merge";
import { bab9UjianPandas } from "./pandas-chapters/bab9-ujian-pandas";

import { bab1Matplotlib } from "./matplotlib-chapters/bab1-figure-axes";
import { bab2Matplotlib } from "./matplotlib-chapters/bab2-line-styling";
import { bab3Matplotlib } from "./matplotlib-chapters/bab3-label-legenda-anotasi";
import { bab4Matplotlib } from "./matplotlib-chapters/bab4-bar-pie";
import { bab5Matplotlib } from "./matplotlib-chapters/bab5-scatter-korelasi";
import { bab6Matplotlib } from "./matplotlib-chapters/bab6-histogram-boxplot";
import { bab7Matplotlib } from "./matplotlib-chapters/bab7-subplot-layout";
import { bab8Matplotlib } from "./matplotlib-chapters/bab8-heatmap-ekspor";
import { bab9UjianMatplotlib } from "./matplotlib-chapters/bab9-ujian-matplotlib";

export * from "./types";

export const INITIAL_PYTHON_DOCS: DocSection[] = [
  bab1Pengenalan,
  bab2VariabelTipeData,
  bab3ManipulasiString,
  bab4Operator,
  bab5InputKonversi,
  bab6Percabangan,
  bab7Perulangan,
  bab8StrukturData,
  bab9Fungsi,
  bab10UjianAkhir,
];

export const PYTHON_OOP_DOCS: DocSection[] = [
  bab1ClassObject,
  bab2InitSelf,
  bab3ClassVsInstance,
  bab4Encapsulation,
  bab5Inheritance,
  bab6Polymorphism,
  bab7MagicMethods,
  bab8CompositionDataclass,
  bab9UjianOop,
];

export const PYTHON_NUMPY_DOCS: DocSection[] = [
  bab1PengenalanNdarray,
  bab2GeneratorArray,
  bab3IndexingSlicing,
  bab4VectorizationBroadcasting,
  bab5BooleanMaskingWhere,
  bab6ReshapeJoin,
  bab7StatistikAgregasi,
  bab8AljabarLinear,
  bab9UjianNumpy,
];

export const PYTHON_PANDAS_DOCS: DocSection[] = [
  bab1SeriesDataFrame,
  bab2ReadCsvInspeksi,
  bab3LocIloc,
  bab4FilteringKondisi,
  bab5ManipulasiKolomSort,
  bab6DataCleaning,
  bab7GroupbyAgregasi,
  bab8ConcatMerge,
  bab9UjianPandas,
];


export const PYTHON_MATPLOTLIB_DOCS: DocSection[] = [
  bab1Matplotlib,
  bab2Matplotlib,
  bab3Matplotlib,
  bab4Matplotlib,
  bab5Matplotlib,
  bab6Matplotlib,
  bab7Matplotlib,
  bab8Matplotlib,
  bab9UjianMatplotlib,
].map(withMatplotlibPreviews);
