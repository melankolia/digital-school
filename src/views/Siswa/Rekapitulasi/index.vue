<template>
  <div class="d-flex flex-column ml-7 mt-4 mb-7 mr-12">
    <div class="d-flex flex-row justify-space-between mb-6 mt-1">
      <div>
        <p class="header-title mb-1">Rekapitulasi Siswa</p>
      </div>
    </div>
    <v-tabs class="mb-6" v-model="tab" color="tabMenu">
      <v-tab v-for="item in tabs" :key="item.val">
        <p class="ma-0 tabs-title">{{ item.text }}</p>
      </v-tab>
    </v-tabs>
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
</template>

<script>
export default {
  data() {
    return {
      tab: "all",
      tabs: [
        { text: "X MIPA 1", val: "all" },
        { text: "X MIPA 2", val: "all" },
        { text: "X MIPA 3", val: "all" },
        { text: "X MIPA 4", val: "all" },
        { text: "X MIPA 5", val: "all" },
        { text: "X MIPA 6", val: "all" },
        { text: "X IPS 1", val: "all" },
        { text: "X IPS 2", val: "all" },
        { text: "X IPS 3", val: "all" },
        { text: "X IPS 4", val: "all" },
      ],
    };
  },
  methods: {},
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
