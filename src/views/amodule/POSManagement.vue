<template>
  <div class="container">
    <!-- 搜索查询 -->
    <ul class="search">
      <li class="iteminput">
        <input type="text" placeholder="输入联系人/机构名称" v-model="queryName" />
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </li>
      <li class="iteminput">
        <span class="date-span">起始日期</span>
      </li>
      <li class="iteminput">
        <el-date-picker
          popper-class="xiala"
          v-model="startTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </li>
      <li class="iteminput">
        <span class="line"></span>
      </li>
      <li class="iteminput">
        <el-date-picker
          popper-class="xiala"
          v-model="endTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </li>
      <li class="iteminput iteminput5">
        <span class="subSearch" @click="addMerchant" style="cursor:pointer">添加商户</span>
      </li>
      <li class="iteminput iteminput5">
        <span class="search-box" @click="queryUser" style="cursor:pointer">搜索</span>
      </li>
    </ul>
    <!-- 表格 -->
    <div v-if="dataShow" class="tableBox">
      <el-table
        :data="userList"
        border
        style="width: 100%"
        :header-cell-style="{background:'#12223B',color:'#606266'}"
        align="center"
      >

        <el-table-column prop="third_uid" label="机构ID" align="center" width="180px"></el-table-column>
        <el-table-column prop="contacts" label="联系人" align="center"></el-table-column>
        <el-table-column prop="tel" label="联系电话" align="center" width="200px"></el-table-column>
        <el-table-column prop="email" label="电子地址" align="center"></el-table-column>
        <el-table-column prop="wechat" label="微信账号" align="center"></el-table-column>
        <el-table-column prop="organization_name" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="website" label="官方链接" align="center"></el-table-column>
        <el-table-column prop="organization_info" label="机构信息" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="加入时间" align="center" width="180px"></el-table-column>
        <el-table-column prop="add_time" label="操作" align="center" width="180px">
          <template scope="scope">
            <span style="color:#059E7E; cursor:pointer" @click="sendID(scope.row.third_uid)">发送密钥</span>
            <span style="color:red; marginLeft:10px; cursor:pointer " @click="resetID(scope.row.third_uid)">重置密钥</span>
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
            :page-size="pageNum"
            :current-page.sync="curPage"
            @current-change="handleCurrentChange"
            style="background: transparent;"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- 无数据 -->
    <div v-else class="nodata">
      <img src="~imgurl/noData.png" alt />
    </div>
    <!-- 详情弹框 -->
    <el-dialog
      title="机构详细信息"
      :visible.sync="dialogVisible"
      width="400px"
      :modal-append-to-body="false"
      center
    >
      <div class="dialogContant">{{text}}</div>
    </el-dialog>

    <!-- 发送密钥弹框 -->
    <el-dialog :visible.sync="dialogVisible1" width="273px" :modal-append-to-body="false" center>
      <div class="d-content">
        <div class="title">
          重置密钥成功，是否重新发送密
          钥信息给商户？
        </div>
        <div class="btn">
          <el-button type="primary" size="small" class="send" @click="dialogVisible1 = false;">稍后发送</el-button>
          <el-button type="primary" size="small" @click="sendKey">现在发送</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 重置密钥弹框 -->
    <el-dialog :visible.sync="dialogVisible2" width="273px" :modal-append-to-body="false" center>
      <div class="d-content">
        <div class="title">
          密钥已发送成功，请及时联系项目
          方技术人员进行API接入
        </div>
        <div class="btn">
          <el-button type="primary" size="small" @click="resetKey">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "POSManagement",
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      userList: [],
      inputName: "",
      startTime: "",
      endTime: "",
      queryName: "",
      dataShow: true,
      curPage: 1,
      // 页码
      pageSize: 1,
      // 页数
      pageNum: 10,
      total: 0,
      text: "",
      userID: "",
      buyRate: "",
      sellRate: ""
    };
  },
  methods: {
    handleClick(row) {
      this.dialogVisible = true;
      this.text = row.organization_name;
    },
    addMerchant() {
      this.$router.push({
        path: "/a_add_management",
        query: {
          index: 5,
          buy: this.buyRate,
          sell: this.sellRate
        }
      });
      sessionStorage.setItem("addManagement", "true");
    },
    // 商户管理列表篇
    getUserList() {
      const data = {
        token: localStorage.getItem("token"),
        page: this.pageSize,
        limit: this.pageNum,
        start: this.startTime,
        end: this.endTime,
        name: this.queryName
      };
      this.$post(this.$api.agency + "/api/auser/userList", data).then(res => {
        sessionStorage.setItem('recharge_rate', res.data.recharge_rate)
        sessionStorage.setItem('withdraw_rate', res.data.withdraw_rate)
        sessionStorage.setItem('platform_rechange_rate', res.data.platform_rechange_rate)
        sessionStorage.setItem('platform_withdtaw_rate', res.data.platform_withdtaw_rate)
        this.buyRate = res.data.recharge_rate;
        this.sellRate = res.data.withdraw_rate;
        this.userList = res.data.data;
        this.pageSize = res.data.current_page;
        this.pageNum = res.data.per_page;
        this.total = res.data.total;
      });
    },
    // 页码改变事件
    handleCurrentChange(current) {
      this.pageSize = current;
      this.getUserList();
    },
    // 搜索商户列表
    queryUser() {
      this.curPage = 1;
      this.pageSize = 1;
      this.getUserList();
    },
    sendID(idx) {
      this.dialogVisible1 = true;
      this.userID = idx;
    },
    resetID(idx) {
      this.dialogVisible2 = true;
      this.userID = idx;
    },
    // 发送密钥
    sendKey() {
      this.dialogVisible1 = false;
      const data = {
        token: localStorage.getItem("token"),
        user_id: this.userID
      };
      this.$post(this.$api.agency + "/api/auser/sendEncryption", data).then(
        res => {
          this.$message.success(res.data);
        }
      );
    },

    // 重置密钥
    resetKey() {
      this.dialogVisible2 = false;
      const data = {
        token: localStorage.getItem("token"),
        user_id: this.userID
      };
      this.$post(this.$api.agency + "/api/auser/resetEncryption", data).then(
        res => {
          this.$message.success(res.data);
        }
      );
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped>
.d-content {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    font-size: 16px;
    color: #fff;
    line-height: 18px;
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 26px;
    width: 100%;
    .send {
      background-color: #12223b;
      color: #2f71bf;
    }
  }
  .btn:nth-of-type(2) {
    .el-button--primary {
      width: 190px;
    }
  }
}
/* 输入样式框 */
/deep/ .el-dialog__body {
  padding: 0;
}
/deep/ .el-input__inner {
  height: 32px;
  line-height: 32px;
  background-color: transparent;
  border-radius: 3px;
  color: #708193;
  // font-size: 12px !important;
  border: 1px solid #555f79;
  padding: 0 30px !important;
}

/deep/ .el-input__inner::placeholder {
  color: #555f79;
}

/** 时间选择框 */
/deep/ .el-date-editor.el-input {
  width: 150px;
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

.container {
  height: 100%;
  width: 100%;
  position: relative;
  .search {
    height: 60;
    line-height: 60px;
    display: flex;
    .iteminput {
      font-size: 14px;
      color: #555f79;
      position: relative;
      .date-span {
        display: inline-block;
        width: 70px;
        text-align: center;
      }
      input {
        color: #555f79;
        font-size: 14px;
        padding: 2px 12px;
        padding-right: 20px;
        height: 26px;
        line-height: 26px;
        background-color: transparent;
        border-radius: 3px;
        border: 1px solid #555f79;
        &::placeholder {
          color: #555f79;
        }
      }
      i {
        position: absolute;
        top: 5%;
        right: 3px;
        margin-top: -2px;
        color: #555f79;
        font-weight: 600;
        // font-size: 13px !important;
      }
      .subSearch {
        display: inline-block;
        font-size: 14px;
        color: #fff;
        background-color: #059e7e;
        border-radius: 3px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      .search-box {
        display: inline-block;
        font-size: 14px;
        color: #fff;
        background-color: #059e7e;
        border-radius: 3px;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:active {
          background: #07b18c;
        }
      }
      .line {
        display: inline-block;
        width: 15px;
        height: 1px;
        margin: 0 5px;
        margin-bottom: 2px;
        background-color: #555f79;
        line-height: 1;
      }
    }
    .iteminput5 {
      padding-top: 2px;
      margin-left: 10px;
    }
  }
  .dialogContant {
    font-size: 12px;
    color: #5c6680;
    background-color: #0e1b2f;
    border-radius: 17px;
    padding: 39px 31px 50px 24px;
  }
  .nodata {
    position: absolute;
    top: 300px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
  }
  .paging {
    display: flex;
    align-items: center;
    margin-top: 30px;
    flex-direction: row-reverse;
  }
}
</style>


