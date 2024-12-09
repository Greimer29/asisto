<template>
  <q-card class="q-ma-sm text-center" v-if="false">
    <div class="q-pt-md text-h5 text-bold">Metricas</div>
    <q-separator inset />
    <div class="q-pa-md">
      <MetricsOne />
    </div>
  </q-card>
  <div class="q-pa-md"></div>
</template>
<script>
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
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
  },
];

export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
