<template>
    <section class="left-layout__wrapper">
        <el-row class="container">
            <el-col>
                <el-menu
                    :default-active="0"
                    class="el-menu-vertical-demo">
                    <template v-for="(item, index) in routeArr">                
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
    // import  
    export default {
        data() {
            return {
                routeArr: [] // 数组对象
            };
        },
        created() {
            this.formatRouter();
        },
        methods: {
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
            }
        }
    }
</script>

<style lang="scss" scoped>
.left-layout__wrapper, .container, .el-col, .el-menu {
    width: 160px;
    min-height: calc(100vh - 50px);
    position: sticky;
    top: 0;
}
</style>

