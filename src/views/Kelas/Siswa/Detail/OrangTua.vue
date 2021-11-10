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
        <template v-for="(item, i) in items">
          <tr :key="'type' + i">
            <td>{{ item.type | toTitle }}</td>
            <td></td>
          </tr>
          <tr :key="'a' + i">
            <td class="pl-9 text-sub">a. Nama Lengkap</td>
            <td class="text-right text-sub">
              {{ item.nama || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'b' + i">
            <td class="pl-9 text-sub">b. Tempat, Tanggal Lahir</td>
            <td class="text-right text-sub">
              {{ item.TTL || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'c' + i">
            <td class="pl-9 text-sub">c. Agama</td>
            <td class="text-right text-sub">
              {{ item.agama || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'d' + i">
            <td class="pl-9 text-sub">d. Kewarganegaraan</td>
            <td class="text-right text-sub">
              {{ item.kewarganegaraan || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'e' + i">
            <td class="pl-9 text-sub">e. Pendidikan</td>
            <td class="text-right text-sub">
              {{ item.pendidikan || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'f' + i">
            <td class="pl-9 text-sub">f. Golongan Pejerjaan</td>
            <td class="text-right text-sub">
              {{ item.gol_pekerjaan || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'g' + i">
            <td class="pl-9 text-sub">g. Pekerjaan</td>
            <td class="text-right text-sub">
              {{ item.pekerjaan || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'h' + i">
            <td class="pl-9 text-sub">h. Penghasilan</td>
            <td class="text-right text-sub">
              {{ item.penghasilan || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'i' + i">
            <td class="pl-9 text-sub">i. Alamat</td>
            <td class="text-right text-sub">
              {{ item.alamat || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'j' + i">
            <td class="pl-9 text-sub">j. No Telpon</td>
            <td class="text-right text-sub">
              {{ item.no_telpon || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'k' + i">
            <td class="pl-9 text-sub">k. Status</td>
            <td class="text-right text-sub">
              {{ item.status || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'l' + i">
            <td class="pl-9 text-sub">l. Status Nikah</td>
            <td class="text-right text-sub">
              {{ item.status_nikah || "-" | toTitle }}
            </td>
          </tr>
          <tr :key="'m' + i">
            <td class="pl-9 text-sub">m. Tahun Meninggal</td>
            <td class="text-right text-sub">
              {{ item.tahun_meninggal || "-" | toTitle }}
            </td>
          </tr>
        </template>
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
      items: [
        {
          siswa_id: null,
          type: "Ayah",
          nama: null,
          TTL: null,
          agama: null,
          kewarganegaraan: null,
          pendidikan: null,
          gol_pekerjaan: null,
          pekerjaan: null,
          penghasilan: null,
          alamat: null,
          no_telpon: null,
          status: null,
          status_nikah: null,
          tahun_meninggal: null,
        },
        {
          siswa_id: null,
          type: "Ibu",
          nama: null,
          TTL: null,
          agama: null,
          kewarganegaraan: null,
          pendidikan: null,
          gol_pekerjaan: null,
          pekerjaan: null,
          penghasilan: null,
          alamat: null,
          no_telpon: null,
          status: null,
          status_nikah: null,
          tahun_meninggal: null,
        },
      ],
    };
  },
  computed: {
    isAvailable() {
      return this.items.every((e) => e.siswa_id != null);
    },
    isAlumni() {
      return this.$router.currentRoute?.name == ALUMNI.DETAIL;
    },
  },
  methods: {
    getDetail() {
      this.loading = true;
      this.$emit("on-loading", true);
      SiswaService.getOrangTua({
        siswa_id: this.id,
        alumni: this.isAlumni ? true : null,
      })
        .then(({ data: { code, data, message } }) => {
          if (code == 200) {
            const items = this.items.map((e, i) => (e = { ...e, ...data[i] }));
            this.items = [...items];
          } else {
            this.$store.commit("snackbar/setSnack", {
              show: true,
              message: message || "Gagal Memuat Data Orang Tua Siswa",
              color: "error",
            });
          }
        })
        .catch((err) => {
          this.$store.commit("snackbar/setSnack", {
            show: true,
            message: "Gagal Memuat Data Orang Tua Siswa",
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
