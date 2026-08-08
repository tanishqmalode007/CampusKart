import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf2F-YYWMDsQ3brMaazfuq2P2rYN419Zc",
  authDomain: "campuskart-919e4.firebaseapp.com",
  projectId: "campuskart-919e4",
  storageBucket: "campuskart-919e4.firebasestorage.app",
  messagingSenderId: "401992712077",
  appId: "1:401992712077:web:e9312290d66fc3689a47c4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence);

export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});