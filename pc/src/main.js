import Vue from 'vue';
import App from './app.vue';
//导入自己的插件
import "./global.js";
//引入element-ui的样式
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
//引入路由
import router from "./router/router.js";
// 引入 vuex
import store from './store';

// Vue.use(ElementUI);

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');