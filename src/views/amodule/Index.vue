<template>
  <div class="index">
    <LeftMenu @toindexData="sendleftData"></LeftMenu>
    <div class="wrapper">
      <HeadNav :headTitle='headtitleIndex'></HeadNav>
      <div class="rightContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from "components/amodule/HeadNav";
import LeftMenu from "components/amodule/LeftMenu";

export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu
  },
  created () {
    if (!sessionStorage.getItem('activaItem')) {
      sessionStorage.setItem('activaItem', 0)
    }
  },
  data() {
    return {
      headtitleIndex: 0
    }
  },
  methods: {
    sendleftData(data){
      this.headtitleIndex = data;
    }
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
}

.wrapper {
  position: fixed;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: #061220;
}

.rightContainer {
  position: relative;
  min-width: 1200px;
  background-color: #061220;
  padding: 30px 28px 50px 58px;
}
</style>

