<template>
  <div class="container">
    <div class="top">
      <div class="password">
        <el-button type="primary" size="small" @click="dialogVisible3 = true">修改登录密码</el-button>
        <el-button type="primary" size="small" @click="dialogVisible1 = true">修改资金密码</el-button>
      </div>
      <div class="register">
        <span>注册手机</span>
        <div class="input">
          <el-input v-model="mobileChange.old_mobile" placeholder="请输入手机号" size="small" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </div>
        <el-button type="primary" size="small" @click="dialogVisible2 = true">换绑</el-button>
      </div>
    </div>
    <div class="main">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        class="form"
        :label-position="labelPosition"
      >
        <el-form-item label="代理ID">
          <el-input v-model="form.agency_id" size="small"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.contacts" size="small"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="form.WeChat" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="保证金">
          <el-input v-model="form.cash" size="small"></el-input>
        </el-form-item>
        <el-form-item label="代理名称">
          <el-input v-model="form.agency_name" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="奖励比例">
          <el-input v-model="form.award" size="small"></el-input>
        </el-form-item> -->
        <el-form-item label="机构简介">
          <el-input type="textarea" v-model="form.brief" size="small"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 设置资金密码弹框 -->
    <el-dialog
      title="设置资金密码"
      :visible.sync="dialogVisible1"
      width="285px"
      :modal-append-to-body="false"
      center
    >
      <div class="mobile">
        <span>验证手机：{{setPassword.mobile}}</span>
      </div>
      <div class="text">
        <el-input size="small" placeholder="输入验证码" v-model="setPassword.code"></el-input>
        <el-button type="primary" @click="getCode(setPassword.mobile,2,0)">
          <count-down ref="timed" :timer="60" xxx></count-down>
        </el-button>
      </div>
      <div class="tips" style="marginTop:16px;">注：为确保资金安全，请先验证手机，并设置您的资金密码。</div>
      <div class="password" style="marginTop:20px;">设置资金密码</div>
      <el-input size="small" placeholder="请输入6位数密码" v-model="setPassword.password" class="input"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setpassword" style="marginTop:16px;">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 更换手机号弹框 -->
    <el-dialog
      title="更换手机号"
      :visible.sync="dialogVisible2"
      width="285px"
      :modal-append-to-body="false"
      center
    >
      <div class="mobile">
        <span>验证手机：{{mobileChange.old_mobile}}</span>
      </div>
      <div class="text">
        <el-input size="small" placeholder="输入验证码" v-model="mobileChange.old_code"></el-input>
        <el-button type="primary" @click="getCode(mobileChange.old_mobile,3,1)">
          <count-down ref="timed1" :timer="60"></count-down>
        </el-button>
      </div>
      <div class="tips" style="marginTop:16px;">注：为确保资金安全，请先验证手机。</div>
      <div class="password" style="marginTop:16px;">新的手机号</div>
      <el-input
        size="small"
        placeholder="请输入新的手机号码"
        v-model="mobileChange.new_mobile"
        class="input"
        oninput="value=value.replace(/[^\d]/g,'')"
      ></el-input>
      <div class="text1" style="marginTop:10px">
        <el-input size="small" placeholder="输入新的手机验证码" v-model="mobileChange.new_code"></el-input>
        <el-button type="primary" class="btn" @click="getCode1(mobileChange.new_mobile,3)">
          <count-down ref="timed3" :timer="60"></count-down>
        </el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitChange" style="marginTop:16px;">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改登录密码弹框 -->
    <el-dialog
      title="修改登录密码"
      :visible.sync="dialogVisible3"
      width="300px"
      :modal-append-to-body="false"
      center
    >
      <div class="mobile">
        <span>验证手机：{{changeLogin.mobile}}</span>
      </div>
      <div class="text">
        <el-input size="small" placeholder="输入验证码" v-model="changeLogin.code"></el-input>
        <el-button type="primary" @click="getCode(changeLogin.mobile,2,2)">
          <count-down ref="timed2" :timer="60"></count-down>
        </el-button>
      </div>
      <div class="tips" style="marginTop:16px;">注：为确保资金安全，请先验证手机。</div>
      <div class="password" style="marginTop:16px;">设置登录密码</div>
      <el-input
        size="small"
        placeholder="请输入6-20位登录密码"
        v-model="changeLogin.password"
        class="input"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changePassword" style="marginTop:16px;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import CountDown from "components/CountDown";
