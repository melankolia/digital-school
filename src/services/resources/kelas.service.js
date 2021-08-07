import MainInstance from "@/services/main.instance";
import { KELAS } from "@/services/constants.js";

const KelasService = {
  getAllKelas(params, token) {
    return MainInstance.query(KELAS.ALL, { params, ...token });
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default KelasService;
