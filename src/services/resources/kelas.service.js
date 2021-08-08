import MainInstance from "@/services/main.instance";
import { KELAS, SISWA } from "@/services/constants.js";

const KelasService = {
  getAllKelas(params, token) {
    return MainInstance.query(KELAS.ALL, { params, ...token });
  },
  getAllPerSiswa(params, token) {
    return MainInstance.query(SISWA.PER_KELAS, { params, ...token });
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default KelasService;
