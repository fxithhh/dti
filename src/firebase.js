import { initializeApp } from "../node_modules/firebase/app";
import { getDatabase } from "../node_modules/firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAWSjteiKG_jzPN260prrf_K2KlKpXfi6o",
  authDomain: "sutdctdstuff.firebaseapp.com",
  databaseURL:
    "https://sutdctdstuff-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sutdctdstuff",
  storageBucket: "sutdctdstuff.appspot.com",
  messagingSenderId: "872392546192",
  appId: "1:872392546192:web:d33f81281bff8df7000515",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)