const TheContainer = () => import("@/container");
const Home = () => import("@/views/Home");
const About = () => import("@/views/About");
const Login = () => import("@/views/Login");
const Kelas = () => import("@/views/Kelas");
const KelasPerSiswa = () => import("@/views/Kelas/Siswa");

import { HOME, ABOUT, LOGIN, SISWA } from "./name.types";

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
            path: "siswa/:secureId",
            name: SISWA.KELAS.PER_KELAS,
            component: KelasPerSiswa,
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
