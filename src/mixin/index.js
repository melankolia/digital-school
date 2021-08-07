import Vue from "vue";
Vue.mixin({
  methods: {
    customPagination(props) {
      return `Show ${
        (props.pagination.page - 1) * props.pagination.itemsPerPage + 1
      } to ${props.pagination.itemsPerPage} of ${
        props.pagination.itemsLength
      } results`;
    },
  },
  computed: {
    isFirst() {
      return 0;
    },
    isLast() {
      return this.headers.length - 1;
    },
  },
});
