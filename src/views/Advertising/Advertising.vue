<template>
  <div style="height: 90vh">
    <h2 class="pl-5 pr-5">Hệ thống giới thiệu</h2>
    <v-container class="mt-5" fluid>
      <v-row class="d-flex justify-space-between px-3">
        <v-col cols="2" class="pa-0 mr-5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" @click="CoppyText()" dark v-bind="attrs" v-on="on">
                <v-icon left> mdi-sitemap </v-icon>
                Link giới thiệu của bạn
              </v-btn>
            </template>
            <span>Coppy link giới thiệu của bạn và gửi cho người khác để đăng kí</span>
          </v-tooltip>
        </v-col>
        <v-col cols="5" class="pa-0 d-flex justify-end align-center ml-5">
          <a target="_blank" :href="link_ads" id="link-Ads" class="mx-5">{{ link_ads }}</a>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-5" fluid>
      <v-row class="d-flex justify-space-between pl-5 pr-5">
        <h2>Danh sách các user bạn đã giới thiệu</h2>
        <div class="d-flex">
          <div class="mr-6 d-flex align-center">
            <v-btn class="d-flex align-center" @click="posterity(sinceTime, untilTime)">
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
      <v-row class="pl-5 pt-5">
        <div class="d-flex">
          <div>
            <v-select v-model="selectTime" hide-details class="pa-0 " :items="itemsTime" dense label="Thời gian" outlined></v-select>
          </div>
          <div v-if="showSelectDate" class="d-flex align-center">
            <div>
              <div @mouseover="selectSince = true" @mouseleave="selectSince = false" class="relative pl-4">
                <input disabled :placeholder="formatIsoTime(sinceDateShow)" class="input-type" type="text" />
                <svg class="icon-date" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.1867 12.4399C10.3845 12.4399 10.5778 12.3813 10.7423 12.2714C10.9067 12.1615 11.0349 12.0054 11.1106 11.8226C11.1863 11.6399 11.2061 11.4388 11.1675 11.2449C11.1289 11.0509 11.0337 10.8727 10.8938 10.7328C10.754 10.593 10.5758 10.4977 10.3818 10.4592C10.1878 10.4206 9.98675 10.4404 9.80402 10.5161C9.6213 10.5917 9.46512 10.7199 9.35524 10.8844C9.24536 11.0488 9.18671 11.2422 9.18671 11.4399C9.18671 11.7052 9.29206 11.9595 9.4796 12.147C9.66714 12.3346 9.92149 12.4399 10.1867 12.4399ZM15.1867 12.4399C15.3845 12.4399 15.5778 12.3813 15.7423 12.2714C15.9067 12.1615 16.0349 12.0054 16.1106 11.8226C16.1863 11.6399 16.2061 11.4388 16.1675 11.2449C16.1289 11.0509 16.0337 10.8727 15.8938 10.7328C15.754 10.593 15.5758 10.4977 15.3818 10.4592C15.1878 10.4206 14.9867 10.4404 14.804 10.5161C14.6213 10.5917 14.4651 10.7199 14.3552 10.8844C14.2454 11.0488 14.1867 11.2422 14.1867 11.4399C14.1867 11.7052 14.2921 11.9595 14.4796 12.147C14.6671 12.3346 14.9215 12.4399 15.1867 12.4399ZM10.1867 16.4399C10.3845 16.4399 10.5778 16.3813 10.7423 16.2714C10.9067 16.1615 11.0349 16.0054 11.1106 15.8226C11.1863 15.6399 11.2061 15.4388 11.1675 15.2449C11.1289 15.0509 11.0337 14.8727 10.8938 14.7328C10.754 14.593 10.5758 14.4977 10.3818 14.4592C10.1878 14.4206 9.98675 14.4404 9.80402 14.5161C9.6213 14.5917 9.46512 14.7199 9.35524 14.8844C9.24536 15.0488 9.18671 15.2422 9.18671 15.4399C9.18671 15.7052 9.29206 15.9595 9.4796 16.147C9.66714 16.3346 9.92149 16.4399 10.1867 16.4399ZM15.1867 16.4399C15.3845 16.4399 15.5778 16.3813 15.7423 16.2714C15.9067 16.1615 16.0349 16.0054 16.1106 15.8226C16.1863 15.6399 16.2061 15.4388 16.1675 15.2449C16.1289 15.0509 16.0337 14.8727 15.8938 14.7328C15.754 14.593 15.5758 14.4977 15.3818 14.4592C15.1878 14.4206 14.9867 14.4404 14.804 14.5161C14.6213 14.5917 14.4651 14.7199 14.3552 14.8844C14.2454 15.0488 14.1867 15.2422 14.1867 15.4399C14.1867 15.7052 14.2921 15.9595 14.4796 16.147C14.6671 16.3346 14.9215 16.4399 15.1867 16.4399ZM5.18671 12.4399C5.38449 12.4399 5.57783 12.3813 5.74228 12.2714C5.90673 12.1615 6.0349 12.0054 6.11059 11.8226C6.18627 11.6399 6.20608 11.4388 6.16749 11.2449C6.12891 11.0509 6.03367 10.8727 5.89381 10.7328C5.75396 10.593 5.57578 10.4977 5.3818 10.4592C5.18782 10.4206 4.98675 10.4404 4.80402 10.5161C4.6213 10.5917 4.46512 10.7199 4.35524 10.8844C4.24536 11.0488 4.18671 11.2422 4.18671 11.4399C4.18671 11.7052 4.29206 11.9595 4.4796 12.147C4.66714 12.3346 4.92149 12.4399 5.18671 12.4399ZM17.1867 2.43994H16.1867V1.43994C16.1867 1.17472 16.0814 0.920371 15.8938 0.732835C15.7063 0.545298 15.4519 0.439941 15.1867 0.439941C14.9215 0.439941 14.6671 0.545298 14.4796 0.732835C14.2921 0.920371 14.1867 1.17472 14.1867 1.43994V2.43994H6.18671V1.43994C6.18671 1.17472 6.08135 0.920371 5.89381 0.732835C5.70628 0.545298 5.45192 0.439941 5.18671 0.439941C4.92149 0.439941 4.66714 0.545298 4.4796 0.732835C4.29206 0.920371 4.18671 1.17472 4.18671 1.43994V2.43994H3.18671C2.39106 2.43994 1.628 2.75601 1.06539 3.31862C0.502777 3.88123 0.186707 4.64429 0.186707 5.43994V17.4399C0.186707 18.2356 0.502777 18.9987 1.06539 19.5613C1.628 20.1239 2.39106 20.4399 3.18671 20.4399H17.1867C17.9824 20.4399 18.7454 20.1239 19.308 19.5613C19.8706 18.9987 20.1867 18.2356 20.1867 17.4399V5.43994C20.1867 4.64429 19.8706 3.88123 19.308 3.31862C18.7454 2.75601 17.9824 2.43994 17.1867 2.43994ZM18.1867 17.4399C18.1867 17.7052 18.0814 17.9595 17.8938 18.147C17.7063 18.3346 17.4519 18.4399 17.1867 18.4399H3.18671C2.92149 18.4399 2.66714 18.3346 2.4796 18.147C2.29206 17.9595 2.18671 17.7052 2.18671 17.4399V8.43994H18.1867V17.4399ZM18.1867 6.43994H2.18671V5.43994C2.18671 5.17473 2.29206 4.92037 2.4796 4.73283C2.66714 4.5453 2.92149 4.43994 3.18671 4.43994H17.1867C17.4519 4.43994 17.7063 4.5453 17.8938 4.73283C18.0814 4.92037 18.1867 5.17473 18.1867 5.43994V6.43994ZM5.18671 16.4399C5.38449 16.4399 5.57783 16.3813 5.74228 16.2714C5.90673 16.1615 6.0349 16.0054 6.11059 15.8226C6.18627 15.6399 6.20608 15.4388 6.16749 15.2449C6.12891 15.0509 6.03367 14.8727 5.89381 14.7328C5.75396 14.593 5.57578 14.4977 5.3818 14.4592C5.18782 14.4206 4.98675 14.4404 4.80402 14.5161C4.6213 14.5917 4.46512 14.7199 4.35524 14.8844C4.24536 15.0488 4.18671 15.2422 4.18671 15.4399C4.18671 15.7052 4.29206 15.9595 4.4796 16.147C4.66714 16.3346 4.92149 16.4399 5.18671 16.4399Z"
                    fill="#8D8E92"
                  />
                </svg>
                <vc-date-picker class="absolute time-picker" @mouseover="selectSince = true" v-if="selectSince" v-model="sinceDateShow" mode="date" />
              </div>
            </div>
            <div @mouseover="selectUntil = true" @mouseleave="selectUntil = false" class="relative pl-4">
              <input disabled :placeholder="formatIsoTime(untilDateShow)" class="input-type" type="text" />
              <svg class="icon-date" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.1867 12.4399C10.3845 12.4399 10.5778 12.3813 10.7423 12.2714C10.9067 12.1615 11.0349 12.0054 11.1106 11.8226C11.1863 11.6399 11.2061 11.4388 11.1675 11.2449C11.1289 11.0509 11.0337 10.8727 10.8938 10.7328C10.754 10.593 10.5758 10.4977 10.3818 10.4592C10.1878 10.4206 9.98675 10.4404 9.80402 10.5161C9.6213 10.5917 9.46512 10.7199 9.35524 10.8844C9.24536 11.0488 9.18671 11.2422 9.18671 11.4399C9.18671 11.7052 9.29206 11.9595 9.4796 12.147C9.66714 12.3346 9.92149 12.4399 10.1867 12.4399ZM15.1867 12.4399C15.3845 12.4399 15.5778 12.3813 15.7423 12.2714C15.9067 12.1615 16.0349 12.0054 16.1106 11.8226C16.1863 11.6399 16.2061 11.4388 16.1675 11.2449C16.1289 11.0509 16.0337 10.8727 15.8938 10.7328C15.754 10.593 15.5758 10.4977 15.3818 10.4592C15.1878 10.4206 14.9867 10.4404 14.804 10.5161C14.6213 10.5917 14.4651 10.7199 14.3552 10.8844C14.2454 11.0488 14.1867 11.2422 14.1867 11.4399C14.1867 11.7052 14.2921 11.9595 14.4796 12.147C14.6671 12.3346 14.9215 12.4399 15.1867 12.4399ZM10.1867 16.4399C10.3845 16.4399 10.5778 16.3813 10.7423 16.2714C10.9067 16.1615 11.0349 16.0054 11.1106 15.8226C11.1863 15.6399 11.2061 15.4388 11.1675 15.2449C11.1289 15.0509 11.0337 14.8727 10.8938 14.7328C10.754 14.593 10.5758 14.4977 10.3818 14.4592C10.1878 14.4206 9.98675 14.4404 9.80402 14.5161C9.6213 14.5917 9.46512 14.7199 9.35524 14.8844C9.24536 15.0488 9.18671 15.2422 9.18671 15.4399C9.18671 15.7052 9.29206 15.9595 9.4796 16.147C9.66714 16.3346 9.92149 16.4399 10.1867 16.4399ZM15.1867 16.4399C15.3845 16.4399 15.5778 16.3813 15.7423 16.2714C15.9067 16.1615 16.0349 16.0054 16.1106 15.8226C16.1863 15.6399 16.2061 15.4388 16.1675 15.2449C16.1289 15.0509 16.0337 14.8727 15.8938 14.7328C15.754 14.593 15.5758 14.4977 15.3818 14.4592C15.1878 14.4206 14.9867 14.4404 14.804 14.5161C14.6213 14.5917 14.4651 14.7199 14.3552 14.8844C14.2454 15.0488 14.1867 15.2422 14.1867 15.4399C14.1867 15.7052 14.2921 15.9595 14.4796 16.147C14.6671 16.3346 14.9215 16.4399 15.1867 16.4399ZM5.18671 12.4399C5.38449 12.4399 5.57783 12.3813 5.74228 12.2714C5.90673 12.1615 6.0349 12.0054 6.11059 11.8226C6.18627 11.6399 6.20608 11.4388 6.16749 11.2449C6.12891 11.0509 6.03367 10.8727 5.89381 10.7328C5.75396 10.593 5.57578 10.4977 5.3818 10.4592C5.18782 10.4206 4.98675 10.4404 4.80402 10.5161C4.6213 10.5917 4.46512 10.7199 4.35524 10.8844C4.24536 11.0488 4.18671 11.2422 4.18671 11.4399C4.18671 11.7052 4.29206 11.9595 4.4796 12.147C4.66714 12.3346 4.92149 12.4399 5.18671 12.4399ZM17.1867 2.43994H16.1867V1.43994C16.1867 1.17472 16.0814 0.920371 15.8938 0.732835C15.7063 0.545298 15.4519 0.439941 15.1867 0.439941C14.9215 0.439941 14.6671 0.545298 14.4796 0.732835C14.2921 0.920371 14.1867 1.17472 14.1867 1.43994V2.43994H6.18671V1.43994C6.18671 1.17472 6.08135 0.920371 5.89381 0.732835C5.70628 0.545298 5.45192 0.439941 5.18671 0.439941C4.92149 0.439941 4.66714 0.545298 4.4796 0.732835C4.29206 0.920371 4.18671 1.17472 4.18671 1.43994V2.43994H3.18671C2.39106 2.43994 1.628 2.75601 1.06539 3.31862C0.502777 3.88123 0.186707 4.64429 0.186707 5.43994V17.4399C0.186707 18.2356 0.502777 18.9987 1.06539 19.5613C1.628 20.1239 2.39106 20.4399 3.18671 20.4399H17.1867C17.9824 20.4399 18.7454 20.1239 19.308 19.5613C19.8706 18.9987 20.1867 18.2356 20.1867 17.4399V5.43994C20.1867 4.64429 19.8706 3.88123 19.308 3.31862C18.7454 2.75601 17.9824 2.43994 17.1867 2.43994ZM18.1867 17.4399C18.1867 17.7052 18.0814 17.9595 17.8938 18.147C17.7063 18.3346 17.4519 18.4399 17.1867 18.4399H3.18671C2.92149 18.4399 2.66714 18.3346 2.4796 18.147C2.29206 17.9595 2.18671 17.7052 2.18671 17.4399V8.43994H18.1867V17.4399ZM18.1867 6.43994H2.18671V5.43994C2.18671 5.17473 2.29206 4.92037 2.4796 4.73283C2.66714 4.5453 2.92149 4.43994 3.18671 4.43994H17.1867C17.4519 4.43994 17.7063 4.5453 17.8938 4.73283C18.0814 4.92037 18.1867 5.17473 18.1867 5.43994V6.43994ZM5.18671 16.4399C5.38449 16.4399 5.57783 16.3813 5.74228 16.2714C5.90673 16.1615 6.0349 16.0054 6.11059 15.8226C6.18627 15.6399 6.20608 15.4388 6.16749 15.2449C6.12891 15.0509 6.03367 14.8727 5.89381 14.7328C5.75396 14.593 5.57578 14.4977 5.3818 14.4592C5.18782 14.4206 4.98675 14.4404 4.80402 14.5161C4.6213 14.5917 4.46512 14.7199 4.35524 14.8844C4.24536 15.0488 4.18671 15.2422 4.18671 15.4399C4.18671 15.7052 4.29206 15.9595 4.4796 16.147C4.66714 16.3346 4.92149 16.4399 5.18671 16.4399Z"
                  fill="#8D8E92"
                />
              </svg>
              <vc-date-picker class="absolute time-picker" @mouseover="selectUntil = true" v-if="selectUntil" v-model="untilDateShow" mode="date" />
            </div>
          </div>
        </div>
      </v-row>
      <v-row class="px-5 table_ads">
        <UserTable :posterity="allPosterity" />
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
      timeSelect: "",
      loading: false,
      idUser: "",
      allPosterity: [],
      link_ads: "",
      itemsTime: ["Hôm nay", "Hôm qua", "Tháng này", "Tháng trước", "Chọn thời gian"],
      selectTime: "",
      sinceTime: "",
      untilTime: "",
      showSelectDate: false,
      untilDateShow: new Date(),
      sinceDateShow: new Date(),
      selectSince: false,
      selectUntil: false,
    };
  },
  async created() {
    this.idUser = await convertId.convertId(sessionStorage.getItem("IdUser"));
    this.link_ads = "http://3tmmo.com/register/" + this.idUser;
    this.sinceTime = new Date(new Date().setHours(7, 0, 0, 0)).toISOString();
    this.untilTime = new Date(new Date().setHours(30, 59, 59, 999)).toISOString();
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
    async posterity(sinceTime, untilTime) {
      this.loading = true;
      (this.allPosterity = await getPosterity.getPosterity(this.idUser, sinceTime, untilTime)), (this.loading = false);
    },
    async getRankUser() {
      this.loading = true;
      // const year = new Date().getFullYear();
      // var currentYear = new Date(year, 0, 1);
      // currentYear.setHours(7, 0, 0, 0);
      // const saleTime = currentYear.toISOString();
      var emptyArr = [];
      const dataUser = this.allPosterity;
      const datatest = await rank.getRank(this.sinceTime , this.untilTime);
      for (let i = 0; i < dataUser.length; i++) {
        for (let j = 0; j < datatest.length; j++) {
          if (dataUser[i].id == datatest[j].utm_source) {
            const objEmty = {};
            objEmty.id = dataUser[i].id;
            objEmty.username = dataUser[i].username;
            objEmty.name = dataUser[i].name;
            objEmty.rank = j + 1;
            emptyArr.push(objEmty);
          }
        }
      }
      this.allPosterity = emptyArr;

      this.loading = false;
    },
    formatIsoTime(time) {
      return time ? "00:00:00 || " + time.toISOString().split("T")[0] : time;
    },
  },
  watch: {
    selectTime: function() {
      switch (this.selectTime) {
        case "Hôm nay": {
          this.sinceTime = new Date(new Date().setHours(7, 0, 0, 0)).toISOString();
          this.untilTime = new Date(new Date().setHours(30, 59, 59, 999)).toISOString();
          break;
        }
        case "Hôm qua": {
          var date = new Date();
          date.setDate(date.getDate() - 1);
          this.sinceTime = new Date(date.setHours(7, 0, 0, 0)).toISOString();
          this.untilTime = new Date(date.setHours(30, 59, 59, 999)).toISOString();
          break;
        }
        case "Tháng này": {
          this.sinceTime = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 7).toISOString();
          this.untilTime = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1, 7).toISOString();
          break;
        }
        case "Tháng trước": {
          this.sinceTime = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1, 7).toISOString();
          this.untilTime = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 7).toISOString();
          break;
        }
        case "Chọn thời gian": {
          this.showSelectDate = true;
          break;
        }
      }
    },
    untilDateShow: function() {
      this.untilDateShow.setUTCHours(0, 0, 0, 0);
      this.untilTime = this.untilDateShow.toISOString();
    },
    sinceDateShow: function() {
      this.sinceDateShow.setUTCHours(0, 0, 0, 0);
      this.sinceTime = this.sinceDateShow.toISOString();
    },
    sinceTime: function() {
      this.posterity(this.sinceTime, this.untilTime);
    },
    untilTime: function() {
      this.posterity(this.sinceTime, this.untilTime);
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
.relative {
  width: 300px;
  position: relative;
}
.time-picker {
  top: 100%;
  left: 15px;
  width: 95%;
}
.absolute {
  position: absolute;
}
.date__input {
  border: solid 1px;
  border-radius: 5px;
  padding: 0.4rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.height-full {
  min-height: 100vh;
  max-height: 100%;
}
.v-text-field__details {
  position: absolute !important;
}
.input-type {
  width: 100%;
  border-radius: 5px;
  background: #ffffff;
  opacity: 0.7;
  padding: 5px 20px;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
}
.input-type:hover,
.icon-date:hover {
  cursor: pointer;
}
.icon-date {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.bg-warning {
  background: #fb8c00;
  color: #fff;
  border-radius: 10px;
  padding: 0.7rem;
}
.bg-all {
  background: #2196f3;
  color: #fff;
  border-radius: 10px;
  padding: 0.7rem;
}
.bg-success {
  background: green;
  color: #fff;
  border-radius: 10px;
  padding: 0.7rem;
}
.bg-alert {
  background: #ffbc34;
  color: #fff;
  border-radius: 10px;
  padding: 0.7rem;
}
.bg-remove {
  background: red;
  color: #fff;
  border-radius: 10px;
  padding: 0.7rem;
}
</style>
