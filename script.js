
// Shared JS for sidebar, theme, AOS, particles
document.addEventListener('DOMContentLoaded', function(){
  // lucide icons (if present in DOM as <i data-feather="home">)
  if(window.lucide) try{ lucide.createIcons(); }catch(e){}
  // Sidebar logic
  var sidebar = document.querySelector('.sidebar');
  var hamburger = document.querySelector('.hamburger');
  var themeBtn = document.querySelector('.theme-toggle');
  if(hamburger){
    hamburger.addEventListener('click', function(e){
      e.preventDefault();
      sidebar.classList.toggle('open');
      // update aria
      hamburger.setAttribute('aria-expanded', sidebar.classList.contains('open'));
    });
  }
  // Close sidebar on outside click for small screens
  document.addEventListener('click', function(e){
    if(window.innerWidth < 900){
      if(!e.target.closest('.sidebar') && !e.target.closest('.hamburger')){
        sidebar.classList.remove('open');
      }
    }
  }, {passive:true});

  // Theme toggle
  function setTheme(t){
    if(t === 'light'){ document.body.classList.add('light'); localStorage.setItem('theme','light'); }
    else { document.body.classList.remove('light'); localStorage.setItem('theme','dark'); }
  }
  var saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);
  if(themeBtn){
    themeBtn.addEventListener('click', function(e){
      e.preventDefault();
      setTheme(document.body.classList.contains('light') ? 'dark' : 'light');
    });
  }

  // AOS init
  if(window.AOS) AOS.init({duration:900, once:true});

  // Particles on home only
  if(document.getElementById('particles-js-full') && window.particlesJS){
    particlesJS('particles-js-full', {
      "particles": {
        "number": {"value":60},
        "color":{"value":"#00bfff"},
        "opacity":{"value":0.12},
        "size":{"value":3},
        "move":{"speed":0.6}
      },
      "interactivity": {"events": {"onhover": {"enable": false}}}
    });
  }
});
