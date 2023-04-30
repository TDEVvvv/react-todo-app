// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARQsv4LCarljdF_XfNLJ1DOO2jU0tIEQo",
  authDomain: "todo-react-24919.firebaseapp.com",
  projectId: "todo-react-24919",
  storageBucket: "todo-react-24919.appspot.com",
  messagingSenderId: "318044131834",
  appId: "1:318044131834:web:7b0bd1a0172a960ff61443",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
