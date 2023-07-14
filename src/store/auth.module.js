import authService from '@/service/auth.service';
import { hadlerError } from '@/service/errorHandler.service';

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
        await hadlerError.errorHandler(error);
      }
    },
    async loginGithub({ commit }) {
      try {
        const response = await authService.loginGithub();
        commit('user', response);
      } catch (error) {
        await hadlerError.errorHandler(error);
      }
    },
    async logout({ commit }, id) {
      try {
        await authService.logout(id);
        commit;
      } catch (error) {
        await hadlerError.errorHandler(error);
      }
    },
    async updateLogin({ commit }, id) {
      try {
        await authService.updateLogin(id);
        commit;
      } catch (error) {
        await hadlerError.errorHandler(error);
      }
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
  },
};
