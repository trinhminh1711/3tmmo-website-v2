<template>
  <div class="pa-5">
    <v-text-field
      v-model="namePartner"
      label="Tên đối tác"
      placeholder="Tên (Có phân biệt hoa thường . Vui lòng nhập chính xác )"
      outlined
      dense
      required
    ></v-text-field>
    <v-textarea
      v-model="linkPartner"
      background-color="grey lighten-2"
      placeholder="Nhập đường dẫn"
      color="cyan"
      label="Đường dẫn"
      required
    ></v-textarea>
    <v-text-field
      v-model="unitPricePartner"
      label="Đơn giá"
      placeholder="Đơn giá"
      outlined
      dense
      required
      type="number"
    ></v-text-field>
    <v-text-field
      v-model="percentagePartner"
      label="Tỷ lệ chia ( đơn vị % )"
      placeholder="10"
      outlined
      required
      dense
    ></v-text-field>
    <v-text-field
      v-model="signPartner"
      label="Kí hiệu"
      placeholder="Viết tắt"
      outlined
      required
      dense
    ></v-text-field>
    <p v-if="showError" class="color_error">{{ errorMessenger }}</p>
    <v-btn outlined @click="addPartner()" color="indigo"> Thêm mới </v-btn>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
    <div class="mt-5">
      <v-alert v-if="alertSuccess" dense text type="success">
        Thêm thành công
      </v-alert>
      <v-alert
        v-if="errorSuccess"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        Có lỗi xảy ra . Có thể đối tác đã tồn tại
      </v-alert>
    </div>
  </div>
</template>

<script>
import * as partner from "../../api/partner/partner";
export default {
  data() {
    return {
      alertSuccess: false,
      errorSuccess: false,
      loading: false,
      namePartner: "",
      percentagePartner: "",
      linkPartner: "",
      unitPricePartner: "",
      signPartner: "",
      errorMessenger: "Các trường không được để trống",
      showError: false,
    };
  },
  methods: {
    async addPartner() {
      if (this.checkForm()) {
        this.loading = true;
        const createPartner = await partner.addPartner(
          this.namePartner,
          this.linkPartner,
          this.unitPricePartner,
          this.signPartner,
          this.percentagePartner
        );
        console.log(createPartner);
        this.loading = false;
        if (createPartner.data.add) {
          this.alertSuccess = true;
          this.errorSuccess = false;
          setTimeout(
            function () {
              this.alertSuccess = false;
              location.reload();
            }.bind(this),
            1500
          );
        } else {
          this.errorSuccess = true;
          this.alertSuccess = false;
          setTimeout(
            function () {
              this.errorSuccess = false;
              location.reload();
            }.bind(this),
            1500
          );
        }
      }
    },
    checkForm() {
      if (
        this.namePartner == "" ||
        this.linkPartner == "" ||
        this.unitPricePartner == "" ||
        this.signPartner == "" ||
        this.percentagePartner == ""
      ) {
        this.showError = true;
        return false;
      } else {
        this.showError = false;
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.color_error {
  color: red;
  font-size: 0.8rem;
}
</style>