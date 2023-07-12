import authService from '@/service/auth.service';

const initializeState = { user: null };
export const auth = {
  namespaced: true,
  state: initializeState,
  actions: {
    async login({ commit }) {
      try {
        const response = await authService.login();
        commit('user', response);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
  },
};
