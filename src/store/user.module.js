import userService from '@/service/user.service';

const initializeState = { users: null, user: null };

export const user = {
  namespaced: true,
  state: initializeState,
  actions: {
    async addUser({ commit }, user) {
      try {
        await userService.addUser(user);
        commit;
      } catch (error) {
        console.log(error.message);
      }
    },

    async getUser({ commit }, id) {
      try {
        const response = await userService.getUser(id);
        commit('user', response);
      } catch (error) {
        console.log(error.message);
      }
    },
    async getUsers({ commit }) {
      try {
        const response = await userService.getUsers();
        commit('users', response);
      } catch (error) {
        console.log(error.message);
      }
    },
    async updateUser({ commit }, { id, payload }) {
      try {
        await userService.updateUser(id, payload);
        commit;
      } catch (error) {
        console.log(error.message);
      }
    },
    async removeUser({ commit }, id) {
      try {
        await userService.deleteUser(id);
        const response = await userService.getUsers();
        commit('users', response);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
    users(state, users) {
      state.users = users;
    },
  },
};
