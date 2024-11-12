<template>
  <q-card
    class="no-shadow"
    bordered
    style="cursor: pointer"
    clickable
    @click="showPerson = true"
  >
    <q-card-section class="text-center">
      <q-avatar size="100px" class="shadow-10">
        <img src="https://cdn.quasar.dev/img/avatar6.jpg" />
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none text-center">
      <div class="text-h6 text-grey-8">
        {{ userData.name }} {{ userData.lastName }}
      </div>
      <div class="text-caption text-grey-8">
        {{ userData.rol }}
      </div>
    </q-card-section>

    <q-card-actions align="center" v-if="false">
      <q-btn flat round icon="fab fa-facebook" class="bg-indigo-7 text-white" />
      <q-btn flat round icon="fab fa-twitter" class="bg-info text-white" />
      <q-btn
        flat
        round
        icon="fab fa-instagram"
        class="bg-indigo-8 text-white"
      />
    </q-card-actions>
  </q-card>
  <q-dialog v-model="showPerson">
    <q-card class="my-card" style="min-width: 350px">
      <div
        style="
          height: 110px;
          background: linear-gradient(
            128deg,
            rgba(16, 30, 97, 1) 0%,
            rgba(0, 0, 0, 1) 50%,
            rgba(16, 30, 97, 1) 100%
          );
        "
      ></div>
      <q-card-section class="text-center bg-transparent absolute-top">
        <q-avatar size="120px" class="shadow-5">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-h5 q-mt-xs">
          {{ userData.name }} {{ userData.lastName }}
        </div>
        <div class="text-subtitle2">{{ userData.rol }}</div>
        <q-separator inset />
      </q-card-section>
      <div style="height: 100px"></div>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">Datos de contacto</div>
        <div class="text-subtitle2 text-grey">
          <span class="text-subtitle2 text-dark">Email:</span>
          {{ userData.email ? userData.email : "No agregado" }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PersonalComponent",
  props: ["userData"],
  setup() {
    const showPerson = ref(false);
    return {
      showPerson,
    };
  },
});
</script>
