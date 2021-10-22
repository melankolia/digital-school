import {
  initialSiswaState,
  initialGuruState,
  initialTenagaAhliState,
  initialKompetensiState,
} from "../states";
import {
  SET_SISWA_INFO,
  RESET_SISWA_INFO,
  SET_GURU_INFO,
  RESET_GURU_INFO,
  SET_TENAGA_AHLI_INFO,
  RESET_TENAGA_AHLI_INFO,
  SET_KOMPENTENSI_SISWA,
  RESET_KOMPENTENSI_SISWA,
} from "@/store/constants/mutations.type";

const state = {
  siswa: initialSiswaState(),
  guru: initialGuruState(),
  kompetensi_siswa: initialKompetensiState(),
  tenaga_ahli: initialTenagaAhliState(),
};

const getters = {
  getSiswa(state) {
    return state.siswa;
  },
  getGuru(state) {
    return state.guru;
  },
  getTenagaAhli(state) {
    return state.tenaga_ahli;
  },
  getKompetensi(state) {
    return state.kompetensi_siswa;
  },
};

const mutations = {
  [SET_SISWA_INFO](state, payload) {
    state.siswa = {
      ...payload,
    };
  },
  [SET_GURU_INFO](state, payload) {
    state.guru = {
      ...payload,
    };
  },
  [SET_TENAGA_AHLI_INFO](state, payload) {
    state.tenaga_ahli = {
      ...payload,
    };
  },
  [SET_KOMPENTENSI_SISWA](state, payload) {
    state.kompetensi_siswa = {
      ...payload,
    };
  },
  [RESET_SISWA_INFO](state) {
    Object.assign(state.siswa, initialSiswaState());
  },
  [RESET_GURU_INFO](state) {
    Object.assign(state.guru, initialGuruState());
  },
  [RESET_TENAGA_AHLI_INFO](state) {
    Object.assign(state.tenaga_ahli, initialTenagaAhliState());
  },
  [RESET_KOMPENTENSI_SISWA](state) {
    Object.assign(state.kompetensi_siswa, initialKompetensiState());
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
