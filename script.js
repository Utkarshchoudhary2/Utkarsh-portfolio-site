
document.addEventListener("DOMContentLoaded", function(){
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("toggleSidebar");
  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("expanded");
  });

  // EmailJS contact form
  const form = document.getElementById("contact-form");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      emailjs.sendForm("service_6bwckaq","template_otmgn2e", this,"MVNLMa6XAnCSIfOnY")
        .then(()=>{ alert("Message sent!"); this.reset(); })
        .catch(err=>{ alert("Failed to send: " + JSON.stringify(err)); });
    });
  }
});
