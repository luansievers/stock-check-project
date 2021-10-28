<template>
  <b-row class='vh-100' align-v='center' align-h='center'>
    <b-col md="10" sm="12">
      <b-card id='stock-card' :title="$t('stock_history')" body-class='text-center'>
        <b-card-text v-if="!chartData">
          <stock-price-form @set-chart-data="setChartData"></stock-price-form>
        </b-card-text>
        <b-card-text v-else>
          <b-button variant='danger' @click="chartData = null">
            Close
          </b-button>
          <line-chart v-if='chartData' :chart-data='chartData'></line-chart>
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import LineChart from '../components/Chart.js';
import StockPriceForm from "../components/StockPriceForm";

export default {
  name: 'StockPrice',
  components: {StockPriceForm, LineChart},
  data() {
    return {
      chartData: null,
    }
  },
  methods: {
    setChartData(data) {
      this.chartData = data
    }
  },
}
</script>

<style>
#stock-card {
  border-color: #1D2675
}
</style>