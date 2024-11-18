<template>
  <q-card class="q-ma-sm text-center">
    <div class="q-pt-md text-h5 text-bold">U.E.C.A.M Personal</div>
    <q-separator inset />
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        grid
        title="Personal"
        :rows="personal"
        :columns="columns"
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
            <PersonalComponent :userData="props.row" />
          </div>
        </template>
      </q-table>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import PersonalComponent from "src/components/control/PersonalComponent.vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

const columns = [
  { name: "Name", label: "Name", field: "name", sortable: true, align: "left" },
  {
    name: "Crated Date",
    label: "Crated Date",
    field: "Crated_Date",
    sortable: true,
    align: "left",
  },
  {
    name: "Project",
    label: "Project",
    field: "Project",
    sortable: true,
    align: "left",
  },
  {
    name: "Action",
    label: "",
    field: "Action",
    sortable: false,
    align: "center",
  },
];

export default defineComponent({
  name: "PersonalPage",
  components: { PersonalComponent },
  setup() {
    const personal = ref([]);
    const $q = useQuasar();
    const myUser = $q.sessionStorage.getItem("DataUser");

    onMounted(() => {
      getPersonal();
    });

    const getPersonal = async () => {
      const { data } = await api.get("/users");
      personal.value = data.filter((element) => {
        return (
          element.email !== "Admin@Admin.com" &&
          element.email !== myUser.theUser.email
        );
      });
    };
    return {
      personal,
      filter: ref(""),
      columns,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
});
</script>
