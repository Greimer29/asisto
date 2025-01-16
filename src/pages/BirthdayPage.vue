<template>
  <q-card class="flex flex-center background" style="height: 84vh">
    <div
      v-if="birthDudes.length <= 0"
      class="text-center text-h5 text-white text-bold text-italic"
      style="font-family: Verdana, Geneva, Tahoma; margin-top: 300px"
    >
      No se han encontrado cumpleañeros <br />
      para este mes
    </div>
    <q-carousel
      class="item"
      flat
      style="border-radius: 15px; border: 2px solid goldenrod"
      animated
      v-model="slide"
      infinite
      navigation
      control="white"
      arrows
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      v-if="birthDudes.length > 0"
    >
      <q-carousel-slide
        v-for="(item, index) in birthDudes"
        :key="index"
        :name="index"
        class="bg-black text-white"
      >
        <div class="column items-center justify-center">
          <q-img
            class="q-mb-md"
            fit
            src="../../public/images/login/maranatha_church.jpeg"
            style="max-width: 170px; min-width: 170px"
          />
          <div class="text-h5">{{ item.name }} {{ item.lastName }}</div>
          <div class="text-subtitle1">
            {{ item.bornDate }}
          </div>
          <div class="text-subtitle2">{{ item.age }}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-card>
</template>
<script setup>
import moment from "moment";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";

const birthDudes = ref([]);
const slide = ref(0);
const autoplay = ref(true);
const todayMonth = ref(moment().format("MM"));
const todaYear = ref(moment().format("YYYY"));

const getUsers = async () => {
  const { data } = await api.get("users");
  data.forEach((element) => {
    const [year, month, day] = element.bornDate.split("/");
    element.age = todaYear.value - year;
    if (month === todayMonth.value) {
      birthDudes.value.push(element);
    }
  });
  console.log(birthDudes.value);
};

onMounted(() => {
  getUsers();
});
</script>

<style scoped>
.background {
  background-image: url("../../public/images/birthday/nosee.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.item {
  min-width: 500px;
  max-width: 100%;
  position: absolute;
  left: 280px;
}

@media (max-width: 980px) {
  .background {
    background-image: url("../../public/images/birthday/nosx.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .item {
    min-width: 300px;
    max-width: 100%;
    position: center;
    left: auto;
  }
}
</style>
