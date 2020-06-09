<template>
    <div class="app-wrapper">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    import { store } from "./store/store";

    export default {
        data() {
            return {
                isShow: true 
            };
        },
        computed: {
            showDialogComputed() {
                return JSON.parse(store.showDialog);
            }
        },
        watch: {
            $route(newVal) {
                this.isShow = newVal.meta.admin ? false : true;
            }
        }
    };
</script>
<style lang="scss">
    //引入公共文件
    @import "./style/common.scss";
    @import "./style/mixin.scss";
    .app-wrapper {
        overflow-x: hidden;
    }
</style>