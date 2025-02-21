// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjUVvwD8eIAdcz3OcGGOmjm8wRTaeH-pY",
    authDomain: "e-commerce-ca361.firebaseapp.com",
    projectId: "e-commerce-ca361",
    storageBucket: "e-commerce-ca361.firebasestorage.app",
    messagingSenderId:"270496483962",
    appId: "1:270496483962:web:ffac49a9d3e3a0b8ee49c3",
  measurementId: "G-RXX9BCEJF7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);