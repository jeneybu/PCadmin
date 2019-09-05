<template>
  <span>{{str1}}</span>
</template>
<script>
export default {
  data() {
    return {
      str1: "发送验证码",
      send:"no",
      send1:"no",
      send2:"no",
      send3:"no",
    };
  },
  props: {
    timer: {
      type: Number,
      default: 0
    }
  },
  methods: {
    countdowm() {
      if (this.str1 === "发送验证码" || this.str1 ==="重新发送") {
        this.send = "ok"
        this.send1 = "ok"
        this.send2 = "ok"
        this.send3 = "ok"
        let self = this;
        let timing = 60;
        let timeID = setInterval(() => {
          timing--;
          this.str1 = timing + "s";
          if (timing === 0) {
            window.clearInterval(timeID);
            timing = 60;
            this.str1 = "重新发送";
            this.send = "no"
            this.send1 = "no"
            this.send2 = "no"
            this.send3 = "no"
          }
        }, 1000);
      }
    },
    
  }
};
</script>
