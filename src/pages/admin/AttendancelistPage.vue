<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Listas de Asistencias</div>
    <q-separator inset />
    <div class="q-pa-md" v-if="false">
      <q-expansion-item
        v-for="(list, i) in attendancesList"
        :key="i"
        expand-separator
        icon="checklist"
        :label="list.day + ' ' + list.date"
      >
        <q-item
          v-for="(attendance, j) in list.attendances"
          :key="j"
          expand-separator
          icon="receipt"
          label="Receipts"
        >
          <q-item-section style="width: 50px">
            <q-avatar>
              <q-img src="https://cdn.quasar.dev/img/avatar6.jpg"
            /></q-avatar>
          </q-item-section>
          <q-item-section>
            {{ attendance.user.name + " " + attendance.user.lastName }}
          </q-item-section>
          <q-item-section> {{ attendance.timeIn }}</q-item-section>
          <q-item-section>
            {{ attendance.timeOut }}
          </q-item-section>
          <q-separator inset color="black" />
        </q-item>
      </q-expansion-item>
    </div>
    <q-table
      flat
      bordered
      grid
      hide-bottom
      hide-header
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
    >
    </q-table>
  </q-card>
</template>
<script setup>
import { api } from "src/boot/axios";
import AttendancesComponent from "src/components/admin/attendances/AttendancesComponent.vue";
import { ref } from "vue";

const pagination = ref({
  rowsPerPage: 0,
});

/*<template v-slot:item>
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <AttendancesComponent />
        </div>
      </template>*/

const columns = [{ name: "mont", label: "Mes", field: (row) => row.label }];
const rows = [
  { name: "january", label: "Enero", field: "january" },
  { name: "february", label: "Febrero", field: "february" },
  { name: "march", label: "Marzo", field: "march" },
  { name: "april", label: "Abril", field: "april" },
  { name: "may", label: "Mayo", field: "may" },
  { name: "june", label: "Junio", field: "june" },
  { name: "july", label: "Julio", field: "july" },
  { name: "august", label: "Agosto", field: "august" },
  { name: "september", label: "Septiembre", field: "september" },
  { name: "october", label: "Octubre", field: "october" },
  { name: "november", label: "Noviembre", field: "november" },
  { name: "december", label: "Diciembre", field: "december" },
];

const attendancesList = ref([]);

const groupAttendanceListMonthly = (data) => {
  const attListMonthy = [];
  data.forEach((attlist) => {
    const date = attlist.date.split("/");
    const month = date[1];
    if (!attListMonthy[`${date[0]}/${month}`]) {
      attListMonthy[`${date[0]}/${month}`] = [];
    }
    attListMonthy[`${date[0]}/${month}`].push(attlist);
  });
  return attListMonthy;
};

const getAttendancesList = async () => {
  const { data } = await api.get("attendancelist");
  const aja = groupAttendanceListMonthly(data);
  console.log(aja);
  //attendancesList.value = data;
};
getAttendancesList();
</script>
