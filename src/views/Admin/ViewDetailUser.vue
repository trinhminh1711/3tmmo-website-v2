<template>
  <div>
    <v-list>
      <v-list-item-group>
        <v-container>
          <v-row>
            <v-col>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    >User Name :
                    {{ infoDetailUser.username }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-lock</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    >Mật khẩu : {{ infoDetailUser.password }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-cake-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Ngày sinh :
                    {{ infoDetailUser.birthday }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Giới tính : {{ infoDetailUser.sex }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-map-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Địa chỉ :
                    {{ infoDetailUser.sub_district }} -
                    {{ infoDetailUser.district }} -
                    {{ infoDetailUser.city }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-bank</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Thông tin tài khoản ngân hàng :
                    {{ infoDetailUser.bank_account_name }} -
                    {{ infoDetailUser.bank_account_number }} -
                    {{ infoDetailUser.bank_name }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-btn
                v-if="!editPass"
                @click="showEditPassword"
                class="mt-5 ml-4"
                depressed
                color="error"
              >
                Đổi mật khẩu
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-list-item-group>
    </v-list>
    <EditPassword :userId="infoDetailUser.id" v-if="editPass" />
  </div>
</template>

<script>
import EditPassword from "./EditPasswordUser.vue";
export default {
  data() {
    return {
      editPass: false,
    };
  },
  methods: {
    showEditPassword() {
      this.editPass = true;
    },
  },
  props: ["infoDetailUser"],
  components: {
    EditPassword,
  },
  mounted() {
    console.log(this.infoDetailUser);
  },
};
</script>

<style>
</style>