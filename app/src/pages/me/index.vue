<template>
    <view class="me_wrapper">
        <view class="me-header">
            <view class="user-info flex_layout">
                <image src="/static/image/me/user.png" class="avatar"></image>
                <view class="personal_wrap">
                    <block v-if="hasLogin">
                        <view class="name_wrap"></view>
                    </block>
                    <view v-else class="name_wrap fz-20" @tap="login">hi! 请登录~</view>
                </view>
            </view>
        </view>
        <!-- 我的任务分类 -->
        <view class="my-task-list">

        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        computed: {
            hasLogin() {
                return this.$store.getters.hasLogin;
            }
        },
        methods: {
            login() {
                uni.navigateTo({
                    url: `/subPackages/me/bindPhone`
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
.me_wrapper {
    min-height: 100vh;
    background-color: #f7f7f7;
    .me-header {
        background: linear-gradient(90deg,#eb3c3c,#ff7459);
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        border-radius: 0 0 600rpx 600rpx/0 0 40rpx 40rpx;
        min-height: 220rpx;
        padding-top: 50rpx;
    }
    .user-info {
        padding: 0 0 20rpx 30rpx;
        .avatar {
            width: 120rpx;
            height: 120rpx;
            overflow: hidden;
            box-shadow: 0 4rpx 20rpx rgba(0,0,0,.15);
            border: 2rpx solid hsla(0,0%,100%,.4);
            border-radius: 120px;
        }
        .personal_wrap {
            flex: 1;
            padding: 0 0 0 30rpx;
            position: relative;
            .name_wrap {
                color: #fff;
            }
        }
    }
    .my-task-list {
        margin: 30rpx 0;
        height: 142rpx;
        line-height: 88rpx;
        background-color: #fff;
    }
}
</style>
