<template>
  <div class="pa-5">
    <h2 class="mt-5 mb-5">Đổi mật khẩu</h2>
    <v-row>
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
      @click="checkNewPassword"
      depressed
      color="primary"
    >
      <v-icon>mdi-check</v-icon>
      Lưu thay đổi
    </v-btn>
    <v-alert
      v-if="error"
      border="right"
      colored-border
      type="error"
      elevation="2"
    >
      Mật khẩu không khớp
    </v-alert>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>

<script>
import * as password from "../../api/user/password";
export default {
  props: ["userId"],
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
    async checkNewPassword() {
      if (this.newUpdate != this.newPass) {
        this.error = true;
      } else {
        this.error = false;
        await this.updatePassword(this.userId);
      }
    },
    async updatePassword(id) {
      this.loading = true;
      var updatePass = await password.updatePassword(id, this.newPass);
      this.loading = false;
      if (updatePass) {
        alert("Đổi mật khẩu thành công . Vui lòng đăng nhập lại");
        sessionStorage.clear();
        sessionStorage.setItem("loginStatus", 0);
        this.$router.push({ path: "/login" });
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>