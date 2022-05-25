<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7">
    <div class="d-flex flex-row justify-space-between mb-6 mt-1 mr-12">
      <div>
        <p class="header-title mb-1">Rekapitulasi Siswa</p>
      </div>
      <!-- <v-btn depressed class="rounded-lg outlined-custom">
        <p class="header-button-export ma-0">
          <v-icon class="mr-1" small>mdi-download</v-icon>
          <span> Export Rekapitulasi Siswa </span>
        </p>
      </v-btn> -->
    </div>
    <v-tabs class="mb-6" v-model="tab" color="tabMenu">
      <v-tab v-for="item in tabs" :key="item.val">
        <p class="ma-0 tabs-title">{{ item.text }}</p>
      </v-tab>
    </v-tabs>
    <div class="table-border mb-6 rounded-lg pa-4">
      <ContentNotFound
        :message="`Data Rekapitulasi Siswa Not Found`"
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
            <th colspan="6" class="text-center table-header-text border-left">
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
            <th class="text-center table-header-text border-bottom">Katolik</th>
            <th class="text-center table-header-text border-bottom">
              Protestan
            </th>
            <th class="text-center table-header-text border-bottom">Hindu</th>
            <th class="text-center table-header-text border-bottom">Buddha</th>
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
              <span>
                {{ items }}
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
            <th class="text-center table-header-text border-bottom">Jumlah</th>
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
              {{ (item.agama && item.agama.katolik) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.protestan) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.hindu) || "-" }}
            </td>
            <td class="text-center">
              {{ (item.agama && item.agama.buddha) || "-" }}
            </td>
            <td class="text-center border-right">
              {{ (item.agama && item.agama.total) || "-" }}
            </td>
            <td
              class="text-center"
              v-for="(items, tahunIndex) in item.tahun_kelahiran_object"
              :key="`tahun-row-${tahunIndex}`"
            >
              <span>
                {{ items || "-" }}
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
          <tr>
            <td colspan="2" class="table-header text-center border-top">
              Jumlah {{ kelas }}
            </td>
            <td class="table-header text-center border-top border-left">
              {{ total.jenis_kelamin.laki || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.jenis_kelamin.perempuan || "-" }}
            </td>
            <td class="table-header text-center border-top border-right">
              {{ total.jenis_kelamin.total || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.agama.islam || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.agama.katolik || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.agama.protestan || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.agama.hindu || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.agama.buddha || "-" }}
            </td>
            <td class="table-header text-center border-top border-right">
              {{ total.agama.total || "-" }}
            </td>
            <td
              class="table-header text-center border-top"
              v-for="(items, tahunIndex) in total.tahun_kelahiran"
              :key="`tahun-row-${tahunIndex}`"
            >
              <span>
                {{ items || "-" }}
              </span>
            </td>
            <td class="table-header text-center border-top border-left">
              {{ total.tidak_mampu.laki || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.tidak_mampu.perempuan || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.tidak_mampu.jumlah || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.tidak_mampu.kps || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.tidak_mampu.non_kps || "-" }}
            </td>
            <td class="table-header text-center border-top">
              {{ total.tidak_mampu.jumlah || "-" }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
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
      tab: 0,
      tabs: [
        { text: "Kelas X", val: "X" },
        { text: "Kelas XI", val: "XI" },
        { text: "Kelas XII", val: "XII" },
      ],
      tahun_kelahiran: [],
      items: [],
      loading: false,

      total: {
        jenis_kelamin: {
          laki: 0,
          perempuan: 0,
          total: 0,
        },
        agama: {
          islam: 0,
          katolik: 0,
          protestan: 0,
          hindu: 0,
          budha: 0,
          total: 0,
        },
        tidak_mampu: {
          laki: 0,
          perempuan: 0,
          jumlah: 0,
          kps: 0,
          non_kps: 0,
        },
        tahun_kelahiran: {},
      },

      // Data Table Properties
    };
  },
  methods: {
    getRekapitulasi() {
      this.items = [];
      this.total = {
        jenis_kelamin: {
          laki: 0,
          perempuan: 0,
          total: 0,
        },
        agama: {
          islam: 0,
          katolik: 0,
          protestan: 0,
          hindu: 0,
          budha: 0,
          total: 0,
        },
        tidak_mampu: {
          laki: 0,
          perempuan: 0,
          jumlah: 0,
          kps: 0,
          non_kps: 0,
        },
        tahun_kelahiran: {},
      };
      this.loading = true;
      RekapitulasiService.getPerkelas({
        type: this.tabs[this.tab].val,
      })
        .then(({ data: { code, message, data } }) => {
          if (code == 200) {
            if (data.length > 0) {
              const tahun_kelahiran = [
                ...data.map((e) =>
                  e.tahun_kelahiran.map((e2) => Object.keys(e2))
                ),
              ].flat(2);
              tahun_kelahiran.sort((a, b) => a - b);
              const result_tahun_kelahiran = [...new Set(tahun_kelahiran)];
              this.tahun_kelahiran = [...result_tahun_kelahiran];
              this.tahun_kelahiran.map((e) => {
                this.total.tahun_kelahiran[e] = "";
              });

              data.map((e, i) => (e.no = i + 1));
              data.map((e) => {
                // Jenis Kelamin
                this.total.jenis_kelamin.laki += e.kelamin?.L;
                this.total.jenis_kelamin.perempuan += e.kelamin?.P;
                this.total.jenis_kelamin.total += e.kelamin?.total;

                // Agama
                this.total.agama.islam += e.agama?.islam;
                this.total.agama.katolik += e.agama?.katolik;
                this.total.agama.protestan += e.agama?.protestan;
                this.total.agama.hindu += e.agama?.hindu;
                this.total.agama.buddha += e.agama?.buddha;
                this.total.agama.total += e.agama?.total;

                // Tidak Mampu
                this.total.tidak_mampu.laki += e.tidak_mampu.L;
                this.total.tidak_mampu.perempuan += e.tidak_mampu.P;
                this.total.tidak_mampu.jumlah += e.tidak_mampu.total;
                this.total.tidak_mampu.kps += e.tidak_mampu.kps;
                this.total.tidak_mampu.non_kps += e.tidak_mampu.non_kps;
              });

              data.map((e) => {
                e.tahun_kelahiran.map((e2) => {
                  e.tahun_kelahiran_object = {
                    ...e.tahun_kelahiran_object,
                    ...e2,
                  };
                });
              });

              data.map((e) => {
                this.tahun_kelahiran.map((e2) => {
                  if (!e.tahun_kelahiran_object[e2])
                    e.tahun_kelahiran_object[e2] = "";
                });
              });

              data.map((e) => {
                Object.keys(this.total.tahun_kelahiran).map((e2) => {
                  this.total.tahun_kelahiran[e2] =
                    +this.total.tahun_kelahiran[e2] +
                    +e.tahun_kelahiran_object[e2];
                });
              });

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
  computed: {
    isAvailable() {
      return this.items.length > 0;
    },
    kelas() {
      return this.tabs[this.tab].text;
    },
  },
  watch: {
    tab(val) {
      val !== null && this.getRekapitulasi();
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

.border-top {
  border-top: 1px solid #000000 !important;
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
