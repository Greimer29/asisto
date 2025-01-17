<template>
  <q-expansion-item
    expand-separator
    :label="attlistData.day"
    :caption="attlistData.date"
  >
    <div class="q-gutter-md q-pt-md text-weight-bold flex justify-between">
      <span class="q-pl-xl">Nombre</span
      ><span class="q-pl-xl">Hora Entrada</span>
      <span class="q-pr-xl">HoHora Salida</span>
    </div>
    <q-separator />
    <q-item v-for="(attendance, index) in attlistData.attendances" :key="index">
      <q-item-section>
        {{ attendance.user.name }} {{ attendance.user.lastName }}
      </q-item-section>
      <q-item-section> {{ attendance.timeIn }} </q-item-section>
      <q-item-section>{{ attendance.timeOut }}</q-item-section>
    </q-item>
  </q-expansion-item>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  attlistData: Object,
});
</script>
