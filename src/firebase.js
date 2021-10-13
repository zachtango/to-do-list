import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQHrBSWRCKlP7xTi1EjWCfeKkIzWaiXCg",
  authDomain: "to-do-list-7afb6.firebaseapp.com",
  databaseURL: "https://to-do-list-7afb6-default-rtdb.firebaseio.com",
  projectId: "to-do-list-7afb6",
  storageBucket: "to-do-list-7afb6.appspot.com",
  messagingSenderId: "794757698427",
  appId: "1:794757698427:web:35035036df6def644ea3de",
  measurementId: "G-G5S7KF0R58"
};

const firebaseApp = initializeApp(firebaseConfig);




export default firebaseApp;