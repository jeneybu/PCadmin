<template>
  <div class="body">
    <div class="img-wrap">
      <div class="area-top">
        <div class="logo"></div>
        <div class="point"></div>
      </div>
      <div class="area-mid"></div>
      <div class="area-bottom">
        <p class="text">代理申请</p>
        <div class="icon"></div>
      </div>
    </div>
    <div class="from-wrap">
      <div class="item">
        <p class="label">联系人</p>
        <input v-model="form.contacts" type="text" placeholder="请填写联系人">
      </div>
      <div class="item">
        <p class="label">手机号码</p>
        <input v-model="form.mobile" type="text" placeholder="请填写手机号码" maxlength="11">
      </div>
      <div class="item">
        <p class="label">验证码</p>
        <div class="ver-box">
          <input v-model="form.code" type="text" placeholder="请填写验证码" style="display:inline-block;width: 65%;">
          <div class="btn-sends" @click="countDown()">{{codeText}}</div>
        </div>
      </div>
      <div class="item">
        <p class="label">邀请码</p>
        <input v-model="form.invite_code" type="text" placeholder="请填写邀请码" readonly>
      </div>
      <div class="item">
        <p class="label">邮箱地址</p>
        <input v-model="form.email" type="text" placeholder="请填写邮箱地址">
      </div>
      <div class="item">
        <p class="label">微信账号</p>
        <input v-model="form.wechat_no" type="text" placeholder="请填写微信账号">
      </div>
      <div class="item">
        <p class="label">设置密码</p>
        <input v-model="form.password" type="text" placeholder="请填写设置密码">
      </div>
      <div class="item">
        <p class="label">代理名称</p>
        <input v-model="form.agency_name" type="text" placeholder="请填写代理名称">
      </div>
      <div class="item">
        <p class="label">代理简介</p>
        <textarea v-model="form.agency_info" rows="4" placeholder="请填写代理简介" style="width: 100%;"></textarea>
      </div>
    </div>
    <div class="btn-wrap">
      <button @click="submit()">确认提交</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { setTimeout, clearTimeout } from 'timers';
