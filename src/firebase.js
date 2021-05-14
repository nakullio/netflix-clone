import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCEti0RaBoZOWd28bES4EebXkhFtldzA4M",
    authDomain: "netflixnmclone.firebaseapp.com",
    projectId: "netflixnmclone",
    storageBucket: "netflixnmclone.appspot.com",
    messagingSenderId: "547920320555",
    appId: "1:547920320555:web:9bf7c31b34838d11f3726e"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth }
  export default db;