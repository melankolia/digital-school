<template>
  <v-card class="rounded-lg ma-2" width="30%">
    <div class="pa-8" style="background-color: #dddddd !important">
      <v-img
        src="@/assets/image/prestasi.png"
        :aspect-ratio="3.7"
        contain
        height="129"
      />
    </div>

    <v-card-actions>
      <div>
        <v-card-title class="card-title"> {{ cardDetail.judul }} </v-card-title>
        <v-card-subtitle class="card-description">
          {{ cardDetail.deskripsi }}
        </v-card-subtitle>
      </div>

      <v-spacer></v-spacer>

      <v-menu rounded left min-width="188px">
        <template v-slot:activator="{ attrs, on }">
          <v-btn v-bind="attrs" v-on="on" icon @click="show = !show">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="() => handleDetail(cardDetail)" link>
            <img class="mr-4" src="@/assets/icons/edit-outlined.svg" />
            <p class="selection-item ma-0">Edit</p>
          </v-list-item>
          <v-list-item
            @click="
              () =>
                downloadTemplate(cardDetail.file, cardDetail.judul, 'forcing')
            "
            link
          >
            <img class="mr-4" src="@/assets/icons/detail.svg" />
            <p class="selection-item ma-0">Download</p>
          </v-list-item>
          <v-list-item @click="() => handleDelete(cardDetail)" link>
            <img class="mr-4" src="@/assets/icons/delete-outlined.svg" />
            <p class="selection-item ma-0">Hapus</p>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
const cardDetail = {
  judul: "Sertifikat Berprestasi",
  deskripsi: "Deskripsi",
  prestasi_id: "12345",
};
export default {
  props: {
    cardDetail: { type: Object, required: true, default: () => cardDetail },
    handleDelete: { type: Function, required: true, default: () => {} },
    handleDetail: { type: Function, required: true, default: () => {} },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.card-title {
  font-family: "Poppins" !important;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  letter-spacing: 0.75px;

  color: #000000;
}

.card-description {
  font-family: "Poppins" !important;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  letter-spacing: 0.75px;

  /* Grayscale/Label */

  color: #6e7191;
}
</style>
