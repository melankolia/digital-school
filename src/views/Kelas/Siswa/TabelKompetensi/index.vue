<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div class="d-flex flex-row justify-space-between mb-12">
      <v-btn
        @click="$router.back()"
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
          @click="handleEdit"
          depressed
          color="primary"
          class="rounded-lg mr-4"
        >
          <p class="header-button-title ma-0">
            <v-icon class="mr-1" small>mdi-square-edit-outline</v-icon>
            <span> Edit Data </span>
          </p>
        </v-btn>
        <v-btn depressed class="rounded-lg outlined-custom">
          <p class="header-button-export ma-0">
            <v-icon class="mr-1" small>mdi-download</v-icon>
            <span> Download PDF Nilai </span>
          </p>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-row justify-space-between mb-6 mt-1">
      <div class="d-flex flex-column" style="width: 100vw">
        <div class="d-flex flex-row justify-space-between">
          <p class="header-title mb-4">Tabel Kompetensi Siswa</p>
        </div>
        <div class="d-flex flex-column pr-12 mr-12">
          <p class="header-subtitle">
            {{ items.nama_siswa || "-" | toTitle }} -
            {{ items.nama_kelas || "-" | upperCase }}
          </p>
          <div class="d-flex flex-row">
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                NIS : {{ items.NIS || "-" | toTitle }}
              </p>
            </div>
            <div class="backgroundLabel">
              <p class="header-subtitle py-2 px-3 ma-0">
                NISN : {{ items.NISN || "-" | toTitle }}
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row justify-end header my-6 pa-3 rounded-lg">
          <div style="width: 150px" class="mr-4">
            <v-select
              v-model="sortBySemester"
              :items="itemSemester"
              placeholder="Pilih Semester"
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
          <div style="width: 150px">
            <v-select
              v-model="sortByTahun"
              :items="itemTahun"
              placeholder="Pilih Tahun"
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
      </div>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Kelompok A Wajib</p>
      <v-data-table
        id="kompetensi"
        :items="listItem.kelompokA"
        :headers="headers"
        :loading="loading"
        hide-default-header
        hide-default-footer
      >
        <template #header="{ props }">
          <tr class="table-header">
            <th
              class="table-header-text"
              v-for="(head, i) in props.headers"
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
        <template #item.nilai="{ item }">
          {{ item.nilai || "Belum Tersedia" }}
        </template>
        <template #item.ket="{ item }">
          {{ convertKet(item.nilai) }}
        </template>
        <template #item.sikap="{ item }">
          {{ item.sikap || "Belum Tersedia" }}
        </template>
      </v-data-table>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Kelompok B Wajib</p>
      <v-data-table
        id="kompetensi"
        :items="listItem.kelompokB"
        :headers="headers"
        :loading="loading"
        hide-default-header
        hide-default-footer
      >
        <template #header="{ props }">
          <tr class="table-header">
            <th
              class="table-header-text"
              v-for="(head, i) in props.headers"
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
        <template #item.nilai="{ item }">
          {{ item.nilai || "Belum Tersedia" }}
        </template>
        <template #item.ket="{ item }">
          {{ convertKet(item.nilai) }}
        </template>
        <template #item.sikap="{ item }">
          {{ item.sikap || "Belum Tersedia" }}
        </template>
      </v-data-table>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Kelompok C Peminatan</p>
      <v-data-table
        id="kompetensi"
        :items="listItem.kelompokC"
        :headers="headers"
        :loading="loading"
        hide-default-header
        hide-default-footer
      >
        <template #header="{ props }">
          <tr class="table-header">
            <th
              class="table-header-text"
              v-for="(head, i) in props.headers"
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
        <template #item.nilai="{ item }">
          {{ item.nilai || "Belum Tersedia" }}
        </template>
        <template #item.ket="{ item }">
          {{ convertKet(item.nilai) }}
        </template>
        <template #item.sikap="{ item }">
          {{ item.sikap || "Belum Tersedia" }}
        </template>
      </v-data-table>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Kelompok C Lintas Peminatan</p>
      <v-data-table
        id="kompetensi"
        :items="listItem.kelompokCLintas"
        :headers="headers"
        :loading="loading"
        hide-default-header
        hide-default-footer
      >
        <template #header="{ props }">
          <tr class="table-header">
            <th
              class="table-header-text"
              v-for="(head, i) in props.headers"
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
        <template #item.nilai="{ item }">
          {{ item.nilai || "Belum Tersedia" }}
        </template>
        <template #item.ket="{ item }">
          {{ convertKet(item.nilai) }}
        </template>
        <template #item.sikap="{ item }">
          {{ item.sikap || "Belum Tersedia" }}
        </template>
      </v-data-table>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Ketidak Hadiran</p>
      <v-data-table
        id="kompetensi"
        :items="listItem.absen"
        :headers="absenHeaders"
        :loading="loading"
        hide-default-header
        hide-default-footer
      >
        <template #header="{ props }">
          <tr class="table-header">
            <th
              class="table-header-text"
              v-for="(head, i) in props.headers"
              style="width: 33%"
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
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { SISWA } from "@/router/name.types";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      items: {
        NIS: null,
        NISN: null,
        nama_kelas: null,
        nama_siswa: null,
      },
      sortBySemester: null,
      itemSemester: [],
      sortByTahun: null,
      itemTahun: [],
      headers: [
        { text: "Mata Pelajaran", value: "mapel", sortable: false },
        { text: "Pengetahuan", value: "nilai", sortable: false },
        { text: "Keterangan", value: "ket", sortable: false },
        { text: "Sikap", value: "sikap", sortable: false },
      ],
      absenHeaders: [
        { text: "Sakit", value: "sakit", sortable: false },
        { text: "Izin", value: "izin", sortable: false },
        { text: "Tanpa Keterangan", value: "alpha", sortable: false },
      ],
      listItem: {
        kelompokA: [
          {
            mapel: "Matematika",
            nilai: null,
            sikap: null,
          },
          {
            mapel: "mtk",
            nilai: 10,
            sikap: "Sangat Baik",
          },
        ],
        kelompokB: [
          {
            mapel: "mtk",
            nilai: 10,
            sikap: "Sangat Baik",
          },
          {
            mapel: "mtk",
            nilai: 10,
            sikap: "Sangat Baik",
          },
        ],
        kelompokC: [
          {
            mapel: "mtk",
            nilai: 10,
            sikap: "Sangat Baik",
          },
          {
            mapel: "mtk",
            nilai: 10,
            sikap: "Sangat Baik",
          },
        ],
        kelompokCLintas: [
          {
            mapel: "mtk",
            nilai: 10,
            sikap: "Sangat Baik",
          },
          {
            mapel: "mtk",
            nilai: 10,
            sikap: "Sangat Baik",
          },
        ],
        absen: [
          {
            sakit: 10,
            izin: 10,
            alpha: 10,
          },
        ],
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["getSiswa"]),
  },
  methods: {
    bindingData() {
      this.items = { ...this.items, ...this.getSiswa };
    },
    convertKet(arg) {
      if (!arg) return "Belum Tersedia";
      else if (arg <= 20) return "Sangat Buruk";
      else if (arg >= 21 && arg <= 40) return "Buruk";
      else if (arg >= 41 && arg <= 60) return "Sedang";
      else if (arg >= 61 && arg <= 80) return "Baik";
      else if (arg >= 81) return "Sangat Baik";
    },
    handleEdit() {
      this.$router.push({
        name: SISWA.KELAS.SISWA.UPDATE_KOMPETENSI,
        params: {
          siswaId: this.$route.params?.siswaId,
          kelasId: this.$route.params?.kelasId,
        },
      });
    },
  },
  mounted() {
    this.bindingData();
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
</style>
