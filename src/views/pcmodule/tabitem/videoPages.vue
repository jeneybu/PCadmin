<template>
  <div class="bodys">
    <div class="itemFirst">
      <tb-head :activeIndex="activeIndex"></tb-head>
      <div class="top-box"></div>
    </div>
    <div class="content"></div>
    <div class="box">
      <div class="video-box">
        <div class="title">如何使用A·PAY系统</div>
        <video :src="bigVideoUrl" class="video" controls autoplay></video>
      </div>
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="A·PAY 背景及介绍" name="first">
            <video
              v-for="(item,index) in firstList"
              :key="index"
              :src="item.src"
              width="144px"
              height="81px"
              @click="startPlay"
            ></video>
          </el-tab-pane>
          <el-tab-pane label="如何申请代理及介绍" name="second">
            <video
              v-for="(item,index) in secondList"
              :key="index"
              :src="item.src"
              width="144px"
              height="81px"
              @click="startPlay"
            ></video>
          </el-tab-pane>
          <el-tab-pane label="如何使用 A·PAY" name="third">
            <video
              v-for="(item,index) in thirdList"
              :key="index"
              :src="item.src"
              width="144px"
              height="81px"
              @click="startPlay"
            ></video>
          </el-tab-pane>
          <el-tab-pane label="商户接入API步骤" name="fourth">
            <video
              v-for="(item,index) in fourthList"
              :key="index"
              :src="item.src"
              width="144px"
              height="81px"
              @click="startPlay"
            ></video>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import tbHead from "@/views/pcmodule/head.vue";
export default {
  name: "VideoPages",
  components: {
    tbHead
  },
  data() {
    return {
      activeName: "first",
      activeIndex: "0",
      bigVideoUrl: "https://xianshangyunshang.oss-cn-hongkong.aliyuncs.com/video/%E7%AC%AC%E4%B8%80%E6%AE%B5-A%E2%80%A2PAY%E8%83%8C%E6%99%AF%E5%8F%8A%E4%BB%8B%E7%BB%8D-%E9%AB%98%E6%B8%85.mp4",
      firstList: [
        {
          src:
            "https://xianshangyunshang.oss-cn-hongkong.aliyuncs.com/video/%E7%AC%AC%E4%B8%80%E6%AE%B5-A%E2%80%A2PAY%E8%83%8C%E6%99%AF%E5%8F%8A%E4%BB%8B%E7%BB%8D-%E9%AB%98%E6%B8%85.mp4"
        }
      ],
      secondList: [
        {
          src:
            "https://xianshangyunshang.oss-cn-hongkong.aliyuncs.com/video/%E7%AC%AC%E4%BA%8C%E6%AE%B5-A%E2%80%A2PAY%E5%A6%82%E4%BD%95%E7%94%B3%E8%AF%B7%E4%BB%A3%E7%90%86%E5%8F%8A%E4%BB%8B%E7%BB%8D-%E9%AB%98%E6%B8%85.mp4"
        }
      ],
      thirdList: [
        {
          src:
            "https://xianshangyunshang.oss-cn-hongkong.aliyuncs.com/video/%E7%AC%AC%E4%B8%89%E6%AE%B5-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8A%E2%80%A2PAY-%E9%AB%98%E6%B8%85.mp4"
        }
      ],
       fourthList: [
        {
          src:
            "https://xianshangyunshang.oss-cn-hongkong.aliyuncs.com/video/%E5%95%86%E6%88%B7%E6%8E%A5%E5%85%A5API%E6%AD%A5%E9%AA%A4.mp4"
        }
      ],
      index: "0"
    };
  },
  methods: {
    startPlay() {
      if (this.index === "0") {
        console.log("0000");
        for (let i = 0; i < this.firstList.length; i++) {
          this.bigVideoUrl = this.firstList[i].src;
        }
      } else if (this.index === "1") {
        for (let i = 0; i < this.secondList.length; i++) {
          this.bigVideoUrl = this.secondList[i].src;
        }
      } else if (this.index === "2") {
        for (let i = 0; i < this.thirdList.length; i++) {
          this.bigVideoUrl = this.thirdList[i].src;
        }
      }else if(this.index === "3"){
        for (let i = 0; i < this.fourthList.length; i++) {
          this.bigVideoUrl = this.fourthList[i].src;
        }
      }
    },
    handleClick(tab, event) {
      this.index = tab.index;
      console.log(this.index);
    }
  }
};
</script>


<style lang="scss" scoped>
/deep/ .el-tabs__item {
  height: 25px;
  line-height: 25px;
  color: #fff;
}
/deep/ .el-tabs__header {
  margin: 0;
  background-color: #424571;
}
/deep/ .el-tabs__item.is-active {
  background-color: #20223d;
}
/deep/ .el-tabs__content {
  height: 139px;
  background-color: #2b2d4d;
  padding: 0 29px;
  box-sizing: border-box;
}
/deep/.el-tabs__nav-wrap::after {
  height: 0;
}
/deep/ .el-tabs__active-bar {
  background-color: #00ffff;
}

.itemFirst {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1080px;
  background-color: #fff;
  .top-box {
    height: 242px;
    background: url("~@/assets/img/PCimg/price-banner.png") center / 100%
      no-repeat;
    margin-top: -94px;
  }
}
.content {
  position: fixed;
  top: 241px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #252744;
  z-index: 999;
}
.box {
  position: fixed;
  width: 693px;
  top: 110px;
  left: 50%;
  right: 0;
  bottom: 0;
  z-index: 1000;
  .video-box {
    width: 100%;
    margin-left: -50%;
    .title {
      width: 693px;
      height: 37px;
      background-color: #242643;
      color: #fff;
      font-size: 14px;
      padding-left: 15px;
      box-sizing: border-box;
      line-height: 37px;
    }
    .video {
      width: 693px;
      height: 391px;
    }
  }
  .tabs {
    width: 693px;
    height: 200px;
    margin-left: -50%;
    video {
      transform: translateY(35%);
    }
  }
}
</style>
