// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlM3adT5wcR4xILRDiOjWOHViRo4XidRk",
  authDomain: "coder-react-f81ea.firebaseapp.com",
  projectId: "coder-react-f81ea",
  storageBucket: "coder-react-f81ea.firebasestorage.app",
  messagingSenderId: "274831705430",
  appId: "1:274831705430:web:7bb5e11a07f2744eac02f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);