import app from '../firebase/config';
import { getDatabase, ref, set, onValue, remove } from 'firebase/database';
const database = getDatabase(app);

export default {
  async addList(data) {
    try {
      const id = new Date().getTime();
      await set(ref(database, 'lists/' + id), {
        id,
        text: data.text,
        textDecoration: data.textDecoration,
        textShadow: data.textShadow,
        selesai: data.selesai,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  async getLists() {
    const lists = [];
    onValue(ref(database, 'lists'), (snappshot) => {
      snappshot.forEach((element) => {
        lists.push(element.val());
      });
    });
    return lists;
  },
  async removeList(id) {
    try {
      remove(ref(database, 'lists/' + id));
    } catch (err) {
      console.error(err);
    }
  },
};
