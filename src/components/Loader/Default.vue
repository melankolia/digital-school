<template>
  <div v-if="loading">
    <div v-ripple="{ center: true }" :class="loader">
      <v-progress-circular
        indeterminate
        :size="size"
        :color="color"
      ></v-progress-circular>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DefaultLoader",
  props: {
    loading: { type: Boolean, required: false, default: false },
    size: { type: Number, required: false, default: 64 },
    color: { type: String, required: false, default: "primary" },
    px: { type: Number, required: false, default: 10 },
    py: { type: Number, required: false, default: 10 }
  },
  computed: {
    loader() {
      const px = `px-${this.px}`;
      const py = `py-${this.py}`;
      return `text-center ${px} ${py}`;
    }
  }
};
</script>
