<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div class="d-flex flex-row justify-space-between mb-12">
      <v-btn
        @click="handleBack"
        depressed
        color="header"
        class="rounded-lg mr-4 outlined-custom"
      >
        <p class="header-button-back ma-0">
          <v-icon class="mr-1" small>mdi-chevron-left</v-icon>
          <span> Kembali </span>
        </p>
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-between">
      <p class="header-title mb-4">Riwayat Prestasi</p>
      <div>
        <v-btn depressed class="rounded-lg mr-4" color="primary">
          <p class="header-button-export ma-0">
            <span> Tambah Prestasi </span>
          </p>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-column pr-12 mr-12">
      <p class="header-subtitle">Faris Nabil - XII IPA 4</p>
    </div>
    <div class="d-flex flex-row">
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
const Card = () => import("@/components/Card");
export default {
  components: {
    Card,
  },
};
</script>

<style></style>
