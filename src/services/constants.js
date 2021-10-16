const user = "/admin/v1";
export const USER = {
  LOGIN: `${user}/login`,
};

const kelas = "kelas/v1";
export const KELAS = {
  ALL: `${kelas}/all`,
  LOV: `${kelas}/list-kelas`,
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
    KOMPETENSI: `${siswa}/kompetensi`,
  },
  PER_KELAS: `${siswa}/all`,
};

const guru = "guru/v1";
export const GURU = {
  ALL: `${guru}/all`,
  DETAIL: `${guru}/detail`,
  CREATE: `${guru}/add`,
};

const tenaga_ahli = "tenaga-ahli/v1";
export const TENAGA_AHLI = {
  ALL: `${tenaga_ahli}/all`,
  DETAIL: `${tenaga_ahli}/detail`,
  CREATE: `${tenaga_ahli}/add`,
};
