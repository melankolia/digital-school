export const CONTAINER = "container";
export const HOME = "home";
export const LOGIN = "login";
export const ABOUT = "about";

export const siswa = "siswa";
export const SISWA = {
  ALL: {
    BROWSE: `${siswa}.browse`,
  },
  REKAPITULASI: {
    BROWSE: `${siswa}.rekapitulasi.browse`,
  },
  KELAS: {
    BROWSE: `${siswa}.kelas`,
    PER_KELAS: `${siswa}.kelas.perkelas`,
    CREATE: `${siswa}.kelas.create`,
    UPDATE: `${siswa}.kelas.update`,
    SISWA: {
      DETAIL: `${siswa}.detail`,
      TABEL_KOMPETENSI: `${siswa}.kompetensi`,
      UPDATE_KOMPETENSI: `${siswa}.update.kompetensi`,
      CREATE: `${siswa}.create`,
      UPDATE: `${siswa}.update`,
      PRESTASI: `${siswa}.prestasi`,
      CREATE_PRESTASI: `${siswa}.create.prestasi`,
    },
  },
};

export const alumni = "alumni";
export const ALUMNI = {
  ALL: {
    BROWSE: `${alumni}.browse`,
  },
  DETAIL: `${alumni}.detail`,
  TABEL_KOMPETENSI: `${alumni}.kompetensi`,
  UPDATE_KOMPETENSI: `${alumni}.update.kompetensi`,
  CREATE: `${alumni}.create`,
  UPDATE: `${alumni}.update`,
  PRESTASI: `${alumni}.prestasi`,
  CREATE_PRESTASI: `${alumni}.create.prestasi`,
};

export const guru = "guru";
export const GURU = {
  BROWSE: `${guru}.browse`,
  DETAIL: `${guru}.detail`,
  UPDATE: `${guru}.update`,
  CREATE: `${guru}.create`,
  JABATAN: {
    DETAIL: `${guru}.jabatan.detail`,
    CREATE: `${guru}.jabatan.create`,
  },
};

export const tenaga_ahli = "tenaga_ahli";
export const TENAGA_AHLI = {
  BROWSE: `${tenaga_ahli}.browse`,
  DETAIL: `${tenaga_ahli}.detail`,
  UPDATE: `${tenaga_ahli}.update`,
  CREATE: `${tenaga_ahli}.create`,
  JABATAN: {
    DETAIL: `${tenaga_ahli}.jabatan.detail`,
    CREATE: `${tenaga_ahli}.jabatan.create`,
  },
};
