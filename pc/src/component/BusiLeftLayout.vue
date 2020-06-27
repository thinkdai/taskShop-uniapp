<template>
    <section class="left-layout__wrapper">
        <el-row class="container">
            <el-col>
                <el-menu
                    :default-active="active"
                    class="el-menu-vertical-demo"
                    @select="handlerMenuSelect">
                    <template v-for="(item, index) in routeArr">  
                        <!-- 只有一级路由 -->
                        <el-menu-item :index="index" :key="index">
                            <div @click="jumpUrl(item)">
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{ item.meta.title }}</span>
                            </div>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </section>  
</template>

<script>
    import { storage } from '@until/storage';

    export default {
        data() {
            return {
                routeArr: [], // 数组对象
                active: 0 // 当前菜单
            };
        },
        created() {
            this.formatRouter();
            this.getCurrentMenu();
        },
        methods: {
            getCurrentMenu() {
                this.active = storage.get('menu') ? JSON.parse(storage.get('menu')) : 0;
            },
            // 格式化路由
            formatRouter() {
                this.routeArr = this.$router.options.routes.filter(_ => {
                    return _.meta && _.meta.requireLogin;
                });
            },
            // 跳转路由
            jumpUrl({ path }) {
                // 避免跳转到当前路由
                this.$router.push({ path });
            },
            // 菜单激活的回调
            handlerMenuSelect(val) {
                storage.set('menu', JSON.stringify(val));
            }
        }
    }
</script>

<style lang="scss" scoped>
.left-layout__wrapper, .container, .el-col, .el-menu {
    width: 160px;
    height: calc(100vh - 100px);
    position: fixed;
    top: 50px;
}
</style>

