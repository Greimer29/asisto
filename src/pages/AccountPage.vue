<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-8 col-xs-12 col-sm-12">
        <q-card class="no-shadow" bordered>
          <q-card-section
            class="text-center bg-dark"
            style="min-height: 100px; max-height: 150px"
          >
            <q-avatar
              size="130px"
              style="top: 80px; cursor: pointer; background-color: aliceblue"
              class="avatar absolute-center shadow-10"
              @click="editAvatar = true"
            >
              <q-img
                v-if="!user.urlImg"
                style="max-width: 130px"
                src="../../public/icons/user-profile-icon-free-vector.jpg"
              />
              <q-img
                v-if="user.urlImg"
                style="max-width: 130px"
                :src="`http://localhost:3333/users/uploads/${user.urlImg}`"
              />
            </q-avatar>
          </q-card-section>
          <q-card-section class="q-mt-md text-center">
            <div class="text-h5 q-mt-md">
              {{ user.name }} {{ user.lastName }}
            </div>
            <div class="text-subtitle2">{{ user.rol }}</div>
          </q-card-section>
        </q-card>
        <q-dialog v-model="editAvatar">
          <q-card>
            <q-card-section>
              <div class="text-center text-h6 text-bold">
                Cambiar imagen de perfil
                <q-separator></q-separator>
              </div>
            </q-card-section>
            <q-card-section>
              <q-uploader
                :multiple="false"
                url="http://localhost:3333/users/upload"
                accept=".png, .jpeg, .jpg, image/*"
                field-name="avatar"
                @uploaded="handleUpload"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
      <div class="col-lg-6 col-md-4 col-xs-12 col-sm-12">
        <q-card class="card-bg no-shadow" bordered>
          <q-card-section class="text-h6 q-pb-none flex">
            <div class="text-h6">Editar Perfil</div>
            <q-space></q-space>
            <q-toggle v-model="editProfile" />
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    :readonly="!editProfile"
                    dense
                    v-model="user.name"
                    label="Nombre"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    :readonly="!editProfile"
                    dense
                    v-model="user.lastName"
                    label="Apellido"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    :readonly="!editProfile"
                    autogrow
                    dense
                    v-model="user.ci"
                    label="Cedula"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    :readonly="!editProfile"
                    dense
                    v-model="user.bornDate"
                    label="Fecha de nacimiento"
                    mask="date"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="user.bornDate">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    :readonly="!editProfile"
                    autogrow
                    dense
                    v-model="user.phone"
                    label="Telefono"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-select
                    :readonly="!editProfile"
                    dense
                    :options="religionOp"
                    v-model="user.religion"
                    label="Religion"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              v-show="editProfile"
              color="primary"
              @click="updateUser(user)"
            >
              Actualizar
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-lg-6 col-md-4 col-xs-12 col-sm-12">
        <q-card class="card-bg text- no-shadow" bordered>
          <q-card-section class="text-h6 q-pa-sm flex">
            <div class="text-h6">Cambiar credenciales</div>
            <q-space></q-space>
            <q-toggle v-model="changeCredentials" />
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  :readonly="!changeCredentials"
                  dense
                  v-model="user.email"
                  label="Email"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  :readonly="!changeCredentials"
                  type="password"
                  dense
                  v-model="user.password"
                  label="New Password"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              v-show="changeCredentials"
              color="primary"
              @click="sendNewCredentials(user.email, user.password)"
            >
              Enviar
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";

const religionOp = [
  "Adventista",
  "Mormon",
  "Catolic@",
  "Evangelic@",
  "Judi@",
  "Cristian@",
  "Ate@",
];

export default defineComponent({
  name: "UserProfile",
  setup() {
    const $q = useQuasar();
    const user = ref($q.sessionStorage.getItem("DataUser"));
    console.log(user.value);
    const editAvatar = ref(false);
    const userAvatar = ref(null);

    const handleUpload = (info) => {
      if (info.xhr.response) {
        userAvatar.value = info.xhr.response;
        updateUser(user.value);
      }
    };

    const updateUser = async (user) => {
      if (userAvatar.value) {
        user.urlImg = `users/${userAvatar.value}`;
      }
      try {
        const { data } = await api.patch(`users/${user.id}`, { user });
        $q.sessionStorage.set("DataUser", data);
        $q.notify({
          message: "Perfil editado exitosamente",
          position: "top-right",
          color: "positive",
        });
        window.location.reload();
      } catch (error) {
        $q.notify({
          message: error,
          color: "negative",
        });
      }
    };

    const sendNewCredentials = async (email, password) => {
      const { data } = await api.patch(`users/${user.value.id}`, {
        user: { email, password },
      });
      if (data) {
        console.log(data);
        $q.notify({
          message: "Credenciales guardadas exitosamente",
          position: "top-right",
          color: "positive",
        });
      } else {
        $q.notify({
          message: "Ocurrio un error inesperado",
          color: "negative",
        });
      }
    };

    return {
      user,
      religionOp,
      editProfile: ref(false),
      changeCredentials: ref(false),
      editAvatar,
      updateUser,
      sendNewCredentials,
      handleUpload,
    };
  },
});
</script>
<style scoped>
.avatar:hover {
  background-color: rgb(140, 179, 213);
  box-shadow: 1px 1px 50px 2px;
}
</style>
