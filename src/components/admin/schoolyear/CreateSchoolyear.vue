<template>
  <q-card>
    <q-card-section class="flex flex-center" v-if="!edit">
      <q-btn
        class="absolute-left"
        flat
        icon="chevron_left"
        @click="$emit('changeComponent')"
      />
    </q-card-section>
    <q-card-section class="flex flex-center" v-if="edit">
      <div class="text-subtitle1">Pasemos la asistencia</div>
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
            v-model="schoolYear.promo"
            rounded
            outlined
            label="Promocion"
            hint="Requerido*"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-select
            v-model="schoolYear.state"
            :options="stateOp"
            rounded
            outlined
            label="Estado"
            hint="Requerido*"
          />
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-input
            v-model="schoolYear.dateStart"
            rounded
            outlined
            label="Fecha de inicio"
            hint="Requerido*"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="schoolYear.dateStart">
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
            v-model="schoolYear.dateEnd"
            rounded
            outlined
            label="Fecha de culminacion"
            hint="Requerido*"
            mask="date"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="schoolYear.dateEnd">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
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
        label="Crear año escolar"
        @click="valdiations(schoolYear)"
      />
      <q-btn
        v-if="edit"
        rounded
        class="full-width q-mt-md"
        color="primary"
        label="Actualizar año escolar"
        @click="valdiations(schoolYear)"
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
  schoolYearData: Object,
});
const emits = defineEmits(["changeComponent", "closeModal", "reloadTable"]);

const stateOp = ref([
  { label: "Inactivo", value: false },
  { label: "Activo", value: true },
]);
const schoolYear = ref({});
const loading = ref(false);
const $q = useQuasar();

if (!props.edit) {
  schoolYear.value = {
    promo: "",
    dateStart: moment().format("YYYY/MM/DD"),
    dateEnd: moment().format("YYYY/MM/DD"),
    state: "",
  };
} else {
  schoolYear.value = {
    promo: props.schoolYearData.promo,
    dateStart: props.schoolYearData.dateStart,
    dateEnd: props.schoolYearData.dateEnd,
    state: props.schoolYearData.state,
  };
}

const validateFields = (schoolYear) => {
  if (
    schoolYear.promo.trim() &&
    schoolYear.dateStart.trim() &&
    schoolYear.dateEnd.trim()
  ) {
    return true;
  } else {
    loading.value = false;
    $q.notify({ message: "revise los campos requeridos" });
  }
};

const createSchoolyear = async (schoolYear) => {
  try {
    const { data } = await api.post("/schoolyears", { schoolYear });
    console.log(data);
    loading.value = false;
    $q.notify({
      message: "Año escolar creado exitosamente",
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

const updateSchoolYear = async (schoolYear) => {
  try {
    const { data } = await api.patch(`schoolyears/${props.schoolYearData.id}`, {
      schoolYear,
    });
    console.log(data);
    loading.value = false;
    emits("reloadTable");
    emits("closeModal");
    $q.notify({
      message: "Año escolar editado exitosamente",
      position: "top-right",
      color: "positive",
    });
  } catch (error) {
    console.log(error);
    loading.value = false;
    $q.notify({ message: error, position: "top-right", color: "negative" });
  }
};

const valdiations = async (schoolYear) => {
  loading.value = true;
  if (validateFields(schoolYear)) {
    if (!props.edit) {
      createSchoolyear(schoolYear);
    } else {
      updateSchoolYear(schoolYear);
    }
  }
};
</script>
