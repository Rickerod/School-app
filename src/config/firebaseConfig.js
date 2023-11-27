import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEIa6lzaVrIYnhhZmBGfwW1VbS1CbixvQ",
  authDomain: "storage-48955.firebaseapp.com",
  projectId: "storage-48955",
  storageBucket: "storage-48955.appspot.com",
  messagingSenderId: "862813715981",
  appId: "1:862813715981:web:4d3d33552038cd87131f44"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
