 // firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrK9udVsnOe3cj8lS5beYxM44ilGo7fX0",
  authDomain: "project-9ea7a.firebaseapp.com",
  projectId: "project-9ea7a",
  storageBucket: "project-9ea7a.firebasestorage.app",
  messagingSenderId: "918285590826",
  appId: "1:918285590826:web:08c4f19a29465067b33e53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };

 