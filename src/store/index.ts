import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: {
      username: '',
      id: 0,
    },
  },
  mutations: {
    // 进行数据更新，改变数据状态
    updateUser(state, action) {
      state.userInfo.username = action.username;
      state.userInfo.id = action.id;
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
  },
});
