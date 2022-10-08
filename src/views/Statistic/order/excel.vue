<template>
  <div>
    <export-excel
      class="btn btn-default"
      :data="json_data"
      :fields="json_fields"
      :title = "title"
      worksheet="donhang"
      name="donhang.xls"
    >
      <v-btn @click="exportOrderData()" color="success">
        Xuất báo cáo excel
        <v-icon class="mx-5" left> mdi-export </v-icon>
      </v-btn>
    </export-excel>
  </div>
</template>

<script>
import * as order from "../../../api/statistic/order";
export default {
  props: ["orderList", "since", "until"],
  data() {
    return {
      title : "",
      json_fields: {
        "Thời gian mua": "sales_time",
        "Advertisers": "merchant",
        "Trạng thái": "order_status",
        "Hoa hồng": {
          field: "reality_commission",
          callback: (value) => {
            return `${value}`;
          },
        },
        "Mã nhân viên" : "utm_source",
        "Thiết bị" : "device",
	"User Agent" : "user_agent"
      },
      json_data: [

      ],
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
    this.exportOrderData()
  },
  methods: {
    async exportOrderData() {
      const dataExport = await order.getOrderExport(this.since, this.until);
      this.title = "Thống kê đơn hàng từ " + (this.since.split("T")[1]).split(".")[0] + " " +this.since.split("T")[0] + " đến " + (this.until.split("T")[1]).split(".")[0] + " " + this.until.split("T")[0];
      this.json_data = dataExport.map((order)=> ({
        sales_time : order.sales_time.split("T")[1] + " " + order.sales_time.split("T")[0],
        merchant : order.merchant,
        utm_source : order.utm_source,
        order_status : this.convertStatus(order.order_status),
        reality_commission : (order.order_status == 1) ?  order.reality_commission : 0,
        device : order.device,
	user_agent : order.user_agent
      }));
    },
    convertStatus(status) {
      if (status == 0) {
        return "Đang xử lý";
      } else if (status == 1) {
        return "Tạm duyệt";
      }
      return "Đã hủy"
    },
  },
  watch: {
    since : function() {
      this.exportOrderData();
    },
    until : function() {
      this.exportOrderData();
    }
  }
};
</script>

<style>
</style>
