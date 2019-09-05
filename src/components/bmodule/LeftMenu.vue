<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        text-color="#7380A0"
        active-text-color="#7380A0"
        background-color="#12223B"
        @select="handleSelect"
        class="el-menu-vertical-demo"
      >
        <div class="meun-logo"></div>

        <router-link v-for="(item, index) in items" :key="index" :to="item.path">
          <el-menu-item @click="toindexData(item.index)" :index="item.path">
            <div class="child-item" :class="{ 'icon-active': item.select === true }">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </div>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "leftmenu",
  created() {
    var picks = sessionStorage.getItem("activbItem");
    this.items[picks].select = true;
    this.addManagement = sessionStorage.getItem("addManagement");

  },
  mounted(){
    // 获取等级
    this.lev = JSON.parse(localStorage.getItem('userMsg')).agency_level
    if(this.lev === 1){
      this.items =[...this.items2]
    }else if(this.lev === 2){
      this.items = [...this.items1]
    }
  },
  data() {
    return {
      lev:'',
      select:true,
      addManagement: false,
      items: [
        {
          icon: "icon-item1",
          name: "收益钱包",
          path: "b_earnings",
          index: 0,
          select: false
        },
        {
          icon: "icon-item2",
          name: "交易数据分析图",
          path: "b_tradingchart",
          index: 1,
          select: false
        },
        {
          icon: "icon-item3",
          name: "名下用户分析图",
          path: "b_userchart",
          index: 2,
          select: false
        },
        {
          icon: "icon-item4",
          name: "交易员接单流水",
          path: "b_deal",
          index: 3,
          select: false
        },
        {
          icon: "icon-item5",
          name: "交易员信息管理",
          path: "b_information",
          index: 4,
          select: false
        },
        {
          icon: "icon-item8",
          name: "已邀请代理",
          path: "b_has_agents",
          index: 5,
          select: false
        },
        {
          icon: "icon-item9",
          name: "代理团队业绩",
          path: "b_agents_team",
          index: 6,
          select: false
        },
        {
          icon: "icon-item10",
          name: "邀请代理",
          path: "b_invite_agents",
          index: 7,
          select: false
        },
        {
          icon: "icon-item6",
          name: "推广渠道",
          path: "b_generalize",
          index: 8,
          select: false
        },
        {
          icon: "icon-item7",
          name: "我的信息管理",
          path: "b_manage",
          index: 9,
          select: false
        }
      ],
       items1: [
        {
          icon: "icon-item1",
          name: "收益钱包",
          path: "b_earnings",
          index: 0,
          select: false
        },
        {
          icon: "icon-item2",
          name: "交易数据分析图",
          path: "b_tradingchart",
          index: 1,
          select: false
        },
        {
          icon: "icon-item3",
          name: "名下用户分析图",
          path: "b_userchart",
          index: 2,
          select: false
        },
        {
          icon: "icon-item4",
          name: "交易员接单流水",
          path: "b_deal",
          index: 3,
          select: false
        },
        {
          icon: "icon-item5",
          name: "交易员信息管理",
          path: "b_information",
          index: 4,
          select: false
        },
        {
          icon: "icon-item8",
          name: "已邀请代理",
          path: "b_has_agents",
          index: 5,
          select: false
        },
        {
          icon: "icon-item9",
          name: "代理团队业绩",
          path: "b_agents_team",
          index: 6,
          select: false
        },
        {
          icon: "icon-item10",
          name: "邀请代理",
          path: "b_invite_agents",
          index: 7,
          select: false
        },
        {
          icon: "icon-item6",
          name: "推广渠道",
          path: "b_generalize",
          index: 8,
          select: false
        },
        {
          icon: "icon-item7",
          name: "我的信息管理",
          path: "b_manage",
          index: 9,
          select: false
        }
      ],
      items2: [
        {
          icon: "icon-item1",
          name: "收益钱包",
          path: "b_earnings",
          index: 0,
          select: false
        },
        {
          icon: "icon-item2",
          name: "交易数据分析图",
          path: "b_tradingchart",
          index: 1,
          select: false
        },
        {
          icon: "icon-item3",
          name: "名下用户分析图",
          path: "b_userchart",
          index: 2,
          select: false
        },
        {
          icon: "icon-item4",
          name: "交易员接单流水",
          path: "b_deal",
          index: 3,
          select: false
        },
        {
          icon: "icon-item5",
          name: "交易员信息管理",
          path: "b_information",
          index: 4,
          select: false
        },
        {
          icon: "icon-item6",
          name: "推广渠道",
          path: "b_generalize",
          index: 5,
          select: false
        },
        {
          icon: "icon-item7",
          name: "我的信息管理",
          path: "b_manage",
          index: 6,
          select: false
        }
      ]
    };
  },
  methods: {
    handleSelect(pick) {
      var array = this.items;
      let atIndex = 0;
      for (let i = 0; i < array.length; i++) {
        const item = array[i].path;
        if (item === pick) {
          atIndex = i;
        }
      }
      for (const iterator of this.items) {
        iterator.select = false;
      }
      this.items[atIndex].select = true;
      sessionStorage.setItem("activbItem", atIndex);
    },
    toindexData(index) {
      this.$emit("toindexData", index);
    }
  }
};
</script>

<style scoped>
.child-item {
  padding-left: 50px;
  background: #12223b;
}

.icon-active {
  background: #061220 !important;
}

.el-menu-item {
  font-size: 16px;
  padding: 0 !important;
}

.menu_page {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  background-color: #12223b;
  z-index: 99;
}

.el-menu {
  border: none;
}

.fa-margin {
  margin-right: 5px;
}

.meun-logo {
  height: 120px;
  background-color: #061220;
  background: url("~imgurl/PCimg/breg_logo.png")  center / 70% no-repeat
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  width: 35px;
}

.el-submenu .el-menu-item {
  min-width: 200px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}

a {
  text-decoration: none;
}

.icon-item1 {
  padding-left: 24px;
  background: url("~imgurl/bmenu_icon1.png") no-repeat center left;
  background-size: 18px 15px;
}

.icon-item2 {
  padding-left: 24px;
  background: url("~imgurl/bmenu_icon2.png") no-repeat center left;
  background-size: 18px 15px;
}

.icon-item3 {
  padding-left: 24px;
  background: url("~imgurl/bmenu_icon3.png") no-repeat center left;
  background-size: 18px 15px;
}

.icon-item4 {
  padding-left: 24px;
  background: url("~imgurl/bmenu_icon4.png") no-repeat center left;
  background-size: 18px 15px;
}

.icon-item5 {
  padding-left: 24px;
  background: url("~imgurl/bmenu_icon5.png") no-repeat center left;
  background-size: 18px 15px;
}

.icon-item6 {
  padding-left: 24px;
  background: url("~imgurl/bmenu_icon6.png") no-repeat center left;
  background-size: 18px 15px;
}

.icon-item7 {
  padding-left: 24px;
  background: url("~imgurl/bmenu_icon7.png") no-repeat center left;
  background-size: 18px 15px;
}

.icon-item8 {
  padding-left: 24px;
  background: url("~imgurl/ameun_add.png") no-repeat center left 2px;
  background-size: 15px 16px;
}

.icon-item9 {
  padding-left: 24px;
  background: url("~imgurl/ameun_invite.png") no-repeat center left;
}

.icon-item10 {
  padding-left: 24px;
  background: url("~imgurl/ameun_perform.png") no-repeat center left;
  background-size: 16px 15px;
}
</style>
