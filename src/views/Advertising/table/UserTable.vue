<template>
  <v-card class="mt-5">
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Tìm kiếm"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="posterity"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
export default {
  props: ["posterity"],
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Mã User",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Username", value: "username" },
        { text: "Họ Tên", value: "name" },
        { text: "Tổng thu nhập (năm nay )", value: "pub_commission" },
        { text: "Hoa hồng chia", value: "sharing" },
      ],
    };
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
