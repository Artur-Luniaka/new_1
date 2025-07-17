// Paint Loader - Main JavaScript functionality
let paletteLevel = 1;
let brushMode = "normal";
let splashEffect = false;

// Load header and footer dynamically
function loadPaintComponents() {
  const headerPlaceholder = document.getElementById("paint-header-placeholder");
  const footerPlaceholder = document.getElementById("paint-footer-placeholder");

  if (headerPlaceholder) {
    fetch("header.html")
      .then((response) => response.text())
      .then((html) => {
        headerPlaceholder.innerHTML = html;
        initializeBurgerMenu();
      })
      .catch((error) => {
        console.error("Error loading header:", error);
        headerPlaceholder.innerHTML =
          '<header class="paint-header"><div class="brush-container"><div class="logo-zone"><a href="./" class="paint-logo"><span class="logo-text">usepayots.com</span></a></div></div></header>';
      });
  }

  if (footerPlaceholder) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((html) => {
        footerPlaceholder.innerHTML = html;
        updateCopyrightYear();
      })
      .catch((error) => {
        console.error("Error loading footer:", error);
        footerPlaceholder.innerHTML =
          '<footer class="paint-footer"><div class="footer-bottom"><p class="copyright-text">© 2025 usepayots.com | All rights reserved</p></div></footer>';
      });
  }
}

// Initialize burger menu functionality
function initializeBurgerMenu() {
  const burgerButton = document.getElementById("burger-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burgerButton && mobileMenu) {
    burgerButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      burgerButton.classList.toggle("active");

      // Toggle scroll lock
      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        burgerButton.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mobileMenu.contains(event.target) &&
        !burgerButton.contains(event.target)
      ) {
        if (mobileMenu.classList.contains("active")) {
          mobileMenu.classList.remove("active");
          burgerButton.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  }
}

// Update copyright year
function updateCopyrightYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Load content from JSON files
function loadPaintContent(contentType) {
  const contentMap = {
    instructions: "data/instructions.json",
    feedback: "data/feedback.json",
    updates: "data/updates.json",
    diaries: "data/diaries.json",
    contact: "data/contact.json",
  };

  const jsonFile = contentMap[contentType];
  if (!jsonFile) return;

  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      fillPatternArea(contentType, data);
    })
    .catch((error) => {
      console.error(`Error loading ${contentType} content:`, error);
      showLoadingError(contentType);
    });
}

// Fill content areas with data
function fillPatternArea(contentType, data) {
  const containerMap = {
    instructions: "instruction-content",
    feedback: "feedback-content",
    updates: "updates-content",
    diaries: "diaries-content",
    contact: "contact-content",
  };

  const containerId = containerMap[contentType];
  const container = document.getElementById(containerId);

  if (!container) return;

  switch (contentType) {
    case "instructions":
      renderInstructions(container, data);
      break;
    case "feedback":
      renderFeedback(container, data);
      break;
    case "updates":
      renderUpdates(container, data);
      break;
    case "diaries":
      renderDiaries(container, data);
      break;
    case "contact":
      renderContact(container, data);
      break;
  }
}

// Render instructions content
function renderInstructions(container, data) {
  container.innerHTML = data.instructions
    .map(
      (instruction) => `
        <div class="instruction-card">
            <div class="instruction-icon">${instruction.icon}</div>
            <h3>${instruction.title}</h3>
            <p>${instruction.description}</p>
        </div>
    `
    )
    .join("");
}

// Render feedback content
function renderFeedback(container, data) {
  container.innerHTML = data.feedback
    .map(
      (feedback) => `
        <div class="feedback-card">
            <div class="feedback-stars">${"⭐".repeat(feedback.rating)}</div>
            <p class="feedback-text">"${feedback.text}"</p>
            <p class="feedback-author">- ${feedback.author}</p>
        </div>
    `
    )
    .join("");
}

