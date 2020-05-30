const getters = {
    // ---配置相关----
    platForm: state => state.setting.platForm,
    host: state => state.setting.host,
    webviewHost: state => state.setting.webviewHost,
    apiSecretKey: state => state.setting.apiSecretKey,
    // ---用户相关----
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    code: state => state.user.code,
    hasLogin: state => state.user.hasLogin
};

export default getters;
