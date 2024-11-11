<template>
  <q-card class="full-width full-height" flat>
    <q-card-section>
      <q-avatar size="140px" style="top: 20px" class="absolute-center shadow-7">
        <img src="/public/images/login/logo-school.jpeg" />
      </q-avatar>
    </q-card-section>
    <q-card-section class="pruebe">
      <div class="text-center q-pb-md q-mt-lg q-pt-lg">
        <div class="col text-h6 ellipsis">Crear cuenta</div>
        <q-separator></q-separator>
      </div>
      <q-form class="q-gutter-md">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 620px"
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

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6 text-center">
            Verifique para crear usuario con este rol
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="codigo de verificacion"
            dense
            v-model="cod"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="loading = false" />
          <q-btn flat label="Send" v-close-popup @click="validateUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import moment from "moment";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

const rols = [
  { label: "Administracion", value: 1 },
  { label: "Portero", value: 2 },
  { label: "Docente", value: 3 },
];

export default defineComponent({
  name: "SignupComponent",
  setup(props, { emit }) {
    const today = moment().format("YYYY/MM/DD");
    const loading = ref(false);
    const $q = useQuasar();
    const persistent = ref(false);
    const cod = ref("");
    const user = ref({
      name: "qwe",
      lastName: "qwe",
      ci: "123",
      rol: "",
      bornDate: "1960/01/01",
      email: "qwe",
      password: "123",
    });

    const createAccount = async (user) => {
      try {
        const newUser = await api.post("/users", { user });
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
        $q.notify({
          message: data.msg,
          position: "top-right",
          color: "positive",
        });
      } catch (error) {
        loading.value = false;
        $q.notify({
          message: error.response.data.msg,
          position: "top-right",
          color: "negative",
        });
      }
    };

    const validations = () => {
      loading.value = true;
      if (validateFields()) {
        if (user.value.rol.value === 1 || user.value.rol.value === 2) {
          persistent.value = true;
        }
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
        width: "9px",
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
.pruebe {
  padding-left: 6em;
  padding-right: 6em;
}
@media (max-width: 1000px) {
  .column-1 {
    display: none;
  }
  .pruebe {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
