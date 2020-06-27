
import { storage } from '@until/storage';
import { getCookie } from '@until/cookie';
import api from "@API/index";

const state = {
    username: storage.get('userInfo') ? JSON.parse(storage.get('userInfo')).username : '',
    hasLogin: getCookie('token'),
    userInfo: null
};

const mutations = {
    SET_NAME(state, data) {
        state.username = data;
    },
    SET_LOGIN_FLAG(state, data) {
        state.hasLogin = data;
    },
    SET_USERINFO(state, data) {
        state.userInfo = data;
    } 
};

const actions = {
    getInfo({ commit }) {
        // 获取用户信息
        return new Promise((resolve, reject) => {
            api.user.userInfoAPI().then(data => {
                if (data.code == 200) {
                    commit('SET_USERINFO', data.data);
                    commit('SET_NAME', data.data.username);
                    resolve(data.data);
                } else {
                    reject(data);
                }
            });
        });
    }
};

export default {
    namespace: true,
    state,
    mutations,
    actions
};
