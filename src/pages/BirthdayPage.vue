<template>
  <q-page class="background flex flex-center">
    <BirthdayBoy />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import BirthdayBoy from "src/components/BirthdayBoy.vue";

export default defineComponent({
  name: "BirthdayPage",
  components: { BirthdayBoy },
});
</script>

<style scoped>
.background {
  background-color: black;
  background-image: url("../../public/images/happyBirthday.jpg");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
