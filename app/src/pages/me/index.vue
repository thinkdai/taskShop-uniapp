<template>
    <view>
        我的
        <button @tap="loginHandler">获取登录信息的接口</button>
    </view>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    created() {
        
    },
    methods: {
        loginHandler() {
            uni.login({
                success (res) {
                    if (res.code) {
                        //发起网络请求
                        // wx.request({
                        //     url: 'https://test.com/onLogin',
                        //     data: {
                        //     code: res.code
                        //     }
                        // })
                        console.log(res.code)
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
