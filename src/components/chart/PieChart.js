import { Pie } from 'vue-chartjs'
import * as getSaleData from '../chart/getSaleYear'
export default {
    extends: Pie,
    data: function () {
        return {
            datacollection: {
                labels: ['Pie 1', 'Pie 2', 'Pie 3', 'Pie 4', 'Pie 5'],
                datasets: [
                    {
                        backgroundColor: ['#1E9600', '#99C802', '#FFF200', '#F89403', '#FF0000'],
                        data: [1, 2, 3, 4, 5],
                    },
                ],
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    position: 'right',
                },
            },
        }
    },
    async mounted() {
        const dataIncome = await getSaleData.getSalesYear();
        const datacollection12 = {
            labels: ['Tháng 1 ', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
                {
                    backgroundColor: ['#819FF7', '#088A68', '#FFF200', '#F89403', '#FF0000', '#819FF7', '#04B486', '#3104B4', '#F781D8', '#FFF200', '#FF0000'],
                    data: dataIncome
                }
            ]
        }
        this.renderChart(datacollection12, this.options);
    }
}