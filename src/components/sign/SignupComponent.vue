<template>
  <q-card class="full-width full-height" flat>
    <q-card-section>
      <q-avatar style="top: 0px" class="logo absolute-center shadow-7">
        <img
          src="data:image/jpeg;base64,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"
        />
      </q-avatar>
    </q-card-section>
    <q-card-section class="pruebe">
      <div class="text-center q-pb-md q-mt-sm q-pt-md">
        <div class="col text-h6 ellipsis">Crear cuenta</div>
        <q-separator></q-separator>
      </div>
      <q-form class="q-gutter-md scroll-container">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          class="scroll_area"
        >
          <q-input
            outlined
            rounded
            v-model="user.name"
            label="Nombre"
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Campo requerido']"
          />
          <q-input
            outlined
            rounded
            v-model="user.lastName"
            label="Apellido"
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Campo requerido']"
          />
          <q-input
            type="number"
            outlined
            rounded
            v-model="user.ci"
            label="Cedula"
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Campo requerido']"
          />
          <q-select
            outlined
            rounded
            v-model="user.rol"
            label="Rol"
            lazy-rules
            :options="rols"
            :rules="[(val) => !!val || 'Campo requerido']"
          />
          <q-select
            outlined
            rounded
            v-model="horaryId"
            label="Horario"
            lazy-rules
            :options="opHorary"
            :rules="[(val) => !!val || 'Campo requerido']"
          />

          <q-input
            outlined
            rounded
            v-model="user.bornDate"
            label="Fecha de nacimiento"
            mask="date"
            :rules="[(val) => val.length > 0 || 'Campo requerido']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="user.bornDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            outlined
            rounded
            v-model="user.email"
            label="Email"
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Campo requerido']"
          />

          <q-input
            outlined
            rounded
            v-model="user.password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            :rules="[(val) => val.length > 0 || 'Campo requerido']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="full-width text-center">
            <q-btn
              class="full-width"
              rounded
              size="md"
              label="Crear cuenta"
              @click="validations"
              type="button"
              color="primary"
            />
          </div>
          <div class="flex flex-center q-px-lg q-mt-sm">
            Ya tienes cuenta
            <q-space></q-space>
            <div
              @click="$emit('changeComponent')"
              style="cursor: pointer; color: blue"
            >
              Inicia sesion
            </div>
          </div>
        </q-scroll-area>
      </q-form>
    </q-card-section>
    <q-inner-loading
      :showing="loading"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-card>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import moment from "moment";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

const rols = ["Administracion", "Docente", "Portero", "Limpieza", "Obrero"];

export default defineComponent({
  name: "SignupComponent",
  setup(props, { emit }) {
    const today = moment().format("YYYY/MM/DD");
    const loading = ref(false);
    const $q = useQuasar();
    const persistent = ref(false);
    const cod = ref("");
    const opHorary = ref([]);
    const horaryId = ref("");
    const user = ref({
      name: "",
      lastName: "",
      ci: "",
      rol: "",
      bornDate: "1960/01/01",
      email: "",
      password: "",
    });

    onMounted(() => {
      getHorary();
    });

    const getHorary = async () => {
      const { data } = await api.get("schedules");
      opHorary.value = data.map((element) => {
        return {
          label: element.turn,
          value: {
            id: element.id,
            timeIn: element.timeIn,
            timeOut: element.timeOut,
            turn: element.turn,
          },
        };
      });
      console.log(opHorary.value);
    };

    const createAccount = async (user) => {
      try {
        await api.post("/users", { user: user, scheduleId: horaryId.value });
        $q.notify({
          message: "Cuenta creada exitosamente",
          position: "top-right",
          color: "positive",
        });
        loading.value = false;
        emit("changeComponent");
      } catch (error) {
        $q.notify({
          message: "Ha ocurrido un error",
          position: "top-left",
          color: "negative",
        });
        loading.value = false;
      }
    };

    const validateFields = () => {
      if (
        user.value.name.trim() &&
        user.value.lastName.trim() &&
        user.value.ci.trim() &&
        user.value.rol !== "" &&
        horaryId.value !== "" &&
        user.value.bornDate.trim() &&
        user.value.email.trim() &&
        user.value.password.trim()
      ) {
        return true;
      } else {
        loading.value = false;
        $q.notify({
          message: "Error: revise los campos del formulario",
        });
      }
    };

    const validateUser = async () => {
      try {
        const { data } = await api.post("/users/validate", { cod: cod.value });
        createAccount(user.value);
      } catch (error) {
        loading.value = false;
        $q.notify({
          message: error,
          position: "top-right",
          color: "negative",
        });
        console.log(error);
      }
    };

    const validations = () => {
      loading.value = true;
      if (validateFields()) {
        createAccount(user.value);
      }
    };

    return {
      user,
      isPwd: ref(true),
      today,
      rols,
      loading,
      persistent,
      cod,
      opHorary,
      horaryId,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.2,
      },
      createAccount,
      validations,
      validateUser,
    };
  },
});
</script>
<style scoped>
.logo {
  font-size: 130px;
}
.pruebe {
  padding-left: 6em;
  padding-right: 6em;
}
.scroll_area {
  height: 600px;
}
@media (max-width: 1000px) {
  .column-1 {
    display: none;
  }
  .pruebe {
    padding-left: 10px;
    padding-right: 10px;
    height: 500px;
  }
  .logo {
    font-size: 120px;
  }
  .scroll_area {
    height: 420px;
  }
}
</style>
