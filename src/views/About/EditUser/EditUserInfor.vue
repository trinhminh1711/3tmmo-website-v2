<template>
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Sửa thông tin tài khoản
    </v-card-title>
    <v-container>
      <v-row>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Mã User']"
            label="Mã user"
            clearable
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Họ và tên']"
            label="Họ và tên"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Ngày sinh']"
            label="Ngày sinh"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Giới tính']"
            label="Giới tính"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Địa chỉ']"
            label="Địa chỉ"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <h2 class="mt-5">Thông tin tài khoản ngân hàng</h2>
      <v-row class="mt-5">
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Chủ tài khoản']"
            label="Chủ tài khoản"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Số tài khoản']"
            label="Số tài khoản"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="4" sm="6" md="4">
          <v-text-field
            v-model="infoUser['Ngân hàng']"
            label="Ngân hàng"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn class="mt-2" @click="updateInfo()" color="success">
        <v-icon> mdi-file-check</v-icon> Lưu thay đổi</v-btn
      >
    </v-container>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </v-card>
</template>
<script>
import * as user from "../../../api/user/updateInfoUser";
export default {
  props: ["infoUser"],
  data() {
    return {
      dialog: false,
      hidenInput: false,
      is: true,
      loading : false
    };
  },
  methods: {
    async updateInfo() {
      this.loading = true;
      const update = await user.changeInfo(
        sessionStorage.getItem("IdUser"),
        this.infoUser["Họ và tên"],
        this.infoUser["Ngày sinh"],
        this.infoUser["Giới tính"], 
        this.infoUser["Chủ tài khoản"],
        this.infoUser["Số tài khoản"],
        this.infoUser["Ngân hàng"]
      );
        this.loading = false;
      if (update) {
        alert("Update thông tin thành công");
      } else {
        alert("Xảy ra lỗi ! Vui lòng thử lại");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input--disable {
  border: dashed 1px #d0d6d6 !important;
}
.form__edit--submit {
  font-size: 0.8rem;
  display: block;
  margin-left: 1rem;
  margin-top: 1rem;
}
.form__edit label,
label {
  width: 20%;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0 0.5rem;
}
.form__edit input {
  align-items: center;
  border: solid 1px;
  border-radius: 10x;
  width: 100%;
  padding: 0 1rem;
}
</style>