<template>
    <div class="mobile">
        <div class="head">
            <img src="~imgurl/logo.png" alt="">
            <i class="bg1"></i>
        </div>
        <div class="unit unit1">
            <div class="top">
                <div class="title">A·PAY系统</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
                <div class="text"><span>专业全方位的数字货币担保场外交易平台</span></div>
            </div>
            <div class="bottom">
                <img src="~@/assets/img/PCimg/mobile-unit1.png" alt="">
            </div>
        </div>
        <div class="unit unit2">
            <div class="top">
               <div class="title">提交申请</div>
               <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
            </div>
            <div class="bottom">
                <ul>
                    <li>
                        <p><i class="inputicon"></i><span>联系人</span></p>
                        <input type="text" v-model="contacts" placeholder="请填写商户联系人">
                    </li>
                    <li>
                        <p><i class="inputicon"></i><span>联系电话</span></p>
                        <input type="text" v-model="phone" placeholder="请填写商户联系电话">
                    </li>
                    <li>
                        <p><i class="inputicon"></i><span>邮箱地址</span></p>
                        <input type="text" v-model="email" placeholder="请填写商户邮箱地址">
                    </li>
                    <li>
                        <p><i class="inputicon"></i><span>微信账号</span></p>
                        <input type="text" v-model="wechat" placeholder="请填写商户微信">
                    </li>
                    <li>
                        <p><i class="inputicon"></i><span>机构名称</span></p>
                        <input type="text" v-model="agencyName" placeholder="请填写机构名称">
                    </li>
                    <li>
                        <p><i class="inputicon"></i><span>官方链接</span></p>
                        <input type="text" v-model="link" placeholder="请填写官方链接">
                    </li>
                    <li>
                        <p><i class="inputicon"></i><span>邀请码</span></p>
                        <input type="text" readonly v-model="agency_code">
                    </li>
                    <li>
                        <p><span>机构简介</span></p>
                        <textarea name="" id="" cols="30" rows="10" v-model="refs" placeholder="请填写机构简介（选填）"></textarea>
                    </li>
                    <li class="submit"><span @click="checkMsg()">确认提交</span></li>
                </ul>
            </div>
        </div>
        <div class="unit unit3">
            <div class="top">
                <div class="title">让支付变得简单</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
            </div>
            <div class="bottom">
                <i></i>
            </div>
        </div>
        <div class="unit unit4">
            <div class="top">
                <div class="title">API 接入模式</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
            </div>
            <div class="bottom">
                <i></i>
            </div>
        </div>
        <div class="unit unit5">
             <div class="top">
                <div class="title">API 接入模式</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
            </div>
            <div class="bottom">
                <i></i>
            </div>
        </div>
        <div class="unit unit6">
             <div class="top">
                <div class="title">一键申请开户</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
             </div>
            <div class="bottom">
                <i></i>
            </div>
        </div>
        <div class="unit unit7">
             <div class="top">
                <div class="title">A·PAY钱包代理</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
                <div class="text"><span>仅需1个工程师就能轻松接入企业应用内，无需二次开发代理方可享受每笔交易带来收益</span></div>
            </div>
            <div class="bottom">
                <i></i>
            </div>
        </div>
        <div class="unit unit8">
            <div class="top">
                <div class="title">完善的支付方式</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
                <div class="text"><span>注册申请成为A·PAY商户代理，为服务对象开通商户账号使用API为商户嵌入支付系统，即可完成接入</span></div>
            </div>
            <div class="bottom">
                <i></i>
            </div>
        </div>
        <div class="unit unit9">
            <div class="top">
                <div class="title">支付接入流程</div>
                <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
                <div class="text"><span>一次接入所有主流支付渠道，99.99%系统可用性满足你丰富的交易场景需求</span></div>
            </div>
            <div class="bottom">
                <i></i>
                <p class="submit2" @click="checkMsg()">确认提交</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  name: 'mobile',
  data () {
    return {
      contacts: '',
      phone: '',
      wechat: '',
      refs: '',
      agency_code: null,
      link: '',
      agencyName: '',
      email: ''
    }
  },
  created() {
      this.agency_code = this.$route.query.agency_code
  },
  methods: {
    checkMsg () {
        if (this.contacts === '') {
            Message.warning('联系人不能为空')
        } else if (this.phone === '') {
            Message.warning('手机号不能为空')
        } else if (this.phone === '') {
            Message.warning('邮箱不能为空')
        } else if (this.wechat === '') {
            Message.warning('微信账号不能为空')
        } else if (this.agencyName === '') {
            Message.warning('机构名称不能为空')
        } else if (this.link === '') {
            Message.warning('官方链接不能为空')
        } else {
            this.submit()
        }
    },
    submit () {
      var data = {
        mobile: this.phone,
        agency_code: this.agency_code,
        contacts: this.contacts,
        wechat_no: this.wechat,
        organization_info: this.refs,
        email: this.email,
        organization_name: this.agencyName,
        website: this.link
      }
      this.$post(this.$api.website +'/api/agency/apply', data).then(res => {
          if (res.code === 0) {
            Message({
              message: res.data,
              type: "success"
            })
            this.phone = ''
            this.contacts = ''
            this.wechat = ''
            this.refs = ''
            this.email = ''
            this.agencyName = ''
            this.link = ''
          }
      })

    },
  }
}
</script>

