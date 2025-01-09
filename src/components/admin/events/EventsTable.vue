<template>
  <q-table
    title="Eventos realizados"
    :rows="events"
    grid
    :rows-per-page-options="[0]"
    hide-bottom
  >
    <template v-slot:top-right>
      <q-btn label="Crear" color="positive" @click="emits('changeComponent')" />
    </template>
    <template v-slot:item="props">
      <q-card class="events-item q-ma-sm" bordered>
        <q-card-section class="text-center q-pa-none">
          {{ console.log(props.row) }}
          <q-img
            :src="`http://localhost:3333/events/uploads/${props.row.urlImg}`"
            style="height: 270px; max-width: 100%"
            fit
          >
            <div
              class="absolute-top text-right q-gutter-sm"
              style="padding: 0%"
            >
              <q-btn
                color="primary"
                icon="edit"
                dense
                @click="askEdit = true"
              />
              <q-btn
                color="negative"
                icon="delete"
                dense
                @click="askDelete = true"
              />
            </div>
            <div class="absolute-bottom text-left" style="padding: 0%">
              <div class="text-bold text-subtitle1 relative-bottom">
                <q-avatar size="40px">
                  <q-icon name="place" />
                </q-avatar>
                {{ props.row.location }}
              </div>
            </div>
          </q-img>
        </q-card-section>

        <q-card-section class="q-pb-none">
          <div class="flex">
            <div class="q-mr-md">
              <q-avatar size="40px"> <q-icon name="event" /> </q-avatar>
              {{ props.row.date }}
            </div>
            <q-space></q-space>
            <div class="flex">
              <div class="flex flex-center q-mr-sm">
                {{ props.row.timeIn }}
              </div>
              <q-space />
              <div class="flex flex-center q-mr-sm">-</div>
              <q-space />
              <div class="flex flex-center">
                {{ props.row.timeOut }}
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-left text-weight-bold text-h5 text-grey-9">
            {{ props.row.title }}
          </div>
          <div class="text-justify" style="height: 20px">
            <div class="text-subtitle1 text-grey-7 q-py-xs">
              {{ props.row.description }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="flex-center"> </q-card-actions>
      </q-card>
      <q-dialog v-model="askEdit">
        <q-card>
          <CreateEvent
            :edit="true"
            :event-data="props.row"
            @closeModal="askEdit = false"
          />
        </q-card>
      </q-dialog>
      <q-dialog v-model="askDelete">
        <q-card>
          <q-card-section>
            <div class="text-subtitle3 text-weight-bold text-cursive">
              ¿Estas seguro que deseas eliminar este evento?
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat v-close-popup color="gray" label="cancel"></q-btn>
            <q-btn
              flat
              color="negative"
              label="Eliminar"
              @click="deleteEvent(props.row.id)"
            ></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
  </q-table>
  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script setup>
import { onMounted, ref, defineProps, defineEmits } from "vue";
import CreateEvent from "./CreateEvent.vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

const props = defineProps({});
const $q = useQuasar();

const emits = defineEmits(["changeComponent", "closeModal", "reloadTable"]);

const events = ref([]);
const askEdit = ref(false);
const askDelete = ref(false);
const loading = ref(false);

const getEvents = async () => {
  const { data } = await api.get("events");
  if (data) {
    events.value = data;
  }
};

const deleteEvent = async (id) => {
  loading.value = true;
  try {
    const { data } = await api.delete(`events/${id}`);
    if (data) {
      $q.notify({
        message: "Evento eliminado exitosamente",
        position: "top-right",
        color: "positive",
      });
      loading.value = false;
    }
  } catch (error) {
    $q.notify({
      message: "Algo salio mal",
      color: "negative",
    });
    loading.value = false;
  }
};

onMounted(() => {
  getEvents();
});
</script>

<style scoped>
.events-item {
  max-width: 400px;
  min-width: 350px;
  height: 450px;
  max-height: 480px;
}
@media (max-width: 980px) {
  .events-item {
    width: 100%;
    height: 450;
  }
}
</style>
