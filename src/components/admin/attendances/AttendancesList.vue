<template>
  <q-card>
    <q-card-section class="flex flex-center">
      <q-btn
        class="absolute-left"
        flat
        icon="chevron_left"
        @click="emits('changeComponent')"
      />
      <div class="text-h6 text-bold text-center">
        {{ monthData.label }}
      </div>
    </q-card-section>
    <q-card-section v-if="attendanceList <= 0">
      No encontramos listas de asistencias por este mes
      <q-separator></q-separator>
    </q-card-section>
    <q-card-section>
      <ExpansionItemAttendance
        v-for="(attlist, index) in attendanceList"
        :key="index"
        :attlistData="attlist"
      />
    </q-card-section>
    <q-card-section v-if="false">
      <q-item v-for="(attlist, index) in attendanceList" :key="index">
        <q-item-section>
          <div class="text-h6">
            {{ attlist.day }}
          </div>
          {{ attlist.date }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { defineProps } from "vue";
import ExpansionItemAttendance from "./ExpansionItemAttendance.vue";
const props = defineProps({
  monthData: Object,
});
const emits = defineEmits(["changeComponent", "closeModal", "reloadTable"]);
const attendanceList = props.monthData.attendanceList;
console.log(attendanceList);
</script>
