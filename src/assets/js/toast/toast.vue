<template>
  <div class="wrap" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>

<style scoped>
  .wrap {
    position: fixed;
    z-index: 9999;
    left: 50%;
    top: 65%;
    background-color:rgba(0, 0, 0, 0.65);
    padding: 16px 20px;
    font-size: 15px;
    border-radius: 10px;
    transform: translate(-50%,-50%);
    color:#fff;
  }
  .fadein {
    animation: animate_in 0.25s;
  }
  .fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }
  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
