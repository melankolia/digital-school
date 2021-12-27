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
    <div class="d-flex flex-row flex-wrap">
      <ContentNotFound
        :message="`Data Prestasi ${isAlumni ? 'Alumni' : 'Siswa'} Not Found`"
        :loading="loading"
        v-if="!isAvailable"
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
      <Card
        v-else
        v-for="(item, index) in cardList"
        :cardDetail="item"
        :key="index"
        :handleDelete="handleDelete"
        :handleDetail="handleDetail"
      />
    </div>
  </div>
</template>

<script>
const Card = () => import("@/components/Card");
const ContentNotFound = () => import("@/components/Content/NotFound");
import SiswaService from "@/services/resources/siswa.service";
import { SISWA, ALUMNI } from "@/router/name.types";

export default {
  components: {
    Card,
    ContentNotFound,
  },
  data() {
    return {
      loading: false,
      id: this.$route.params?.siswaId,
      items: {
        nama_siswa: null,
        nama_kelas: null,
      },
      cardList: [],
    };
  },
  computed: {
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.PRESTASI;
    },
    isAvailable() {
      return this.cardList.length > 0;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleAdd() {
      this.$router.push({
        name: this.isAlumni
          ? ALUMNI.CREATE_PRESTASI
          : SISWA.KELAS.SISWA.CREATE_PRESTASI,
      });
    },
    getList() {
      this.loading = true;
      SiswaService.getPrestasi({
        siswa_id: this.id,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = {
              nama_siswa: data.nama,
              nama_kelas: data.kelas,
            };
            this.cardList = [...data.data];
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
    handleDelete(item) {
      this.$confirm({
        title: "Confirm",
        message: `Are you sure you want to delete ?`,
        button: {
          no: "No",
          yes: "Yes",
        },
        callback: (confirm) => {
          if (confirm) {
            this.requestDelete(item);
          }
        },
      });
    },
    requestDelete(item) {
      this.loading = true;
      SiswaService.deletePrestasi(item.prestasi_id)
        .then(({ data: { success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menghapus data Prestasi`,
              color: "success",
            });
            this.getList();
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || `Gagal Menghapus data Prestasi`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Menghapus data Prestasi`,
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    handleDetail(item) {
      this.$router.push({
        name: SISWA.KELAS.SISWA.UPDATE_PRESTASI,
        params: {
          prestasiId: item.prestasi_id,
        },
      });
    },
  },
};
</script>

<style></style>
