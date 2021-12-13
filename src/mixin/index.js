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
    async downloadTemplate(URL_TEMPLATE, NAME_TEMPLATE, TYPE = "force") {
      const link = document.createElement("a");
      if (TYPE == "force") {
        link.href = URL_TEMPLATE;
      } else {
        let blob = await fetch(URL_TEMPLATE).then((r) => r.blob());
        const url = window.URL.createObjectURL(blob);
        link.href = url;
      }
      link.setAttribute("download", NAME_TEMPLATE);
      document.body.appendChild(link);
      link.click();
    },
    async createBase64Image(fileObject) {
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e);
        };
        reader.onerror = reject;
        reader.readAsDataURL(fileObject);
      });
    },
    toOurFormat(str) {
      if (str) {
        const parseDate = this.$DateTime.fromFormatExplain(str, "dd-MM-yyyy");
        if (Object.entries(parseDate.result).length !== 0) {
          return this.$DateTime
            .fromISO(
              `${parseDate.result.year}-${parseDate.result.month}-${parseDate.result.day}`
            )
            .toFormat("dd LLLL yyyy");
        }
      } else return "-";
    },
    toOurFormatDetail(str) {
      if (str) {
        const parseDate = this.$DateTime.fromFormatExplain(str, "dd-MM-yyyy");
        if (Object.entries(parseDate.result).length !== 0) {
          return `${parseDate.result.year}-${this.expandDigit(
            parseDate.result.month
          )}-${this.expandDigit(parseDate.result.day)}`;
        }
      } else return "-";
    },
    expandDigit(str) {
      if (str < 10) return `0${str}`;
      else return str;
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
