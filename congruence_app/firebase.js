import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB1vb6s177nAl9623ALNNzYU8t9pfv8mSE",
  authDomain: "congruence-2.firebaseapp.com",
  projectId: "congruence-2",
  storageBucket: "congruence-2.appspot.com",
  messagingSenderId: "1084659542228",
  appId: "1:1084659542228:web:cb0de74606a57e821ef341"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
  auth,
  db
}