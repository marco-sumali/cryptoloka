import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA_zd7zGPZglBGa8hAl9XLuyNiGkCRpcW8",
  authDomain: "cryptoloka-app.firebaseapp.com",
  databaseURL: "https://cryptoloka-app.firebaseio.com",
  projectId: "cryptoloka-app",
  storageBucket: "cryptoloka-app.appspot.com",
  messagingSenderId: "991099704424",
  appId: "1:991099704424:web:1747e2cec9b6a0490317dd",
  measurementId: "G-65E21NRQHS"
};

firebase.initializeApp(config);
firebase.storage();

export default firebase;
