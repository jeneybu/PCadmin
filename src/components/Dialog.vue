<template>
  <div class="Dialog">
    <!-- 登录弹框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="ondialogVal"
      :before-close="handleClose"
      center
      width="23.27%"
      :close-on-click-modal="false"
    >
      <div class="loginBox" v-if="!forgetPwds">
        <el-form :model="form">
          <el-form-item label :label-width="formLabelWidth">
            <el-select v-model="form.value" placeholder="请选择后台类型" :change="selecValue(form.value)">
              <el-option
                v-for="item in form.region"
                :label="item.label"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label :label-width="formLabelWidth" close-on-press-escape="false">
            <el-input v-model="form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <!-- 密码验证 -->
          <el-form-item label :label-width="formLabelWidth" close-on-press-escape="false">
            <i class="te-icon pwdicon"></i>
            <i
              class="te-icon eyeicon"
              @click="isShowPwd=!isShowPwd"
              :class="{'eyeicon-zh': isShowPwd}"
            ></i>

            <el-input
              v-if="!isShowPwd"
              v-model="form.password"
              type="password"
              auto-complete="off"
              placeholder="请输入密码"
            ></el-input>

            <el-input v-else v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>

          <el-form-item label :label-width="formLabelWidth" close-on-press-escape="false">
            <i class="te-icon yzmicon"></i>
            <img :src="codeUrl" alt class="yzmImg" @click="getimgCode()">
            <el-input v-model="form.yzcode" auto-complete="off" placeholder="请输入验证码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitA(form)">登 录</el-button>
          <span class="forget" @click="forgetPwd()">忘记密码？</span>
        </div>
      </div>
      <div class="forgetpwd" v-else>
        <el-form :model="form1">
          <el-form-item label :label-width="formLabelWidth">
            <el-select v-model="form1.value" placeholder="请选择后台类型" :change="selecValue(form1.value)">
              <el-option
                v-for="item in form1.region"
                :label="item.label"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label :label-width="formLabelWidth" close-on-press-escape="false">
            <el-input v-model="form1.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
          </el-form-item>

          <el-form-item label :label-width="formLabelWidth" close-on-press-escape="false">
            <i class="te-icon yzmicon"></i>
            <span v-if="totalTime == 60 " class="phoneCode" @click="countDown()">{{codeText}}</span>
            <span v-else class="phoneCode">{{codeText}}</span>
            <el-input v-model="form1.yzcode" auto-complete="off" placeholder="请输入手机验证码"></el-input>
          </el-form-item>
        <!-- 密码验证 -->
          <el-form-item label :label-width="formLabelWidth" close-on-press-escape="false">
            <i class="te-icon pwdicon"></i>
            <i
              class="te-icon eyeicon"
              @click="isShowPwd=!isShowPwd"
              :class="{'eyeicon-zh': isShowPwd}"
            ></i>
            <el-input
              v-if="!isShowPwd"
              v-model="form1.password"
              type="password"
              auto-complete="off"
              placeholder="请输入密码"
            ></el-input>
            <el-input v-else v-model="form1.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label :label-width="formLabelWidth" close-on-press-escape="false">
            <i class="te-icon pwdicon"></i>
            <i
              class="te-icon eyeicon"
              @click="isShowPwd=!isShowPwd"
              :class="{'eyeicon-zh': isShowPwd}"
            ></i>
            <el-input
              v-if="!isShowPwd"
              v-model="form1.confirm_password"
              type="password"
              auto-complete="off"
              placeholder="请确认密码"
            ></el-input>
            <el-input v-else v-model="form1.confirm_password" auto-complete="off" placeholder="请确认密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitB(form1)">提 交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogVisibledata: Boolean,
    init: Number
  },
  watch: {
    dialogVisibledata () {
      this.ondialogVal = this.dialogVisibledata
    },
    init (value) {
      this.getimgCode()
    }
  },
  created() {
    this.getimgCode()
  },
  data () {
    return {
      codeUrl: '',
      number: '',
      // 登录表单
      form: {
        phone: '',
        password: '',
        yzcode: '',
        region: [
          {
            value: 1,
            label: 'A·Pay 商户代理'
          },
          {
            value: 2,
            label: '橙子云商 交易端代理'
          }
        ],
        value: null
      },
      // 忘记密码验证
      form1: {
        phone: '',
        password: '',
        yzcode: '',
        confirm_password: '',
        region: [
          {
            value: '1',
            label: 'A·Pay 商户代理'
          },
          {
            value: '2',
            label: 'A·Pay 交易端代理'
          }
        ],
        value: ''
      },
      formLabelWidth: '0',
      ondialogVal: false,
      isShowPwd: false,
      forgetPwds: false,
      codeText: '发送验证码',
      totalTime: 60,
      topath: '/a_earnings',
      dialogTitle: '登录代理后台',
      type: 2
    }
  },

  methods: {
    // 倒计时
    countDown () {
      if (this.form1.value === '' || this.form1.value === null || this.form1.value === undefined) {
        this.$message({
          message: '请选择平台类型',
          type: 'warning'
        })
        return false
      }
      if (this.form1.phone === '') {
        this.$message({
          message: '手机号不能为空',
          type: 'warning'
        })
        return false
      }
      this.getCode()
      this.codeText = this.totalTime + 's后重新发送'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.codeText = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) { // 当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.codeText = '重新发送'
          this.totalTime = 60
        }
      }, 1000)
    },
    // 获取图形验证码
    getimgCode () {
      var random = Math.floor(Math.random() * 10000000)
      this.number = random
      const data = {
        rand_num: random
      }
      this.$get(this.$api.website +'/api/agency/captcha', data).then(res => {
        if (res.data.code === 0) {
          this.codeUrl = res.data.data
        }
      })
    },
    // 登录提交事件
    submitA (value) {
      const loading = this.$loading({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const data = {
        mobile: this.form.phone,
        password: this.form.password,
        code: this.form.yzcode,
        type: this.form.value,
        rand_num: this.number
      }
      sessionStorage.setItem('activaItem', 0)
      if(this.form.value === 2){
        sessionStorage.setItem('activbItem', 0)
        this.topath = '/b_earnings'
      }
      this.$post(this.$api.website +'/api/agency/login', data)
        .then(res => {
          loading.close();
          var data = res.data
          if (res.code === 0) {

            this.ondialogVal = false
            this.form.phone = ''
            this.form.password = ''
            this.form.yzcode = ''
            localStorage.setItem('token', data.token)
            localStorage.setItem('userMsg', JSON.stringify(data))
            this.$emit('userMsg', JSON.stringify(data))
            if (data.status === 1) {
              this.$router.push({
                path: this.topath
              })
            } else {
              this.$router.push({
                path: '/bond'
              })
            }
          }
        })
        .catch(e => {
          loading.close();
        })
    },

    handleClose (done) {
      this.ondialogVal = false
      this.forgetPwds = false
      this.dialogTitle = '登录代理后台'
      done()
    },

    selecValue (value) {
     if (value === '1') {
       this.type = 2
     } else {
       this.type = 12
     }
    },

    forgetPwd () {
      this.forgetPwds = true
      this.dialogTitle = '找回密码'
      // console.log(this.forgetPwds, 'dsdf')
    },

    // 获取手机验证码
    getCode () {
      var data = {
        mobile: this.form1.phone,
        type: this.type
      }
      console.log(this.type, '456')
      return false
      this.$post(this.$api.website  +'/api/agency/sendsms', data).then(res => {
      })
    },
    // 忘记密码确认提交
    submitB (value) {
      const data = {
        mobile: this.form1.phone,
        password: this.form1.password,
        confirm_password: this.form1.confirm_password,
        code: this.form1.yzcode,
        type: this.form1.value
      }
      this.$post(this.$api.website +'/api/agency/forgetPassword', data).then(res => {
        if (res.data.code === 0) {
          this.$message({
            message: res.data.data,
            type: '"success"'
          })
          this.ondialogVal = true
          this.forgetPwds = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Dialog {
  /deep/ .el-dialog__wrapper{
    top: 40px
  }
  /deep/ .el-dialog {
    border-radius: 8px !important;
    border-radius: 8px !important;
    background-color: #fff;
    .el-dialog__header{
      .el-dialog__title{
        font-size: 18px !important;
        color: #010000 !important;
        font-weight: 600 !important
      }
    }
    .el-dialog__body{
      padding: 25px 25px 40px !important;
      .el-input__inner {
        padding: 21px 10px 21px 30px !important;
        background-color: #fff !important;
        color: #606060 !important;
        border: 1px solid #AAAAAA !important;
        padding-left: 26px !important;
        &::placeholder{
          color: #606060 !important;
        }
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-button--primary {
    width: 100%;
    background-color: #1087fd;
    border-color: #1087fd;
  }
  .forget {
    padding-top: 25px;
    padding-bottom: 40px;
    font-size: 14px;
    color: #0f86fa;
    display: inline-block;
    width: 100%;
    text-align: right;
  }
  .te-icon {
    display: inline-block;
    width: 18px;
    height: 20px;
    position: absolute;
    top: 10px;
    margin-left: 4px;
    z-index: 55;
  }
  .pwdicon {
    background: url("~@/assets/img/PCimg/log-pwd.png") center / 100% no-repeat;
  }
  .yzmicon {
    background: url("~@/assets/img/PCimg/log-yzm.png") center / 100% no-repeat;
  }
  .eyeicon {
    background: url("~@/assets/img/PCimg/log-by.png") center / 100% no-repeat;
    right: 12px !important;
  }
  .eyeicon-zh {
    background: url("~@/assets/img/PCimg/log-zy.png") center / 100% no-repeat;
  }
  .yzmImg {
    position: absolute;
    height: 95%;
    border-radius: 0 4px 4px 0;
    top: 1px;
    right: 1px;
    z-index: 33;
  }
  .phoneCode {
    position: absolute;
    height: 100%;
    right: 10px;
    font-size: 14px;
    color: #1087fd;
    z-index: 33;
  }
}
</style>
