import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const auth = getAuth();

export default {
  async login() {
    const provider = new GoogleAuthProvider();
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  },
};
