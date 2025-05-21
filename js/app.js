 // Loading screen
 window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".loader").classList.add("fade-out");
    }, 800);
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;
  const moonIcon = document.getElementById("moon");
  const sunIcon = document.getElementById("sun");

  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    enableDarkMode();
  }

  themeToggle.addEventListener("click", () => {
    if (htmlElement.classList.contains("dark")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  function enableDarkMode() {
    htmlElement.classList.add("dark");
    document.body.classList.add("dark");
    document.body.classList.remove("bg-gray-100");
    document.body.classList.add("bg-gray-900");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    localStorage.setItem("theme", "dark");

    // Update nav and mobile menu when in dark mode
    document.querySelector("nav").classList.add("dark");
    document.querySelector("nav").classList.remove("bg-white");
    document.querySelector("nav").classList.add("bg-gray-800");

    if (mobileMenu) {
      mobileMenu.classList.remove("bg-white");
      mobileMenu.classList.add("bg-gray-800");
    }
  }

  function disableDarkMode() {
    htmlElement.classList.remove("dark");
    document.body.classList.remove("dark");
    document.body.classList.remove("bg-gray-900");
    document.body.classList.add("bg-gray-100");
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
    localStorage.setItem("theme", "light");

    // Update nav and mobile menu when in light mode
    document.querySelector("nav").classList.remove("dark");
    document.querySelector("nav").classList.add("bg-white");
    document.querySelector("nav").classList.remove("bg-gray-800");

    if (mobileMenu) {
      mobileMenu.classList.add("bg-white");
      mobileMenu.classList.remove("bg-gray-800");
    }
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Normally you'd send the form data to a server here
      // Since its Just a test, we'll just show an alert
      const formData = new FormData(contactForm);
      let formValues = {};
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }

      // Simple validation
      if (!formValues.name || !formValues.email || !formValues.message) {
        alert("Please fill in all required fields");
        return;
      }

      // Show success message (in real app, would submit to server)
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }

  // Scroll animation for sections
  const fadeElements = document.querySelectorAll(".fade-in");

  function checkFade() {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add("active");
      }
    });
  }

  // Initial check and add scroll listener
  checkFade();
  window.addEventListener("scroll", checkFade);

  // Set up GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Header animations
  gsap.from("header h1", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 1,
  });

  gsap.from("header p", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 1.2,
  });

  gsap.from("header button", {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 1.4,
  });

  // Service cards staggered animation
  gsap.from(".service-card", {
    duration: 0.8,
    y: 60,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#services",
      start: "top 80%",
    },
  });
  // Contact form animation
  gsap.from("#contact form", {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#contact",
      start: "top 70%",
    },
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }

        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: "smooth",
        });
      }
    });
  });