// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxOTiyVrkqvHQI4ZMn-UgRiLwF37P3jkA",
  authDomain: "fir-cart-fff32.firebaseapp.com",
  projectId: "fir-cart-fff32",
  storageBucket: "fir-cart-fff32.appspot.com",
  messagingSenderId: "311060249706",
  appId: "1:311060249706:web:3e5d86d8352eae9d4e5e13",
  measurementId: "G-F16FKM48QH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()