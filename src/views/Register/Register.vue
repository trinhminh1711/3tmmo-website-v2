<template>
  <div>
    <form class="register-wrapper">
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="6">
            <h2>Đăng kí tài khoản</h2>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="username"
              :counter="20"
              label="Tên đăng nhập"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Mật khẩu"
              required
            ></v-text-field>
            <v-text-field
              v-model="rePassword"
              label="Nhập lại mật khẩu"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="name"
              :counter="20"
              label="Họ và tên"
              required
            ></v-text-field>
            <v-text-field
              v-model="birthday"
              label="Ngày sinh"
              required
            ></v-text-field>
            <v-select
              v-model="sex"
              :items="items"
              label="Giới tính"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="sub_district"
              label="Xã / Phường"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="district"
              label="Quận / Huyện"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="city"
              label="Tỉnh / Thành phố"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="6">
            <h2>Thông tin tài khoản ngân hàng</h2>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="bank_name"
              label="Tên ngân hàng"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="bank_account_number"
              label="Số tài khoản"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              class="white--text"
              v-model="bank_account_name"
              label="Chủ tài khoản"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="6">
            <v-checkbox
              v-model="checkbox"
              :error-messages="checkboxErrors"
              label="Xác nhận đăng kí?"
              required
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="6">
            <div class="d-flex">
              <v-btn color="primary" class="mr-4" @click="submit">
                Đăng kí
              </v-btn>
              <v-btn @click="clear"> Xóa </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import * as register from "../../api/user/register";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  mounted() {},
  data: () => ({
    //thông tin đăng nhập
    username: "",
    password: "",
    rePassword: "",
    // thông tin cá nhân
    name: "",
    birthday: "",
    sub_district: "",
    district: "",
    city: "",
    sex: null,
    items: ["Nam", "Nữ", "Khác"],
    //thông tin tài khoản
    bank_name: "",
    bank_account_name: "",
    bank_account_number: "",
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
  },

  methods: {
    async register() {
      var registerSend = await register.Register(
        this.username,
        this.password,
        this.name,
        this.birthday,
        this.sex,
        this.sub_district,
        this.district,
        this.city,
        this.bank_account_name,
        this.bank_account_number,
        this.bank_name,
        this.$route.params.id
      );
      if (registerSend) {
        alert("Đăng kí thành công ");
        this.redirect();
      } else {
        alert("Tên đăng nhập đã tồn tại ! Vui lòng thử lại");
      }
    },

    redirect() {
      this.$router.push({ path: "/login" });
    },
    submit() {
      this.$v.$touch();
      if (this.checkbox == true) {
        this.register();
      }
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
      this.rePassword = "";
      // thông tin cá nhân
      this.name = "";
      this.birthday = "";
      this.sub_district = "";
      this.district = "";
      this.city = "";
      this.sex = null;
      this.items = ["Nam", "Nữ", "Khác"];
      //thông tin tài khoản
      this.bank_name = "";
      this.bank_account_name = "";
      this.bank_account_number = "";
      this.select = null;
      this.checkbox = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.register-wrapper {
  height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(239, 239, 247, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  background-size: 110% 110%;
  background-position: center center;
  animation: shrink 5s infinite alternate;
}
@keyframes shrink {
  0% {
    background-size: 110% 110%;
  }
  100% {
    background-size: 100% 100%;
  }
}
</style>