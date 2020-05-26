<template>
    <view>
        我的
        <button
          size="defult"
          type="defult"
          form-type="submit"
          disabled="false"
          >
          获取登录信息的接口
        </button>
    </view>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    created() {
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
                    conosle.log(res.code)
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        });
    }
}
</script>

<style lang="scss" scoped>

</style>
