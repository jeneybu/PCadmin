<template>
  <div class="itemFirst">
    <tb-head :activeIndex='activeIndex'></tb-head>
    <div class="fixedBox">
      <div class="item" @click="kefu()"><i class="kefu"></i></div>
      <div class="item" @click="toTop()"><i class="fixedB"></i></div>
    </div>
    <div class="unit unit1">
      <div class="bannerbox leftbanner">
        <h3 class="title">A·Pay系统</h3>
        <div class="txt"><span>专业全方位的数字货币担保场外交易平台<br>帮助企业快速高效的搭建自己的支付系统</span></div>
        <div class="btn">
          <i class="wallet" @click="register('1')"></i>
          <i class="yiduan" @click="register('2')"></i>
        </div>
      </div>
      <div class="rightbanner">
        <img class="gif0" src="~@/assets/img/PCimg/item1-gif.png" alt="">
        <img class="gif1" src="~@/assets/img/PCimg/item1-gif1.gif" alt="">
        <img class="gif2" :class="{'bounce': isyun2}" src="~@/assets/img/PCimg/item1-gif2.png" alt="">
      </div>
    </div>
    <div class="unit unit2">
      <div class="bannerbox">
        <h3 class="title">让支付变得简单  用交易连接一切</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
        <div class="txt"><span>A·PAY<br>作为支付技术解决方案提供商，A·PAY系统提供高效安全的支付流程，A·PAY只负责信息处理<br>不参与资金清算，是企业坚实的商业合作伙伴</span></div>
      </div>
      <ul class="advantage">
        <li>
          <img src="~@/assets/img/PCimg/item1-ad1.png" alt="">
          <p>强大的技术能力</p>
          <span>交易全程数字货币托管<br>个人资产安全有保障</span>
        </li>
        <li>
          <img src="~@/assets/img/PCimg/item1-ad2.png" alt="">
          <p>完善的账户体系</p>
          <span>一秒买入快速撮合成交<br>钱包间收发即时到账</span>
        </li>
        <li>
          <img src="~@/assets/img/PCimg/item1-ad3.png" alt="">
          <p>稳定的商户系统</p>
          <span>承诺场外交易0费用<br>降低交易成本</span>
        </li>
      </ul>
    </div>
    <div class="unit unit3">
      <div class="bannerbox">
        <h3 class="title">A·PAY API接入模式</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
      </div>
      <div class="apiMo">
        <ul>
          <li>
            <img src="~@/assets/img/PCimg/item1-api1.png" alt="">
            <p>买入</p>
          </li>
          <i class="toright"></i>
          <li>
            <img src="~@/assets/img/PCimg/item1-api2.png" alt="">
            <p>订单界面</p>
          </li>
          <i class="toright"></i>
          <li>
            <img src="~@/assets/img/PCimg/item1-api3.png" alt="">
            <p>客户付款给盾<br>付宝交易员</p>
          </li>
          <i class="toright"></i>
          <li>
            <img src="~@/assets/img/PCimg/item1-api4.png" alt="">
            <p>客户账户划币<br>给商户账户</p>
          </li>
        </ul>
        <ul class="arrow">
          <i class="totop zong"></i>
          <i class="todown zong"></i>
        </ul>
        <ul class="gifUl">
          <li>
            <img src="~@/assets/img/PCimg/item1-api5.png" alt="">
            <p>A·PAY</p>
          </li>
          <i class="toleft"></i>
          <li class="gif">
            <img src="~@/assets/img/PCimg/item1-apigif.gif" alt="">
            <img src="~@/assets/img/PCimg/item1-apigif.png" alt="">
            <img class="yun" :class="{'yunAnimate': isyun}" src="~@/assets/img/PCimg/item1-yun.png" alt="">
          </li>
          <i class="toleft"></i>
          <li>
            <img src="~@/assets/img/PCimg/item1-api6.png" alt="">
            <p>商户平台</p>
          </li>
        </ul>
        <ul class="arrow">
          <i class="todown zong"></i>
          <i class="totop zong"></i>
        </ul>
        <ul>
          <li>
            <img src="~@/assets/img/PCimg/item1-api7.png" alt="">
            <p>卖出</p>
          </li>
          <i class="toright"></i>
          <li>
            <img src="~@/assets/img/PCimg/item1-api8.png" alt="">
            <p>商户账户划币<br>给客户账户</p>
          </li>
          <i class="toright"></i>
          <li>
            <img src="~@/assets/img/PCimg/item1-api9.png" alt="">
            <p>客户账户扣币</p>
          </li>
          <i class="toright"></i>
          <li>
            <img src="~@/assets/img/PCimg/item1-api10.png" alt="">
            <p>A·PAY交易员<br>付款给客户</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="unit unit4">
      <div class="bannerbox">
        <h3 class="title">接入API专享服务</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
      </div>
      <div class="service">
        <ul>
          <li>
            <img src="~@/assets/img/PCimg/item1-serve1.png" alt="">
            <p>提供商家管理后台</p>
          </li>
          <li>
            <img src="~@/assets/img/PCimg/item1-serve2.png" alt="">
            <p>无需接触法币0资金风险</p>
          </li>
          <li>
            <img src="~@/assets/img/PCimg/item1-serve3.png" alt="">
            <p>多重资金风控及身份考核</p>
          </li>
          <li>
            <img src="~@/assets/img/PCimg/item1-serve4.png" alt="">
            <p>产品定制0开发费</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="unit unit5">
      <div class="bannerbox">
        <h3 class="title">接入API专享服务</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
      </div>
      <div class="step">
        <ul>
          <li>
            <img src="~@/assets/img/PCimg/item1-step1.png" alt="">
            <p>提交开户申请</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item1-step2.png" alt="">
            <p>平台审核，成为代理</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item1-step3.png" alt="">
            <p>获取专有API接口</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item1-step4.png" alt="">
            <p>对接商户，接入A·PAY</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item1-step5.png" alt="">
            <p>开立商户账户，正式上线</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item1-step6.png" alt="">
            <p>随时随地获得收益</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="unit unit6">
      <div class="bannerbox">
        <h3 class="title">A·PAY钱包代理</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
        <div class="txt"><span>仅需1个工程师就能轻松接入企业应用内，无需二次开发。代理方可享受每笔交易带来收益</span></div>
      </div>
      <div class="imgbox">
        <img src="~@/assets/img/PCimg/item1-bg4.png" alt="">
      </div>
    </div>
    <div class="unit unit7">
      <div class="bannerbox">
        <h3 class="title">接入API专享服务</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
        <div class="txt"><span>注册申请成为A·PAY商户代理，为服务对象开通商户账号，使用API为商户嵌入支付系统，即可完成接入</span></div>
      </div>
      <div class="payway">
        <ul>
          <li>
            <img src="~@/assets/img/PCimg/item1-paywx.png" alt="">
            <p>微信企业付款</p>
          </li>
          <li>
            <img src="~@/assets/img/PCimg/item1-payalipay.png" alt="">
            <p>支付宝转账</p>
          </li>
          <li>
            <img src="~@/assets/img/PCimg/item1-paybank.png" alt="">
            <p>银行卡代付</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="unit unit7 unit8">
      <div class="bannerbox">
        <h3 class="title">支付接入流程</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
        <div class="txt"><span>一次接入所有主流支付渠道，99.99%系统可用性，满足你丰富的交易场景需求，为你的用户提供完美支付体验<br>盾支付A盾多级商户系统是针对多级商户场景的支付系统解决方案</span></div>
      </div>
      <div class="payway">
        <ul>
          <li>
            <img src="~@/assets/img/PCimg/item1-process1.png" alt="">
            <p>手机APP支付</p>
          </li>
          <li>
            <img src="~@/assets/img/PCimg/item1-process2.png" alt="">
            <p>手机网页支付</p>
          </li>
          <li>
            <img src="~@/assets/img/PCimg/item1-process3.png" alt="">
            <p>PC网页支付</p>
          </li>
           <li>
            <img src="~@/assets/img/PCimg/item1-process4.png" alt="">
            <p>微信JSAPI支付</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import tbHead from '@/views/pcmodule/head.vue'
