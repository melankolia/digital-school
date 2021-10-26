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
      <div>
        <v-btn
          @click="handleEdit"
          :disabled="loadingKelas || loading"
          depressed
          color="primary"
          class="rounded-lg mr-4"
        >
          <p class="header-button-title ma-0">
            <v-icon class="mr-1" small>mdi-square-edit-outline</v-icon>
            <span> Edit Data </span>
          </p>
        </v-btn>
        <v-btn
          :loading="downloadPDFLoading"
          @click="handleDownload"
          depressed
          class="rounded-lg outlined-custom"
        >
          <p class="header-button-export ma-0">
            <v-icon class="mr-1" small>mdi-download</v-icon>
            <span> Download Nilai Rapor</span>
          </p>
        </v-btn>
      </div>
    </div>
    <div class="d-flex flex-row justify-space-between mb-6 mt-1">
      <div class="d-flex flex-column" style="width: 100vw">
        <div class="d-flex flex-row justify-space-between">
          <p class="header-title mb-4">
            Tabel Kompetensi {{ isAlumni ? "Alumni" : "Siswa" }}
          </p>
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
              v-model="sortByKelas"
              :items="itemKelas"
              :loading="loadingKelas"
              placeholder="Pilih Kelas"
              solo
              hide-details
              dense
              class="rounded-lg"
              color="primary"
              item-text="kelas"
              item-value="kelas_id"
              return-object
            >
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
import { SISWA, ALUMNI } from "@/router/name.types";
import { mapGetters, mapMutations } from "vuex";
import SiswaService from "@/services/resources/siswa.service";
import KelasService from "@/services/resources/kelas.service";
import { SET_KOMPENTENSI_SISWA } from "@/store/constants/mutations.type";

export default {
  data() {
    return {
      downloadPDFLoading: false,
      items: {
        NIS: null,
        NISN: null,
        nama_kelas: null,
        nama_siswa: null,
      },
      siswaId: this.$route.params?.siswaId,
      kelasId: this.$route.params?.kelasId,
      sortBySemester: "1",
      itemSemester: [
        {
          text: "Semester 1",
          value: "1",
        },
        {
          text: "Semester 2",
          value: "2",
        },
      ],
      sortByKelas: {
        kelas: null,
        kelas_id: null,
      },
      itemKelas: [],
      loadingKelas: false,
      headers: [
        { text: "Mata Pelajaran", value: "mapel", sortable: false },
        { text: "Pengetahuan", value: "nilai", sortable: false },
        { text: "Keterangan", value: "keterangan", sortable: false },
        { text: "Sikap", value: "sikap", sortable: false },
      ],
      absenHeaders: [
        { text: "Sakit", value: "sakit", sortable: false },
        { text: "Izin", value: "izin", sortable: false },
        { text: "Tanpa Keterangan", value: "alpha", sortable: false },
      ],
      listItem: {
        kompetensi_id: "",
        kelompokA: [],
        kelompokB: [],
        kelompokC: [],
        kelompokCLintas: [],
        absen: [
          {
            sakit: "-",
            izin: "-",
            alpha: "-",
          },
        ],
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["getSiswa"]),
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.TABEL_KOMPETENSI;
    },
  },
  watch: {
    sortBySemester(val) {
      val && this.getDetail();
    },
    sortByKelas: {
      handler(val) {
        val && this.getDetail();
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations([SET_KOMPENTENSI_SISWA]),
    async handleDownload() {
      this.downloadPDFLoading = true;
      try {
        await SiswaService.downloadFile({
          siswa_id: this.siswaId,
          kelas_id: "",
          type: "siswa",
        })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `${this.items.NISN} - ${this.items.nama_siswa}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
          })
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => (this.downloadPDFLoading = false));
      } catch (err) {
        console.error(err);
        this.$store.commit("snackbar/setSnack", {
          show: true,
          message: "Gagal Download Data Rapor Siswa",
          color: "error",
        });
      }
    },
    bindingData() {
      this.items = { ...this.items, ...this.getSiswa };
      this.setKompetensiSiswa({
        NIS: this.items.NIS,
        NISN: this.items.NISN,
        nama_kelas: this.items.nama_kelas,
        nama_siswa: this.items.nama_siswa,
      });
    },
    handleBack() {
      this.$router.replace({
        name: this.isAlumni ? ALUMNI.DETAIL : SISWA.KELAS.SISWA.DETAIL,
        params: {
          secureId: this.siswaId,
        },
        query: {
          kelasId: this.kelasId,
          kelas: this.items.nama_kelas,
        },
      });
    },
    handleEdit() {
      this.setKompetensiSiswa({
        ...this.getSiswa,
        nama_kelas: this.sortByKelas.kelas,
      });
      this.$router.push({
        name: this.isAlumni
          ? ALUMNI.UPDATE_KOMPETENSI
          : SISWA.KELAS.SISWA.UPDATE_KOMPETENSI,
        params: {
          siswaId: this.siswaId,
          kelasId: this.kelasId,
        },
        query: {
          semester: this.sortBySemester,
          kompetensi_id: this.listItem.kompetensi_id,
        },
      });
    },
    getListKelas() {
      this.loadingKelas = true;
      KelasService.lovKelasKompetensi(this.siswaId)
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.itemKelas = [...data];
            const selectedKelas = this.itemKelas.find(
              (e) => e.kelas_id == this.kelasId
            );
            this.sortByKelas = selectedKelas;
          } else {
            throw new Error(message);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => (this.loadingKelas = false));
    },
    getDetail() {
      /// Reset to Default
      this.listItem = {
        kelompokA: [],
        kelompokB: [],
        kelompokC: [],
        kelompokCLintas: [],
        absen: [
          {
            sakit: "-",
            izin: "-",
            alpha: "-",
          },
        ],
      };

      this.loading = true;
      SiswaService.getKompetensi({
        siswa_id: this.siswaId,
        kelas_id: this.sortByKelas.kelas_id,
        semester: this.sortBySemester,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.listItem = {
              ...this.listItem,
              ...data,
              absen: [{ ...data.absen }],
            };
          } else {
            throw new Error(message);
            // this.$store.commit("snackbar/setSnack", {
            //   show: true,
            //   message: message || "Gagal Memuat Data Kompetensi Siswa",
            //   color: "error",
            // });
          }
        })
        .catch((err) => {
          console.error(err);
          // this.$store.commit("snackbar/setSnack", {
          //   show: true,
          //   message: "Gagal Memuat Data Kompetensi Siswa",
          //   color: "error",
          // });
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.bindingData();
    this.getListKelas();
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
