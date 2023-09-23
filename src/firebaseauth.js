 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDMj6YRra2Vnq-biKv3SpDl3yn6_XZ0duA",
  authDomain: "clone-of-yt.firebaseapp.com",
  projectId: "clone-of-yt",
  storageBucket: "clone-of-yt.appspot.com",
  messagingSenderId: "871665534479",
  appId: "1:871665534479:web:d0d1e253d6ab90fef9457a"
};


  
  firebase.initializeApp(firebaseConfig)
  export default firebase.auth();