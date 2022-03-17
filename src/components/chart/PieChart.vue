<template>
  <div style="margin-left: 100px">
    <PieChart :chart-data="datacollection1"></PieChart>
  </div>
</template>

<script>
import PieChart from "./PieChart.js";

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      datacollection1: null,
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection1 = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<style lang="scss" scoped>
#pie-chart {
  max-width: 400px !important;
  max-height: 800px !important;
}
</style>