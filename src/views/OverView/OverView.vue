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
              <p>{{ converMoney(dayIncome) }}</p>
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
              <p>{{ converMoney(monthIncome) }}</p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/coins (1).png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-total" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p>Tổng doanh thu hôm qua</p>
              <p>{{ converMoney(lastDayIncome) }}</p>
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
              <p>{{ converMoney(yearIncome) }}</p>
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
              <p style="white-space: nowrap">Xếp hạng của bạn hôm nay</p>
              <p class="text-xl">{{ dayRank }}</p>
              <p class="text-xl">
                Bạn cần thêm {{ converMoney(commitRankDay) }} để thăng hạng
              </p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/military-rank.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-month" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p style="white-space: nowrap">Thứ hạng của bạn trong tháng</p>
              <p class="text-xl">{{ monthRank }}</p>
              <p class="text-xl">
                Bạn cần thêm {{ converMoney(commitRankMonth) }} để thăng hạng
              </p>
            </div>

            <div class="revenue-icon">
              <img src="../../assets/icon/ranking.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-day" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p style="white-space: nowrap">Thứ hạng của bạn hôm qua</p>
              <p class="text-xl" :class="{ top1: topmonth }">
                {{ lastDayRank }}
              </p>
              <p class="text-xl">
                Bạn cần thêm {{ converMoney(commitRankLastDay) }} để thăng hạng
              </p>
            </div>
            <div class="revenue-icon">
              <img src="../../assets/icon/podium.png" alt="" />
            </div>
          </div>
        </v-col>
        <v-col class="pd-0 revenue-col revenue-total" cols="4" sm="6" md="3">
          <div class="rounded-lg pa-4">
            <div class="revenue-data">
              <p style="white-space: nowrap">Thứ hạng trong năm</p>
              <p class="text-xl" :class="{ top1: topyear }">{{ yearRank }}</p>
              <p class="text-xl">
                Bạn cần thêm {{ converMoney(commitRankYear) }} để thăng hạng
              </p>
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
import * as convertId from "../../function/converIdUser";
import * as getOrder from "../../api/statistic/orderByTime";
import * as sumYearIncome from "../../api/statistic/getSumYear";
//import * as rank from "../../api/statistic/rankUser";
export default {
  data() {
    return {
      commitRankMonth: 0,
      commitRankDay: 0,
      commitRankYear: 0,
      commitRankLastDay: 0,
      topmonth: false,
      topyear: false,
      dayIncome: 0,
      dayRank: 0,
      monthIncome: 0,
      monthRank: 0,
      lastDayIncome: 0,
      lastDayRank: 0,
      yearIncome: 0,
      yearRank: 0,
      loading: false,
    };
  },
  mounted() {
    this.getInComeDay();
    this.getInComeMonth();
    this.getInComeLastDay();
    this.getInComeYear();
  },
  methods: {
    converMoney(income) {
      return income.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    },
    async getInComeDay() {
      var sinceDate = new Date();
      sinceDate.setUTCHours(0, 0, 0, 0);
      var untilDate = new Date();
      untilDate.setUTCHours(23, 59, 59, 999);
      var since = sinceDate.toISOString().split(".")[0];
      var until = untilDate.toISOString().split(".")[0];
      const data = await getOrder.getIncomeTime(
        convertId.convertId(sessionStorage.getItem("IdUser")),
        since,
        until
      );
      if (data != null) {
        this.dayIncome = data;
      } else {
        this.dayIncome = 0;
      }
    },
    async getInComeYear() {
      const data = await sumYearIncome.getSumYear(2022);
      if (data != null) {
        this.yearIncome = data;
      } else {
        this.yearIncome = 0;
      }
    },
    async getInComeMonth() {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1, 7, 0, 1);
      const endDay = new Date(now.getFullYear(), now.getMonth() + 1, 1, 7);
      var since = firstDay.toISOString().split(".")[0];
      var until = endDay.toISOString().split(".")[0];
      const data = await getOrder.getIncomeTime(
        convertId.convertId(sessionStorage.getItem("IdUser")),
        since,
        until
      );
      if (data != null) {
        this.monthIncome = data;
      } else {
        this.monthIncome = 0;
      }
    },
    async getInComeLastDay() {
      var sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - 1);
      sinceDate.setUTCHours(0, 0, 0, 0);
      var untilDate = new Date();
      untilDate.setDate(sinceDate.getDate());
      untilDate.setUTCHours(23, 59, 59, 99);
      var since = sinceDate.toISOString().split(".")[0];
      var until = untilDate.toISOString().split(".")[0];
      const data = await getOrder.getIncomeTime(
        convertId.convertId(sessionStorage.getItem("IdUser")),
        since,
        until
      );
      if (data != null) {
        this.lastDayIncome = data;
      } else {
        this.lastDayIncome = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./OverView";
.container {
  max-width: 1300px;
}
.bg-white {
  background: #fff;
  border-radius: 10px;
}

.revenue .revenue-col > div {
  height: 100%;
}
.text-xl {
  font-size: 1rem;
  font-weight: bold;
}
.top1 {
  font-size: 1.5em;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  animation: blur 0.75s ease-out infinite;
  text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
}
@keyframes blur {
  from {
    text-shadow: 0px 0px 10px rgb(238, 255, 4), 0px 0px 10px rgb(238, 255, 4),
      0px 0px 25px rgb(238, 255, 4), 0px 0px 25px rgb(238, 255, 4),
      0px 0px 25px rgb(238, 255, 4), 0px 0px 25px rgb(238, 255, 4),
      0px 0px 25px rgb(238, 255, 4), 0px 0px 25px rgb(238, 255, 4),
      0px 0px 50px rgb(238, 255, 4), 0px 0px 50px rgb(238, 255, 4),
      0px 0px 50px #7b96b8, 0px 0px 150px #7b96b8, 0px 10px 100px #7b96b8,
      0px 10px 100px #7b96b8, 0px 10px 100px #7b96b8, 0px 10px 100px #7b96b8,
      0px -10px 100px #7b96b8, 0px -10px 100px #7b96b8;
  }
}
</style>

