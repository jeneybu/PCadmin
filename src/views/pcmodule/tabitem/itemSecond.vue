<template>
  <div class="itemSecond">
    <dialogs :dialogVisibledata='dialogVisibledata'></dialogs>
    <tb-head :activeIndex='activeIndex'></tb-head>
    <div class="fixedBox">
      <div class="item" @click="kefu()"><i class="kefu"></i></div>
      <div class="item" @click="toTop()"><i class="fixedB"></i></div>
    </div>
    <div class="unit unit1">
      <div class="bannerbox leftbanner">
        <h3 class="title">橙子云商 交易端代理</h3>
        <div class="txt"><span>为您提供强大的用户裂变推广方案<br>无技术门槛，轻松达成高收益</span></div>
        <div class="btn">
          <i class="wallet" @click="register()"></i>
          <i class="yiduan" @click="clickBtn()"></i>
        </div>
      </div>
      <div class="rightbanner">
        <img class="gif0" src="~@/assets/img/PCimg/item2-gif.png" alt="">
      </div>
    </div>
    <div class="unit unit2">
      <div class="bannerbox">
        <h3 class="title">成为橙子云商 交易端代理优势</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
      </div>
      <ul class="advantage">
        <li>
          <img src="~@/assets/img/PCimg/item2-ad1.png" alt="">
          <p>加入门槛低</p>
          <span>注册申请成为交易端代理<br>缴纳代理费用</span>
        </li>
        <li>
          <img src="~@/assets/img/PCimg/item2-ad2.png" alt="">
          <p>工作轻松自由</p>
          <span>使用我们的推广链接，邀请用户注册成<br>为交易员，交易端自动用户裂变模式，人数倍增</span>
        </li>
        <li>
          <img src="~@/assets/img/PCimg/item2-ad3.png" alt="">
          <p>轻松达成高收益</p>
          <span>代理推广所得的用户，包括用户推荐其他<br>好友都属于代理方所有，并享受所有<br>交易的带来的收益</span>
        </li>
      </ul>
    </div>
    <div class="unit unit5">
      <div class="bannerbox">
        <h3 class="title">成为交易端代理流程</h3>
        <div class="img"><img src="~@/assets/img/PCimg/item1-ddd.png" alt=""></div>
        <div class="txt"><span>无论您从事什么行业，只要您对新鲜事物感兴趣或希望赚取额外收入，都可以立即申请入驻A·PAY超级交易员</span></div>
      </div>
      <div class="step">
        <ul>
          <li>
            <img src="~@/assets/img/PCimg/item2-step1.png" alt="">
            <p>申请成为代理</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item2-step2.png" alt="">
            <p>缴纳代理费用</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item2-step3.png" alt="">
            <p>成为交易员代理</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item2-step4.png" alt="">
            <p>推广用户注册</p>
          </li>
          <li><i class="line"></i></li>
          <li>
            <img src="~@/assets/img/PCimg/item2-step5.png" alt="">
            <p>享受交易收益</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Dialogs from '@/components/Dialog.vue'
import tbHead from '@/views/pcmodule/head.vue'
export default {
  name: 'itemSecond',
  components: {
    Dialogs,
    tbHead
  },
  data () {
    return {
      dialogVisibledata: false,
      activeIndex: '2'
    }
  },
  methods: {
    clickBtn () {
      this.dialogVisibledata = false
      setTimeout(() => {
        this.dialogVisibledata = !this.dialogVisibledata
      }, 200)
    },
    register () {
      this.$router.push({
        path: '/register',
        query: {
          value: '2'
        }
      })
    },
    kefu () {},
    // scrollToTop () {
    //   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    // },
    toTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
  // mounted () {
  //   window.addEventListener('scroll', this.scrollToTop)
  // },
  // destroyed () {
  //   window.removeEventListener('scroll', this.scrollToTop)
  // }
}
</script>

<style lang="scss" scoped>
.itemSecond{
  background-color: #252744;
  height: 100%;
  width: 100%;
  min-width: 1080px;
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
  .unit{
    .bannerbox{
      text-align: center;
      .title{
        font-size: 30px;
        font-weight: 400;
        color: #fff;
        padding-top: 136px;
        margin-bottom: 32px
      }
      .txt{
        font-size: 14px;
        color: #79A5C0;
        padding: 0 0 53px;
        span{
          line-height: 20px;
          letter-spacing: 1px
        }
      }
      .btn{
        i{
          display: inline-block;
          height: 42px;
          width: 138px
        }
        .wallet{
          margin-right: 30px;
          background: url('~@/assets/img/PCimg/item2-register.png') center / 100% no-repeat
        }
        .yiduan{
          background: url('~@/assets/img/PCimg/item2-login.png') center / 100% no-repeat
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
    height: 836px;
    .bannerbox{
      text-align: left !important;
    }
    .leftbanner{
      padding-top: 80px;
      z-index: 1111;
      position: absolute;
      left: -16px;
      top: -15px;
      width: 100%;
      height: 530px;
      background: url('~@/assets/img/PCimg/item2-bg1.png') no-repeat;
      background-size: contain;
      padding-left: 14.9%
    }
    .rightbanner{
      height: 100%;
      width: 100%;
      position: relative;
      img{
        width: 33.75%;
        position: absolute;
        top: 107px;
        right: 14.2%;
      }
    }
  }
  .unit2{
    padding: 145px 0 247px;
    background-color: #20223d;
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
        max-width: 20%;
        img{
          width: 47px
        }
        p{
          color: #fff;
          font-size: 18px;
          padding: 18px 0 28px
        }
        span{
          font-size: 14px;
          color: #79A5C0;
          line-height: 20px;
          letter-spacing: 1px
        }
      }
    }
  }
  .unit5{
    padding-bottom: 150px;
    .bannerbox{
      margin-bottom: 121px;
      img{
        padding-bottom: 40px;
      }
    }
    .step{
      ul{
        padding: 0 240px;
        li{
          img{
            width: 55px
          }
          p{
            padding-top: 24px;
            font-size: 14px;
            color: #fff
          }
          .line{
            margin-top: 42px;
            display: inline-block;
            width: 75px;
            height: 1px;
            background: url('~@/assets/img/PCimg/item2-bg3.png') center / 100% no-repeat
          }
        }
      }
    }
  }
}
</style>
