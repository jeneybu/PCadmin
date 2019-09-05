<template>
  <div class="container">
    <!-- 搜索查询 -->
    <ul class="search">
      <li class="iteminput">
          <el-date-picker
            popper-class="xiala"
            v-model="startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
      </li>
      <li class="iteminput">
        <span class="line"></span>
      </li>
      <li class="iteminput">
          <el-date-picker
            popper-class="xiala"
            v-model="endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
      </li>
      <li class="iteminput iteminput4">
        <el-select v-model="value" placeholder="手机号码">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <input type="text" placeholder="输入手机号码查询" class="inputPhone">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </li>
      <li class="iteminput iteminput5">
         <span class="subSearch" @click="search(0)">团队人数<i class="el-icon-d-caret"></i></span>
      </li>
      <li class="iteminput iteminput5">
         <span class="subSearch subSearch2" @click="search(1)">查询</span>
      </li>
    </ul>
    <!-- 表格 -->
    <div v-if="dataShow" class="tableBox">
      <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{background:'#12223B',color:'#606266'}"
          align="center"
        >
          <el-table-column prop="date" label="UID" width="100%" align="center"></el-table-column>
          <el-table-column prop="name" label="手机号" width="100%" align="center"></el-table-column>
          <el-table-column prop="address" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="istrue" label="是否实名" align="center">
            <template slot-scope="scope">
              <el-button type="text" class="isgreen" :class="{'isred': scope.row.istrue=='否'}">{{scope.row.istrue}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="用户名称" align="center"></el-table-column>
          <el-table-column prop="address" label="保证金" align="center">
            <template slot-scope="scope">
              <el-button type="text" class="isgreen" :class="{'isred': scope.row.istrue=='否'}">{{scope.row.istrue}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="注册时间" align="center"></el-table-column>
          <el-table-column prop="address" label="推荐人ID" align="center"></el-table-column>
          <el-table-column prop="address" label="团队人数" align="center"></el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" class="lookman" size="small">查看团队人员</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="加入时间" align="center"></el-table-column>
        </el-table>
    </div>

    <!-- 无数据 -->
    <div v-else class="nodata">
      <img src="~imgurl/noData.png" alt="">
    </div>
    <!-- 弹框 -->
    <el-dialog title="设置资金密码" :visible.sync="dialogVisible" width="400px" :modal-append-to-body='false' center>
      <div class="dialogContant">机构介绍文字机构介绍文字，机构介绍文字介绍文字机构介绍文字，机构介绍文字机构绍文字。机构介绍文字机构介绍文字机构介机构介绍文字机，构介绍文字机构介。绍文构介绍文字机构介绍文字机构介绍文字机构文字，机构介绍文字机构介绍文字，阿斯达阿斯达三大撒大声道阿斯达三大撒打算阿萨</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TraderInformation",
  data() {
    return {
      dialogVisible:false,
      rank:false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          istrue: '否'
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          istrue: '是'
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          istrue: '是'
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          istrue: '是'
        }
      ],
      inputName: '',
      startTime: '',
      endTime: '',
      dataShow: true,
      options: [
        {
          value: '选项1',
          label: '00355'
        }, {
          value: '选项2',
          label: '21232'
        }, {
          value: '选项3',
          label: '45655'
        }, {
          value: '选项4',
          label: '45646'
        }, {
          value: '选项5',
          label: '45646'
        }
      ],
      value: ''
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
      this.dialogVisible = true
    },
    search () {
      if (index === 0) {
        this.rank = !rank
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner{
  color: #555F79;
  font-size: 12px;
  padding: 15px 10px 15px 30px !important;
  height: 26px;
  line-height: 26px;
  background-color: transparent;
  border-radius: 3px;
  border: 1px solid #555F79;
}

/deep/ .el-input__inner::placeholder{
  color: #555F79
}

.container {
  height: 100%;
  width: 100%;
  position: relative;
  .search{
    height: 100px;
    line-height: 100px;
    display: flex;
    .iteminput{
      position: relative;
      margin-right: 20px;
      input{
        color: #555F79;
        font-size: 12px;
        padding: 2px 12px;
        height: 26px;
        line-height: 26px;
        background-color: transparent;
        border-radius: 3px;
        border: 1px solid #555F79;
        &::placeholder{
          color: #555F79
        }
      }
      i{
        position: absolute;
        top: 4%;
        right: -12px;
        margin-right: 20px;
        width: 15px;
        color: #555F79;
        font-weight: 600;
        font-size: 12px
      }
      .subSearch{
        position: relative;
        display: inline-block;
        font-size: 14px;
        color: #fff;
        background-color: #059E7E;
        border-radius: 3px;
        width: 118px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        .el-icon-d-caret{
          top: 26%;
          font-size: 14px;
          color: #fff;
        }
      }
      .subSearch2{
        width: 80px
      }
      .line{
        display: inline-block;
        width: 25px;
        height: 1px;
        background-color: #555F79
      }
    }
    .iteminput5{
      padding-top: 2px
    }
  }
  .dialogContant{
    font-size: 12px;
    color: #5C6680;
    background-color: #0E1B2F;
    border-radius: 12px;
    padding: 39px 31px 50px 24px
  }
  .nodata{
    position: absolute;
    top: 300px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px
  }
}
</style>
<style lang="scss">
.container{
  
  .el-dialog{
    background-color: #12223B;
    margin-top: 30vh;
    border-radius: 6px
  }
  .el-dialog__title{
    color: #fff;
  }
  .el-dialog__body{
  padding: 25px 25px 60px !important;
  }
  .el-input__icon{
    color: #555F79;
    font-weight: 600;
    font-size: 12px;
  }
  .iteminput4{
    .el-select{
       width: 33%;
       position: absolute;
       left: 5px;
      .el-input__inner{
        padding: 15px 0 15px 0 !important;
        height: 24px;
        line-height: 24px;
        border: none;
        color: #555F79
      }
      .el-input__suffix{
        right: 7px;
        color: #555F79
      }
    }
    .inputPhone{
      padding-left: 70px !important
    }
  }
  
  .el-table {
    font-size: 12px;
    color: #7380A0;
    .el-button--text{
      font-size: 12px;
      color: #059E7E
    }
    .isred {
      color: #B40B0B !important
    }
    .lookman{
      color: #3884DF !important;
      text-decoration:underline
    }
  }
  .el-select .el-input .el-select__caret{
    color: #555F79
  }

}
</style>