export default {
  name: "breg",
  data() {
    return {
      timer: null,
      form: {
        contacts: '',
        mobile: '',
        code: '',
        invite_code: '',
        email: '',
        wechat_no: '',
        password: '',
        agency_name: '',
        agency_info: '',
        agency_type: 2
      },
      urlIos:'https://www.pgyer.com/LS6Z',
      urlAdr:'https://fir.im/kx59',
      codeText: '发送验证码',
      sending: false,
      totalTime: 60,
      invitationCode: null
    }
  },
  created () {
    this.form.invite_code = this.$route.query.invite_code
  },
  methods: {
    countDown () {
      if (this.form.mobile === '') {
        this.$toast('请输入手机号')
        return false
      }
      if (this.sending) {
        this.$toast('请稍后发送验证码 !')
        return false
      }
      this.goMsm()
      this.sending = true
      this.codeText = this.totalTime + 's'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.codeText = this.totalTime + 's'
        if (this.totalTime <= 0) { // 当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.totalTime = 60
          this.sending = false
          this.codeText = '重新发送'
        }
      }, 1000)
    },
    goMsm () {
      var data = {
        mobile: this.form.mobile,
        type: 11
      }
      axios.post(this.$api.website + '/api/agency/sendsms', data)
        .then(res => {
          if (res.data.code !== 0) {
            this.$toast(res.data.msg)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    submit () {
      var data = this.form
      if (data.contacts === '') {
        this.$toast('请填写联系人 !')
      } else if (data.mobile === '') {
        this.$toast('请填写手机号码 !')
      } else if (data.code === '') {
        this.$toast('请填写验证码 !')
      } else if (data.invite_code === '') {
        this.$toast('请填写邀请码 !')
      } else if (data.email === '') {
        this.$toast('请填写邮箱地址 !')
      } else if (data.wechat_no === '') {
        this.$toast('请填写微信账号 !')
      } else if (data.password === '') {
        this.$toast('请填写设置密码 !')
      } else if (data.agency_name === '') {
        this.$toast('请填写代理名称 !')
      } else if (data.agency_info === '') {
        this.$toast('请填写代理简介 !')
      } else {
        this.goRegister()
      }
    },
    goRegister () { // 944683
      const loading = this.$loading({
        lock: true,
        background: 'rgba(0, 0, 0, 0.65)'
      })
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        axios.post(this.$api.website + '/api/agency/register', this.form)
          .then(res => {
            if (res.data.code === 0) {
              this.$toast('注册成功，请在代理官网登录 !')
            } else {
              this.$toast(res.data.msg)
            }
            loading.close();
          })
          .catch(e => {
            console.log(e)
            loading.close();
          })
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  padding-bottom: 50px;
  background-color: #01012A;
  box-sizing: border-box;

  .img-wrap {
    width: 100%;
    height: 400px;
    background: url('../../assets/img/PCimg/breg_blued.png') center no-repeat;
    background-size: 100% 100%;
    .area-top {
      position: relative;
      height: 130px;
      width: 100%;
      .logo {
        position: absolute;
        top: 25px;
        left: 15px;
        width: 145px;
        height: 38px;
        background: url('../../assets/img/PCimg/breg_logo.png') no-repeat;
        background-size: 145px 38px;
      }
      .point {
        position: absolute;
        top: 50px;
        right: 10px;
        width: 120px;
        height: 60px;
        background: url('../../assets/img/PCimg/breg_point.png') no-repeat;
        background-size: 120px 60px;
      }
    }

    .area-mid {
      position: relative;
      height: 150px;
      width: 100%;
      background: url('../../assets/img/PCimg/breg_midbg.png') no-repeat;
      background-size: 100%;
    }

    .area-bottom {
      position: relative;
      width: 100%;
      background: url('../../assets/img/PCimg/breg_allbg.png') center no-repeat;
      background-size: 100% 100%;
      .text {
        height: 20px;
        color: #fff;
        font-size: 20px;
        text-align: center;
        margin-top: 40px;
      }
      .icon {
        margin-top: 10px;
        width: 100%;
        height: 5px;
        background: url('../../assets/img/PCimg/item1-ddd.png') center no-repeat;
        background-size: 80px 5px;
      }
    }
  }

  .from-wrap {
    padding: 0 45px 0 25px;
    .item {
      width: 100%;
      color: #fff;
      .label {
        position: relative;
        margin-top: 20px;
        height: 25px;
        &:after {
          content: '*';
          position: absolute;
          top: 0;
          left: -10px;
          width: 5px;
          height: 5px;
          margin-top: 3px;
          color: #059E7E;
        }
      }
      .ver-box {
        position: relative;
        .btn-sends {
          display: inline-block;
          width: 30%;
          height: 38px;
          line-height: 38px;
          text-align: center;
          float: right;
          border-radius: 2px;
          background-color: #0974FF;
          &:active {
            background-color: rgb(36, 130, 253);
          }
        }
      }
      input {
        box-sizing: border-box;
        color: #fff;
        width: 100%;
        height: 38px;
        padding: 0 10px;
        background: transparent;
        border: 0.8px solid #f5f5f5;
        border-radius: 2px;
        &::placeholder {
          color: #4A556E;
        }
      }
      textarea {
        box-sizing: border-box;
        color: #fff;
        border: 0.8px solid #f5f5f5;
        border-radius: 2px;
        background: transparent;
        padding: 0 10px;
        padding-top: 10px;
        &::placeholder {
          color: #4A556E;
        }
      }
    }
    .ver-code {
      position: relative;
      width: 100%;
      input {
        float: left;
        width: 60%;
      }
      .sends {
        float: right;
        width: 35%;
      }
    }
  }

  .btn-wrap {
    width: 100%;
    button {
      margin: 40px auto;
      display: block;
      width: 120px;
      height: 40px;
      font-size: 16px;
      color: #fff;
      background:rgba(9,116,255,1);
      border-radius:41px;
    }
  }
}
</style>
