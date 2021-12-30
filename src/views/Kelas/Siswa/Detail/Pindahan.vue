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
          <td>Pindah Sekolah</td>
          <td class="text-right text-sub">
            {{ items.pindah_sekolah || "-" }}
          </td>
        </tr>
        <tr>
          <td>Pindah Alasahn</td>
          <td class="text-right text-sub">
            {{ items.pindah_alasan || "-" }}
          </td>
        </tr>
        <tr>
          <td>Diterima Di</td>
          <td class="text-right text-sub">
            {{ items.diterima_di || "-" }}
          </td>
        </tr>
        <tr>
          <td>Diterima Program</td>
          <td class="text-right text-sub">
            {{ items.diterima_program || "-" }}
          </td>
        </tr>
        <tr>
          <td>Meninggalkan Di</td>
          <td class="text-right text-sub">
            {{ items.meinggalkan_di || "-" }}
          </td>
        </tr>
        <tr>
          <td>Meninggalkan Program</td>
          <td class="text-right text-sub">
            {{ items.meninggalkan_program || "-" }}
          </td>
        </tr>
        <tr>
          <td>Meninggalkan Alasan</td>
          <td class="text-right text-sub">
            {{ items.meninggalkan_alasan || "-" }}
          </td>
        </tr>
        <tr>
          <td>Akhir Tamat Belajar</td>
          <td class="text-right text-sub">
            {{ items.meninggalkan_program || "-" }}
          </td>
        </tr>
        <tr>
          <td>Akhir STTB</td>
          <td class="text-right text-sub">
            {{ items.akhir_STTB || "-" }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import SiswaService from "@/services/resources/siswa.service";
import { ALUMNI } from "@/router/name.types";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      id: this.$route.params?.secureId,
      loading: false,
      items: {
        pindah_id: null,
        siswa_id: null,
        pindah_sekolah: null,
        pindah_alasan: null,
        diterima_di: null,
        diterima_program: null,
        meninggalkan_di: null,
        meninggalkan_program: null,
        meninggalkan_alasan: null,
        akhir_tamat_belajar: null,
        akhir_STTB: null,
      },
    };
  },
  computed: {
    isAvailable() {
      return this.items?.siswa_id;
    },
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.DETAIL;
    },
  },
  methods: {
    getDetail() {
      this.loading = true;
      this.$emit("on-loading", true);
      SiswaService.getPindahan({
        siswa_id: this.id,
        alumni: this.isAlumni ? true : null,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = { ...this.items, ...data };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Pindahan Siswa",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Pindahan Siswa",
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
