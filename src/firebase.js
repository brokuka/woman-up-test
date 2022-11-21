// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIIZR-jq9A9xCsM3Gbahd2u3G_pibEYkw",
  authDomain: "womanup-c18d9.firebaseapp.com",
  projectId: "womanup-c18d9",
  storageBucket: "womanup-c18d9.appspot.com",
  messagingSenderId: "788414375034",
  appId: "1 =788414375034 =web =6bcb066dd3e796151047c3",
  measurementId: "G-VCM2Y7QNNG",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
