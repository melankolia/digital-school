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
        <p class="header-subtitle-input mb-1">F. Keterangan Orang Tua Siswa</p>
      </div>
    </div>
    <DefaultLoader :loading="loading" v-if="loading" />
    <div v-else class="d-flex flex-column">
      <div>
        <p class="mb-8 sick-history">Ayah</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">a. Nama</p>
            <v-text-field
              v-model="payload[0].nama"
              hide-details
              filled
              solo
              label="Contoh: Chris Budiman"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Tempat tanggal lahir</p>
            <v-text-field
              v-model="payload[0].TTL"
              hide-details
              filled
              solo
              label="Contoh: Jambi, 18 April 2007"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">c. Agama</p>
            <v-select
              v-model="payload[0].agama"
              :items="listAgama"
              hide-details
              filled
              solo
              label="Pilih Agama"
              clearable
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">d. Kewarganegaraan</p>
            <v-select
              v-model="payload[0].kewarganegaraan"
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
            <p class="mb-3 title-input">e. Pendidikan Terakhir</p>
            <v-text-field
              v-model="payload[0].pendidikan"
              hide-details
              filled
              solo
              label="Contoh: Sarjana"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">f. Pekerjaan</p>
            <v-text-field
              v-model="payload[0].pekerjaan"
              hide-details
              filled
              solo
              label="Contoh: Pegawai Negeri Sipil"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">g. Golongan Pekerjaan</p>
            <v-text-field
              v-model="payload[0].gol_pekerjaan"
              hide-details
              filled
              solo
              label="Contoh: IIIA"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">h. Penghasilan per bulan</p>
            <v-text-field
              v-model="payload[0].penghasilan"
              hide-details
              filled
              solo
              label="Contoh: 3.000.000"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">i. Alamat</p>
            <v-text-field
              v-model="payload[0].alamat"
              hide-details
              filled
              solo
              label="Contoh : Jalan Manual Megara No. 11 Kel. Salatiga Kota Jambi"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">j. Nomor telfon / handphone</p>
            <v-text-field
              v-model="payload[0].no_telpon"
              hide-details
              filled
              solo
              label="Contoh : (0741)329929 / 0888242423"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">k. Status</p>
            <v-text-field
              v-model="payload[0].status"
              hide-details
              filled
              solo
              label="Contoh: Menikah"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">l. Status nikah ayah</p>
            <v-text-field
              v-model="payload[0].status_nikah"
              hide-details
              filled
              solo
              label="Contoh: Menikah"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">m. Tahun Meninggal</p>
            <v-text-field
              v-model="payload[0].tahun_meninggal"
              hide-details
              filled
              solo
              label="Contoh: 2050"
            />
          </v-col>
        </v-row>
      </div>
      <v-divider class="my-9"></v-divider>
      <div>
        <p class="mb-8 sick-history">Ibu</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">a. Nama</p>
            <v-text-field
              v-model="payload[1].nama"
              hide-details
              filled
              solo
              label="Contoh: Christy"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Tempat tanggal lahir</p>
            <v-text-field
              v-model="payload[1].TTL"
              hide-details
              filled
              solo
              label="Contoh: Jambi, 18 April 2007"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">c. Agama</p>
            <v-select
              v-model="payload[1].agama"
              :items="listAgama"
              hide-details
              filled
              solo
              label="Pilih Agama"
              clearable
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">d. Kewarganegaraan</p>
            <v-select
              v-model="payload[1].kewarganegaraan"
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
            <p class="mb-3 title-input">e. Pendidikan Terakhir</p>
            <v-text-field
              v-model="payload[1].pendidikan"
              hide-details
              filled
              solo
              label="Contoh: Sarjana"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">f. Pekerjaan</p>
            <v-text-field
              v-model="payload[1].pekerjaan"
              hide-details
              filled
              solo
              label="Contoh: Pegawai Negeri Sipil"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">g. Golongan Pekerjaan</p>
            <v-text-field
              v-model="payload[1].gol_pekerjaan"
              hide-details
              filled
              solo
              label="Contoh: IIIA"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">h. Penghasilan per bulan</p>
            <v-text-field
              v-model="payload[1].penghasilan"
              hide-details
              filled
              solo
              label="Contoh: 3.000.000"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">i. Alamat</p>
            <v-text-field
              v-model="payload[1].alamat"
              hide-details
              filled
              solo
              label="Contoh : Jalan Manual Megara No. 11 Kel. Salatiga Kota Jambi"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">j. Nomor telfon / handphone</p>
            <v-text-field
              v-model="payload[1].no_telpon"
              hide-details
              filled
              solo
              label="Contoh : (0741)329929 / 0888242423"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">k. Status</p>
            <v-text-field
              v-model="payload[1].status"
              hide-details
              filled
              solo
              label="Contoh: Menikah"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">l. Status nikah ibu</p>
            <v-text-field
              v-model="payload[1].status_nikah"
              hide-details
              filled
              solo
              label="Contoh: Menikah"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">m. Tahun Meninggal</p>
            <v-text-field
              v-model="payload[1].tahun_meninggal"
              hide-details
              filled
              solo
              label="Contoh: 2050"
            />
          </v-col>
        </v-row>
      </div>
      <v-divider class="my-9"></v-divider>
      <div>
        <p class="mb-8 sick-history">Wali</p>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">a. Nama</p>
            <v-text-field
              v-model="payload[2].nama"
              hide-details
              filled
              solo
              label="Contoh: Chris Budiman"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Tempat tanggal lahir</p>
            <v-text-field
              v-model="payload[2].TTL"
              hide-details
              filled
              solo
              label="Contoh: Jambi, 18 April 2007"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">c. Agama</p>
            <v-select
              v-model="payload[2].agama"
              :items="listAgama"
              hide-details
              filled
              solo
              label="Pilih Agama"
              clearable
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">d. Kewarganegaraan</p>
            <v-select
              v-model="payload[2].kewarganegaraan"
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
            <p class="mb-3 title-input">e. Pendidikan Terakhir</p>
            <v-text-field
              v-model="payload[2].pendidikan"
              hide-details
              filled
              solo
              label="Contoh: Sarjana"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">f. Pekerjaan</p>
            <v-text-field
              v-model="payload[2].pekerjaan"
              hide-details
              filled
              solo
              label="Contoh: Pegawai Negeri Sipil"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">g. Golongan Pekerjaan</p>
            <v-text-field
              v-model="payload[2].gol_pekerjaan"
              hide-details
              filled
              solo
              label="Contoh: IIIA"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">h. Penghasilan per bulan</p>
            <v-text-field
              v-model="payload[2].penghasilan"
              hide-details
              filled
              solo
              label="Contoh: 3.000.000"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">i. Alamat</p>
            <v-text-field
              v-model="payload[2].alamat"
              hide-details
              filled
              solo
              label="Contoh : Jalan Manual Megara No. 11 Kel. Salatiga Kota Jambi"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">j. Nomor telfon / handphone</p>
            <v-text-field
              v-model="payload[2].no_telpon"
              hide-details
              filled
              solo
              label="Contoh : (0741)329929 / 0888242423"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">k. Status</p>
            <v-text-field
              v-model="payload[2].status"
              hide-details
              filled
              solo
              label="Contoh: Menikah"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">l. Status Nikah Wali</p>
            <v-text-field
              v-model="payload[2].status_nikah"
              hide-details
              filled
              solo
              label="Contoh: Paman"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">m. Tahun Meninggal</p>
            <v-text-field
              v-model="payload[2].tahun_meninggal"
              hide-details
              filled
              solo
              label="Contoh: 2010"
            />
          </v-col>
          <!-- <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">M. Hubungan</p>
            <v-text-field
              v-model="payload[2].hubungan"
              hide-details
              filled
              solo
              label="Contoh: Paman"
            />
          </v-col> -->
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
const DefaultLoader = () => import("@/components/Loader/Default");
import SiswaService from "@/services/resources/siswa.service";
import { ALUMNI } from "@/router/name.types";

