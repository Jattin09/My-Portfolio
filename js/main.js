
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    const closeMenu = () => {
      navLinks.classList.remove("open", "active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = navLinks.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        navLinks.classList.add("open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
      }
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }


  // ACTIVE NAVIGATION LINK
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });


  // SCROLL REVEAL
  const revealElements = document.querySelectorAll(
    "[data-reveal], .content-card, .project-card, .skill-card, " +
    ".certificate-card, .contact-card, .learning-item, .dashboard-card"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px"
    });

    revealElements.forEach((element, index) => {
      element.setAttribute("data-reveal", "");
      element.style.transitionDelay =
        `${Math.min(index % 4, 3) * 55}ms`;

      observer.observe(element);
    });

  } else {
    revealElements.forEach(element => {
      element.classList.add("revealed");
    });
  }


  // AUTO-HIDE NAVIGATION ON SCROLL
  const navbar = document.querySelector(".navbar");

  if (navbar) {

    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener("scroll", () => {

      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {

        const currentScrollY = window.scrollY;
        const difference = currentScrollY - lastScrollY;

        if (
          currentScrollY <= 80 ||
          difference < -5 ||
          (navLinks && navLinks.classList.contains("open"))
        ) {
          navbar.classList.remove("nav-hidden");
        } else if (difference > 5) {
          navbar.classList.add("nav-hidden");
        }

        lastScrollY = currentScrollY;
        ticking = false;

      });

    }, { passive: true });
  }


  // CURRENT YEAR
  document.querySelectorAll("[data-current-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  // PAGE ENTRANCE
  document.body.classList.add("page-enter");

});
