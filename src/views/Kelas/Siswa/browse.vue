<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div v-if="overlay" id="color-overlay"></div>
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
          @click="handleCreate"
          depressed
          color="primary"
          class="rounded-lg mr-4"
        >
          <p class="header-button-title ma-0">
            <v-icon class="mr-1" small>mdi-plus</v-icon>
            <span> Tambah Siswa </span>
          </p>
        </v-btn>
        <!-- <v-btn depressed class="rounded-lg outlined-custom">
          <p class="header-button-export ma-0">
            <v-icon class="mr-1" small>mdi-download</v-icon>
            <span> Export Kelas {{ kelas }} </span>
          </p>
        </v-btn> -->
      </div>
    </div>
    <div class="d-flex flex-row justify-space-between mb-9 mt-1">
      <div>
        <p class="header-title mb-1">Tabel Siswa - Seluruh Kelas {{ kelas }}</p>
        <p class="header-subtitle mb-1">Daftar siswa Kelas {{ kelas }}</p>
      </div>
    </div>
    <v-tabs v-model="tab" color="tabMenu">
      <v-tab v-for="item in tabs" :key="item.val">
        <p class="ma-0 tabs-title">{{ item.text }}</p>
      </v-tab>
    </v-tabs>
    <div
      class="d-flex flex-row justify-space-between header my-6 pa-3 rounded-lg"
    >
      <div style="width: 288px">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Cari NIS, NISN atau Nama Siswa"
          hide-details
          solo
          dense
          class="rounded-lg"
        ></v-text-field>
      </div>
      <div style="width: 150px">
        <v-select
          v-model="sortBy"
          :items="itemSortBy"
          placeholder="Sort By"
          solo
          hide-details
          dense
          class="rounded-lg"
          color="primary"
          item-text="text"
          item-value="value"
        >
          <template #item="{ item }">
            <p class="selection-item ma-0">
              <v-icon small class="mr-3">
                {{ item.icon }}
              </v-icon>
              <span>
                {{ item.text }}
              </span>
            </p>
          </template>
        </v-select>
      </div>
    </div>
    <div class="table-border rounded-lg pa-4">
      <v-data-table
        :items="items"
        :headers="headers"
        :footer-props="{
          'items-per-page-options': rowsPerPageItems,
        }"
        :options.sync="options"
        :server-items-length="totalItem"
        :loading="loading"
        hide-default-header
        hide-default-footer
      >
        <template #header="{ props }">
          <tr class="table-header">
            <th
              class="table-header-text"
              v-for="(head, i) in props.headers"
              :style="{ width: customWidth(head.value) }"
              :key="i"
              :class="{
                'rounded-l-lg': i == isFirst,
                'rounded-r-lg': i == isLast,
              }"
            >
              {{ head.text }}
            </th>
          </tr>
        </template>
        <template #item.jenis_kelamin="{ item }">
          {{ item.jenis_kelamin | toTitle }}
        </template>
        <template #item.action="{ item }">
          <v-menu rounded left min-width="188px">
            <template v-slot:activator="{ attrs, on }">
              <v-hover v-slot="{ hover }" open-delay="100">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  depressed
                  color="primary"
                  class="rounded-lg"
                  style="width: 83px; height: 29px"
                  :style="{
                    'background-color': hover
                      ? 'white !important'
                      : '#0096C7 !important',
                  }"
                >
                  <p
                    class="ma-0"
                    :style="{ color: hover ? '#0096C7' : '#FFFFFF' }"
                  >
                    Buka
                  </p>
                  <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </v-hover>
            </template>
            <v-list>
              <v-list-item @click="() => handleDetail(item)" link>
                <img class="mr-4" src="@/assets/icons/detail.svg" />
                <p class="selection-item ma-0">Buka Detail</p>
              </v-list-item>
              <v-list-item @click="() => handleEdit(item)" link>
                <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
                <p class="selection-item ma-0">Edit Data</p>
              </v-list-item>
              <v-list-item @click="() => handleDelete(item)" link>
                <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
                <p class="selection-item ma-0">Hapus Data</p>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template #footer="{ props }">
          <CustomFooter
            :options="options"
            :props="props"
            :totalPage="totalPage"
          />
        </template>
      </v-data-table>
    </div>
    <div class="d-flex justify-end mt-12">
      <v-btn
        @click="handleRekapitulasi"
        :disabled="!isAvailable"
        depressed
        color="primary"
        class="rounded-lg"
      >
        <p class="header-button-title ma-0">
          <span> Buka Rekapitulasi </span>
        </p>
      </v-btn>
    </div>
  </div>
</template>

