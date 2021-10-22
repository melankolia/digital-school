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
          <td>Tanggal Diterima</td>
          <td class="text-right text-sub">
            {{ items.tanggal_diterima || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Lulus Dari</td>
          <td class="text-right text-sub">
            {{ items.lulus_dari || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Tanggal No Ijazah</td>
          <td class="text-right text-sub">
            {{ items.tanggal_no_ijazah || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Tanggal No STL</td>
          <td class="text-right text-sub">
            {{ items.tanggal_no_stl || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Lama Belajar</td>
          <td class="text-right text-sub">
            {{ items.lama_belajar || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Nilai SKHUN</td>
          <td class="text-right text-sub">
            {{ items.nilai_skhun || "-" | toTitle }}
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
        pendidikan_id: null,
        siswa_id: null,
        tanggal_diterima: null,
        lulus_dari: null,
        tanggal_no_ijazah: null,
        tanggal_no_stl: null,
        lama_belajar: null,
        nilai_skhun: null,
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
      this.$emit("on-loading", true);
      SiswaService.getPendidikan(this.id)
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = { ...this.items, ...data };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Pendidikan Siswa",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Pendidikan Siswa",
            color: "error",
          });
          console.error(err);
        })
        .finally(() => {
          this.loading = false;
          this.$emit("on-loading", false);
        });
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
