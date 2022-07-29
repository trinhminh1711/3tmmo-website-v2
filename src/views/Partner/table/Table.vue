<template>
  <v-card class="table__partner pa-5 mt-5">
    <h2>Danh sách đối tác</h2>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Tìm kiếm đối tác"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Tên đối tác</th>
            <th class="text-left">Đường dẫn</th>
            <th class="text-left">Hoa hồng</th>
            <th class="text-left">Kí hiệu</th>
            <th v-if="showAdmin" class="text-left">Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody class="list">
          <tr v-for="(partner, index) in listPartners" :key="index">
            <td>{{ (partner.name_public!=null)?partner.name_public:partner.name}}</td>
            <td style="max-width: 700px; padding: 1rem; overflow: hidden">
              {{ partner.redirect_link }}
            </td>
            <td>{{ partner.unit_price.toLocaleString(undefined, {maximumFractionDigits: 0}) }}</td>
            <td style="max-width: 450px;">{{ partner.sign }}</td>
            <td
              v-if="showAdmin"
              class="pointer"
              @click="updateSelected(partner)"
            >
              Edit
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="d-flex save-comission"></div>
    <div class="text-center">
      <v-dialog v-model="dialog" width="1100">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Sửa thông tin đối tác
          </v-card-title>
          <EditTable :partnerEdit="partnerEdit" />
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>
<script>
import EditTable from "./EditTable.vue";
import * as permission from "../../../permission/checkPermission";
export default {
  props: ["listPartners"],
  components: {
    EditTable,
  },
  data() {
    return {
      showAdmin: false,
      partnerEdit: "",
      search: "",
      dialog: false,
      saveBtn: true,
      hidenEditCommission: false,
    };
  },
  async mounted() {
    const permision = await permission.checkPermission();
    console.log(permision);
    if (permision == 0) {
      this.showAdmin = true;
    } else {
      this.showAdmin = false;
    }
  },
  methods: {
    updateSelected(selectedItem) {
      this.dialog = true;
      this.partnerEdit = selectedItem;
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  .item-btn {
    background: transparent;
    i {
      font-size: 1rem;
    }
    &::before {
      display: none;
    }
  }
  .item {
    input {
      border: solid 1px;
      margin-left: 1rem;
      transition: 0.5s ease-in-out;
      padding: 0 0.5rem;
    }
    .hiden {
      display: none;
    }
    .show {
      display: flex;
    }
  }
}
.save-comission {
  display: flex;
  justify-content: right;
  width: 100%;
  margin-top: 1rem;
}
.btn-save {
  text-align: right;
}
.pointer {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
