<template>
    <section>
        <!-- 头部 -->
        <BusiHeaderLayout v-if="$route.meta.requireLogin" />
        <section class="app-wrapper flex_layout">
            <!-- 登录页面不需要侧边栏以及底部 -->
            <BusiLeftLayout v-if="$route.meta.requireLogin" />
            <section 
                class="app-container" 
                :class="{
                    'login-page': !$route.meta.requireLogin
                }">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </section>
        </section>
        <BusiBottom v-if="$route.meta.requireLogin" />
    </section>
</template>
<script>
    import BusiBottom from './component/BusiBottom.vue';
    import BusiLeftLayout from './component/BusiLeftLayout.vue';
    import BusiHeaderLayout from './component/BusiHeaderLayout.vue';

    export default {
        components: {
            BusiBottom,
            BusiLeftLayout,
            BusiHeaderLayout
        },
        data() {
            return {
            };
        }
    };
</script>
<style lang="scss">
    //引入公共文件
    @import "./style/common.scss";
    .app-wrapper {
        width: 100vw;
        min-height: calc(100vh - 50px);
        .app-container {
            flex: 1;
            padding: 24px;
            min-height: calc(100vh - 50px);
            background-color: rgb(242, 242, 242);
            box-sizing: border-box;
        }
        .login-page {
            background-color: #fff;
            padding: 0px;
        }
    }
</style>