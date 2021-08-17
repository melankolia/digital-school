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
      <div>
        <v-btn
          @click="handleEdit"
          depressed
          color="primary"
          class="rounded-lg mr-4"
        >
          <p class="header-button-title ma-0">
            <v-icon class="mr-1" small>mdi-square-edit-outline</v-icon>
            <span> Edit Data </span>
          </p>
        </v-btn>
        <v-btn depressed class="rounded-lg outlined-custom">
          <p class="header-button-export ma-0">
            <v-icon class="mr-1" small>mdi-download</v-icon>
            <span> Download Detail Siswa </span>
          </p>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-row justify-space-between mb-9 mt-1">
      <div class="d-flex flex-column" style="width: 100vw">
        <div class="d-flex flex-row justify-space-between">
          <p class="header-title mb-4">
            Tabel Siswa - {{ items.nama_siswa || "-" | toTitle }}
          </p>
          <v-btn
            @click="handleKompetensi"
            outlined
            class="rounded-lg outlined-custom"
            color="primary"
          >
            <p class="header-button-export ma-0">
              <span> Lihat Kompetensi </span>
            </p>
          </v-btn>
        </div>
        <div class="d-flex flex-column pr-12 mr-12">
          <p class="header-subtitle">
            {{ items.nama_siswa || "-" | toTitle }} -
            {{ items.nama_kelas || "-" | upperCase }}
          </p>
          <div class="d-flex flex-row">
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                NIS : {{ items.NIS || "-" | toTitle }}
              </p>
            </div>
            <div class="backgroundLabel">
              <p class="header-subtitle py-2 px-3 ma-0">
                NISN : {{ items.NISN || "-" | toTitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-tabs grow v-model="tab" color="tabMenu">
      <v-tab v-for="item in tabs" :key="item.component">
        <p class="ma-0 tabs-title">{{ item.text }}</p>
      </v-tab>
      <v-tab-item v-model="tab">
        <transition name="slide-fade" mode="out-in">
          <keep-alive>
            <component :is="tabs[tab].component" class="mt-6" />
          </keep-alive>
        </transition>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { RESET_SISWA_INFO } from "@/store/constants/mutations.type";
import { SISWA } from "@/router/name.types";
const About = () => import("@/views/Kelas/Siswa/Detail/About.vue");
const TempatTinggal = () =>
  import("@/views/Kelas/Siswa/Detail/TempatTinggal.vue");
const Pendidikan = () => import("@/views/Kelas/Siswa/Detail/Pendidikan.vue");
const Kesehatan = () => import("@/views/Kelas/Siswa/Detail/Kesehatan.vue");
const Hobi = () => import("@/views/Kelas/Siswa/Detail/Hobi.vue");
const OrangTua = () => import("@/views/Kelas/Siswa/Detail/OrangTua.vue");
const Pindahan = () => import("@/views/Kelas/Siswa/Detail/Pindahan.vue");

export default {
  components: {
    About,
    TempatTinggal,
    Pendidikan,
    Kesehatan,
    Hobi,
    OrangTua,
    Pindahan,
  },
  data() {
    return {
      kelas: this.$route.query?.kelas,
      items: {
        NIS: null,
        NISN: null,
        jenis_kelamin: null,
        kelas_id: null,
        nama_kelas: null,
        nama_siswa: null,
        nomor: null,
        siswa_id: null,
      },
      tab: 0,
      tabs: [
        { text: "Tentang Diri Siswa", component: "About" },
        { text: "Tempat Tinggal", component: "TempatTinggal" },
        { text: "Pendidikan", component: "Pendidikan" },
        { text: "Kesehatan", component: "Kesehatan" },
        { text: "Hobi", component: "Hobi" },
        { text: "Orang Tua Siswa", component: "OrangTua" },
        { text: "Pindahan", component: "Pindahan" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getSiswa"]),
  },
  methods: {
    ...mapMutations([RESET_SISWA_INFO]),
    handleBack() {
      this.$router.back();
    },
    handleEdit() {
      this.$router.push({
        name: SISWA.KELAS.SISWA.UPDATE,
        params: { kelasId: this.items.kelas_id },
        query: {
          kelas: this.kelas,
        },
      });
    },
    bindingData() {
      this.items = { ...this.items, ...this.getSiswa };
    },
    handleKompetensi() {
      this.$router.push({
        name: SISWA.KELAS.SISWA.TABEL_KOMPETENSI,
        params: {
          siswaId: this.items?.siswa_id,
          kelasId: this.items?.kelas_id,
        },
      });
    },
  },
  mounted() {
    this.bindingData();
  },
};
</script>

<style></style>
