import Vue from "vue";
/**
 * Converts a number string to currency format.
 * Example: 1000000 => 1.000.000
 *
 * @param  {String} str the string to convert
 * @return {String}
 */
Vue.filter("currency", (str) => {
  return str && !isNaN(str)
    ? (str / 1)
        .toFixed(0)
        .replace(".", ",")
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "-";
});

Vue.filter("threeDots", (str) => {
  return (
    str &&
    !isNaN(str) &&
    (str / 1)
      .replace(".", ",")
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
});

Vue.filter("number", (str) => {
  return str ? str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") : "0";
});

Vue.filter("percentage", (str) => {
  return str && !isNaN(str) && Math.floor(str * 100);
});
