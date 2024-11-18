<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Año escolar</div>
    <q-separator inset />
    <div class="q-pa-md column-in" v-if="!addSchoolyear">
      <SchoolyearTable @change-component="addSchoolyear = !addSchoolyear" />
    </div>
    <div class="q-pa-md column-in" v-if="addSchoolyear">
      <CreateSchoolyear
        @change-component="addSchoolyear = !addSchoolyear"
        @hola="console.log('aja')"
      />
    </div>
  </q-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import SchoolyearTable from "src/components/admin/schoolyear/SchoolyearTable.vue";
import CreateSchoolyear from "src/components/admin/schoolyear/CreateSchoolyear.vue";

const addSchoolyear = ref(false);
</script>
4
