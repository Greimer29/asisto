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
          :attendance-list="attendanceList"
          @reload-table="getTodayAttendanceList(moment().format())"
        />
      </div>
    </div>
    <div class="column-in q-px-md" v-if="addPerson">
      <CreateAttendance
        @change-component="addPerson = !addPerson"
        :attendance-list="attendanceList"
        @reload-table="getTodayAttendanceList(moment().format())"
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
      state: true,
    });

    const createAttendanceList = async () => {
      await api.post("attendancelist", {
        attendanceList: newAttendanceList.value,
      });

      getTodayAttendanceList(moment().format());
    };

    const getTodayAttendanceList = async (date) => {
      const { data } = await api.get(`attendancelist/${date}/date`);
      attendanceList.value = data;
      console.log(attendanceList.value);
    };

    getTodayAttendanceList(moment().format());

    return {
      moment,
      attendanceList,
      addPerson: ref(false),
      createAttendanceList,
      getTodayAttendanceList,
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
