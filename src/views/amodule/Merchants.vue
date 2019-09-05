<template>
  <div class="merchants-body">
    <div class="test"></div>
    <header class="container">
      <div class="content">
        <p class="money">{{user_num}}</p>
        <p class="name">用户数量</p>
      </div>
      <div class="content">
        <p class="money green">{{recharge_amount}}</p>
        <p class="name">本月充值</p>
      </div>
      <div class="content">
        <p class="money purple">{{withdraw_amount}}</p>
        <p class="name">本月提现</p>
      </div>
      <div class="content">
        <div class="money light-blue">
          {{bonus_amount}}
          <div class="percent">
            <!-- 30%暂时不用，要加还原 -->
            <!-- <p class="text">30%</p> -->
          </div>
        </div>
        <p class="name">本月收益</p>
      </div>
    </header>

    <!-- 顶部图 -->
    <section class="chart-top">
      <div class="title-box">
        <div class="icon"></div>
        <div class="text">代理收益趋势</div>

        <div class="date-box">
          <div class="hint">起始日期</div>

          <!-- <div class="time-icon"></div>
          <el-form ref="topForm" label-width="20px" class="my-form">
            <el-date-picker
              type="month"
              placeholder="2018-05"
              v-model="topForm.date1"
              size="small"
              value-format="yyyy-MM"
              :editable="false"
            ></el-date-picker>
          </el-form>

          <p class="black">—</p> -->

          <div class="time-icon"></div>
          <el-form ref="topForm" label-width="20px" class="my-form" style="margin-right: 10px;">
            <el-date-picker
              type="month"
              :placeholder="datetime"
              v-model="topForm.date"
              size="small"
              value-format="yyyy-MM"
              :editable="false"
              @change="handleDateTop"
            ></el-date-picker>
          </el-form>
        </div>
      </div>

      <!-- 波浪图 -->
      <top-chart :list="top_trend_list"></top-chart>
    </section>

    <!-- 中部图-->
    <section class="chart-box chart-mid">
      <!-- 中左 -->
      <div class="content left">
        <div class="title-box">
          <div class="icon"></div>
          <div class="text">商户充值提现额排行</div>

          <div class="date-box">
            <div class="hint">日期</div>
            <div class="time-icon"></div>
            <el-form ref="midForm" label-width="20px" class="my-form" style="margin-right: 10px;">
              <el-date-picker
                type="month"
                :placeholder="datetime"
                v-model="midForm1.date"
                size="small"
                value-format="yyyy-MM"
                :editable="false"
                @change="handleDateMid1"
              ></el-date-picker>
            </el-form>
          </div>
        </div>

        <!-- 柱状图 -->
        <!-- :ccc="bonus_ranking_list.name_list" -->
        <bar-chart :objs="bonus_ranking_list" ></bar-chart>
      </div>

      <!-- 中右 -->
      <div class="content">
        <div class="title-box">
          <div class="icon"></div>
          <div class="text">充值提现趋势</div>
          <div class="time-icon"></div>

          <div class="date-box">
            <div class="hint">日期</div>
            <div class="time-icon"></div>
            <el-form ref="midForm" label-width="20px" class="my-form" style="margin-right: 10px;">
              <el-date-picker
                type="month"
                :placeholder="datetime"
                v-model="midForm2.date"
                size="small"
                value-format="yyyy-MM"
                :editable="false"
                @change="handleDateMid2"
              ></el-date-picker>
            </el-form>
          </div>
        </div>

        <common-right :objs="bonus_trend_list"></common-right>
      </div>
    </section>

    <!-- 底部表格 -->
    <section class="chart-box chart-bottom">
      <!-- 下左 -->
      <div class="content left">
        <div class="title-box">
          <div class="icon"></div>
          <div class="text">收益贡献明细</div>

          <div class="date-box">
            <div class="hint">日期</div>
            <div class="time-icon"></div>

            <el-form
              ref="bottForm"
              :model="bottForm1"
              label-width="20px"
              class="my-form"
              style="margin-right: 10px;"
            >
              <el-date-picker
                type="month"
                :placeholder="datetime"
                v-model="bottForm1.date"
                size="small"
                value-format="yyyy-MM"
                :editable="false"
                @change="handleDateBtm1"
              ></el-date-picker>
            </el-form>
          </div>
        </div>

        <!-- :data="bottForm.tableData1" -->
        <el-table
          :data="bonus_detail_list"
          border
          height="250"
          style="width: 100%"
          :header-cell-style="{background:'#061220',color:'#fff'}"
          align="center">
          <el-table-column prop="index" label="排行" width="100%" align="center"></el-table-column>
          <el-table-column prop="name" label="商户名称" width="100%" align="center"></el-table-column>
          <el-table-column prop="recharge_amount" label="充值总金额" align="center"></el-table-column>
          <el-table-column prop="withdraw_amount" label="提现总金额" align="center"></el-table-column>
          <el-table-column prop="bonus_amount" label="贡献利润" align="center"></el-table-column>
        </el-table>
      </div>

      <!-- 下右 -->
      <div class="content right">
        <div class="title-box">
          <div class="icon"></div>
          <div class="text">充值提现笔数</div>

          <div class="date-box">
            <div class="hint">日期</div>
            <div class="time-icon"></div>
            <el-form ref="bottForm" label-width="20px" class="my-form" style="margin-right: 10px;">
              <el-date-picker
                type="month"
                :placeholder="datetime"
                v-model="bottForm2.date"
                size="small"
                value-format="yyyy-MM"
                :editable="false"
                @change="handleDateBtm2"
              ></el-date-picker>
            </el-form>
          </div>
        </div>

        <two-areachart :objs="bonus_num_list"></two-areachart>
      </div>
    </section>
  </div>
