import MainInstance from "@/services/main.instance";
import { KELAS, SISWA, ITEM } from "@/services/constants.js";

const KelasService = {
  getAllKelas(params, token) {
    return MainInstance.query(KELAS.ALL, { params, ...token });
  },
  getAllPerKelas(params, token) {
    return MainInstance.query(SISWA.PER_KELAS, { params, ...token });
  },
  getOneKelas(id) {
    return MainInstance.fetch(KELAS.ONE, id);
  },
  lovKelas() {
    return MainInstance.query(KELAS.LOV);
  },
  lovKelasKompetensi(id) {
    return MainInstance.fetch(KELAS.LOV_KOMPETENSI, id);
  },
  createKelas(data) {
    return MainInstance.post(KELAS.CREATE, data);
  },
  deleteSiswa(data) {
    return MainInstance.edit(ITEM.DELETE, data);
  },
  deleteKelas(data) {
    return MainInstance.edit(ITEM.DELETE, data);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default KelasService;
