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
                  clickable
                  v-close-popup
                  tag="a"
                  @click="goTo('/account')"
                >
                  <q-item-section avatar>
                    <q-icon name="account_circle" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Mi cuenta</q-item-label>
                    <q-item-label caption>Perfil de usuario</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tag="a"
                  @click="goTo('/events')"
                >
                  <q-item-section avatar>
                    <q-icon name="event" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Eventos</q-item-label>
                    <q-item-label caption>Eventos para hoy</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tag="a"
                  @click="goTo('/admin/schoolyears')"
                >
                  <q-item-section avatar>
                    <q-icon name="admin_panel_settings" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Admin</q-item-label>
                    <q-item-label caption>Panel administrativo</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  tag="a"
                  @click="goTo('/control/personal')"
                >
                  <q-item-section avatar>
                    <q-icon name="fact_check" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Control</q-item-label>
                    <q-item-label caption>Control de acceso</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup tag="a" @click="goTo('/')">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Salir</q-item-label>
                    <q-item-label caption>Cerrar sesion</q-item-label>
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

export default defineComponent({
  name: "MainLayout",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const MyUserData = $q.sessionStorage.getItem("DataUser");

    return {
      MyUserData,
      goTo(link) {
        if (link === "/") {
          router.replace(link);
          $q.sessionStorage.clear();
        } else {
          router.push(link);
        }
      },
    };
  },
});
</script>
