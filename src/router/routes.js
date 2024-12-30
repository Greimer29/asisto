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
            component: () => import("pages/control/AttendancePage.vue"),
          },
        ],
      },
      {
        path: "/admin",
        component: () => import("pages/admin/AdminPage.vue"),
        children: [
          {
            path: "/admin/school-years",
            component: () => import("pages/admin/SchoolyearPage.vue"),
          },
          {
            path: "/admin/attendance-list",
            component: () => import("pages/admin/AttendancelistPage.vue"),
          },
          {
            path: "/admin/schedules",
            component: () => import("pages/admin/SchedulesPage.vue"),
          },
          {
            path: "/admin/:month",
            component: () => import("pages/admin/SchedulesPage.vue"),
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
