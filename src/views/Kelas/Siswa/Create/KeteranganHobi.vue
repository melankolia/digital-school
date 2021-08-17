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
        <p class="header-subtitle-input mb-1">E. Keterangan Hobi</p>
      </div>
    </div>
    <div class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Seni</p>
          <v-text-field
            v-model="payload.seni"
            hide-details
            filled
            solo
            label="Contoh: Musik (Piano Klasik & Electone)"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Olahraga</p>
          <v-text-field
            v-model="payload.olahraga"
            hide-details
            filled
            solo
            label="Contoh : Tenis Meja"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Organisasi</p>
          <v-text-field
            v-model="payload.organisasi"
            hide-details
            filled
            solo
            label="Contoh : KPU Siswa, OSIS"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Lain</p>
          <v-text-field
            v-model="payload.lain"
            hide-details
            filled
            solo
            label="Contoh : Paskibra"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { SISWA } from "@/router/name.types";

export default {
  data() {
    return {
      id: this.$route.query?.kelasId,
      kelas: this.$route.query?.kelas,
      payload: {
        seni: null,
        olahraga: null,
        organisasi: null,
        lain: null,
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.push({
        name: SISWA.KELAS.PER_KELAS,
        params: {
          secureId: this.id,
        },
        query: {
          kelas: this.kelas,
        },
      });
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
