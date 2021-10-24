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
      <p class="header-title mb-4">Riwayat Prestasi</p>
      <div>
        <v-btn
          @click="handleAdd"
          depressed
          class="rounded-lg mr-4"
          color="primary"
        >
          <p class="header-button-export ma-0">
            <span> Tambah Prestasi </span>
          </p>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-column pr-12 mr-12">
      <p class="header-subtitle">
        {{ items.nama_siswa || "-" | toTitle }} -
        {{ items.nama_kelas || "-" | upperCase }}
      </p>
    </div>
    <div class="d-flex flex-row">
      <Card v-for="(item, index) in cardList" :cardDetail="item" :key="index" />
    </div>
  </div>
</template>

<script>
const Card = () => import("@/components/Card");
import { SISWA, ALUMNI } from "@/router/name.types";

export default {
  components: {
    Card,
  },
  data() {
    return {
      items: {
        nama_siswa: null,
        nama_kelas: null,
      },
      cardList: [
        {
          sertifikat_id: 1,
          title: "Sertifikat Berprestasi 1",
          description: "Deskripsi 1",
        },
        {
          sertifikat_id: 2,
          title: "Sertifikat Berprestasi 2",
          description: "Deskripsi 2",
        },
      ],
    };
  },
  computed: {
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.PRESTASI;
    },
  },
  methods: {
    handleAdd() {
      this.$router.push({
        name: this.isAlumni
          ? ALUMNI.CREATE_PRESTASI
          : SISWA.KELAS.SISWA.CREATE_PRESTASI,
      });
    },
  },
};
</script>

<style></style>
