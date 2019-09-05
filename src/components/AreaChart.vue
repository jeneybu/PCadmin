<template>
   <div>
     <apexchart height="350" type="area" :options="chartOptions" :series="series" />
   </div>
</template>

<script>
export default {
  props: {
    list: Object
  },
  watch: {
    list: {
      handler(newName) {
        this.series[0].data = newName.list
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: newName.name_list
            }
          }}
      },
        deep: true
      }
  },
  data () {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  }
}
</script>

<style lang="scss">
.apexcharts-menu-icon, .apexcharts-menu {
  opacity: 0;
}
</style>
