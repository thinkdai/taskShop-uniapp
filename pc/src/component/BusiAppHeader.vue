<template>
    <div class="app-header__wrapper">
        <span>{{ $route.meta.title }}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
        }    
    };
</script>

<style lang="scss" scoped>
.app-header__wrapper {
    font-family: MicrosoftYaHei-Bold;
    margin-bottom: 40px;
    // border-radius: 10px;
    color: #1d1e28;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.08);
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    background-color: #fff;
    border-radius: 5px;
    span {
      font-weight: 600;
      font-size: 18px;
    } 
}
</style>
