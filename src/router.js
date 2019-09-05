// A方后台
const Merchants = () => import('./views/amodule/Merchants.vue')
const AIndex = () => import('./views/amodule/Index.vue')
const POSManagement = () => import('./views/amodule/POSManagement.vue')
const AddManagement = () => import('./views/amodule/AddManagement.vue')
const Earnings = () => import('./views/amodule/Earnings.vue')
const deal = () => import('./views/amodule/Deal.vue')
const dealData = () => import('./views/amodule/Deal_data.vue')
const dealDetail = () => import('./views/amodule/Deal_detail.vue')
const recMessages = () => import('./views/amodule/RecMessages.vue')
const information = () => import('./views/amodule/Information.vue')
const Ageneralize = () => import('./views/amodule/Generalize.vue')
const AHasAgents = () => import('./views/amodule/HasAgents.vue')
const AAgentsTeam = () => import('./views/amodule/AgentsTeam.vue')
const AInviteAgents = () => import('./views/amodule/InviteAgents.vue')

// B方后台
const BIndex = () => import('./views/bmodule/Index.vue')
const BTradingChart = () => import('./views/bmodule/TradingChart.vue')
const BUserChart = () => import('./views/bmodule/UserChart.vue')
const BEarnings = () => import('./views/bmodule/Earnings.vue')
const Bdeal = () => import('./views/bmodule/Deal.vue')
const Bdetail = () => import('./views/bmodule/DealDetail.vue')
const manage = () => import('./views/bmodule/Manage.vue')
const Binformation = () => import('./views/bmodule/Information.vue')
const BInforDtetail = () => import('./views/bmodule/InforDtetail.vue')
const generalize = () => import('./views/bmodule/Generalize.vue')
const HasAgents = () => import('./views/bmodule/HasAgents.vue')
const AgentsTeam = () => import('./views/bmodule/AgentsTeam.vue')
const InviteAgents = () => import('./views/bmodule/InviteAgents.vue')

// PC官网
const Amobile = () => import('./views/pcmodule/amobile.vue')
const Bmobile2 = () => import('./views/pcmodule/bmobile2.vue')
const Bmobile = () => import('./views/pcmodule/bmobile.vue')
const Areg = () => import('./views/pcmodule/areg.vue')
const Breg = () => import('./views/pcmodule/breg.vue')
const Downapp = () => import('./views/pcmodule/Downapp.vue')
const Register = () => import('./views/pcmodule/tabitem/register.vue')
const Bond = () => import('./views/pcmodule/tabitem/bond.vue')
const ItemFirst = () => import('./views/pcmodule/tabitem/itemFirst.vue')
const ItemSecond = () => import('./views/pcmodule/tabitem/itemSecond.vue')
const ItemThird = () => import('./views/pcmodule/tabitem/itemThird.vue')
const VideoPages = () => import('./views/pcmodule/tabitem/videoPages.vue')
//登录页
const login = () => import('./views/pcmodule/tabitem/login.vue')
// const Vue = require('vue')
// const Router = require('vue-router')
// const Router = new VueRouter({ routes })
// Vue.use(Router)

const routes =  [
  { path: '/', redirect: '/itemFirst' },
  { path: '/login', name: 'login', component: login },
  {
    path: '/aindex',
    name: 'aindex',
    component: AIndex,
    children: [
      { path: '/a_pos_management', name: 'POSManagement', component: POSManagement },
      { path: '/a_add_management', name: 'AddManagement', component: AddManagement },
      { path: '/a_merchants', name: 'merchants', component: Merchants },
      { path: '/a_earnings', name: 'earnings', component: Earnings},
      { path: '/a_deal', name: 'deal', component: deal},
      { path: '/a_deal_data', name: 'dealData', component: dealData},
      { path: '/a_deal_detail', name: 'dealDetail', component: dealDetail},
      { path: '/a_rec_messages', name: 'recMessages', component: recMessages},
      { path: '/a_information', name: 'information', component: information},
      { path: '/a_generalize', name: 'Ageneralize', component: Ageneralize},
      { path: '/a_has_agents', name: 'AHasAgents', component: AHasAgents},
      { path: '/a_agents_team', name: 'AAgentsTeam', component: AAgentsTeam},
      { path: '/a_invite_agents', name: 'AInviteAgents', component: AInviteAgents}
    ]
  },
  {
    path: '/bindex',
    name: 'bindex',
    component: BIndex,
    children: [
      { path: '/b_earnings', name: 'BEarnings', component: BEarnings },
      { path: '/b_tradingchart', name: 'BTradingChart', component: BTradingChart },
      { path: '/b_userchart', name: 'BUserChart', component: BUserChart },
      { path: '/b_deal', name: 'Bdeal', component: Bdeal},
      { path: '/b_detail', name: 'detail', component: Bdetail},
      { path: '/b_manage', name: 'manage', component: manage},
      { path: '/b_information', name: 'Binformation', component: Binformation},
      { path: '/b_inforDtetail', name: 'InforDtetail', component: BInforDtetail},
      { path: '/b_generalize', name: 'generalize', component: generalize},
      { path: '/b_has_agents', name: 'HasAgents', component: HasAgents},
      { path: '/b_agents_team', name: 'AgentsTeam', component: AgentsTeam},
      { path: '/b_invite_agents', name: 'InviteAgents', component: InviteAgents}
    ]
  },

  {
    path: '/amobile',
    name: 'amobile',
    component: Amobile
  },
  {
    path: '/bmobile',
    name: 'bmobile',
    component: Bmobile
  },
  {
    path: '/bmobile2',
    name: 'bmobile2',
    component: Bmobile2
  },
  {
    path: '/areg',
    name: 'areg',
    component: Areg
  },
  {
    path: '/breg',
    name: 'breg',
    component: Breg
  },
  {
    path: '/downapp',
    name: 'downapp',
    component: Downapp
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      index: 1
    },
  },
  {
    path: '/bond',
    name: 'Bond',
    component: Bond,
    meta: {
      index: 0
    },
  },
  {
    path: '/itemThird',
    name: 'ItemThird',
    component: ItemThird,
    meta: {
      index: 0
    },
  },
  {
    path: '/itemSecond',
    name: 'ItemSecond',
    component: ItemSecond,
    meta: {
      index: 0
    },
  },
  {
    path: '/itemFirst',
    name: 'ItemFirst',
    component: ItemFirst,
    meta: {
      index: 0
    },
  },
  {
    path:'/VideoPages',
    name:'VideoPages',
    component:VideoPages
  }
]

export default new VueRouter({
  routes
})
