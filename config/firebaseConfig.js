import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDcHqMrpRBYihV-MhZnuoNOsjn8l7eYiCs',
  authDomain: 'handleliste-expo.firebaseapp.com',
  projectId: 'handleliste-expo',
  storageBucket: 'handleliste-expo.appspot.com',
  messagingSenderId: '13658377816',
  appId: '1:13658377816:web:9e3533907e82834b25042d',
  measurementId: 'G-KSDN0X37TE',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
