import firebase from 'firebase';
import 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAkfZhXPixKOWHkopE6Xi5AjhFRKIFubRc",
  authDomain: "cremonini-c8c2a.firebaseapp.com",
  databaseURL: "https://cremonini-c8c2a.firebaseio.com",
  projectId: "cremonini-c8c2a",
  storageBucket: "cremonini-c8c2a.appspot.com",
  messagingSenderId: "518362215043",
  appId: "1:518362215043:web:97b0521996025cdd26a1b6"
};

export default firebase.initializeApp(firebaseConfig);