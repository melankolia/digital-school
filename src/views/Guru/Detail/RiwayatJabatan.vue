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
            {{ items.nama || "-" }}
          </td>
        </tr>
        <tr>
          <td>Jenis Kelamin</td>
          <td class="text-right text-sub">
            {{ items.jenis_kelamin || "-" }}
          </td>
        </tr>
        <tr>
          <td>Tempat Tanggal Lahir</td>
          <td class="text-right text-sub">
            {{ items.tempat_tanggal_lahir || "-" }}
          </td>
        </tr>
        <tr>
          <td>NIP</td>
          <td class="text-right text-sub">
            {{ items.NIP || "-" }}
          </td>
        </tr>
        <tr>
          <td>Pendidikan Terakhir</td>
          <td class="text-right text-sub">
            {{ items.pendidikan_terakhir || "-" }}
          </td>
        </tr>
        <tr>
          <td>Mulai Bertugas Disini</td>
          <td class="text-right text-sub">
            {{ items.mulai_bertugas_disini || "-" }}
          </td>
        </tr>
        <tr>
          <td>Jabatan / Tugas</td>
          <td class="text-right text-sub">
            {{ items.jabatan || "-" }}
          </td>
        </tr>
        <tr>
          <td>Pangkat Golongan</td>
          <td class="text-right text-sub">
            {{ items.pangkat_golongan || "-" }}
          </td>
        </tr>
        <tr>
          <td>Pangkat TMT</td>
          <td class="text-right text-sub">
            {{ items.pangkat_tmt || "-" }}
          </td>
        </tr>
        <tr>
          <td>SK Pertama</td>
          <td class="text-right text-sub">
            {{ items.sk_pertama || "-" }}
          </td>
        </tr>
        <tr>
          <td>Gaji Pokok</td>
          <td class="text-right text-sub">
            {{ items.gaji_pokok || "-" }}
          </td>
        </tr>
        <tr>
          <td>MK. GOL Tahun</td>
          <td class="text-right text-sub">
            {{ items.mk_gol_tahun || "-" }}
          </td>
        </tr>
        <tr>
          <td>MK. GOL Bulan</td>
          <td class="text-right text-sub">
            {{ items.mk_gol_bulan || "-" }}
          </td>
        </tr>
        <tr>
          <td>K / TK</td>
          <td class="text-right text-sub">
            {{ items.tk || "-" }}
          </td>
        </tr>
        <tr>
          <td>Kenaikan YAD Pangkat</td>
          <td class="text-right text-sub">
            {{ items.kenaikan_yad_pangkat || "-" }}
          </td>
        </tr>
        <tr>
          <td>Kenaikan YAD Gaji Berkala</td>
          <td class="text-right text-sub">
            {{ items.kenaikan_yad_gaji_berkala || "-" }}
          </td>
        </tr>
        <tr>
          <td>Sertifikasi</td>
          <td class="text-right text-sub">
            {{ items.sertifikasi || "-" }}
          </td>
        </tr>
        <tr>
          <td>NUPTK</td>
          <td class="text-right text-sub">
            {{ items.nuptk || "-" }}
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
        guru_id: "123",
        nama: null,
        jenis_kelamin: null,
        tempat_tanggal_lahir: null,
        NIP: null,
        pendidikan_terakhir: null,
        mulai_bertugas_disini: null,
        jabatan: null,
        pangkat_golongan: null,
        pangkat_tmt: null,
        sk_pertama: null,
        gaji_pokok: null,
        mk_gol_tahun: null,
        mk_gol_bulan: null,
        tk: null,
        kenaikan_yad_pangkat: null,
        kenaikan_yad_gaji_berkala: null,
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

tr:nth-child(even) {
  background: none;
}
</style>
