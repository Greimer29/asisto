<template>
  <q-table
    style="height: 77vh"
    flat
    bordered
    :title="`${attendanceList.day} ${attendanceList.date}`"
    :rows="attendanceList.attendances"
    :columns="columns"
    virtual-scroll
    color="primary"
    row-key="name"
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    no-data-label="No se ha registrado ninguna entrada para hoy"
  >
    <template v-slot:body-cell-avatar="props">
      <q-td :props="props">
        <div>
          <q-avatar>
            <q-img src="https://cdn.quasar.dev/img/avatar6.jpg" />
          </q-avatar>
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      {{ console.log(props.row) }}
      <q-td :props="props">
        <div>
          <q-btn
            v-if="props.row.state"
            label="Salida"
            no-caps
            color="cyan-5"
            dense
            @click="markExit(props.row)"
          />
        </div>
      </q-td>
    </template>
    <template v-slot:top-right>
      <q-btn
        flat
        color="primary"
        icon="system_update_alt"
        @click="askExport = !askExport"
      />
      <q-btn
        flat
        color="positive"
        icon="fact_check"
        @click="emits('changeComponent')"
      />
    </template>
  </q-table>
  <q-dialog v-model="askExport" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          ¿Desea finalizar esta lista de asistencias de hoy?
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Finalizar"
          color="primary"
          v-close-popup
          @click="endAttendanceList()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import moment from "moment";
import { ref, defineEmits, defineProps, onMounted } from "vue";
import { api } from "src/boot/axios";

const props = defineProps({
  attendanceList: Object,
});
const emits = defineEmits(["changeComponent", "reloadTable"]);
const pagination = ref({
  rowsPerPage: 0,
});

const columns = [
  {
    name: "avatar",
    label: "Image",
    field: "avatar",
    sortable: true,
    align: "left",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    name: "timeIn",
    label: "Hora de entrada",
    field: "timeIn",
    sortable: true,
    align: "left",
  },
  {
    name: "tiemOut",
    label: "Hora de salida",
    field: "timeOut",
    align: "left",
  },
  {
    name: "actions",
    label: "Acciones",
    align: "center",
  },
];

const askExport = ref(false);

onMounted(() => {
  filterAttendances();
});

const endAttendanceList = async () => {
  const data = await api.patch(`attendancelist/${props.attendanceList.id}`, {
    attendanceList: { state: false },
  });
  console.log(data);
  emits("reloadTable");
};

const filterAttendances = async () => {
  props.attendanceList.attendances.forEach((element) => {
    element.name = `${element.user.name} ${element.user.lastName}`;
  });
};

const markExit = async (attendance) => {
  try {
    const data = await api.patch(`attendances/${attendance.id}`, {
      attendance: {
        timeOut: moment().format("hh:mm a"),
        state: false,
      },
    });
    emits("reloadTable");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
</script>
