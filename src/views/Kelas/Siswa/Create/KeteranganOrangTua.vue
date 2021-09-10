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
    <div class="d-flex flex-column">
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
              label="dd/mm/yyyy"
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
              label="Contoh: Chris Budiman"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="6">
            <p class="mb-3 title-input">b. Tempat tanggal lahir</p>
            <v-text-field
              v-model="payload[1].TTL"
              hide-details
              filled
              solo
              label="dd/mm/yyyy"
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
            <p class="mb-3 title-input">l. Status nikah ayah</p>
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
              label="dd/mm/yyyy"
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
            <p class="mb-3 title-input">k. Hubungan</p>
            <v-text-field
              v-model="payload[2].hubungan"
              hide-details
              filled
              solo
              label="Contoh: Paman"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.query?.kelasId,
      kelas: this.$route.query?.kelas,
      // Agama Properties
      listAgama: [
        "Islam",
        "Kristen Katolik",
        "Kristen Protestan",
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
          hubungan: null,
        },
      ],
    };
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      console.log(this.payload);
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
