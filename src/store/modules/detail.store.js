import {
  initialSiswaState,
  initialGuruState,
  initialTenagaAhliState,
} from "../states";
import {
  SET_SISWA_INFO,
  RESET_SISWA_INFO,
  SET_GURU_INFO,
  RESET_GURU_INFO,
  SET_TENAGA_AHLI_INFO,
  RESET_TENAGA_AHLI_INFO,
} from "@/store/constants/mutations.type";

const state = {
  siswa: initialSiswaState(),
  guru: initialGuruState(),
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
  [RESET_SISWA_INFO](state) {
    Object.assign(state.siswa, initialSiswaState());
  },
  [RESET_GURU_INFO](state) {
    Object.assign(state.guru, initialGuruState());
  },
  [RESET_TENAGA_AHLI_INFO](state) {
    Object.assign(state.tenaga_ahli, initialTenagaAhliState());
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
