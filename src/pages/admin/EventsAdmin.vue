<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Eventos</div>
    <q-separator inset />
    <div class="q-pa-md column-in" v-if="!isAddEvent">
      <EventsTable @changeComponent="changeComponent()" />
    </div>
    <div class="q-pa-md column-in" v-if="isAddEvent">
      <CreateEvent @changeComponent="changeComponent()" />
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import EventsTable from "src/components/admin/events/EventsTable.vue";
import CreateEvent from "src/components/admin/events/CreateEvent.vue";

const isAddEvent = ref(false);

const changeComponent = () => {
  isAddEvent.value = !isAddEvent.value;
};
</script>
