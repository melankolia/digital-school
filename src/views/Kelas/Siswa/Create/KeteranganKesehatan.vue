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
        <p class="header-subtitle-input mb-1">D. Keterangan Kesehatan</p>
      </div>
    </div>
    <div class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Golongan darah</p>
          <v-text-field
            v-model="payload.gol_darah"
            hide-details
            filled
            solo
            label="Contoh: B"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kelainan jasmani</p>
          <v-text-field
            v-model="payload.kelainan_jasmani"
            hide-details
            filled
            solo
            label="Contoh: Sakit Ginjal"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Tinggi berat badan</p>
          <v-text-field
            v-model="payload.tinggi_berat_badan"
            hide-details
            filled
            solo
            label="Contoh: 180cm / 60kg"
          />
        </v-col>
      </v-row>
      <v-divider class="my-9"></v-divider>
      <p class="mb-8 sick-history">Riwayat Sakit</p>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">a. Nama Penyakit</p>
          <v-text-field
            v-model="payload.nama_penyakit"
            hide-details
            filled
            solo
            label="Contoh: Sakit Jantung"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">b. Tahun sakit</p>
          <v-text-field
            v-model="payload.tahun_sakit"
            hide-details
            filled
            solo
            label="Contoh : 2003"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">c. Lama sakit</p>
          <v-text-field
            v-model="payload.lama_sakit"
            hide-details
            filled
            solo
            label="Contoh : 2 Tahun"
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
        gol_darah: null,
        kelainan_jasmani: null,
        tinggi_berat_badan: null,
        nama_penyakit: null,
        tahun_sakit: null,
        lama_sakit: null,
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

.sick-history {
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: 0.75px;
  text-align: left;
}
</style>
