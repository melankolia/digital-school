<template>
  <v-snackbar
    v-model="show"
    :top="type === 'top'"
    :bottom="type === 'bottom'"
    :right="type === 'right'"
    :left="type === 'left'"
    :color="color"
  >
    <v-icon color="white" v-if="color === 'success'">mdi-check-circle</v-icon>
    <v-icon color="white" v-if="color === 'info'">mdi-information</v-icon>
    <v-icon color="white" v-if="color === 'warning'">mdi-alert</v-icon>
    <v-icon color="white" v-if="color === 'error'">mdi-alert-circle</v-icon>
    <span class="ml-5">{{ message | toTitle }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text @click.native="show = false" v-bind="attrs">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      type: "top",
      message: "",
      color: "",
      timeout: 5000,
    };
  },
  created: function () {
    this.$store.watch(
      (state) => state.snackbar.snack,
      () => {
        const message = this.$store.state.snackbar.snack.message;
        if (message) {
          this.show = true;
          this.message = message;
          this.type = this.$store.state.snackbar.snack.type ?? this.type;
          this.color = this.$store.state.snackbar.snack.color;
          this.$store.commit("snackbar/setSnack", {});
        }
      }
    );
  },
};
</script>
