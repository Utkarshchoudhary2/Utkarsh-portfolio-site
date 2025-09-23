// js/script.js
function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("expanded");
}

// particles init (particles.js must be loaded)
if (window.particlesJS) {
  particlesJS.load('particles-js', './js/particles-config.json', function() {
    // console.log('particles loaded');
  });
} else {
  // if particles not available, ignore
  // console.warn('particlesJS not found');
}
