<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7">
    <div class="d-flex flex-row justify-space-between mb-6 mt-1 mr-12">
      <div>
        <p class="header-title mb-1">Rekapitulasi Siswa</p>
      </div>
      <v-btn depressed class="rounded-lg outlined-custom">
        <p class="header-button-export ma-0">
          <v-icon class="mr-1" small>mdi-download</v-icon>
          <span> Export Rekapitulasi Siswa </span>
        </p>
      </v-btn>
    </div>
    <v-tabs class="mb-6" v-model="tab" color="tabMenu">
      <v-tab v-for="item in tabs" :key="item.val">
        <p class="ma-0 tabs-title">{{ item.text }}</p>
      </v-tab>
    </v-tabs>
    <div class="table-border mb-6 rounded-lg pa-4">
      <DefaultLoader :loading="loading" v-if="loading" />
      <v-simple-table v-else>
        <thead>
          <tr>
            <th rowspan="2" class="table-header-text border-bottom text-center">
              No
            </th>
            <th
              rowspan="2"
              class="table-header-text border-bottom text-center"
              style="min-width: 120px"
            >
              Kelas
            </th>
            <th
              colspan="3"
              class="
                text-center
                table-header-text table-header
                border-right border-left
              "
            >
              Jenis Kelamin
            </th>
            <th colspan="6" class="text-center table-header-text border-right">
              Agama
            </th>
            <th
              :colspan="tahun_kelahiran.length || '0'"
              class="text-center table-header table-header-text"
            >
              Tahun Kelahiran
            </th>
            <th
              colspan="6"
              class="text-center table-header-text border-left border-right"
            >
              Tidak Mampu
            </th>
          </tr>
          <tr>
            <th
              class="
                text-center
                table-header table-header-text
                border-bottom border-left
              "
              style="min-width: 100px"
            >
              Laki-Laki
            </th>
            <th
              class="text-center table-header table-header-text border-bottom"
            >
              Perempuan
            </th>
            <th
              class="
                text-center
                table-header table-header-text
                border-bottom border-right
              "
            >
              Total
            </th>
            <th class="text-center table-header-text border-bottom">Islam</th>
            <th class="text-center table-header-text border-bottom">Kristen</th>
            <th class="text-center table-header-text border-bottom">
              Protestan
            </th>
            <th class="text-center table-header-text border-bottom">Hindu</th>
            <th class="text-center table-header-text border-bottom">Budha</th>
            <th
              class="text-center table-header-text border-bottom border-right"
            >
              Total
            </th>
            <th
              class="text-center table-header table-header-text border-bottom"
              v-for="(items, index) in tahun_kelahiran"
              :key="index"
            >
              <span v-for="(item, index2) in items" :key="index2">
                {{ index2 }}
              </span>
            </th>
            <th
              class="text-center table-header-text border-bottom border-left"
              style="min-width: 100px"
            >
              Laki-laki
            </th>
            <th class="text-center table-header-text border-bottom">
              Perempuan
            </th>
            <th class="text-center table-header-text border-bottom">Jumlah</th>
            <th class="text-center table-header-text border-bottom">KPS</th>
            <th
              class="text-center table-header-text border-bottom"
              style="min-width: 100px"
            >
              NON KPS
            </th>
            <th
              class="text-center table-header-text border-bottom border-right"
            >
              Jumlah
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="`table-row-${index}`">
            <td class="text-center">{{ item.no || "-" }}</td>
            <td class="text-center">{{ item.nama_kelas || "-" }}</td>
            <td class="text-center border-left">
              {{ (item.kelamin && item.kelamin.L) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.kelamin && item.kelamin.P) || "-" }}
            </td>
            <td class="text-center border-right">
              {{ (item.kelamin && item.kelamin.total) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.islam) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.kristen) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.protestan) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.hindu) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.budha) || "-" }}
            </td>
            <td class="text-center border-right">
              {{ (item.agama && item.agama.total) || "-" }}
            </td>
            <td
              class="text-center"
              v-for="(items, tahunIndex) in item.tahun_kelahiran"
              :key="`tahun-row-${tahunIndex}`"
            >
              <span v-for="(item, index) in items" :key="`tahun-span-${index}`">
                {{ item || "-" }}
              </span>
            </td>
            <td class="text-center border-left">
              {{ (item.tidak_mampu && item.tidak_mampu.L) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.tidak_mampu && item.tidak_mampu.P) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.tidak_mampu && item.tidak_mampu.total) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.tidak_mampu && item.tidak_mampu.kps) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.tidak_mampu && item.tidak_mampu.non_kps) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.tidak_mampu && item.tidak_mampu.total) || "-" }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
const DefaultLoader = () => import("@/components/Loader/Default");
import RekapitulasiService from "@/services/resources/rekapitulasi.service";

export default {
  components: {
    DefaultLoader,
  },
  data() {
    return {
      tab: "all",
      tabs: [
        { text: "All", val: "all" },
        { text: "Kelas 10", val: "kelas10" },
        { text: "Kelas 11", val: "kelas11" },
        { text: "Kelas 12", val: "kelas12" },
      ],
      tahun_kelahiran: [],
      items: [],
      loading: false,

      // Data Table Properties
    };
  },
  methods: {
    getRekapitulasi() {
      this.loading = true;
      RekapitulasiService.getPerkelas({
        type: "04248256-9373-4081-bf14-9b6d21ad991f",
        tahun_ajaran: "2019-2020",
      })
        .then(({ data: { code, message, data } }) => {
          if (code == 200) {
            if (data.length > 0) {
              this.tahun_kelahiran = data[0].tahun_kelahiran;
              data.map((e, i) => (e.no = i + 1));
              this.items = [...data];
            }
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

.border-bottom {
  border-bottom: 1px solid #000000 !important;
}

.border-right {
  border-right: 1px solid #000000 !important;
}

.border-left {
  border-left: 1px solid #000000 !important;
}

.border-all {
  border: 1px solid #000000 !important;
}
</style>
