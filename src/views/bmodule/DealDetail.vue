<template>
  <div class="container">
    <router-link :to="{path:'/b_deal'}">
      <div class="el-icon-back"></div>
    </router-link>

    <el-form ref="form" :model="form" label-width="80px" class="my-form">
      <div class="right">
        <div class="start">起始日期</div>
        <el-date-picker
          class="my-btn"
          type="date"
          placeholder="选择日期"
          v-model="startTime"
          style="width: 100%;"
          size="small"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <div class="symbol">一</div>
        <el-date-picker
          class="my-btn"
          type="date"
          placeholder="选择日期"
          v-model="endTime"
          style="width: 100%;"
          size="small"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-dropdown class="first" trigger="click" @command="handleCommand">
          <el-button type="primary" size="small">
            全部类型
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in dropdownList"
              :key="index"
              :command="index"
            >{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-button type="primary" size="small" @click="getSort">
          交易金额
          <i class="el-icon-d-caret el-icon--right"></i>
        </el-button>
        <el-button type="primary" size="small" @click="queryList">搜索查询</el-button>
      </div>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{background:'#12223B',color:'#606266'}"
      align="center"
    >
      <el-table-column prop="order_no" label="订单号" align="center"></el-table-column>
      <el-table-column prop="uid" label="交易员UID" align="center"></el-table-column>
      <el-table-column prop="user_name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="user_id" label="用户ID" align="center"></el-table-column>
      <el-table-column prop="order_type" label="类型" align="center">
        <template scope="scope">
          <span v-if="scope.row.order_type === '买入'" style="color:green">{{scope.row.order_type}}</span>
          <span v-else-if="scope.row.order_type === '卖出'" style="color:red">{{scope.row.order_type}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="order_amount" label="交易金额" align="center"></el-table-column>
      <el-table-column prop="add_time" label="交易时间" align="center"></el-table-column>
      <el-table-column prop="bonus_amount" label="代理提成" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="paging">
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          layout="prev, pager, next"
          :pager-count="5"
          :total="total"
          :current-page.sync="curPage"
          @current-change="currentPage"
          :page-size="pageNum"
          style="background: transparent;"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nama: "deal",
  data() {
    return {
      dropdownList: ["卖出", "买入"],
      input2: "",
      form: {
        date1: "",
        date2: ""
      },
      tableData: [],
      curPage: 1,
      pageSize: 1,
      pageNum: 10,
      total: 0,
      startTime: "",
      endTime: "",
      order:"0",
      type:''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 分页
    currentPage(value) {
      this.pageSize = value;
      this.getList();
    },
    // 获取lieb
    getList() {
      const data = {
        token: localStorage.getItem("token"),
        page: this.pageSize,
        limit: this.pageNum,
        user_id: this.$route.query.userID,
        order:this.order,
        start: this.startTime,
        end: this.endTime,
        order_type:this.type
      };
      this.$post(this.$api.agency+"/api/border/tradingDetail", data).then(res => {  
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
   
    // 时间查询
    queryList(){
      this.curPage = 1
      this.pageSize = 1
      this.getList()
    },
    // 选择类型
    handleCommand(command) {
      this.curPage = 1
      this.pageSize = 1
      this.type = Number(command) + 1;
      this.getList();
    },
    // 排序
    getSort(){
      this.order = this.order === '1'? '2': '1'
      this.getList()
    }
  }
};
</script>

<style lang="scss" scoped>
.paging {
  display: flex;
  align-items: center;
  margin-top: 30px;
  flex-direction: row-reverse;
}
/** 基础页数 */
/deep/ .el-pagination button:disabled {
  background-color: transparent;
}
/deep/ .el-pager li {
  color: #c0c4cc;
  background-color: transparent;
}
/deep/ .el-pager li.active {
  color: #409eff;
}
/deep/ .el-pagination .btn-next {
  color: #c0c4cc;
  background-color: transparent;
}
/deep/ .el-pagination .btn-prev {
  color: #c0c4cc;
  background-color: transparent;
}

/deep/ .el-input__inner {
  background-color: #0c2040 !important;
  border-color: #0c2040;
  color: #91a4b6;
  font-size: 16px;
}
.container {
  width: 100%;
  height: 100%;
  padding: 16px 0 0 0;
  box-sizing: border-box;
  .el-icon-back {
    font-size: 18px;
    color: #4c5974;
    font-weight: bold;
    margin-bottom: 11px;
  }
  .my-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-right: 16px;
    .right {
      display: flex;
      align-items: center;
      .el-input {
        width: 223px;
      }
      .el-date-editor {
        width: 140px !important;
      }
      .start {
        width: 90px;
        font-size: 16px;
        text-align: left;
        color: #555f79;
      }
      .symbol {
        width: 30px;
        text-align: center;
      }
      .el-button--primary {
        width: 77px;
        height: 25px;
        padding: 0;
        border-radius: 2px;
        background-color: #059e7e;
        border-color: #059e7e;
        margin-left: 10px;
        .el-icon--right {
          margin-left: 0;
        }
      }
      .first {
        .el-button--primary {
          background-color: #3986e2;
          border-color: #3986e2;
        }
      }
    }
  }
}
</style>
