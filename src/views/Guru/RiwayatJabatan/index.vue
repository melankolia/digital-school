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
      <p class="header-title mb-4">Riwayat Jabatan</p>
      <div>
        <v-btn
          @click="handleAdd"
          depressed
          class="rounded-lg mr-4"
          color="primary"
        >
          <p class="header-button-export ma-0">
            <span> Tambah Sertifikat </span>
          </p>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-column pr-12 mr-12">
      <p class="header-subtitle">
        {{ items.nama || "-" | toTitle }} -
        {{ items.jabatan || "-" | upperCase }}
      </p>
    </div>
    <div class="d-flex flex-row">
      <Card v-for="(item, index) in cardList" :cardDetail="item" :key="index" />
    </div>
  </div>
</template>

<script>
const Card = () => import("@/components/Card");
import { GURU } from "@/router/name.types";

export default {
  components: {
    Card,
  },
  data() {
    return {
      items: {
        nama: null,
        jabatan: null,
      },
      cardList: [
        {
          sertifikat_id: 1,
          title: "Sertifikat Jabatan 1",
          description: "Deskripsi 1",
        },
        {
          sertifikat_id: 2,
          title: "Sertifikat Jabatan 2",
          description: "Deskripsi 2",
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      this.$router.push({
        name: GURU.JABATAN.CREATE,
      });
    },
  },
};
</script>

<style></style>
