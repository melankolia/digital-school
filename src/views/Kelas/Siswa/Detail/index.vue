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
          :disabled="loading || isAlumni"
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
            <span> Download Detail {{ isAlumni ? "Alumni" : "Siswa" }} </span>
          </p>
        </v-btn> -->
      </div>
    </div>
    <div class="d-flex flex-row justify-space-between mb-9 mt-1">
      <div id="preview-photo" class="picture-border rounded-lg mr-4" />
      <div class="d-flex flex-column" style="width: 100vw">
        <div class="d-flex flex-row justify-space-between">
          <div class="d-flex flex-row">
            <p class="header-title mb-4">
              Tabel {{ isAlumni ? "Alumni" : "Siswa" }} -
              {{ getSiswa.nama_siswa || "-" | toTitle }}
            </p>
            <v-btn
              v-if="!isAlumni"
              @click="handleAlumni"
              :disabled="loading || loadingAlumni"
              :loading="loadingAlumni"
              outlined
              class="rounded-lg outlined-custom mx-4"
              color="primary"
            >
              <p class="header-button-export ma-0">
                <span> Jadikan Alumni </span>
              </p>
            </v-btn>
          </div>
          <div>
            <v-btn
              @click="handleKompetensi"
              :disabled="loading"
              outlined
              class="rounded-lg outlined-custom mr-4"
              color="primary"
            >
              <p class="header-button-export ma-0">
                <span> Lihat Kompetensi </span>
              </p>
            </v-btn>
            <v-btn
              @click="handlePrestasi"
              :disabled="loading"
              outlined
              class="rounded-lg outlined-custom"
              color="primary"
            >
              <p class="header-button-export ma-0">
                <span> Lihat Prestasi </span>
              </p>
            </v-btn>
          </div>
        </div>
        <div class="d-flex flex-column pr-12 mr-12">
          <p class="header-subtitle">
            {{ getSiswa.nama_siswa || "-" | toTitle }} -
            {{ getSiswa.nama_kelas || "-" | upperCase }}
          </p>
          <div class="d-flex flex-row">
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                NIS : {{ getSiswa.NIS || "-" | toTitle }}
              </p>
            </div>
            <div class="backgroundLabel">
              <p class="header-subtitle py-2 px-3 ma-0">
                NISN : {{ getSiswa.NISN || "-" | toTitle }}
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
            <component
              :is="tabs[tab].component"
              class="mt-6"
              @on-loading="loading = $event"
            />
          </keep-alive>
        </transition>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SiswaService from "@/services/resources/siswa.service";
import { RESET_SISWA_INFO } from "@/store/constants/mutations.type";
import { SISWA, ALUMNI } from "@/router/name.types";
const About = () => import("@/views/Kelas/Siswa/Detail/About.vue");
const TempatTinggal = () =>
  import("@/views/Kelas/Siswa/Detail/TempatTinggal.vue");
const Pendidikan = () => import("@/views/Kelas/Siswa/Detail/Pendidikan.vue");
const Kesehatan = () => import("@/views/Kelas/Siswa/Detail/Kesehatan.vue");
const Hobi = () => import("@/views/Kelas/Siswa/Detail/Hobi.vue");
const OrangTua = () => import("@/views/Kelas/Siswa/Detail/OrangTua.vue");
const Pindahan = () => import("@/views/Kelas/Siswa/Detail/Pindahan.vue");
const StatusBantuan = () =>
  import("@/views/Kelas/Siswa/Detail/StatusBantuan.vue");

export default {
  components: {
    About,
    TempatTinggal,
    Pendidikan,
    Kesehatan,
    Hobi,
    OrangTua,
    Pindahan,
    StatusBantuan,
  },
  data() {
    return {
      kelas: this.$route.query?.kelas,
      loading: false,
      loadingAlumni: false,
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
        {
          text: "Tentang Diri Siswa",
          component: "About",
        },
        { text: "Tempat Tinggal", component: "TempatTinggal" },
        { text: "Pendidikan", component: "Pendidikan" },
        { text: "Kesehatan", component: "Kesehatan" },
        { text: "Hobi", component: "Hobi" },
        {
          text: "Orang Tua Siswa",
          component: "OrangTua",
        },
        { text: "Pindahan", component: "Pindahan" },
        { text: "Status Bantuan", component: "StatusBantuan" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getSiswa"]),
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.DETAIL;
    },
  },
  methods: {
    ...mapMutations([RESET_SISWA_INFO]),
    handleBack() {
      this.$router.push({
        name: this.isAlumni ? ALUMNI.ALL.BROWSE : SISWA.ALL.BROWSE,
      });
    },
    handleAlumni() {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to change this siswa status to alumni ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.requestChangeAlumni();
          }
        },
      });
    },
    requestChangeAlumni() {
      this.loadingAlumni = true;
      SiswaService.changeToAlumni({
        siswa_id: this.$route.params?.secureId,
      })
        .then(({ data: { success, message } }) => {
          if (success == true) {
            this.$router.replace({
              name: ALUMNI.DETAIL,
              params: { secureId: this.$route.params?.secureId },
              query: {
                kelas: this.kelas,
                kelasId: this.getSiswa.kelas_id,
              },
            });
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Mengubah Status Siswa Menjadi Alumni`,
              color: "success",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || `Gagal Mengubah Status Siswa Menjadi Alumni`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Mengubah Status Siswa Menjadi Alumni`,
            color: "error",
          });
        })
        .finally(() => (this.loadingAlumni = true));
      setTimeout(() => {
        this.loadingAlumni = false;
      }, 3000);
    },
    handleEdit() {
      this.$router.push({
        name: this.isAlumni ? ALUMNI.UPDATE : SISWA.KELAS.SISWA.UPDATE,
        params: { kelasId: this.getSiswa.kelas_id },
        query: {
          kelas: this.kelas,
          isUpdate: true,
        },
      });
    },
    handleKompetensi() {
      this.$router.push({
        name: this.isAlumni
          ? ALUMNI.TABEL_KOMPETENSI
          : SISWA.KELAS.SISWA.TABEL_KOMPETENSI,
        params: {
          siswaId: this.$route.params?.secureId,
          kelasId: this.$route.query?.kelasId,
        },
      });
    },
    handlePrestasi() {
      this.$router.push({
        name: this.isAlumni ? ALUMNI.PRESTASI : SISWA.KELAS.SISWA.PRESTASI,
        params: {
          siswaId: this.$route.params?.secureId,
        },
      });
    },
  },
  mounted() {
    this[RESET_SISWA_INFO]();
    if (this.isAlumni) {
      this.tabs[0].text = "Tentang Diri Alumni";
      this.tabs[5].text = "Orang Tua Alumni";
    }
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
