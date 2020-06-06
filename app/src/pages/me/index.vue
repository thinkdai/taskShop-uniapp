
<template>
    <view class="me-wrapper">
        <block v-if="hasLogin">
            <view class="icon-wrapper">
                <image class="img" :src="userInfo.avatar || iconDefaultSrc"></image>
                <text class="user-name fz-18">{{ userInfo.nickname }}</text>
            </view>
        </block>
        <block v-else>
            <button open-type="getUserInfo" @getuserinfo="getUserInfo">
                <view class="icon-wrapper">
                    <image class="img" :src="userInfo.avatar || iconDefaultSrc"></image>
                    <view class="no-login">
                        <text class="user-name no-login-name fz-18">点击登录</text>
                    </view>
                </view>
            </button>
        </block>
        <!-- <view class="me_content">
            <block v-if="hasLogin">
                <view class="me-item flex_layout_b" @tap="jumpUrl(1)">
                    <view class="left-wrap">
                        <image class="img-icon icon" src="https://imgcdn.huanjutang.com/image/2020/03/09/f1a32db8d202f5e1f735e5a21cd5cafa.png"></image>
                        <text class="tit fz-15">我的收藏</text>
                    </view>
                    <text class="icon-more fz-12 iconfont iconxiangyou"></text>
                </view>
                <view class="me-item flex_layout_b" @tap="jumpUrl(3)">
                    <view class="left-wrap">
                        <image class="img-icon icon" src="https://imgcdn.huanjutang.com/image/2020/05/20/73064fd27147834fefcc0c1412aea430.png"></image>
                        <text class="tit fz-15">我的订阅</text>
                    </view>
                    <text class="icon-more fz-12 iconfont iconxiangyou"></text>
                </view> -->
                <!-- 微信配置 -->
                <!-- <button open-type="contact">
                    <view class="me-item flex_layout_b">
                        <view class="left-wrap">
                            <image class="img-icon icon" src="https://imgcdn.huanjutang.com/image/2020/03/09/3329521937903df9475e37a7474f9555.png"></image>
                            <text class="tit fz-15">联系客服</text>
                        </view>
                        <text class="icon-more fz-12 iconfont iconxiangyou"></text>
                    </view>
                </button>
            </block>
            <block v-else>
                <button open-type="getUserInfo" @getuserinfo="getUserInfo">
                    <view class="me-item flex_layout_b">
                        <view class="left-wrap">
                            <image class="img-icon icon" src="https://imgcdn.huanjutang.com/image/2020/03/09/0dfd44c66560ddc569a6186860639b3c.png"></image>
                            <text class="tit fz-15">我的收藏</text>
                        </view>
                        <text class="icon-more fz-12 iconfont iconxiangyou"></text>
                    </view>
                </button>
                <button open-type="getUserInfo" @getuserinfo="getUserInfo">
                    <view class="me-item flex_layout_b">
                        <view class="left-wrap">
                            <image class="img-icon icon" src="https://imgcdn.huanjutang.com/image/2020/05/20/73064fd27147834fefcc0c1412aea430.png"></image>
                            <text class="tit fz-15">我的订阅</text>
                        </view>
                        <text class="icon-more fz-12 iconfont iconxiangyou"></text>
                    </view>
                </button>
                <button open-type="getUserInfo" @getuserinfo="getUserInfo">
                    <view class="me-item flex_layout_b">
                        <view class="left-wrap">
                            <image class="img-icon icon" src="https://imgcdn.huanjutang.com/image/2020/03/09/3329521937903df9475e37a7474f9555.png"></image>
                            <text class="tit fz-15">联系客服</text>
                        </view>
                        <text class="icon-more fz-12 iconfont iconxiangyou"></text>
                    </view>
                </button>
            </block>
            <view class="me-item flex_layout_b" @tap="jumpUrl(2)">
                <view class="left-wrap">
                    <image class="img-icon icon" src="https://imgcdn.huanjutang.com/image/2020/03/09/0dfd44c66560ddc569a6186860639b3c.png"></image>
                    <text class="tit fz-15">关于我们</text>
                </view>
                <text class="icon-more fz-12 iconfont iconxiangyou"></text>
            </view>
        </view> -->
        <button open-type="share" class="recommend flex_layout_c">
            <text class="fz-16">推荐学区宝给朋友</text>
            <text class="icon-more fz-12 iconfont iconxiangyou"></text>
        </button>
    </view>
</template>

