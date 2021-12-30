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
        {{ items.nama_guru || "-" }}
      </p>
    </div>
    <div class="d-flex flex-row">
      <ContentNotFound
        message="Data Riwayat Jabatan Not Found"
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
import { GURU } from "@/router/name.types";
import GuruService from "@/services/resources/guru.service";

export default {
  components: {
    Card,
    ContentNotFound,
  },
  data() {
    return {
      id: this.$route.params.guruId,
      loading: false,
      items: {
        nama_guru: null,
      },
      cardList: [],
    };
  },
  methods: {
    handleAdd() {
      this.$router.push({
        name: GURU.JABATAN.CREATE,
        params: { guruId: this.id },
      });
    },
    getList() {
      this.loading = true;
      GuruService.getListJabatan({
        guru_id: this.id,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = {
              nama_guru: data.nama,
            };
            this.cardList = [...data.data];
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
      this.cardList = [];
      GuruService.deleteJabatan(item.jabatan_id)
        .then(({ data: { success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menghapus data Riwayat Jabatan`,
              color: "success",
            });
            this.getList();
          } else {
            this.loading = false;
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || `Gagal Menghapus data Riwayat Jabatan`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Menghapus data Prestasi`,
            color: "error",
          });
        });
    },
    handleDetail(item) {
      this.$router.push({
        name: GURU.JABATAN.UPDATE,
        params: {
          jabatanId: item.jabatan_id,
        },
      });
    },
  },
  mounted() {
    this.getList();
  },
  computed: {
    isAvailable() {
      return this.cardList.length > 0;
    },
  },
};
</script>

<style></style>
