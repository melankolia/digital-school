<template>
  <p></p>
</template>

<script>
import { SISWA } from "@/router/name.types";

export default {
  mounted() {
    this.$router.replace({ name: SISWA.KELAS.BROWSE });
  },
};
</script>
