<template>
  <div
    class="
      table-footer
      rounded-b-lg
      d-flex
      flex-row
      align-center
      justify-space-between
      px-7
      py-8
    "
  >
    <div class="d-flex flex-row align-center justify-center pr-7">
      <v-select
        v-model="options.itemsPerPage"
        :items="props.itemsPerPageOptions"
        solo
        hide-details
        dense
        style="width: 80px"
        class="rounded-lg mr-4"
        color="primary"
        item-text="text"
        item-value="value"
      >
        <template #item="{ item }">
          <p class="selection-item ma-0">
            <span>
              {{ item }}
            </span>
          </p>
        </template>
      </v-select>
      <p class="table-footer-text ma-0">
        {{ customPagination(props) }}
      </p>
    </div>
    <div>
      <v-btn
        @click="options.page--"
        :disabled="prevDisabled"
        depressed
        outlined
        class="rounded-lg px-6 mr-3"
      >
        Prev
      </v-btn>
      <v-btn
        @click="options.page++"
        :disabled="nextDisabled"
        depressed
        color="primary"
        class="rounded-lg px-6"
      >
        Next
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Object, required: true, default: () => {} },
    props: { type: Object, required: true, default: () => {} },
    totalPage: { type: Number, required: true, default: () => 1 },
  },
  computed: {
    prevDisabled() {
      return this.options.page <= 1;
    },
    nextDisabled() {
      return this.totalPage <= this.options.page;
    },
  },
};
</script>

<style></style>
