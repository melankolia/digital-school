<template>
  <div>
    <Appbar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
const Appbar = () => import("./Appbar");
export default {
  components: {
    Appbar,
  },
};
</script>

<style></style>
