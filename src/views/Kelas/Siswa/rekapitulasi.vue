<template>
  <div class="dialog-container">
    <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
      <div class="d-flex flex-row justify-space-between mb-12">
        <v-btn
          @click="closeRekapitulasi"
          depressed
          color="header"
          class="rounded-lg mr-4 outlined-custom"
        >
          <p class="header-button-back ma-0">
            <span> Close </span>
          </p>
        </v-btn>
      </div>
      <div class="d-flex flex-row justify-space-between mb-6 mt-1">
        <div>
          <p class="header-title mb-1">Rekapitulasi Siswa - {{ kelas }}</p>
        </div>
      </div>
      <ContentNotFound
        message="Data Rekapitulasi Siswa Kelas Not Found"
        :loading="loading"
        v-if="!isAvailable"
      >
        <template v-slot:action>
          <v-btn
            @click="() => getRekapitulasi()"
            depressed
            color="header"
            class="rounded-lg outlined-custom"
          >
            <v-icon class="mr-1" small>mdi-reload</v-icon>
            <p class="header-button-back ma-0">Reload</p>
          </v-btn>
        </template>
      </ContentNotFound>
      <template v-else>
        <div class="table-border mb-6 rounded-lg pa-4">
          <p class="mb-6 kelompok-label">Jenis Kelamin</p>
          <v-simple-table>
            <thead>
              <tr class="table-header">
                <th class="table-header-text rounded-l-lg">Laki-Laki</th>
                <th class="table-header-text">Perempuan</th>
                <th class="table-header-text rounded-r-lg">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="table-header-text">{{ kelamin.L }}</td>
                <td class="table-header-text">{{ kelamin.P }}</td>
                <td class="table-header-text">{{ kelamin.total }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
        <div class="table-border mb-6 rounded-lg pa-4">
          <p class="mb-6 kelompok-label">Agama</p>
          <v-simple-table>
            <thead>
              <tr class="table-header">
                <th class="table-header-text rounded-l-lg">Islam</th>
                <th class="table-header-text">Katolik</th>
                <th class="table-header-text">Kristen</th>
                <th class="table-header-text">Hindu</th>
                <th class="table-header-text">Buddha</th>
                <th class="table-header-text rounded-r-lg">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="table-header-text">{{ agama.islam || "-" }}</td>
                <td class="table-header-text">{{ agama.khatolik || "-" }}</td>
                <td class="table-header-text">{{ agama.protestan || "-" }}</td>
                <td class="table-header-text">{{ agama.hindu || "-" }}</td>
                <td class="table-header-text">{{ agama.budha || "-" }}</td>
                <td class="table-header-text">{{ agama.total || "-" }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
        <div class="table-border mb-6 rounded-lg pa-4">
          <p class="mb-6 kelompok-label">Tahun Kelahiran</p>
          <v-simple-table>
            <thead>
              <tr class="table-header">
                <th
                  class="table-header-text"
                  :class="{
                    'rounded-l-lg': index == 0,
                    'rounded-r-lg': index == tahun_kelahiran.length - 1,
                  }"
                  v-for="(items, index) in tahun_kelahiran"
                  :key="index"
                >
                  <span v-for="(item, index2) in items" :key="index2">
                    {{ index2 }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  class="table-header-text"
                  v-for="(items, index) in tahun_kelahiran"
                  :key="index"
                >
                  <span v-for="(item, index2) in items" :key="index2">
                    {{ item || "-" }}
                  </span>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
        <div class="table-border mb-6 rounded-lg pa-4">
          <p class="mb-6 kelompok-label">Tidak Mampu</p>
          <v-simple-table>
            <thead>
              <tr class="table-header">
                <th class="table-header-text rounded-l-lg">Laki-laki</th>
                <th class="table-header-text">Perempuan</th>
                <th class="table-header-text">Jumlah</th>
                <th class="table-header-text">KPS</th>
                <th class="table-header-text">Non KPS</th>
                <th class="table-header-text rounded-r-lg">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="table-header-text">{{ tidak_mampu.L || "-" }}</td>
                <td class="table-header-text">{{ tidak_mampu.P || "-" }}</td>
                <td class="table-header-text">
                  {{ tidak_mampu.total || "-" }}
                </td>
                <td class="table-header-text">{{ tidak_mampu.kps || "-" }}</td>
                <td class="table-header-text">
                  {{ tidak_mampu.non_kps || "-" }}
                </td>
                <td class="table-header-text">
                  {{ tidak_mampu.total || "-" }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import RekapitulasiService from "@/services/resources/rekapitulasi.service";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      loading: false,
      kelas: this.$route.query?.kelas,
      id: this.$route.params?.kelasId,
      tahun_ajaran: this.$route.query?.tahun_ajaran,
      kelas_id: null,
      kelamin: {
        L: null,
        P: null,
        total: null,
      },
      agama: {
        budha: null,
        hindu: null,
        islam: null,
        khatolik: null,
        protestan: null,
        total: null,
      },
      tahun_kelahiran: [],
      tidak_mampu: {
        L: null,
        P: null,
        kps: null,
        non_kps: null,
        total: null,
      },
    };
  },
  methods: {
    closeRekapitulasi() {
      this.$emit("close-rekapitulasi");
    },
    getRekapitulasi() {
      this.loading = true;
      RekapitulasiService.getPerkelas({
        type: this.id,
      })
        .then(({ data: { code, message, data } }) => {
          if (code == 200) {
            this.kelamin = {
              L: data[0].kelamin.L,
              P: data[0].kelamin.P,
              total: data[0].kelamin.total,
            };
            this.agama = {
              budha: data[0].agama.budha,
              hindu: data[0].agama.hindu,
              islam: data[0].agama.islam,
              khatolik: data[0].agama.khatolik,
              protestan: data[0].agama.protestan,
              total: data[0].agama.total,
            };
            this.tidak_mampu = {
              L: data[0].tidak_mampu.L,
              P: data[0].tidak_mampu.P,
              kps: data[0].tidak_mampu.kps,
              non_kps: data[0].tidak_mampu.non_kps,
              total: data[0].tidak_mampu.total,
            };
            this.tahun_kelahiran = [...data[0].tahun_kelahiran];
            this.kelas_id = data[0].kelas_id;
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Rekapitulasi Kelas",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Rekapitulasi Kelas",
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    isAvailable() {
      return this.kelas_id;
    },
  },
  mounted() {
    this.getRekapitulasi();
  },
};
</script>

<style scoped>
.kelompok-label {
  font-family: "Poppins";
  font-size: 16px;
  font-style: normal;
  font-weight: 500 !important;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
}

.dialog-container {
  position: absolute;
  background-color: white;
  width: 98%;
  z-index: 2;
}
</style>
