import MainInstance from "@/services/main.instance";
import { GURU } from "@/services/constants";

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
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default GuruService;