<script>
    import util from '@util/lib/util';
    import api from '@api/api';
    import { mapActions } from 'vuex';
    import Share from '@/utils/lib/share';

    // 跳转页面编码
    const pageObj = {
        1: '/subPackages/me/pages/collect',
        2: '/subPackages/me/pages/aboutme',
        3: '/subPackages/me/pages/subscribe'
    };
    let codeStr = null;
    export default {
        data() {
            return {
                // 默认头像
                iconDefaultSrc: 'https://imgcdn.huanjutang.com/image/2020/02/28/3a75e8ea66b6217b6138596f8513c037.png'
            };
        },
        async onLoad(options) { 
        },
        computed: {
            // 获取登录信息
            hasLogin() {
                return this.$store.getters.hasLogin;
            },
            userInfo: {
                get() {
                    return this.$store.getters.userInfo;
                }
            }
        },
        onPullDownRefresh() {
            // 停止刷新
            uni.stopPullDownRefresh();
        },
        methods: {
            ...mapActions({
                setUserInfo: 'user/setUserInfo',
                setToken: 'user/setToken'
            }),
            // 获取用户信息
            async getUserInfo(ev) {
                const { errMsg, rawData } = ev.target;
                // 授权成功
                if (errMsg === 'getUserInfo:ok' && rawData) {
                    const { iv, encryptedData } = ev.target;
                    // 先使用code避免消费
                    codeStr = await util.wxLogin(); 
                    const params = {
                        iv,
                        encryptedData: encryptedData,
                        code: codeStr,
                        token: this.$store.getters.token
                    };
                    console.log(params);
                    // 更新微信信息
                    const res = await api.user.updateWxInfo(params);
                    const { token, userInfo } = res.data;
                    // this.setUserInfo(token);
                    this.setUserInfo(userInfo);
                    // uni.navigateTo({
                    //     url: '/subPackages/me/pages/authorize'
                    // });
                }
            },
            // 跳转页面
            jumpUrl(val) {
                uni.navigateTo({
                    url: pageObj[val]
                });
            }
        },
        // 页面分享
        onShareAppMessage() {
            return Share.share(`看学区查摇号，就上学区宝`, `pages/me/index`, 'https://imgcdn.huanjutang.com/image/2020/03/04/095514de9b765fedb274ae62eb801c67.png');
        }
    };
</script>

<style lang="scss" scoped>
button {
    background-color: unset;
    color: unset;
}

.icon-wrapper {
    width: 100vw;
    height: 228rpx;
    background:rgba(255,255,255,1);
    display: flex;
    .img {
        width: 144rpx;
        height: 144rpx;
        border-radius: 50%;
        border: 4rpx solid rgba(245,245,247,1);
        margin-top: 28rpx;
        margin-left: 24rpx;
        box-shadow: 0rpx 6rpx 20rpx 0rpx rgba(20,120,255,0.13);
    }
    .user-name {
        height: 50rpx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight: bold;
        color:rgba(46,49,53,1);
        line-height: 50rpx;
        margin-top: 76rpx;
        margin-left: 36rpx;
    }
    .no-login {
        margin-top: 64rpx;
        display: flex;
        flex-direction: column;
    }
    .no-login-name {
        margin-top: 0rpx;
    }
    .tip_desc {
        height: 34rpx;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color:rgba(153,153,153,1);
        line-height: 34rpx;
        margin-left: 36rpx;
        margin-top: 4rpx;
    }
}
.me_content {
    margin-top: 18rpx;
    .me-item {
        width: 100vw;
        height: 100rpx;
        line-height: 100rx;
        padding: 0 24rpx;
        box-sizing: border-box;
        // border-bottom: 2rpx solid rgba(51,51,51,0.05);
        .left-wrap {
            color: #000000;
            display: felx;
            align-items: center;
            line-height: 100rpx;
            .icon {
                margin-left: 18rpx;
                margin-right: 34rpx;
            }
            .img-icon {
                width: 38rpx;
                height: 38rpx;
                vertical-align: middle;
            }
            .tit {
                vertical-align: middle;
            }
        }
        .icon-more {
            color: #ccc;
            margin-right: 8rpx;
        }
    }
}
.recommend {
    width: 420rpx;
    height: 80rpx;
    background:rgba(255,114,38,0.1);
    border-radius: 45rpx;
    color: #FF7226;
    line-height: 80rpx;
    margin: 258rpx auto 0;
    .icon-more {
        margin-left: 10rpx;
    }
}
</style>