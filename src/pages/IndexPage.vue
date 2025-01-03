<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Mis asistencias</div>
    <q-separator inset />
    <div class="q-pa-md">
      <q-table
        style="max-height: 400px"
        flat
        bordered
        title="Treats"
        :filter="filter"
        :rows="rows"
        :columns="columns"
        row-key="index"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-card>
</template>

<script setup>
import { api } from "src/boot/axios";
import { defineComponent, onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "day",
    required: true,
    label: "Dia",
    align: "left",
    field: "day",
    sortable: true,
  },
  {
    name: "timeIn",
    align: "center",
    label: "Hora de entrada",
    field: "timeIn",
    sortable: true,
  },
  {
    name: "timeOut",
    align: "center",
    label: "Hora de salida",
    field: "timeOut",
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Fecha",
    field: "date",
    sortable: true,
  },
];
const pagination = ref({
  rowsPerPage: 0,
});
const rows = ref([]);
const filter = ref("");
const $q = useQuasar();
const MyUserData = $q.sessionStorage.getItem("DataUser");

const getMyAttendances = async () => {
  const { data } = await api.get(`attendances/${MyUserData.id}`);
  data.forEach((element) => {
    element.day = element.attendanceList.day;
    element.date = element.attendanceList.date;
  });
  rows.value = data;
};

onMounted(() => {
  getMyAttendances();
});
</script>
