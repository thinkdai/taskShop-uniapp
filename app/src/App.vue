 <script>
    import utils from '@/utils';
    import api from '@api/api';
    import { mapActions } from 'vuex';

    export default {
        async onLaunch() {
            const _self = this;
            // 调用登录接口
            utils.util.wxLogin().then(async (code) => {
                const { data } = await api.user.getUserInfo(code);
                // this.setToken(data.token);
                if (data.unionId) {
                    // 存入vuex
                    this.setUserInfo(data);
                    this.setLoginFlag(true);
                } else {
                    this.setLoginFlag(false);
                }
            }).catch(err => {
                console.error(err);
            });

            // 获取用户手机平台
            wx.getSystemInfo({
                success(res) {
                    _self.setPhonePlatform(res.platform.toLowerCase());
                    _self.setStatusBarHeight(res.statusBarHeight);
                }
            });
        },
        onShow() {
        },
        onHide() {
        },
        methods: {
            ...mapActions({
                setUserInfo: 'setUserInfo',
                setToken: 'setToken',
                setLoginFlag: 'setLoginFlag',
                setCode:'setCode',
                setPhonePlatform: 'setPhonePlatform',
                setStatusBarHeight: 'setStatusBarHeight'
            })
        }
    };
</script>

<style lang="scss">
    // @font-face {
    //     font-family:'BarlowCondensed-SemiBold';
    //     src:url("https://imgcdn.huanjutang.com/assets/img/202058913338081.ttf");
    // }
    // 页面公共样式
    @import './static/styles/common.scss';
    // .semiBold{
    //     font-family:"BarlowCondensed-SemiBold" !important;
    // }
</style>
