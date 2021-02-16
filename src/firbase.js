import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOgK6heZSXzqcx5t2UCeA9z3ZoidO-CGw",
  authDomain: "clone-2f5b1.firebaseapp.com",
  projectId: "clone-2f5b1",
  storageBucket: "clone-2f5b1.appspot.com",
  messagingSenderId: "55629456967",
  appId: "1:55629456967:web:c2b1be4519cc1d1d85b362",
  measurementId: "G-4WNSBNW48X"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
