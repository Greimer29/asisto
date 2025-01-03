<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title
          style="cursor: pointer"
          clickable
          @click="goTo('/main')"
        >
          Asisto GO
        </q-toolbar-title>

        <div>
          <q-item>
            <q-item-section avatar>
              <q-avatar size="48px">
                <img
                  src="https://cdn.quasar.dev/img/avatar6.jpg"
                  draggable="false"
                />
              </q-avatar>
            </q-item-section>
            <q-item-section style="cursor: pointer">
              <div class="text-subtitle1">
                {{ MyUserData.name }} {{ MyUserData.lastName }}
              </div>
              <div class="text-caption">
                {{ MyUserData.rol }}
              </div>
            </q-item-section>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  v-for="(menu, index) in menuList"
                  :key="index"
                  clickable
                  v-close-popup
                  tag="a"
                  @click="goTo(menu.link)"
                >
                  <q-item-section v-if="menu.icon" avatar>
                    <q-icon :name="menu.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ menu.title }}</q-item-label>
                    <q-item-label caption>{{ menu.caption }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-item>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useRouter } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const menuList = [
  {
    title: "Cartelera de cumplea;os",
    caption: "quasar.dev",
    icon: "cake",
    link: "/birthday-cart",
  },
  {
    title: "Mi cuenta",
    caption: "github.com/quasarframework",
    icon: "account_circle",
    link: "/account",
  },
  {
    title: "Cerrar sesion",
    caption: "chat.quasar.dev",
    icon: "logout",
    link: "/",
  },
];

export default defineComponent({
  name: "MainLayout",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const MyUserData = $q.sessionStorage.getItem("DataUser");

    onMounted(() => {
      switch (MyUserData.rol) {
        case "Administrador":
          menuList.splice(
            2,
            0,
            {
              title: "Admin",
              caption: "github.com/quasarframework",
              icon: "fact_check",
              link: "/admin/school-years",
            },
            {
              title: "Control",
              caption: "github.com/quasarframework",
              icon: "fact_check",
              link: "/control/personal",
            }
          );
          break;
        case "Portero":
          menuList.splice(2, 0, {
            title: "Control",
            caption: "github.com/quasarframework",
            icon: "fact_check",
            link: "/control/personal",
          });
          break;

        default:
          break;
      }
    });

    return {
      MyUserData,
      menuList,
      goTo(link) {
        if (link === "/") {
          router.replace(link);
          $q.sessionStorage.clear();
          switch (MyUserData.rol) {
            case "Administrador":
              menuList.splice(2, 2);
              break;
            case "Portero":
              menuList.splice(2, 1);
              break;

            default:
              break;
          }
        } else {
          router.push(link);
        }
      },
    };
  },
});
</script>
