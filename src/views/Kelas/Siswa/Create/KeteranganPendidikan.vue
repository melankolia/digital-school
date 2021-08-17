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
        <p class="header-subtitle-input mb-1">C. Keterangan Pendidikan</p>
      </div>
    </div>
    <div class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Tanggal Diterima</p>
          <v-text-field
            v-model="payload.tanggal_diterima"
            hide-details
            filled
            solo
            label="01/20/2002"
          />
        </v-col>
      </v-row>
      <v-divider class="my-9"></v-divider>
      <p class="mb-8 prev-edu">Pendidikan Sebelumnya</p>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">a. Lulusan dari</p>
          <v-text-field
            v-model="payload.lulus_dari"
            hide-details
            filled
            solo
            label="Contoh: SMP Negeri 99 DKI Jakarta"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">b. Tanggal dan nomor ijazah</p>
          <v-text-field
            v-model="payload.tgl_no_ijazah"
            hide-details
            filled
            solo
            label="Contoh : 10-09-2002 / 888277348829"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">c. Tanggal dan nomor STL</p>
          <v-text-field
            v-model="payload.tgl_no_stl"
            hide-details
            filled
            solo
            label="Contoh : 10-10-2002 / 292332994389832"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">d. Lama belajar</p>
          <v-text-field
            v-model="payload.lama_belajar"
            hide-details
            filled
            solo
            label="Contoh: 3 Tahun"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">e. Nilai SKHUN</p>
          <v-text-field
            v-model="payload.nilai_SKHUN"
            hide-details
            filled
            solo
            label="Contoh: 100"
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
        tanggal_diterima: null,
        lulus_dari: null,
        tgl_no_ijazah: null,
        tgl_no_stl: null,
        lama_belajar: null,
        nilai_SKHUN: null,
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

.prev-edu {
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: 0.75px;
  text-align: left;
}
</style>
