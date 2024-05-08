export default [{
  path: '/reg',
  component: () => import(/*webpackChunkName:'reg'*/'@/views/user/Reg.vue')
}, { //这个 * 会被处理到当前所有路由的最后面
  path: '/login',
  component: () => import(/*webpackChunkName:'login'*/'@/views/user/Login.vue')
}, { //这个 * 会被处理到当前所有路由的最后面
  path: '/forget',
  component: () => import(/*webpackChunkName:'forget'*/'@/views/user/Forget.vue')
}]