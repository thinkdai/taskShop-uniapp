
import Vue from 'vue';
import VueRouter from 'vue-router';
import { getCookie } from '@until/cookie';

Vue.use(VueRouter);

// 1. 定义 (路由) 组件。
const Login = () => import(/* webpackChunkName: "login" */ '../page/login/login.vue');
const MoneyManage = () => import(/* webpackChunkName: "moneyManage" */ '../page/moneyManage/index.vue');
const ShopList = () => import(/* webpackChunkName: "ShopList" */ '../page/shop/index.vue');
const PulishTask = () => import(/* webpackChunkName: "pulishTask" */ '../page/pulishTask/index.vue');
const TaskManage = () => import(/* webpackChunkName: "taskManage" */ '../page/taskManage/index.vue');
const LogManage = () => import(/* webpackChunkName: "logManage" */ '../page/logManage/index.vue');

// 2. 定义路由
const routes = [
  { path: '/', redirect: "/shop" },
  { path: '/login', name: 'Login', component: Login, meta: { requireLogin: false, title: '登录' } },
  { path: '/shop', name: 'shop', component: ShopList, meta: { requireLogin: true, title: '商铺管理' } },
  { path: '/pulishTask', name: 'PulishTask', component: PulishTask, meta: { requireLogin: true, title: '发布管理' } },
  { path: '/taskManage', name: 'TaskManage', component: TaskManage, meta: { requireLogin: true, title: '任务管理' } },
  { path: '/moneyManage', name: 'MoneyManage', component: MoneyManage, meta: { requireLogin: true, title: '账户管理' } },
  { path: '/logManage', name: 'LogManage', component: LogManage, meta: { requireLogin: true, title: '日志管理' } }
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
});

// 权限控制
router.beforeEach((to, from, next) => {
  if(to.meta.requireLogin) {
    // 获取cookie中的token
    if(getCookie('token')) {
      next();
    }else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
});

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};


export default router;