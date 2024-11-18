<template>
  <q-card class="full-width full-height" flat>
    <q-card-section>
      <q-avatar
        size="200px"
        style="top: 50px"
        class="absolute-center shadow-10"
      >
        <img src="/public/images/login/logo-school.jpeg" />
      </q-avatar>
    </q-card-section>
    <q-card-section class="q-mt-xl">
      <div class="text-center q-mt-lg q-pt-xl">
        <div class="col text-h4 ellipsis">Inicia Sesion</div>
        <div class="col text-subtitle1">
          Inicia sesion en ASISTO GO para acceder a las maravilals de esta app
        </div>
        <q-separator></q-separator>
      </div>
    </q-card-section>
    <q-card-section class="pruebe q-mt-sm">
      <q-form>
        <q-input
          outlined
          rounded
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[(val) => val.length > 0 || 'Campo requerido']"
        />

        <q-input
          outlined
          rounded
          v-model="password"
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

        <div class="full-width text-center q-pl-md">
          <q-btn
            class="full-width"
            rounded
            size="md"
            label="Iniciar Sesion"
            @click="loginUser"
            type="button"
            color="primary"
          />
        </div>
        <div class="flex flex-center q-px-lg q-mt-md">
          No tienes cuenta
          <q-space></q-space>
          <div
            @click="$emit('changeComponent')"
            style="cursor: pointer; color: blue"
          >
            Registrate
          </div>
        </div>
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
import { defineComponent, ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SigninComponent",
  setup() {
    const email = ref("kenyer@gmail.com");
    const password = ref("123");
    const loading = ref(false);
    const $q = useQuasar();
    const router = useRouter();

    const loginUser = async () => {
      if (email.value.trim() && password.value.trim()) {
        loading.value = true;
        try {
          const { data } = await api.post("/users/login", {
            email: email.value,
            password: password.value,
          });
          loading.value = false;

          $q.sessionStorage.set("DataUser", data);
          $q.notify({
            message: `Bienvenido ${data.theUser.name}`,
            position: "top-right",
            color: "positive",
          });
          router.replace("/main");
        } catch (error) {
          loading.value = false;
          console.log(error);
          $q.notify({
            message: error,
            color: "negative",
          });
        }
      }
    };

    return {
      loading,
      email,
      password,
      isPwd: ref(true),
      loginUser,
    };
  },
});
</script>
<style scoped>
.grid-system {
  display: flex;
  flex-direction: row;
  width: 90%;
}

.aja {
  background-image: url("../../public/images/login/loginLayout.jpg");
}

.column-1,
.column-2 {
  flex: 1;
}

.column-in {
  animation-name: fadeInRight;
  animation-duration: 1s;
  animation-fill-mode: both;
}

.column-out {
  animation-name: fadeOutLeft;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.pruebe {
  padding-left: 6em;
  padding-right: 6em;
}

@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
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
