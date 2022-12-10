import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC3MjnO-NZHFJspaV_rGLeDIvaydZa_q5M",
    authDomain: "my-transaction-tracker.firebaseapp.com",
    projectId: "my-transaction-tracker",
    storageBucket: "my-transaction-tracker.appspot.com",
    messagingSenderId: "564220519341",
    appId: "1:564220519341:web:d5bb5b8beddf8f30c03724"
};

// init firebase
firebase.initializeApp(firebaseConfig);
 
// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export {projectFirestore, projectAuth}