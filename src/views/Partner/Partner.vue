<template>
  <div class="pa-5">
    <h2>Đối tác</h2>
    <Table :listPartners="listPartners" />
    <template>
      <v-btn v-if="funcPartner" class="mt-5" color="primary" @click="dialog = !dialog">
        Thêm đối tác
      </v-btn>
    </template>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Thêm mới đối tác
        </v-card-title>
        <AddPartner />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as permission from "../../permission/checkPermission";
import Table from "./table/Table.vue";
import * as partner from "../../api/partner/partner";
import AddPartner from "./AddPartner.vue";
export default {
  data() {
    return {
      listPartners: [],
      dialog: false,
      funcPartner : false
    };
  },
  components: {
    Table,
    AddPartner,
  },
  async mounted() {
    this.getPartner();
    const role = await permission.checkPermission();
    console.log(role);
    if (role == 0) {
      this.funcPartner = true;
    } else {
      this.funcPartner = false;
    }
  },
  methods: {
    async getPartner() {
      const data = await partner.getPartner();
      this.listPartners = data;
    },
    addPartner() {},
  },
};
</script>

<style>
</style>