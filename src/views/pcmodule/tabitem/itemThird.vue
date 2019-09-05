<template>
  <div class="itemThird">
    <tb-head :activeIndex='activeIndex'></tb-head>
    <div class="unit unit1">
      <div class="bannerbox">
        <h3 class="title">API接入</h3>
        <div class="txt"><span>使用我们提供的API，轻松为您的<br>商户提供安全的在线支付方案</span></div>
      </div>
    </div>
    <div class="mainbox">
      <el-container style="height:600px">
        <el-aside>
          <ul class="Ptitle">
            <li>文档接入 <i class="el-icon-s-grid"></i></li>
            <li><a href="#img1">入门指导</a></li>
            <li><a href="#img1">使用流程</a></li>
            <!-- <li>使用流程</li> -->
          </ul>
           <el-menu
             default-active="2"
             class="el-menu-vertical-demo">
             <el-submenu index="1">
               <template slot="title">
                 <span>1 API概述</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="1-1"><a href="#img3">1.3 数据加密签名规则</a></el-menu-item>
               </el-menu-item-group>
             </el-submenu>
             <el-submenu index="2">
               <template slot="title">
                 <span>2 对接API接口</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="2-1"><a href="#img4">2.1 获取用户积分</a></el-menu-item>
                 <el-menu-item index="2-2"><a href="#img5">2.2 发起提现通知冻结该用户的积分</a></el-menu-item>
                 <el-menu-item index="2-3"><a href="#img6">2.3 取消提现通知解冻该用户的积分</a></el-menu-item>
                 <el-menu-item index="2-4"><a href="#img7">2.4 完成提现通知扣减该用户的积分</a></el-menu-item>
                 <el-menu-item index="2-5"><a href="#img8">2.5 充值完成时通知第三方发放该用户的积分</a></el-menu-item>
               </el-menu-item-group>
             </el-submenu>
           </el-menu>
        </el-aside>
        <el-main>
          <div id="img1"><img src="~@/assets/img/PCimg/api.png" alt=""></div>
          <div id="img2"><img src="~@/assets/img/PCimg/api1.png" alt=""></div>
          <div id="img3"><img src="~@/assets/img/PCimg/api1-3.png" alt=""></div>
          <div id="img4"><img src="~@/assets/img/PCimg/api2-1.png" alt=""></div>
          <div id="img5"><img src="~@/assets/img/PCimg/api2-2.png" alt=""></div>
          <div id="img6"><img src="~@/assets/img/PCimg/api2-3.png" alt=""></div>
          <div id="img7"><img src="~@/assets/img/PCimg/api2-4.png" alt=""></div>
          <div id="img8"><img src="~@/assets/img/PCimg/api2-5.png" alt=""></div>
        </el-main>

        <el-main v-if="0">
          <div class="itemContant">
            <div class="mainTitle"><span>A·PAY API文档接入</span></div>
            <div class="mainmain">
              <div class="section section1">
                <h3>入门指导</h3>
                <div class="content">
                  <div class="text"><span>欢迎使用A·PAY开发者文档，此文档为商户提供了一整套简单而又强大的开发工具，旨在帮助商户快速、高效地将交易功能整合到自己的应用当中。接口是提供服务的基础，API分为用户积分获取、积分充值和积分提现三类。</span></div>
                </div>
              </div>
              <div class="section section2">
                <h3>使用流程</h3>
                <div class="content">
                  <div class="text"><span>API文档可直接在官网查看，但正式接入时，必须提供 API Key 作为每个请求的身份验证。商户可以通过官网联系平台对接，也可以通过代理申请对接，正式录入商户信息准备对接后，平台会为每个商户生成专项的对接密钥（主要包含：1.加密方式 2.密码 3.偏移量 4.附加私钥）接入完成后，平台会为商户提供一个专用的商户管理后台（用于管理其应用内的用户积分数）。</span></div>
                </div>
              </div>
              <div class="section section3">
                <h3>1 API概述</h3>
                <div class="content">
                  <ul class="tabs tab1">
                    <li>
                      <h4>1.1 简要说明</h4>
                      <div class="text"><span>阅读对象：参与A·PAY对接的相关技术开发人员。</span></div>
                    </li>
                    <li>
                      <h4>1.2 接入URL</h4>
                      <div class="text">
                        <span>正式服务器: https://***.******.**/api</span><br>
                        <span>测试服务器: http://***.******.***/api</span><br>
                        <span>请求方式： POST</span>
                      </div>
                    </li>
                    <li>
                      <h4>1.3 数据加密签名规则</h4>
                      <div class="text">
                        <span>加密方式：**********</span><br>
                        <span>密码：*****************************</span><br>
                        <span>向量（iv）：*****************</span>
                        <p>请求参数示例：</p>
                        <span>{"user_id": 101949, "coins": 100, "order_no": "20190614205118"}</span><br>
                        <span>1. 对请求参数进行数据签名</span><br>
                        <span>a. 请求参数增加一个额外对外参数 '*****' = '***************' 得到</span><br>
                        <span>b. {"user_id": 101949, "coins": 100, "order_no": "20190614205118", "extra": "**************"}</span><br>
                        <span>c. 请求参数根据键值ASCII升序排序</span><br>
                        <span>d. 请求参数字符串拼接 coins=100&extra=IEAJKGa8J3CtmmjD&user_id=101949&order_no=20190614205118</span><br>
                        <span>e. 对拼接后的字符串进行2次****加密 md5(md5('coins=100&user_id=101949&order_no=20190614205118')) 得到签名串</span>
                        <p>请求数据加上签名串得到</p>
                        <span>{"user_id": 101949, "coins": 100, "order_no": "20190614205118", "sign": "b0abdf4b5db6e05cf200458a9eba6b5b"}</span><br>
                        <span>对（2）数据进行**********加密，返回*******加密后的加密串</span><br>
                        <span>swwjFfpB/NlNGutwsiVMdAPCed8GSHOHSnysXzkz36GxDTf0rQ7ri6VTaAAWnayVxtCSDbHAoTfbKS9Kb6NG4TbT9NKwSCtDdHEYigOTXm7x7hqBnGRi9P5Ujl6VTnolhn/WTd08Jn8cXTRmCygoHg==</span><br>
                        <span>得到最后的请求参数为:</span><br>
                        <span>{"data": swwjFfpB/NlNGutwsiVMdAPCed8GSHOHSnysXzkz36GxDTf0rQ7ri6VTaAAWnayVxtCSDbHAoTfbKS9Kb6NG4TbT9NKwSCtDdHEYigOTXm7x7hqBnGRi9P5Ujl6VTnolhn/WTd08Jn8cXTRmCygoHg==}</span><br>
                        <span>返回结果说明:</span><br>
                        <span>带签名，签名方式跟请求签名方式一致</span><br>
                        <span>例如：</span><br>
                        <span>{"status": 1, "msg": "查询成功", "data": {"user_id": 101949, "coins": "49467.4000"}, "sign": "229cd1b2281fbadfc8998009003d12e6"}</span><br>
                        <span>对上面数据****加密得到：</span><br>
                        <span>Irr7M1BVEC/MtGGbOb86Rx2L++6L/eu2+CJT5IVeW4yX9RVW6gEgkXwLW0OuYVs9QsVNF+aeSSMsdbtAGGqNkKirzajj3stj8xs6ipxg3gRdLwNan5Wbq4ONguKv9SY5FngwEO+8obGaU0SHSw7Flv2SqFi/P0Yq+EBw12wnA7c=</span><br>
                        <span>返回数据：</span><br>
                        <span>Irr7M1BVEC/MtGGbOb86Rx2L++6L/eu2+CJT5IVeW4yX9RVW6gEgkXwLW0OuYVs9QsVNF+aeSSMsdbtAGGqNkKirzajj3stj8xs6ipxg3gRdLwNan5Wbq4ONguKv9SY5FngwEO+8obGaU0SHSw7Flv2SqFi/P0Yq+EBw12wnA7c=</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="section section4">
                <h3>2 对接API接口</h3>
                <div class="content">
                  <ul class="tabs tab1">
                    <li>
                      <h4>2.1 获取用户积分</h4>
                      <div class="text">
                        <span>请求参数：</span><br>
                        <span>"user_id": 101949, "coins": 100, "order_no": "20190614205118", "sign": "b0abdf4b5db6e05cf200458a9eba6b5b" }</span>
                        <h4>请求参数说明</h4>
                        <table>
                          <thead>
                            <th>
                              <td>参数名</td>
                              <td>类型</td>
                              <td>是否必须</td>
                              <td>描述</td>
                            </th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>status</td>
                              <td>int</td>
                              <td>是</td>
                              <td>对接平台用户id</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </li>
                    <li>
                      <h4>1.2接入URL</h4>
                      <div class="text">
                        <span>正式服务器: https://***.******.**/api</span><br>
                        <span>测试服务器: http://***.******.***/api</span><br>
                        <span>请求方式： POST</span>
                      </div>
                    </li>
                    <li>
                      <h4>1.3数据加密签名规则</h4>
                      <div class="text">
                        <span>加密方式：**********</span><br>
                        <span>密码：*****************************</span><br>
                        <span>向量（iv）：*****************</span>
                        <p>请求参数示例：</p>
                       </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import tbHead from '@/views/pcmodule/head.vue'
