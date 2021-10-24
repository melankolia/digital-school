const TheContainer = () => import("@/container");
const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const Kelas = () => import("@/views/Kelas");
const CreateKelas = () => import("@/views/Kelas/Create");
const Siswa = () => import("@/views/Siswa");
const RekapitulasiSiswa = () => import("@/views/Siswa/Rekapitulasi");
const PrestasiSiswa = () => import("@/views/Kelas/Siswa/Prestasi");
const CreatePrestasiSiswa = () => import("@/views/Kelas/Siswa/Prestasi/create");
const CreateSiswa = () => import("@/views/Kelas/Siswa/Create");
const KelasSiswaDetail = () => import("@/views/Kelas/Siswa/Detail");
const KelasPerSiswa = () => import("@/views/Kelas/Siswa");
const TabelKompetensiSiswa = () =>
  import("@/views/Kelas/Siswa/TabelKompetensi");
const UpdateKompetensiSiswa = () =>
  import("@/views/Kelas/Siswa/TabelKompetensi/Update");
const Guru = () => import("@/views/Guru");
const GuruDetail = () => import("@/views/Guru/Detail");
const UpdateGuru = () => import("@/views/Guru/Create");
const JabatanGuru = () => import("@/views/Guru/RiwayatJabatan");
const CreateJabatanGuru = () => import("@/views/Guru/RiwayatJabatan/create");
const TenagaAhli = () => import("@/views/TenagaAhli");
const TenagaAhliDetail = () => import("@/views/TenagaAhli/Detail");
const UpdateTenagaAhli = () => import("@/views/TenagaAhli/Create");
const JabatanTenagaAhli = () => import("@/views/TenagaAhli/RiwayatJabatan");
const CreateJabatanTenagaAhli = () =>
  import("@/views/TenagaAhli/RiwayatJabatan/create");

import {
  HOME,
  ABOUT,
  LOGIN,
  SISWA,
  GURU,
  TENAGA_AHLI,
  ALUMNI,
} from "./name.types";

export const configRoutes = [
  {
    path: "/",
    component: TheContainer,
    meta: {
      title: "Home",
    },
    children: [
      {
        path: "/",
        name: HOME,
        component: Home,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/kelas",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
            path: "/",
            name: SISWA.KELAS.BROWSE,
            component: Kelas,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "create",
            name: SISWA.KELAS.CREATE,
            component: CreateKelas,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "update/:kelasId",
            name: SISWA.KELAS.UPDATE,
            component: CreateKelas,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "siswa",
            component: {
              render(c) {
                return c("router-view");
              },
            },
            children: [
              {
                path: "create/:kelasId",
                name: SISWA.KELAS.SISWA.CREATE,
                component: CreateSiswa,
                meta: {
                  requiresAuth: true,
                },
              },
              {
                path: "detail/:secureId",
                name: SISWA.KELAS.SISWA.DETAIL,
                component: KelasSiswaDetail,
                meta: {
                  requiresAuth: true,
                },
              },
              {
                path: "update-kompetensi/:siswaId/:kelasId",
                name: SISWA.KELAS.SISWA.UPDATE_KOMPETENSI,
                component: UpdateKompetensiSiswa,
                meta: {
                  requiresAuth: true,
                },
              },
              {
                path: "update/:secureId/:kelasId",
                name: SISWA.KELAS.SISWA.UPDATE,
                component: CreateSiswa,
                meta: {
                  requiresAuth: true,
                },
              },
              {
                path: "prestasi/create/:siswaId",
                name: SISWA.KELAS.SISWA.CREATE_PRESTASI,
                component: CreatePrestasiSiswa,
                meta: {
                  requiresAuth: true,
                },
              },
              {
                path: "prestasi/:siswaId",
                name: SISWA.KELAS.SISWA.PRESTASI,
                component: PrestasiSiswa,
                meta: {
                  requiresAuth: true,
                },
              },
              {
                path: ":siswaId/:kelasId",
                name: SISWA.KELAS.SISWA.TABEL_KOMPETENSI,
                component: TabelKompetensiSiswa,
                meta: {
                  requiresAuth: true,
                },
              },
              {
                path: ":kelasId",
                name: SISWA.KELAS.PER_KELAS,
                component: KelasPerSiswa,
                meta: {
                  requiresAuth: true,
                },
              },
            ],
          },
        ],
      },
      {
        path: "/siswa",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
            path: "/",
            name: SISWA.ALL.BROWSE,
            component: Siswa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "/rekapitulasi",
            name: SISWA.REKAPITULASI.BROWSE,
            component: RekapitulasiSiswa,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "/guru",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
            path: "/",
            name: GURU.BROWSE,
            component: Guru,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "update/:guruId",
            name: GURU.UPDATE,
            component: UpdateGuru,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "create",
            name: GURU.CREATE,
            component: UpdateGuru,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "jabatan/:guruId",
            name: GURU.JABATAN.DETAIL,
            component: JabatanGuru,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "jabatan/create/:guruId",
            name: GURU.JABATAN.CREATE,
            component: CreateJabatanGuru,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":guruId",
            name: GURU.DETAIL,
            component: GuruDetail,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "/tenaga-ahli",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
            path: "/",
            name: TENAGA_AHLI.BROWSE,
            component: TenagaAhli,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "update/:tenagaAhliId",
            name: TENAGA_AHLI.UPDATE,
            component: UpdateTenagaAhli,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "create",
            name: TENAGA_AHLI.CREATE,
            component: UpdateTenagaAhli,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "jabatan/create/:tenagaAhliId",
            name: TENAGA_AHLI.JABATAN.CREATE,
            component: CreateJabatanTenagaAhli,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "jabatan/:tenagaAhliId",
            name: TENAGA_AHLI.JABATAN.DETAIL,
            component: JabatanTenagaAhli,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":tenagaAhliId",
            name: TENAGA_AHLI.DETAIL,
            component: TenagaAhliDetail,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "/alumni",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        children: [
          {
            path: "/",
            name: ALUMNI.ALL.BROWSE,
            component: Siswa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "create/:kelasId",
            name: ALUMNI.CREATE,
            component: CreateSiswa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "detail/:secureId",
            name: ALUMNI.DETAIL,
            component: KelasSiswaDetail,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "update-kompetensi/:siswaId/:kelasId",
            name: ALUMNI.UPDATE_KOMPETENSI,
            component: UpdateKompetensiSiswa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "update/:secureId/:kelasId",
            name: ALUMNI.UPDATE,
            component: CreateSiswa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "prestasi/create/:siswaId",
            name: ALUMNI.CREATE_PRESTASI,
            component: CreatePrestasiSiswa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "prestasi/:siswaId",
            name: ALUMNI.PRESTASI,
            component: PrestasiSiswa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: ":siswaId/:kelasId",
            name: ALUMNI.TABEL_KOMPETENSI,
            component: TabelKompetensiSiswa,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
      {
        path: "/about",
        name: ABOUT,
        component: About,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: LOGIN,
    component: Login,
  },
];
