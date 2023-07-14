import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyA8_-1q9GBGXWY05qk6hO4001Riu0edym8',
  authDomain: 'belajar-api-343903.firebaseapp.com',
  databaseURL: 'https://belajar-api-343903-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'belajar-api-343903',
  storageBucket: 'belajar-api-343903.appspot.com',
  messagingSenderId: '1083919434495',
  appId: '1:1083919434495:web:b20baca0cf4e99ead202ca',
  measurementId: 'G-X1HPJMDLQK',
};

const app = firebase.initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
