<template>
  <div class="hozi-menu">
    <v-container fluid>
      <v-row class="align-center justify-content-between">
        <v-col class="pd-0" cols="12" sm="6" md="2">
          <v-icon aria-hidden="false"> mdi-arrow-collapse-horizontal</v-icon>
          <span>Dashboard</span>
        </v-col>
        <v-col class="pd-0" cols="6" md="4">
          <div class="search__bar">
            <v-text-field
              height="30px"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="pd-0" cols="6" md="6">
          <div
            class="user_right-menu d-flex justify-end align-center"
          >
            <div class="user_name">
              <p>
                Xin chào:
                <span class="purple--text">{{userName}} - {{ userId }}</span>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import * as user from "../api/user/getInforUser";
import * as convertId from "../function/converIdUser"
export default {
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      userName: "",
      userId:""
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const response  = await user.getInfoUser(sessionStorage.getItem("IdUser"));
      this.userName = response.data.name
      this.userId = convertId.convertId(sessionStorage.getItem("IdUser"));
    },
  },
};
</script>

<style lang="scss" scoped>
.hozi-menu
{
  padding: 0 50px;

}
span {
  font-size: 1rem;
}
i {
  margin-right: 0.5rem;
}
.user_name {
  p {
    margin: 0 2rem;
    font-size: 1rem;
  }
  span {
    font-weight: 900;
  }
}
</style>