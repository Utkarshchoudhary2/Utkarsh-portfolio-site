// js/auth.js
// depends on firebase (v8) being loaded and initialized (js/firebase.js)

const auth = firebase.auth();

// window functions to call from HTML
window.signup = async function signupHandler() {
  const username = document.getElementById("su-username").value.trim();
  const email = document.getElementById("su-email").value.trim();
  const pass = document.getElementById("su-pass").value;
  const pass2 = document.getElementById("su-pass2").value;
  if (!username || !email || !pass) return alert("Fill all fields");
  if (pass !== pass2) return alert("Passwords do not match");
  try {
    const uc = await auth.createUserWithEmailAndPassword(email, pass);
    await uc.user.updateProfile({ displayName: username });
    await uc.user.sendEmailVerification();
    // show verification UI:
    document.getElementById("signup-area").style.display = "none";
    document.getElementById("verify-area").style.display = "block";
    startResendTimer();
  } catch (err) {
    alert(err.message);
  }
};

window.login = async function loginHandler() {
  const email = document.getElementById("li-email").value.trim();
  const pass = document.getElementById("li-pass").value;
  if (!email || !pass) return alert("Fill both fields");
  try {
    const res = await auth.signInWithEmailAndPassword(email, pass);
    if (!res.user.emailVerified) {
      alert("Please verify your email first. Use 'Resend' if needed.");
      await auth.signOut();
      window.location.href = "login.html";
      return;
    }
    // login success -> go to index
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
};

window.logout = function logoutHandler(){
  auth.signOut().then(()=> window.location.href = "login.html");
};

// resend verification logic
let resendTimeout = null;
window.resendVerification = async function(){
  const user = auth.currentUser;
  if (!user) { alert("You must be logged in to resend (you should be signed in after signup)"); return; }
  try {
    await user.sendEmailVerification();
    alert("Verification email sent. Check your inbox.");
    startResendTimer();
  } catch(err){ alert(err.message); }
};

function startResendTimer(){
  const btn = document.getElementById("resend-btn");
  let sec = 60;
  btn.disabled = true;
  btn.innerText = "Resend (" + sec + "s)";
  resendTimeout = setInterval(()=>{
    sec--;
    btn.innerText = sec > 0 ? `Resend (${sec}s)` : "Resend";
    if (sec <= 0) { btn.disabled = false; clearInterval(resendTimeout); }
  }, 1000);
}

// helper to check email verified status (optional auto-redirect)
auth.onAuthStateChanged(user => {
  if (user && user.emailVerified){
    // if on verify page, go to login so user can login (spec: "after verification goto login")
    if (window.location.pathname.endsWith("signup.html")){
      alert("Email verified! Please login now.");
      window.location.href = "login.html";
    }
  }
});
