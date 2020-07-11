<template>
    <view class="me_wrapper">
        <view class="me-header">
            <view class="user-info flex_layout">
                <image src="/static/image/me/user.png" class="avatar"></image>
                <view class="personal_wrap">
                    <block v-if="hasLogin">
                        <view class="name_wrap">{{ userInfo.nickName }}</view>
                    </block>
                    <view v-else class="name_wrap fz-20" @tap="login">hi! 请登录~</view>
                </view>
            </view>
            <view v-if="hasLogin" class="setting-wrap flex_layout">
                <text class="iconfont icon-icon-test15 fz-12"></text>
                <text class="setting mar-left-8 fz-12">账户设置</text>
            </view>
        </view>
        <!-- 我的任务分类 -->
        <view class="my-task-list">
            <view class="grid">
                <view class="fz-16 num">122</view>
                <view class="fz-12 txt">全部订单</view>
            </view>
            <view class="grid"></view>
            <view class="grid"></view>
            <view class="grid"></view>
            <view class="grid"></view>
            <view class="grid"></view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {}
            };
        },
        computed: {
            hasLogin() {
                return this.$store.getters.hasLogin;
            }
        },
        onLoad() {
            this.loadUserData();
        },
        methods: {
            async loadUserData() {
                try {
                    const res = await this.$store.dispatch('userInfo');
                    this.userInfo = res;
                } catch(e) {
                    console.error('登录失败');
                }
            },
            login() {
                uni.navigateTo({
                    url: `/subPackages/me/login`
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
        .setting-wrap {
            position: absolute;
            top: 0;
            right: 30rpx;
            height: 80rpx;
            line-height: 80rpx;
            color: rgba(76,0,0,1);
        }
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
        height: 288rpx;
        line-height: 88rpx;
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        .grid {
            text-align: center;
            box-sizing: border-box;
            float: left;
            width: 25%;
            position: relative;
            position: relative;
            flex: 1;
            height: 144rpx;
            text-align: center;
            padding: 17px 0 10px;
            .num {
                font-weight: 700;
                color: #333;
                height: 32rpx;
                line-height: 32rpx;
            }
            .txt {
                color: #666;
                line-height: 68rpx;
                display: block;
            }
        }
    }
}
</style>
