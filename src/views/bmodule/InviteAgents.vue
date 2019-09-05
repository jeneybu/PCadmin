<template>
  <div class="container">
    <div class="left">
      <div class="img">
        <el-scrollbar style="height: 100%;">
          <img src="~imgurl/b_invitebg.png" alt />
        </el-scrollbar>
      </div>
    </div>
    <div class="right">
      <div class="title">推广链接</div>
      <div class="link">
        <a href="#" id="foo" :value="copyText" readonly>{{copyText}}</a>
        <el-button
          type="primary"
          size="small"
          class="tag-copy"
          data-clipboard-target="#foo"
          @click="copy()"
        >复制</el-button>
      </div>
      <div class="tips">
        注：链接主要用来邀请用户注册成为代理，用户填写完成后，
        可在已邀请代理列表中查看已邀请的成员。
      </div>
    </div>
  </div>
</template>


<script>
// 点击复制
import Clipboard from "clipboard";
import { Message } from "element-ui";
export default {
  name: "InviteAgents",
  data() {
    return {
      copyText: ""
    };
  },
  created() {
    this.getInfro();
  },
  methods: {
    getInfro() {
      this.$post(this.$api.agency + "/api/buser/agencyShare", {
        token: localStorage.getItem("token")
      }).then(res => {
        this.copyText = res.data.share_url;
      });
    },
    // 复制
    copy() {
      var clipboard = new Clipboard(".tag-copy");
      //成功回调
      clipboard.on("success", function(e) {
        Message({
          message: "复制成功",
          type: "success"
        });
        clipboard.destroy();
      });
      //失败回调
      clipboard.on("error", function(e) {
        clipboard.destroy();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.container {
  width: 100%;
  height: 755px;
  padding: 61px 0 0 101px;
  box-sizing: border-box;
  display: flex;
  .left {
    width: 283px;
    height: 565px;
    background: url("~imgurl/mobile.png") no-repeat center/283px 565px;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      width: 249px;
      height: 535px;
      border-radius: 25px;
      overflow: auto;
      overflow-x: hidden;
      img {
        width: 249px;
      }
    }
  }
  .right {
    height: 565px;
    flex: 1;
    padding-left: 59px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    .title {
      color: #fff;
      font-size: 16px;
      margin-bottom: 25px;
    }
    .link {
      margin-bottom: 40px;
      a {
        color: #3986e2;
        font-size: 14px;
      }
      .el-button--primary {
        width: 60px;
        background-color: #059e7e;
        border-color: #059e7e;
        margin-left: 15px;
      }
    }
    .tips {
      width: 305px;
      height: 64px;
      line-height: 30px;
      font-size: 16px;
    }
  }
}
</style>
