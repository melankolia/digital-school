<template>
  <v-main :style="{ 'padding-left': mini ? '104px' : '308px' }">
    <Sidebar @handlerMini="mini = $event" />
    <v-container fluid>
      <router-view />
    </v-container>
  </v-main>
</template>

<script>
const Sidebar = () => import("./SideBar");

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      mini: true,
    };
  },
};
</script>

<style scoped></style>
