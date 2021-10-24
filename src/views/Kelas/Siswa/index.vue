<template>
  <div class="d-flex flex-column">
    <Browse @on-rekapitulasi="handleRekapitulasi" :overlay="isRekapitulasi" />
    <v-slide-y-reverse-transition mode="out-in">
      <Rekapitulasi
        v-if="isRekapitulasi"
        @close-rekapitulasi="handleRekapitulasi"
      />
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
const Browse = () => import("./browse");
const Rekapitulasi = () => import("./rekapitulasi");

export default {
  components: {
    Browse,
    Rekapitulasi,
  },
  data() {
    return {
      isRekapitulasi: false,
    };
  },
  methods: {
    handleRekapitulasi() {
      this.$vuetify.goTo(1, {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic",
      });
      this.isRekapitulasi = !this.isRekapitulasi;
    },
  },
};
</script>

<style></style>
e
