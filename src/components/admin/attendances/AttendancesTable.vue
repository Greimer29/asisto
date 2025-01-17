<template>
  <q-card>
    <q-card-section class="flex flex-center" v-if="!isOpenedMonth">
      <q-btn
        class="absolute-left"
        flat
        icon="chevron_left"
        @click="emits('changeComponent')"
      />
      <div class="text-h6 text-bold text-center">
        Promo: {{ schoolYearData.promo }}
      </div>
    </q-card-section>
    <q-card-section class="q-pa-md column-in" v-if="!isOpenedMonth">
      <q-table
        flat
        bordered
        grid
        hide-bottom
        hide-header
        :rows="realizedMonths"
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
    </q-card-section>
  </q-card>
  <div class="q-pa-md column-in" v-if="isOpenedMonth">
    <AttendancesList :monthData="rowData" @changeComponent="changeComponent" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AttendancesList from "src/components/admin/attendances/AttendancesList.vue";
import moment from "moment";

const emits = defineEmits(["changeComponent", "closeModal", "reloadTable"]);
const props = defineProps({
  monthList: Array,
  schoolYearData: Object,
});
const pagination = ref({
  rowsPerPage: 0,
});
const columns = [{ name: "mont", field: (row) => row.label }];
const rowData = ref(null);
const realizedMonths = ref([]);
const isOpenedMonth = ref(false);

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

const changeComponent = () => {
  isOpenedMonth.value = false;
};

const selectMonth = (data) => {
  isOpenedMonth.value = true;
  if (data) {
    rowData.value = data;
  }
};

//Prueba 1

function getMesesFaltantes(fechaInicio, fechaFin) {
  const start = moment(fechaInicio, "YYYY/MM/DD");
  const end = moment(fechaFin, "YYYY/MM/DD");
  const mesesFaltantes = [];

  while (start.isBefore(end)) {
    mesesFaltantes.push({
      field: start.format("YYYY/MM"),
      label: start.format("MMMM"),
    });
    start.add(1, "month");
  }

  return mesesFaltantes;
}

//fin de ptueba 1

onMounted(() => {
  const { dateStart, dateEnd } = props.schoolYearData;
  const mesesFaltantes = getMesesFaltantes(dateStart, dateEnd);
  const { attendanceLists } = props.schoolYearData;
  realizedMonths.value = chargeAttendaceListMonths(
    mesesFaltantes,
    attendanceLists
  );
});
</script>
