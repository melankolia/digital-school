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
  getKompetensi(params) {
    return MainInstance.query(SISWA.DETAIL.KOMPETENSI, { params });
  },
  addAbout(data) {
    return MainInstance.post(SISWA.CREATE.TENTANG_DIRI, data);
  },
  addTempatTinggal(data) {
    return MainInstance.post(SISWA.CREATE.TEMPAT_TINGGAL, data);
  },
  addPendidikan(data) {
    return MainInstance.post(SISWA.CREATE.PENDIDIKAN, data);
  },
  addKesehatan(data) {
    return MainInstance.post(SISWA.CREATE.KESEHATAN, data);
  },
  addHobi(data) {
    return MainInstance.post(SISWA.CREATE.HOBI, data);
  },
  addOrangTua(data) {
    return MainInstance.post(SISWA.CREATE.ORANG_TUA, data);
  },
  addPindahan(data) {
    return MainInstance.post(SISWA.CREATE.PINDAHAN, data);
  },
  addKompetensi(data) {
    return MainInstance.post(SISWA.CREATE.KOMPETENSI, data);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default SiswaService;
