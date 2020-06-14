<template>
    <div 
        class="busi-blank-box__wrapper"
        :style="{
            height: height,
            width: width
        }"></div>
</template>

<script>
    export default {
        props: {
            width: {
                type: String,
                default: '0px'
            },
            height: {
                type: String,
                default: '0px'
            }
        }
    }
</script>

<style lang="scss" scoped>
.busi-blank-box__wrapper {

}
</style>
