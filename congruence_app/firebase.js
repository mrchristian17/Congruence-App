import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBF_FyOVqCO98gsukpt2fWzD_NWTq3I-eU",
    authDomain: "congruenceapp-f5a18.firebaseapp.com",
    projectId: "congruenceapp-f5a18",
    storageBucket: "congruenceapp-f5a18.appspot.com",
    messagingSenderId: "457365070253",
    appId: "1:457365070253:web:d557dac4dc4be88d01c124"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}