export default {
  components: {
    DefaultLoader,
  },
  props: {
    siswaId: { type: String, required: true },
  },
  data() {
    return {
      id: this.$route.params?.kelasId,
      update: this.$route.query?.isUpdate,
      kelas: this.$route.query?.kelas,
      loading: false,
      // Agama Properties
      listAgama: [
        "Islam",
        "Katolik",
        "Kristen",
        "Hindu",
        "Buddha",
        "Kong Hu Chu",
        "Lainnya",
      ],
      // Kewarganegaraan Properties
      listKewarganegaraan: ["Indonesia", "WNA"],
      payload: [
        {
          type: "ayah",
          nama: null,
          TTL: null,
          agama: null,
          kewarganegaraan: null,
          gol_pekerjaan: null,
          penghasilan: null,
          alamat: null,
          no_telpon: null,
          status: null,
          status_nikah: null,
          tahun_meninggal: null,
        },
        {
          type: "ibu",
          nama: null,
          TTL: null,
          agama: null,
          kewarganegaraan: null,
          gol_pekerjaan: null,
          penghasilan: null,
          alamat: null,
          no_telpon: null,
          status: null,
          status_nikah: null,
          tahun_meninggal: null,
        },
        {
          type: "wali",
          nama: null,
          TTL: null,
          agama: null,
          kewarganegaraan: null,
          gol_pekerjaan: null,
          penghasilan: null,
          alamat: null,
          no_telpon: null,
          status: null,
          status_nikah: null,
          tahun_meninggal: null,
          pendidikan: null,
        },
      ],
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      this.$emit("handleLoading", true);
      const payload = {
        siswa_id: this.siswaId,
        data: this.payload.map((e) => {
          e.nama = e.nama || "-";
          e.TTL = e.TTL || "-";
          e.agama = e.agama || "-";
          e.kewarganegaraan = e.kewarganegaraan || "-";
          e.pekerjaan = e.pekerjaan || "-";
          e.gol_pekerjaan = e.gol_pekerjaan || "-";
          e.penghasilan = e.penghasilan || "-";
          e.alamat = e.alamat || "-";
          e.no_telpon = e.no_telpon || "-";
          e.status = e.status || "-";
          e.status_nikah = e.status_nikah || "-";
          e.tahun_meninggal = e.tahun_meninggal || "-";
          e.pendidikan = e.pendidikan || "-";
          return e;
        }),
      };
      payload.data.map((e) => {
        delete e.siswa_id;
      });
      SiswaService.addOrangTua(payload)
        .then(({ data: { data, success, message } }) => {
          if (success == true) {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: `Berhasil Menyimpan Data Keterangan Orang Tua ${
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
                `Gagal Menyimpan Data Keterangan Orang Tua ${
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
            message: `Gagal Menyimpan Data Keterangan Orang Tua ${
              this.isAlumni ? "Alumni" : "Siswa"
            }`,
            color: "error",
          });
        })
        .finally(() => this.$emit("handleLoading", false));
    },
    getDetail() {
      this.loading = true;
      SiswaService.getOrangTua({
        siswa_id: this.siswaId,
        alumni: this.isAlumni ? true : null,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.payload = [...data];
          } else {
            throw new Error(message);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.isUpdate && this.getDetail();
  },
  computed: {
    isUpdate() {
      return this.update;
    },
    isAvailable() {
      return this.payload.some((e) => e.siswa_id !== null);
    },
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.UPDATE;
    },
  },
};
</script>

<style>
.v-input__control {
  border: none;
}

.sick-history {
  font-family: "Montserrat";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: 0.75px;
  text-align: left;
}
</style>
