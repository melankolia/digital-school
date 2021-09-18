import MainInstance from "@/services/main.instance";
import { TENAGA_AHLI } from "@/services/constants";

const TenagaAhliService = {
  getList(params, token) {
    return MainInstance.query(TENAGA_AHLI.ALL, { params, ...token });
  },
  getDetail(id) {
    return MainInstance.fetch(TENAGA_AHLI.DETAIL, id);
  },
  addTenagaAhli(data) {
    return MainInstance.post(TENAGA_AHLI.CREATE, data);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default TenagaAhliService;
