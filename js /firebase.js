// js/firebase.js
// Your firebase config (use the same you provided; if storageBucket differs, update here)
const firebaseConfig = {
  apiKey: "AIzaSyB1NtsmihmojQsWzOwqRo-286cv12spgdE",
  authDomain: "utkarshchaudhary-portfolio.firebaseapp.com",
  projectId: "utkarshchaudhary-portfolio",
  storageBucket: "utkarshchaudhary-portfolio.appspot.com", // verify in Firebase console
  messagingSenderId: "487685457505",
  appId: "1:487685457505:web:797c7ac6cc2e40d8c1cc20",
  measurementId: "G-VYF9PRY0F9"
};

// Firebase v8 (simpler for this template)
if (!window.firebase) {
  console.error("Firebase SDK not loaded. Make sure <script src='https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js'> and firebase-auth.js are included.");
}
firebase.initializeApp(firebaseConfig);
