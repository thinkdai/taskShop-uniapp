import utils from '@/utils';
import api from '@api/api';
import store from '../../../store';

export const getToken = () => {
    return new Promise(async function(resolve, reject) {
        utils.util.wxLogin().then(async (code) => {
            const { data } = await api.user.getUserInfo(code);
            store.dispatch('setToken', data.token);
            if (data.userInfo.uid) {
                // 存入vuex
                store.dispatch('setUserInfo', data.userInfo);
                store.dispatch('setLoginFlag', true);
            } else {
                store.dispatch('setLoginFlag', false);
            }
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
};

export const getTokenSync = async (resovle) => {
    const code =  await utils.util.wxLogin();
    if(store.getters['token']) {
        resovle();
        return ;
    }
    const { data } = await api.user.getUserInfo(code);
    store.dispatch('setToken', data.token);
    if (data.userInfo.uid) {
        store.dispatch('setUserInfo', data.userInfo);
        store.dispatch('setLoginFlag', true);
    } else {
        store.dispatch('setLoginFlag', false);
    }
    resovle();
};