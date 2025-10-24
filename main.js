document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

const scrollIndicator = document.querySelector(".scroll-indicator");

// Ocultar al hacer scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    scrollIndicator.classList.add("hidden");
  } else {
    scrollIndicator.classList.remove("hidden");
  }
});

 window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    // Fade out + scroll
    setTimeout(() => {
      preloader.classList.add("hidden");

      // scroll suave a la sección
      const target = document.querySelector("#date-invite");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 1500); // tiempo que dura el preloader visible
  });
  // Zoom efecto al hacer scroll
window.addEventListener("scroll", () => {
  document.querySelectorAll(".zoom-on-scroll img").forEach(img => {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      // Calcula cuánto scroll ha entrado en la pantalla
      let progress = 1 + (0.15 * (1 - rect.top / windowHeight));
      img.style.transform = `scale(${progress})`;
    }
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const restrRadios = document.querySelectorAll("input[name='restricciones_toggle']");
  const restrText   = document.getElementById("restricciones-text");

  // --- Mostrar/ocultar campo de restricciones ---
  restrRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "Sí" && radio.checked) {
        restrText.style.display = "block";
      } else {
        restrText.style.display = "none";
        restrText.querySelectorAll("input, textarea").forEach(i => i.value = "");
      }
    });
  });

  // --- Mostrar/ocultar pregunta extra pre-boda ---
  const prebodaRadios = document.querySelectorAll("input[name='preboda_asistencia']");
  const prebodaExtra  = document.getElementById("preboda-extra");

  prebodaRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "No" && radio.checked) {
        prebodaExtra.style.display = "block";
      } else {
        prebodaExtra.style.display = "none";
        prebodaExtra.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
      }
    });
  });
});
