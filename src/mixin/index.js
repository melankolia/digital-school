import Vue from "vue";
Vue.mixin({
  data() {
    return {
      cancelRequest: null,
    };
  },
  methods: {
    customPagination(props) {
      return `Show ${
        (props.pagination.page - 1) * props.pagination.itemsPerPage + 1
      } to ${props.pagination.itemsPerPage} of ${
        props.pagination.itemsLength
      } results`;
    },
    fetchListDebounce(callback) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        callback();
      }, 100);
      this.cancelRequest && this.cancelReq();
    },
    cancelReq() {
      this.cancelRequest && this.cancelRequest.cancel("Cancel");
    },
    createToken(callback) {
      callback && (this.cancelRequest = callback);
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
