<template>
  <q-card>
    <q-card-section class="flex flex-center" v-if="!edit">
      <q-btn
        class="absolute-left"
        flat
        icon="chevron_left"
        @click="$emit('changeComponent')"
      />
      <div class="text-subtitle2">Completa los campos requeridos</div>
    </q-card-section>
    <q-card-section class="flex flex-center" v-if="edit">
      <div class="text-subtitle2">Completa los campos requeridos</div>
      <q-btn
        class="absolute-right"
        flat
        icon="close"
        @click="$emit('closeModal')"
      />
    </q-card-section>
    <q-card-section class="q-pa-sm">
      <q-form class="row">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            v-model="schedule.turn"
            rounded
            outlined
            label="Turno"
            hint="Requerido*"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            outlined
            rounded
            v-model="schedule.timeIn"
            mask="time"
            :rules="['time']"
            hint="Requerido*"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="schedule.timeIn" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            outlined
            rounded
            v-model="schedule.timeOut"
            mask="time"
            :rules="['time']"
            hint="Requerido*"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="schedule.timeOut" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-form>
      <q-btn
        v-if="!edit"
        rounded
        class="full-width q-mt-md"
        color="primary"
        label="Crear school year"
        @click="valdiations(schedule)"
      />
      <q-btn
        v-if="edit"
        rounded
        class="full-width q-mt-md"
        color="primary"
        label="Actualizar año escolar"
        @click="valdiations(schedule)"
      />
    </q-card-section>
    <q-inner-loading
      :showing="loading"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { onMounted, ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import moment from "moment";

const props = defineProps({
  edit: Boolean,
  scheduleData: Object,
});
const emits = defineEmits(["changeComponent", "closeModal", "reloadTable"]);

const schedule = ref({});
const loading = ref(false);
const $q = useQuasar();

if (!props.edit) {
  schedule.value = {
    turn: "",
    timeIn: moment().format("YYYY/MM/DD"),
    timeOut: moment().format("YYYY/MM/DD"),
    state: "",
  };
} else {
  schedule.value = props.scheduleData;
}

const validateFields = (schedule) => {
  if (
    schedule.turn.trim() &&
    schedule.timeIn.trim() &&
    schedule.timeOut.trim()
  ) {
    return true;
  } else {
    loading.value = false;
    $q.notify({ message: "revise los campos requeridos" });
  }
};

const createSchedule = async (schedule) => {
  try {
    const { data } = await api.post("/schedules", { schedule });
    console.log(data);
    loading.value = false;
    $q.notify({
      message: "Horario creado exitosamente",
      position: "top-right",
      color: "positive",
    });
    emits("changeComponent");
  } catch (error) {
    loading.value = false;
    console.log(error);
    $q.notify({ message: error, position: "top-right", color: "negative" });
  }
};

const updateSchedule = async (schedule) => {
  try {
    const { data } = await api.patch(`schedules/${props.scheduleData.id}`, {
      schedule,
    });
    console.log(data);
    loading.value = false;
    emits("reloadTable");
    emits("closeModal");
    $q.notify({
      message: "Horario editado exitosamente",
      position: "top-right",
      color: "positive",
    });
  } catch (error) {
    console.log(error);
    loading.value = false;
    $q.notify({ message: error, position: "top-right", color: "negative" });
  }
};

const valdiations = async (schedule) => {
  loading.value = true;
  if (validateFields(schedule)) {
    if (!props.edit) {
      createSchedule(schedule);
    } else {
      updateSchedule(schedule);
    }
  }
};
</script>
