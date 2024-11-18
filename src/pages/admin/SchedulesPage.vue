<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Horarios</div>
    <q-separator inset />
    <div class="q-pa-md column-in" v-if="!addSchedule">
      <ScheduleTable @changeComponent="addSchedule = !addSchedule" />
    </div>
    <div class="q-pa-md column-in" v-if="addSchedule">
      <CreateSchedule @changeComponent="addSchedule = !addSchedule" />
    </div>
  </q-card>
</template>
<script setup>
import { ref } from "vue";
import CreateSchedule from "src/components/admin/schdules/CreateSchedule.vue";
import ScheduleTable from "src/components/admin/schdules/ScheduleTable.vue";
const addSchedule = ref(false);
</script>
