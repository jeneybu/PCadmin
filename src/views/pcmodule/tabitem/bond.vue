<template>
    <div class="bond">
      <tb-head :activeIndex='activeIndex'></tb-head>
      <div class="headbg"></div>
      <div class="maincont">
        <div class="left">
          <img :src="imgUrl" alt="">
        </div>
        <div class="right">
          <h3 class="title">缴纳代理保证金3000USDT</h3>
          <div class="copy">
            <input id="foo" :value="copyText" readonly>
            <i class="tag-copy" data-clipboard-target="#foo" @click="copy()"></i>
          </div>
          <div class="tip">
            <p>请勿充值USDT之外其他数字资产</p>
            <p>您充值至上述地址后，将在2个区块确认后到账</p>
            <p>充值其他数字资产导致的经济损失，平台概不负责</p>
            <p>缴纳足额3000USDT保证金后，系统自动激活代理账户</p>
            <p>当前已缴纳：{{usdtNum}}USDT</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import tbHead from '@/views/pcmodule/head.vue'
import Clipboard from 'clipboard' // npm install clipboard --save
export default {
  name: 'bond',
  components: {
    tbHead
  },
  props: {},
  data () {
    return {
      copyText: '',
      imgUrl: null,
      usdtNum: null,
      activeIndex: '1'
    }
  },
  created () {
    this.getCode()
    this.refresh()
  },
  methods: {
    // 复制
    copy () {
      var clipboard = new Clipboard('.tag-copy')
      // 成功回调
      clipboard.on('success', function (e) {
        alert('复制成功')
        clipboard.destroy()
      })
      // 失败回调
      clipboard.on('error', function (e) {
        clipboard.destroy()
      })
    },
    getCode () {
      if (!localStorage.getItem('token')) {
        return false
      }
      var data = {
        token: localStorage.getItem('token')
      }
      this.$post(this.$api.website +'/api/agency/payinfo', data).then(res => {
        var data = res.data
        this.copyText = data.code
        this.imgUrl = data.pic
      })
    },
    refresh () {
      if (!localStorage.getItem('token')) {
        return false
      }
      var data = {
        token: localStorage.getItem('token')
      }
      this.$post(this.$api.website +'/api/agency/refresh', data).then(res => {
        var data = res.data
        var url = '/b_earnings'
        this.usdtNum = data.deposit
        if (data.is_agency === 1) {
          url = '/a_earnings'
        }
        if (data.status === 1) {
          this.$router.push({
            path: url
          })
        }

      })
    }
  }
}
</script>

<style lang="scss" scoped>
html,
body,
#app {
  background-color: #fff !important;
}
.bond {
  min-width: 1008px;
  background-color: #fff;
  height: 100%;
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
    display: flex;
    padding: 12% 27%
  }
  .left{
    img{
      width: 192px
    }
  }
  .right {
    margin-left: 45px;
    .title {
      font-size: 24px;
      color: #070707;
    }
    .copy {
      position: relative;
      display: flex;
      width: 200%;
      #foo {
        font-size: 18px;
        color: #070707;
        border: none;
        width: 100%;
      }
      .tag-copy {
        display: inline-block;
        width: 72px;
        height: 31px;
        background: url("~@/assets/img/PCimg/copy-icon.png") center / 100% no-repeat;
      }
    }
    .tip {
      p {
        text-align: left;
        font-size: 12px;
        color: #1087fd;
        line-height: initial
      }
    }
  }
}
</style>
