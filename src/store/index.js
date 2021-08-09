import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import VuexPersistence from "vuex-persist";

import auth from "./modules/auth.store";
import siswa from "./modules/siswa.store";
import snackbar from "./modules/snackbar.store";

const debug = process.env.VUE_APP_DEBUG;
const debugPlugin = debug == "true" ? [createLogger()] : [];

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer(val) {
    if (val.auth.token === null) {
      return {};
    }
    return val;
  },
});

export default new Vuex.Store({
  modules: {
    auth,
    snackbar,
    siswa,
  },
  strict: debug,
  plugins: [vuexLocal.plugin, ...debugPlugin],
});
