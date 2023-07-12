import handler from '../service/service';

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
        console.error(err);
      }
    },
    async addList({ commit }, data) {
      try {
        await handler.addList(data);
        const response = await handler.getLists();
        commit('lists', response);
      } catch (err) {
        console.error(err);
      }
    },
    async removeList({ commit }, id) {
      try {
        await handler.removeList(id);
        const response = await handler.getLists();
        commit('lists', response);
      } catch (err) {
        console.error(err);
      }
    },
  },
  mutations: {
    lists(state, lists) {
      state.lists = lists;
    },
  },
};
