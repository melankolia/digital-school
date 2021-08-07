import Vue from "vue";
// import Converter from '@/common/converter';
/**
 * Converts a snake case string to title case.
 * Example: snake_case => Snake Case
 *
 * @param  {String} str the string to convert
 * @return {String}
 */
Vue.filter("snakeToTitle", (str) => {
  return (
    str &&
    str
      .split("_")
      .map(function (item) {
        return item.charAt(0).toUpperCase() + item.substring(1);
      })
      .join(" ")
  );
});

Vue.filter("camelToTitle", (str) => {
  return str
    ? str
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
    : "";
});

Vue.filter("toTitle", (str) => {
  return (
    str &&
    str
      .split(" ")
      .map(function (item) {
        return item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
      })
      .join(" ")
  );
});

Vue.filter("firstCapital", (str) => {
  return str && str[0].toUpperCase() + str.slice(1);
});

Vue.filter("mask", function (value, size) {
  if (!value) return "";
  let mask = "";
  for (var i = 0; i < size; i++) {
    mask = mask + "*";
  }
  value = value.toString();
  return value.replace(
    value.substring(value.length - size, value.length),
    mask
  );
});

Vue.filter("upperCase", (str) => {
  return str && str.toUpperCase();
});

Vue.filter("convertNull", (str) => {
  return str && str == "0" ? null : str;
});

Vue.filter("casePercentage", (str) => {
  return str && `${str} %`;
});

Vue.filter("prettierJSON", (str) => {
  try {
    return str && JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
});

Vue.filter("prettierResponse", (str) => {
  return (
    str &&
    str
      .split(",")
      .map((item) => item.trim())
      .join(",\n")
  );
});
