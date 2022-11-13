
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBNALSw2asjSXgClnd7ZDfFiuO-hyW89-M",
  authDomain: "urlfire-d19bc.firebaseapp.com",
  databaseURL: "https://urlfire-d19bc-default-rtdb.firebaseio.com",
  projectId: "urlfire-d19bc",
  storageBucket: "urlfire-d19bc.appspot.com",
  messagingSenderId: "200682717212",
  appId: "1:200682717212:web:122ca61ca8f97a35d15fd9"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
export const db = getFirestore(App) 