<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Lista de asistencias</div>
    <q-separator inset />

    <div class="column-in q-pa-md" v-if="!addPerson">
      <q-table
        style="height: 78vh"
        flat
        bordered
        :title="today"
        :rows="rows"
        :columns="columns"
        virtual-scroll
        color="primary"
        row-key="name"
        hide-bottom
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-right>
          <q-btn
            color="positive"
            round
            icon="add"
            @click="addPerson = !addPerson"
          />
        </template>
      </q-table>
    </div>
    <div class="column-in q-pa-md" v-if="addPerson">
      <q-table
        style="height: 78vh"
        flat
        bordered
        virtual-scroll
        title="Add a person to the list"
        :rows="rows"
        :columns="columns"
        color="primary"
        row-key="name"
        hide-bottom
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-right>
          <q-btn
            color="grey"
            round
            icon="close"
            @click="addPerson = !addPerson"
          />
        </template>
      </q-table>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import moment from "moment";

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
];
export default defineComponent({
  name: "AsistancelistPage",
  setup() {
    const today = moment().format("dddd DD/MM/YYYY");

    return {
      columns,
      rows,
      today,
      addPerson: ref(false),
      pagination: ref({
        rowsPerPage: 0,
      }),
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
