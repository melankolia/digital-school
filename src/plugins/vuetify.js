import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#0096C7",
        secondary: "#ADE8F4",
        header: "#F7F7FC",
        checkboxBg: "#A0A3BD",
        subMenu: "#F3F3F3",
      },
    },
  },
});
