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
        <p class="header-subtitle-input mb-1">G. Keterangan Pindahan</p>
      </div>
    </div>
    <DefaultLoader :loading="loading" v-if="loading" />
    <div v-else class="d-flex flex-column">
      <div>
        <p class="mb-6 prev-school">Pindahan</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">a. Dari sekolah</p>
            <v-text-field
              v-model="payload.pindah_sekolah"
              hide-details
              filled
              solo
              label="Contoh: SMAN 999 Kota Jambi"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Alasan</p>
            <v-text-field
              v-model="payload.pindah_alasan"
              hide-details
              filled
              solo
              label="Contoh : Ikut orang tau pindah tugas"
            />
          </v-col>
        </v-row>
        <v-divider class="my-9"></v-divider>
      </div>
      <div>
        <p class="mb-6 prev-school">Diterima di Sekolah ini</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">a. Di kelas</p>
            <v-text-field
              v-model="payload.diterima_di"
              hide-details
              filled
              solo
              label="Contoh: XI MIPA 2"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Program</p>
            <v-text-field
              v-model="payload.diterima_program"
              hide-details
              filled
              solo
              label="Contoh : MIPA"
            />
          </v-col>
        </v-row>
        <v-divider class="my-9"></v-divider>
      </div>
      <div>
        <p class="mb-6 prev-school">Meninggalkan sekolah ini</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">a. Di kelas</p>
            <v-text-field
              v-model="payload.meninggalkan_di"
              hide-details
              filled
              solo
              label="Contoh: XI"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Program</p>
            <v-text-field
              v-model="payload.meninggalkan_program"
              hide-details
              filled
              solo
              label="Contoh : MIPA"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">c. Alasan</p>
            <v-text-field
              v-model="payload.meninggalkan_alasan"
              hide-details
              filled
              solo
              label="Contoh : Karena kerjaan orang tua"
            />
          </v-col>
        </v-row>
        <v-divider class="my-9"></v-divider>
      </div>
      <div>
        <p class="mb-6 prev-school">Akhir Pendidikan</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">a. Tahun tamat belajar</p>
            <v-text-field
              v-model="payload.akhir_tamat_belajar"
              hide-details
              filled
              solo
              label="Contoh: 2003"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Nomor STTB</p>
            <v-text-field
              v-model="payload.akhir_sttb"
              hide-details
              filled
              solo
              label="Contoh : 1249821829495325"
            />
          </v-col>
        </v-row>
      </div>
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
    siswaId: { type: String, required: true },
  },
  data() {
    return {
      id: this.$route.params?.kelasId,
      loading: false,
      update: this.$route.query?.isUpdate,
      kelas: this.$route.query?.kelas,
      payload: {
        siswa_id: null,
        pindah_sekolah: null,
        pindah_alasan: null,
        diterima_di: null,
        diterima_program: null,
        meninggalkan_di: null,
        meninggalkan_program: null,
        meninggalkan_alasan: null,
        akhir_tamat_belajar: null,
        akhir_sttb: null,
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
        pindah_sekolah: this.payload.pindah_sekolah || "-",
        pindah_alasan: this.payload.pindah_alasan || "-",
        diterima_di: this.payload.diterima_di || "-",
        diterima_program: this.payload.diterima_program || "-",
        meninggalkan_di: this.payload.meninggalkan_di || "-",
        meninggalkan_program: this.payload.meninggalkan_program || "-",
        meninggalkan_alasan: this.payload.meninggalkan_alasan || "-",
        akhir_tamat_belajar: this.payload.akhir_tamat_belajar || "-",
        akhir_sttb: this.payload.akhir_sttb || "-",
      };
      SiswaService.addPindahan(payload)
        .then(({ data: { data, success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menyimpan Data Keterangan Pindahan ${
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
                `Gagal Menyimpan Data Keterangan Pindahan ${
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
            message: `Gagal Menyimpan Data Keterangan Pindahan ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
        })
        .finally(() => this.$emit("handleLoading", false));
    },
    getDetail() {
      this.loading = true;
      SiswaService.getPindahan(this.siswaId)
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

.prev-school {
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: 0.75px;
  text-align: left;
}
</style>
