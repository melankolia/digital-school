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
      <p class="header-title mb-4">Tambah Kelas</p>
    </div>
    <DefaultLoader :loading="loading" v-if="loading" />
    <template v-else>
      <v-form
        id="form"
        ref="form"
        v-model="valid"
        @submit.prevent="handleSubmit"
        class="mt-4"
      >
        <div class="d-flex flex-column">
          <v-row>
            <v-col cols="12" xs="12" sm="6">
              <p class="mb-3 title-input">Kelas</p>
              <v-select
                v-model="payload.nama_kelas"
                :items="listKelas"
                hide-details
                filled
                solo
                item-text="text"
                item-value="value"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6">
              <p class="mb-3 title-input">Jurusan</p>
              <v-row>
                <v-col cols="12" xs="12" sm="8">
                  <v-select
                    v-model="payload.jurusan"
                    :items="['MIPA', 'IPS']"
                    placeholder="Pilih Jurusan"
                    hide-details
                    filled
                    solo
                    item-text="text"
                    item-value="value"
                  />
                </v-col>
                <v-col cols="12" xs="12" sm="4">
                  <v-text-field
                    class="password"
                    v-model="payload.jurusanNo"
                    :rules="[
                      (v) => !!v || 'Jurusan harus diisi',
                      (v) => /^\S{1,}$/.test(v) || 'Format harus sesuai',
                    ]"
                    filled
                    outlined
                    solo
                    label="Contoh: 1"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xs="12" sm="6">
              <p class="mb-3 title-input">Wali Kelas</p>
              <v-autocomplete
                :loading="loadingWaliKelas"
                :items="itemsWaliKelas"
                v-model="payload.wali_kelas"
                clearable
                hide-details
                filled
                solo
                label="Contoh: Sugiono"
                item-text="nama"
                return-object
              />
            </v-col>
            <v-col cols="12" xs="12" sm="6">
              <p class="mb-3 title-input">Tahun Ajaran</p>
              <v-row align="center">
                <v-col cols="12" xs="12" sm="5">
                  <v-text-field
                    v-model="payload.tahun_ajaran_from"
                    hide-details
                    filled
                    solo
                    label="Contoh: 2019"
                    type="number"
                  />
                </v-col>
                <v-col cols="2">
                  <div class="text-center">-</div>
                </v-col>
                <v-col cols="12" xs="12" sm="5">
                  <v-text-field
                    v-model="payload.tahun_ajaran_to"
                    hide-details
                    filled
                    solo
                    label="Contoh: 2020"
                    type="number"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
        <v-row class="my-12">
          <v-col cols="12" xs="12" sm="6">
            <v-btn
              block
              depressed
              color="primary"
              class="rounded-lg pa-6"
              :loading="loadingSubmit"
              :disabled="!valid"
              type="submit"
              form="form"
            >
              <p class="header-button-back ma-0">
                <span> Submit </span>
              </p>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </div>
</template>

<script>
const DefaultLoader = () => import("@/components/Loader/Default");
import GuruService from "@/services/resources/guru.service";
import KelasService from "@/services/resources/kelas.service";
import { SISWA } from "@/router/name.types";

export default {
  components: {
    DefaultLoader,
  },
  data() {
    return {
      valid: false,
      loading: false,
      loadingSubmit: false,
      id: this.$route.params?.kelasId,
      itemsWaliKelas: [],
      loadingWaliKelas: false,
      listKelas: [
        { text: "X", value: "X" },
        { text: "XI", value: "XI" },
        { text: "XII", value: "XII" },
      ],
      payload: {
        kelas_id: null,
        nama_kelas: "X",
        jurusan: null,
        jurusanNo: null,
        wali_kelas: null,
        tahun_ajaran_from: null,
        tahun_ajaran_to: null,
      },
    };
  },
  computed: {
    isUpdate() {
      return this.id;
    },
  },
  methods: {
    handleBack() {
      this.$router.replace({
        name: SISWA.KELAS.BROWSE,
      });
    },
    getListGuru() {
      this.loadingWaliKelas = true;
      GuruService.getList({
        search: null,
        page: 1,
        sort: "nama ASC",
        limit: 9999,
      })
        .then(({ data: { code, message, data } }) => {
          if (code == 200) {
            this.itemsWaliKelas = [...data];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Semua Guru",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Semua Guru",
            color: "error",
          });
          console.error(err);
        })
        .finally(() => (this.loadingWaliKelas = false));
    },
    handleSubmit() {
      this.loadingSubmit = true;
      const payload = {
        kelas_id: this.payload.kelas_id || "",
        namaKelas: this.payload.nama_kelas || "",
        jurusan: `${this.payload.jurusan} ${this.payload.jurusanNo}` || "-",
        walikelas: this.payload.wali_kelas?.nama || "-",
        guru_id: this.payload.wali_kelas?.guru_id || "-",
      };
      if (this.payload.tahun_ajaran_from && this.payload.tahun_ajaran_to) {
        payload.tahunAjaran = `${this.payload.tahun_ajaran_from}-${this.payload.tahun_ajaran_to}`;
      }

      KelasService.createKelas(payload)
        .then(({ data: { message, success } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil Menyimpan Data Kelas",
              color: "success",
            });
            this.$router.replace({
              name: SISWA.KELAS.BROWSE,
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Menyimpan Data Kelas",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Menyimpan Data Kelas",
            color: "error",
          });
        })
        .finally(() => (this.loadingSubmit = false));
    },
    getDetail(id) {
      this.loading = true;
      KelasService.getOneKelas(id)
        .then(({ data: { code, message, data } }) => {
          if (code == 200) {
            this.payload = {
              kelas_id: data.kelas_id,
              nama_kelas: data.nama_kelas,
              tahun_ajaran_from: data.tahun_ajaran_awal,
              tahun_ajaran_to: data.tahun_ajaran_akhir,
              wali_kelas: {
                nama: data.wali_kelas,
                guru_id: data.guru_id,
              },
            };
            const tempJurusan = data.jurusan.split(" ");
            if (tempJurusan.length > 0 && tempJurusan.length <= 2) {
              this.payload = {
                ...this.payload,
                jurusan: tempJurusan[0],
                jurusanNo: tempJurusan[1],
              };
            }
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Kelas",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Kelas",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.isUpdate && this.getDetail(this.id);
    this.getListGuru();
  },
};
</script>

<style scoped>
.password > .v-input__control {
  border: none !important;
}
</style>
