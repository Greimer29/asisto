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
        <q-item
          v-for="(menu, index) in controlMenu"
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

const controlMenu = [
  {
    title: "Metricas",
    caption: "quasar.dev",
    icon: "school",
    link: "/admin/metrics",
  },
  {
    title: "Año escolar",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "/admin/school-years",
  },
  {
    title: "Lista de asistencias",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "/admin/attendance-list",
  },
  {
    title: "Horarios",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "/admin/schedules",
  },
];

export default defineComponent({
  name: "ControlPage",
  setup() {
    const router = useRouter();
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
