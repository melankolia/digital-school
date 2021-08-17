const TheContainer = () => import("@/container");
const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const Kelas = () => import("@/views/Kelas");
const Siswa = () => import("@/views/Siswa");
const KelasSiswaDetail = () => import("@/views/Kelas/Siswa/Detail");
const KelasPerSiswa = () => import("@/views/Kelas/Siswa");
const TabelKompetensiSiswa = () =>
  import("@/views/Kelas/Siswa/TabelKompetensi");
const Guru = () => import("@/views/Guru");
const GuruDetail = () => import("@/views/Guru/Detail");

import { HOME, ABOUT, LOGIN, SISWA, GURU } from "./name.types";

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
                path: "detail/:secureId",
                name: SISWA.KELAS.SISWA.DETAIL,
                component: KelasSiswaDetail,
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
                path: ":secureId",
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
            path: ":secureId",
            name: GURU.DETAIL,
            component: GuruDetail,
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
