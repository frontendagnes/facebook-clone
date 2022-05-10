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

// const firebaseConfig = {
//   apiKey: "AIzaSyDEpsZ3IRsHf0zBrV0TWVqAvZNneNItq8M",
//   authDomain: "facebook-clone-74351.firebaseapp.com",
//   projectId: "facebook-clone-74351",
//   storageBucket: "facebook-clone-74351.appspot.com",
//   messagingSenderId: "922292235845",
//   appId: "1:922292235845:web:3b42166e7f64d7b2f2bd2c",
// };

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
