// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQ-iY-5_XMMIQtW0bAltOXHh4DGJd-R08",
    authDomain: "kitap251-e64da.firebaseapp.com",
    projectId: "kitap251-e64da",
    storageBucket: "kitap251-e64da.firebasestorage.app",
    messagingSenderId: "1043595860033",
    appId: "1:1043595860033:web:3ce5e1b291986627274ec0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app); 
const auth = getAuth(app);

// Nuxt plugin olarak export edin
export default defineNuxtPlugin(() => {
  return {
    provide: {
      firebase: app,
      storage,
      db,
      auth
    }
  };
});


