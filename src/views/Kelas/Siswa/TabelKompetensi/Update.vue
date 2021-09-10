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
    </div>
    <div class="d-flex flex-row justify-space-between mb-6 mt-1">
      <div class="d-flex flex-column" style="width: 100vw">
        <div class="d-flex flex-row justify-space-between">
          <p class="header-title mb-4">Input Tabel Kompetensi Siswa</p>
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
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                NISN : {{ items.NISN || "-" | toTitle }}
              </p>
            </div>
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                Semester : {{ items.semester || "-" | toTitle }}
              </p>
            </div>
            <div class="backgroundLabel mr-4">
              <p class="header-subtitle py-2 px-3 ma-0">
                Angkatan : {{ items.angkatan || "-" | toTitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Kelompok A (Wajib)</p>
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Pendidikan Agama Islam</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">PPKN</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Bahasa Indonesia</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Bahasa Inggris</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Kelompok B (Wajib)</p>
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Seni Budaya</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Penjas, Olahraga & Kesehatan</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Prakarya & Kewirausahaan</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Kelompok C Peminatan</p>
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Matematika</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Biologi</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Fisika</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Fisika</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Kimia</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Geografi</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Sejarah</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Sosiologi</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Ekonomi</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Bahasa & Sastra Indonesia</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Bahasa & Sastra Inggris</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Bahasa Asing Lain</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Antropologi</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 50%" class="mr-4">
            <p class="mb-1 input-custom-label">Nilai</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 50%">
            <p class="mb-1 input-custom-label">Sikap</p>
            <v-select
              :items="listSikap"
              label="Pilihan Sikap"
              solo
              hide-details
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-border mb-6 rounded-lg pa-4">
      <p class="mb-6 kelompok-label">Ketidak Hadiran</p>
      <div class="kelompok-item rounded pa-4" style="width: 100%">
        <p class="kelompok-sublabel mb-4">Antropologi</p>
        <div class="d-flex flex-row justify-space-between">
          <div style="width: 33%" class="mr-4">
            <p class="mb-1 input-custom-label">Sakit</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 33%" class="mr-4">
            <p class="mb-1 input-custom-label">Izin</p>
            <v-text-field label="0" solo hide-details />
          </div>
          <div style="width: 33%">
            <p class="mb-1 input-custom-label">Tanpa Keterangan</p>
            <v-text-field label="0" solo hide-details />
          </div>
        </div>
      </div>
    </div>
    <div class="align-self-end">
      <v-btn depressed color="primary" class="rounded-lg">
        <p class="header-button-title ma-0">
          <span> Submit Data Nilai </span>
        </p>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {
        NIS: null,
        NISN: null,
        nama_kelas: null,
        nama_siswa: null,
        semester: null,
        angkatan: null,
      },
      listSikap: ["Sangat Buruk", "Buruk", "Sedang", "Baik", "Sangat Baik"],
    };
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

.kelompok-sublabel {
  color: #646464;
  font-family: "Poppins";
  font-size: 16px;
  font-style: normal;
  font-weight: 500 !important;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
}

.kelompok-item {
  background-color: #f4f4f4;
}

.input-custom-label {
  color: #646464;
  font-family: "Montserrat";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0.75px;
  text-align: left;
}
</style>
