// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaLu3BZwaFc-7slx564Xlj56IQRwff5GY",
  authDomain: "system-3t.firebaseapp.com",
  projectId: "system-3t",
  storageBucket: "system-3t.firebasestorage.app",
  messagingSenderId: "806591867416",
  appId: "1:806591867416:web:e1196f4852f71fc102716d",
  measurementId: "G-BB9LGRBWCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);