<template>
  <q-tabs
    class="q-mt-sm"
    v-model="tabs"
    indicator-color="amber-7"
    active-color="amber-7"
    color="gray"
    align="justify"
    narrow-indicator
  >
    <q-tab name="events" label="Eventos" />
    <q-tab name="birthday" label="Cumpleaños" />
  </q-tabs>
  <q-tab-panels v-model="tabs" animated>
    <q-tab-panel name="events" style="height: 85vh">
      <div v-if="events.length <= 0">
        <div class="text-center text-h6 text-weight-bold text-italic texts">
          No se encontraron eventos
        </div>
      </div>
      <div
        class="text-center text-h6 text-weight-bold text-italic texts"
        v-if="events.length > 0"
      >
        Acompañanos a vivir estos momentos <br />
        planificados para ti
      </div>
      <q-separator />
      <q-table
        :rows="events"
        grid
        :rows-per-page-options="[0]"
        hide-bottom
        v-if="events.length > 0"
      >
        <template v-slot:item="props">
          <q-card class="events-item q-ma-sm" bordered>
            <q-card-section class="text-center q-pa-none">
              <q-img
                src="../../public/images/login/maranatha_play.jpeg"
                style="height: 200px; max-width: 100%"
              >
                <div class="absolute-bottom text-left">
                  <div class="text-bold text-subtitle1">
                    {{ props.row.location }}
                  </div>
                </div>
              </q-img>
            </q-card-section>

            <q-card-section class="q-pb-none">
              <div class="flex">
                <div class="q-mr-md">
                  <q-avatar size="40px"> <q-icon name="event" /> </q-avatar>
                  {{ props.row.date }}
                </div>
                <q-space></q-space>
                <div class="flex">
                  <div class="flex flex-center q-mr-sm">
                    {{ props.row.timeIn }}
                  </div>
                  <q-space />
                  <div class="flex flex-center q-mr-sm">a</div>
                  <q-space />
                  <div class="flex flex-center">
                    {{ props.row.timeOut }}
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-weight-bold text-h5 text-grey-9">
                {{ props.row.title }}
              </div>
              <div class="text-justify">
                <div class="text-subtitle1 text-grey-7 q-py-xs">
                  {{ props.row.description }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </template>
      </q-table>
    </q-tab-panel>
    <q-tab-panel name="birthday"> <BirthdayPage /></q-tab-panel>
    <q-tab-panel name="efemerides"> <EfemeridesPage /> </q-tab-panel>
  </q-tab-panels>
</template>

<!--  -->

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import BirthdayPage from "./BirthdayPage.vue";
import EfemeridesPage from "./EfemeridesPage.vue";
import { api } from "src/boot/axios";

const tabs = ref("events");
const events = ref([]);

const getEvents = async () => {
  const { data } = await api.get("events");
  if (data) {
    events.value = data;
  }
};

onMounted(() => {
  getEvents();
});
</script>

<style scoped>
.events-item {
  max-width: 400px;
  min-width: 350px;
  height: 400px;
  max-height: 400px;
}
@media (max-width: 980px) {
  .events-item {
    width: 100%;
    height: 400px;
  }
}
</style>
