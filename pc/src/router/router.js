
// 1. 定义 (路由) 组件。
const Login = () => import(/* webpackChunkName: "login" */ '../page/admin/login.vue');

// 2. 定义路由
const routes = [
  { path: '/', redirect: "/login", }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
})

// 权限控制
router.beforeEach((to, from, next) => {
  if(to.meta.requireLogin) {
    if(sessionStorage.getItem('isLogin')) {
      next()
    }else {
      next({ path: '/login' })
    }
  } else {
    next()
    
  }
})

export default router