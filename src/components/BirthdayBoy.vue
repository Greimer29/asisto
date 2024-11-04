<template>
  <q-card>
    <q-card-section>
      <q-avatar size="100px" font-size="52px">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
    </q-card-section>
    <q-card-section class="text-center">
      <div>name lastname</div>
      birthday date
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BirthdayBoy",
  props: ["name"],
});
</script>
