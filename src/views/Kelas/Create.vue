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
    </div>
    <div class="d-flex flex-row justify-space-between">
      <p class="header-title mb-4">Tambah Kelas</p>
    </div>
    <DefaultLoader :loading="loading" v-if="loading" />
    <template v-else>
      <div class="d-flex flex-column">
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">Nama Kelas</p>
            <v-text-field
              v-model="payload.nama_kelas"
              hide-details
              filled
              solo
              label="Contoh: XI MIPA 1"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">Wali Kelas</p>
            <v-select
              :items="itemsWaliKelas"
              v-model="payload.wali_kelas"
              clearable
              hide-details
              filled
              solo
              type="number"
              label="Contoh: Sugiono"
              item-text="nama_guru"
              return-object
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">Tahun Ajaran</p>
            <v-text-field
              v-model="payload.tahun_ajaran"
              hide-details
              filled
              solo
              type="number"
              label="Contoh: 2019-2020"
            />
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
            :loading="loadingSubmit"
            @click="handleSubmit"
          >
            <p class="header-button-back ma-0">
              <span> Submit </span>
            </p>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
const DefaultLoader = () => import("@/components/Loader/Default");
import { SISWA } from "@/router/name.types";

export default {
  components: {
    DefaultLoader,
  },
  data() {
    return {
      loading: false,
      loadingSubmit: false,
      id: this.$route.params?.kelasId,
      itemsWaliKelas: [
        {
          nama_guru: "Sugiono",
          guru_id: "12345-12312332-123123",
        },
      ],
      payload: {
        kelas_id: null,
        nama_kelas: null,
        wali_kelas: null,
        tahun_ajaran: null,
      },
    };
  },
  computed: {
    isUpdate() {
      return this.id;
    },
  },
  methods: {
    handleBack() {
      this.$router.replace({
        name: SISWA.KELAS.BROWSE,
      });
    },
    handleSubmit() {
      this.loadingSubmit = true;
      console.log(this.payload);
      setTimeout(() => {
        this.$router.replace({
          name: SISWA.KELAS.BROWSE,
        });
        this.loadingSubmit = false;
      }, 3000);
    },
    getDetail() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
  },
  mounted() {
    this.isUpdate && this.getDetail();
  },
};
</script>

<style></style>
