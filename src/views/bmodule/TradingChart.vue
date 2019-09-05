<template>
  <div class="merchants-body">
    <header class="container">
      <div class="content">
        <p class="money">{{purchase_amount}}</p>
        <p class="name">本周买入金额</p>
      </div>
      <div class="content">
        <p class="money green">{{purchase_num}}</p>
        <p class="name">本周买入单数</p>
      </div>
      <div class="content">
        <p class="money purple">{{seller_amount}}</p>
        <p class="name">本周卖出金额</p>
      </div>
      <div class="content">
        <div class="money light-blue">
          {{seller_num}}
          <!-- 需求暂时不用 -->
          <!-- <div class="percent">
            <p class="text">30%</p>
          </div> -->
        </div>
        <p class="name">本周卖出单数</p>
      </div>
    </header>

    <!-- 时间控件 -->
    <section class="chart-top">
      <div class="title-box">
        <div class="icon"></div>
        <div class="text">每日买卖统计</div>

        <div class="radio-box">
          <el-radio v-model="radio" label="1" @change="handleRadio">笔数</el-radio>
          <el-radio v-model="radio" label="2" @change="handleRadio">金额</el-radio>
        </div>

        <div class="date-box">
          <div class="hint">起始日期</div>
          <div class="time-icon"></div>

          <el-form ref="topForm" label-width="20px" class="my-form">
            <el-date-picker
              placeholder="开始日期"
              v-model="formInfo.date1"
              size="small"
              :editable="false"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form>

          <p class="black">—</p>

          <div class="time-icon"></div>
          <el-form ref="topForm" label-width="20px" class="my-form" style="margin-right: 10px;">
            <el-date-picker
              placeholder="结束日期"
              v-model="formInfo.date"
              size="small"
              value-format="yyyy-MM-dd"
              :editable="false"
              @change="handleDate"
            ></el-date-picker>
          </el-form>
        </div>
      </div>

      <!-- 图形 -->
      <!-- <apexchart type="bar" height="350" :options="chartOptions" :series="series"/> -->
      <div class="chart-box">
        <bar-chart :objs="bonus_ranking_list" ></bar-chart>
        <div class="chart-hint">最多可查看15天</div>
      </div>
    </section>

  </div>
</template>

