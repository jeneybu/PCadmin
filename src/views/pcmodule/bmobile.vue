<template>
  <div class="body">
    <div class="mask" v-show="maskWord">
      <div class="box">
        <span>请点击右上方选择浏览器打开</span>
      </div>
    </div>
    <div class="img-wrap">
      <div class="area-top">
        <div class="logo"></div>
        <div class="point"></div>
      </div>

      <div class="area-mid"></div>

      <div class="area-bottom">
        <p class="icon"></p>
        <div class="apple" @click="isWeiXin()">
          <div class="sty"></div>
          <a class="btn" href="#">iPhone版下载</a>
        </div>
        <div class="android" @click="isWeiXin()">
          <div class="sty"></div>
          <a class="btn" href="#">android版下载</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "breg",
  data() {
    return {
      maskWord: false,
      urlIos:'',
      urlAdr:''
    }
  },
  created () {
    this.isWeiXin()
  },
  methods: {
    // 判断是否是微信浏览器打开
    isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase()
        // console.log(ua)
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          this.maskWord = true
          setTimeout(() => {
            this.maskWord = false
          }, 3000)
            return true
        }
        else {
          this.$router.push('/bmobile2')
            return true
        }
    },
    goRegister () {
      this.maskWord = true
      setTimeout(() => {
        this.maskWord = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255,255,255,0.5);
  .box{
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    span{
      display: inline-block;
      font-size: 13px;
      color: #fff;
      background-color: rgba(0,0,0,0.8);
      border-radius: 3px;
      padding: 15px;
    }
  }
}
</style>

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
    background: url('../../assets/img/PCimg/czdown_point.png') center no-repeat;
    background-size: 100% 100%;
    .area-top {
      position: relative;
      height: 30px;
      width: 100%;
      margin: 40px 0;
      padding: 0 20px;
      .logo {
        width: 145px;
        height: 30px;
        background: url('../../assets/img/PCimg/czdown_log.png') no-repeat;
        background-size: 145px 30px;
      }
    }


    .area-mid {
      position: relative;
      box-sizing: border-box;
      margin-top: 40px;
      height: 289px;
      width: 100%;
      background: url('../../assets/img/PCimg/czdown_bg2.png') center no-repeat;
      background-size: 289px;
    }

    .area-bottom {
      position: relative;
      padding: 0 20px;
      .icon {
        margin-top: 20px;
        width: 100%;
        height: 20px;
        background: url('../../assets/img/PCimg/czdown_back.png') center no-repeat;
        background-size: 22px 10px;
      }
      .apple {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 45px;
        border: 1px solid #eee;
        border-radius: 10px;
        .sty {
          width: 22px;
          height: 45px;
          background: url('../../assets/img/PCimg/czdown_apple.png') center top 10px no-repeat;
          background-size: 22px;
        }
        .btn {
          color: #fff;
          line-height: 45px;
          margin-left: 10px;
        }
      }
      .android {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 45px;
        border: 1px solid #eee;
        border-radius: 10px;
        .sty {
          width: 22px;
          height: 45px;
          background: url('../../assets/img/PCimg/czdown_android.png') center top 10px no-repeat;
          background-size: 22px;
        }
        .btn {
          color: #fff;
          line-height: 45px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
