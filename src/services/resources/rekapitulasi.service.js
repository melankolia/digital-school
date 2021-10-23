import MainInstance from "@/services/main.instance";
import { KELAS } from "@/services/constants";

const Rekapitulasi = {
  getPerkelas(params) {
    return MainInstance.query(KELAS.REKAPITULASI.PER_KELAS, { params });
  },
};

export default Rekapitulasi;
