<template>
  <div class="main px-5">
    <h2 class="mb-5">Tổng quan</h2>
    <hr />
    <v-container class="bg-white my-5">
      <p class="mr-0">Doanh số</p>
      <v-row class="d-flex justify-content-between revenue">
        <v-col class="pd-0 revenue-col revenue-year" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>Tổng doanh thu ngày</p>
              <p>{{ $store.state.salesDay.toLocaleString() }}</p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/coins.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-month" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>Tổng doanh thu tháng này</p>
              <p>{{ $store.state.salesMonth.toLocaleString() }}</p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/coins (1).png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-total" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>Tổng doanh thu tháng trước</p>
              <p>{{ $store.state.saleLastestMonth.toLocaleString() }}</p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/salary.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-day" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>Tổng doanh thu năm</p>
              <p>{{ $store.state.salesYear.toLocaleString() }}</p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/dollar.png" alt="" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="bg-white my-5">
      <p class="mr-0">Thống kê thứ hạng</p>
      <v-row class="d-flex justify-content-between revenue">
        <v-col class="pd-0 revenue-col revenue-year" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>Thứ hạng của bạn hôm qua</p>
              <p>{{ yourRankDay }}</p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/military-rank.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-month" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>Xếp hạng của bạn hôm nay</p>
              <p>{{ yourRankMonth }}</p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/ranking.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-day" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>User hạng cao nhất ngày hôm qua</p>
              <div style="white-space: nowrap;">{{ bestRankDay }} : {{ bestUserRankDay }} VNĐ</div>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/podium.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-total" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>User hạng cao nhất hôm nay ( tính đến hiện tại )</p>
              <div style=" white-space: nowrap;">{{ bestRankMonth }} : {{ bestUserRankMonth }} VNĐ</div>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/ranking-top-month.png" alt="" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>

