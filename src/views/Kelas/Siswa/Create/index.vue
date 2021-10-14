<template>
  <div class="d-flex flex-column mt-6 ml-7 mr-7 mb-12">
    <transition name="slide-fade" mode="out-in">
      <keep-alive>
        <component
          @handleLoading="loading = $event"
          @handleNext="handleNext"
          @handleId="siswaId = $event"
          :siswaId="siswaId"
          ref="childComponent"
          :is="selected.component"
        />
      </keep-alive>
    </transition>
    <v-row>
      <v-col cols="12" xs="12" sm="6">
        <v-btn @click="handlePrev" block depressed class="rounded-lg pa-6">
          <p class="header-button-back ma-0">
            <span> Kembali </span>
          </p>
        </v-btn>
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <v-btn
          block
          @click="handleSubmit"
          depressed
          color="primary"
          class="rounded-lg pa-6"
          :loading="loading"
        >
          <p class="header-button-back ma-0">
            <span> {{ disabledNext ? "Selesai" : "Selanjutnya" }} </span>
          </p>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const About = () => import("@/views/Kelas/Siswa/Create/About");
const TempatTinggal = () => import("@/views/Kelas/Siswa/Create/TempatTinggal");
const KeteranganPendidikan = () =>
  import("@/views/Kelas/Siswa/Create/KeteranganPendidikan");
const KeteranganKesehatan = () =>
  import("@/views/Kelas/Siswa/Create/KeteranganKesehatan");
const KeteranganHobi = () =>
  import("@/views/Kelas/Siswa/Create/KeteranganHobi");
const KeteranganOrangTua = () =>
  import("@/views/Kelas/Siswa/Create/KeteranganOrangTua");
const KeteranganPindahan = () =>
  import("@/views/Kelas/Siswa/Create/KeteranganPindahan");
import { SISWA } from "@/router/name.types";

export default {
  components: {
    About,
    TempatTinggal,
    KeteranganPendidikan,
    KeteranganKesehatan,
    KeteranganHobi,
    KeteranganOrangTua,
    KeteranganPindahan,
  },
  data() {
    return {
      id: this.$route.query?.secureId,
      kelas: this.$route.query?.kelas,
      siswaId: this.$route.params?.secureId,
      loading: false,
      selected: {
        id: 0,
        title: "About",
        component: About,
      },
      components: [
        {
          id: 0,
          title: "About",
          component: About,
        },
        {
          id: 1,
          title: "Tempat Tinggal",
          component: TempatTinggal,
        },
        {
          id: 2,
          title: "Keterangan Pendidikan",
          component: KeteranganPendidikan,
        },
        {
          id: 3,
          title: "Keterangan Kesehatan",
          component: KeteranganKesehatan,
        },
        {
          id: 4,
          title: "Keterangan Hobi",
          component: KeteranganHobi,
        },
        {
          id: 5,
          title: "Keterangan OrangTua",
          component: KeteranganOrangTua,
        },
        {
          id: 6,
          title: "Keterangan Pindahan",
          component: KeteranganPindahan,
        },
      ],
    };
  },
  mounted() {
    console.log(this.$route.params);
  },
  computed: {
    disabledPrev() {
      return this.selected.id === 0;
    },
    disabledNext() {
      return this.selected.id == this.components.length - 1;
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.childComponent.handleSubmit();
    },
    handlePrev() {
      if (this.disabledPrev) {
        this.$router.push({
          name: SISWA.KELAS.PER_KELAS,
          params: {
            secureId: this.id,
          },
          query: {
            kelas: this.kelas,
          },
        });
      } else {
        this.selected = this.components[this.selected.id - 1];
      }
      this.$vuetify.goTo(1, {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic",
      });
    },
    handleNext() {
      this.selected = this.components[this.selected.id + 1];
    },
  },
};
</script>
