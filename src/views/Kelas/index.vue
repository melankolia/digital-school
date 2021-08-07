<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div class="d-flex flex-row justify-space-between mb-9">
      <div>
        <p class="header-title mb-1">Tabel Siswa - Seluruh Kelas</p>
        <p class="header-subtitle mb-1">Daftar kelas seluruh angkatan</p>
      </div>
      <v-btn depressed color="primary" class="rounded-lg">
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
                {{
                  item.value == "ASC"
                    ? "mdi-sort-ascending"
                    : "mdi-sort-descending"
                }}
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
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-btn
              small
              depressed
              @click="() => handleClick(item)"
              color="primary"
              class="rounded-lg"
              style="width: 83px; height: 29px"
              :style="{
                'background-color': hover
                  ? 'white !important'
                  : '#0096C7 !important',
              }"
            >
              <p class="ma-0" :style="{ color: hover ? '#0096C7' : '#FFFFFF' }">
                Buka
              </p>
            </v-btn>
          </v-hover>
        </template>
        <template #footer="{ props }">
          <div
            class="
              table-footer
              rounded-b-lg
              d-flex
              flex-row
              align-center
              justify-space-between
              px-7
              py-8
            "
          >
            <div class="d-flex flex-row align-center justify-center pr-7">
              <v-select
                v-model="options.itemsPerPage"
                :items="props.itemsPerPageOptions"
                solo
                hide-details
                dense
                style="width: 80px"
                class="rounded-lg mr-4"
                color="primary"
                item-text="text"
                item-value="value"
              >
                <template #item="{ item }">
                  <p class="selection-item ma-0">
                    <span>
                      {{ item }}
                    </span>
                  </p>
                </template>
              </v-select>
              <p class="table-footer-text ma-0">
                {{ customPagination(props) }}
              </p>
            </div>
            <div>
              <v-btn
                @click="options.page--"
                :disabled="prevDisabled"
                depressed
                outlined
                class="rounded-lg px-6 mr-3"
              >
                Prev
              </v-btn>
              <v-btn
                @click="options.page++"
                :disabled="nextDisabled"
                depressed
                color="primary"
                class="rounded-lg px-6"
              >
                Next
              </v-btn>
            </div>
          </div>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import KelasService from "@/services/resources/kelas.service";

export default {
  data() {
    return {
      search: "",
      sortBy: "ASC",
      itemSortBy: [
        {
          text: "a-z Nama",
          value: "DESC",
        },
        {
          text: "z-a Nama",
          value: "ASC",
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
        { text: "IPA", val: "ipa" },
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
    getList() {
      const { page, itemsPerPage } = this.options;
      this.createToken(KelasService.cancelReq().source());
      this.loading = true;
      KelasService.getAllKelas(
        {
          search: this.search,
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
    prevDisabled() {
      return this.options.page <= 1;
    },
    nextDisabled() {
      return this.totalPage <= this.options.page;
    },
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
