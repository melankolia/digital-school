import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import Auth from "./modules/auth.store";

const debug = process.env.VUE_APP_DEBUG;
const debugPlugin = debug == "true" ? [createLogger()] : [];

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
  },
  strict: debug,
  plugins: [...debugPlugin],
});
