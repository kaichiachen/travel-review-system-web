import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import { getStore } from '../config/utils';

Vue.use(Vuex);

const state = {
  userInfo: null,
  login: false,
};

const getters = {
  login: () => {
    if (state.login === null || state.login === false) {
      return getStore('token');
    }
    return state.login;
  },
};

/* eslint arrow-body-style: ["error", "always"] */
/* eslint-env es6 */
export default new Vuex.Store({
  state,
  getters,
  mutations,
});
