
const state = {
    username: '',
    hasLogin: false
};

const mutations = {
    SET_NAME(state, data) {
        state.username = data;
    },
    SET_LOGIN_FLAG(state, data) {
        state.hasLogin = data;
    }
};

const actions = {
    // setUserInfo({ commit }, data) {
    //     commit('SET_USERINFO', data);
    // },
};

export default {
    namespace: true,
    state,
    mutations,
    actions
};
