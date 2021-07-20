import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyApsOpVbosy0p6wYluEa0SJrExhNQb2YLg",
  authDomain: "instagram-react-clone-b2bfa.firebaseapp.com",
  projectId: "instagram-react-clone-b2bfa",
  storageBucket: "instagram-react-clone-b2bfa.appspot.com",
  messagingSenderId: "354351583628",
  appId: "1:354351583628:web:2e2fab55428ba4e06786a9",
  measurementId: "G-78S72FS55D"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
