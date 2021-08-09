import { initialSiswaState } from "../states";
import {
  SET_SISWA_INFO,
  RESET_SISWA_INFO,
} from "@/store/constants/mutations.type";

const state = {
  siswa: initialSiswaState(),
};

const getters = {
  getSiswa(state) {
    return state.siswa;
  },
};

const mutations = {
  [SET_SISWA_INFO](state, payload) {
    state.siswa = {
      ...payload,
    };
  },
  [RESET_SISWA_INFO](state) {
    Object.assign(state.siswa, initialSiswaState());
  },
};

const actions = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
