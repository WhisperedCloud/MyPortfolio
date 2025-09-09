        // Smooth section fade-in on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        function revealSections() {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight - 80) {
                    section.classList.add('visible');
                }
            });
        }
        window.addEventListener('scroll', revealSections);
        window.addEventListener('DOMContentLoaded', revealSections);

        // Navigation active link highlight
        function setActiveNav() {
            let index = sections.length - 1;
            for (let i = 0; i < sections.length; i++) {
                if (window.scrollY + 120 < sections[i].offsetTop) {
                    index = i - 1;
                    break;
                }
            }
            navLinks.forEach(link => link.classList.remove('active'));
            if (index >= 0) navLinks[index].classList.add('active');
            else navLinks[0].classList.add('active');
        }
        window.addEventListener('scroll', setActiveNav);

        // Smooth scroll for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Contact form (no backend, just demo)
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for reaching out, Eswar will get back to you soon!');
            this.reset();
        });
        // Wait until DOM loads
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    if (!form) {
      console.error("❌ Contact form not found!");
      return;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!name || !email || !message) {
        alert("⚠️ Please fill in all fields.");
        return;
      }
  
      try {
        // Send data to backend
        const response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          alert("✅ " + data.success);
          form.reset(); // clear form after success
        } else {
          alert("❌ " + (data.error || "Something went wrong."));
        }
      } catch (err) {
        console.error("Error:", err);
        alert("⚠️ Could not connect to server.");
      }
    });
  });
  
