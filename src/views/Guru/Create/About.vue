<template>
  <div class="d-flex flex-column mb-10">
    <div class="d-flex flex-row justify-space-between mb-12">
      <div class="d-flex flex-column">
        <div>
          <v-btn
            @click="handleBack"
            depressed
            color="header"
            class="rounded-lg mr-4 mb-8 outlined-custom"
          >
            <p class="header-button-back ma-0">
              <v-icon class="mr-1" small>mdi-chevron-left</v-icon>
              <span> Kembali </span>
            </p>
          </v-btn>
        </div>
        <p class="header-title-input mb-1">Input Tabel</p>
        <p class="header-subtitle-input mb-1">A. Tentang Diri Guru</p>
      </div>
      <div class="picture-border rounded-lg"></div>
    </div>
    <div class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Nama</p>
          <v-text-field
            v-model="payload.nama"
            hide-details
            filled
            solo
            label="Contoh : Dr IIK SRI SULASMI, S.Pd., M.Si"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Jenis Kelamin</p>
          <v-select
            v-model="payload.jenis_kelamin"
            :items="listJenisKelamin"
            hide-details
            filled
            solo
            label="Pilih Jenis Kelamin"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Tempat Tanggal Lahir</p>
          <v-text-field
            v-model="payload.ttl"
            hide-details
            filled
            solo
            label="Contoh : Jambi / 15 April 1970"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">NIP / KARPEG</p>
          <v-text-field
            v-model="payload.nip_karpeg"
            hide-details
            filled
            solo
            label="Contoh : 2345252435 / 2382849234"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Pendidikan Terakhir</p>
          <v-text-field
            v-model="payload.pendidikan"
            hide-details
            filled
            solo
            label="Contoh : Sarjana"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Mulai Bertugas Disini</p>
          <v-text-field
            v-model="payload.mulai_bertugas"
            hide-details
            filled
            solo
            label="Contoh : 01-02-1986"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Jabatan / Tugas</p>
          <v-text-field
            v-model="payload.jabatan"
            hide-details
            filled
            solo
            label="Contoh : Kepala Sekolah / Mengajar"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Pangkat dan Golongan</p>
          <v-select
            v-model="payload.gol_pangkat"
            :items="listGolongan"
            hide-details
            filled
            solo
            label="Pangkat dan Golongan"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Pangkat TMT</p>
          <v-text-field
            v-model="payload.tmt_pangkat"
            hide-details
            filled
            solo
            label="Contoh : 01-04-2018"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">SK Pertama</p>
          <v-text-field
            v-model="payload.sk_pertama"
            hide-details
            filled
            solo
            label="Contoh : 18-09-2021"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Gaji Pokok</p>
          <v-text-field
            v-model="payload.gaji_pokok"
            hide-details
            filled
            solo
            label="Contoh : 3.000.000"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">MK. Gol tahun</p>
          <v-text-field
            v-model="payload.mk_gol_tahun"
            hide-details
            filled
            solo
            label="Contoh : 2009"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">MK. Gol bulan</p>
          <v-text-field
            v-model="payload.mk_gol_bulan"
            hide-details
            filled
            solo
            label="Contoh : 12 Bulan"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">K / TK</p>
          <v-text-field
            v-model="payload.k_tk"
            hide-details
            filled
            solo
            label="Contoh : 24234"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kenaikan YAD Pangkat</p>
          <v-text-field
            v-model="payload.yad_pangkat"
            hide-details
            filled
            solo
            label="Contoh : 3234234"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kenaikan YAD gaji berkala</p>
          <v-text-field
            v-model="payload.yad_gaji"
            hide-details
            filled
            solo
            label="Contoh : 2342341"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Sertifikasi</p>
          <v-text-field
            v-model="payload.sertifikasi"
            hide-details
            filled
            solo
            label="Contoh : 3234324"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">NUPTK</p>
          <v-text-field
            v-model="payload.nuptk"
            hide-details
            filled
            solo
            label="Contoh : 2342341"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { GURU } from "@/router/name.types";
import GuruService from "@/services/resources/guru.service";

export default {
  data() {
    return {
      id: this.$route.query?.kelasId,
      kelasId: this.$route.params?.kelasId,
      kelas: this.$route.query?.kelas,
      // Kelas Properties
      loadingListKelas: false,
      listKelas: [],

      // Jenis Kelamin Properties
      listJenisKelamin: ["Laki-laki", "Perempuan"],

      // List Golongan
      listGolongan: [
        "III A",
        "III B",
        "III C",
        "III D",
        "IV A",
        "IV B",
        "IV C",
        "IV D",
      ],

      payload: {
        nama: null,
        jenis_kelamin: null,
        ttl: null,
        nip_karpeg: null,
        pendidikan: null,
        mulai_bertugas: null,
        jabatan: null,
        gol_pangkat: null,
        tmt_pangkat: null,
        sk_pertama: null,
        gaji_pokok: null,
        mk_gol_tahun: null,
        mk_gol_bulan: null,
        k_tk: null,
        yad_pangkat: null,
        yad_gaji: null,
        sertifikasi: null,
        nuptk: null,
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      this.$emit("handleLoading", true);
      const payload = {
        nama: this.payload.nama || "-",
        jenis_kelamin: this.payload.jenis_kelamin || "-",
        ttl: this.payload.ttl || "-",
        nip_karpeg: this.payload.nip_karpeg || "-",
        pendidikan: this.payload.pendidikan || "-",
        mulai_bertugas: this.payload.mulai_bertugas || "-",
        jabatan: this.payload.jabatan || "-",
        gol_pangkat: this.payload.gol_pangkat || "-",
        tmt_pangkat: this.payload.tmt_pangkat || "-",
        sk_pertama: this.payload.sk_pertama || "-",
        gaji_pokok: this.payload.gaji_pokok || "-",
        mk_gol_tahun: this.payload.mk_gol_tahun || "-",
        mk_gol_bulan: this.payload.mk_gol_bulan || "-",
        k_tk: this.payload.k_tk || "-",
        yad_pangkat: this.payload.yad_pangkat || "-",
        yad_gaji: this.payload.yad_gaji || "-",
        sertifikasi: this.payload.sertifikasi || "-",
        nuptk: this.payload.nuptk || "-",
      };
      GuruService.addGuru(payload)
        .then(({ data: { success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: "Berhasil Menyimpan Data Guru",
              color: "success",
            });
            this.$router.replace({ name: GURU.ALL });
            this.$vuetify.goTo(1, {
              duration: 300,
              offset: 0,
              easing: "easeInOutCubic",
            });
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Menyimpan Data Guru",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Menyimpan Data Guru",
            color: "error",
          });
        })
        .finally(() => this.$emit("handleLoading", false));
      setTimeout(() => {
        this.$emit("handleLoading", false);
        this.$vuetify.goTo(1, {
          duration: 300,
          offset: 0,
          easing: "easeInOutCubic",
        });
        this.$store.commit("snackbar/setSnack", {
          show: true,
          message: "Data Guru Berhasil Diinput",
          color: "success",
        });
        this.$router.replace({ name: GURU.BROWSE });
      }, 1000);
    },
  },
};
</script>

<style>
.picture-border {
  width: 135px;
  height: 180px;
  background: gray;
}

.v-input__control {
  border: none;
}
</style>
