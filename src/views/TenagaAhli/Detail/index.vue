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
        <!-- <v-btn depressed class="rounded-lg outlined-custom">
          <p class="header-button-export ma-0">
            <v-icon class="mr-1" small>mdi-download</v-icon>
            <span> Download Detail Tenaga Kependidikan </span>
          </p>
        </v-btn> -->
      </div>
    </div>
    <div class="d-flex flex-row justify-space-between mb-9 mt-1">
      <div id="preview-photo" class="picture-border rounded-lg mr-4" />
      <div class="d-flex flex-column" style="width: 100vw">
        <div class="d-flex flex-row justify-space-between">
          <p class="header-title mb-4">Tentang Diri Tenaga Kependidikan</p>
          <div>
            <v-btn
              @click="handleRiwayatJabatan"
              outlined
              class="rounded-lg outlined-custom"
              color="primary"
            >
              <p class="header-button-export ma-0">
                <span> Lihat Riwayat Jabatan </span>
              </p>
            </v-btn>
          </div>
        </div>
        <div class="d-flex flex-column pr-12 mr-12">
          <p class="header-subtitle">
            {{ items.nama || "-" | toTitle }} -
            {{ items.jabatan || "-" | toTitle }}
          </p>
        </div>
      </div>
    </div>
    <v-tabs v-model="tab" color="tabMenu">
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
import { RESET_TENAGA_AHLI_INFO } from "@/store/constants/mutations.type";
import { TENAGA_AHLI } from "@/router/name.types";
const About = () => import("@/views/TenagaAhli/Detail/About.vue");
// const RiwayatJabatan = () =>
//   import("@/views/TenagaAhli/Detail/RiwayatJabatan.vue");

export default {
  components: {
    About,
    // RiwayatJabatan,
  },
  data() {
    return {
      items: {
        NIP: null,
        nama: null,
        jabatan: null,
        tenaga_ahli_id: null,
      },
      tab: 0,
      tabs: [
        { text: "Tentang Diri Tenaga Kependidikan", component: "About" },
        // { text: "Riwayat Jabatan", component: "RiwayatJabatan" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getTenagaAhli"]),
  },
  methods: {
    ...mapMutations([RESET_TENAGA_AHLI_INFO]),
    bindingData() {
      this.items = { ...this.items, ...this.getTenagaAhli };
    },
    handleEdit() {
      this.$router.push({
        name: TENAGA_AHLI.UPDATE,
        params: { tenagaAhliId: this.items.tenaga_ahli_id },
      });
    },
    handleRiwayatJabatan() {
      this.$router.push({
        name: TENAGA_AHLI.JABATAN.DETAIL,
        params: { tenagaAhliId: this.items.tenaga_ahli_id },
      });
    },
  },
  mounted() {
    this.bindingData();
  },
};
</script>

<style scoped>
.picture-border {
  width: 186px;
  height: 180px;
  background: gray;
  border: 1px solid #f4f4f4;
}
</style>
