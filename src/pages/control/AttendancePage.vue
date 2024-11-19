<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Lista de asistencias</div>
    <q-separator inset />

    <div class="column-in q-pa-md" v-if="!addPerson">
      <AttendanceTable @change-component="addPerson = !addPerson" />
    </div>
    <div class="column-in q-pa-md" v-if="addPerson">
      <CreateAttendance @change-component="addPerson = !addPerson" />
    </div>
  </q-card>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import CreateAttendance from "src/components/control/CreateAttendance.vue";
import AttendanceTable from "src/components/control/AttendanceTable.vue";

export default defineComponent({
  name: "AttendancePage",
  components: {
    CreateAttendance,
    AttendanceTable,
  },
  setup() {
    return {
      addPerson: ref(false),
    };
  },
});
</script>

<style scoped>
.column-in {
  animation-name: fadeInRight;
  animation-duration: 0.5s;
  animation-fill-mode: both;
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-15%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
