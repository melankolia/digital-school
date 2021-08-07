import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

instance.interceptors.request.use(function (config) {
  const token = store.state.auth.auth.token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const MainInstance = {
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

  cancelRequest() {
    return instance.CancelToken;
  },
};

export default MainInstance;
