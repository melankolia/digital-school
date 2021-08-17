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
      <v-btn depressed color="primary" class="rounded-lg">
        <p class="header-button-title ma-0">
          <v-icon class="mr-1" small>mdi-plus</v-icon>
          <span> Tambah Guru </span>
        </p>
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-between mb-9 mt-1">
      <div>
        <p class="header-title mb-1">Tabel Guru (Seluruh Guru)</p>
        <p class="header-subtitle mb-1">Daftar Guru SMAN 1 Kota Jambi</p>
      </div>
    </div>
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
              <v-list-item link>
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
import { GURU } from "@/router/name.types";
import { SET_GURU_INFO } from "@/store/constants/mutations.type";
import { mapMutations } from "vuex";
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
        {
          text: "a-z Jabatan",
          value: "ASC",
          icon: "mdi-sort-ascending",
        },
        {
          text: "z-a Jabatan",
          value: "DESC",
          icon: "mdi-sort-descending",
        },
      ],
      headers: [
        { text: "NIP", value: "nip", sortable: false },
        {
          text: "Nama Lengkap",
          value: "nama_guru",
          sortable: false,
          width: "321px",
        },
        { text: "Jabatan", value: "jabatan", sortable: false },
        { text: "Aksi", value: "action", sortable: false },
      ],
      items: [],
      loading: false,
      options: {
        page: 1,
      },
      totalItem: 10,
      totalPage: 1,
      rowsPerPageItems: [10, 20, 50, 100],
      doubleClickPrevent: false,
    };
  },
  methods: {
    ...mapMutations([SET_GURU_INFO]),
    customWidth(head) {
      if (head == "nip") return "15%";
      else if (head == "nama_guru") return "32%";
      else if (head == "jabatan") return "32%";
      else if (head == "action") return "21%";
    },
    handleBack() {
      this.$router.replace({ name: GURU.BROWSE });
    },
    handleDetail(item) {
      this.setGuruInfo(item);
      this.$router.push({
        name: GURU.DETAIL,
        params: { secureId: item.id_guru },
      });
    },
    getList() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.items = [
          {
            id_guru: 1789,
            nip: 12345,
            nama_guru: "Dra. Victoria",
            jabatan: "Matematika",
          },
          {
            id_guru: 1789,
            nip: 12345,
            nama_guru: "Dra. Victoria",
            jabatan: "Matematika",
          },
        ];
        this.totalItem = this.items.length;
        this.totalPage = 1;
      }, 2000);
    },
  },
  computed: {
    paginationProperties() {
      return [this.search, this.sortBy].join();
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
