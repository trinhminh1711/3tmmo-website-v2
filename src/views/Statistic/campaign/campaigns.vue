<template>
  <div>
    <v-card>
      <v-card-title>
        Danh sách chiến dịch
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :items-per-page="9"
      ></v-data-table>
    </v-card>
    <div class="text-center mt-5">
      <v-pagination
        v-model="page"
        :length="15"
        :total-visible="7"
      ></v-pagination>
    </div>
    <div v-if="loading" id="loader-wrapper">
      <div id="loader"></div>
    </div>
  </div>
</template>
<script>
import * as campaign from "../../../api/statistic/campaign";

export default {
  components: {},
  data() {
    return {
      page: 1,
      search: "",
      loading:false,
      headers: [
        {
          text: "Tên chiến dịch)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Ngày bắt đầu", value: "start_time" },
        { text: "Advertisers", value: "merchant" },
        { text: "Danh mục", value: "category" },
        { text: "Hoa hồng tối đa", value: "max_com" },
        { text: "Trạng thái", value: "status" },

      ],
      desserts: [],
    };
  },
  created() {
    this.getCampaign(1);
  },
  mounted() {},
  methods: {
    async getCampaign(page_number) {
      this.loading = true;
      this.desserts = await campaign.getCampaigns(page_number);
      this.loading = false;
    },
  },
  watch: {
    page() {
      this.getCampaign(this.page);
    },
  },
};
</script>


<style>
</style>