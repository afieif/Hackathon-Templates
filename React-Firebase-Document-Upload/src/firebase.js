// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOxOwHMQiiLcyZEYYFdn5V_yaaX_BgOZM",
  authDomain: "auction-ffe0a.firebaseapp.com",
  databaseURL: "https://auction-ffe0a.firebaseio.com",
  projectId: "auction-ffe0a",
  storageBucket: "auction-ffe0a.appspot.com",
  messagingSenderId: "22647798987",
  appId: "1:22647798987:web:8e2c7674da66bef5ad6f4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function upload(file, directory, setProgress,progress,setUrl){
    let uid = uuidv4()
    const storageRef = ref(storage, directory+'/'+uid);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress_percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress({...progress,alert:'Upload is ' + Math.round(progress_percent) + '% done'})
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    console.log(error);
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
        setUrl(url)
    })
  }
);
}