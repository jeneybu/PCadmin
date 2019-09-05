<template>
  <div>
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"/>
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
        this.series[0].name = newName.name1
        this.series[1].name = newName.name2
        this.series[0].data = newName.list1
        this.series[1].data = newName.list2
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            plotOptions: {
              bar: {
                columnWidth: newName.column
              }
            },
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
      series: [
        {
          name: '买入金额',
          data: []
        }, {
          name: '卖出金额',
          data: []
        }
      ],
      chartOptions: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },

        xaxis: {
          categories: [],
        },
        yaxis: {
          title: {
            text: ''
          },
          // labels: { // 标签
          //   show: true,
          //   align: 'right',
          //   minWidth: 0,
          //   maxWidth: 160,
          //   style: {
          //     color: '#7380A0',
          //     fontSize: '12px',
          //     fontFamily: 'Helvetica, Arial, sans-serif',
          //     cssClass: 'apexcharts-yaxis-label',
          //   }
          // },
          // axisBorder: {
          //   show: true,
          //   color: '#7380A0',
          //   offsetX: 0,
          //   offsetY: 0
          // },
          // axisTicks: {
          //   show: true,
          //   borderType: 'solid',
          //   color: '#f5f5f5',
          //   width: 6,
          //   offsetX: 0,
          //   offsetY: 0
          // },
          // crosshairs: {
          //   show: true,
          //   position: 'back',
          //   stroke: {
          //       color: '#f5f5f5',
          //       width: 1,
          //       dashArray: 0,
          //   },
          // }
        },
        colors: ['#93E642', '#FF7E78'],
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .apexcharts-legend-text {
  color: #7380A0 !important;
}

/deep/ .apexcharts-legend-series {
  margin: 0px 20px !important;
}

/deep/ .apexcharts-legend-marker {
  width: 35px !important;
  height: 5px !important;
}
</style>
