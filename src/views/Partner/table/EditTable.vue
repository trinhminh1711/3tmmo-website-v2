<template>
  <div class="pa-5">
    <p class="font-weight-light ml-2" style="opacity: 0.4">
      Tên đối tác
    </p>
    <v-text-field
      v-model="partnerEdit.name"
      class="pl-2"
      clearable
      solo
    ></v-text-field>
    <p class="font-weight-light ml-2" style="opacity: 0.4">
      Tên hiển thị
    </p>
    <v-text-field
      v-model="partnerEdit.name_public"
      class="pl-2"
      clearable
      solo
    ></v-text-field>
    <v-text-field
      v-model="partnerEdit.link"
      solo
      label="Đường dẫn"
      clearable
    ></v-text-field>
    <p class="font-weight-light ml-2" style="opacity: 0.4">
      Tỷ lệ hoa hồng tính bằng đơn vị VND
    </p>
    <v-text-field
      v-model="partnerEdit.unit_price"
      solo
      label="Hoa hồng (đơn vị VNĐ)"
      clearable
    ></v-text-field>
    <p class="font-weight-light ml-2" style="opacity: 0.4">
      Tỷ lệ hoa hồng tính bằng đơn vị %
    </p>
    <v-text-field
      v-model="partnerEdit.percentage"
      label="Tỷ lệ chia ( đơn vị % )"
      numbe
      required
      solo
      clearable
      type="number"
    ></v-text-field>
    <v-text-field
      v-model="partnerEdit.sign"
      solo
      label="Kí hiệu"
      clearable
    ></v-text-field>
    <v-alert border="bottom" colored-border type="warning" elevation="2">
      Lưu ý : Tỷ lệ hoa hồng khi chỉnh sửa sẽ chỉ được áp dụng cho các đơn hàng <strong style="color:red">từ 00h00 của ngày chỉnh sửa.</strong>
      Mặc định 40%
    </v-alert>
    <v-btn class="mt-2" @click="updatePartner()" color="success">
      <v-icon> mdi-file-check</v-icon> Lưu thay đổi</v-btn
    >
    <v-btn class="mt-2 ml-5" @click="deletePartner()" color="error">
      <v-icon> mdi-file-check</v-icon> Xóa đối tác</v-btn
    >
    <div>
      <v-dialog v-model="confirmDelete" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5"> Xác nhận xóa </v-card-title>
          <v-card-text
            >Xóa đối tác có thể ảnh hưởng đến kết quả thu nhập và hoa hồng
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="acceptDelete()">
              Xác nhận xóa
            </v-btn>
            <v-btn color="green darken-1" text @click="confirmDelete = false">
              Hủy bỏ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="mt-5">
      <v-alert v-if="alertSuccess" dense text type="success">
        Xóa thành công
      </v-alert>
      <v-alert
        v-if="errorSuccess"
        border="right"
        colored-border
        type="error"
        elevation="2"
      >
        Có lỗi xảy ra . Vui lòng thử lại
      </v-alert>
    </div>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>
<script>
import * as partner from "../../../api/partner/partner";
export default {
  props: ["partnerEdit"],
  data() {
    return {
      confirmDelete: false,
      alertSuccess: false,
      loading: false,
      errorSuccess: false,
    };
  },
  mounted() {
    console.log(this.partnerEdit);
  },
  methods: {
    async updatePartner() {
      this.loading = true;
      setTimeout(() =>  { alert("Update successful");  this.loading = false ; location.reload();}, 2000);
      await partner.updatePartner(
        this.partnerEdit.parent_id,
        this.partnerEdit.name,
        this.partnerEdit.name_public,
        this.partnerEdit.link,
        this.partnerEdit.unit_price,
        this.partnerEdit.sign,
        parseInt(this.partnerEdit.percentage)
      );
    },
    deletePartner() {
      this.confirmDelete = !this.confirmDelete;
    },
    async acceptDelete() {
      this.loading = true;
      this.confirmDelete = false;
      setTimeout(() =>  { alert("Đã xóa đối tác");  this.loading = false ; location.reload();}, 2000);
      await partner.deletePartner(this.partnerEdit.parent_id);
    },
  },
};
</script>
