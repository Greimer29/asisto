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

const changeComponent = () => {
  isOpenedMonth.value = false;
};

const selectMonth = (data) => {
  isOpenedMonth.value = true;
  if (data) {
    rowData.value = data;
  }
};

onMounted(() => {
  const { attendanceLists } = props.schoolYearData;
  realizedMonths.value = chargeAttendaceListMonths(months, attendanceLists);
});
</script>
