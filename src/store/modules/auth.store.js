import { initialAuthState } from "../states";
import { LOGIN } from "../constants/actions.type";
import { SET_AUTH } from "../constants/mutations.type";
import AuthService from "@/services/resources/auth.service";

const state = {
  auth: initialAuthState(),
};

const getters = {
  getToken(state) {
    return state.token;
  },
};

const mutations = {
  [SET_AUTH](state, payload) {
    state.auth = {
      ...payload,
    };
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
};

export default {
  state,
  actions,
  mutations,
  getters,
};
