import db from '../firebase/config';
import { ref, set, get, remove, update } from 'firebase/database';
import jwtDecode from 'jwt-decode';

export default {
  async addList(data) {
    const { user_id } = jwtDecode(JSON.parse(localStorage.getItem('accessToken')));
    const id = new Date().getTime();
    await set(ref(db, 'lists/' + id), {
      id,
      user_id,
      text: data.text,
      textDecoration: data.textDecoration,
      textShadow: data.textShadow,
      selesai: data.selesai,
    });
  },
  async getLists() {
    const { user_id } = jwtDecode(JSON.parse(localStorage.getItem('accessToken')));
    const snappshot = await get(ref(db, 'lists'));
    let data = [];
    snappshot.forEach((child) => {
      if (child.val().user_id == user_id) {
        data.push(child.val());
      }
    });
    return data;
  },
  async getList(id) {
    const snappshot = await get(ref(db, 'lists/' + id));
    return snappshot.val();
  },
  async updateList(id) {
    const response = await this.getList(id);
    const selesai = response.selesai;
    if (selesai) {
      await update(ref(db, 'lists/' + id), {
        selesai: false,
        textDecoration: '',
        textShadow: '0 0 1rem #0fe',
      });
    } else {
      await update(ref(db, 'lists/' + id), {
        selesai: true,
        textDecoration: 'text-decoration-line-through',
        textShadow: '0 0 1rem red',
      });
    }
  },
  async removeList(id) {
    await remove(ref(db, 'lists/' + id));
  },
};
