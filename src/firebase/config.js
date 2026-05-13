import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBf5pqmpoPEQKngpXRzJiyHjHhdTti9VCs",
  authDomain: "zenvy-web.firebaseapp.com",
  projectId: "zenvy-web",
  storageBucket: "zenvy-web.firebasestorage.app",
  messagingSenderId: "637202348545",
  appId: "1:637202348545:web:0b0427d0c313046dc41e00"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;