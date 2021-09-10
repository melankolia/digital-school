<template>
  <div class="d-flex flex-column mb-10">
    <div class="d-flex flex-row justify-space-between mb-12">
      <div class="d-flex flex-column">
        <div>
          <v-btn
            @click="handleBack"
            depressed
            color="header"
            class="rounded-lg mr-4 mb-8 outlined-custom"
          >
            <p class="header-button-back ma-0">
              <v-icon class="mr-1" small>mdi-chevron-left</v-icon>
              <span> Kembali </span>
            </p>
          </v-btn>
        </div>
        <p class="header-title-input mb-1">Input Tabel</p>
        <p class="header-subtitle-input mb-1">B. Keterangan Tempat Tinggal</p>
      </div>
    </div>
    <div class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Alamat</p>
          <v-text-field
            v-model="payload.alamat"
            hide-details
            filled
            solo
            label="Contoh : Jalan Manual Megara No. 11 Kel. Salatiga Kota Jambi"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Nomor telfon / handphone</p>
          <v-text-field
            v-model="payload.no_telephone"
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 08123456789"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Tinggal di</p>
          <v-text-field
            v-model="payload.tinggal_di"
            hide-details
            filled
            solo
            label="Contoh : Rumah orang tua"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Jarak tempat tinggal ke sekolah</p>
          <v-text-field
            v-model="payload.jarak_ke_sekolah"
            hide-details
            filled
            solo
            label="Contoh: 1km"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query?.kelasId,
      kelas: this.$route.query?.kelas,
      payload: {
        alamat: null,
        no_telephone: null,
        tinggal_di: null,
        jarak_ke_sekolah: null,
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      console.log(this.payload);
      this.$emit("handleLoading", true);
      setTimeout(() => {
        this.$emit("handleNext");
        this.$emit("handleLoading", false);
        this.$vuetify.goTo(1, {
          duration: 300,
          offset: 0,
          easing: "easeInOutCubic",
        });
      }, 1000);
    },
  },
};
</script>

<style>
.v-input__control {
  border: none;
}
</style>
