 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBq8Cea4Po5LHKoc0B3pOf3n2D_Nm-huMU",
    authDomain: "ecommerc-c7729.firebaseapp.com",
    projectId: "ecommerc-c7729",
    storageBucket: "ecommerc-c7729.appspot.com",
    messagingSenderId: "273676323472",
    appId: "1:273676323472:web:cbcd2982364c395d4a2615"
  };

  
  firebase.initializeApp(firebaseConfig)
  export default firebase.auth();