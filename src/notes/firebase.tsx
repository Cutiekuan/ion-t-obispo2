
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhyJw2QX425NwqVt6nhbzYEgJ_-pdavvA",
  authDomain: "it35-obispo.firebaseapp.com",
  projectId: "it35-obispo",
  storageBucket: "it35-obispo.appspot.com",
  messagingSenderId: "128547286178",
  appId: "1:128547286178:web:b24f51ba2388415ba2fbfb",
  measurementId: "G-HG1HXNFXNK"
};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// 
const db = getFirestore(firebaseApp);

export{db}
