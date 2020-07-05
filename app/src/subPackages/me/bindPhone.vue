<template>
    <view class="bind-phone_wrapper">
        <view class="title fz-22">验证手机号</view>
        <view class="tip fz-13">为了保障账号安全，需要绑定手机号</view>
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
            <view class="form_item flex_layout_b">
                <text class="label fz-16">验证码</text>
                <input v-model="form.code" 
                       type="number"
                       placeholder-class="input_placeholder-class"
                       class="item_input fz-16 code_input" 
                       placeholder="请输入验证码" />
                <view v-if="sendCoding == 1" class="code-btn fz-14" @tap="getCode">获取验证码</view>
                <view v-else-if="sendCoding == 2" class="timer fz-14">剩余{{ time }}S</view>
                <view v-else class="code-btn fz-14" @tap="getCode">重新获取</view>
            </view>
            <view class="error-tip fz-10">{{ codeError ? '验证码输入错误' : '' }}</view>
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
        <view class="submit-btn fz-16" @tap="submit">确定</view>
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
                    code: '',
                    password: ''
                },
                pageSource:'me',
                phoneError: false, // 手机号出错
                codeError: false, // 验证码出错
                passwordError: false, // 请输入密码
                sendCoding: 1, // 发送验证码
                time: 60 // 倒计时
            };
        },
        beforeDestroy() {
            // 清楚定时器
            timeID && clearInterval(timeID);
        },
        onLoad(options) {
            options.pageSource && (this.pageSource = options.pageSource);
        },
        methods: {
            // 获取验证码
            async getCode() {
                if (!this.form.phone || this.phoneError) {
                    !this.phoneError && utils.tip.alert('请输入手机号码');
                    return;
                }
        
                const res = await api.user.getCode(this.form.phone);
                utils.tip.success('发送成功');
                this.sendCoding = 2;
                // 倒计时开始
                timeID = setInterval(() => {
                    this.time--;
                    // 倒计时结束
                    if (this.time === 0) {
                        // 重新获取
                        this.sendCoding = 3;
                        // clearInterval没有返回值
                        clearInterval(timeID);
                        timeID = null;
                    }
                }, 1000);
            },
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
                const validCondition = this.phoneError || this.passwordError || !this.form.phone || !this.form.code || !this.form.password;
                if (validCondition) {
                    return;
                }
                const res = await api.user.bindPhone(this.form);
                console.log(res);
                // const { data } = res;
                // this.$store.dispatch('setToken', data.token);
                // if (data.userInfo.uid) {
                //     // 存入vuex
                //     this.$store.dispatch('setUserInfo', data.userInfo);
                //     this.$store.dispatch('setLoginFlag', true);
                // } else {
                //     this.$store.dispatch('setLoginFlag', false);
                // }
                // 返回
                if(this.pageSource === 'me') {
                    uni.switchTab({
                        url: '/pages/me/index'
                    });  
                }else {
                    // 返回操作页面
                    uni.navigateBack({delta:2});
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
.bind-phone_wrapper {
    padding: 50rpx 24rpx 0;
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
    width: 480rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    background:rgba(20,120,255,1);
    border-radius: 44rpx;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color:rgba(255,255,255,1);
    margin: 120rpx auto;
}
.input_placeholder-class {
    color:rgba(0,0,0,1);
}
</style>
