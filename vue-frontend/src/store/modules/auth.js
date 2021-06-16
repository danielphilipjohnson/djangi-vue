export default {
  state: {
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },

  mutations: {
    toggleAuth(state) {
      state.isAuthenticated = !state.isAuthenticated;
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },

    setToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = null;
    },
  },
  actions: {
    login({ commit }) {
      commit("toggleAuth");
    },

    signout({ commit }) {
      console.log("signing out");
      commit("removeToken");
      commit("toggleAuth");
    },
  },
  modules: {},
};
