// Color Animations - Additional interactive effects
let animationFrame = null;
let colorPulseActive = false;
let sparkleInterval = null;

// Initialize color animations
function initializeColorAnimations() {
  addHoverEffects();
  initializeColorPulse();
  addScrollEffects();
}

// Create paint splash effects (DISABLED)
function createPaintSplashes() {
  const heroSection = document.querySelector(".canvas-hero");
  if (!heroSection) return;
  // Function disabled - no more flying bubbles
  return;
}

// Get random color from palette
function getRandomColor() {
  const colors = [
    "var(--color-spark)",
    "var(--paint-smooth)",
    "var(--tap-glow)",
    "var(--shade-soft)",
    "var(--brush-warm)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Add hover effects to interactive elements
function addHoverEffects() {
  const interactiveElements = document.querySelectorAll(
    ".feature-card, .world-card, .tool-card, .nav-link"
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) translateY(-5px)";
      this.style.boxShadow =
        "0 8px 30px var(--shadow-deep), 0 0 20px rgba(255, 107, 157, 0.2)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });
}

// Initialize color pulse effect
function initializeColorPulse() {
  const pulseElements = document.querySelectorAll(
    ".color-title, .submit-button"
  );

  pulseElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      if (!colorPulseActive) {
        colorPulseActive = true;
        startColorPulse(this);
      }
    });

    element.addEventListener("mouseleave", function () {
      colorPulseActive = false;
      stopColorPulse(this);
    });
  });
}

// Start color pulse animation
function startColorPulse(element) {
  let hue = 0;

  function pulse() {
    if (!colorPulseActive) return;

    hue = (hue + 1) % 360;
    element.style.filter = `hue-rotate(${hue}deg)`;
    animationFrame = requestAnimationFrame(pulse);
  }

  pulse();
}

// Stop color pulse animation
function stopColorPulse(element) {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  element.style.filter = "";
}

// Add scroll-triggered effects
function addScrollEffects() {
  let ticking = false;

  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".paint-splash");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);
}

// Create sparkle effect
function createSparkleEffect(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle-effect";
  sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: var(--color-spark);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleFade 1s ease-out forwards;
    `;

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

// Add click sparkle effect
function addClickSparkles() {
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("feature-card") ||
      e.target.classList.contains("world-card") ||
      e.target.classList.contains("tool-card")
    ) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createSparkleEffect(
            e.clientX + (Math.random() - 0.5) * 50,
            e.clientY + (Math.random() - 0.5) * 50
          );
        }, i * 100);
      }
    }
  });
}

// Add CSS for sparkle animation
function addSparkleCSS() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes sparkleFade {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        

    `;
  document.head.appendChild(style);
}

// Initialize loading animations
function initializeLoadingAnimations() {
  const loadingElements = document.querySelectorAll(
    ".feature-card, .world-card, .tool-card"
  );

  loadingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";

    setTimeout(() => {
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Add form field animations
function addFormAnimations() {
  const formInputs = document.querySelectorAll(".form-input, .form-textarea");

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.style.transform = "scale(1.02)";
      this.parentElement.style.transition = "transform 0.3s ease";
    });

    input.addEventListener("blur", function () {
      this.parentElement.style.transform = "scale(1)";
    });
  });
}

// Create floating paint drops (DISABLED)
function createFloatingDrops() {
  const heroSection = document.querySelector(".canvas-hero");
  if (!heroSection) return;
  // Function disabled - no more floating drops
  return;
}

// Add CSS for drop animation
function addDropCSS() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes dropFall {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0.6;
            }
            100% {
                transform: translateY(100vh) scale(0.5);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize all animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    initializeColorAnimations();
    addClickSparkles();
    addSparkleCSS();
    addDropCSS();
    initializeLoadingAnimations();
    addFormAnimations();
  }, 500);
});

// Export animation functions
window.colorAnimations = {
  createPaintSplashes,
  addHoverEffects,
  initializeColorPulse,
  createSparkleEffect,
  createFloatingDrops,
};
