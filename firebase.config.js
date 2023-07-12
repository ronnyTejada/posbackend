// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0Ldwg2QFDYy2_RyxVQJWnDn_G6WP8cAM',
  authDomain: 'posmobile-7c93b.firebaseapp.com',
  projectId: 'posmobile-7c93b',
  storageBucket: 'posmobile-7c93b.appspot.com',
  messagingSenderId: '274765312192',
  appId: '1:274765312192:web:80b6f60e3d10e9a07cfd25',
  measurementId: 'G-4NXVBT6VNL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
