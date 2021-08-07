const getDefaultState = () => {
  return {
    snack: {},
  };
};

const state = getDefaultState();
export default {
  namespaced: true,
  name: "snackbar",
  state,
  mutations: {
    setSnack(state, showSnack) {
      state.snack = { ...showSnack };
    },
    setSnackNotif(state, showSnack) {
      state.snackNotif = { ...showSnack };
    },
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
  },
};
