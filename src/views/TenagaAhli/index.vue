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
      <v-btn @click="handleAdd" depressed color="primary" class="rounded-lg">
        <p class="header-button-title ma-0">
          <v-icon class="mr-1" small>mdi-plus</v-icon>
          <span> Tambah Tenaga Kependidikan</span>
        </p>
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-between mb-9 mt-1">
      <div>
        <p class="header-title mb-1">Tabel Tenaga Kependidikan</p>
        <p class="header-subtitle mb-1">
          Daftar Tenaga Kependidikan SMAN 1 Kota Jambi
        </p>
      </div>
    </div>
    <div
      class="d-flex flex-row justify-space-between header my-6 pa-3 rounded-lg"
    >
      <div style="width: 288px">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Cari NIP atau nama atau jabatan"
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
  </div>
</template>

<script>
import TenagaAhliService from "@/services/resources/tenaga-ahli.service";
import { TENAGA_AHLI } from "@/router/name.types";
import { SET_TENAGA_AHLI_INFO } from "@/store/constants/mutations.type";
import { mapMutations } from "vuex";
const CustomFooter = () => import("@/components/Table/Footer");

export default {
  components: {
    CustomFooter,
  },
  data() {
    return {
      search: "",
      sortBy: "nama ASC",
      itemSortBy: [
        {
          text: "a-z Nama",
          value: "nama ASC",
          icon: "mdi-sort-ascending",
        },
        {
          text: "z-a Nama",
          value: "nama DESC",
          icon: "mdi-sort-descending",
        },
        {
          text: "a-z Jabatan",
          value: "jabatan ASC",
          icon: "mdi-sort-ascending",
        },
        {
          text: "z-a Jabatan",
          value: "jabatan DESC",
          icon: "mdi-sort-descending",
        },
      ],
      headers: [
        { text: "NIP", value: "NIP", sortable: false },
        {
          text: "Nama Lengkap",
          value: "nama",
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
    ...mapMutations([SET_TENAGA_AHLI_INFO]),
    customWidth(head) {
      if (head == "NIP") return "23%";
      else if (head == "nama") return "30%";
      else if (head == "jabatan") return "30%";
      else if (head == "action") return "17%";
    },
    handleBack() {
      this.$router.replace({ name: TENAGA_AHLI.BROWSE });
    },
    handleDetail(item) {
      this.setTenagaAhliInfo(item);
      this.$router.push({
        name: TENAGA_AHLI.DETAIL,
        params: { tenagaAhliId: item.tenaga_ahli_id },
      });
    },
    handleAdd() {
      this.$router.push({ name: TENAGA_AHLI.CREATE });
    },
    handleEdit(item) {
      this.$router.push({
        name: TENAGA_AHLI.UPDATE,
        params: { tenagaAhliId: item.tenaga_ahli_id },
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
      TenagaAhliService.deleteTenagaAhli({
        id: item.tenaga_ahli_id,
        type: "tenaga_ahli",
      })
        .then(({ data: { success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menghapus data Tenaga Kependidikan`,
              color: "success",
            });
            this.getList();
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || `Gagal Menghapus data Tenaga Kependidikan`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Menghapus data Tenaga Kependidikan`,
            color: "error",
          });
        })
        .finally(() => (this.loading = false));
    },
    getList() {
      const { page, itemsPerPage } = this.options;
      this.loading = true;
      this.createToken(TenagaAhliService.cancelReq().source());
      TenagaAhliService.getList(
        {
          search: this.search,
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
              message: message || "Gagal Memuat Data Semua Tenaga Kependidikan",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.loading = false));
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
