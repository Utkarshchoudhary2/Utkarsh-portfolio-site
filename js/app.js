// final upgraded app.js - Firebase compat + UI logic (integrated)
window.__FIREBASE_CONF = {
  apiKey: "AIzaSyB1NtsmihmojQsWzOwqRo-286cv12spgdE",
  authDomain: "utkarshchaudhary-portfolio.firebaseapp.com",
  projectId: "utkarshchaudhary-portfolio",
  storageBucket: "utkarshchaudhary-portfolio.firebasestorage.app",
  messagingSenderId: "487685457505",
  appId: "1:487685457505:web:11c6575582ae018bc1cc20",
  measurementId: "G-7V964SHVM1"
};

function initFirebaseCompat(){
  try{
    if(window.firebase && !window.__FIREBASE_APP_INITIALIZED){
      firebase.initializeApp(window.__FIREBASE_CONF);
      window.__FIREBASE_APP_INITIALIZED = true;
      console.log('Firebase initialized');
    }
  }catch(e){ console.error('init firebase err', e); }
}

function showToast(text, ok=true){
  const wrap = document.getElementById('toast-wrap') || (function(){ const d=document.createElement('div'); d.id='toast-wrap'; document.body.appendChild(d); return d; })();
  const t = document.createElement('div'); t.className='toast'; t.textContent = text;
  if(!ok) t.style.background = 'linear-gradient(90deg,#ff9b9b,#ff8b8b)';
  wrap.appendChild(t); setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=> t.remove(),400); }, 3000);
}

// glowing success popup for verification redirect
function showVerifiedPopup(){
  const el = document.createElement('div'); el.className='verified-popup'; el.innerHTML = '<strong>✅ Email verified!</strong><p>You can now log in.</p>';
  el.style.position='fixed'; el.style.left='50%'; el.style.top='18%'; el.style.transform='translateX(-50%)'; el.style.zIndex='4000';
  el.style.background='linear-gradient(90deg,#9ff7c6,#7de0ff)'; el.style.color='#04111a'; el.style.padding='14px 18px'; el.style.borderRadius='12px'; el.style.boxShadow='0 12px 40px rgba(0,0,0,0.45)';
  document.body.appendChild(el); setTimeout(()=>{ el.style.opacity='0'; setTimeout(()=>el.remove(),1600); }, 3000);
}

function getAuth(){ initFirebaseCompat(); return firebase.auth(); }
function setPersistence(remember){ const auth=getAuth(); if(!auth) return Promise.resolve(); try{ if(remember) return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL); return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);}catch(e){ return Promise.resolve(); } }
function isValidEmail(e){ return /\S+@\S+\.\S+/.test(e); }

