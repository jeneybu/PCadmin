<template>
  <div class="headBox">
    <dialogs :dialogVisibledata='dialogVisibledata' @userMsg="userMsgh" :init="showCount"></dialogs>
    <div class="head">
       <img src="~imgurl/logo.png" alt="">
      <div class="tab">
        <el-menu :default-active="activeInde" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <!-- <el-menu-item index="1">A·Pay钱包</el-menu-item>
          <el-menu-item index="2">交易端代理</el-menu-item>
          <el-menu-item index="6">视频指导</el-menu-item>
          <el-menu-item index="3">API接入</el-menu-item>
          <el-menu-item index="4" :class="{'isgreen': !this.isIcon}"><i v-if="this.isIcon" class="el-icon-s-check"></i>{{tab5Text}}</el-menu-item> -->
          <!-- <el-menu-item index="5" v-if="this.isIcon">退出</el-menu-item> -->
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import Dialogs from '@/components/Dialog.vue'
export default {
  name: 'headBox',
  components: {
    Dialogs
  },
  props: {
      activeIndex: String
  },
  data () {
    return {
        activeInde: '1',
        tab5Text: '登录',
        isIcon: false,
        showCount: 0,
        dialogVisibledata: false,
        isbond: false,
        userMsg: {}
    }
  },
  created () {
    if (this.$router.currentRoute.name === 'Bond') {
      console.log(this.$router.currentRoute.name);
      this.isbond = true
    }
    this.activeInde = this.activeIndex
    if (JSON.parse(localStorage.getItem('userMsg'))) {
      this.userMsg = JSON.parse(localStorage.getItem('userMsg'))
      this.tab5Text = this.userMsg.mobile
      this.isIcon = true
    }
    if(localStorage.getItem('token')){
      // this.router.push('/')
      this.userMsg = JSON.parse(localStorage.getItem('userMsg'))
      if (this.userMsg.status === 0) {
        return false
      } else {
        if (this.userMsg.is_agency === 1) {
          this.$router.push('/a_earnings')
        } else {
          this.$router.push('/b_earnings')
        }
      }
    }
  },
  methods: {
    userMsgh (data) {
      this.userMsg = JSON.parse(data)
      this.tab5Text = this.userMsg.mobile
      this.isIcon = true
    },
    // 登录弹框
    clickBtn () {
      this.dialogVisibledata = false
      setTimeout(() => {
        this.showCount = this.showCount + 1
        this.dialogVisibledata = !this.dialogVisibledata
      }, 200)
    },
    // 推出登录
    loginOut(){
      const data = {
        token:localStorage.getItem('token')
      }
      this.$post(this.$api.website +'/api/agency/out',data).then(res=>{
        localStorage.removeItem('token')
        localStorage.removeItem('userMsg')
        // this.$router.go(0)
        this.$router.push({path: '/itemFirst'})
      })
    },
    toindexData (index) {
      this.$emit("toindexData", index)
    },
    handleSelect(key, keyPath) {
      switch (key) {
          case '1':
          this.isbond ? '' : this.$router.push('/itemFirst')
              break;
          case '2':
          this.isbond ? '' : this.$router.push('/itemSecond')
              break;
          case '3':
          this.isbond ? '' : this.$router.push('/itemThird')
              break;
          case '4':
          this.isbond ? '' : this.clickBtn()
              break;
          case '5':
          this.loginOut()
              break;
          case '6':
          this.isbond ? '' : this.$router.push('/VideoPages')
              break;
          default:
              break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu .el-submenu__title:hover{
  background-color: transparent !important
}
/deep/ .el-menu-item:focus{
  background-color: transparent !important
}
.head{
  background-color: transparent;
  min-width: 960px;
  width: 100%;
  height: 93px;
  position: relative;
  img{
      width: 45px;
      position: absolute;
      left: 14%;
      top: 25px;
      z-index: 9999;
  }
  .tab{
      z-index: 99999;
      width: 50%;
      position: absolute;
      right: 0;
      padding-top: 20px;
      .el-menu{
          background-color: transparent
      }
      .el-menu--horizontal{
          border: none;
          .is-active{
            border-bottom: 2px solid #00CAD8;
            color: #fff;
          }
          .el-menu-item{
              color: #fff;
              &:hover{
                background-color: transparent !important
              }
              // &:not(.is-disabled):focus
              &:not(.is-disabled):is-focus{
                background-color: transparent !important
              }
              &:focus{
                background-color: transparent !important
              }
          }
          .isgreen{
              color: #23E0C7;
          }
      }
  }
}
</style>
