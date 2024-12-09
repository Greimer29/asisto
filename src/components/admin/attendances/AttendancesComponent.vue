<template>
  <q-card class="q-mb-md" style="min-height: 250px; min-width: 250px">
    <q-card-section>
      <div class="h4 text-bold text-center">{{ monthName }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  monthName: String,
});
</script>
