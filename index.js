/* -------------------------------
   Your existing JS code
--------------------------------- */
// (Keep everything you already had in index.js above this line)



/* -------------------------------
   Added: Smooth scroll + animations
--------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animation for sections & cards
  const elements = document.querySelectorAll("section, .card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show"); // Add the show class from CSS
        observer.unobserve(entry.target);   // Animate only once
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));

  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll("nav a[href^='#']");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        window.scrollTo({
          top: targetEl.offsetTop - 60, // adjust offset for sticky header
          behavior: "smooth"
        });
      }
    });
  });

  // Optional: Typing text effect (hero section)
  const typingTarget = document.querySelector(".typing-text");
  if (typingTarget) {
    const texts = ["Developer", "Designer", "Creator"];
    let textIndex = 0;
    let charIndex = 0;

    function typeEffect() {
      if (charIndex < texts[textIndex].length) {
        typingTarget.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
      } else {
        setTimeout(eraseEffect, 1500);
      }
    }

    function eraseEffect() {
      if (charIndex > 0) {
        typingTarget.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 60);
      } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 500);
      }
    }

    typeEffect();
  }
});
