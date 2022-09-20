import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6P9wTs-xtaNmPsIJHr-SFPxpNkt6zuHM",
  authDomain: "insta-clone-nextjs-a3400.firebaseapp.com",
  projectId: "insta-clone-nextjs-a3400",
  storageBucket: "insta-clone-nextjs-a3400.appspot.com",
  messagingSenderId: "227295274138",
  appId: "1:227295274138:web:1656a6970d5427f7eb2b23",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
