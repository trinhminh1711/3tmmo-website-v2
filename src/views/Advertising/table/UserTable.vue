<template>
  <v-card class="mt-5">
    <div class="d-flex">
     <h3 class="px-5 pt-5">Tổng doanh thu : {{ totalIncome > 0 ? totalIncome.toLocaleString() + " VNĐ" : 0 }}</h3>
      <h3 class="px-5 pt-5">Tổng hoa hồng F : {{ totalIncome > 0 ? ((totalIncome*10/100)).toLocaleString(undefined , {minimumFractionDigits: 0 , maximumFractionDigits: 0}) + " VNĐ" : 0 }}</h3>
    </div>
    <v-card-title>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Tìm kiếm" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="posterity" :search="search">
        <template v-slot:item.reality_commission="{ item }">
        <span>{{ item.reality_commission ? (item.reality_commission).toLocaleString(undefined , {minimumFractionDigits: 0 , maximumFractionDigits: 0}) + ' VND' :0 }}</span>
      </template>
      <template v-slot:item.sharing="{ item }">
        <span>{{ item.reality_commission ? ((item.reality_commission*10/100)).toLocaleString(undefined , {minimumFractionDigits: 0 , maximumFractionDigits: 0}) + " VNĐ" :0 }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ["posterity"],
  data() {
    return {
      search: "",
      totalIncome: 0,
      headers: [
        {
          text: "Mã User",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Username", value: "username" },
        { text: "Họ Tên", value: "name" },
        {
          text: "Tổng doanh thu",
          value: "reality_commission",
        },
        { text: "Hoa hồng F", value: "sharing" },
        { text: "Thứ hạng", value: "rank" },
      ],
    };
  },
  methods: {
    revertNumber(data) {
      if (data != 0) {
        return parseFloat(data.replaceAll(",", ""));
      }
      return 0;
    },
  },
  watch: {
    posterity: function() {
      this.totalIncome = this.posterity.reduce((n, { reality_commission }) => n + (reality_commission), 0);
      console.log(this.totalIncome);
    },
  },
};
</script>
<style scoped>
.table__ads {
  height: 500px;
  overflow-y: scroll;
  margin-top: 1rem;
}
</style>
