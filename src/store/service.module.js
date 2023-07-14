import handler from '../service/service';
import { hadlerError } from '@/service/errorHandler.service';

const initializeState = { lists: null };

export const service = {
  namespaced: true,
  state: initializeState,
  actions: {
    async getLists({ commit }) {
      try {
        const response = await handler.getLists();
        commit('lists', response);
      } catch (err) {
        await hadlerError.errorHandler(err);
      }
    },
    async addList({ commit }, data) {
      try {
        await handler.addList(data);
        const response = await handler.getLists();
        commit('lists', response);
      } catch (err) {
        await hadlerError.errorHandler(err);
      }
    },
    async updateList({ commit }, id) {
      try {
        await handler.updateList(id);
        const response = await handler.getLists();
        commit('lists', response);
      } catch (err) {
        await hadlerError.errorHandler(err);
      }
    },
    async removeList({ commit }, id) {
      try {
        await handler.removeList(id);
        const response = await handler.getLists();
        commit('lists', response);
      } catch (err) {
        await hadlerError.errorHandler(err);
      }
    },
  },
  mutations: {
    lists(state, lists) {
      state.lists = lists;
    },
  },
};
