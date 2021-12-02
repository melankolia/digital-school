import MainInstance from "@/services/main.instance";
import { GURU, ITEM } from "@/services/constants";

const GuruService = {
  getList(params, token) {
    return MainInstance.query(GURU.ALL, { params, ...token });
  },
  getDetail(id) {
    return MainInstance.fetch(GURU.DETAIL, id);
  },
  addGuru(data) {
    return MainInstance.post(GURU.CREATE, data);
  },
  deleteGuru(data) {
    return MainInstance.edit(ITEM.DELETE, data);
  },
  createJabatan(data) {
    return MainInstance.post(GURU.JABATAN.CREATE, data);
  },
  getListJabatan(params) {
    return MainInstance.query(GURU.JABATAN.ALL, { params });
  },
  deleteJabatan(id) {
    return MainInstance.edit(`${GURU.JABATAN.ALL}/${id}`);
  },
  getOneJabatan(id) {
    return MainInstance.fetch(GURU.JABATAN.ONE, id);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default GuruService;
