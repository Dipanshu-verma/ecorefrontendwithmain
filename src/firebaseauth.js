 
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAcSHMpkPYazrAZvjcLXfvrja08a-7VroU",
  authDomain: "my-tube-clone-7eda2.firebaseapp.com",
  projectId: "my-tube-clone-7eda2",
  storageBucket: "my-tube-clone-7eda2.appspot.com",
  messagingSenderId: "283814602509",
  appId: "1:283814602509:web:82064cde7a9b50d755f244"
};

  
  firebase.initializeApp(firebaseConfig)
  export default firebase.auth();