
/* ========================================
   BEIGE FITNESS CLUB — JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const contactForm = document.getElementById("contactForm");
  const planSelect = document.getElementById("plan");
  const goalSelect = document.getElementById("goal");
  const formStatus = document.getElementById("formStatus");
  const toast = document.getElementById("toast");

  // 1. AUTOMATIC FOOTER YEAR
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // 2. MOBILE NAVIGATION
  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // 3. TOAST NOTIFICATION
  let toastTimeout;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // 4. SMOOTH SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 5. HIGHLIGHT THE ACTIVE NAVIGATION SECTION
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 6. PRESELECT A PLAN WHEN A PLAN BUTTON IS CLICKED
  function selectPlan(planName) {
    const optionExists = Array.from(planSelect.options).some(
      (option) => option.value === planName ||
                  option.textContent.trim() === planName
    );

    if (optionExists) {
      planSelect.value = planName;
    }

    const goalMap = {
      "Lean Gain Nutrition": "Gain weight (skinny / beginner)",
      "Fat Loss Nutrition": "Lose body fat",
      "Muscle Building Nutrition": "Build muscle (bulk)"
    };

    if (goalMap[planName]) {
      goalSelect.value = goalMap[planName];
    }

    document.getElementById("contact").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });

    setTimeout(() => {
      const firstField = contactForm.querySelector('input[name="name"]');
      firstField.focus({ preventScroll: true });
    }, 450);

    showToast(`${planName} selected. Complete the form to enquire.`);
  }

  document.querySelectorAll("[data-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      selectPlan(button.dataset.plan);
    });
  });

  document.querySelectorAll(".choose-plan").forEach((button) => {
    button.addEventListener("click", () => {
      selectPlan(button.dataset.plan);
    });
  });

  // 7. CONTACT FORM VALIDATION AND DEMO SUBMISSION
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const customerName = formData.get("name").trim();

    formStatus.textContent =
      `Thanks, ${customerName}! Your form passed validation. ` +
      "This demo does not send or save your enquiry yet.";

    showToast("Demo enquiry validated successfully.");

    // This is only a frontend demonstration.
    // Connect a backend or form service to deliver enquiries.
    console.log("Demo enquiry:", Object.fromEntries(formData.entries()));

    contactForm.reset();
  });

  // 8. HEADER BACKGROUND ON SCROLL
  const header = document.getElementById("header");

  window.addEventListener(
    "scroll",
    () => {
      header.style.boxShadow =
        window.scrollY > 40
          ? "0 8px 30px rgba(0, 0, 0, 0.25)"
          : "none";
    },
    { passive: true }
  );
});
