import MainInstance from "@/services/main.instance";
import { SISWA } from "@/services/constants.js";

const SiswaService = {
  getAllSiswa(params, token) {
    return MainInstance.query(SISWA.ALL, { params, ...token });
  },
  getTentangDiri(id) {
    return MainInstance.fetch(SISWA.DETAIL.TENTANG_DIRI, id);
  },
  getTempatTinggal(id) {
    return MainInstance.fetch(SISWA.DETAIL.TEMPAT_TINGGAL, id);
  },
  getPendidikan(id) {
    return MainInstance.fetch(SISWA.DETAIL.PENDIDIKAN, id);
  },
  getKesehatan(id) {
    return MainInstance.fetch(SISWA.DETAIL.KESEHATAN, id);
  },
  getHobi(id) {
    return MainInstance.fetch(SISWA.DETAIL.HOBI, id);
  },
  getOrangTua(id) {
    return MainInstance.fetch(SISWA.DETAIL.ORANG_TUA, id);
  },
  getPindahan(id) {
    return MainInstance.fetch(SISWA.DETAIL.PINDAHAN, id);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default SiswaService;
