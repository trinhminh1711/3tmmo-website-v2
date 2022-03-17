<template>
  <div class="height-full">
    <div class="d-flex align-center">
      <h2 class="ml-3">Thống kê đơn hàng</h2>
      <v-col class="pd-5" cols="12" sm="6" md="4">
        <v-alert class="mr-0" dense type="info">
          Từ <strong>{{ converDate(this.sinceDate.toISOString()) }}</strong>
          đến
          <strong> {{ converDate(this.untilDate.toISOString()) }}</strong>
        </v-alert>
      </v-col>
    </div>
    <v-container>
      <v-row class="d-flex">
        <v-col class="pd-5" cols="12" sm="6" md="3">
          <v-select
            class="pa-0"
            label="Thời gian"
            v-model="timeline"
            :items="times"
            dense
            @change="showSelectDate"
            outlined
          ></v-select>
        </v-col>
        <v-col class="pd-5" cols="12" sm="6" md="2">
          <v-select
            label="User"
            v-model="selectUser"
            :items="user"
            dense
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12" class="" sm="6" md="2">
          <transition name="fade">
            <input
              v-if="selectToDate"
              v-model="startDate"
              class="date__input"
              type="date"
              @change="getOrderToDate"
            />
          </transition>
        </v-col>
        <v-col cols="12" class="ml-5" sm="6" md="2">
          <transition name="fade">
            <input
              v-if="selectToDate"
              v-model="endDate"
              class="date__input"
              type="date"
              @change="getOrderToDate"
            />
          </transition>
        </v-col>

        <v-col class="flex-column" cols="12" sm="6" md="2">
          <v-btn
            v-if="btnSelectToDate"
            @click="newOrders()"
            class="ml-10"
            color="primary"
          >
            <v-icon class="mr-1"> mdi-magnify </v-icon>
            Tìm kiếm
          </v-btn>
        </v-col>
      </v-row>
      <h2>
        Tổng thu nhập tạm duyệt : {{ totalOrderCommission.toLocaleString() }}
      </h2>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="orderList"
      :items-per-page="9"
      class="elevation-1 mt-5"
    >
      <template v-slot:item.status="{ item }">
        <v-chip :color="getColor(item.status)" dark>
          {{ item.status }}
        </v-chip>
      </template>
    </v-data-table>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
    <div class="pt-5 d-flex justify-end">
      <export-excel
        class="btn btn-default"
        :data="orderList"
        :fields="json_fields"
        worksheet="sheet-order"
        name="donhang"
      >
        <v-btn @click="exportExcel()">
          <v-icon> mdi-download </v-icon>
          Xuất Excel
        </v-btn>
      </export-excel>
    </div>
  </div>
