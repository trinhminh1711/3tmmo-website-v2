<template>
  <div class="pa-5">
    <h2 class="mt-5 mb-5">Đổi mật khẩu</h2>
    <v-row>
      <v-col cols="4" sm="6" md="12">
        <label>Nhập mật khẩu cũ</label>
        <v-text-field
          v-model="oldPassword"
          placeholder="Mật khẩu cũ"
          outlined
          dense
          class="mt-4"
          :error-messages="error"
          type="password"
        ></v-text-field>
      </v-col>
      <v-col cols="4" sm="6" md="12">
        <label>Mật khẩu mới</label>
        <v-text-field
          v-model="newPass"
          placeholder="Mật khẩu mới"
          outlined
          dense
          class="mt-4"
          type="password"
          :error-messages="error2"
        ></v-text-field>
      </v-col>
      <v-col cols="4" sm="6" md="12">
        <label>Nhập lại mật khẩu</label>
        <v-text-field
          v-model="newUpdate"
          placeholder="Nhập lại mật khẩu"
          outlined
          type="password"
          dense
          class="mt-4"
          :error-messages="error2"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-btn
      class="form__edit--submit"
      @click="checkOldPasword"
      depressed
      color="primary"
    >
      <v-icon>mdi-check</v-icon>
      Lưu thay đổi
    </v-btn>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>

<script>
import * as password from "../../../api/user/password";
export default {
  data() {
    return {
      loading: false,
      oldPassword: "",
      error: null,
      error2: null,
      newUpdate: "",
      newPass: "",
    };
  },
  methods: {
    async checkOldPasword() {
      var resultCheck = await password.changePassword(
        sessionStorage.getItem("IdUser"),
        this.oldPassword
      );
      if (!resultCheck) {
        this.error = "Mật khẩu cũ không chính xác";
      } else {
        this.error = null;
        if (this.checkNewPassword()) {
          this.error2 = null;
          this.updatePassword();
        } else {
          this.error2 = "Mật khẩu không trùng khớp";
          return false;
        }
      }
    },
    checkNewPassword() {
      if (this.newUpdate != this.newPass) {
        return false;
      } else {
        this.error2 = null;
        return true;
      }
    },
    async updatePassword() {
      if (this.checkOldPasword) {
        this.loading = true;
        var updatePass = await password.updatePassword(
          sessionStorage.getItem("IdUser"),
          this.newPass
        );
        this.loading = false;
        if (updatePass) {
          alert("Đổi mật khẩu thành công . Vui lòng đăng nhập lại");
          sessionStorage.clear();
          sessionStorage.setItem("loginStatus", 0);
          this.$router.push({ path: "/login" });
        }
      } else {
        alert("Có lỗi xảy ra");
      }
    },
  },
};
</script>

<style>
</style>