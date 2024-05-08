export default [{
  path: '/post',
  component: () => import(/*webpackChunkName:'home'*/'@/views/article/Post.vue'),
  meta: {
    needLogin: true
  }
}]