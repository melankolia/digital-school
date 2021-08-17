const user = "/admin/v1";
export const USER = {
  LOGIN: `${user}/login`,
};

const kelas = "kelas/v1";
export const KELAS = {
  ALL: `${kelas}/all`,
};

const siswa = "siswa/v1";
export const SISWA = {
  ALL: `${siswa}/all-siswa`,
  DETAIL: {
    TENTANG_DIRI: `${siswa}/tentang-diri`,
    TEMPAT_TINGGAL: `${siswa}/tempat-tinggal`,
    PENDIDIKAN: `${siswa}/pendidikan`,
    KESEHATAN: `${siswa}/kesehatan`,
    HOBI: `${siswa}/hobi`,
    ORANG_TUA: `${siswa}/orang-tua`,
    PINDAHAN: `${siswa}/pindah`,
  },
  PER_KELAS: `${siswa}/all`,
};

const guru = "guru/v1";
export const GURU = {
  ALL: `${guru}/all`,
  DETAIL: `${guru}/detail`,
};
