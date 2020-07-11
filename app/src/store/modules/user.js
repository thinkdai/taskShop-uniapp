import api from '@/api/api';

const state = {
    userInfo: null,
    token: '',
    hasLogin: null,
    code: '',
    phonePlatform: '',
    statusBarHeight: 25
};

const mutations = {
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    SET_TOKEAN(state, token) {
        state.token = token;
    },
    SET_LOGIN_FLAG(state, hasLogin) {
        state.hasLogin = hasLogin;
    },
    SET_CODE(state, code) {
        state.code = code;
    },
    SET_PHONE_PLATFORM(state, platform) {
        state.phonePlatform = platform;
    },
    SET_STATUS_BAR_Height(state, statusBarHeight) {
        state.statusBarHeight = statusBarHeight;
    }
};

const actions = {
    userInfo({commit}) {
        return new Promise((resolve, reject) => {
            api.user.getUserInfo()
                .then(res => {
                    const { data } = res;
                    if (data && data.phone) {
                        commit('SET_USERINFO', data);
                        commit('SET_LOGIN_FLAG', true);
                        resolve(data);
                    } else {
                        commit('SET_USERINFO', {});
                        commit('SET_LOGIN_FLAG', false);
                        reject(res);
                    }
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    setUserInfo({ commit }, data) {
        commit('SET_USERINFO', data);
    },
    setToken({ commit }, data) {
        commit('SET_TOKEAN', data);
    },
    setLoginFlag({ commit }, data) {
        commit('SET_LOGIN_FLAG', data);
    },
    setCode({ commit }, data) {
        commit('SET_CODE', data);
    },
    setPhonePlatform({ commit }, data) {
        commit('SET_PHONE_PLATFORM', data);
    },
    setStatusBarHeight({ commit }, data) {
        commit('SET_STATUS_BAR_Height', data);
    }
};

export default {
    namespace: true,
    state,
    mutations,
    actions
};
