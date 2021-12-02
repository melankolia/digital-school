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
        <p class="header-subtitle-input mb-1">
          A. Tentang Diri {{ isAlumni ? "Alumni" : "Siswa" }}
        </p>
      </div>
      <div
        id="preview-photo"
        class="picture-border rounded-lg"
        @click="$refs.file.click()"
      >
        <input
          type="file"
          ref="file"
          style="display: none"
          accept="image/*"
          @change="filesChange($event.target.files)"
        />
      </div>
    </div>
    <ContentNotFound
      :message="`Data Tentang Diri ${isAlumni ? 'Alumni' : 'Siswa'} Not Found`"
      :loading="loading"
      v-if="!isAvailable && isUpdate"
    >
      <template v-slot:action>
        <v-btn
          @click="() => getDetail()"
          depressed
          color="header"
          class="rounded-lg outlined-custom"
        >
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          <p class="header-button-back ma-0">Reload</p>
        </v-btn>
      </template>
    </ContentNotFound>
    <div v-else class="d-flex flex-column">
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Kelas</p>
          <v-select
            v-model="payload.kelas_id"
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
          <p class="mb-3 title-input">
            Nama Lengkap {{ isAlumni ? "Alumni" : "Siswa" }}
          </p>
          <v-text-field
            v-model="payload.nama_lengkap"
            hide-details
            filled
            solo
            label="Contoh: Faris Nabil"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">
            Nama Panggilan {{ isAlumni ? "Alumni" : "Siswa" }}
          </p>
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
            label="Contoh: Jambi, 18 April 2007"
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
            clearable
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Agama</p>
          <v-select
            v-model="payload.agama"
            :items="listAgama"
            hide-details
            filled
            solo
            label="Pilih Agama"
            clearable
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
            clearable
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
            label="Contoh: Anak Kandung"
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
            v-model="payload.jml_sdr_angkat"
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
            clearable
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Pihak yang bisa dihubungi</p>
          <v-text-field
            v-model="payload.pihak_dihubungi"
            hide-details
            filled
            solo
            label="Contoh: Orang Tua"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Penanggung Biaya</p>
          <v-text-field
            v-model="payload.penanggung_biaya"
            hide-details
            filled
            solo
            label="Contoh: Orang Tua"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Bahasa sehari-hari di rumah</p>
          <v-text-field
            v-model="payload.bahasa"
            hide-details
            filled
            solo
            label="Contoh: Indonesia"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import KelasService from "@/services/resources/kelas.service";
import SiswaService from "@/services/resources/siswa.service";
import { ALUMNI } from "@/router/name.types";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      id: this.$route.params?.secureId,
      kelasId: this.$route.params?.kelasId,
      kelas: this.$route.query?.kelas,

      // Detail Properties
      loading: false,

      // Kelas Properties
      loadingListKelas: false,
      listKelas: [],

      // Jenis Kelamin Properties
      listJenisKelamin: ["Laki-laki", "Perempuan"],

      // Agama Properties
      listAgama: [
        "Islam",
        "Kristen",
        "Katolik",
        "Hindu",
        "Buddha",
        "Khonghucu",
      ],

      // Yatim properties
      listStatusYatim: ["Yatim", "Piatu", "Yatim Piatu"],

      // Kewarganegaraan Properties
      listKewarganegaraan: ["Indonesia", "WNA"],

      payload: {
        siswa_id: null,
        kelas_id: null,
        files: null,
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
        jml_sdr_angkat: null,
        status_anak: null,
        bahasa: null,
        penanggung_biaya: null,
        pihak_dihubungi: null,
      },
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    filesChange(file) {
      this.payload.files = file[0];
      const doc = document.getElementById("preview-photo");
      this.createBase64Image(this.payload.files).then((e) => {
        doc.style.background = "none";
        doc.style.backgroundImage = 'url("' + e.target.result + '")';
        doc.style.backgroundPosition = "center";
        doc.style.backgroundRepeat = "no-repeat";
        doc.style.backgroundSize = "contain";
      });
    },
    handleSubmit() {
      this.$emit("handleLoading", true);
      this.createBase64Image(this.payload.files)
        .then((e) => {
          const payload = {
            image: e.target.result,
            siswa_id: this.id,
            kelas_id: this.payload.kelas_id || "-",
            NIS: this.payload.NIS || "-",
            NISN: this.payload.NISN || "-",
            nama_lengkap: this.payload.nama_lengkap || "-",
            nama_panggilan: this.payload.nama_panggilan || "-",
            ttl: this.payload.ttl || "-",
            jenis_kelamin: this.payload.jenis_kelamin || "-",
            agama: this.payload.agama || "-",
            kewarganegaraan: this.payload.kewarganegaraan || "-",
            anak_ke: this.payload.anak_ke || "-",
            jml_sdr_kandung: this.payload.jml_sdr_kandung || "-",
            jml_sdr_tiri: this.payload.jml_sdr_tiri || "-",
            jml_sdr_angkat: this.payload.jml_sdr_angkat || "-",
            status_anak: this.payload.status_anak || "-",
            bahasa: this.payload.bahasa || "-",
            penanggung_biaya: this.payload.penanggung_biaya || "-",
            pihak_dihubungi: this.payload.pihak_dihubungi || "-",
            pkh: 0,
            kks: 0,
            kps: "Tidak Ada",
          };
          SiswaService.addAbout(payload)
            .then(({ data: { data, success, message } }) => {
              if (success == true) {
                this.$store.commit("snackbar/setSnack", {
                  show: true,
                  message: `Berhasil Menyimpan Data Tentang Diri ${
                    this.isAlumni ? "Alumni" : "Siswa"
                  }`,
                  color: "success",
                });
                this.$emit("handleId", data.siswa_id);
                this.$emit("handleNext");
                this.$vuetify.goTo(1, {
                  duration: 300,
                  offset: 0,
                  easing: "easeInOutCubic",
                });
              } else {
                this.$store.commit("snackbar/setSnack", {
                  show: true,
                  message:
                    message ||
                    `Gagal Menyimpan Data Tentang Diri ${
                      this.isAlumni ? "Alumni" : "Siswa"
                    }`,
                  color: "error",
                });
              }
            })
            .catch((err) => {
              console.error(err);
              this.$store.commit("snackbar/setSnack", {
                show: true,
                message: `Gagal Menyimpan Data Tentang Diri ${
                  this.isAlumni ? "Alumni" : "Siswa"
                }`,
                color: "error",
              });
            })
            .finally(() => this.$emit("handleLoading", false));
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "File Foto Harus Diisi",
            color: "error",
          });
          this.$emit("handleLoading", false);
        });
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
    getDetail() {
      this.loading = true;
      SiswaService.getTentangDiri({
        siswa_id: this.id,
        alumni: this.isAlumni ? true : null,
      })
        .then(({ data: { data, code, message } }) => {
          if (code == 200) {
            this.payload = {
              ...this.payload,
              ...data,
            };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message:
                message ||
                `Gagal Memuat Data Tentang Diri ${
                  this.isAlumni ? "Alumni" : "Siswa"
                }`,
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: `Gagal Memuat Data Tentang Diri ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    isUpdate() {
      return this.id;
    },
    isAvailable() {
      return this.payload?.siswa_id;
    },
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.UPDATE;
    },
  },
  mounted() {
    this.getLovKelas();
    this.isUpdate && this.getDetail();
  },
};
</script>

<style>
.picture-border {
  width: 135px;
  height: 180px;
  background: gray;
  border: 1px solid #f4f4f4;
}

.picture-border:hover {
  cursor: pointer;
}

.v-input__control {
  border: none;
}
</style>
