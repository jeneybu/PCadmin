<template>
  <div>
    <apexchart type="area" height="350" :options="chartOptions" :series="series"/>
  </div>
</template>

<script>
export default {
  props: {
    objs: Object
  },
  watch: {
    objs: {
      handler(newName) {
        this.series[0].data = newName.list1;
        this.series[1].data = newName.list2;
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
  data() {
    return {
      series: [
        {
          name: "充值",
          data: []
        },
        {
          name: "提现",
          data: []
        }
      ],
      chartOptions: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: []
        },
        colors: ['#45F0EA', '#16569E'],
        tooltip: {
          x: {
            format: "yy"
          }
        }
      }
    };
  }
};
</script>

<style lang='scss' scoped>
/deep/ .apexcharts-legend-series {
  margin: 0px 20px !important;
}

/deep/ .apexcharts-legend-marker {
  width: 35px !important;
  height: 5px !important;
}
</style>
