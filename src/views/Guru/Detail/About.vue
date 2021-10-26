<template>
  <div class="table-border rounded-lg pa-4">
    <ContentNotFound
      message="Data Riwayat Jabatan Not Found"
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
          <td>Nama</td>
          <td class="text-right text-sub">
            {{ items.nama || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Jenis Kelamin</td>
          <td class="text-right text-sub">
            {{ items.jenis_kelamin || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Tempat Tanggal Lahir</td>
          <td class="text-right text-sub">
            {{ items.ttl || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>NIP</td>
          <td class="text-right text-sub">
            {{ items.nip_karpeg || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Pendidikan Terakhir</td>
          <td class="text-right text-sub">
            {{ items.pendidikan || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Mulai Bertugas Disini</td>
          <td class="text-right text-sub">
            {{ items.mulai_bertugas || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Jabatan / Tugas</td>
          <td class="text-right text-sub">
            {{ items.jabatan || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Pangkat Golongan</td>
          <td class="text-right text-sub">
            {{ items.gol_pangkat || "-" }}
          </td>
        </tr>
        <tr>
          <td>Pangkat TMT</td>
          <td class="text-right text-sub">
            {{ items.tmt_pangkat || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>SK Pertama</td>
          <td class="text-right text-sub">
            {{ items.sk_pertama || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Gaji Pokok</td>
          <td class="text-right text-sub">
            {{ items.gaji_pokok || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>MK. GOL Tahun</td>
          <td class="text-right text-sub">
            {{ items.mk_gol_tahun || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>MK. GOL Bulan</td>
          <td class="text-right text-sub">
            {{ items.mk_gol_bulan || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>K / TK</td>
          <td class="text-right text-sub">
            {{ items.k_tk || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Kenaikan YAD Pangkat</td>
          <td class="text-right text-sub">
            {{ items.yad_gaji || "-" | toTitle }}
          </td>
        </tr>
        <tr>
          <td>Kenaikan YAD Gaji Berkala</td>
          <td class="text-right text-sub">
            {{ items.yad_gaji || "-" | toTitle }}
          </td>
        </tr>
        <!-- <tr>
          <td>Sertifikasi</td>
          <td class="text-right text-sub">
            {{ items.sertifikasi || "-" | toTitle }}
          </td>
        </tr> -->
        <tr>
          <td>NUPTK</td>
          <td class="text-right text-sub">
            {{ items.nuptk || "-" | toTitle }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
const ContentNotFound = () => import("@/components/Content/NotFound");
import GuruService from "@/services/resources/guru.service";

export default {
  components: {
    ContentNotFound,
  },
  data() {
    return {
      id: this.$route.params?.guruId,
      loading: false,
      items: {
        guru_id: null,
        nama: null,
        jenis_kelamin: null,
        ttl: null,
        nip_karpeg: null,
        pendidikan: null,
        mulai_tugas: null,
        jabatan: null,
        gol_pangkat: null,
        tmt_pangkat: null,
        sk_pertama: null,
        gaji: null,
        mk_gol_tahun: null,
        mk_gol_bulan: null,
        k_tk: null,
        yad_gaji: null,
        sertifikasi: null,
        nuptk: null,
      },
    };
  },
  computed: {
    isAvailable() {
      return this.items?.guru_id;
    },
  },
  methods: {
    getDetail() {
      this.loading = true;
      GuruService.getDetail(this.id)
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            this.items = { ...this.items, ...data };
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Tentang Diri Guru",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Tentang Diri Guru",
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
