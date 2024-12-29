<template>
  <q-expansion-item
    expand-separator
    :label="attlistData.day"
    :caption="attlistData.date"
  >
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
