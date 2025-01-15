<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">Personal</div>
    <q-separator inset />
    <div class="q-pa-md column-in">
      <q-table
        flat
        bordered
        grid
        title="Personal"
        :rows="personal"
        row-key="name"
        :filter="filter"
        hide-bottom
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card class="no-shadow q-ma-none" bordered>
              <q-card-section class="text-center">
                <q-avatar size="100px" class="shadow-10">
                  <img src="https://cdn.quasar.dev/img/avatar6.jpg" />
                </q-avatar>
              </q-card-section>

              <q-card-section class="q-pt-none text-center">
                <div class="text-h6 text-grey-8">
                  {{ props.row.name }} {{ props.row.lastName }}
                </div>
                <div class="text-caption text-grey-8">
                  {{ props.row.rol }}
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-left">
                <div class="text-subtitle1 text-grey-8">Permisos:</div>
                <q-separator />
                <div class="q-pt-sm q-gutter-sm">
                  <div
                    class="text-grey-10 flex justify-between"
                    style="font-size: medium"
                  >
                    {{ console.log(props.row) }}
                    Panel Administrativo
                    <span>
                      <q-btn
                        v-if="props.row.pass === 2 || props.row.pass === 3"
                        style="height: 4px"
                        label="Quitar"
                        color="primary"
                        dense
                        no-caps
                        @click="removePermise('admin', props.row)"
                      />
                      <q-btn
                        v-if="props.row.pass !== 2 && props.row.pass !== 3"
                        style="height: 4px"
                        label="Conceder"
                        color="primary"
                        dense
                        no-caps
                        @click="addPermise('admin', props.row)"
                      />
                    </span>
                  </div>
                  <div
                    class="text-subtitle3 text-grey-10 flex justify-between"
                    style="font-size: medium"
                  >
                    Control de Acceso
                    <span>
                      <q-btn
                        v-if="props.row.pass === 2 || props.row.pass === 4"
                        style="height: 4px"
                        label="Quitar"
                        color="primary"
                        dense
                        no-caps
                        @click="removePermise('control', props.row)"
                      />
                      <q-btn
                        v-if="props.row.pass !== 4 && props.row.pass !== 2"
                        style="height: 4px"
                        label="Conceder"
                        color="primary"
                        dense
                        no-caps
                        @click="addPermise('control', props.row)"
                      />
                    </span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-card>
</template>
<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const MyUserData = $q.sessionStorage.getItem("DataUser");
const personal = ref([]);
const filter = ref("");
const pagination = ref({
  rowsPerPage: 0,
});

const getPersonal = async () => {
  const { data } = await api.get("/users");

  personal.value = data.filter((element) => {
    return (
      element.email !== "Admin@Admin.com" && element.email !== MyUserData.email
    );
  });
};

const removePermise = async (type, user) => {
  if (type === "control") {
    const pass = 3;
    const resp = await api.patch(`users/${user.id}`, { user: { pass } });
    console.log(resp);
  } else if (type === "admin") {
    const pass = 4;
    const resp = await api.patch(`users/${user.id}`, { user: { pass } });
    console.log(resp);
  }
  getPersonal();
};

const addPermise = async (type, user) => {
  if (type === "control" && user.pass === 3) {
    const pass = 2;
    const resp = await api.patch(`users/${user.id}`, { user: { pass } });
    console.log(resp);
  } else if (type === "admin" && user.pass === 4) {
    const pass = 2;
    const resp = await api.patch(`users/${user.id}`, { user: { pass } });
    console.log(resp);
  }
  getPersonal();
};

onMounted(async () => {
  getPersonal();
});
</script>
