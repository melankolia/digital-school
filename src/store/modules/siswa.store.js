import { initialSiswaState } from "../states";
import {
  SET_SISWA_INFO,
  RESET_SISWA_INFO,
} from "@/store/constants/mutations.type";

const state = {
  kelas: initialSiswaState(),
};

const getters = {
  getSiswa(state) {
    return state.kelas;
  },
};

const mutations = {
  [SET_SISWA_INFO](state, payload) {
    state.kelas = {
      ...payload,
    };
  },
  [RESET_SISWA_INFO](state) {
    Object.assign(state.promo, initialSiswaState());
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
