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
        <div class="col text-h6 ellipsis">Inicia Sesion</div>
        <q-separator></q-separator>
      </div>
    </q-card-section>
    <q-card-section class="pruebe">
      <q-form class="q-gutter-md">
        <q-input
          outlined
          rounded
          v-model="username"
          label="Username"
          lazy-rules
        />

        <q-input
          outlined
          rounded
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="Password"
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
            label="Login"
            to="/"
            type="button"
            color="primary"
          />
        </div>
        <div class="flex flex-center q-px-lg">
          No tienes cuenta
          <q-space></q-space>
          <div @click="$emit('changeComponent')">Registrate</div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-section class="flex flex-center">
      <div class="text-center" style="max-width: 500px">
        Asisto.GO es una aplicacion web multiplataforma dise;ada para hacer tu
        vida mas facil
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SigninComponent",
  setup() {
    const username = ref("kenyer@gmail.com");
    const password = ref("123");

    const loginUser = () => {
      $q.sessionStorage.set("DataUser", provideUser);
      return router.replace("/main");
      loading.value = true;
      api
        .post("/users/login", {
          email: email.value,
          password: password.value,
        })
        .then((res) => {
          const { data } = res;
          try {
            $q.sessionStorage.set("DataUser", data.dataUser);
            $q.notify({
              message: `Bienvenido ${data.dataUser.theUser.name}`,
              position: "top-right",
              color: "positive",
            });
            loading.value = false;
            router.replace("/main");
            return console.log(data);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          $q.notify({
            message: `Error: ${err.response.data}`,
            color: "negative",
          });
          console.log(err);
          loading.value = false;
        });
    };

    return {
      username,
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
