import { setStore, removeStore } from '../config/utils';

const RECORD_USERINFO = 'RECORD_USERINFO';
const OUT_LOGIN = 'OUT_LOGIN';

export default {
  /* eslint no-param-reassign: ["error", { "props": false }] */
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('login', true);
    setStore('userInfo', info);
  },
  [OUT_LOGIN](state) {
    state.userInfo = null;
    state.login = false;
    removeStore('login');
    removeStore('userInfo');
  },
};
