<template>
  <div>
    <v-container class="user pa-5" fluid>
      <v-row class="mr-0">
        <v-col
          class="d-flex flex-column align-center border pd-0"
          cols="4"
          sm="6"
          md="3"
        >
          <div class="pa-2">
            <h2 class="text-center">Thông tin user</h2>
          </div>

          <div
            class="d-flex flex-column align-center box__avatar pd-0"
            cols="12"
            sm="6"
            md="3"
          >
            <v-avatar color="primary" size="56"></v-avatar>
            <div class="user_permission d-flex flex-column align-center">
              <p class="text-center">{{ role }}</p>
            </div>
          </div>
          <div class="user_contact d-flex flex-column">
            <p>
              <v-icon>mdi-map-marker-multiple</v-icon>
              {{ this.infoUser["Địa chỉ"] }}
            </p>
            <p>
              <v-icon>mdi-account-eye</v-icon> {{ this.infoUser["UserName"] }}
            </p>
            <hr />
            <p class="font-weight mt-2">Thông tin tài khoản ngân hàng</p>
            <p>
              <v-icon>mdi-bank</v-icon>
              {{ this.infoUser["Ngân hàng"] }}
            </p>
            <p>
              <v-icon>mdi-account</v-icon> {{ this.infoUser["Chủ tài khoản"] }}
            </p>
            <p>
              <v-icon>mdi-bank-transfer</v-icon>
              {{ this.infoUser["Số tài khoản"] }}
            </p>
          </div>
        </v-col>
        <v-col class="usr_info" cols="4" sm="6" md="9">
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-for="(info, property) in infoUser" :key="property">
                  <td>{{ property }}</td>
                  <td>{{ info }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-dialog v-model="editInfoUser" width="1200">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                tile
                color="success"
                class="mt-5"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-pencil </v-icon>
                Sửa thông tin tài khoản
              </v-btn>
            </template>
            <EditUserInfo :infoUser="infoUser" v-if="modalUserInfo" />
          </v-dialog>
          <v-dialog width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                tile
                color="primary"
                class="mt-5 ml-5"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-pencil </v-icon>
                Đổi mật khẩu
              </v-btn>
            </template>
            <v-card>
              <EditPassWord />
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>

<script>
import * as user from "../../api/user/getInforUser";
import EditUserInfo from "./EditUser/EditUserInfor.vue";
import EditPassWord from "./EditUser/EditPassword.vue";
import * as convertId from "../../function/converIdUser";
import * as permission from "../../permission/checkPermission";
export default {
  name: "About",
  components: {
    EditUserInfo,
    EditPassWord,
  },

  data: () => ({
    editInfoUser: "",
    editPassword: "",
    loading: false,
    modalUserInfo: true,
    role: "",
    infoUser: {
      "Mã User": "",
      UserName: "",
      "Họ và tên": "",
      "Ngày sinh": "",
      "Giới tính": "",
      "Địa chỉ": "",
      "Chủ tài khoản": "",
      "Số tài khoản": "",
      "Ngân hàng": "",
      "Quyền tài khoản": "",
    },
  }),
  async mounted() {
    this.getUserInfo();
    const role = await permission.checkPermission();
    console.log(role);
    if (role == 0) {
      this.role = "Admin";
    } else {
      this.role = "user";
    }
  },
  methods: {
    async getUserInfo() {
      this.loading = true;
      const response = await user.getInfoUser(sessionStorage.getItem("IdUser"));
      this.infoUser["Họ và tên"] = response.data.name;
      this.infoUser["UserName"] = response.data.username;
      this.infoUser["Ngày sinh"] = response.data.birthday;
      this.infoUser["Giới tính"] = response.data.sex;
      this.infoUser["Địa chỉ"] =
        response.data.sub_district +
        " - " +
        response.data.district +
        " - " +
        response.data.city;
      this.infoUser["Chủ tài khoản"] = response.data.bank_account_name;
      this.infoUser["Số tài khoản"] = response.data.bank_account_number;
      this.infoUser["Ngân hàng"] = response.data.bank_name;
      this.userId = convertId.convertId(sessionStorage.getItem("IdUser"));
      this.infoUser["Mã User"] = this.userId;
      this.infoUser["Quyền tài khoản"] = response.data.role;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
@import "./About";
.border {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 5px;
}
</style>
