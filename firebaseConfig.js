import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG8u2v4MZ91w2yAaOH-0ibnuHU4ttmIKI",
  authDomain: "buildcom-38642.firebaseapp.com",
  projectId: "buildcom-38642",
  storageBucket: "buildcom-38642.appspot.com",
  messagingSenderId: "469371979354",
  appId: "1:469371979354:web:b8ba5761b543c846e0ba63",
  measurementId: "G-9Z26QPLK8R"
};

// Initialize Firebase
export const app1 = initializeApp(firebaseConfig);
export const database= getFirestore(app1);
export const auth = getAuth();
