export const environment = {
  firebase: {
    projectId: "simple-crm-system-9f5e8",
    appId: "1:988410038077:web:ae12fc4879f67f2ceba754",
    storageBucket: "simple-crm-system-9f5e8.appspot.com",
    apiKey: "AIzaSyDxJcs5hA7ww_7W2MWnRmGbs13n5sn1_fA",
    authDomain: "simple-crm-system-9f5e8.firebaseapp.com",
    messagingSenderId: "988410038077",
    measurementId: "G-J861YGKZ2C"
  }
};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxJcs5hA7ww_7W2MWnRmGbs13n5sn1_fA",
  authDomain: "simple-crm-system-9f5e8.firebaseapp.com",
  projectId: "simple-crm-system-9f5e8",
  storageBucket: "simple-crm-system-9f5e8.appspot.com",
  messagingSenderId: "988410038077",
  appId: "1:988410038077:web:ae12fc4879f67f2ceba754",
  measurementId: "G-J861YGKZ2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);