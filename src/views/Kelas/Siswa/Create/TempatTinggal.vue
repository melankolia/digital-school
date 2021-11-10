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
    <DefaultLoader :loading="loading" v-if="loading" />
    <div v-else class="d-flex flex-column">
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
const DefaultLoader = () => import("@/components/Loader/Default");
import SiswaService from "@/services/resources/siswa.service";
import { ALUMNI } from "@/router/name.types";

export default {
  components: {
    DefaultLoader,
  },
  props: {
    siswaId: { type: String, required: false, default: "" },
  },
  data() {
    return {
      id: this.$route.params?.kelasId,
      update: this.$route.query?.isUpdate,
      kelas: this.$route.query?.kelas,
      loading: false,
      payload: {
        siswa_id: null,
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
      this.$emit("handleLoading", true);
      const payload = {
        siswa_id: this.siswaId,
        alamat: this.payload.alamat || "-",
        no_telephone: this.payload.no_telephone || "-",
        tinggal_di: this.payload.tinggal_di || "-",
        jarak_ke_sekolah: this.payload.jarak_ke_sekolah || "-",
      };

      SiswaService.addTempatTinggal(payload)
        .then(({ data: { data, success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menyimpan Data Tempat Tinggal ${
                this.isAlumni ? "Alumni" : "Siswa"
              }`,
              color: "success",
            });
            this.$emit("handleId", data.siswa_id);
            this.$emit("handleNext");
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
                `Gagal Menyimpan Data Tempat Tinggal ${
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
            message: `Gagal Menyimpan Data Tempat Tinggal ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
        })
        .finally(() => this.$emit("handleLoading", false));
    },
    getDetail() {
      this.loading = true;
      SiswaService.getTempatTinggal({
        siswa_id: this.siswaId,
        alumni: this.isAlumni ? true : null,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.payload = { ...this.payload, ...data };
          } else {
            throw new Error(message);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.isUpdate && this.getDetail();
  },
  computed: {
    isUpdate() {
      return this.update;
    },
    isAvailable() {
      return this.payload?.siswa_id;
    },
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.UPDATE;
    },
  },
};
</script>

<style>
.v-input__control {
  border: none;
}
</style>
