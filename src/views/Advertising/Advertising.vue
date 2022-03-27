<template>
  <div style="height: 90vh">
    <h2>Hệ thống giới thiệu</h2>
    <v-container class="mt-5" fluid>
      <v-row class="d-flex justify-space-between">
        <v-col cols="2" class="pa-0 mr-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                @click="CoppyText()"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-sitemap </v-icon>
                Link giới thiệu của bạn
              </v-btn>
            </template>
            <span
              >Coppy link giới thiệu của bạn và gửi cho người khác để đăng
              kí</span
            >
          </v-tooltip>
        </v-col>
        <v-col cols="5" class="pa-0 d-flex align-center ml-5">
          <a target="_blank" :href="link_ads" id="link-Ads" class="mx-5">{{
            link_ads
          }}</a>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-5" fluid>
      <v-row class="d-flex justify-space-between pl-5 pr-5">
        <h2>Danh sách các user bạn đã giới thiệu</h2>
        <div class="d-flex">
          <div class="mr-6 d-flex align-center">
             <v-btn class="d-flex align-center" @click="posterity()">
            Xem thu nhập năm
            <v-icon class="sizes-small ml-3">mdi-cash-multiple</v-icon>
          </v-btn>
          </div>
           <div>
            <v-btn class="d-flex align-center" @click="getRankUser()">
              Xem xếp hạng
              <v-icon class="ml-3 sizes-small">mdi-chevron-triple-up</v-icon>
            </v-btn>
          </div>
        </div>
      </v-row>
      <v-row>
        <v-row class="pa-5 table_ads">
          <UserTable :posterity="allPosterity" />
        </v-row>
      </v-row>
    </v-container>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>
<script>
import UserTable from "./table/UserTable.vue";
import * as convertId from "../../function/converIdUser";
import * as getPosterity from "../../api/user/getListF0";
import * as rank from "../../api/statistic/rankUser";

export default {
  data() {
    return {
      loading: false,
      idUser: "",
      allPosterity: [],
      link_ads: "",
    };
  },
  async mounted() {
    this.idUser = await convertId.convertId(sessionStorage.getItem("IdUser"));
    await this.posterity();
    this.link_ads = "http://3tmmo.com/register/" + this.idUser;
  },
  components: {
    UserTable,
  },
  methods: {
    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand("copy") ? res() : rej();
          textArea.remove();
        });
      }
    },
    async CoppyText() {
      await this.copyToClipboard(this.link_ads);
      alert("coppy thành công");
    },
    async posterity() {
      this.loading = true;
      const year = new Date().getFullYear();
      var currentYear = new Date(year, 0, 1);
      currentYear.setHours(7, 0, 0, 0);
      const saleTime = currentYear.toISOString();
      (this.allPosterity = await getPosterity.getPosterity(
        this.idUser,
        saleTime
      )),
        (this.loading = false);
    },
    async getRankUser() {
      this.loading = true;
      const year = new Date().getFullYear();
      var currentYear = new Date(year, 0, 1);
      currentYear.setHours(7, 0, 0, 0);
      const saleTime = currentYear.toISOString();
      var emptyArr = [];
      const dataUser = this.allPosterity;
      const datatest = await rank.getRank(saleTime);
      for (let i = 0; i < dataUser.length; i++) {
        for (let j = 0; j < datatest.length; j++) {
          if (dataUser[i].id == datatest[j].utm_source) {
            const objEmty = {};
            objEmty.id = dataUser[i].id;
            objEmty.username = dataUser[i].username;
            objEmty.name = dataUser[i].name;
            objEmty.rank = j+1;
            emptyArr.push(objEmty);
          }
        }
      }
      this.allPosterity = emptyArr;

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.table_ads > div {
  width: 100%;
}

#link-Ads {
  margin: 0;
  font-size: 1.5rem;
  color: #6569db;
  text-decoration: underline;
}
</style>
