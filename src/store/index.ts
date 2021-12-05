import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: JSON.parse(sessionStorage.getItem(`userInfo`) as string)||{},
  },
  mutations: {
    // 进行数据更新，改变数据状态
    updateUser(state, action) {
      sessionStorage.setItem(`userInfo`, JSON.stringify(action));
      state.userInfo = action;
    },
    clear(state) {
      sessionStorage.setItem(`userInfo`, '');
      state.userInfo = {};
      localStorage.setItem('token', '');
    },
  },
  actions: {},
  getters: {
    // 获取到最终的数据结果
    getUsername(state) {
      return state.userInfo.username;
    },
    getUserId(state) {
      return state.userInfo.id;
    },
    getUserRole(state) {
      return state.userInfo.role;
    },
  },
});
