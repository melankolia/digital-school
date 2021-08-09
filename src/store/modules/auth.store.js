import { initialAuthState } from "../states";
import { LOGIN } from "../constants/actions.type";
import { SET_AUTH, PURGE_AUTH } from "../constants/mutations.type";
import { FORCE_LOGOUT } from "../constants/actions.type";

import AuthService from "@/services/resources/auth.service";

const state = {
  auth: initialAuthState(),
};

const getters = {
  getToken(state) {
    return state.auth.token;
  },
  isAuthenticated(state) {
    return state.auth.isAuthenticated;
  },
};

const mutations = {
  [SET_AUTH](state, payload) {
    state.auth = {
      ...payload,
      isAuthenticated: true,
    };
  },
  [PURGE_AUTH](state) {
    Object.assign(state.auth, initialAuthState());
  },
};

const actions = {
  [LOGIN](context, payload) {
    return new Promise((resolve, reject) => {
      AuthService.login(payload, {
        username: process.env.VUE_APP_USERNAME,
        password: process.env.VUE_APP_PASSWORD,
      })
        .then(({ status, data: { data, message } }) => {
          if (status == 200) {
            context.commit(SET_AUTH, {
              isAuthenticated: true,
              token: data,
            });
            resolve({ status, message });
          } else {
            reject({ status, message });
          }
        })
        .catch(
          ({
            response: {
              data: { message },
            },
          }) => {
            reject(message);
          }
        );
    });
  },
  [FORCE_LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
