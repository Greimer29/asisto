<template>
  <q-table
    style="height: 77vh"
    flat
    bordered
    :title="today"
    :rows="attendances"
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
      <q-td :props="props">
        <div>
          <q-btn
            v-if="!props.row.timeOut"
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
        color="positive"
        icon="fact_check"
        @click="emits('changeComponent')"
      />
    </template>
  </q-table>
</template>

<script setup>
import moment from "moment";
import { ref, defineEmits, onMounted } from "vue";
import { api } from "src/boot/axios";

const emits = defineEmits(["changeComponent"]);

onMounted(() => {
  getAttendances();
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
const attendances = ref([]);
const todayTime = ref("");

const today = moment().format("dddd DD/MM/YYYY");

const getAttendances = async () => {
  try {
    const { data } = await api.get("/attendances");

    data.forEach((element) => {
      element.name = `${element.user.name} ${element.user.lastName}`;
    });
    attendances.value = data;
  } catch (error) {
    console.log(error);
  }
};

const markExit = async (attendance) => {
  todayTime.value = moment().format("hh:mm a");
  try {
    const data = await api.patch(`attendances/${attendance.id}`, {
      attendance: {
        timeOut: todayTime.value,
      },
    });
    console.log(data);
    getAttendances();
  } catch (error) {
    console.log(error);
  }
};
const pagination = ref({
  rowsPerPage: 0,
});
</script>
