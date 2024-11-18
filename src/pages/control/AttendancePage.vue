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
        :rows="attendances"
        :columns="columns"
        virtual-scroll
        color="primary"
        row-key="name"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        no-data-label="No se ha registrado ninguna entrada para hoy"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div>
              <q-btn label="Entrada" no-caps color="cyan-5" dense />
            </div>
          </q-td>
        </template>
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
        :rows="personal"
        :columns="columns"
        color="primary"
        row-key="name"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        no-results-label="No pude encontrar a esa persona, prueba usando el nombre"
      >
        <template v-slot:top-right>
          <q-btn
            color="grey"
            round
            icon="close"
            @click="addPerson = !addPerson"
          />
        </template>
        <template v-slot:body-cell-avatar="props">
          <q-td :props="props">
            <div>
              <q-avatar>
                <q-img src="https://cdn.quasar.dev/img/avatar6.jpg"
              /></q-avatar>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div>
              <q-btn
                label="Entrada"
                no-caps
                color="cyan-5"
                dense
                @click="markEntry(props.row)"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import moment from "moment";
import { api } from "src/boot/axios";

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
    name: "rol",
    label: "Rol",
    field: "rol",
    sortable: true,
    align: "left",
  },
  {
    name: "actions",
    label: "Acciones",
    align: "right",
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
  name: "AttendancePage",
  setup() {
    const today = moment().format("dddd DD/MM/YYYY");
    const personal = ref([]);
    const attendances = ref([]);
    const todayDate = ref("");

    onMounted(() => {
      getPersonal();
      getAttendances();
    });

    const getPersonal = async () => {
      try {
        const { data } = await api.get("/users");
        data.forEach((element) => {
          element.name = `${element.name} ${element.lastName}`;
        });
        personal.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAttendances = async () => {
      try {
        const { data } = await api.get("/attendance");
        attendances.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const markEntry = (user) => {
      todayDate.value = moment().format("h:mm a");
      console.log(todayDate.value);
    };

    return {
      columns,
      rows,
      today,
      addPerson: ref(false),
      pagination: ref({
        rowsPerPage: 0,
      }),
      personal,
      attendances,
      getPersonal,
      markEntry,
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
