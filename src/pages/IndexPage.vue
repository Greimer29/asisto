<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Mis asistencias</div>
    <q-separator inset />
    <div class="q-pa-md">
      <q-table
        style="height: 400px"
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
          </q-input> </template
      ></q-table>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

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
    name: "schoolYear",
    align: "center",
    label: "A;o escolar",
    field: "school_year",
    sortable: true,
  },
];
const rows = [];

export default defineComponent({
  name: "IndexPage",
  setup() {
    const filter = ref("");
    return {
      columns,
      rows,
      filter,

      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
});
</script>