<script>
import BarChart from "components/BarChart";
export default {
  name: "BTradingChart",
  components: {
    BarChart
  },
  data() {
    return {
      date: '',
      radio: '1',
      formInfo: {
        date1:'',
        date: "",
        toplist: []
      },
      reqlist: {},
      purchase_amount: '',
      purchase_num: '',
      seller_amount: '',
      seller_num: '',
      bonus_ranking_list: { // 充值提现额排行
        name1: '买入笔数',
        name2: '卖出笔数',
        list1: [],
        list2: [],
        name_list: [],
        column: '30%'
      }
    }
  },
  created () {
    this.getTradInfo()
  },
  mounted() {
    // 顶部数据
    this.reqlist = {
      purchase_amount_list: [1,2,3,4,5,6,7,8],
      seller_amount_list: [2,3,4,5,6,7,8,9],
      purchase_num_list: [9,8,7,6,5,4,3,2],
      seller_num_list: [8,7,6,5,4,3,2,1]
    }
    // this.bonus_ranking_list.name1 = '买入笔数'
    // this.bonus_ranking_list.name2 = '卖出笔数'
    // this.bonus_ranking_list.list1 = [10, 20, 30, 40, 50, 60, 70, 80, 91, 101, 111, 121, 131, 141, 151];
    // this.bonus_ranking_list.list2 = [10, 20, 30, 40, 50, 60, 70, 80, 91, 91, 101, 111, 121, 131, 141,];

    // this.bonus_ranking_list.name_list = [
    //   '06-01','06-02','06-03','06-04','06-05','06-06','06-07','06-08',
    //   '06-09','06-10','06-11','06-12','06-13','06-14','06-15'];
  },
  methods: {
    getTradInfo () {
      const url =this.$api.agency+ '/api/bwallet/getStatics'
      const data = {
        token: localStorage.getItem("token")
      }
      this.$post(url, data).then(res => {
        var _res = res.data
        this.datetime = _res.system_time.substring(0,7)
        this.reqlist = _res.daily_statistic
        this.purchase_amount = _res.purchase_amount // 买入金额
        this.purchase_num = _res.purchase_num // 买入次数
        this.seller_amount = _res.seller_amount // 卖出金额
        this.seller_num = _res.seller_num // 卖出次数
        this.bonus_ranking_list.name_list = _res.daily_statistic.day_list

        // 金额列表
        // this.bonus_ranking_list.list1 = _res.daily_statistic.purchase_amount_list
        // this.bonus_ranking_list.list2 = _res.daily_statistic.seller_amount_list

        // 次数/笔数 列表
        this.bonus_ranking_list.list1 = _res.daily_statistic.purchase_num_list
        this.bonus_ranking_list.list2 = _res.daily_statistic.seller_num_list
      })
    },

    // 商户充值提现额排行
    handleDate () {
      const url = this.$api.agency+'/api/bwallet/getDailyStatistic'
      const data = {
        token: localStorage.getItem("token"),
        start:this.formInfo.date1,
        end:this.formInfo.date,
        // time: this.formInfo.date
      }
      this.$post(url, data).then(res => {
        var _res = res.data
        this.radio = '1'
        this.reqlist = _res
        this.bonus_ranking_list.name_list = _res.day_list
        // 金额列表
        // this.bonus_ranking_list.list1 = _res.purchase_amount_list
        // this.bonus_ranking_list.list2 = _res.seller_amount_list

        // 次数/笔数 列表
        this.bonus_ranking_list.list1 = _res.purchase_num_list
        this.bonus_ranking_list.list2 = _res.seller_num_list
      })
    },

    handleRadio (type) {
      if (this.radio === '1') {
        this.bonus_ranking_list.name1 = '买入笔数'
        this.bonus_ranking_list.name2 = '卖出笔数'
        this.bonus_ranking_list.list1 = this.reqlist.purchase_num_list
        this.bonus_ranking_list.list2 = this.reqlist.seller_num_list
      } else {
        this.bonus_ranking_list.name1 = '买入金额'
        this.bonus_ranking_list.name2 = '卖出金额'
        this.bonus_ranking_list.list1 = this.reqlist.purchase_amount_list
        this.bonus_ranking_list.list2 = this.reqlist.seller_amount_list
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.merchants-body {
  width: 100%;
  height: 100%;
}
 
/** 单选框 */
/deep/ .el-radio {
  color: #717E9E;
}
/deep/ .el-radio__inner {
  width: 12px;
  height: 12px;
  border: 1px solid #7380A0;
  background-color: #12223B;
}
/deep/ .el-radio__inner::after {
  width: 3px;
  height: 3px;
  background-color: #3986E2;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #26548F;
  background: #26548F;
}

/deep/ .el-radio__input.is-checked+.el-radio__label {
  color: #3986E2;
}

/** 时间按钮框 */
/deep/ .el-icon-circle-close {
  width: 0.1px;
  display: none;
}

/deep/ .el-date-editor.el-input {
  padding-left: 5px;
  width: 100px;
}

/deep/ .my-form {
  margin-top: -2px;
}

/deep/ .el-input__inner {
  padding: 0 !important;
  background: url("~imgurl/pulldown_icon.png") no-repeat center right;
  background-size: 16px;
  height:40px !important;
  line-height: 40px;
  border: none;
  color: #3884e0 !important;
  font-size: 15px;
}

/deep/ .el-input__inner::placeholder {
  color: #3884e0 !important;
  font-size: 15px;
}

/deep/ .el-input__prefix {
  display: none;
}


/deep/ .apexcharts-legend-series {
  margin: 0px 50px !important;
}

.container {
  box-sizing: border-box;
  display: flex;
  .content {
    position: relative;
    height: 60px;
    width: 22%;
    border-right: 1.2px solid #051e33;
    text-align: center;
    &:last-child {
      border: 0;
    }
    .money {
      position: relative;
      height: 42px;
      line-height: 42px;
      font-size: 26px;
      color: #fff;
      .percent {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 8px;
        background: url("~imgurl/go_up.png") no-repeat left top 46%;
        background-size: 15px;
        .text {
          padding-left: 15px;
          color: #37ec6b;
        }
      }
    }
    .name {
      font-size: 16px;
      color: #7380a0;
      margin-bottom: 6px;
    }
    .green {
      color: #37ec6b;
    }
    .purple {
      color: #8c51f5;
    }
    .light-blue {
      color: #3bccc9;
    }
  }
}

// 顶部表格布局
.chart-top {
  margin-top: 40px;
  border: 1.2px solid #06476d;
  .title-box {
    color: #fff;
    text-align: left;
    height: 40px;
    line-height: 40px;
    background-color: #12223B;
    border-bottom: 1.2px solid #06476d;
    .icon {
      float: left;
      width: 36px;
      height: 40px;
      background: url("~imgurl/table_icon.png") no-repeat center;
      background-size: 15px;
    }
    .text {
      float: left;
      font-size: 16px;
    }
    .radio-box {
      float: left;
      margin-left: 35px;
      height:40px;
     
    }
    .date-box {
      display: flex;
      float: right;
      .start {
        margin-left: 10px;
      }
      .end {
        margin-right: 10px;
      }
      .time-icon {
        width: 15px;
        background: url("~imgurl/time.png") no-repeat center;
        background-size: 15px;
      }
      .hint {
        font-size: 16px;
        margin-right: 10px;
        color: #3884e0;
      }
      .content {
        display: flex;
        .time-box {
          padding-left: 5px;
          padding-right: 16px;
          background: url("~imgurl/pulldown_icon.png") no-repeat center right;
          background-size: 16px;
        }
      }
      .black {
        margin: 0 5px;
        color: #3884e0;
      }
    }
  }
  .chart-box {
    position: relative;
    // height: 300px;
    .chart-hint {
      position: absolute;
      right: 30px;
      bottom: 25px;
      color: #65718E;
      font-size: 16px;
    }
  }
}
</style>
