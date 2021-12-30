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
      message="Data Tentang Diri Guru Not Found"
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
          <v-row>
            <v-col cols="12" xs="12" sm="4">
              <v-text-field
                v-model="payload.tempat_lahir"
                hide-details
                filled
                solo
                label="Contoh: Jambi"
              />
            </v-col>
            <v-col cols="12" xs="12" sm="8">
              <v-menu
                ref="menu"
                v-model="birthDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
                :return-value.sync="payload.tanggal_lahir"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="tanggal_lahir"
                    label="Pilih Tanggal Lahir"
                    readonly
                    hide-details
                    filled
                    solo
                    v-on="on"
                  />
                </template>
                <v-date-picker v-model="payload.tanggal_lahir">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="birthDateMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(payload.tanggal_lahir)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
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
        <!-- <v-col cols="12" xs="12" sm="6">
          <p class="mb-3 title-input">Sertifikasi</p>
          <v-text-field
            v-model="payload.sertifikasi"
            hide-details
            filled
            solo
            label="Contoh : 3234324"
          />
        </v-col> -->
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
const ContentNotFound = () => import("../../../components/Content/NotFound");

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      id: this.$route.params?.guruId,
      loading: false,

      // Jenis Kelamin Properties
      listJenisKelamin: ["Laki-laki", "Perempuan"],

      // List Golongan
      listGolongan: [
        "-",
        "III/a",
        "III/b",
        "III/c",
        "III/d",
        "IV/a",
        "IV/b",
        "IV/c",
        "IV/d",
      ],

      // Birthdate Menu Properties
      birthDateMenu: false,

      payload: {
        guru_id: null,
        nama: null,
        jenis_kelamin: null,
        tempat_lahir: null,
        tanggal_lahir: null,
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
        files: null,
        // sertifikasi: null,
        nuptk: null,
      },
    };
  },
  computed: {
    isUpdate() {
      return this.id ? true : false;
    },
    isAvailable() {
      return this.payload.guru_id ? true : false;
    },
    tanggal_lahir() {
      if (this.payload.tanggal_lahir) {
        return this.$DateTime
          .fromISO(this.payload.tanggal_lahir)
          .toFormat("dd LLLL yyyy");
      } else return "-";
    },
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
    getDetail() {
      this.$emit("handleLoading", true);
      this.loading = true;
      GuruService.getDetail(this.id)
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.payload = {
              ...this.payload,
              ...data,
            };

            if (data.ttl) {
              const ttl = data.ttl.split(", ");
              if (ttl.length > 0 && ttl.length <= 2) {
                this.payload.tempat_lahir = ttl[0];
                this.payload.tanggal_lahir = this.toOurFormatDetail(ttl[1]);
              }
            }

            if (data.image) {
              fetch(data.image)
                .then((response) => response.blob())
                .then((blob) => {
                  this.createBase64Image(blob).then((e) => {
                    this.payload.files = blob;
                    const doc = document.getElementById("preview-photo");
                    doc.style.background = "none";
                    doc.style.backgroundImage =
                      'url("' + e.target.result + '")';
                    doc.style.backgroundPosition = "center";
                    doc.style.backgroundRepeat = "no-repeat";
                    doc.style.backgroundSize = "contain";
                  });
                });
            }
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Tentang Diri Guru",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Tentang Diri Guru",
            color: "error",
          });
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
          this.$emit("handleLoading", false);
        });
    },
    handleSubmit() {
      this.$emit("handleLoading", true);
      this.createBase64Image(this.payload.files)
        .then((e) => {
          const tanggal_lahir = this.$DateTime
            .fromISO(this.payload.tanggal_lahir)
            .setLocale("id")
            .toFormat("dd-MM-yyyy");

          const payload = {
            image: e.target.result,
            nama: this.payload.nama || "-",
            jenis_kelamin: this.payload.jenis_kelamin || "-",
            ttl: `${this.payload.tempat_lahir}, ${tanggal_lahir}` || "-",
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
            // sertifikasi: this.payload.sertifikasi || "-",
            nuptk: this.payload.nuptk || "-",
          };
          if (this.payload?.guru_id) payload.guru_id = this.payload.guru_id;
          GuruService.addGuru(payload)
            .then(({ data: { success, message } }) => {
              if (success == true) {
                this.$store.commit("snackbar/setSnack", {
                  show: true,
                  message: "Berhasil Menyimpan Data Guru",
                  color: "success",
                });
                this.$router.replace({ name: GURU.BROWSE });
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
        })
        .catch((err) => {
          console.error(err);
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "File Foto Harus Diisi",
            color: "error",
          });
          this.$vuetify.goTo("#preview-photo", {
            duration: 500,
            offset: 0,
            easing: "easeInOutCubic",
          });
          this.$emit("handleLoading", false);
        });
    },
  },
  mounted() {
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
