import { initialAuthState } from "../states";
import { LOGIN } from "../constants/actions.type";
import AuthService from "@/services/resources/auth.service";

const state = {
  token: initialAuthState(),
};

const getters = {};

const mutations = {};

const actions = {
  [LOGIN](context, payload) {
    return new Promise((resolve, reject) => {
      AuthService.login(payload)
        .then((result) => {
          console.log(result);
          resolve(result);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
