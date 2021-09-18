<template>
  <div class="table-border rounded-lg pa-4">
    <ContentNotFound
      message="Data Tentang Diri Not Found"
      :loading="loading"
      v-if="!isAvailable"
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
    <v-simple-table v-else>
      <tbody>
        <tr>
          <td>Golongan Darah</td>
          <td class="text-right text-sub">
            {{ items.gol_darah || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Kelainan Jasmani</td>
          <td class="text-right text-sub">
            {{ items.kelainan_jasmani || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Tinggi Berat Badan</td>
          <td class="text-right text-sub">
            {{ items.tinggi_berat_badan || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Nama Penyakit</td>
          <td class="text-right text-sub">
            {{ items.nama_penyakit || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Tahun Sakit</td>
          <td class="text-right text-sub">
            {{ items.tahun_sakit || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Lama Sakit</td>
          <td class="text-right text-sub">
            {{ items.lama_sakit || "-" | toTitle }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import SiswaService from "@/services/resources/siswa.service";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      id: this.$route.params?.secureId,
      loading: false,
      items: {
        kesehatan_id: null,
        siswa_id: null,
        gol_darah: null,
        kelainan_jasmani: null,
        tinggi_berat_badan: null,
        nama_penyakit: null,
        tahun_sakit: null,
        lama_sakit: null,
      },
    };
  },
  computed: {
    isAvailable() {
      return this.items?.siswa_id;
    },
  },
  methods: {
    getDetail() {
      this.loading = true;
      SiswaService.getKesehatan(this.id)
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = { ...this.items, ...data };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Kesehatan Siswa",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Kesehatan Siswa",
            color: "error",
          });
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>

<style scoped>
tr:nth-child(odd) {
  background: #f7f7fc;
}

tr:nth-child(even) {
  background: none;
}
</style>
