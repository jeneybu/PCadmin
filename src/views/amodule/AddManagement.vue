<template>
  <div class="container">
    <el-form
      label-position="left"
      :model="addForm"
      :rules="rules"
      ref="addForm"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label-width="80px" label="* 邮箱账号" prop="name">
        <el-input v-model="addForm.email" placeholder="请填写商户邮箱"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="* 联系人" prop="name">
        <el-input v-model="addForm.Contacts" placeholder="请填写商户联系人"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="* 微信账号" prop="name">
        <el-input v-model="addForm.wechat" placeholder="请填写商户微信"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="* 联系电话" prop="name" class="phoneT">
        <el-input v-model="addForm.phone" placeholder="请填写商户手机号码" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        <el-input v-model="addForm.yzcode" class="code" placeholder="输入验证码"></el-input>
        <el-button size="small" type="success" v-if="totalTime == 60" @click="countDown()" v-text="content"></el-button>
        <el-button size="small" type="success" v-else v-text="content"></el-button>
      </el-form-item>
      <el-form-item label-width="80px" label="* 机构名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请填写机构名称"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="官方链接" prop="name">
        <el-input v-model="addForm.link" placeholder="请填写商户链接（选填）"></el-input>
      </el-form-item>
      <el-form-item label-width="80px" label="机构简介" prop="name">
        <el-input type="textarea" v-model="addForm.ref" placeholder="请填写机构简介（选填）"></el-input>
      </el-form-item>
      <el-form-item label-width="180px" label="是否开启实名认证" class="payWay" style="marginBottom:0">
        <el-switch
          v-model="addForm.value"
          active-color="#059e7e"
          inactive-color="#153568">
        </el-switch>
      </el-form-item>
      <el-form-item label-width="180px" label="用户提现手续费" class="payWay" style="marginBottom:0">
        <span class="detext">固定费率{{recharge_rate}}%+ </span>
        <!-- <span class="midtext">代理奖励数如：1%</span> -->
        <input v-model="addForm.recharge_rate" type="text" placeholder="代理奖励数如：1%">
        <span class="detext">= 最终手续费</span>
        <span class="tips">{{getBuyVal}}%</span>
      </el-form-item>
      <el-form-item label-width="180px" label="提现扣除方式" class="payWay" style="marginBottom:0">
        <el-radio-group v-model="addForm.radio">
          <el-radio :label="2">用户支付</el-radio>
          <el-radio :label="1">商户支付</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="180px" label="用户提现手续费" class="payWay" style="marginBottom:0">
        <span class="detext">固定费率{{withdraw_rate}}%+ </span>
        <!-- <span class="midtext">代理奖励数如：1%</span> -->
        <input v-model="addForm.withdraw_rate" type="text" placeholder="代理奖励数如：1%">
        <span class="detext">= 最终手续费</span>
        <span class="tips">{{getSellVal}}%</span>
      </el-form-item>
      <el-form-item label-width="180px" label="充值扣除方式" class="payWay">
        <el-radio-group v-model="addForm.radio2">
          <el-radio :label="2">用户充值</el-radio>
          <el-radio :label="1">商户充值</el-radio>
        </el-radio-group>
        <!-- <span class="tips">注：充值手续费费率 3.5%</span> -->
      </el-form-item>
      <el-form-item label class="submitbtn">
        <el-button type="success" @click="toBack">取消</el-button>
        <el-button type="primary" @click="submitForm(addForm)">确定添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 弹框 -->
    <el-dialog
      title="设置资金密码"
      :visible.sync="dialogVisible"
      width="400px"
      :modal-append-to-body="false"
      center
    >
      <div
        class="dialogContant"
      >机构介绍文字机构介绍文字，机构介绍文字介绍文字机构介绍文字，机构介绍文字机构绍文字。机构介绍文字机构介绍文字机构介机构介绍文字机，构介绍文字机构介。绍文构介绍文字机构介绍文字机构介绍文字机构文字，机构介绍文字机构介绍文字，阿斯达阿斯达三大撒大声道阿斯达三大撒打算阿萨</div>
    </el-dialog>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  name: "AddManagement",
  data() {
    return {
      dialogVisible: false,
      addForm: {
        email: "",
        Contacts: "",
        wechat: "",
        phone: "",
        name: "",
        link: "",
        ref: "",
        radio: 2,
        radio2: 2,
        yzcode: "",
        mobile: "",
        value: false,
        recharge_rate: '',
        withdraw_rate: ''
      },
      rules: {
        email: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      recharge_rate: 0,
      withdraw_rate: 0,
      platform_rechange_rate: 0,
      platform_withdtaw_rate: 0,
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60,
    };
  },
  computed: {
    getBuyVal() {
      var count = Number(this.recharge_rate) + Number(this.addForm.recharge_rate)
      return count
    },
    getSellVal() {
      var count = Number(this.withdraw_rate) + Number(this.addForm.withdraw_rate)
      return count
    },
  },
  created(){
    this.recharge_rate = sessionStorage.getItem('recharge_rate')
    this.withdraw_rate = sessionStorage.getItem('withdraw_rate')
    this.platform_rechange_rate = sessionStorage.getItem('platform_rechange_rate')
    this.platform_withdtaw_rate = sessionStorage.getItem('platform_withdtaw_rate')
  },
  methods: {
    handleClick(row) {
      this.dialogVisible = true;
    },
    // 添加表单提交
    submitForm(formName) {
      if (this.addForm.email === '' || this.addForm.Contacts === '' || this.addForm.wechat === ''
        || this.addForm.phone === '' || this.addForm.name === '') {
        this.$message({
          message: '请输入必填项~',
          type: 'warning'
        });
      }
      const data = {
        token: localStorage.getItem('token'),
        mobile: formName.phone,
        email: formName.email,
        code: parseInt(formName.yzcode),
        contacts: formName.Contacts,
        wechat_no: formName.wechat,
        recharge_rate_type: formName.radio2,
        withdraw_rate_type: formName.radio,
        organization_name: formName.name,
        organization_info: formName.ref,
        website: formName.link,
        is_examine_realname: formName.value ? 1 : 0,
        recharge_rate: Number(this.platform_rechange_rate),
        withdraw_rate: Number(this.platform_withdtaw_rate),
        recharge_rate_float: Number(this.addForm.recharge_rate),
        withdraw_rate_float: Number(this.addForm.withdraw_rate)
      };
      this.$post(this.$api.agency+"/api/auser/add", data).then(res => {
        if (res.code === 0) {
          this.$message({
            message: res.data,
            type: "success"
          });
          this.$router.push('/a_pos_management')
        }
      });
    },
    // 计时器
    countDown () {
      if (this.addForm.phone === '') {
        this.$message({
          message: '请输入手机号',
          type: 'warning'
        })
        return false
      }
      this.getCode()
      this.content = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) { // 当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.content = '重新发送'
          this.totalTime = 60
        }
      }, 1000)
    },
    // 获取验证码
    getCode() {
      const data = {
        mobile: this.addForm.phone,
        type: 1
      };
      this.$post(this.$api.agency+"/api/agency/sendsms", data).then(res => {
      });
    },
    // 取消添加
    toBack(){
      this.$router.push('/a_pos_management')
    },

  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-input__inner,
