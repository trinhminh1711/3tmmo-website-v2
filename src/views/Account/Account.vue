<template>
  <div style="height:80vh">
    <div class="d-flex align-center justify-space-between">
      <h2>Danh sách tài khoản</h2>
      <v-btn depressed color="success" @click="addAction" class="my-5">
        Thêm mới
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th style="font-size:20px" class="text-left"></th>
            <th style="font-size:20px" class="text-left">
              Tên tài khoản
            </th>
            <th style="font-size:20px" class="text-left">
              API key
            </th>
            <th style="font-size:20px" class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in account" :key="index">
            <td v-for="(info, index) in item" :key="index">
              <p class="my-0" v-if="index != 'ID'">{{ info }}</p>
            </td>
            <td class="d-flex align-center justify-end">
              <v-btn @click="deleteAction(item.ID)" style="font-size:10px" depressed color="error mr-5">
                Xóa tài khoản
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="deletePopup" width="400">
      <v-card>
        <v-card-title class="text-h5">
          Bạn muốn xóa tài khoản ?
        </v-card-title>
        <v-card-text>
          Xóa tài khoản sẽ không ảnh hưởng đến các đơn hàng trước đó
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteAccount">
            Đồng ý
          </v-btn>

          <v-btn color="green darken-1" text @click="deletePopup = false">
            Hủy bỏ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="addPopup" width="700">
      <v-card class="px-5 py-5">
        <h2 class="text-h5 mb-4">
          Thêm tài khoản
        </h2>
        <div>
          <v-text-field
            label="Nhập API key"
            v-model="API_key"
            filled
            dense
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            label="Nhập Tên"
            v-model="username"
            filled
            dense
          ></v-text-field>
        </div>
        <v-btn
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          color="secondary"
          @click="addAccount"
        >
          Hoàn thành
        </v-btn>
        <v-alert
          v-if="showErrorValidate"
          border="right"
          colored-border
          type="error"
          elevation="2"
        >
          Có lỗi xảy ra , vui lòng kiểm tra lại
        </v-alert>
        <v-alert
          v-if="showErrorResponse"
          border="right"
          colored-border
          type="error"
          elevation="2"
        >
          Server không phản hồi
        </v-alert>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as account from "../../api/account/account";
export default {
  data() {
    return {
      account: [],
      deletePopup: false,
      addPopup: false,
      accountDelete: null,
      loader: null,
      loading: false,
      showErrorValidate: false,
      showErrorResponse: false,
      API_key: "",
      username: "",
    };
  },
  mounted() {
    this.getAllAccount();
  },
  methods: {
    getAllAccount: async function() {
      const data = await account.getAccount();
      const emtyArr = [];
      data.forEach((account) => {
        const emtyObj = {};
        emtyObj.ID = account.ID;
        emtyObj.name = account.username;
        emtyObj.key = account.API_key;
        emtyArr.push(emtyObj);
      });
      this.account = emtyArr;
    },
    deleteAction: function(id) {
      this.deletePopup = true;
      this.accountDelete = id;
    },
    addAction: function() {
      this.addPopup = true;
    },
    checkValidate: function() {
      if (this.API_key != "" || this.username != "") {
        return true;
      }
      return false;
    },
    addAccount: async function() {
      if (this.checkValidate()) {
        this.loading = true;
        const data = await account.addAccount(this.API_key, this.username);
        if (data) {
          this.loading = false;
        } else {
          this.showErrorResponse = true;
        }
        location.reload();
      } else {
        this.showErrorValidate = true;
        setTimeout(function() {
          location.reload();
        }, 1500);
      }
    },
    deleteAccount: async function() {
      const deleteRes = await account.deleteAccount(this.accountDelete);
      console.log(deleteRes);
      this.deletePopup = false;
      location.reload();
    },
  },
};
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
