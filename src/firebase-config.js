import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA3Gjobv2f7Me4tbIWxdx8RFTkav1o_c60",
  authDomain: "clone-28378.firebaseapp.com",
  databaseURL:"https://clone-28378-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clone-28378",
  storageBucket: "clone-28378.appspot.com",
  messagingSenderId: "456654862866",
  appId: "1:456654862866:web:f614fcbfdcd8a917c336cb",
  measurementId: "G-1RF7L69NVN",
};

export const app = initializeApp(firebaseConfig);
