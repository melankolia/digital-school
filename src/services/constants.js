const user = "/admin/v1";
export const USER = {
  LOGIN: `${user}/login`,
};

const kelas = "kelas/v1";
export const KELAS = {
  ALL: `${kelas}/all`,
  ONE: `${kelas}/one`,
  CREATE: `${kelas}/add`,
  LOV: `${kelas}/list-kelas`,
  LOV_KOMPETENSI: `${kelas}/kompetensi`,
  REKAPITULASI: {
    ALL: `${kelas}/rekapitulasi/all`,
    PER_KELAS: `${kelas}/rekapitulasi`,
  },
};

const siswa = "siswa/v1";
export const SISWA = {
  ALL: `${siswa}/all`,
  DETAIL: {
    TENTANG_DIRI: `${siswa}/tentang-diri`,
    TEMPAT_TINGGAL: `${siswa}/tempat-tinggal`,
    PENDIDIKAN: `${siswa}/pendidikan`,
    KESEHATAN: `${siswa}/kesehatan`,
    HOBI: `${siswa}/hobi`,
    ORANG_TUA: `${siswa}/orang-tua`,
    PINDAHAN: `${siswa}/pindah`,
    KOMPETENSI: `${siswa}/kompetensi`,
  },
  CREATE: {
    TENTANG_DIRI: `${siswa}/tentang-diri`,
    TEMPAT_TINGGAL: `${siswa}/tempat-tinggal`,
    PENDIDIKAN: `${siswa}/pendidikan`,
    KESEHATAN: `${siswa}/kesehatan`,
    HOBI: `${siswa}/hobi`,
    ORANG_TUA: `${siswa}/orang-tua`,
    PINDAHAN: `${siswa}/pindah`,
    STATUS_BANTUAN: `${siswa}/bantuan`,
    KOMPETENSI: `${siswa}/kompetensi`,
  },
  PRESTASI: {
    ALL: `${siswa}/prestasi`,
    ONE: `${siswa}/one-prestasi`,
    CREATE: `${siswa}/prestasi`,
  },
  ALUMNI: {
    ROOT: `${siswa}/alumni`,
  },
  PER_KELAS: `${siswa}/all`,
  IMPORT: `${siswa}/import`,
  EXPORT: {
    RAPOR: `${siswa}/export-raport`,
    SISWA: `${siswa}/export-siswa`,
    REKAPITULASI_KELAS: `${siswa}/export-rekapitulasi-kelas`,
  },
};

const guru = "guru/v1";
export const GURU = {
  ALL: `${guru}/all`,
  DETAIL: `${guru}/detail`,
  CREATE: `${guru}/add`,
  JABATAN: {
    ONE: `staf/v1/one-jabatan`,
    ALL: `${guru}/jabatan`,
    CREATE: `${guru}/jabatan`,
    DELETE: `${guru}/jabatan`,
  },
};

const tenaga_ahli = "tenaga-ahli/v1";
export const TENAGA_AHLI = {
  ALL: `${tenaga_ahli}/all`,
  DETAIL: `${tenaga_ahli}/detail`,
  CREATE: `${tenaga_ahli}/add`,
  JABATAN: {
    ONE: `staf/v1/one-jabatan`,
    ALL: `${tenaga_ahli}/jabatan`,
    CREATE: `${tenaga_ahli}/jabatan`,
    DELETE: `${tenaga_ahli}/jabatan`,
  },
};

const item = "item/v1";
export const ITEM = {
  DELETE: `${item}/delete`,
};
