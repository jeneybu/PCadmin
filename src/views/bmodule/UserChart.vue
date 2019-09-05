<template>
  <div class="merchants-body">
    <header class="container">
      <div class="content">
        <p class="money">{{week_register_users}}</p>
        <p class="name">本周注册用户</p>
      </div>
      <div class="content">
        <p class="money green">{{week_used_users}}</p>
        <p class="name">本周在线人数</p>
      </div>
      <div class="content">
        <p class="money purple">{{all_users}}</p>
        <p class="name">总用户量</p>
      </div>
      <div class="content">
        <div class="money light-blue">
          {{week_register_users}}
          <div class="percent">
            <!-- 30% -->
            <p class="text">30%</p>
          </div>
        </div>
        <p class="name">本周推荐用户</p>
      </div>
    </header>

    <!-- 顶部图 -->
    <section class="chart-top">
      <div class="title-box">
        <div class="icon"></div>
        <div class="text">本周用户数据</div>

        <div class="radio-box">
          <el-radio v-model="radio" label="1" @change="handleRadio">注册</el-radio>
          <el-radio v-model="radio" label="2" @change="handleRadio">推荐</el-radio>
          <el-radio v-model="radio" label="3" @change="handleRadio">在线</el-radio>
        </div>

        <!-- <div class="date-box">
          <div class="hint">起始日期</div>
          <div class="time-icon"></div>

          <el-form ref="topForm" label-width="20px" class="my-form">
            <el-date-picker
              type="date"
              placeholder="2018-05"
              v-model="topForm.date1"
              size="small"
              :editable="false"
            ></el-date-picker>
          </el-form>

          <p class="black">—</p>

          <div class="time-icon"></div>
          <el-form ref="topForm" label-width="20px" class="my-form" style="margin-right: 10px;">
            <el-date-picker
              type="date"
              placeholder="2019-06"
              v-model="topForm.date2"
              size="small"
              :editable="false"
            ></el-date-picker>
          </el-form>
        </div>-->
      </div>

      <!-- 波浪图 -->
      <!-- <top-chart :list="topForm.toplist"></top-chart> -->
      <top-chart :list="top_trend_list"></top-chart>
    </section>
  </div>
</template>

<script>
import TopChart from "components/AreaChart";
export default {
  name: "BUserChart",
  components: {
    TopChart
  },
  data() {
    return {
      radio: "1",
      week_register_users: "",
      week_used_users: "",
      all_users: "",
      reqlist: {},
      top_trend_list: {
        // 代理收益趋势
        list: [],
        name_list: []
      }
    };
  },
  created() {
    this.getInfo();
  },
  // 视图数据
  methods: {
    getInfo() {
      this.$post(this.$api.agency + "/api/buser/getUserStatics", {
        token: localStorage.getItem("token")
      }).then(res => {
        var _res = res.data;
        console.log(_res, 'az');
        this.radio = "1";
        this.reqlist = _res;
        this.top_trend_list.list = _res.register_users_list;
        // this.top_trend_list.list = _res.used_users_list
        this.top_trend_list.name_list = _res.day_list;
        this.week_register_users = _res.week_register_users;
        this.week_used_users = _res.week_used_users;
        this.all_users = _res.all_users;
      });
    },

    handleRadio(type) {
      if (this.radio === "1" || this.radio === "2") {
        this.top_trend_list.list = this.reqlist.register_users_list;
      } else {
        this.top_trend_list.list = this.reqlist.used_users_list;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/** 单选框 */
/deep/ .el-radio {
  color: #717e9e;
}
/deep/ .el-radio__inner {
  width: 12px;
  height: 12px;
  border: 1px solid #7380a0;
  background-color: #12223b;
}
/deep/ .el-radio__inner::after {
  width: 3px;
  height: 3px;
  background-color: #3986e2;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #26548f;
  background: #26548f;
}

/deep/ .el-radio__input.is-checked + .el-radio__label {
  color: #3986e2;
}

.merchants-body {
  width: 100%;
  height: 100%;
}

// /deep/ .apexcharts-legend {
// position: absolute !important;
// top: -300px !important;
// position: fixed !important;
// top: 0 !important;
// }

/deep/ .my-form {
  margin-top: -2px;
}

/deep/ .el-input__inner {
  padding: 0 !important;
  background: url("~imgurl/pulldown_icon.png") no-repeat center right;
  background-size: 16px;
  height: 40px;
  line-height: 40px;
  border: none;
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
        font-size: 16px;
        background: url("~imgurl/go_up.png") no-repeat left top 46%;
        background-size: 16px;
        .text {
          padding-left: 15px;
          color: #37ec6b;
          font-size: 16px;
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
    background-color: #12223b;
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
      height: 40px;
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
        font-size: 15px;
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
</style>
