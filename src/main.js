import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { FORCE_LOGOUT } from "@/store/constants/actions.type";
import { LOGIN } from "@/router/name.types";

Vue.config.productionTip = false;

// Component
import DialogConfirm from "./components/Confirm";
Vue.use(DialogConfirm);

// Filter
import "./filter/currency.filter";
import "./filter/case.filter";

// Vue Mixin
import "./mixin";

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) => {
  // Authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      store.dispatch(FORCE_LOGOUT).then(() => {
        const loginpath = window.location.pathname;
        const loginsearch = window.location.search;
        next({
          name: LOGIN,
          query: { pathname: loginpath, search: loginsearch },
        });
        setTimeout(function () {
          store.commit("snackbar/setSnack", {
            show: true,
            message: "Token Expired. Sorry you must login again",
            color: "error",
          });
        }, 500);
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