</template>
<script>
import * as convertId from "../../../function/converIdUser";
import * as order from "../../../api/statistic/order";
import * as getUserId from "../../../api/user/getUserId";
import * as permission from "../../../permission/checkPermission";
export default {
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      picker: "",
      btnSelectToDate: false,
      user: [],
      selectUser: "user001",
      timeline: "",
      times: [
        "Hôm nay",
        "Hôm qua",
        "Tuần này",
        "Tuần trước",
        "Tháng này",
        "Tháng trước",
        "Chọn thời gian",
      ],
      orderList: [{}],
      sinceDate: "",
      untilDate: "",
      selectToDate: false,
      loading: true,
      totalOrderCommission: 0,
      headers: [
        {
          text: "Thời gian mua",
          align: "start",
          value: "sales_time",
        },
        {
          text: "Advertisers",
          align: "start",
          value: "merchant",
        },
        {
          text: "Trạng thái",
          align: "start",
          value: "status",
        },
        {
          text: "Hoa hồng",
          align: "start",
          value: "commission",
        },
        {
          text: "Mã user",
          align: "start",
          value: "idUser",
        },
      ],
      json_fields: {
        "Thời gian mua": "sales_time",
        Advertisers: "merchant",
        "Trạng thái": "status",
        "Hoa hồng": "commission",
        "Mã user": "idUser",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  async created() {
    this.sinceDate = new Date();
    this.untilDate = new Date();
    await this.getOrders(0, 0);
    if ((await permission.checkPermission()) == 0) {
      await this.getUserId();
    }
  },

  async mounted() {},
  methods: {
    async getOrders(minusDate, spaceDate) {
      this.selectToDate = false;
      this.sinceDate.setHours(7, 0, 0, 0);
      this.untilDate.setHours(30, 59, 59, 0);
      this.sinceDate.setDate(this.sinceDate.getDate() - minusDate);
      this.untilDate.setDate(this.untilDate.getDate() - spaceDate);
      const since = this.sinceDate.toISOString();
      const until = this.untilDate.toISOString();
      this.loading = true;
      const id =
        (await permission.checkPermission()) == 0
          ? this.selectUser
          : convertId.convertId(sessionStorage.getItem("IdUser"));
      const data = await order.getOrders(since, until, id);
      this.loading = false;
      this.orderList = data;
      this.totalOrderCommission = this.countTotalCommission(this.orderList);
    },
    async getOrdersCurrentMonth() {
      this.selectToDate = false;
      var date = new Date();
      this.sinceDate.setHours(7, 0, 0, 0);
      this.untilDate.setHours(30, 59, 59, 0);
      this.sinceDate = new Date(date.getFullYear(), date.getMonth(), 2);
      const since = this.sinceDate.toISOString();
      const until = this.untilDate.toISOString();
      this.loading = true;
      const id =
        (await permission.checkPermission()) == 0
          ? this.selectUser
          : convertId.convertId(sessionStorage.getItem("IdUser"));
      const data = await order.getOrders(since, until, id);
      this.loading = false;
      this.orderList = data;
      this.totalOrderCommission = this.countTotalCommission(this.orderList);
    },

    async getOrdersLastMonth() {
      this.selectToDate = false;
      var currentDate = new Date();
      this.sinceDate = new Date();
      this.sinceDate.setDate(1);
      this.sinceDate.setMonth(this.sinceDate.getMonth() - 1);
      this.sinceDate.setHours(7, 0, 0, 0);
      this.untilDate.setHours(30, 59, 59, 0);
      this.untilDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const since = this.sinceDate.toISOString();
      const until = this.untilDate.toISOString();
      this.loading = true;
      const id =
        (await permission.checkPermission()) == 0
          ? this.selectUser
          : convertId.convertId(sessionStorage.getItem("IdUser"));
      const data = await order.getOrders(since, until, id);
      this.loading = false;
      this.orderList = data;
      this.totalOrderCommission = this.countTotalCommission(this.orderList);
    },

    async getLastWeek() {
      var d = new Date();

      // set to Monday of this week
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));

      // set to previous Monday
      d.setDate(d.getDate() - 7);
      this.sinceDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      this.untilDate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 6);
      this.sinceDate.setHours(7, 0, 0, 0);
      this.untilDate.setHours(30, 59, 59, 0);
      const since = this.sinceDate.toISOString();
      const until = this.untilDate.toISOString();
      this.loading = true;
      const id =
        (await permission.checkPermission()) == 0
          ? this.selectUser
          : convertId.convertId(sessionStorage.getItem("IdUser"));
      const data = await order.getOrders(since, until, id);
      this.loading = false;
      this.orderList = data;
      this.totalOrderCommission = this.countTotalCommission(this.orderList);
    },

    async getCurrentWeek() {
      var d = new Date();
      d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
      this.sinceDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      this.untilDate = new Date();
      this.sinceDate.setHours(7, 0, 0, 0);
      this.untilDate.setHours(30, 59, 59, 0);
      const since = this.sinceDate.toISOString();
      const until = this.untilDate.toISOString();
      console.log(since);
      console.log(until);
      this.loading = true;
      const id =
        (await permission.checkPermission()) == 0
          ? this.selectUser
          : convertId.convertId(sessionStorage.getItem("IdUser"));
      const data = await order.getOrders(since, until, id);
      this.loading = false;
      this.orderList = data;
      this.totalOrderCommission = this.countTotalCommission(this.orderList);
    },

    getColor(status) {
      if (status == "Tạm duyệt") return "green";
      else if (status == "Chờ xử lý") return "orange";
      else return "red";
    },
    newOrders() {
      this.sinceDate = new Date();
      this.untilDate = new Date();
      switch (this.timeline) {
        case "Hôm nay":
          this.getOrders(0, 0);
          break;
        case "Hôm qua":
          this.getOrders(1, 1);
          break;
        case "Tuần này":
          this.getCurrentWeek();
          break;
        case "Tuần trước":
          this.getLastWeek();
          break;
        case "Tháng này":
          this.getOrdersCurrentMonth();
          break;
        case "Tháng trước":
          this.getOrdersLastMonth();
          break;
        default:
          this.getOrders(0, 0);
      }
    },
    countTotalCommission(arr) {
      var totalValue = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].status == "Tạm duyệt") {
          totalValue = totalValue + arr[i].commission;
        }
      }
      return totalValue;
    },
    showSelectDate() {
      if (this.timeline == "Chọn thời gian") {
        this.selectToDate = true;
        this.btnSelectToDate = false;
      } else {
        this.btnSelectToDate = true;
        this.selectToDate = false;
      }
    },
    async getOrderToDate() {
      const selectSinceDate = new Date(this.startDate);
      const selectUntilDate = new Date(this.endDate);
      const diffTime = Math.abs(selectUntilDate - selectSinceDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 31) {
        selectSinceDate.setHours(7, 0, 0, 0);
        selectUntilDate.setHours(30, 59, 59, 0);
        this.sinceDate = selectSinceDate;
        this.untilDate =  selectUntilDate;
        const since = selectSinceDate.toISOString();
        const until = selectUntilDate.toISOString();
        this.loading = true;
        const id =
          (await permission.checkPermission()) == 0
            ? this.selectUser
            : convertId.convertId(sessionStorage.getItem("IdUser"));
        const data = await order.getOrders(since, until, id);
        this.loading = false;
        this.orderList = data;
        this.totalOrderCommission = this.countTotalCommission(this.orderList);
      } else {
        alert("Lỗi chọn ngày ( khoảng cách 2 ngày phải < 31 )");
        return 0;
      }
    },
    async getUserId() {
      let listUser = await getUserId.getUserId();
      this.user = listUser.sort();
    },
    converDate(date) {
      const dateTimetoDay = date.split("T")[0].split("-");
      return dateTimetoDay[2] + "-" + dateTimetoDay[1] + "-" + dateTimetoDay[0];
    },
    exportExcel() {
      console.log(this.orderList);
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
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
  height: 100vh;
}
</style>
