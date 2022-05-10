import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  addDoc,
  increment,
  updateDoc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APPMESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);
const storage = getStorage(firebaseApp);

export {
  auth,
  provider,
  storage,
  getFirestore,
  onSnapshot,
  collection,
  doc,
  orderBy,
  query,
  setDoc,
  addDoc,
  increment,
  updateDoc,
  deleteDoc,
  getDocs,
  signInWithPopup,
  serverTimestamp,
  onAuthStateChanged,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  signOut,
};
export default db;
