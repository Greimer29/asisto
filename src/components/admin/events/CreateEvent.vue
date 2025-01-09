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
            v-model="event.title"
            rounded
            outlined
            label="Titulo"
            :hint="edit ? null : 'Requerido*'"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            v-model="event.description"
            rounded
            outlined
            label="Descripcion"
            :hint="edit ? null : 'Requerido*'"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            v-model="event.location"
            rounded
            outlined
            label="Lugar"
            :hint="edit ? null : 'Requerido*'"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            v-model="event.date"
            rounded
            outlined
            label="Fecha"
            :hint="edit ? null : 'Requerido*'"
            mask="date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="event.date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            outlined
            rounded
            label="Hora de inicio"
            v-model="event.timeIn"
            mask="time"
            :rules="['time']"
            :hint="edit ? null : 'Requerido*'"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="event.timeIn" format24h>
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
            label="Hora de culminacion"
            v-model="event.timeOut"
            mask="time"
            :rules="['time']"
            :hint="edit ? null : 'Requerido*'"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="event.timeOut" format24h>
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
          <div class="text-subtitle2 text-left q-my-sm" v-if="!edit">
            Enviar imagen para crear evento
          </div>
          <div class="text-subtitle2 text-left q-my-sm" v-if="edit">
            Cambiar imagen
          </div>
          <q-uploader
            @start="validateFields(event)"
            class="full-width"
            url="http://localhost:3333/events/upload"
            field-name="avatar"
            @uploaded="handleUpload"
            @failed="alert('algo salio mal')"
          />
        </div>
      </q-form>
      <q-btn
        v-if="edit"
        rounded
        class="full-width q-mt-md"
        color="primary"
        label="Actualizar Evento"
        @click="updateEvent(event)"
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
  eventData: Object,
});
const emits = defineEmits(["changeComponent", "closeModal", "reloadTable"]);

const event = ref({});
const loading = ref(false);
const $q = useQuasar();
const imgResp = ref(null);

if (!props.edit) {
  event.value = {
    title: "",
    timeIn: moment().format("hh:mm A"),
    timeOut: moment().format("hh:mm A"),
    description: "",
    location: "",
    date: moment().format("YYYY/MM/DD"),
  };
} else {
  event.value = props.eventData;
}

const handleUpload = async (info) => {
  imgResp.value = info.xhr.response;
  if (validateFields(event.value)) {
    createEvent(event.value);
  }
};

const validateFields = (event) => {
  if (
    event.title.trim() &&
    event.description.trim() &&
    event.location.trim() &&
    event.date.trim() &&
    event.timeIn.trim() &&
    event.timeOut.trim() &&
    imgResp.value
  ) {
    return true;
  } else {
    loading.value = false;
    $q.notify({
      message: "revise los campos requeridos",
      color: "warning",
      position: "top-right",
    });
    return false;
  }
};

const createEvent = async (event) => {
  try {
    event.urlImg = `events/${imgResp.value}`;
    const { data } = await api.post("/events", { event });
    console.log(data);
    loading.value = false;
    $q.notify({
      message: "Evento creado exitosamente",
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

const updateEvent = async (event) => {
  loading.value = true;
  try {
    event.urlImg = `events/${imgResp.value}`;
    const { data } = await api.patch(`events/${props.eventData.id}`, {
      event,
    });
    console.log(data);
    loading.value = false;
    emits("reloadTable");
    emits("closeModal");
    $q.notify({
      message: "Evento editado exitosamente",
      position: "top-right",
      color: "positive",
    });
  } catch (error) {
    console.log(error);
    loading.value = false;
    $q.notify({ message: error, position: "top-right", color: "negative" });
  }
};
</script>
