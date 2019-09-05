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
          团队人数
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
      <el-table-column prop="uid" label="UID" align="center"></el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="190px" align="center"></el-table-column>

      <el-table-column prop="is_realname" label="是否实名" align="center">
        <template scope="scope">
          <span v-if="scope.row.is_realname ==='是'" style="color:#059E7E;">{{scope.row.is_realname}}</span>
          <span
            v-else-if="scope.row.is_realname ==='否'"
            style="color:red;"
          >{{scope.row.is_realname}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="deposit" label="保证金" align="center">
        <template scope="scope">
          <span v-if="scope.row.deposit ==='0'" style="color:red;">{{scope.row.deposit}}</span>
          <span v-else style="color:#059E7E;">{{scope.row.deposit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="注册时间" width="150px" align="center"></el-table-column>
      <el-table-column prop="pid" label="推荐人ID" align="center"></el-table-column>
      <el-table-column prop="total_num" label="团队人数" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template scope="scope">
          <span style="color:#3986E2;cursor:pointer" @click="toDetail(scope.row.uid)">查看团队人员</span>
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
  nama: "Binformation",
  data() {
    return {
      input2: "",
      form: {
        date1: "",
        date2: ""
      },
      tableData: [],
      curPage: 1,
      // 页码
      pageSize: 1,
      // 页容量
      pageNum: 10,
      // 总数
      total: 0,
      startTime: "",
      endTime: "",
      queryName: "",
      order: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    currentPage(value) {
      this.pageSize = value;
      this.getList();
    },
    getList() {
      const data = {
        token: localStorage.getItem("token"),
        page: this.pageSize,
        limit: this.pageNum,
        order:this.order,
        start: this.startTime,
        end: this.endTime,
        mobile: this.queryName
      };
      this.$post(this.$api.agency+"/api/buser/userList", data)
        .then(res => {
          this.tableData = res.data.data;
          this.total = res.data.total;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 搜索商户列表
    queryUser() {
      this.curPage = 1
      this.pageSize = 1
      this.getList()
    },
    toDetail(value) {
      this.$router.push({
        path: "/b_InforDtetail",
        query: {
          userID: value
        }
      });
    },
    // 排序
    getSort() {
      this.order = !this.order;
      console.log(this.order);
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

/deep/ .el-input--small .el-input__inner {
  background-color: #0c2040;
  border-color: #0c2040;
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
