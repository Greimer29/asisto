<template>
  <q-card flat>
    <q-card-section class="flex flex-center q-py-xs">
      <q-btn
        class="absolute-left"
        flat
        icon="chevron_left"
        @click="emits('changeComponent')"
      />
      <div class="text-subtitle1">Pasemos la asistencia</div>
    </q-card-section>
    <q-card-section>
      <q-table
        style="height: 69vh"
        flat
        bordered
        virtual-scroll
        :rows="personal"
        :columns="columns"
        color="primary"
        row-key="name"
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        no-results-label="No pude encontrar a esa persona, prueba usando el nombre"
      >
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
                v-if="!props.row.isIn"
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
    </q-card-section>
  </q-card>
</template>

<script setup>
import { onMounted, ref, defineEmits } from "vue";
import moment from "moment";

const emits = defineEmits(["changeComponent"]);
import { api } from "src/boot/axios";

const todayDate = ref("");
const todayTime = ref("");
const personal = ref([]);
const listedUser = ref(true);
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

onMounted(() => {
  getPersonal();
});

const getPersonal = async () => {
  try {
    const { data } = await api.get("/users");

    data.forEach((element) => {
      element.name = `${element.name} ${element.lastName}`;
      element.isIn = validateAttendanceEntry(element);
    });
    personal.value = data.filter((element) => {
      return element.email !== "Admin@Admin.com";
    });
    console.log(personal.value);
  } catch (error) {
    console.log(error);
  }
};

const markEntry = async (user) => {
  todayTime.value = moment().format("h:mm a");
  todayDate.value = moment().format("YYYY/MM/DD");
  try {
    const data = await api.post("attendances", {
      attendance: {
        timeIn: todayTime.value,
        date: todayDate.value,
        userId: user.id,
      },
    });
    console.log(data);
    getPersonal();
  } catch (error) {
    console.log(error);
  }
};

const validateAttendanceEntry = (user) => {
  todayDate.value = moment().format("YYYY/MM/DD");

  return user.attendances.some(
    (attendance) => attendance.date === todayDate.value
  );
};
</script>
