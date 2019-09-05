<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" class="my-form">
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

      <div class="iteminput" style="margin-left: 15px">
        <el-input placeholder="请输入内容" v-model="input2" class="input-with-box" style="width: 250px;">
          <el-select v-model="select2" slot="prepend" placeholder="请选择" class="input-with-select">
            <el-option label="联系人" value="1"></el-option>
            <el-option label="手机号码" value="2"></el-option>
          </el-select>
        </el-input>
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </div>
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
      <el-table-column prop="id" label="代理ID" align="center" width="180px"></el-table-column>
      <el-table-column prop="organization_name" label="联系人" align="center"></el-table-column>
      <el-table-column prop="organization_info" label="手机号" align="center"></el-table-column>
      <el-table-column prop="website" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="contacts" label="微信号" align="center"></el-table-column>
      <el-table-column prop="tel" label="代理名称" align="center"></el-table-column>
      <el-table-column prop="wechat" label="代理简介" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="third_uid" label="加入时间" align="center"></el-table-column>
      <el-table-column prop="add_time" label="缴纳保证金" align="center"></el-table-column>
      <el-table-column prop="add_time" label="邀请人数" align="center"></el-table-column>
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
      input2: '',
      select2: '',
      dropdownList: [],
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

/** 输入框 */
/deep/ .el-input-group__prepend {
  padding: 0;
  border: 1px solid #555f79;
  border-right: none;
  background: transparent;
}

/deep/ .el-select .el-input {
  margin: 0;
}

/deep/ .el-input__suffix {
  right: -20px;
}

.input-with-select {
  width: 60px;
  margin-left: 0;
  margin-right: 0;
  padding-left: 5px;
  padding-right: 20px;
}

/deep/ .el-input__inner {
  height: 32px;
  line-height: 32px;
  color: #708193;
  border: 1px solid #555f79;
  border-left: none;
  background: transparent;
  // width: 150px;
  padding: 0;
  // padding-left: 10px;
}

/deep/ .el-input__inner::placeholder {
  color: #555f79;
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