document.addEventListener('click', function(e){
  if(e.target && e.target.id === 'loginBtn'){
    const email = document.getElementById('email')?.value?.trim();
    const pw = document.getElementById('password')?.value?.trim();
    const remember = document.getElementById('rememberMe')?.checked;
    if(!email || !pw){ showToast('Enter email and password', false); return; }
    if(!isValidEmail(email)){ showToast('Enter a valid email', false); return; }
    setPersistence(remember).then(()=>{
      const auth = getAuth();
      auth.signInWithEmailAndPassword(email,pw)
        .then((res)=>{
          const user = res.user;
          if(user && !user.emailVerified){
            auth.signOut();
            showToast('⚠️ Please verify your email before logging in.', false);
            setTimeout(()=> { window.location.href='verify.html'; }, 600);
            return;
          }
          showToast('✅ Login successful');
          setTimeout(()=> window.location.href = 'home.html', 600);
        })
        .catch(err=> showToast('❌ '+(err.message||'Login failed'), false));
    });
  }

  if(e.target && e.target.id === 'signupBtn'){
    const fullName = document.getElementById('fullname')?.value?.trim();
    const email = document.getElementById('email')?.value?.trim();
    const pw = document.getElementById('password')?.value?.trim();
    const confirm = document.getElementById('confirmPassword')?.value?.trim();
    if(!fullName){ showToast('Please enter your full name', false); return; }
    if(!email || !isValidEmail(email)){ showToast('Please enter a valid email', false); return; }
    if(!pw || pw.length < 6){ showToast('Password must be at least 6 characters', false); return; }
    if(pw !== confirm){ showToast('Passwords do not match', false); return; }
    const auth = getAuth();
    auth.createUserWithEmailAndPassword(email,pw)
      .then((result)=>{
        const user = result.user;
        if(user){
          user.updateProfile({ displayName: fullName }).catch(()=>{});
          user.sendEmailVerification().then(()=>{
            showToast('📩 Verification email sent. Check your inbox.');
            auth.signOut();
            setTimeout(()=> window.location.href='verify.html', 700);
          }).catch(err=>{ showToast('❌ Could not send verification email', false); });
        }
      }).catch(err=> showToast('❌ '+(err.message||'Signup failed'), false));
  }

  if(e.target && e.target.id === 'resetBtn'){
    const email = document.getElementById('email')?.value?.trim();
    if(!email){ showToast('Enter email to reset', false); return; }
    const auth = getAuth();
    auth.sendPasswordResetEmail(email).then(()=> showToast('✉️ Reset email sent')).catch(err=> showToast('❌ '+(err.message||'Reset failed'), false));
  }

  if(e.target && e.target.id === 'resendVerify'){
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user){
      showToast('Please login first then resend from verify page', false);
      return;
    }
    user.sendEmailVerification().then(()=> showToast('📩 Verification email resent')).catch(err=> showToast('❌ Resend failed', false));
  }

  if(e.target && (e.target.id==='logoutBtn' || e.target.id==='logoutBtn2' || e.target.id==='logoutBtn3')){
    const auth = getAuth();
    auth.signOut().then(()=>{
      showToast('👋 Logged out successfully');
      document.body.style.transition='opacity .45s ease'; document.body.style.opacity='0.4';
      setTimeout(()=> window.location.href='index.html', 600);
    }).catch(err=> showToast('❌ Logout failed', false));
  }

  if(e.target && e.target.classList && e.target.classList.contains('close-x')){
    const t = e.target.getAttribute('data-target'); if(t) closeModal(t);
  }

  if(e.target && e.target.id === 'download-resume'){
    const a = document.createElement('a'); a.href='assets/Utkarsh_Modern_Resume.pdf'; a.download='Utkarsh_Modern_Resume.pdf'; document.body.appendChild(a); a.click(); a.remove();
  }

  if(e.target && e.target.id === 'csend'){
    const name = document.getElementById('cname')?.value?.trim();
    const email = document.getElementById('cemail')?.value?.trim();
    const msg = document.getElementById('cmsg')?.value?.trim();
    if(!name || !email || !msg){ showToast('Please complete the form', false); return; }
    showToast('✅ Message sent (demo)');
    document.getElementById('cname').value=''; document.getElementById('cemail').value=''; document.getElementById('cmsg').value='';
  }

});

document.addEventListener('DOMContentLoaded', function(){
  initFirebaseCompat();
  const auth = firebase.auth();
  try{
    const url = new URL(window.location.href);
    const mode = url.searchParams.get('mode');
    if(mode === 'verifyEmail'){ showVerifiedPopup(); }
  }catch(e){}
  auth.onAuthStateChanged(function(user){
    const welcomeTitle = document.getElementById('welcome-title');
    if(user && welcomeTitle){
      const name = (user.displayName && user.displayName.trim()) ? user.displayName : (user.email ? user.email.split('@')[0] : 'Utkarsh');
      welcomeTitle.textContent = `Welcome, ${name} 👋`;
    }
  });
  ['logoutBtn','logoutBtn2','logoutBtn3'].forEach(id=>{ const el=document.getElementById(id); if(el) el.addEventListener('click', ()=>{ document.querySelector(`[id="${id}"]`).click(); }); });
  const backdrop = document.getElementById('modal-backdrop');
  if(backdrop) backdrop.addEventListener('click', function(ev){ if(ev.target === backdrop){ document.querySelectorAll('.modal').forEach(m=>m.style.display='none'); backdrop.classList.remove('show'); } });
});

function openModalIfAuth(modalId){
  initFirebaseCompat();
  const auth = firebase.auth();
  const user = auth.currentUser;
  if(!user){ showToast('⚠️ Please log in or sign up to access this section.', false); setTimeout(()=>{ window.location.href='index.html'; }, 600); return; }
  if(!user.emailVerified){ showToast('⚠️ Please verify your email first.', false); setTimeout(()=>{ window.location.href='verify.html'; }, 700); return; }
  openModal(modalId);
}
function openModal(modalId){ const backdrop=document.getElementById('modal-backdrop'); const modal=document.getElementById(modalId); if(backdrop && modal){ backdrop.classList.add('show'); modal.style.display='block'; backdrop.setAttribute('aria-hidden','false'); } }
function closeModal(modalId){ const backdrop=document.getElementById('modal-backdrop'); const modal=document.getElementById(modalId); if(backdrop && modal){ modal.style.display='none'; const anyVisible=Array.from(document.querySelectorAll('.modal')).some(m=>m.style.display==='block'); if(!anyVisible) backdrop.classList.remove('show'); backdrop.setAttribute('aria-hidden','true'); } }
function openResumeIfAuth(){ openModalIfAuth('modal-resume'); } function openProjectsIfAuth(){ openModalIfAuth('modal-projects'); }
