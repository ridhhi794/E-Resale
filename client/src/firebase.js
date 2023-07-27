// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU62UxL-SuulR-z9drZK1T0EjKq8CtxPc",
  authDomain: "eresale-a85c0.firebaseapp.com",
  projectId: "eresale-a85c0",
  storageBucket: "eresale-a85c0.appspot.com",
  messagingSenderId: "514200698014",
  appId: "1:514200698014:web:256f635298d7b9d8f60f8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
