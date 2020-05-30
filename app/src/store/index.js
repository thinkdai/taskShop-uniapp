import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import setting from './modules/setting';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        user,
        setting
    },
    getters
});

export default store;
