import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaBo-Hk7gutQqUIc_HEGABjycxBFj_BTs",
  authDomain: "vani-9d478.firebaseapp.com",
  projectId: "vani-9d478",
  storageBucket: "vani-9d478.appspot.com",
  messagingSenderId: "304474071514",
  appId: "1:304474071514:web:e144ff8b27c269d46ca0e3",
  measurementId: "G-H4JJP57JNE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
