<template>
  <DefaultLoader
    :loading="loading"
    :size="size"
    :color="color"
    :px="px"
    :py="py"
  >
    <div class="py-10">
      <v-img
        src="@/assets/image/not-found.svg"
        alt="Not Founds"
        aspect-ratio="10"
        contain
      />
      <p class="tabs-title mt-6 text-center">{{ message }}</p>
      <v-row justify="center" class="pt-5">
        <slot name="action"></slot>
      </v-row>
    </div>
  </DefaultLoader>
</template>

<script>
const DefaultLoader = () => import("@/components/Loader/Default");

export default {
  components: {
    DefaultLoader,
  },
  props: {
    loading: { type: Boolean, required: false, default: false },
    message: { type: String, default: "Data Not Found" },
    size: { type: Number, required: false },
    color: { type: String, required: false },
    px: { type: Number, required: false },
    py: { type: Number, required: false },
  },
};
</script>