<script>
import KelasService from "@/services/resources/kelas.service";
import { SISWA } from "@/router/name.types";
import { SET_SISWA_INFO } from "@/store/constants/mutations.type";
import { mapMutations } from "vuex";
const CustomFooter = () => import("@/components/Table/Footer");

export default {
  components: {
    CustomFooter,
  },
  props: {
    overlay: { type: Boolean, required: true, default: false },
  },
  data() {
    return {
      id: this.$route.params?.kelasId,
      kelas: this.$route.query?.kelas,
      search: "",
      sortBy: "ASC",
      itemSortBy: [
        {
          text: "a-z Nama",
          value: "ASC",
          icon: "mdi-sort-ascending",
        },
        {
          text: "z-a Nama",
          value: "DESC",
          icon: "mdi-sort-descending",
        },
      ],
      headers: [
        { text: "NIS", value: "NIS", sortable: false },
        { text: "NISN", value: "NISN", sortable: false },
        {
          text: "Nama Lengkap",
          value: "nama_siswa",
          sortable: false,
          width: "321px",
        },
        { text: "Kelas", value: "nama_kelas", sortable: false },
        { text: "Jenis Kelamin", value: "jenis_kelamin", sortable: false },
        { text: "Aksi", value: "action", sortable: false },
      ],
      items: [],
      loading: false,
      options: {
        page: 1,
      },
      tab: "all",
      tabs: [
        { text: "Lihat Semua Siswa", val: "all" },
        { text: "Laki-Laki", val: "laki" },
        { text: "Perempuan", val: "perempuan" },
      ],
      totalItem: 0,
      totalPage: 1,
      rowsPerPageItems: [10, 20, 50, 100],
      doubleClickPrevent: false,
    };
  },
  methods: {
    ...mapMutations([SET_SISWA_INFO]),
    handleRekapitulasi() {
      this.$emit("on-rekapitulasi");
    },
    customWidth(head) {
      if (head == "NIS") return "10%";
      else if (head == "NISN") return "10%";
      else if (head == "nama_siswa") return "39%";
      else if (head == "nama_kelas") return "10%";
      else if (head == "jenis_kelamin") return "20%";
    },
    handleCreate() {
      this.$router.push({
        name: SISWA.KELAS.SISWA.CREATE,
        query: {
          kelas: this.kelas,
        },
        params: {
          kelasId: this.id,
        },
      });
    },
    handleBack() {
      this.$router.back();
    },
    handleDetail(item) {
      // this.setSiswaInfo(item);
      this.$router.push({
        name: SISWA.KELAS.SISWA.DETAIL,
        params: { secureId: item.siswa_id },
        query: {
          kelas: this.kelas,
          kelasId: this.id,
        },
      });
    },
    handleEdit(item) {
      this.$router.push({
        name: SISWA.KELAS.SISWA.UPDATE,
        params: { secureId: item.siswa_id, kelasId: item.kelas_id },
        query: {
          kelas: this.kelas,
          isUpdate: true,
        },
      });
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
      KelasService.deleteSiswa({
        id: item.siswa_id,
        type: "siswa",
      })
        .then(({ data: { success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menghapus data siswa`,
              color: "success",
            });
            this.getList();
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || `Gagal Menghapus data siswa`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Menghapus data siswa`,
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    getList() {
      const { page, itemsPerPage } = this.options;
      this.createToken(KelasService.cancelReq().source());
      this.loading = true;
      this.items = [];
      KelasService.getAllPerKelas(
        {
          kelas_id: this.id,
          search: this.search || null,
          tab: this.tabs[this.tab].val,
          page,
          limit: itemsPerPage,
          sort: this.sortBy,
        },
        { cancelToken: this.cancelRequest.token }
      )
        .then(({ data: { code, message, data, meta } }) => {
          if (code == 200) {
            data.map((d, index) => {
              d.nomor = itemsPerPage * (page - 1) + (index + 1);
            });
            this.items = [...data];
            this.$route.query.tahun_ajaran = data[0]?.tahun_ajaran;
            this.totalItem = meta.totalData;
            this.totalPage = meta.totalPage;
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Semua Kelas",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          // this.$store.commit("snackbar/setSnack", {
          //   show: true,
          //   message:
          //     err.response?.data?.message || "Gagal Memuat Data Semua Kelas",
          //   color: "error",
          // });
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    paginationProperties() {
      return [this.tab, this.search, this.sortBy].join();
    },
    isAvailable() {
      return !!this.totalItem;
    },
  },
  watch: {
    options: {
      handler() {
        this.fetchListDebounce(this.getList);
      },
      deep: true,
    },
    paginationProperties: {
      handler() {
        this.fetchListDebounce(this.getList);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
#color-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  background-color: black;
  opacity: 0.6;
  z-index: 1;
}
</style>
