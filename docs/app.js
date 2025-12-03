document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".fda-header");
  const notifyBtn = document.getElementById("notifyBtn");
  const notifyMessage = document.getElementById("notifyMessage");
  const tierButtons = document.querySelectorAll(".tier-btn");
  const demoLinks = document.querySelectorAll(".demo-btn");

  /* Header scroll effect */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  /* Smooth scroll for anchor links */
  const smoothScrollTo = (hash) => {
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (target) {
      const headerOffset = document.querySelector(".fda-header").offsetHeight || 0;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (headerOffset + 12);

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href === "#") {
        // For placeholder demo links we prevent default; logging handled separately.
        event.preventDefault();
        return;
      }
      event.preventDefault();
      smoothScrollTo(href);
    });
  });

  /* Tier buttons scroll to #start via data-scroll-target */
  tierButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-scroll-target") || "#start";
      smoothScrollTo(targetSelector);
    });
  });

  /* Demo buttons: prevent default and log */
  demoLinks.forEach((demo) => {
    demo.addEventListener("click", (event) => {
      event.preventDefault();
      const label = demo.textContent.trim();
      console.log(`Open Deck demo clicked: ${label}`);
    });
  });

  /* Get Notified button behavior */
  if (notifyBtn && notifyMessage) {
    notifyBtn.addEventListener("click", () => {
      notifyMessage.textContent =
        "Enrollment is currently invitation-only. Watch the Open Deck for signals.";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("read-page-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const text = `
      Flame Division Academy operates in the In-AI Era.
      This page is informational and read-only.
      Access is invite only.
    `;

    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = navigator.language || "en-US";

    speechSynthesis.cancel(); // stops overlaps
    speechSynthesis.speak(utterance);
  });
});
