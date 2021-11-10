<template>
  <div class="table-border rounded-lg pa-4">
    <ContentNotFound
      message="Data Status Bantuan Not Found"
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
          <td>Kartu Pelindungan Sosial (KPS)</td>
          <td class="text-right text-sub">
            {{ items.kps || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Program Keluarga Harapan (PKH)</td>
          <td class="text-right text-sub">
            {{ items.pkh || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Kartu Keluarga Sejahtera (KKS)</td>
          <td class="text-right text-sub">
            {{ items.kks || "-" | toTitle }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import { ALUMNI } from "@/router/name.types";
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
        status_bantuan_id: null,
        siswa_id: null,
        kps: null,
        pkh: null,
        kks: null,
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
    getDetails() {
      this.loading = true;
      this.$emit("on-loading", true);
      setTimeout(() => {
        this.loading = false;
        this.items = {
          siswa_id: "12345-67890",
          status_bantuan_id: "123456",
          kps: "Ada",
          pkh: "12345",
          kks: "12345",
        };
        this.$emit("on-loading", false);
      }, 3000);
    },
    getDetail() {
      this.loading = true;
      this.$emit("on-loading", true);
      SiswaService.getTentangDiri({
        siswa_id: this.id,
        alumni: this.isAlumni ? true : null,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = { ...this.items, ...data };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Tentang Diri Siswa",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Tentang Diri Siswa",
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
