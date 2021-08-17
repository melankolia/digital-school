export const CONTAINER = "container";
export const HOME = "home";
export const LOGIN = "login";
export const ABOUT = "about";

export const siswa = "siswa";
export const SISWA = {
  ALL: {
    BROWSE: `${siswa}.browse`,
  },
  KELAS: {
    BROWSE: `${siswa}.kelas`,
    PER_KELAS: `${siswa}.kelas.perkelas`,
    SISWA: {
      DETAIL: `${siswa}.detail`,
      TABEL_KOMPETENSI: `${siswa}.kompetensi`,
    },
  },
};

export const guru = "guru";
export const GURU = {
  BROWSE: `${guru}.browse`,
  DETAIL: `${guru}.detail`,
};

export const tenaga_ahli = "tenaga_ahli";
export const TENAGA_AHLI = {
  BROWSE: `${tenaga_ahli}.browse`,
  DETAIL: `${tenaga_ahli}.detail`,
};
