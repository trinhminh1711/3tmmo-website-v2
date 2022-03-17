<template>
  <div>
    <v-card>
      <v-card-title>
        <v-container>
          <v-row>
            <v-col class="pd-0" cols="12" sm="6" md="6">
              Danh sách giao dịch - Tổng số giao dịch : {{ total }}
            </v-col>
            <v-col class="pd-0" cols="12" sm="6" md="6">
              <v-row>
                <v-col class="pd-5" cols="12" sm="6" md="4">
                  <v-select
                    v-model="timeline"
                    :items="times"
                    label="Thời gian"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col>
                  <v-select
                    v-model="selectUser"
                    :items="user"
                    label="User"
                    dense
                    outlined
                  ></v-select>
                </v-col>
                <v-col class="pd-10" cols="12" sm="6" md="4">
                  <v-btn @click="camPaign()" color="primary">Lọc kết quả</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6"
            ><v-alert dense type="info">
              Từ <strong>{{ converDate(sinceDate.toISOString()) }}</strong> Đến
              <strong>{{ converDate(untilDate.toISOString()) }}</strong>
            </v-alert>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="9"
        class="elevation-1 mt-5"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center mt-5">
      <v-pagination
        v-model="page"
        :length="totalPage"
        :total-visible="4"
        @input="handlePageChange"
      ></v-pagination>
    </div>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>
<script>
import * as convertId from "../../../function/converIdUser";
import * as transaction from "../../../api/statistic/transaction";
import * as getUserId from "../../../api/user/getUserId";
import * as permission from "../../../permission/checkPermission";
export default {
  components: {},
  data() {
    return {
      user: [],
      selectUser: "",
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
      page: 1,
      totalPage: 0,
      search: "",
      loading: false,
      sinceDate: "",
      untilDate: "",
      headers: [
        {
          text: "Mã giao dịch",
          align: "start",
          sortable: false,
          value: "conversion_id",
        },
        { text: "Advertisers", value: "merchant" },
        { text: "Thời gian phát sinh giao dịch", value: "click_time" },
        { text: "Trạng thái", value: "status" },
        { text: "Hoa hồng", value: "commission" },
        { text: "Mã user", value: "utm_source" },
      ],
      desserts: [],
      total: 0,
    };
  },
  async created() {
    this.sinceDate = new Date();
    this.untilDate = new Date();
    await this.getCampaign(0, 0);
    if ((await permission.checkPermission()) == 0) {
      await this.getUserId();
    }
  },
  mounted() {},
  methods: {
    async getCampaign(minusDate, spaceDate , pageUpdate) {
      this.sinceDate.setHours(7, 0, 0, 0);
      this.untilDate.setHours(30, 59, 59, 0);
      this.sinceDate.setDate(this.sinceDate.getDate() - minusDate);
      this.untilDate.setDate(this.untilDate.getDate() - spaceDate);
      const since = this.sinceDate.toISOString();
      const until = this.untilDate.toISOString();
      this.loading = true;
      const id =
        (await permission.checkPermission()) == 0
          ? (this.selectUser)
          : convertId.convertId(sessionStorage.getItem("IdUser"));
      const transactionRes = await transaction.getTransactions(
        since,
        until,
        pageUpdate,
        id
      );
      this.loading = false;
      this.total = transactionRes.total;
      this.desserts = transactionRes.data;
      this.totalPage = transactionRes.total_page;
    },
    getColor(status) {
      if (status == "Đã duyệt") return "green";
      else if (status == "Chưa duyệt") return "orange";
    },
    camPaign() {
      this.sinceDate = new Date();
      this.untilDate = new Date();
      const pageUpdate = this.page;
      switch (this.timeline) {
        case "Hôm nay":
          this.getCampaign(0, 0 , pageUpdate);
          break;
        case "Hôm qua":
          this.getCampaign(1, 1 , pageUpdate);
          break;
        case "Tuần này":
          this.getCampaign(7, 0 ,pageUpdate);
          break;
        case "Tuần trước":
          this.getCampaign(14, 7 ,pageUpdate);
          break;
        case "Tháng này":
          this.getCampaign(30, 0 ,pageUpdate);
          break;
        default:
          this.getCampaign(0, 0 , pageUpdate);
      }
    },
    handlePageChange ()
    {
      this.camPaign();
    },
    async getUserId() {
      this.user = await getUserId.getUserId();
    },
    converDate(date) {
      const dateTimetoDay = date.split("T")[0].split("-");
      return dateTimetoDay[2] + "-" + dateTimetoDay[1] + "-" + dateTimetoDay[0];
    },
  },
  watch: {},
};
</script>


<style>
</style>