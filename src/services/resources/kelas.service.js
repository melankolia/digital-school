import MainInstance from "@/services/main.instance";
import { KELAS, SISWA } from "@/services/constants.js";

const KelasService = {
  getAllKelas(params, token) {
    return MainInstance.query(KELAS.ALL, { params, ...token });
  },
  getAllPerKelas(params, token) {
    return MainInstance.query(SISWA.PER_KELAS, { params, ...token });
  },
  lovKelas() {
    return MainInstance.query(KELAS.LOV);
  },
  lovKelasKompetensi(id) {
    return MainInstance.fetch(KELAS.LOV_KOMPETENSI, id);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default KelasService;
