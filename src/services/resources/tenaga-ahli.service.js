import MainInstance from "@/services/main.instance";
import { TENAGA_AHLI, ITEM } from "@/services/constants";

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
  deleteTenagaAhli(data) {
    return MainInstance.edit(ITEM.DELETE, data);
  },
  createJabatan(data) {
    return MainInstance.post(TENAGA_AHLI.JABATAN.CREATE, data);
  },
  getListJabatan(params) {
    return MainInstance.query(TENAGA_AHLI.JABATAN.ALL, { params });
  },
  deleteJabatan(id) {
    return MainInstance.edit(`${TENAGA_AHLI.JABATAN.ALL}/${id}`);
  },
  getOneJabatan(id) {
    return MainInstance.fetch(TENAGA_AHLI.JABATAN.ONE, id);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default TenagaAhliService;
