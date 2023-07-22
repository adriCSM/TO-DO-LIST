import db from '../firebase/config';
import { ref, set, remove, get, update } from 'firebase/database';

export default {
  async addUser(user) {
    set(ref(db, 'users/' + user.id), { ...user });
  },

  async getUsers() {
    let users = [];
    const response = await get(ref(db, 'users'));
    response.forEach((child) => {
      users.push(child.val());
    });
    return users;
  },
  async getUser(id) {
    const response = await get(ref(db, 'users/' + id));
    return response.val();
  },
  async updateUser(id, payload) {
    await update(ref(db, 'users/' + id), payload);
  },

  async deleteUser(id) {
    remove(ref(db, 'users/' + id));
  },
};
