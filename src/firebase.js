//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBCTRBnQ3tuNDJH_zku3_0mw1Fzw0vxLKM",
  authDomain: "my-todo-app-8e31e.firebaseapp.com",
  databaseURL:
    "https://my-todo-app-8e31e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-todo-app-8e31e",
  storageBucket: "my-todo-app-8e31e.appspot.com",
  messagingSenderId: "535521777281",
  appId: "1:535521777281:web:b5e3e77ee2a86cd23b1f80",
  measurementId: "G-B8VYYL789W",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {
  auth,
  db,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
};
