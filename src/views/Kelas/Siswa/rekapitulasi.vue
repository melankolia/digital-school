<template>
  <div class="dialog-container">
    <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
      <div class="d-flex flex-row justify-space-between mb-12">
        <v-btn
          @click="closeRekapitulasi"
          depressed
          color="header"
          class="rounded-lg mr-4 outlined-custom"
        >
          <p class="header-button-back ma-0">
            <span> Close </span>
          </p>
        </v-btn>
      </div>
      <div class="d-flex flex-row justify-space-between mb-6 mt-1">
        <div>
          <p class="header-title mb-1">Rekapitulasi Siswa - {{ kelas }}</p>
        </div>
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Jenis Kelamin</p>
        <v-simple-table>
          <thead>
            <tr class="table-header">
              <th class="table-header-text rounded-l-lg">Laki-Laki</th>
              <th class="table-header-text">Perempuan</th>
              <th class="table-header-text rounded-r-lg">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-header-text">15</td>
              <td class="table-header-text">20</td>
              <td class="table-header-text">35</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Agama</p>
        <v-simple-table>
          <thead>
            <tr class="table-header">
              <th class="table-header-text rounded-l-lg">Islam</th>
              <th class="table-header-text">Katolik</th>
              <th class="table-header-text">Kristen</th>
              <th class="table-header-text">Hindu</th>
              <th class="table-header-text">Buddha</th>
              <th class="table-header-text rounded-r-lg">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-header-text">15</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">35</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">35</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Tahun Kelahiran</p>
        <v-simple-table>
          <thead>
            <tr class="table-header">
              <th class="table-header-text rounded-l-lg">1997</th>
              <th class="table-header-text">1998</th>
              <th class="table-header-text">1999</th>
              <th class="table-header-text">2000</th>
              <th class="table-header-text">2001</th>
              <th class="table-header-text">2002</th>
              <th class="table-header-text">2003</th>
              <th class="table-header-text">2004</th>
              <th class="table-header-text">2005</th>
              <th class="table-header-text">2006</th>
              <th class="table-header-text rounded-r-lg">2007</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-header-text">15</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">35</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">35</td>
              <td class="table-header-text">-</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
      <div class="table-border mb-6 rounded-lg pa-4">
        <p class="mb-6 kelompok-label">Tidak Mampu</p>
        <v-simple-table>
          <thead>
            <tr class="table-header">
              <th class="table-header-text rounded-l-lg">Laki-laki</th>
              <th class="table-header-text">Perempuan</th>
              <th class="table-header-text">Jumlah</th>
              <th class="table-header-text">KPS</th>
              <th class="table-header-text">Non KPS</th>
              <th class="table-header-text rounded-r-lg">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table-header-text">15</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">35</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">-</td>
              <td class="table-header-text">35</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kelas: this.$route.query?.kelas,
    };
  },
  methods: {
    closeRekapitulasi() {
      this.$emit("close-rekapitulasi");
    },
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

.dialog-container {
  position: absolute;
  background-color: white;
  width: 100%;
  z-index: 2;
}
</style>
