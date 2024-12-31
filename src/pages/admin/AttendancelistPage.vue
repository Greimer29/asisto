<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Listas de Asistencias</div>
    <q-separator inset />
    <div class="q-pa-md column-in" v-if="!schoolYearIsOpen">
      <q-table
        flat
        bordered
        grid
        hide-bottom
        hide-header
        :rows="schoolYears"
        row-key="name"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-8 col-md-4">
            <q-card @click="openSchoolYear(props.row)">
              <q-card-section>
                <div class="text-h6 text-bold text-center">
                  Promo: {{ props.row.promo }}
                </div>
                <div class="text-grey">
                  {{ props.row.dateStart }} - {{ props.row.dateEnd }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md column-in" v-if="schoolYearIsOpen">
      <AttendanceTable
        :schoolYearData="schoolyearData"
        @changeComponent="changeComponent"
      />
    </div>
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
