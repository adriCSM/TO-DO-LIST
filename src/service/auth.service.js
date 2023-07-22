import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import db from '../firebase/config';
import { ref, update } from 'firebase/database';

const auth = getAuth();

export default {
  async login() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem('accessToken', JSON.stringify(user.stsTokenManager.accessToken));

    return user;
  },

  async logout(id) {
    localStorage.removeItem('accessToken');
    await update(ref(db, 'users/' + id), {
      isLogin: false,
    });
  },
  async updateLogin(id) {
    await update(ref(db, 'users/' + id), {
      isLogin: true,
    });
  },
};