.el-textarea__inner {
  background-color: #0c2040 !important;
  border-color: #0c2040;
  color: #91a4b6;
  &::placeholder{
    color: #91a4b6;
  }
}
/deep/ .el-textarea__inner {
  background-color: #0c2040 !important;
  border-color: #0c2040;
  color: #91a4b6;
  &::placeholder{
    color: #91a4b6
  }
}

/deep/ .el-form--label-left .el-form-item__label {
  color: #fff;
}

.container {
  height: 100%;
  width: 47.5%;
  position: relative;
  padding-top: 30px;
  .tips {
    color: #2a65ac;
    font-size: 12px;
  }
}
</style>
<style lang='scss' scoped>
.container {
  .el-dialog {
    background-color: #12223b;
    margin-top: 30vh;
    border-radius: 6px;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__body {
    padding: 25px 25px 60px !important;
  }
  /* 输入框 */
  .el-form-item {
    .el-form-item__label {
      color: #fff;
      font-size: 12px;
    }
    .el-form-item__content {
      .el-input,
      .el-textarea {
        .el-input__inner,
        .el-textarea__inner {
          font-size: 12px;
          color: #fff;
          background-color: #12223b;
          border: 1px solid #06476d;
          border-radius: 2px;
          padding-left: 15px !important;
          &::placeholder {
            color: #4a556e;
          }
        }
      }
    }
  }
  .phoneT {
    position: relative;
    .el-form-item__content {
      display: flex;
      .el-input {
        margin-right: 8px;
        width: 50%;
      }
      .code {
        width: 26%;
      }
    }
    .el-button--success {
      background-color: #059e7e;
      border-radius: 2px;
      color: #fefeff;
      font-size: 12px;
      border: none;
      height: 37px;
      position: absolute;
      top: 3px;
      right: 2px;
    }
  }
  .payWay {
    input {
      color: #fff;
      padding-left: 6px;
      padding-right: 30px;
      height: 30px;
      border: 1px solid #2F71BF;
      border-radius: 5px;
      margin-right: 10px;
      background: #0c2040;
    }
    .detext {
      display: inline-block;
      color: #fff;
      margin-right: 10px;
    }
    .midtext {
      display: inline-block;
      color: #2F71BF;
      padding-left: 6px;
      padding-right: 30px;
      border: 1px solid #2F71BF;
      border-radius: 5px;
      margin-right: 10px;
    }
    .bltext {
      width: 10px;
    }
    .el-radio {
      .el-radio__label {
        font-size: 12px;
        color: #47526b;
      }
      .el-radio__input {
        .el-radio__inner {
          background-color: transparent;
          border-color: #06476d;
        }
      }
      .is-checked {
        .el-radio__inner {
          background-color: #214e84;
          &::after {
            background-color: #3986e2;
          }
        }
      }
    }
  }
  .submitbtn {
    .el-form-item__content {
      display: flex;
      .el-button {
        flex: 1;
        margin-right: 30px;
        background-color: #2f71bf;
        border-color: #2f71bf;
        font-size: 12px;
        color: #fff;
        padding: 12px 80px;
      }
      .el-button--success {
        background-color: transparent;
        border-color: #2f71bf;
        color: #2f71bf;
      }
    }
  }
}
</style>
