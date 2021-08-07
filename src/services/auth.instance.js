import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

// instance.interceptors.request.use(function (config) {
// config.headers["Access-Control-Allow-Headers"] =
//   "Authorization, X-Requested-With, Content-Type, Accept";
// config.headers["Access-Control-Allow-Origin"] = "*";
// config.headers["Access-Control-Allow-Methods"] =
//   "GET, POST, PUT, DELETE, OPTIONS";
//   return config;
// });

const AuthInstance = {
  async query(resource, params) {
    return instance.get(resource, params);
  },

  async download(resource, data, params, type) {
    return instance.post(resource, data, { params, responseType: type });
  },

  async fetch(resource, slug = "", params) {
    return instance.get(`${resource}/${slug}`, params);
  },

  async post(resource, params, config) {
    return instance.post(`${resource}`, params, config);
  },

  async create(resource, slug = "", params, config) {
    return instance.post(`${resource}/${slug}`, params, config);
  },

  async update(resource, slug, params) {
    return instance.put(`${resource}/${slug}`, params);
  },

  async put(resource, params) {
    return instance.put(`${resource}`, params);
  },

  async delete(resource, config) {
    return instance.delete(resource, config);
  },

  async deleteSlug(resource, slug, config) {
    return instance.delete(`${resource}/${slug}`, config);
  },
};

export default AuthInstance;
