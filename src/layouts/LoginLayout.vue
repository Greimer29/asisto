<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center aja">
        <div class="grid-system" style="min-height: 80vh">
          <div class="column-1 flex flex-column items-start z-top">
            <q-carousel
              class="full-width full-height"
              animated
              v-model="slide"
              infinite
              :autoplay="autoplay"
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide
                :name="1"
                img-src="/public/images/login/maranatha_play.jpeg"
              />
              <q-carousel-slide
                :name="2"
                img-src="/public/images/login/maranatha_church.jpeg"
              />
              <q-carousel-slide
                :name="3"
                img-src="/public/images/login/maranatha_people.jpeg"
              />
              <q-carousel-slide
                :name="4"
                img-src="public/images/login/marnatha_room.jpeg"
              />
              <q-carousel-slide
                :name="5"
                img-src="/public/images/login/maranatha_kids.jpeg"
              />
            </q-carousel>
          </div>
          <div class="column-2 flex flex-column items-end">
            <SigninComponent
              v-if="!register"
              @change-component="register = !register"
              class="column-in"
            />
            <SignupComponent
              v-if="register"
              @change-component="register = !register"
              class="column-in"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
  <q-inner-loading
    :showing="loading"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script>
import { api } from "src/boot/axios";
import { defineComponent, onMounted } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import SigninComponent from "components/sign/SigninComponent.vue";
import SignupComponent from "components/sign/SignupComponent.vue";

export default defineComponent({
  components: { SigninComponent, SignupComponent },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const loading = ref(false);
    const register = ref(false);

    return {
      register,
      loading,
      slide: ref(1),
      autoplay: ref(true),
    };
  },
});
</script>

<style scoped>
.grid-system {
  display: flex;
  flex-direction: row;
  width: 90%;
}
.z-top {
  z-index: 10;
}
.aja {
  background-image: url("../../public/images/login/loginLayout.jpg");
}
.pruebe {
  padding-left: 6em;
  padding-right: 6em;
}

.column-1,
.column-2 {
  flex: 1;
}

.column-in {
  animation-name: fadeInRight;
  animation-duration: 1s;
  animation-fill-mode: both;
  min-height: 780px;
  max-height: 780px;
}

.column-out {
  animation-name: fadeOutLeft;
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-20%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

@media (max-width: 1000px) {
  .column-1 {
    display: none;
  }
  .column-in {
    min-height: 580px;
    max-height: 580px;
  }
  .pruebe {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
