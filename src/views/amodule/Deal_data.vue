<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" class="my-form">
      <!-- <el-input
        placeholder="请输入商户名称"
        prefix-icon="el-icon-search"
        v-model="input2"
        size="small"
        class="my-btn"
      ></el-input> -->
      <div class="iteminput">
        <input type="text" v-model="input2" placeholder="输入联系人/机构名称">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </div>
      <div class="start" @click="getInfo">起始日期</div>

      <el-date-picker
        class="my-btn"
        type="date"
        placeholder="选择日期"
        v-model="form.date1"
        size="small"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <div class="symbol"></div>
      <el-date-picker
        class="my-btn"
        type="date"
        placeholder="选择日期"
        v-model="form.date2"
        size="small"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
<!-- 
      <el-dropdown>
        <el-button type="primary"  size="small">
          全部商户
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in dropdownList" :key="index">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <div class="search-box" @click="seek">搜索</div>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{background:'#12223B',color:'#606266'}"
      align="center"
    >
      <el-table-column prop="organization_name" label="商户名称" align="center"></el-table-column>
      <el-table-column prop="user_id" label="商户ID" align="center"></el-table-column>
      <el-table-column prop="add_time" label="加入时间" align="center"></el-table-column>
      <el-table-column prop="recharge_amount" label="充值金额" align="center"></el-table-column>
      <el-table-column prop="withdraw_amount" label="提现金额" align="center"></el-table-column>
      <el-table-column prop="bonus_amount" label="代理提成" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template scope="scope">
          <router-link :to="{
            path:'/a_deal_detail',
            query: scope.row
          }">
            <span style="color:#3986E2">查看详细流水</span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="paging">
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :pager-count="5"
          :total="totalPage"
          :current-page.sync="curPage"
          @current-change="currentPage"
          :page-size="pageNum"
          style="background: transparent;">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nama: "dealData",
  data () {
    return {
      dropdownList: [],
      input2: '',
      form: {
        date1: '',
        date2: ''
      },
      name: '',
      page: 1,
      curPage: 1,
      totalPage: 0,
      pageNum:10,
      tableData: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    currentPage (index) {
      this.page = index
      this.getInfo()
    },

    seek () {
      this.page = 1
      this.curPage = 1
      this.getInfo()
    },
    getInfo () {
      var param = {
        start: this.form.date1,
        end: this.form.date2,
        name: this.input2,
        page: this.page,
        limit: this.pageNum,
        token: localStorage.getItem('token')
      }
      this.$post(this.$api.agency+'/api/aorder/tradingFlow', param)
        .then(res => {
          console.log(res);
          
          var _res = res.data
          this.tableData = _res.data
          this.totalPage = _res.total
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/** 基础页数 */
/deep/ .el-pagination button:disabled {
  background-color: transparent;
}
/deep/ .el-pager li {
  color: #C0C4CC;
  background-color: transparent;
}
/deep/ .el-pager li.active {
  color: #409EFF;
}
/deep/ .el-pagination .btn-next {
  color: #C0C4CC;
  background-color: transparent;
}
/deep/ .el-pagination .btn-prev {
  color: #C0C4CC;
  background-color: transparent;
}

.container {
  /* 默认列表背景样式 */
  /deep/ .el-table__empty-block {
    background: #061220;
  }
  /* 日期选择框 */
  /deep/ .my-btn, .start {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
      background-color: transparent;
      border-radius: 3px;
      color: #555f79 !important;
      font-size: 14px !important;
      border: 1px solid #555F79;
      padding-left: 30px !important;
      padding-right: 0 !important;
      &::placeholder{
        color: #555f79 !important;
      }
    }
  }
  .iteminput {
    position: relative;
    .el-input__icon {
      position: absolute;
      right: 3px;
      margin-top: 2px;
      color: #555F79;
      font-weight: 600;
      // font-size: 16px !important;
      line-height: 1;
    }
  }
  input {
    box-sizing: border-box;
    color: #555F79;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    padding-left: 12px;
    padding-right: 20px;
    background-color: transparent;
    border-radius: 3px;
    border: 1px solid #555F79;
    &::placeholder{
      color: #555F79 !important;
    }
  }
  width: 100%;
  height: 100%;
  padding: 16px 0 0 0;
  box-sizing: border-box;
  .my-form {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .el-input {
      width: 177px;
    }
    /* 时间选择器 */
    .el-date-editor {
      width: 150px !important;
    }
    .start {
      width: 90px;
      font-size: 16px;
      text-align: center;
      color: #555f79;
    }
    .symbol {
      display: inline-block;
      width: 13px;
      height: 1px;
      margin: 0 5px;
      background-color: #555f79;
    }
    .el-button--primary {
      width: 100px;
      height: 32px;
      padding: 0;
      border-radius: 2px;
      background-color: #059e7e;
      border-color: #059e7e;
      margin-left: 10px;
      .el-icon--right {
        // margin-left: 0;
      }
    }
    .search-box {
      width: 60px;
      height: 32px;
      font-size: 13px;
      line-height: 32px;
      text-align: center;
      border-radius: 2px;
      color: #fff;
      background-color: #059e7e;
      border-color: #059e7e;
      margin-left: 10px;
    }
  }
  .paging {
    display: flex;
    align-items: center;
    margin-top: 30px;
    flex-direction: row-reverse;
  }
}
</style>
