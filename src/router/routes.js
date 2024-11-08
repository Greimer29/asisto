const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/birthday-cart",
        component: () => import("pages/BirthdayPage.vue"),
      },
      {
        path: "/account",
        component: () => import("pages/AccountPage.vue"),
      },
      {
        path: "/control",
        component: () => import("pages/control/ControlPage.vue"),
        children: [
          {
            path: "/control/personal",
            component: () => import("pages/control/PersonalPage.vue"),
          },
          {
            path: "/control/asistances",
            component: () => import("pages/control/AsistancelistPage.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
