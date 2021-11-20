<template>
  <transition name="fade">
    <v-dialog v-model="isShow" persistent max-width="290">
      <v-card>
        <v-card-title v-if="dialog.title" class="headline">{{
          dialog.title
        }}</v-card-title>
        <v-card-text
          v-if="dialog.message"
          v-html="dialog.message"
        ></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            v-if="dialog.button.no"
            text
            @click="(e) => handleClickButton(e, false)"
            >{{ dialog.button.no }}</v-btn
          >
          <v-btn
            color="success"
            v-if="dialog.button.yes"
            text
            @click="(e) => handleClickButton(e, true)"
            >{{ dialog.button.yes }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </transition>
</template>

<script>
import { events } from "./events";
const Component = {
  name: "ConfirmDialog",
  data() {
    return {
      isShow: false,
      password: null,
      dialog: {
        title: "",
        message: "",
        button: {},
      },
      params: {},
    };
  },
  methods: {
    resetState() {
      this.dialog = {
        title: "",
        message: "",
        button: {},
        callback: () => {},
      };
    },
    handleClickButton({ target }, confirm) {
      if (target.id == "vueConfirm") return;
      this.isShow = false;
      // callback
      if (this.params.callback) {
        this.params.callback(confirm);
      }
    },
    open(params) {
      this.resetState();
      this.params = params;
      this.isShow = true;
      // set params to dialog state
      Object.entries(params).forEach((param) => {
        if (typeof param[1] == typeof this.dialog[param[0]]) {
          this.dialog[param[0]] = param[1];
        }
      });
    },
  },
  mounted() {
    if (!document) return;
    events.$on("open", this.open);
  },
};
export default Component;
</script>
