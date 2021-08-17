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
        <p class="header-subtitle-input mb-1">A. Tentang Diri Siswa</p>
      </div>
      <div class="picture-border rounded-lg"></div>
    </div>
    <div class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kelas</p>
          <v-select
            v-model="payload.kelas"
            :loading="loadingListKelas"
            :items="listKelas"
            hide-details
            filled
            solo
            label="Pilih Kelas"
            item-text="kelas"
            item-value="kelas_id"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">NIS</p>
          <v-text-field
            v-model="payload.NIS"
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 228812848"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">NISN</p>
          <v-text-field
            v-model="payload.NISN"
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 1288812819"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Nama Lengkap Siswa</p>
          <v-text-field
            v-model="payload.nama_lengkap"
            hide-details
            filled
            solo
            label="Contoh: Faris Nabil"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Nama Panggilan Siswa</p>
          <v-text-field
            v-model="payload.nama_panggilan"
            hide-details
            filled
            solo
            label="Contoh: Faris"
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
            label="Contoh: 18/07/2020"
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
          <p class="mb-3 title-input">Agama</p>
          <v-select
            v-model="payload.agama"
            hide-details
            filled
            solo
            label="Pilih Agama"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kewarganegaraan</p>
          <v-select
            v-model="payload.kewarganegaraan"
            :items="listKewarganegaraan"
            hide-details
            filled
            solo
            label="Pilih Kewarganegaraan"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Anak ke berapa</p>
          <v-text-field
            v-model="payload.anak_ke"
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 2"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Status Anak</p>
          <v-text-field
            v-model="payload.status_anak"
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 3"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Jumlah saudara kandung</p>
          <v-text-field
            v-model="payload.jml_sdr_kandung"
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 3"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Jumlah saudara tiri</p>
          <v-text-field
            v-model="payload.jml_sdr_tiri"
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 3"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Jumlah saudara angkat</p>
          <v-text-field
            hide-details
            filled
            solo
            type="number"
            label="Contoh: 3"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Anak yatim / piatu / yatim piatu</p>
          <v-select
            :items="listStatusYatim"
            hide-details
            filled
            solo
            label="Silahkan Pilih"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Pihak yang bisa dihubungi</p>
          <v-text-field hide-details filled solo label="Contoh: Orang Tua" />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Penanggung Biaya</p>
          <v-text-field hide-details filled solo label="Contoh: Orang Tua" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Bahasa sehari-hari di rumah</p>
          <v-text-field hide-details filled solo label="Contoh: Indonesia" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import KelasService from "@/services/resources/kelas.service";
import { SISWA } from "@/router/name.types";

export default {
  data() {
    return {
      id: this.$route.query?.secureId,
      kelas: this.$route.query?.kelas,
      // Kelas Properties
      loadingListKelas: false,
      listKelas: [],

      // Jenis Kelamin Properties
      listJenisKelamin: ["Laki-laki", "Perempuan"],

      // Yatim properties
      listStatusYatim: ["Yatim", "Piatu", "Yatim Piatu"],

      // Kewarganegaraan Properties
      listKewarganegaraan: ["Indonesia", "WNA"],

      payload: {
        kelas: null,
        NIS: null,
        NISN: null,
        nama_lengkap: null,
        nama_panggilan: null,
        ttl: null,
        jenis_kelamin: null,
        agama: null,
        kewarganegaraan: null,
        anak_ke: null,
        jml_sdr_kandung: null,
        jml_sdr_tiri: null,
        status_anak: null,
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.push({
        name: SISWA.KELAS.PER_KELAS,
        params: {
          secureId: this.id,
        },
        query: {
          kelas: this.kelas,
        },
      });
    },
    handleSubmit() {
      this.$emit("handleLoading", true);
      setTimeout(() => {
        this.$emit("handleNext");
        this.$emit("handleLoading", false);
        this.$vuetify.goTo(1, {
          duration: 300,
          offset: 0,
          easing: "easeInOutCubic",
        });
      }, 1000);
    },
    getLovKelas() {
      this.loadingListKelas = true;
      KelasService.lovKelas()
        .then(({ data: { data, code, message } }) => {
          if (code == 200) {
            this.listKelas = [...data];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Dropdown List Kelas",
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.loadingListKelas = false));
    },
  },
  mounted() {
    this.getLovKelas();
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
