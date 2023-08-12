import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhZSmUZebEC1t3cpJc6RsD5cP8BXRbKKo",
  authDomain: "react-native-181ae.firebaseapp.com",
  projectId: "react-native-181ae",
  storageBucket: "react-native-181ae.appspot.com",
  messagingSenderId: "111184353557",
  appId: "1:111184353557:web:005ce5edda5e7208da311c",
  measurementId: "G-JJGHMFXFVC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default app;
