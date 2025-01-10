<template>
  <q-layout view="hHh Lpr lff" container style="height: 93vh" class="shadow-2">
    <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
      <q-toolbar>
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
        <q-toolbar-title class="flex flex-center">
          Panel Administrativo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      side="left"
      v-model="drawerLeft"
      show-if-above
      bordered
      :width="200"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-item clickable v-close-popup tag="a" @click="goTo('schoolyears')">
          <q-item-section avatar>
            <q-icon name="calendar_month" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Año escolar</q-item-label>
            <q-item-label caption>Promociones</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          tag="a"
          @click="goTo('attendance-list')"
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Asistencias</q-item-label>
            <q-item-label caption>Listas de asistencias</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup tag="a" @click="goTo('schedules')">
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Horarios</q-item-label>
            <q-item-label caption>Horarios del personal</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup tag="a" @click="goTo('pass')">
          <q-item-section avatar>
            <q-icon name="visibility" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Permisos</q-item-label>
            <q-item-label caption>Administrar permisos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup tag="a" @click="goTo('events')">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Eventos</q-item-label>
            <q-item-label caption>Administrar eventos</q-item-label>
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const controlMenu = [
  {
    title: "Año escolar",
    caption: "Promociones ",
    icon: "calendar_month",
    link: "/admin/school-years",
  },
  {
    title: "Asistencias",
    caption: "Listas de asistencias",
    icon: "list",
    link: "/admin/attendance-list",
  },
  {
    title: "Horarios",
    caption: "Horarios del personal",
    icon: "schedule",
    link: "/admin/schedules",
  },
];

export default defineComponent({
  name: "ControlPage",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const MyUserData = $q.sessionStorage.getItem("DataUser");

    switch (MyUserData.pass) {
      case 1 || 2:
        controlMenu.splice(4, 0, {
          title: "Permisos",
          caption: "Administrar permisos",
          icon: "visibility",
          link: "/admin/pass",
        });
        controlMenu.splice(4, 0, {
          title: "Eventos",
          caption: "Administrar eventos",
          icon: "event",
          link: "/admin/events",
        });
        break;

      default:
        break;
    }
    return {
      controlMenu,
      drawerLeft: ref(false),
      goTo(link) {
        router.push(link);
      },
    };
  },
});
</script>
