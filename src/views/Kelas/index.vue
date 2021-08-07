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
    <v-tabs color="tabMenu">
      <v-tab>
        <p class="ma-0 tabs-title">Lihat Semua Kelas</p>
      </v-tab>
      <v-tab>
        <p class="ma-0 tabs-title">IPA</p>
      </v-tab>
      <v-tab>
        <p class="ma-0 tabs-title">IPS</p>
      </v-tab>
    </v-tabs>
    <div
      class="
        d-flex
        flex-row
        justify-space-between
        header
        my-6
        pa-3
        rounded-lg
        header-drop-shadow
      "
    >
      <div style="width: 288px">
        <v-text-field
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
                v-model="props.options.itemsPerPage"
                :items="props.itemsPerPageOptions"
                solo
                hide-details
                dense
                style="width: 74px"
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
              <v-btn depressed outlined class="rounded-lg px-6 mr-3">
                Prev
              </v-btn>
              <v-btn depressed color="primary" class="rounded-lg px-6">
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
export default {
  data() {
    return {
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
      items: [
        {
          kelas_id: "ae450482-7abb-4b36-9f58-a2a9f3578ee1",
          nomor: 1,
          kelas: "X IPA 1",
          walikelas: "Luffy",
          tahunAjaran: "2019-2020",
        },
        {
          kelas_id: "2f2d261a-297b-45ef-97e5-a436f983470a",
          nomor: 2,
          kelas: "X IPA 2",
          walikelas: "Faris",
          tahunAjaran: "2019-2020",
        },
        {
          kelas_id: "de963785-9c90-46fa-a43a-cb327b82e4b7",
          nomor: 3,
          kelas: "X IPA 3",
          walikelas: "Luffyy",
          tahunAjaran: "2019-2020",
        },
        {
          kelas_id: "c9c94804-bc25-4e0d-b324-7a5323d493d8",
          nomor: 4,
          kelas: "X IPS 1",
          walikelas: "Zoro",
          tahunAjaran: "2020-2021",
        },
        {
          kelas_id: "0cc50e92-2907-4ee6-b580-0df0eedb1d58",
          nomor: 5,
          kelas: "X IPS 2",
          walikelas: "Kora",
          tahunAjaran: "2020-2021",
        },
        {
          kelas_id: "b50b673f-6983-4307-98fa-a4f11107a970",
          nomor: 6,
          kelas: "X IPS 3",
          walikelas: "Jila",
          tahunAjaran: "2020-2021",
        },
        {
          kelas_id: "9cfd743b-ef86-4c20-bec7-a8c93b5ecb65",
          nomor: 7,
          kelas: "X IPS 4",
          walikelas: "Pola",
          tahunAjaran: "2020-2021",
        },
        {
          kelas_id: "56ae28fb-3a61-4fcc-8b18-cc87db2e5581",
          nomor: 8,
          kelas: "XI IPS 1",
          walikelas: "Yuna",
          tahunAjaran: "2020-2021",
        },
        {
          kelas_id: "10deb80d-d37c-488a-892a-27dc0c39da48",
          nomor: 9,
          kelas: "XI IPS 2",
          walikelas: "Judi",
          tahunAjaran: "2020-2021",
        },
        {
          kelas_id: "7f348a08-0a22-4ee9-bc68-513a9f38c64d",
          nomor: 10,
          kelas: "XI IPS 3",
          walikelas: "Ojana",
          tahunAjaran: "2020-2021",
        },
      ],
      options: {},
      totalItem: 10,
      pageCount: 0,
      rowsPerPageItems: [10, 20, 50, 100],
    };
  },
  methods: {
    handleClick(arg) {
      console.log(arg);
    },
    customWidth(head) {
      if (head == "walikelas") return "40%";
      else if (head == "no") return "10%";
      else if (head == "kelas") return "22%";
      else if (head == "tahunAjaran") return "20%";
    },
  },
};
</script>

<style></style>
