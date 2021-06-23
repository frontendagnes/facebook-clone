import firebase from 'firebase'
// import firebase from "firebase/app";
import 'firebase/database'; 
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDEpsZ3IRsHf0zBrV0TWVqAvZNneNItq8M",
    authDomain: "facebook-clone-74351.firebaseapp.com",
    projectId: "facebook-clone-74351",
    storageBucket: "facebook-clone-74351.appspot.com",
    messagingSenderId: "922292235845",
    appId: "1:922292235845:web:3b42166e7f64d7b2f2bd2c"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db