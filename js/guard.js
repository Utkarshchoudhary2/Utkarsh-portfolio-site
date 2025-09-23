// js/guard.js
// Put this <script> on every guarded page (index/about/projects/contact/flappy)
firebase.auth().onAuthStateChanged(function(user){
  const path = window.location.pathname.split("/").pop();
  const publicPages = ["login.html","signup.html"];
  if (publicPages.includes(path)) return; // don't redirect from login/signup
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  if (!user.emailVerified) {
    // not allowed until verification
    alert("Please verify your email. Redirecting to login.");
    firebase.auth().signOut().then(()=> window.location.href = "login.html");
    return;
  }
  // user ok -> do nothing (page loads)
});