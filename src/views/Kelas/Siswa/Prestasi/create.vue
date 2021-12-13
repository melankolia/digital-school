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
      <p class="header-title mb-4">Tambah Prestasi</p>
    </div>
    <ContentNotFound
      message="Data Prestasi Siswa Not Found"
      :loading="loading"
      v-if="!isAvailable && isUpdate"
      style="width: 100%"
    >
      <template v-slot:action>
        <v-btn
          @click="() => getList()"
          depressed
          color="header"
          class="rounded-lg outlined-custom"
        >
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          <p class="header-button-back ma-0">Reload</p>
        </v-btn>
      </template>
    </ContentNotFound>
    <div v-else class="d-flex flex-column">
      <v-form
        id="form"
        ref="form"
        v-model="valid"
        @submit.prevent="handleSubmit"
        class="mt-4"
      >
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">Judul Prestasi</p>
            <v-text-field
              v-model="items.name"
              hide-details
              filled
              solo
              label="Contoh: Piagam Olahraga"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">Deskripsi Prestasi</p>
            <v-text-field
              v-model="items.description"
              hide-details
              filled
              solo
              label="Contoh: Piagam pada tahun 2009"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">Upload Sertifikat</p>
            <v-file-input
              v-model="items.files"
              counter
              label="File input"
              placeholder="Select your files"
              append-icon="mdi-paperclip"
              prepend-icon=""
              outlined
              accept="application/pdf"
              :show-size="1000"
              :rules="[(v) => !!v || 'File harus diisi']"
            >
            </v-file-input>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <v-row class="my-12">
      <v-col cols="12" xs="12" sm="6">
        <v-btn
          block
          depressed
          color="primary"
          class="rounded-lg pa-6"
          :loading="loading"
          type="submit"
          :disabled="!valid"
          form="form"
        >
          <p class="header-button-back ma-0">
            <span> Submit </span>
          </p>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import SiswaService from "@/services/resources/siswa.service";
import { SISWA, ALUMNI } from "@/router/name.types";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      siswa_id: this.$route.params.siswaId,
      id: this.$route.params?.prestasiId,
      loading: false,
      valid: false,
      items: {
        nama_siswa: null,
        nama_kelas: null,
        name: null,
        description: null,
        files: null,
        prestasi_id: null,
        siswa_id: null,
      },
      imageBase64: null,
    };
  },
  computed: {
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.CREATE_PRESTASI;
    },
    isUpdate() {
      return this.id;
    },
    isAvailable() {
      return this.items.prestasi_id;
    },
  },
  mounted() {
    this.id && this.getDetail();
  },
  methods: {
    handleBack() {
      this.$router.replace({
        name: this.isAlumni ? ALUMNI.PRESTASI : SISWA.KELAS.SISWA.PRESTASI,
        params: { siswaId: this.siswa_id },
      });
    },
    handleSubmit() {
      this.loading = true;
      this.createBase64Image(this.items.files)
        .then((e) => {
          SiswaService.addPrestasi({
            prestasi_id: this.id || "",
            siswa_id: this.siswa_id,
            judul: this.items.name,
            deskripsi: this.items.description,
            file: e.target.result,
          })
            .then(({ data: { success, message } }) => {
              if (success == true) {
                this.$store.commit("snackbar/setSnack", {
                  show: true,
                  message: `Berhasil Menyimpan Data Prestasi ${
                    this.isAlumni ? "Alumni" : "Siswa"
                  }`,
                  color: "success",
                });
                this.$router.replace({
                  name: this.isAlumni
                    ? ALUMNI.PRESTASI
                    : SISWA.KELAS.SISWA.PRESTASI,
                  params: { siswaId: this.siswa_id },
                });
              } else {
                this.$store.commit("snackbar/setSnack", {
                  show: true,
                  message:
                    message ||
                    `Gagal Menyimpan Data Prestasi ${
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
                message: `Gagal Menyimpan Data Prestasi ${
                  this.isAlumni ? "Alumni" : "Siswa"
                }`,
                color: "error",
              });
            })
            .finally(() => (this.loading = false));
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "File Foto Harus Diisi",
            color: "error",
          });
          this.loading = false;
        });
    },
    getDetail() {
      this.loading = true;
      SiswaService.getOnePrestasi(this.id)
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = {
              name: data.judul,
              description: data.deskripsi,
              prestasi_id: data.prestasi_id,
              siswa_id: data.siswa_id,
            };
            this.siswa_id = data.siswa_id;
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Prestasi",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Prestasi",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style></style>