import { Message } from "element-ui";
export default {
  components: {
    CountDown
  },
  data() {
    return {
      input: "",
      input3: "",
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      labelPosition: "left",
      form: {
        agency_id: "",
        contacts: "",
        WeChat: "",
        email: "",
        cash: "",
        agency_name: "",
        award: "",
        brief: ""
      },
      // 手机换绑
      mobileChange: {
        old_mobile: "",
        old_code: "",
        new_mobile: "",
        new_code: ""
      },
      // 修改登录密码
      changeLogin: {
        code: "",
        password: "",
        mobile: "153****4544"
      },
      // 设置资金密码
      setPassword: {
        code: "",
        password: "",
        mobile: "153****4544"
      }
    };
  },
  created() {
    this.getInfro();
  },
  methods: {
    getValue(e) {
      console.log(e);
    },
    // 信息管理列表
    getInfro() {
      this.$post(this.$api.agency + "/api/auser/agencyInfo", {
        token: localStorage.getItem("token")
      }).then(res => {
        this.form.agency_id = res.data.id;
        this.form.contacts = res.data.contacts;
        this.form.WeChat = res.data.wechat_no;
        this.form.email = res.data.email;
        this.form.cash = res.data.deposit;
        this.form.agency_name = res.data.agency_name;
        this.form.award = res.data.bonus_rate;
        this.form.brief = res.data.agency_info;
        let mobile = localStorage.getItem("userMsg");
        this.changeLogin.mobile = JSON.parse(mobile).mobile;
        this.setPassword.mobile = JSON.parse(mobile).mobile;
      });
    },
    // 获取验证码
    getCode(mob, tp, id) {
      if (id === 0) {
        if (this.$refs.timed.send === "no") {
          this.$post(this.$api.agency + "/api/agency/sendsms", {
            mobile: mob,
            type: 1
          }).then(res => {});
        }
        this.$refs.timed.countdowm();
      } else if (id === 1) {
        if (this.$refs.timed1.send === "no") {
          this.$post(this.$api.agency + "/api/agency/sendsms", {
            mobile: mob,
            type: 1
          }).then(res => {});
        }
        this.$refs.timed1.countdowm();
      } else if (id === 2) {
        if (this.$refs.timed2.send === "no") {
          this.$post(this.$api.agency + "/api/agency/sendsms", {
            mobile: mob,
            type: 1
          }).then(res => {});
          this.$refs.timed2.countdowm();
        }
      }
    },

    getCode1(mob, tp) {
      if (this.mobileChange.new_mobile === "") {
        Message({
          message: "手机号码不能为空",
          type: "error"
        });
        return false;
      }
      if (this.mobileChange.old_mobile === this.mobileChange.new_mobile) {
        Message({
          message: "解绑的手机与换绑的手机账号能一致",
          type: "error"
        });
        return false;
      }
      if (this.$refs.timed3.send === "no") {
        this.$post(this.$api.agency + "/api/agency/sendsms", {
          mobile: mob,
          type: 1
        }).then(res => {});
      }
      this.$refs.timed3.countdowm();
    },
    // 手机换绑提交事件
    submitChange() {
      this.dialogVisible2 = false;
      const data = {
        token: localStorage.getItem("token"),
        old_mobile: this.mobileChange.old_mobile,
        old_code: parseInt(this.mobileChange.old_code),
        new_mobile: this.mobileChange.new_mobile,
        new_code: parseInt(this.mobileChange.new_code)
      };
      this.$post(this.$api.agency + "/api/auser/modifyMobile", data).then(
        res => {
          if (res.code === 0) {
            this.mobileChange.old_code = "";
            this.mobileChange.new_mobile = "";
            this.mobileChange.new_code = "";
            Message({
              message: res.data,
              type: "success"
            });
          }
        }
      );
    },
    // 修改登陆密码
    changePassword() {
      this.dialogVisible3 = false;
      const data = {
        token: localStorage.getItem("token"),
        mobile: this.changeLogin.mobile,
        code: parseInt(this.changeLogin.code),
        password: this.changeLogin.password
      };
      this.$post(
        this.$api.agency + "/api/auser/modifyLoginPassword",
        data
      ).then(res => {
        if (res.code === 0) {
          this.changeLogin.code = "";
          this.changeLogin.password = "";
          Message({
            message: res.data,
            type: "success"
          });
        }
      });
    },
    // 设置资金密码
    setpassword() {
      this.dialogVisible1 = false;
      const data = {
        token: localStorage.getItem("token"),
        mobile: this.setPassword.mobile,
        code: parseInt(this.setPassword.code),
        pay_password: this.setPassword.password
      };
      this.$post(this.$api.agency + "/api/auser/modifyPayPassword", data).then(
        res => {
          if (res.code === 0) {
            this.setPassword.code = "";
            this.setPassword.password = "";
            Message({
              message: res.data,
              type: "success"
            });
          }
        }
      );
    },
    // 弹框关闭
    closedText() {
      // window.location.reload();
    }
  }
};
</script>


