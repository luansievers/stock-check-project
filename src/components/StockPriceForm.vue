<template>
  <b-form @submit='onSubmit'>
    <b-row>
      <b-col md="10" sm="8">
        <b-form-input v-model='stockName' :state="isValid" :placeholder="$t('enter_stock_name')"></b-form-input>
      </b-col>
      <b-col md="2" sm="4">
        <b-button :disabled='loading' type='submit' variant='primary'>{{ loading ? $t('loading') : $t('submit') }}
        </b-button>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: "StockPriceForm",
  data() {
    return {
      loading: false,
      stockName: null,
      isValid: null,
      colors: ['#e41a1c',
        '#377eb8',
        '#4daf4a',
        '#984ea3',
        '#ff7f00']
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      this.loading = true
      if (this.stockName) {
        const response = await this.axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&amp;symbol=${this.stockName}&amp;apikey=${process.env.VUE_APP_API_KEY}`)
        let toastInfo = {
          message: this.$t('try_again'),
          title: this.$t('we_have_a_problem'),
          variant: 'danger'
        }
        if(response['data']["Error Message"]) {
          let errorMessage = response['data']["Error Message"]
          if (/Invalid API call/.test(errorMessage)) {
            this.isValid = false
            toastInfo = {
              message: this.$t('stock_not_valid'),
              title: this.$t('invalid_stock_name'),
              variant: 'danger'
            }
          }
        } else if (response['status'] === 200) {
          toastInfo = {
            message: this.$t('information_found'),
            title: this.$t('success'),
            variant: 'success'
          }
          let data = response['data']
          let chartData = {
            labels: Object.keys(data['Time Series (Daily)']),
            datasets: []
          }
          Object.keys(Object.values(data['Time Series (Daily)'])[0]).forEach((type, index) => {
            chartData.datasets.push({
              data: Object.values(data['Time Series (Daily)']).map(item => item[type]),
              label: type,
              borderColor: this.colors[index],
              fill: false
            })
          })
          this.$emit('set-chart-data', chartData)
        }
        this.$bvToast.toast(toastInfo.message, {
          title: toastInfo.title,
          autoHideDelay: 5000,
          variant: toastInfo.variant,
          toaster: 'b-toaster-top-center'
        })
      }
      this.loading = false
    }
  },
}
</script>

<style scoped>

</style>