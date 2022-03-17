import { Bar } from 'vue-chartjs'
import * as getSaleData from '../chart/getSaleYear'
export default {
    extends: Bar,
    props: ['datacollection1'],
    data: function () {
        return {
            names: [],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    callbacks: {
                        label: function (tooltipItems) {
                            return tooltipItems.yLabel.toLocaleString() + '   VNĐ';
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                height: 200
            }
        }
    },
    async mounted() {
        // this.chartData is created in the mixin
        const dataIncome = await getSaleData.getSalesYear();
        const datacollection12 = {
            labels: ['Tháng 1 ', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: '#249EBF',
                    data: dataIncome
                }
            ]
        }
        this.renderChart(datacollection12, this.options);

    },
    methods: {

    }


}