<style lang="scss" scoped>
/deep/ .el-input__inner {
  background-color: #0c2040 !important;
  border-color: #0c2040;
  color: #91a4b6;
  font-size: 14px;
}
/deep/ .el-textarea__inner {
  background-color: #0c2040 !important;
  border-color: #0c2040;
  color: #91a4b6;
}
.container {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 148px;
    background-color: #081832;
    overflow: hidden;
    padding-left: 25px;
    box-sizing: border-box;
    .password {
      margin-top: 33px;
      .el-button--primary {
        margin-right: 10px;
        border-radius: 2px;
        &:nth-child(2) {
          background-color: #059e7e;
          border-color: #059e7e;
        }
      }
    }
    .register {
      display: flex;
      align-items: center;
      margin-top: 29px;
      span {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        width: 70px;
        line-height: 12px;
      }
      .input {
        width: 120px;
        margin-right: 16px;
        margin-left: 11px;
      }
      .el-button--primary {
        border-radius: 2px;
      }
    }
  }
  .main {
    width: 100%;
    height: 452px;
    background-color: #081832;
    margin-top: 12px;
    .form {
      width: 507px;
      height: 100%;
      padding: 35px 0 0 24px;
      box-sizing: border-box;

      .el-form-item {
        margin-bottom: 0;

        &:last-child {
          margin-top: 10px;
        }
      }
    }
  }

  .el-dialog__wrapper {
    .mobile {
      font-size: 14px;
      color: #5c6680;
      margin-bottom: 15px;
    }
    .text {
      display: flex;
      align-items: center;
      .el-input {
        width: 170px;
        background-color: #0e1b2f;
        color: #2b374f;
        font-size: 14px;
        margin-right: 10px;
        border-radius: 2px;
      }
      button {
        width: 70px;
        height: 25px;
        background-color: #059e7e;
        font-size: 14px;
        color: #fff;
        border: 2px;
        line-height: 25px;
        border-radius: 2px;
      }
    }
    .text1 {
      display: flex;
      align-items: center;
      .el-input {
        width: 170px;
        background-color: #0e1b2f;
        color: #2b374f;
        font-size: 14px;
        margin-right: 10px;
        border-radius: 2px;
      }
      button {
        width: 70px;
        height: 25px;
        background-color: #3986e2;
        font-size: 14px;
        color: #fff;
        border: 2px;
        line-height: 25px;
        border-radius: 2px;
      }
    }
    .tips {
      color: #047e65;
      font-size: 13px;
      line-height: 18px;
      height: 14px;
      margin-bottom: 10px;
    }
    .password {
      color: #5c6680;
      font-size: 14px;
      margin-bottom: 15px;
      margin-top: 10px;
    }
    .input {
      width: 239px;
      background-color: #0e1b2f;
      color: #2b374f;
      font-size: 14px;
      margin-right: 10px;
      border-radius: 2px;
    }
    .el-button--primary {
      width: 242px;
      height: 32px;
      padding: 0;
      border-radius: 2px;
    }
  }
}
</style>




