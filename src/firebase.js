// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXyoHcCQnPCq1vWXSFhPIAyCjfCmb9lqM",
  authDomain: "whatsapp-clone-df822.firebaseapp.com",
  projectId: "whatsapp-clone-df822",
  storageBucket: "whatsapp-clone-df822.appspot.com",
  messagingSenderId: "308114274795",
  appId: "1:308114274795:web:1a8f4d0ec16c077e8141ae",
  measurementId: "G-4LY8040PBP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
