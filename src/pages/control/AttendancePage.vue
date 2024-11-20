<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Lista de asistencias</div>
    <q-separator inset />

    <div class="column-in q-pa-md" v-if="!addPerson">
      <div class="q-pt-md text-subtitle1 text-bold" v-if="!attendanceList">
        No tienes listas de asistencias para hoy
        <q-separator inset />
        <div class="text-subtitle1">Creemos una</div>
        <q-btn
          class="q-mt-md"
          rounded
          label="crear lista de asistencia"
          color="positive"
          @click="createAttendanceList"
        />
      </div>
      <div v-if="attendanceList">
        <AttendanceTable
          v-if="!addPerson"
          @change-component="addPerson = !addPerson"
          :attendanceList="attendanceList"
        />
      </div>
    </div>
    <div class="column-in q-px-md" v-if="addPerson">
      <CreateAttendance
        @change-component="addPerson = !addPerson"
        :attendanceList="attendanceList"
      />
    </div>
  </q-card>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import CreateAttendance from "src/components/control/CreateAttendance.vue";
import AttendanceTable from "src/components/control/AttendanceTable.vue";
import { api } from "src/boot/axios";
import moment from "moment";

export default defineComponent({
  name: "AttendancePage",
  components: {
    CreateAttendance,
    AttendanceTable,
  },
  setup() {
    const attendanceList = ref(null);
    const newAttendanceList = ref({
      date: moment().format("YYYY/MM/DD"),
      day: moment().format("dddd"),
    });

    const createAttendanceList = async () => {
      const { data } = await api.post("attendances-list", {
        attendanceList: newAttendanceList.value,
      });
      attendanceList.value = data;

      getTodayAttendanceList();
    };

    const getTodayAttendanceList = async () => {
      const { data } = await api.get(
        `attendances-list/${moment().format("YYYY-MM-DD")}/today`
      );
      attendanceList.value = data;
    };

    getTodayAttendanceList();
    setInterval(() => {
      getTodayAttendanceList();
    }, 1000);

    return {
      attendanceList,
      addPerson: ref(false),
      createAttendanceList,
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