export default {
  name: 'itemThird',
  components: {
    tbHead
  },
  data () {
    return {
      apiData: {
        tabData: [
          '入门指导',
          '使用流程'
        ],
        mainContant: ''
      },
      activeIndex: 0,
      activeIndex: '3',
      tableTle: ['参数名', '类型', '是否必须', '描述'],
      table21: [

      ]
    }
  },
  created() {
    this.getApititledata()
    this.getApicontaindata(1)
  },
  methods: {
    checkouttab (idx,id) {
      this.activeIndex = idx
      console.log(idx, id)
      this.getApicontaindata(id)
    },
    getApititledata () {
      this.$post(this.$api.website +'/api/agency/agencyArticle').then(res => {
        var data = res.data
        this.apiData.tabData = data
      })
    },
    getApicontaindata (id) {
      var data = {
        id: id
      }
      this.$post(this.$api.website +'/api/agency/agencyArticleDetail', data).then(res => {
        var data = res.data
        this.apiData.mainContant = data.content
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.head{
  background-color: transparent
}
.itemThird{
  height: 100%;
  width: 100%;
  min-width: 1080px;
  background-color: #fff;
  .unit{
    height: 242px;
    background: url('~@/assets/img/PCimg/item2-bg.png') center / 100% no-repeat;
    margin-top: -94px;
    padding-left: 30.31%;
    .bannerbox{
      text-align: left;
      .title{
        font-size: 26px;
        font-weight: 400;
        color: #fff;
        padding-top: 91px;
        margin-bottom: 20px
      }
      .txt{
        font-size: 12px;
        color: #79A5C0;
        padding: 0 0 53px;
        line-height: 20px
      }
    }

    ul{
      padding: 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .mainbox{
    background-color: #fff;
    height: 100%;
    width: 100%;
    padding: 30px;
    .el-aside{
      border: 1px solid #F0F0F0;
      .Ptitle{
        font-size: 15px;
        a{
          color: #000 !important;
          display: inline-block;
          height: 100%;
          width: 100%
        }
        li{
          padding: 0 19px 0;
          line-height: 44px;
          &:first-of-type{
            border-bottom: 1px solid #F0F0F0
          }
        }
      }
    }
    .el-main{
      // img{
      //   width: 100%;
      // }
    }
    .itemContant{
      padding-right: 30%;
      .mainTitle{
        font-size: 16px;
        color: #000;
        font-weight: 600;
        border-bottom: 1px solid #F0F0F0;
        padding-bottom: 10px;
      }
      .mainmain{
        padding: 30px 0;
        .section{
          margin-bottom: 30px;
          h3{
            font-size: 16px;
            color: #000;
            font-weight: 600;
            margin-bottom: 15px
          }
          .content{
            .text{
              line-height: 16px;
              font-size: 12px;
              p{
                margin-top: 20px;
                margin-top: 10px;
              }
            }
            .tabs{
              li{
                margin-bottom: 15px;
                h4{
                  font-size: 13px;
                  color: #111;
                  margin-bottom: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
    /deep/ .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }

    /deep/ .el-aside {
      color: #333;
      .el-menu{
        border: none;
        a{
          color: #333 !important;
          display: inline-block;
          height: 100%;
          width: 100%
        }
        .el-submenu__title{
          color: #000
        }
      }
    }
}
</style>
