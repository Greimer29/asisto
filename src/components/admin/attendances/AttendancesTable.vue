<template>
  <q-table
    flat
    bordered
    grid
    hide-bottom
    hide-header
    :rows="monthList"
    :columns="columns"
    row-key="name"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card @click="selectMonth(props.row)">
          <q-card-section>
            <div class="text-h6 text-bold text-center">
              {{ props.row.label }}
            </div>
            <div class="text-grey">{{ props.row.field }}</div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from "vue";

const emits = defineEmits(["changeComponent", "closeModal", "reloadTable"]);
const props = defineProps({
  monthList: Array,
});

const pagination = ref({
  rowsPerPage: 0,
});
const columns = [{ name: "mont", field: (row) => row.label }];

const selectMonth = (data) => {
  emits("changeComponent", { rowData: data });
};
</script>