</template>

<script>
import TopChart from "components/AreaChart";
import BarChart from "components/BarChart";
import CommonRight from "components/RightChart";
import TwoAreachart from "components/TwoAreaChart";
export default {
  name: "merchants",
  components: {
    TopChart,
    BarChart,
    CommonRight,
    TwoAreachart
  },
  data() {
    return {
      // 顶部金额部分
      datetime: '',
      user_num: '', // 用户数量
      recharge_amount: '', // 本月充值
      withdraw_amount: '', // 本月提现
      bonus_amount: '', // 本月收益

      // 顶部表格数据
      top_trend_list: { // 代理收益趋势
        list: [],
        name_list: []
      },

      // 中间表格数据
      bonus_ranking_list: { // 充值提现额排行
        name1: '买入金额',
        name2: '卖出金额',
        list1: [],
        list2: [],
        name_list: [],
        column: '45%'
      },
      bonus_trend_list: { // 充值提现趋势
        list1: [],
        list2: [],
        name_list: []
      },

      // 底部表格数据
      bonus_detail_list: [], // 收益贡献明细
      bonus_num_list: { // 收益贡献明细
        list1: [],
        list2: [],
        name_list: []
      },

      // 顶部
      topForm: {
        date: "",
        toplist: []
      },

      // 中部
      midForm1: {
        date: [],
        list: {
          list1: [],
          list2: []
        }
      },
      midForm2: {
        date: [],
        list: {
          list1: [],
          list2: []
        }
      },

      // 底部表格
      bottForm1: {
        date: [],
        tableData1: [],
        tableData2: []
      },
      bottForm2: {
        date: [],
        tableData1: [],
        tableData2: []
      },

      // 顶部图数据
      topseries: [],
      topchartOptions: {},

      // 中间图数据
      midseries: [],
      midchartOptions: {},

      topchartData: {
        columns: ["日期", "下单用户"],
        rows: [
          { 日期: "1000", 下单用户: 1093 },
          { 日期: "2000", 下单用户: 3230 },
          { 日期: "5000", 下单用户: 2623 },
          { 日期: "6000", 下单用户: 1423 },
          { 日期: "8000", 下单用户: 3492 },
          { 日期: "9000", 下单用户: 4293 }
        ]
      },
      tableData: []
    }
  },
  created () {
    this.getMerInfo()
  },
  mounted() {
    // 顶部数据
    this.topForm.toplist = [100, 100, 80, 80, 50, 50, 70, 91];
    // 中部数据
    // this.midForm1.list.list1 = [20, 40, 80, 80, 50, 50, 70, 91];
    // this.midForm1.list.list2 = [50, 60, 80, 80, 50, 50, 70, 91];
    // 底部数据
    // this.bottForm.tableData1 = this.tableData;
  },
  methods: {
    getMerInfo () {
      const path = this.$api.agency+'/api/awallet/getStatics'
      const data = { token: localStorage.getItem('token') }
      this.$post(path, data).then(res => {
        let _res = res
        _res = _res.data
        this.datetime = _res.system_time.substring(0,7)
        this.user_num = _res.user_num
        this.recharge_amount = _res.recharge_amount
        this.withdraw_amount = _res.withdraw_amount
        this.bonus_amount = _res.bonus_amount

        // 代理收益趋势
        this.top_trend_list.list = _res.trend_list.bonus_amount_list
        this.top_trend_list.name_list = _res.trend_list.day_list
        // 调试放开
        // this.top_trend_list.list = [100, 90, 80, 70, 50, 40, 20, 20];
        // this.top_trend_list.name_list = ['06-01','06-02','06-03','06-04','06-05','06-06','06-07','06-08']

        // 充值提现额排行
        this.bonus_ranking_list.list1  = _res.bonus_ranking_list.recharge_amount_list
        this.bonus_ranking_list.list2  = _res.bonus_ranking_list.withdraw_amount_list
        this.bonus_ranking_list.name_list = _res.bonus_ranking_list.name_list
        // this.bonus_ranking_list.list1 = [10, 20, 30, 40, 50, 60, 70, 91];
        // this.bonus_ranking_list.list2 = [10, 20, 30, 40, 50, 60, 70, 91];
        // this.bonus_ranking_list.name_list = ['mz','mz','mz','mz','mz','mz','mz','mz'];

        // 充值提现趋势
        this.bonus_trend_list.list1  = _res.bonus_trend_list.recharge_amount_list
        this.bonus_trend_list.list2  = _res.bonus_trend_list.withdraw_amount_list
        this.bonus_trend_list.name_list = _res.bonus_trend_list.day_list
        // this.bonus_trend_list.list1 = [10, 20, 30, 40, 50, 60, 70, 91];
        // this.bonus_trend_list.list2 = [90, 60, 50, 40, 30, 20, 50, 91];
        // this.bonus_trend_list.name_list =  ['06-01','06-02','06-03','06-04','06-05','06-06','06-07','06-08']

        // 收益贡献明细
        this.bonus_detail_list = _res.bonus_detail_list

        // 充值提现笔数
        this.bonus_num_list.list1 = _res.bonus_num_list.recharge_num_list
        this.bonus_num_list.list2 = _res.bonus_num_list.withdraw_num_list
        this.bonus_num_list.name_list = _res.bonus_num_list.day_list
        // this.bonus_num_list.list1 = [10, 20, 30, 40, 50, 60, 70, 91];
        // this.bonus_num_list.list2 = [30, 40, 50, 60, 70, 60, 70, 91];
        // this.bonus_num_list.name_list = ['06-01','06-02','06-03','06-04','06-05','06-06','06-07','06-08']
      })
    },

    // 代理收益趋势
    handleDateTop () {
      const url = this.$api.agency+'/api/awallet/getTrendList'
      const data = {
        token: localStorage.getItem("token"),
        time: this.topForm.date
      }
      this.$post(url, data).then(res => {
        this.top_trend_list.list = res.data.bonus_amount_list
        this.top_trend_list.name_list = res.data.day_list
      })
    },

    // 商户充值提现额排行
    handleDateMid1 () {
      const url = this.$api.agency+'/api/awallet/getBonusRankingList'
      const data = {
        token: localStorage.getItem("token"),
        time: this.midForm1.date
      }
      this.$post(url, data).then(res => {
        this.bonus_ranking_list.list1 = res.data.recharge_amount_list
        this.bonus_ranking_list.list2 = res.data.withdraw_amount_list
        this.bonus_ranking_list.name_list = res.data.name_list
      })
    },

    // 充值提现趋势
    handleDateMid2 () {
      console.log(this.midForm2.date)
      const url = this.$api.agency+ '/api/awallet/getBonusTrendList'
      const data = {
        token: localStorage.getItem("token"),
        time: this.midForm2.date
      }
      this.$post(url, data).then(res => {
        this.bonus_trend_list.list1 = res.data.recharge_amount_list
        this.bonus_trend_list.list2 = res.data.withdraw_amount_list
        this.bonus_trend_list.name_list = res.data.day_list
      })
    },

    // 收益贡献明细
    handleDateBtm1 () {
      const url = this.$api.agency + '/api/awallet/getBonusDetailList'
      const data = {
        token: localStorage.getItem("token"),
        time: this.bottForm1.date
      }
      this.$post(url, data).then(res => {
        this.bonus_detail_list = res.data
      })
    },

    // 充值提现笔数
    handleDateBtm2 () {
      const url = this.$api.agency +'/api/awallet/getBonusCountTrendList'
      const data = {
        token: localStorage.getItem("token"),
        time: this.bottForm2.date
      }
      this.$post(url, data).then(res => {
        this.bonus_num_list.list1 = res.data.recharge_num_list
        this.bonus_num_list.list2 = res.data.withdraw_num_list
        this.bonus_num_list.name_list = res.data.day_list
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.merchants-body {
  width: 100%;
  height: 100%;
}

/** 时间按钮框 */
/deep/ .el-icon-circle-close {
  width: 0.1px;
  display: none;
}

/** 图标编辑按钮 */
/deep/ .apexcharts-zoom-in-icon {
  display: none;
}
/deep/ .apexcharts-zoom-out-icon {
  display: none;
}
/deep/ .apexcharts-zoom-icon {
  display: none;
}
/deep/ .apexcharts-pan-icon {
  display: none;
}
/deep/ .apexcharts-reset-zoom-icon {
  display: none;
}
/deep/ .apexcharts-menu-icon {
  display: none;
}

/** table表格 */
/deep/ .el-table--border, .el-table--group {
  border: transparent;
}

/deep/ .el-date-editor.el-input {
  padding-left: 5px;
  // width: 95px;
  width: 75px;
}

/deep/ .my-form {
  margin-top: -2px;
}

/deep/ .el-input__inner {
  padding: 0 !important;
  height: 40px;
  line-height: 40px;
  border: none;
  color: #3884e0 !important;
  font-size: 15px;
  background: url("~imgurl/pulldown_icon.png") no-repeat center right;
  background-size: 16px;
}

/deep/ .el-input__inner::placeholder {
  color: #3884e0 !important;
  font-size: 15px;
}

/deep/ .el-input__prefix {
  display: none;
}

/deep/ .el-table th.gutter {
  background: #061220;
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
}

// 表格公共布局
.chart-box {
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  .content {
    width: 48.5%;
    // height: 221px;
    border: 1.2px #06476d solid;
    .title-box {
      color: #fff;
      text-align: left;
      height: 40px;
      line-height: 40px;
      border-bottom: 1.2px #06476d solid;
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
        font-size: 16px;
        float: left;
      }
      .date-box {
        float: right;
        display: flex;
        .time-icon {
          width: 15px;
          background: url("~imgurl/time.png") no-repeat center;
          background-size: 16px;
        }
        .hint {
          font-size: 16px;
          margin-right: 5px;
          color: #3884e0;
        }
      }
      .date {
        color: #3884e0;
        float: right;
      }
    }
  }
}

.chart-bottom {
  margin-top: 27px;
  .left {
  }
}
</style>
