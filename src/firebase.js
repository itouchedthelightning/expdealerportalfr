import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALhB-Xu6DcwRPp_rgULlu1Lqa9wyWw-P8",
  authDomain: "sign-in-650fd.firebaseapp.com",
  projectId: "sign-in-650fd",
  storageBucket: "sign-in-650fd.appspot.com",
  messagingSenderId: "818138748799",
  appId: "1:818138748799:web:16d8534aea6c2944152c4a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);