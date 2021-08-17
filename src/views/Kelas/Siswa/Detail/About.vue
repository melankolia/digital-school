<template>
  <div class="table-border rounded-lg pa-4">
    <ContentNotFound
      message="Data Tentang Diri Not Found"
      :loading="loading"
      v-if="!isAvailable"
    >
      <template v-slot:action>
        <v-btn depressed color="header" class="rounded-lg outlined-custom">
          <v-icon class="mr-1" small>mdi-reload</v-icon>
          <p class="header-button-back ma-0">Reload</p>
        </v-btn>
      </template>
    </ContentNotFound>
    <v-simple-table v-else>
      <tbody>
        <tr>
          <td>Nama siswa</td>
          <td class="text-right text-sub"></td>
        </tr>
        <tr>
          <td class="pl-9 text-sub">a. Nama lengkap</td>
          <td class="text-right text-sub">
            {{ items.nama_lengkap || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td class="pl-9 text-sub">b. Nama panggilan</td>
          <td class="text-right text-sub">
            {{ items.nama_panggilan || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Tempat tanggal lahir</td>
          <td class="text-right text-sub">
            {{ items.tanggal_lahir || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Jenis Kelamin</td>
          <td class="text-right text-sub">
            {{ items.kelamin || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Agama</td>
          <td class="text-right text-sub">
            {{ items.agama || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Kewarganegaraan</td>
          <td class="text-right text-sub">
            {{ items.kewarganegaraan || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Anak ke berapa</td>
          <td class="text-right text-sub">
            {{ items.anak_ke || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Jumlah saudara kandung</td>
          <td class="text-right text-sub">
            {{ items.jml_sdr_kandung || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Jumlah saudara tiri</td>
          <td class="text-right text-sub">
            {{ items.jml_sdr_tiri || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Jumlah saudara angkat</td>
          <td class="text-right text-sub">
            {{ items.jml_sdr_angkat || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Anak yatim/piatu/yatim piatu</td>
          <td class="text-right text-sub">
            {{ items.status_anak || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Bahasa sehari-hari di rumah</td>
          <td class="text-right text-sub">
            {{ items.bahasa_sehari || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Pihak yang bisa dihubungi</td>
          <td class="text-right text-sub">
            {{ items.pihak_dihubungi || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Penanggung biaya</td>
          <td class="text-right text-sub">
            {{ items.penanggung_biaya || "-" | toTitle }}
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
        tentang_id: null,
        siswa_id: null,
        nama_lengkap: null,
        nama_panggilan: null,
        tempat_lahir: null,
        tanggal_lahir: null,
        kelamin: null,
        agama: null,
        kewarganegaraan: null,
        anak_ke: null,
        jml_sdr_kandung: null,
        jml_sdr_tiri: null,
        jml_sdr_angkat: null,
        status_anak: null,
        bahasa_sehari: null,
        pihak_dihubungi: null,
        penanggung_biaya: null,
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
      SiswaService.getTentangDiri(this.id)
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
</style>