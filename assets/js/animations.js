/**
 * Smooth Scroll & Entrance Animations
 * Refrigerator Repair Littleton CO
 */
(function () {
  "use strict";

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  function initScrollAnimations() {
    if (!("IntersectionObserver" in window)) return;

    // Elements to reveal as user scrolls
    const targets = document.querySelectorAll(
      "main section:not(:first-of-type) h2, " +
      "main section:not(:first-of-type) .grid > div, " +
      "main #faq .group, " +
      "main #about .grid > div, " +
      "main section .border-2, " +
      "main section .rounded-xl, " +
      "footer .grid > div"
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.08
      }
    );

    targets.forEach((el) => {
      // Don't hide elements if already inside viewport on initial load
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        return;
      }

      // Add stagger delay for adjacent cards in the same grid
      const parent = el.parentElement;
      if (parent) {
        const siblingIndex = Array.from(parent.children).indexOf(el);
        if (siblingIndex > 0 && siblingIndex < 8) {
          el.style.transitionDelay = (siblingIndex * 70) + "ms";
        }
      }

      el.classList.add("rv-hidden");
      observer.observe(el);
    });

    // Fallback: ensure all elements become visible after 3.5s
    setTimeout(function () {
      document.querySelectorAll(".rv-hidden").forEach(function (el) {
        el.classList.add("rv-revealed");
      });
    }, 3500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
