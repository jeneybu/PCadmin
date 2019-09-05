<template>
    <div class="register">
       <tb-head :activeIndex='activeIndex'></tb-head>
       <div class="headbg"></div>
       <div class="maincont">
          <div class="title">快速注册</div>
          <div class="formBox">
            <el-form label-position="left" label-width="80px" :model="form" :rules="rules" ref="form">
                <el-form-item label="联系人" prop="name" :rules="[{required: true, message: '联系人不能为空'}]">
                    <el-input type="name" v-model="form.name" placeholder="请填写联系人"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone" :rules="[{required: true, message: '手机号不能为空'}, { type: 'number', message: '手机号必须为数字值'}]">
                    <el-input type="phone" v-model.number="form.phone" placeholder="请填写手机号码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="yzcode" :rules="[{required: true, message: '验证码不能为空'}, { type: 'number', message: '验证码必须为数字值'}]">
                    <el-input type="yzcode" class="codeinput" v-model.number="form.yzcode" placeholder="请填写验证码"></el-input>
                    <span v-if="totalTime == 60" class="code" @click="countDown()">{{content}}</span>
                    <span v-else class="code">{{content}}</span>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :rules="[{required: true, message: '邮箱不能为空'},{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                    <el-input type="email" v-model="form.email" placeholder="请填写邮箱"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat" :rules="[{required: true, message: '微信号不能为空'}]">
                    <el-input type="wechat" v-model="form.wechat" placeholder="请填写微信号"></el-input>
                </el-form-item>
                <el-form-item label="设置密码" prop="password" :rules="[{required: true, message: '密码不能为空'}]">
                    <el-input type="password" v-model="form.password" placeholder="请填写登录密码"></el-input>
                </el-form-item>

                <el-form-item label="代理名称" prop="value">
                  <!-- <el-select v-model="form.value" placeholder="请选择后台类型" :change="selecValue(form.value)">
                    <el-option v-for="item in form.region"  :label="item.label" :key="item.value" :value="item.value"></el-option>
                  </el-select> <i v-if="isShow == 1" class="el-icon-remove">请填写代理名称</i> -->
                  <p class="item">{{this.form.dlName}}</p>
                </el-form-item>

                <!-- <el-form-item label="代理名称" prop="dlName">
                    <el-input type="dlName" v-model="form.dlName" placeholder="代理名称"></el-input>
                   <p>A·Pay 商户代理</p>
                </el-form-item> -->
                <el-form-item label="代理简介">
                    <el-input type="textarea" v-model="form.ref" placeholder="代理简介（选填）"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="checkData()">注册代理</el-button>
                </el-form-item>
                <el-form-item>
                  <p>已有账号？<span style="color:#5cbafd;cursor:pointer" @click="goLogin">请直接登录</span></p>
                </el-form-item>

            </el-form>
          </div>

        </div>
    </div>
</template>

<script>
import tbHead from '@/views/pcmodule/head.vue'
export default {
  name: 'register',
  components: {
    tbHead
  },
  data () {
    return {
      form: {
        name: '',
        phone: '',
        password: '',
        yzcode: '',
        email: '',
        wechat: '',
        // region: [{
        //   value: '1',
        //   label: 'A·Pay 商户代理'
        // },
        //  {
        //   value: '2',
        //   label: '橙子云商 交易端代理'
        // }],
        value: '', // 代理类型 1商户 2交易端
        dlName: '',
        ref: ''
      },
      rules: {
        name: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        yzcode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '微信号不能为空', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请选择后台类型', trigger: 'change' }
        ],
        dlName: [
          { required: true, message: '代理名称不能为空', trigger: 'blur' }
        ],

      },
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 60,
      isShow: null,
      activeIndex: '1',
      type: 1
    }
  },
  created () {

    this.form.value = this.$route.query.name
    var num=this.form.value;
    if(num=="1"){
      this.form.value="1"
      this.type = 1
      this.form.dlName="A·Pay 商户代理"
    }else{
      this.form.value="2"
      this.type = 11
      this.form.dlName="橙子云商 交易端代理"
    }

  },
  methods: {
    //点击直接登录
    goLogin(){
     this.$router.push({path:"/login",query:{name:this.form.value}})
    },
    selecValue (value) {
      console.log(value === '1', 'aaa')
      if (value === '1') {
        this.type = 1
      } else {
        this.type = 11
      }
    },
    countDown () {
      if (this.form.phone === '') {
        this.isShow = 1
        return false
      }
      this.getCode()
      this.content = this.totalTime + 's'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's'
        if (this.totalTime < 0) { // 当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.content = '重新发送'
          this.totalTime = 60
        }
      }, 1000)
    },
    getCode () {
      var data = {
        mobile: this.form.phone,
        type: this.type
      }
      this.$post(this.$api.website +'/api/agency/sendsms', data).then(res => {})
    },
    checkData () {
      if (this.form.value === '' || this.form.value === undefined || this.form.value === null) {
        this.isShow = 1
      } else {
        this.isShow = null
        this.onSubmit()
      }
    },
    onSubmit () {
      var data = {
        mobile: this.form.phone,
        email: this.form.email,
        password: this.form.password,
        code: this.form.yzcode,
        contacts: this.form.name,
        wechat_no: this.form.wechat,
        agency_name: this.form.dlName,
        agency_info: this.form.ref,
        agency_type: this.form.value
      }
      this.$post(this.$api.website +'/api/agency/register', data).then(res => {
        this.$router.push({
           path: '/bond'
         })
        var data = res.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('userMsg', JSON.stringify(data))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
html, body, #app{
  background-color: #fff !important;

}
.item{
  text-align: left;
}
.register{
  text-align: center;
  min-width: 1008px;
  background-color: #fff;
  height: 100%;
  padding-bottom: 20%;
  width: 100%;
  .headbg{
    background: url('~@/assets/img/PCimg/item5bg.png') center / 100% no-repeat !important;
    width: 100%;
    height: 105px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .maincont{
    height: 100%;
    width: 100%;
    padding-top: 80px
  }
  .title{
    font-size: 24px;
    color: #070707;
    margin-bottom: 50px;
  }
  .formBox{
      position: absolute;
      left: 48%;
      transform: translateX(-50%);
      width: 25%;
    /deep/ .el-form{
      .el-form-item{
        margin-bottom: 18px !important;
        .el-select{
            width: 100%;
        };
        .el-form-item__content{
            position: relative;
            .code{
                position: absolute;
                width: 23%;
                right: 0;
                font-size: 14px;
                color: #fff;
                display: inline-block;
                padding: 0 20px;
                text-align: center;
                background-color: #1087FD
            }
            .codeinput{
              position: absolute;
              left: 0;
              width: 55%
            }
            .el-button--primary{
              width: 100%
            }
            .el-icon-remove{
              position: absolute;
              right: -113px;
              top: 10px;
              color: #FF8800;
            }
        }
      }
    }
  }
}
</style>
