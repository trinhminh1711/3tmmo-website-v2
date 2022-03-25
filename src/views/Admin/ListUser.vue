<template>
  <v-card style="height: 80vh">
    <v-card-title>
      Danh sách user
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="desserts" :search="search">
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-5" small @click="deleteUser(item)">
          mdi-delete
        </v-icon>
        <v-icon small @click="viewDetailUser(item)"> mdi-eye </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="showDetail" width="1000">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Thông tin cá nhân user
        </v-card-title>
        <ViewDetail :infoDetailUser="infoDetailUser" />
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-dialog v-model="dialogDelete" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            Đồng ý xóa {{ userId }}
            <p style="font-size: 0.8rem">
              Thao tác này sẽ xóa tất cả dữ liệu của user
            </p>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogDelete = false">
              Hủy bỏ
            </v-btn>
            <v-btn color="green darken-1" text @click="deleteRequest()">
              Tiếp tục
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <div class="fixed right">
      <v-alert
        class="opactiy-fadeout"
        v-if="deleteTrue"
        dense
        text
        type="success"
      >
        Xóa thành công user
      </v-alert>
      <v-alert v-if="deleteFalse" dense outlined type="error">
        Thao tác lỗi , vui lòng thử lại
      </v-alert>
    </div>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </v-card>
</template>

<script>
import * as convertId from "../../function/converIdUser";
import * as user from "../../api/user/getAllUser";
import * as deleteUser from "../../api/user/deleteUser";
import ViewDetail from "./ViewDetailUser.vue";
export default {
  components: { ViewDetail },
  data() {
    return {
      infoDetailUser: "",
      showDetail: false,
      loading: false,
      dialogDelete: false,
      deleteTrue: false,
      deleteFalse: false,
      search: "",
      id: "",
      userId: "",
      headers: [
        {
          text: "Mã user",
          align: "start",
          sortable: false,
          value: "id_convert",
        },
        { text: "Username", value: "username" },
        { text: "Quyền tài khoản", value: "role" },
        { text: "Họ và tên", value: "name" },
        { text: "User quản lý", value: "parent_id" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
    };
  },
  async mounted() {
    this.loading = true;
    const listUserRes = await user.getAllUser();
    this.loading = false;
    this.desserts = listUserRes;
  },
  methods: {
    deleteUser(item) {
      this.id = item.id;
      this.userId = convertId.convertId(item.user_id);
      this.dialogDelete = true;
    },
    viewDetailUser(item) {
      this.infoDetailUser = item;
      this.showDetail = true;
    },

    async deleteRequest() {
      this.dialogDelete = false;
      const deleteRes = await deleteUser.deleteUser(this.id);
      if (deleteRes.delete) {
        this.deleteFalse = false;
        this.deleteTrue = true;
        setTimeout(
          function () {
            this.deleteTrue = false;
            location.reload();
          }.bind(this),
          2000
        );
      } else {
        this.deleteFalse = true;
        this.deleteTrue = false;
        setTimeout(
          function () {
            this.deleteFalse = false;
            location.reload();
          }.bind(this),
          2000
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
}
.right {
  right: 2%;
  bottom: 10%;
}
</style>