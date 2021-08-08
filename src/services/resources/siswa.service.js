import MainInstance from "@/services/main.instance";
import { SISWA } from "@/services/constants.js";

const SiswaService = {
  getAllSiswa(params, token) {
    return MainInstance.query(SISWA.ALL, { params, ...token });
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default SiswaService;
