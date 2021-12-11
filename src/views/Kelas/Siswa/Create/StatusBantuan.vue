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
        <p class="header-subtitle-input mb-1">G. Status Bantuan</p>
      </div>
    </div>
    <DefaultLoader :loading="loading" v-if="loading" />
    <div v-else class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kartu Perlindungan Sosial (KPS)</p>
          <v-select
            v-model="payload.kps"
            :items="listKPS"
            hide-details
            filled
            solo
            label="Ada"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Program Keluarga Harapan (PKH)</p>
          <v-text-field
            v-model="payload.pkh"
            hide-details
            filled
            solo
            label="Contoh: 123456789"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kartu Keluarga Sejahtera (KKS)</p>
          <v-text-field
            v-model="payload.kks"
            hide-details
            filled
            solo
            label="Contoh: 123456789"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const DefaultLoader = () => import("@/components/Loader/Default");
import { SISWA, ALUMNI } from "@/router/name.types";
import SiswaService from "@/services/resources/siswa.service";

export default {
  components: {
    DefaultLoader,
  },
  props: {
    siswaId: { type: String, required: true },
  },
  data() {
    return {
      id: this.$route.params?.kelasId,
      update: this.$route.query?.isUpdate,
      kelas: this.$route.query?.kelas,
      loading: false,
      listKPS: ["Ada", "Tidak Ada"],
      payload: {
        kps: "Tidak Ada",
        pkh: null,
        kks: null,
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      this.$emit("handleLoading", true);
      const payload = {
        siswa_id: this.siswaId,
        pkh: this.payload.pkh || 0,
        kks: this.payload.kks || 0,
        kps: this.payload.kps,
      };
      SiswaService.addStatusBantuan(payload)
        .then(({ data: { success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menyimpan Data Status Bantuan ${
                this.isAlumni ? "Alumni" : "Siswa"
              }`,
              color: "success",
            });
            this.$router.replace({
              name: SISWA.KELAS.SISWA.DETAIL,
              params: { secureId: this.siswaId },
            });
            this.$vuetify.goTo(1, {
              duration: 300,
              offset: 0,
              easing: "easeInOutCubic",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message:
                message ||
                `Gagal Menyimpan Data Status Bantuan ${
                  this.isAlumni ? "Alumni" : "Siswa"
                }`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Menyimpan Data Status Bantuan ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
        })
        .finally(() => this.$emit("handleLoading", false));
    },
    getDetail() {
      this.loading = true;
      SiswaService.getTentangDiri({
        siswa_id: this.siswaId,
        alumni: this.isAlumni ? true : null,
      })
        .then(({ data: { data, code, message } }) => {
          if (code == 200) {
            this.payload = {
              ...this.payload,
              ...data,
            };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message:
                message ||
                `Gagal Memuat Data Tentang Diri ${
                  this.isAlumni ? "Alumni" : "Siswa"
                }`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Memuat Data Tentang Diri ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.update && this.getDetail();
  },
  computed: {
    isUpdate() {
      return this.update;
    },
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.UPDATE;
    },
  },
};
</script>
