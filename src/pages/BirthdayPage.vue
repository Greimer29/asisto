<template>
  <q-page class="background grid-system">
    <div class="item item-1"></div>
    <div class="item item-2"></div>
    <div class="item item-3"></div>
    <div class="item item-4 flex flex-center">
      <q-carousel
        flat
        style="
          max-width: 100vw;
          min-width: calc(50vw - 25vw);
          border-radius: 15px;
          border: 2px solid gold;
        "
        animated
        v-model="slide"
        control-color="white"
        navigation
        swipeable
        infinite
        arrows
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          v-for="(item, index) in birthDudes"
          :key="index"
          :name="index"
          class="bg-dark"
        >
          <q-card flat class="bg-dark full-width full-height">
            <q-card-section class="text-center">
              <q-avatar size="200px" font-size="52px">
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
            </q-card-section>
            <q-card-section class="text-center text-white">
              <div class="text-h5">{{ item.name }} {{ item.lastName }}</div>
              {{ item.bornDate }}
            </q-card-section>
          </q-card>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

const birthDudes = [
  { name: "Greimer ", lastName: "Perez", bornDate: "29/06/2001" },
  { name: "Kenyer ", lastName: "Perez", bornDate: "17/10/1999" },
  { name: "Tobias ", lastName: "Perez", bornDate: "17/11/1967" },
];

export default defineComponent({
  name: "BirthdayPage",
  components: {},
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
      birthDudes,
    };
  },
});
</script>

<style scoped>
.grid-system {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

@media (max-width: 650px) {
  .grid-system {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(1, 1fr);
  }
  .item-1,
  .item-2 {
    display: none;
  }
}

.background {
  background-color: black;
  background-image: url("../../public/images/happyBirthday.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
