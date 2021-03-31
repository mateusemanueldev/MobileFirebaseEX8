import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyD6Hbef5YDT4ZmjrWb1vHOfeI72LxR0eN8",
    authDomain: "rn-firebase-1c355.firebaseapp.com",
    projectId: "rn-firebase-1c355",
    storageBucket: "rn-firebase-1c355.appspot.com",
    messagingSenderId: "329810706875",
    appId: "1:329810706875:web:ad1e167a70e2d5e9b8849e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
      firebase,
      db

  }