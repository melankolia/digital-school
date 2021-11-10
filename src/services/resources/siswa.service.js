import MainInstance from "@/services/main.instance";
import { SISWA } from "@/services/constants.js";

const SiswaService = {
  getAllSiswa(params, token) {
    return MainInstance.query(SISWA.ALL, { params, ...token });
  },
  getTentangDiri(params) {
    return MainInstance.query(SISWA.DETAIL.TENTANG_DIRI, { params });
  },
  getTempatTinggal(params) {
    return MainInstance.query(SISWA.DETAIL.TEMPAT_TINGGAL, { params });
  },
  getPendidikan(params) {
    return MainInstance.query(SISWA.DETAIL.PENDIDIKAN, { params });
  },
  getKesehatan(params) {
    return MainInstance.query(SISWA.DETAIL.KESEHATAN, { params });
  },
  getHobi(params) {
    return MainInstance.query(SISWA.DETAIL.HOBI, { params });
  },
  getOrangTua(params) {
    return MainInstance.query(SISWA.DETAIL.ORANG_TUA, { params });
  },
  getPindahan(params) {
    return MainInstance.query(SISWA.DETAIL.PINDAHAN, { params });
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
  addStatusBantuan(data) {
    return MainInstance.post(SISWA.CREATE.STATUS_BANTUAN, data);
  },
  downloadFile(data, type = "arraybuffer") {
    return MainInstance.download(SISWA.EXPORT.RAPOR, data, null, type);
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default SiswaService;
