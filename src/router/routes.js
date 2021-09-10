const TheContainer = () => import("@/container");
const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const Kelas = () => import("@/views/Kelas");
const Siswa = () => import("@/views/Siswa");
const CreateSiswa = () => import("@/views/Kelas/Siswa/Create");
const KelasSiswaDetail = () => import("@/views/Kelas/Siswa/Detail");
const KelasPerSiswa = () => import("@/views/Kelas/Siswa");
const TabelKompetensiSiswa = () =>
  import("@/views/Kelas/Siswa/TabelKompetensi");
const UpdateKompetensiSiswa = () =>
  import("@/views/Kelas/Siswa/TabelKompetensi/Update");
const Guru = () => import("@/views/Guru");
const GuruDetail = () => import("@/views/Guru/Detail");
const TenagaAhli = () => import("@/views/TenagaAhli");
const TenagaAhliDetail = () => import("@/views/TenagaAhli/Detail");

import { HOME, ABOUT, LOGIN, SISWA, GURU, TENAGA_AHLI } from "./name.types";

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
