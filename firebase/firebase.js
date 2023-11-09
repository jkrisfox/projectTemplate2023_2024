import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_apiKey,
    authDomain: process.env.FIREBASE_authDomain,
    projectId: process.env.FIREBASE_projectId,
    storageBucket: process.env.FIREBASE_storageBucket,
    messagingSenderId: process.env.FIREBASE_messagingSenderId,
    appId: process.env.FIREBASE_appId,
    measurementId: process.env.FIREBASE_measurementId,
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };