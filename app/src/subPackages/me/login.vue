<template>
    <view class="bind-phone_wrapper">
        <view class="title fz-22">请登录!</view>
        <view class="form">
            <view class="form_item flex_layout">
                <text class="label fz-16">手机号</text>
                <input v-model="form.phone" 
                       type="number"
                       class="item_input fz-16"
                       placeholder-class="input_placeholder-class"
                       placeholder="请输入手机号"
                       @blur="handlerblur" />
            </view>
            <view class="error-tip fz-10">{{ phoneError ? '手机号输入错误' : '' }}</view>
            <view class="form_item flex_layout">
                <text class="label fz-16">密码</text>
                <input v-model="form.password" 
                       type="password"
                       class="item_input fz-16"
                       placeholder-class="input_placeholder-class"
                       placeholder="请输入密码"
                       @blur="handlerPassblur" />
            </view>
            <view class="error-tip fz-10">{{ passwordError ? '请输入密码' : '' }}</view>
        </view>
        <view class="submit-btn fz-16" @tap="submit">登录</view>
        <view class="zhuce fz-16" @tap="jumpUrl">手机快速注册</view>
    </view>
</template>

<script>
    import utils from '@/utils';
    import api from '@api/api';

    let timeID = null;
    export default {
        data() {
            return {
                form: {
                    phone: '',
                    password: ''
                },
                phoneError: false, // 手机号出错
                passwordError: false, // 请输入密码
                pageSource: 'me'
            };
        },
        onLoad(options) {
            options.pageSource && (this.pageSource = options.pageSource);
        },
        methods: {
            // 失焦
            handlerblur() {
                // 是否是手机号码
                this.phoneError = !utils.util.vailPhone(this.form.phone);
            },
            handlerPassblur() {
                // 密码
                this.passwordError = !this.form.password;
            },
            // 确定
            async submit() {
                // 1. 电话号码正确 有值
                // 2. 验证码 有值
                const validCondition = this.phoneError || this.passwordError || !this.form.phone || !this.form.password;
                if (validCondition) {
                    return;
                }
                const res = await api.user.login(this.form);
                const { data } = res;

                if (data) {
                    // 存入vuex
                    this.$store.dispatch('setUserInfo', data);
                    this.$store.dispatch('setLoginFlag', true);
                } else {
                    this.$store.dispatch('setLoginFlag', false);
                }
                // 返回
                if(this.pageSource === 'me') {
                    uni.switchTab({
                        url: '/pages/me/index'
                    });  
                }else {
                    // 返回操作页面
                    uni.navigateBack({delta:2});
                }
            },
            // 跳转页面
            jumpUrl() {
                uni.redirectTo({
                    url: '/subPackages/me/bindPhone'
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
.bind-phone_wrapper {
    padding: 50rpx 30rpx 0;
    box-sizing: border-box;
    .title {
        height: 44rpx;
        font-family: PingFangSC-Medium,PingFang SC;
        font-weight: bold;
        color:rgba(0,0,0,1);
        line-height: 44rpx;
    }
    .tip {
        height: 26rpx;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight: 400;
        color:rgba(153,153,153,1);
        line-height: 26rpx;
        margin-top: 24rpx;
    }
    .form {
        margin-top: 140rpx;
    }
}
.form {
    .form_item {
        height: 104rpx;
        border-bottom: 2rpx solid rgba(51,51,51,0.05);
        .label {
            width: 100rpx;
            line-height: 104rpx;
            font-family: PingFangSC-Medium,PingFang SC;
            font-weight: bold;
            color:rgba(0,0,0,1);
        }
        .item_input {
            flex: 1;
            margin-left: 44rpx;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            color:rgba(0,0,0,1);
            line-height: 104rpx;
        }
        .code-btn {
            height: 28rpx;
            font-weight: 400;
            color:rgba(20,120,255,1);
            line-height: 28rpx;
            margin-right: 30rpx;
        }
        .timer {
            color: #999999;
            height:32px;
            line-height:32px;
        }
    }
    .error-tip {
        height: 32rpx;
        line-height: 32rpx;
        color: #EE3F4D;
        margin: 8rpx 0 4rpx;
    }
}
.submit-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background-image: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);
    border-radius: 44rpx;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color:rgba(255,255,255,1);
    margin: 20rpx auto;
}
.zhuce {
    text-align: right;
    color: rgba(0,0,0,.4);
}
.input_placeholder-class {
    color:rgba(0,0,0,1);
}
</style>
