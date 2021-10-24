<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div class="d-flex flex-row justify-space-between mb-9">
      <div>
        <p class="header-title mb-1">Tabel Siswa - Seluruh Kelas</p>
        <p class="header-subtitle mb-1">Daftar kelas seluruh angkatan</p>
      </div>
      <v-btn @click="handleAdd" depressed color="primary" class="rounded-lg">
        <p class="header-button-title ma-0">
          <v-icon class="mr-1" small>mdi-plus</v-icon>
          <span> Tambah Kelas </span>
        </p>
      </v-btn>
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
          placeholder="Cari wali kelas atau kelas"
          hide-details
          solo
          dense
          class="rounded-lg"
        ></v-text-field>
      </div>
      <div style="width: 150px">
        <v-select
          id="list"
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
              <v-list-item link>
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
  </div>
</template>

<script>
import KelasService from "@/services/resources/kelas.service";
import { SISWA } from "@/router/name.types";
const CustomFooter = () => import("@/components/Table/Footer");

export default {
  components: {
    CustomFooter,
  },
  data() {
    return {
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
        { text: "Nomor", value: "nomor", sortable: false },
        { text: "Kelas", value: "kelas", sortable: false },
        {
          text: "Wali Kelas",
          value: "walikelas",
          sortable: false,
          width: "321px",
        },
        { text: "Tahun Ajaran", value: "tahunAjaran", sortable: false },
        { text: "Aksi", value: "action", sortable: false },
      ],
      items: [],
      loading: false,
      options: {
        page: 1,
      },
      tab: "all",
      tabs: [
        { text: "Lihat Semua Kelas", val: "all" },
        { text: "IPA", val: "mipa" },
        { text: "IPS", val: "ips" },
      ],
      totalItem: 10,
      totalPage: 1,
      rowsPerPageItems: [10, 20, 50, 100],
      doubleClickPrevent: false,
    };
  },
  methods: {
    customWidth(head) {
      if (head == "walikelas") return "40%";
      else if (head == "no") return "10%";
      else if (head == "kelas") return "22%";
      else if (head == "tahunAjaran") return "20%";
    },
    handleAdd() {
      this.$router.replace({
        name: SISWA.KELAS.CREATE,
      });
    },
    handleDetail(item) {
      this.$router.push({
        name: SISWA.KELAS.PER_KELAS,
        params: { kelasId: item.kelas_id },
        query: { kelas: item.kelas },
      });
    },
    handleEdit(item) {
      this.$router.replace({
        name: SISWA.KELAS.UPDATE,
        params: {
          kelasId: item.kelas_id,
        },
      });
    },
    getList() {
      const { page, itemsPerPage } = this.options;
      this.createToken(KelasService.cancelReq().source());
      this.loading = true;
      KelasService.getAllKelas(
        {
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

<style></style>
