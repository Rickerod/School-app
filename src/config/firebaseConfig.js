import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPBCylRK9rMDWlV2fO75sxn8rc60d84zo",
  authDomain: "storage2-44387.firebaseapp.com",
  projectId: "storage2-44387",
  storageBucket: "storage2-44387.appspot.com",
  messagingSenderId: "1004680644569",
  appId: "1:1004680644569:web:03708f821d4b68cf54bbc8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