export default {
  name: 'itemFirst',
  components: {
    tbHead
  },
  data () {
    return {
      activeIndex: '1',
      isyun: false,
      isyun2: false
    }
  },
  methods: {
    register (idx) {
     
      this.$router.push({
        path: '/register',
        query: {
          name: idx
        }
      })
    },
    kefu () {},
    scrollToTop () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop <= 500) {
        this.isyun2 = true
      } else if (scrollTop >= 1475 && scrollTop <= 2575) {
        this.isyun = true
      } else {
        this.isyun = false
        this.isyun2 = false
      }
    },
    toTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop, true);  // 监听（绑定）滚轮滚动事件
  },
}
</script>
<style lang="scss">
.bounce{
  animation:mymove 1.5s 1;
  -webkit-animation:mymove 1.5s 1;
}
@keyframes mymove
{
  0%   {top: 172px; opacity: 0}
  20%  {top: 132px}
  40%  {top: 162px}
  60%  {top: 142px}
  80%  {top: 158px}
  100% {top: 152px; opacity: 1}
}

@-webkit-keyframes mymove /*Safari and Chrome*/
{
  0%   {top: 172px; opacity: 0}
  20%  {top: 132px}
  40%  {top: 162px}
  60%  {top: 142px}
  80%  {top: 158px}
  100% {top: 152px; opacity: 1}
}

