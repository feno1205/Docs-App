import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC6rL11pfqUnhPoa36vXFfCQFUGVUKQjko",
    authDomain: "doc-app-ef9a1.firebaseapp.com",
    projectId: "doc-app-ef9a1",
    storageBucket: "doc-app-ef9a1.appspot.com",
    messagingSenderId: "1015500524214",
    appId: "1:1015500524214:web:5861d81ce75960ef13f417",
    measurementId: "G-6VEGFNRJM9"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getFirestore(app)