<template>
    <div class="header__warpper flex_layout_b">
        <div class="left flex_layout">
            <h1 class="logo">
                <img src="../img/login/icon.png" /> 
            </h1>
            <h2 class="title fz-20 mar-left-30">任务系统后台管理系统</h2>
        </div>
        <div class="right nick-name mar-right-30">{{ userName }}</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
        computed: {
            userName() {
                return this.$store.getters.username
            }
        }
    };
</script>
<style lang="scss" scoped>
.header__warpper {
    position: sticky;
    z-index: 10000;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    // box-shadow: 0 0 5px #888;
    border-bottom: 1px solid #ebebeb;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: #7c7c7c;
    background-color: #fff;
    font-size: 12px;
    .logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .title {
        font-weight: bold;
        color: #000;
    }
    .nick-name {
        color: blue;
    }
}
</style>