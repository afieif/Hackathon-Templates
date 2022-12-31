// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup ,
    signInWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const SUCCESS = 'success';
const ERROR = 'error';

const firebaseConfig = {
  apiKey: "AIzaSyBMipP4bfsJs_1U0gkDrzUq95FsE5qolg8",
  authDomain: "default-272dd.firebaseapp.com",
  databaseURL: "https://default-272dd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "default-272dd",
  storageBucket: "default-272dd.appspot.com",
  messagingSenderId: "377857214855",
  appId: "1:377857214855:web:adb9be033796ee2d15eb22"
};

function createUser(email,password){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential);
    return SUCCESS
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
    alert(errorCode+" : "+errorMessage)
    return ERROR
    // ..
  });
}

function loginUser(email,password){
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    return SUCCESS
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
    alert(errorCode+" : "+errorMessage)
    return ERROR
  });
}

function googleAuth(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    return SUCCESS;
  }).catch((error) => {
    console.log(error);
    alert(error);
    return ERROR;
    // ...
  });
}

function logout(){
  return auth.signOut();
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;
const provider = new GoogleAuthProvider();
export {app, auth, user, createUser, googleAuth, loginUser , logout};