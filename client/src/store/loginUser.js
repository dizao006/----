import * as loginSer from "../service/loginService";
export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setIsloading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async login({ commit }, { loginId, password }) {
      commit("setIsloading", true);
      const resp = await loginSer.login(loginId, password);
      commit("setData", resp.data);
      commit("setIsloading", false);
    },
    loginOut() {
      commit("setData", null);
      loginSer.loginOut();
    },
    async whoAmi({ commit }) {
      commit("setIsloading", true);
      try {
        const resp = await loginSer.whoAmi();
        commit("setData", resp.data);
      } catch (error) {
        commit("setData", null);
      }

      commit("setIsloading", false);
    },
  },
};
