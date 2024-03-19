import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCgsjBnUestlCHdF3k5_7kyFsiszdMMct0",
    authDomain: "myterm-project.firebaseapp.com",
    projectId: "myterm-project",
    storageBucket: "myterm-project.appspot.com",
    messagingSenderId: "804975930672",
    appId: "1:804975930672:web:374e3910e051ad2dd5acf5",
    measurementId: "G-PBSBX31HB6"
  };
  
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imageDb = getStorage(app);
export default app;