// Render updates content
function renderUpdates(container, data) {
  container.innerHTML = data.updates
    .map(
      (update) => `
        <div class="update-card">
            <div class="update-date">${update.date}</div>
            <h3>${update.title}</h3>
            <p>${update.description}</p>
        </div>
    `
    )
    .join("");
}

// Render diaries content
function renderDiaries(container, data) {
  container.innerHTML = data.diaries
    .map(
      (diary) => `
        <div class="diary-card">
            <div class="diary-author">${diary.author}</div>
            <h3>${diary.title}</h3>
            <p>${diary.content}</p>
        </div>
    `
    )
    .join("");
}

// Render contact content
function renderContact(container, data) {
  container.innerHTML = `
        <div class="contact-item">
            <span class="contact-icon">📧</span>
            <a href="mailto:${data.email}" class="contact-link">${data.email}</a>
        </div>
        <div class="contact-item">
            <span class="contact-icon">📞</span>
            <a href="tel:${data.phone}" class="contact-link">${data.phone}</a>
        </div>
        <div class="contact-item">
            <span class="contact-icon">📍</span>
            <span class="contact-text">${data.address}</span>
        </div>
    `;
}

// Show loading error
function showLoadingError(contentType) {
  const containerMap = {
    instructions: "instruction-content",
    feedback: "feedback-content",
    updates: "updates-content",
    diaries: "diaries-content",
    contact: "contact-content",
  };

  const containerId = containerMap[contentType];
  const container = document.getElementById(containerId);

  if (container) {
    container.innerHTML = `
            <div class="error-message">
                <p>Unable to load ${contentType} content. Please try again later.</p>
            </div>
        `;
  }
}

// Handle contact form submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name-input").value.trim();
    const phone = document.getElementById("phone-input").value.trim();
    const message = document.getElementById("message-input").value.trim();
    let errorMsg = "";
    if (!name || !phone || !message) {
      errorMsg = "Please fill in all fields.";
    }
    let errorBlock = document.getElementById("contact-form-error");
    if (!errorBlock) {
      errorBlock = document.createElement("div");
      errorBlock.id = "contact-form-error";
      errorBlock.style.color = "#ff6b9d";
      errorBlock.style.marginTop = "1rem";
      contactForm.appendChild(errorBlock);
    }
    if (errorMsg) {
      errorBlock.textContent = errorMsg;
      return;
    } else {
      errorBlock.textContent = "";
    }
    // Лоадер на кнопке
    const submitButton = contactForm.querySelector(".submit-button");
    const originalBtnText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML =
      'Processing... <span class="button-spinner"></span>';
    // Симуляция отправки
    setTimeout(() => {
      contactForm.reset();
      submitButton.disabled = false;
      submitButton.innerHTML = originalBtnText;
      showContactModal(
        "Your message has been sent! Thank you for contacting us."
      );
      // Скролл вверх страницы
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  });
}

// Модалка для уведомления
function showContactModal(message) {
  const modal = document.getElementById("contact-modal");
  const modalMsg = document.getElementById("contact-modal-message");
  if (!modal || !modalMsg) return;
  modalMsg.textContent = message;
  modal.style.display = "flex";
  // Закрытие по клику вне окна
  modal.onclick = function (e) {
    if (e.target === modal) modal.style.display = "none";
  };
  // Автоматическое закрытие через 3 сек
  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}

// Initialize scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const scrollElements = document.querySelectorAll(
    ".feature-card, .world-card, .tool-card"
  );
  scrollElements.forEach((el) => {
    el.classList.add("scroll-fade-in");
    observer.observe(el);
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadPaintComponents();
  initializeScrollAnimations();

  // Load page-specific content
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "index.html" || currentPage === "") {
    loadPaintContent("instructions");
    loadPaintContent("feedback");
  } else if (currentPage === "palette-news.html") {
    loadPaintContent("updates");
    loadPaintContent("diaries");
  } else if (currentPage === "paint-contact.html") {
    loadPaintContent("contact");
  }
});

// Export functions for potential external use
window.paintLoader = {
  loadPaintContent,
  fillPatternArea,
  initializeBurgerMenu,
};