<style lang="scss" scoped>
.mobile{
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: #252744;
  .head{
      text-align: left;
      padding: 18px 0 13px 25px;
      position: relative;
      background-color: #252744;
      img{
          width: 58px
      }
      .bg1{
          display: inline-block;
          background: url('~@/assets/img/PCimg/mobil-bg1.png') center / 100% no-repeat;
          height: 60px;
          width: 148px;
          position: absolute;
          top: 0;
          right: 17px
      }
  }
  .unit{
      background-color: #01012A;
    .top{
        background: url('~@/assets/img/PCimg/mobile-bg2.png') center / 100% no-repeat;
        height: 230px;
        .title{
            padding-top: 80px;
            height: 20px;
            font-size: 24px;
            color: #fff;
            letter-spacing: 5px;
            margin-bottom: 20px
        }
        .img{
            margin-bottom: 20px;
            img{
                height: 7px
            }
        }
        .text{
            font-size: 14px;
            color: #79A5C0;
            padding: 0 40px;
            line-height: 20px
        }
    }
  }
  .unit1{
      .bottom{
          img{
              width: 76%
          }
      }
  }
  .unit2{
      padding-bottom: 20px;
      .bottom{
          margin-top: -80px;
          ul{
              padding: 0 30px;
              li{
                  list-style: none;
                  text-align: left;
                  width: 100%;
                  p{
                      position: relative;
                      padding-left: 10px;
                      .inputicon{
                          position: absolute;
                          left: 0;
                          top: 5px;
                          display: inline-block;
                          width: 6px;
                          height: 6px;
                          background: url('~@/assets/img/PCimg/mobile-start.png') center / 100% no-repeat;
                      }
                      span{
                          font-size: 13px;
                          color: #fff
                      }
                  }
                  input, textarea{
                      width: 100%;
                      background-color: transparent;
                      border: 1px dashed #fff;
                      box-sizing: border-box;
                      padding: 17px 9px 15px;
                      margin:  15px 0;
                      color: #4A556E;
                      &::placeholder{
                          font-size: 12px;
                          color: #4A556E
                      }
                  }
              }
              .submit{
                  text-align: center;
                  padding-top: 23px;
                  span{
                      display: inline-block;
                      padding: 9px 31px;
                      font-size: 18px;
                      color: #fff;
                      background-color: #0274FF;
                      border-radius: 40px
                  }
              }
          }
      }
  }
  .unit3{
      padding-bottom: 60px;
      background-color: #0C0C3B;
      .bottom{
          margin-top: -60px;
          i{
              width: 90%;
              height: 80px;
              display: inline-block;
              background: url('~@/assets/img/PCimg/mobile-unit3bg.png') center / 100% no-repeat
          }
      }
  }
  .unit4{
      padding-bottom: 60px;
      .bottom{
          margin-top: -60px;
          i{
              width: 90%;
              height: 380px;
              display: inline-block;
              background: url('~@/assets/img/PCimg/mobile-unit4bg.png') center / 100% no-repeat
          }
      }
  }
  .unit5{
    padding-bottom: 60px;
    background-color: #0C0C3B;
    .bottom{
        margin-top: -60px;
        i{
            width: 90%;
            height: 90px;
            display: inline-block;
            background: url('~@/assets/img/PCimg/mobile-unit5bg.png') center / 100% no-repeat
        }
    }
  }
  .unit6{
       .bottom{
            margin-top: -120px;
            i{
                width: 90%;
                height: 310px;
                display: inline-block;
                background: url('~@/assets/img/PCimg/mobile-unit6bg.png') center / 100% no-repeat
            }
        }
  }
  .unit7{
      margin-top: -75px;
        .bottom{
            margin-top: -60px;
            i{
                width: 90%;
                height: 310px;
                display: inline-block;
                background: url('~@/assets/img/PCimg/mobile-unit7bg.png') center / 100% no-repeat
            }
        }
  }
  .unit8{
      background-color: #0C0C3B;
      .bottom{
            i{
                width: 90%;
                height: 155px;
                display: inline-block;
                background: url('~@/assets/img/PCimg/mobile-unit8bg.png') center / 100% no-repeat
            }
        }
  }
  .unit9{
      padding-bottom: 100px;
      .bottom{
          text-align: center;
            i{
                width: 90%;
                height: 155px;
                display: inline-block;
                background: url('~@/assets/img/PCimg/mobile-unit9bg.png') center / 100% no-repeat
            }
            .submit2{
                background-color: #00CBD9;
                color: #fff;
                font-size: 18px;
                border-radius: 40px;
                margin: 0 29%;
                padding: 9px 0;

            }
        }
  }
}
</style>
