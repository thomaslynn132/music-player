import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCTRBnQ3tuNDJH_zku3_0mw1Fzw0vxLKM",
  authDomain: "my-todo-app-8e31e.firebaseapp.com",
  projectId: "my-todo-app-8e31e",
  storageBucket: "my-todo-app-8e31e.appspot.com",
  messagingSenderId: "535521777281",
  appId: "1:535521777281:web:b5e3e77ee2a86cd23b1f80",
  measurementId: "G-B8VYYL789W",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
