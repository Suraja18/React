
import { getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDkEInihjMUa2i4Nuo9OzbIX1igOb1k2-A",
  authDomain: "test-83d1a.firebaseapp.com",
  projectId: "test-83d1a",
  storageBucket: "test-83d1a.appspot.com",
  messagingSenderId: "181383158409",
  appId: "1:181383158409:web:3eaa238f0a8f7c1d754458",
  measurementId: "G-XQXEZ3EGCG",
  databaseURL: "https://test-83d1a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const firebaseApp = getApp();
const storage = getStorage(firebaseApp, "gs://test-83d1a.appspot.com");

export {app, auth, googleProvider, db, storage};