<script>
import * as order from "../../api/statistic/order";
import * as convertId from "../../function/converIdUser";
import * as user from "../../api/user/getUserId";
export default {
  data() {
    return {
      salesDay: 0,
      yourRankDay: "Đang cập nhật ...",
      yourRankMonth: "Đang cập nhật ...",
      salesMonth: 0,
      salesYear: 0,
      saleLastestMonth: 0,
      loading: false,
      bestRankDay: "",
      bestUserRankDay: "Đang cập nhật ...",
      bestRankMonth: "",
      bestUserRankMonth: "Đang cập nhật ...",
    };
  },
  created: async function () {
    await this.getSalesMonthLast();
    console.log("minhtq");
  },
  async mounted() {
    this.loading = true;
    await this.getSalesDay();
    await this.getSalesMonth();
    this.loading = false;
    await this.getSalesYear();
    await this.getYesterdayUser();
    await this.getLastMonthUser();
  },
  methods: {
    async getSalesDay() {
      const sinceDate = new Date();
      const untilDate = new Date();
      sinceDate.setHours(7, 0, 0, 0);
      untilDate.setHours(30, 59, 59, 0);
      sinceDate.setDate(sinceDate.getDate() - 0);
      untilDate.setDate(untilDate.getDate() - 0);
      const since = sinceDate.toISOString();
      const until = untilDate.toISOString();
      const arrayRes = await order.getOrders(
        since,
        until,
        convertId.convertId(sessionStorage.getItem("IdUser"))
      );
      for (let i = 0; i < arrayRes.length; i++) {
        if (arrayRes[i].status == "Tạm duyệt") {
          this.salesDay = this.salesDay + arrayRes[i].commission;
        }
      }
      this.$store.state.salesDay = this.salesDay;
    },
    async getSalesMonth() {
      const sinceDate = new Date();
      const untilDate = new Date();
      sinceDate.setHours(7, 0, 0, 0);
      untilDate.setHours(30, 59, 59, 0);
      sinceDate.setDate(sinceDate.getDate() - sinceDate.getDate() + 1);
      untilDate.setDate(untilDate.getDate() - 0);
      const since = sinceDate.toISOString();
      const until = untilDate.toISOString();
      const arrayRes = await order.getOrders(
        since,
        until,
        convertId.convertId(sessionStorage.getItem("IdUser"))
      );
      for (let i = 0; i < arrayRes.length; i++) {
        if (arrayRes[i].status == "Tạm duyệt") {
          this.salesMonth = this.salesMonth + arrayRes[i].commission;
        }
      }
      this.$store.state.salesMonth = this.salesMonth;
    },

    async getSalesMonthLast() {
      var currentDate = new Date();
      var sinceDate = new Date();
      var untilDate = new Date();
      sinceDate.setDate(1);
      sinceDate.setMonth(sinceDate.getMonth() - 1);
      sinceDate.setHours(7, 0, 0, 0);
      untilDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      untilDate.setHours(30, 59, 59, 0);
      const since = sinceDate.toISOString();
      const until = untilDate.toISOString();
      const arrayRes = await order.getOrders(
        since,
        until,
        convertId.convertId(sessionStorage.getItem("IdUser"))
      );
      for (let i = 0; i < arrayRes.length; i++) {
        if (arrayRes[i].status == "Tạm duyệt") {
          this.saleLastestMonth =
            this.saleLastestMonth + arrayRes[i].commission;
        }
      }
      this.$store.state.saleLastestMonth = this.saleLastestMonth;
    },

    async getSalesYear() {
      const present = new Date();
      const presentMonth = present.getMonth();
      var sum = 0;
      for (let i = 0; i < presentMonth + 1; i++) {
        const sumMonth = await this.getSalesOnMonth(i);
        sum = sum + sumMonth;
      }
      this.salesYear = sum;
      this.$store.state.salesYear = this.salesYear;
    },
    async getSalesOnMonth(month) {
      const sinceDate = new Date();
      const untilDate = new Date();
      sinceDate.setHours(7, 0, 0, 0);
      untilDate.setHours(30, 59, 59, 0);
      sinceDate.setDate(1);
      untilDate.setDate(1);
      sinceDate.setMonth(month);
      untilDate.setMonth(month + 1);
      const since = sinceDate.toISOString();
      const until = untilDate.toISOString();
      const arrayRes = await order.getOrders(
        since,
        until,
        convertId.convertId(sessionStorage.getItem("IdUser"))
      );
      var total = 0;
      for (let i = 0; i < arrayRes.length; i++) {
        if (arrayRes[i].status == "Tạm duyệt") {
          total = total + arrayRes[i].commission;
        }
      }
      return total;
    },
    async getYesterdayUser() {
      const users = await user.getUserId();
      const arrIncomUser = [];
      for (let i = 0; i < users.length; i++) {
        const incomUser = {};
        incomUser.id = users[i];
        incomUser.total = await this.getIncomUserLastDay(users[i]);
        arrIncomUser.push(incomUser);
      }
      arrIncomUser.sort((a, b) => {
        return a.total - b.total;
      });
      arrIncomUser.reverse();
      this.getRankDay(arrIncomUser);
      this.bestRankDay = arrIncomUser[0].id;
      this.bestUserRankDay = arrIncomUser[0].total.toLocaleString();
    },
    async getLastMonthUser() {
      const users = await user.getUserId();
      const arrIncomUser = [];
      for (let i = 0; i < users.length; i++) {
        const incomUser = {};
        incomUser.id = users[i];
        incomUser.total = await this.getIncomUserLastMonth(users[i]);
        arrIncomUser.push(incomUser);
      }
      arrIncomUser.sort((a, b) => {
        return a.total - b.total;
      });
      arrIncomUser.reverse();
      this.getRankMonth(arrIncomUser);
      this.bestRankMonth = arrIncomUser[0].id;
      this.bestUserRankMonth = arrIncomUser[0].total.toLocaleString();
    },
    async getIncomUserLastDay(idUser) {
      const sinceDate = new Date();
      const untilDate = new Date();
      sinceDate.setHours(7, 0, 0, 0);
      untilDate.setHours(30, 59, 59, 0);
      sinceDate.setDate(sinceDate.getDate() - 1);
      untilDate.setDate(untilDate.getDate() - 1);
      const since = sinceDate.toISOString();
      const until = untilDate.toISOString();
      var salesLastMonth = 0;
      const arrayRes = await order.getOrders(since, until, idUser);
      for (let i = 0; i < arrayRes.length; i++) {
        if (arrayRes[i].status == "Tạm duyệt") {
          salesLastMonth = salesLastMonth + arrayRes[i].commission;
        }
      }
      return salesLastMonth;
    },
    async getIncomUserLastMonth(idUser) {
      const sinceDate = new Date();
      const untilDate = new Date();
      sinceDate.setHours(7, 0, 0, 0);
      untilDate.setHours(30, 59, 59, 0);
      const since = sinceDate.toISOString();
      const until = untilDate.toISOString();
      var salesLastMonth = 0;
      const arrayRes = await order.getOrders(since, until, idUser);
      for (let i = 0; i < arrayRes.length; i++) {
        if (arrayRes[i].status == "Tạm duyệt") {
          salesLastMonth = salesLastMonth + arrayRes[i].commission;
        }
      }
      return salesLastMonth;
    },
    getRankDay(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].id == convertId.convertId(sessionStorage.getItem("IdUser"))
        ) {
          console.log(i);
          this.yourRankDay = i + 1;
        }
      }
    },
    getRankMonth(arr) {
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].id == convertId.convertId(sessionStorage.getItem("IdUser"))
        ) {
          console.log(i);
          this.yourRankMonth = i + 1;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./OverView";
.bg-white {
  background: #fff;
  border-radius: 10px;
}

.revenue .revenue-col > div {
  height: 100%;
}
</style>

