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
      <p class="header-title mb-4">Tambah Prestasi</p>
    </div>
    <div class="d-flex flex-column pr-12 mr-12">
      <p class="header-subtitle">
        {{ items.nama_siswa || "-" | toTitle }} -
        {{ items.nama_kelas || "-" | upperCase }}
      </p>
    </div>
    <div class="d-flex flex-column">
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
            type="number"
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
            :show-size="1000"
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
import { SISWA } from "@/router/name.types";

export default {
  data() {
    return {
      siswa_id: this.$route.params.siswaId,
      loading: false,
      items: {
        nama_siswa: null,
        nama_kelas: null,
        name: null,
        sertifikat: null,
        files: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push({
          name: SISWA.KELAS.SISWA.PRESTASI,
          params: { siswaId: this.siswa_id },
        });
      }, 2000);
    },
  },
};
</script>

<style></style>
