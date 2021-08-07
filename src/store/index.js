import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import auth from "./modules/auth.store";
import snackbar from "./modules/snackbar.store";

const debug = process.env.VUE_APP_DEBUG;
const debugPlugin = debug == "true" ? [createLogger()] : [];

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    snackbar,
  },
  strict: debug,
  plugins: [...debugPlugin],
});
