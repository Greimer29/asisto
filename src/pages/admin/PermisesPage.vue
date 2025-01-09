<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Listas de Asistencias</div>
    <q-separator inset />
    <div class="q-pa-md column-in" v-if="!schoolYearIsOpen"></div>
    <div class="q-pa-md column-in" v-if="schoolYearIsOpen"></div>
  </q-card>
</template>
<script setup>
import { api } from "src/boot/axios";
import AttendanceTable from "src/components/admin/attendances/AttendancesTable.vue";
import { onMounted, ref } from "vue";

const realizedMonths = ref([]);
const schoolyearData = ref(null);
const schoolYears = ref([]);
const schoolYearIsOpen = ref(false);
const pagination = ref({
  rowsPerPage: 0,
});

const getSchoolYear = async () => {
  const { data } = await api.get("/schoolyears");
  schoolYears.value = data;
};

const openSchoolYear = (data) => {
  schoolYearIsOpen.value = !schoolYearIsOpen.value;
  schoolyearData.value = data;
};

const changeComponent = () => {
  schoolYearIsOpen.value = !schoolYearIsOpen.value;
};

onMounted(async () => {
  getSchoolYear();
});
</script>