.yunAnimate{
  animation: mymove2 1.5s 1;
  -webkit-animation: mymove2 1.5s 1;
}
@keyframes mymove2
{
  0%   {bottom: 20px; opacity: 0}
  20%  {bottom: 90px}
  40%  {bottom: 30px}
  60%  {bottom: 80px}
  80%  {bottom: 50px}
  100% {bottom: 60px; opacity: 1}
}

@-webkit-keyframes mymove2
{
  0%   {bottom: 20px; opacity: 0}
  20%  {bottom: 90px}
  40%  {bottom: 30px}
  60%  {bottom: 80px}
  80%  {bottom: 50px}
  100% {bottom: 60px; opacity: 1}
}
</style>

<style lang="scss" scoped>
.itemFirst{
  background-color: #252744;
  height: 100%;
  width: 100%;
  min-width: 1080px;
  .unit{
    .bannerbox{
      text-align: center;
      .title{
        font-size: 30px;
        font-weight: 400;
        color: #fff;
        padding-top: 136px
      }
      .img{
        padding-top: 34px
      }
      .txt{
        letter-spacing: 1px;
        font-size: 14px;
        color: #79A5C0;
        padding: 32px 0 53px;
        span{
          line-height: 20px;
        }
      }
      .btn{
        i{
          display: inline-block;
          height: 42px;
          width: 138px
        }
        .wallet{
          margin-right: 24px;
          background: url('~@/assets/img/PCimg/first1.png') center / 100% no-repeat
        }
        .yiduan{
          background: url('~@/assets/img/PCimg/first2.png') center / 100% no-repeat
        }
      }
    }
    ul{
      padding: 0;
      display: flex;
      justify-content: space-between;
      li{
        text-align: center
      }
    }
  }
  .unit1{
    height: 1008px;
    .bannerbox{
      text-align: left
    }
    .leftbanner{
      padding-left: 14.9%;
      padding-top: 80px;
      z-index: 1111;
      position: absolute;
      top: 0px;
      left: -16px;
      top: -15px;
      width: 50%;
      height: 630px;
      background: url('~@/assets/img/PCimg/item1-bg1.png') no-repeat;
      background-size: contain
    }
    .rightbanner{
      height: 100%;
      width: 100%;
      position: relative;
      img{
        width: 41.6%;
        position: absolute;
        top: 82px;
        right: 8.3%;
      }
      .gif2{
        position: absolute;
        width: 5.7%;
        position: absolute;
        top: 152px;
        right: 25.9%;
      }
    }
  }
  .unit2{
    padding-bottom: 100px;
    .bannerbox{
      .title{
        padding-top: 0
      }
      .img{
        img{
          height: 12px
        }
      }
    }
    .advantage{
      padding-top: 107px;
      justify-content: space-around;
      li{
        img{
          width: 73px
        }
        p{
          color: #fff;
          font-size: 28px;
          padding: 18px 0
        }
        span{
          display: inline-block;
          text-align: left;
          line-height: 20px;
          font-size: 14px;
          color: #79A5C0
        }
      }
    }
  }
  .unit3{
    padding-bottom: 130px;
    .apiMo{
      padding: 123px 400px 0;
      ul{
        li{
          flex: 1;
          img{
            width: 47px
          }
          p{
            font-size: 14px;
            color: #7099B5;
            padding-top: 10px
          }
        }
      }
      .gifUl{
        .gif{
          flex: 2;
          position: relative;
          img{
            width: 254px;
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%)
          }
          .yun{
            z-index: 9999;
            width: 100px;
            bottom: 60px;
          }
        }
      }
      .arrow{
        padding: 10px 86px;
      }
      i{
         padding-top: 45px;
         display: inline-block;
         width: 30px;
         height: 18px
      }
      .zong{
        height: 30px;
        width: 18px
      }
      .toright{
        background: url('~@/assets/img/PCimg/arrow-right.png') center / 100% no-repeat
      }
      .toleft{
        background: url('~@/assets/img/PCimg/arrow-left.png') center / 100% no-repeat
      }
      .totop{
        background: url('~@/assets/img/PCimg/arrow-top.png') center / 100% no-repeat
      }
      .todown{
        background: url('~@/assets/img/PCimg/arrow-down.png') center / 100% no-repeat
      }
    }
  }
  .unit4{
    background-color: #20223d;
    padding-bottom: 230px;
    .bannerbox{
      margin-bottom: 77px
    }
    .service{
      ul{
        padding: 0 186px;
        li{
          background: url('~@/assets/img/PCimg/item1-bg2.png') center / 100% no-repeat;
          height: 412px;
          width: 394px;
          text-align: center;
          position: relative;
          img{
            width: 102px;
            margin-top: 108px
          }
          p{
            font-size: 16px;
            color: #79A5C0;
            padding-top: 45px
          }
        }
      }
    }
  }
  .unit5{
    padding-bottom: 150px;
    .bannerbox{
      margin-bottom: 121px;
    }
    .step{
      ul{
        padding: 0 198px;
        li{
          img{
            width: 55px
          }
          p{
            font-size: 14px;
            color: #fff;
            padding-top: 18px
          }
          .line{
            margin-top: 30px;
            display: inline-block;
            width: 75px;
            height: 1px;
            background: url('~@/assets/img/PCimg/item1-bg3.png') center / 100% no-repeat
          }
        }
      }
    }
  }
  .unit6{
    background-color: #20223d;
    padding-bottom: 190px;
    .bannerbox{
      margin-bottom: 63px;
      .txt{
        padding-top: 67px
      }
    }
    .imgbox{
      text-align: center;
      img{
        width: 50%
      }
    }
  }
  .unit7{
    padding-bottom: 180px;
    .bannerbox{
      margin-bottom: 88px
    }
    .payway{
      ul{
        padding: 0 340px;
        li{
          background: url('~@/assets/img/PCimg/item1-bg2.png') center / 100% no-repeat;
          height: 258px;
          width: 246px;
          text-align: center;
          position: relative;
          img{
            width: 74px;
            margin-top: 68px
          }
          p{
            font-size: 18px;
            color: #fff;
            padding-top: 33px
          }
        }
      }
    }
  }
  .unit8{
    background-color: #20223d;
    padding-bottom: 250px;
    .bannerbox{
      margin-bottom: 55px !important;
    }
    .payway{
      ul{
        margin-bottom: 0 !important;
      }
    }
  }
  .fixedBox{
     z-index: 9999999;
     width: 60px;
     position: fixed;
     right: 5%;
     top: 80%;
     .item{
       i{
         display: inline-block;
         width: 54px;
         height: 70px;
       }
       .kefu{
         background: url('~@/assets/img/PCimg/kefu-icon.png') center / 100% no-repeat
       }
       .fixedB{
         background: url('~@/assets/img/PCimg/top-icon.png') center / 100% no-repeat
       }
     }
   }
}
</style>
