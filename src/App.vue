<template>
  <v-app style="height: 100vh">
    <Snackbar />
    <router-view />
  </v-app>
</template>

<script>
const Snackbar = () => import("@/components/Snackbar");
export default {
  name: "App",
  components: {
    Snackbar,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
