<template>
  <q-card class="full-width full-height" flat>
    <q-card-section>
      <q-avatar
        size="150px"
        style="top: 50px"
        class="absolute-center shadow-10"
      >
        <img src="/public/images/login/logo-school.jpeg" />
      </q-avatar>
    </q-card-section>
    <q-card-section class="pruebe q-mt-md">
      <div class="text-center q-pb-md q-mt-lg q-pt-xl">
        <div class="col text-h6 ellipsis">Crear cuenta</div>
        <q-separator></q-separator>
      </div>
      <q-form class="q-gutter-md">
        <q-input
          outlined
          rounded
          v-model="user.name"
          label="Nombre"
          lazy-rules
        />
        <q-input
          outlined
          rounded
          v-model="user.lastname"
          label="Apellido"
          lazy-rules
        />
        <q-input outlined rounded v-model="user.ci" label="Cedula" lazy-rules />
        <q-input
          outlined
          rounded
          v-model="user.phone"
          label="telefono"
          lazy-rules
        />
        <q-input outlined rounded v-model="user.rol" label="Rol" lazy-rules />
        <q-input
          outlined
          rounded
          v-model="user.username"
          label="Username"
          lazy-rules
        />

        <q-input
          outlined
          rounded
          v-model="user.password"
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
            label="Crear cuenta"
            to="/"
            type="button"
            color="primary"
          />
        </div>
        <div class="flex flex-center q-px-lg">
          Ya tienes cuenta
          <q-space></q-space>
          <div
            @click="$emit('changeComponent')"
            style="cursor: pointer; color: blue"
          >
            Inicia sesion
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SignupComponent",
  setup() {
    const user = ref({
      name: "",
      lastname: "",
      ci: "",
      phone: "",
      rol: "",
      username: "",
      password: "",
    });

    return { user, isPwd: ref(true) };
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
