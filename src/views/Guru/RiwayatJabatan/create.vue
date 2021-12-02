<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div class="d-flex flex-row justify-space-between mb-12">
      <v-btn
        @click="$router.back()"
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
      <p class="header-title mb-4">Tambah Jabatan</p>
    </div>
    <ContentNotFound
      message="Data Riwayat Jabatan Not Found"
      :loading="loading"
      v-if="!isAvailable && isUpdate"
      style="width: 100%"
    >
      <template v-slot:action>
        <v-btn
          @click="() => getDetail()"
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
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Judul Jabatan</p>
          <v-text-field
            v-model="items.name"
            hide-details
            filled
            solo
            label="Contoh: Guru"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Deskripsi Jabatan</p>
          <v-text-field
            v-model="items.description"
            hide-details
            filled
            solo
            label="Contoh: Guru"
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
            :show-size="1000"
            :rules="[(v) => !!v || 'File harus diisi']"
          >
          </v-file-input>
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
          :loading="loading"
          @click="handleSubmit"
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
import { GURU } from "@/router/name.types";
import GuruService from "@/services/resources/guru.service";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      guru_id: this.$route.params.guruId,
      id: this.$route.params?.jabatanId,
      loading: false,
      items: {
        guru_id: null,
        jabatan_id: null,
        name: null,
        description: null,
        files: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.createBase64Image(this.items.files).then((e) => {
        GuruService.createJabatan({
          jabatan_id: this.id || "",
          guru_id: this.guru_id || this.items.guru_id,
          judul: this.items.name,
          deskripsi: this.items.description,
          file: e.target.result,
        })
          .then(({ data: { success, message } }) => {
            if (success == true) {
              this.$store.commit("snackbar/setSnack", {
                show: true,
                message: `Berhasil Menambahkan Riwayat Jabatan`,
                color: "success",
              });
              this.$router.push({
                name: GURU.JABATAN.ALL,
                params: { guruId: this.guru_id || this.items.guru_id },
              });
            } else {
              this.$store.commit("snackbar/setSnack", {
                show: true,
                message: message || `Gagal Menambahkan Riwayat Jabatan`,
                color: "error",
              });
            }
          })
          .catch((err) => {
            console.error(err);
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Gagal Menambahkan Riwayat Jabatan`,
              color: "error",
            });
          })
          .finally(() => (this.loading = false));
      });
    },
    getDetail() {
      this.loading = true;
      GuruService.getOneJabatan(this.id)
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = {
              guru_id: data.guru_id,
              jabatan_id: data.jabatan_id,
              name: data.judul,
              description: data.deskripsi,
              file: data.file,
            };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Riwayat Jabatan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Riwayat Jabatan",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.id && this.getDetail();
  },
  computed: {
    isUpdate() {
      return this.id;
    },
    isAvailable() {
      return this.items.jabatan_id;
    },
  },
};
</script>

<style></style>
