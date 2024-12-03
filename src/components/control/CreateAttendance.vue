<template>
  <q-card flat>
    <q-card-section class="flex flex-center">
      <q-btn
        class="absolute-left"
        flat
        icon="chevron_left"
        @click="emits('changeComponent')"
      />
      <div class="text-subtitle1 q-py-none">Pasemos la asistencia</div>
    </q-card-section>
    <q-card-section class="q-px-none">
      <q-table
        style="height: 70.5vh"
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
            {{ console.log(props.row) }}
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
import { onMounted, ref, defineEmits, defineProps } from "vue";
import moment from "moment";

const props = defineProps({
  attendanceList: Object,
});
const emits = defineEmits(["changeComponent", "reloadTable"]);
import { api } from "src/boot/axios";

const personal = ref([]);
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
    name: "turn",
    label: "Truno",
    field: "turn",
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
    });
    personal.value = data.filter((element) => {
      return element.email !== "Admin@Admin.com";
    });
    personal.value.forEach((element) => {
      element.turn = element.schedule_users[0].turn;
    });
  } catch (error) {
    console.log(error);
  }
};

const markEntry = async (user) => {
  try {
    const data = await api.post("attendances", {
      attendance: {
        timeIn: moment().format("h:mm a"),
        state: true,
        userId: user.id,
      },
    });
    console.log(data);
    emits("reloadTable");
    getPersonal();
  } catch (error) {
    console.log(error);
  }
};
</script>
