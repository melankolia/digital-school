import { initialSiswaState, initialGuruState } from "../states";
import {
  SET_SISWA_INFO,
  RESET_SISWA_INFO,
  SET_GURU_INFO,
  RESET_GURU_INFO,
} from "@/store/constants/mutations.type";

const state = {
  siswa: initialSiswaState(),
  guru: initialGuruState(),
};

const getters = {
  getSiswa(state) {
    return state.siswa;
  },
  getGuru(state) {
    return state.guru;
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
  [RESET_SISWA_INFO](state) {
    Object.assign(state.siswa, initialSiswaState());
  },
  [RESET_GURU_INFO](state) {
    Object.assign(state.guru, initialGuruState());
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
