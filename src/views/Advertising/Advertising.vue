<template>
  <div style="height: 90vh">
    <h2>Hệ thống giới thiệu</h2>
    <v-container class="mt-5">
      <v-row>
        <v-col cols="3" class="pa-0">
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
        <v-col cols="6" class="pa-0">
          <a target="_blank" :href="link_ads" id="link-Ads" class="mx-5">{{
            link_ads
          }}</a>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <h2 class="mt-5">Danh sách các user bạn đã giới thiệu</h2>
      <v-row>
        <v-row class="mt-5 pa-5 table_ads">
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
    async CoppyText()
    {
      await this.copyToClipboard(this.link_ads);
      alert("coppy thành công");
    },
    async posterity() {
      this.loading = true;
      this.allPosterity = await getPosterity.getPosterity(this.idUser);
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
