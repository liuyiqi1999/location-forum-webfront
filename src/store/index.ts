import { createStore } from 'vuex';

export default createStore({
  state: {
    // 这种写法有问题，如果sessionStorage.getItem(`userInfo`)==''时，无法解析成json，会报错
    // userInfo: JSON.parse(sessionStorage.getItem(`userInfo`) as string) || {},
    userInfo: JSON.parse(
      (sessionStorage.getItem(`userInfo`) as string) == ''
        ? '{}'
        : (sessionStorage.getItem(`userInfo`) as string)
    ),
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
      return state.userInfo?.username ?? '';
    },
    getUserId(state) {
      return state.userInfo?.id ?? '';
    },
    getUserRole(state) {
      return state.userInfo?.role ?? '';
    },
    getUserInfo(state) {
      return state.userInfo;
    },
  },
});
