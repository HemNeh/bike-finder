// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDFYBMsuCaSo5wb5B_tg8BWEMJX3PI6GXI",
  authDomain: "timeshift-assistant.firebaseapp.com",
  projectId: "timeshift-assistant",
  storageBucket: "timeshift-assistant.firebasestorage.app",
  messagingSenderId: "562784980819",
  appId: "1:562784980819:web:0e298770a094f8cde1dba6",
  measurementId: "G-4CMYPV4S5Y"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();