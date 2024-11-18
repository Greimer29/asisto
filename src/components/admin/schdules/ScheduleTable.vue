<template>
  <q-table
    style="height: 77vh"
    flat
    bordered
    :rows="scheduleRows"
    :columns="columns"
    row-key="name"
    :filter="filter"
    hide-bottom
    v-model:pagination="pagination"
    :rows-per-page-options="[0]"
    virtual-scroll
    no-data-label="No se ha registrado ninguna entrada para hoy"
  >
    <template v-slot:top-left>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:top-right>
      <q-btn label="Crear" color="positive" @click="$emit('changeComponent')" />
    </template>
    <template v-slot:body-cell-state="props">
      <q-td :props="props">
        <div>
          <q-badge rounded :color="props.value ? 'positive' : 'negative'" />
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <div>
          <q-btn
            dense
            icon="edit"
            flat
            color="primary"
            @click="getSchedule(props.row.id)"
          />
          <q-btn
            dense
            icon="delete"
            flat
            color="negative"
            @click="confirmDestroy(props.row.id)"
          />
        </div>
      </q-td>
    </template>
    <q-inner-loading
      :showing="loading"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-table>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="negative" text-color="white" />
        <span class="q-ml-sm">
          Estas seguro que deseas eliminar este a;o escolar y todos sus datos
        </span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="grey" v-close-popup />
        <q-btn
          flat
          label="Eliminar"
          color="negative"
          v-close-popup
          @click="deleteSchedule"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="edit" persistent>
    <q-card style="min-width: 350px">
      <CreateSchedule
        :edit="true"
        :scheduleData="scheduleData"
        @closeModal="edit = false"
        @reloadTable="getSchedules()"
      />
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import CreateSchedule from "./CreateSchedule.vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const columns = ref([
  {
    name: "turn",
    label: "Turno",
    field: "turn",
    align: "left",
  },
  {
    name: "timeIn",
    label: "Hora de entrada",
    field: "timeIn",
    align: "left",
  },
  {
    name: "timeOut",
    label: "Hora de salida",
    field: "timeOut",
    align: "center",
  },
  {
    name: "actions",
    label: "acciones",
    field: "actions",
    align: "center",
  },
]);

export default defineComponent({
  name: "ScheduleTable",
  props: ["name"],
  emits: ["changeComponent"],
  components: { CreateSchedule },
  setup(props, { emit }) {
    const $q = useQuasar();
    const filter = ref("");
    const rows = ref([]);
    const scheduleRows = ref([]);
    const confirm = ref(false);
    const edit = ref(false);
    const scheduleData = ref({});
    const scheduleId = ref(null);
    const loading = ref(false);
    const pagination = ref({
      rowsPerPage: 0,
    });

    onMounted(() => {
      getSchedules();
    });

    const getSchedules = async () => {
      loading.value = true;
      try {
        const { data } = await api.get("schedules");
        scheduleRows.value = data;
        console.log(data);
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };

    const getSchedule = async (id) => {
      try {
        const { data } = await api.get(`schedules/${id}`);
        scheduleData.value = data;
        edit.value = true;
      } catch (error) {
        console.log(error);
      }
    };

    const confirmDestroy = (id) => {
      confirm.value = true;
      scheduleId.value = id;
    };

    const deleteSchedule = async () => {
      loading.value = true;
      try {
        const resp = await api.delete(`schedules/${scheduleId.value}`);
        console.log(resp);
        $q.notify({
          message: "Año escolar eliminado exitosamente",
          position: "top-right",
          color: "positive",
        });
        getSchedules();
        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
        getSchedules();
        $q.notify({
          message: "Algo salio mal",
          position: "top-right",
          color: "negative",
        });
      }
    };
    return {
      pagination,
      columns,
      scheduleRows,
      rows,
      filter,
      confirm,
      edit,
      scheduleData,
      loading,
      getSchedules,
      getSchedule,
      deleteSchedule,
      confirmDestroy,
    };
  },
});
</script>
