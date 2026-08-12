// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-T_fvr6XzLmdVPxjh6gzpVK9rt3stQf8",
  authDomain: "vidtube-f8a64.firebaseapp.com",
  projectId: "vidtube-f8a64",
  storageBucket: "vidtube-f8a64.firebasestorage.app",
  messagingSenderId: "367999246168",
  appId: "1:367999246168:web:1813323fd849ee227f4f2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);