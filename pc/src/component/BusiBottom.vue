<template>
    <div class="bottom_wrapper">
        版权所有 © 孵化园工作室 2020 保留一切权利。
    </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        }
    };
</script>
<style lang="scss" scoped>
.bottom_wrapper {
    position: fixed;
    z-index: 10000;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #e2e2e2;
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    color: #7c7c7c;
    background-color: #f1f1f1;
    font-size: 12px;
}
</style>