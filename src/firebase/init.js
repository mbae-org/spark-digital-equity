import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD81XNJU3-KMJRYAf6dWYh52fa9Kj0tl6s",
    authDomain: "digital-equity.firebaseapp.com",
    databaseURL: "https://digital-equity.firebaseio.com",
    projectId: "digital-equity",
    storageBucket: "digital-equity.appspot.com",
    messagingSenderId: "238115094024",
    appId: "1:238115094024:web:9c6428a9a76100c3665bbd",
    measurementId: "G-DGGN8JRX1P"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const functions = firebase.functions();
const db = firebase.firestore();

export default app;
export { auth, functions, db };