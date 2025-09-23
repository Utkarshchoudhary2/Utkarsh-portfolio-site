// Wait for DOM content loaded to initialize particles and other scripts
document.addEventListener("DOMContentLoaded", () => {
  tsParticles.load("tsparticles", {
    background: {
      color: "#10192b"
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 120,
          duration: 0.4
        },
        push: {
          quantity: 4
        }
      }
    },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 1000
        }
      },
      color: {
        value: "#5bbefa"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 5,
        random: { enable: true, minimumValue: 2 },
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "bounce"
        },
        bounce: true,
        attract: { enable: false }
      },
      links: {
        enable: true,
        distance: 140,
        color: "#5bbefa",
        opacity: 0.3,
        width: 1
      }
    },
    detectRetina: true
  });

  // Sidebar button highlighting logic
  function showSection(id, event) {
    document.querySelectorAll(".content-section").forEach(section => section.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    document.querySelectorAll("nav.sidebar-menu button").forEach(btn => btn.classList.remove("active"));
    if (event) {
      event.currentTarget.classList.add("active");
    }
  }

  // EmailJS contact form integration (only works on contact page)
  if (document.getElementById("contact-form")) {
    emailjs.init("MVNLMa6XAnCSIfOnY");

    const form = document.getElementById("contact-form");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupMsg = document.getElementById("popup-message");
    const popupIcon = document.getElementById("popup-icon");
    let popupTimeout;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_6bwckaq", "template_otmgn2e", this)
        .then(() => {
          popupTitle.textContent = "Success ✅";
          popupMsg.textContent = "Your message has been sent successfully!";
          popupIcon.textContent = "✔️";
          popupIcon.className = "popup-icon success-icon";
          showPopup();
          form.reset();
        }, (error) => {
          popupTitle.textContent = "Error ❌";
          popupMsg.textContent = "Failed to send message. Please try again.";
          popupIcon.textContent = "❌";
          popupIcon.className = "popup-icon error-icon";
          showPopup();
          console.error("EmailJS Error:", error);
        });
    });

    function showPopup() {
      popup.style.display = "flex";
      clearTimeout(popupTimeout);
      popupTimeout = setTimeout(() => {
        closePopup();
      }, 3000);
    }

    function closePopup() {
      popup.style.display = "none";
      clearTimeout(popupTimeout);
    }
  }
});