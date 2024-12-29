<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Listas de Asistencias</div>
    <q-separator inset />
    <div class="q-pa-md column-in" v-if="!openMonth">
      <AttendanceTable
        :monthList="realizedMonths"
        @changeComponent="selectMonth"
      />
    </div>
    <div class="q-pa-md column-in" v-if="openMonth">
      <AttendancesList :monthData="rowData" @changeComponent="selectMonth" />
    </div>
  </q-card>
</template>
<script setup>
import { api } from "src/boot/axios";
import AttendancesList from "src/components/admin/attendances/AttendancesList.vue";
import AttendanceTable from "src/components/admin/attendances/AttendancesTable.vue";
import { onMounted, ref } from "vue";

const realizedMonths = ref([]);
const openMonth = ref(false);
const rowData = ref(null);

const getMonthName = (monthIndex) => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviember",
    "Diciembre",
  ];
  return monthNames[monthIndex];
};

const months = Array.from({ length: 12 }, (_, index) => ({
  label: getMonthName(index),
  field: `${new Date().getFullYear()}/${index + 1}`,
}));

const chargeAttendaceListMonths = (monthList, attendaceList) => {
  const normalizeDate = (date) => {
    const [year, month] = date.split("/");
    return `${year}/${month.padStart(2, "0")}`;
  };

  const normalizedArray1 = attendaceList.map((item) => ({
    ...item,
    normalizeDate: normalizeDate(item.date),
  }));

  const normalizedArray2 = monthList.map((item) => ({
    ...item,
    normalizeDate: normalizeDate(item.field),
  }));

  return normalizedArray2.reduce((acc, month) => {
    const matchingItems = normalizedArray1.filter(
      (item) => item.normalizeDate === month.normalizeDate
    );

    return [
      ...acc,
      {
        ...month,
        attendanceList: [...(month.attendanceList || []), ...matchingItems],
      },
    ];
  }, []);
};

const getAttendancesList = async () => {
  const { data } = await api.get("attendancelist");
  console.log(data);
  realizedMonths.value = chargeAttendaceListMonths(months, data);
};

const selectMonth = (data) => {
  openMonth.value = !openMonth.value;
  if (data) {
    rowData.value = data.rowData;
  }
};

onMounted(async () => {
  getAttendancesList();
});
</script>
