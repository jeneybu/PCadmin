<template>
  <div class="container">
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
        <el-input
          placeholder="输入手机号码查询"
          prefix-icon="el-icon-search"
          v-model="queryName"
          size="small"
          style="marginLeft:10px"
          class="my-btn"
        ></el-input>

        <el-button type="primary" size="small" @click="getSort">
          交易金额
          <i class="el-icon-d-caret el-icon--right"></i>
        </el-button>
        <el-button type="primary" size="small" @click="queryUser">搜索查询</el-button>
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
      <el-table-column prop="user_id" label="UID" width="100%" align="center"></el-table-column>
      <el-table-column prop="user_name" label="真实名字" width="100%" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="190px" align="center"></el-table-column>
      <el-table-column prop="pid" label="推荐人ID" align="center"></el-table-column>
      <el-table-column prop="add_time" label="加入时间" width="180px" align="center"></el-table-column>
      <el-table-column prop="num" label="交易次数" align="center"></el-table-column>
      <el-table-column prop="amount" label="交易总金额" align="center"></el-table-column>
      <el-table-column prop="bonus_amount" label="代理提成" align="center"></el-table-column>
      <el-table-column prop="user_id" label="操作" align="center">
        <template scope="scope">
          <span style="color:#3986E2;cursor:pointer" @click="toDetail(scope.row.user_id)">查看交易明细</span>
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
  nama: "Bdeal",
  data() {
    return {
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
      queryName: "",
      order: "0"
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
    // 获取列表
    getList() {
      const data = {
        token: localStorage.getItem("token"),
        page: this.pageSize,
        limit: this.pageNum,
        order: this.order ,
        start: this.startTime,
        end: this.endTime,
        name: this.queryName
      };
      this.$post(this.$api.agency+"/api/border/tradingFlow", data).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },

    // 搜索查询
    queryUser() {
      this.curPage = 1
      this.pageSize = 1
      this.getList()
    },

    // 详情跳转
    toDetail(value) {
      this.$router.push({
        path: "/b_detail",
        query: {
          userID: value
        }
      });
    },
    // 排序
    getSort() {
      this.order = this.order === '1'? '2': '1'
      this.getList()
      console.log(this.order);
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
        text-align: center;
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
    }
  }
}
</style>
