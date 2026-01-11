// Accessible hamburger → mobile menu toggle
// Works with injected partials (event delegation)

function getMobileMenu(hamburger) {
  // Prefer aria-controls if provided
  const controlsId = hamburger?.getAttribute("aria-controls");
  if (controlsId) {
    const byId = document.getElementById(controlsId);
    if (byId) return byId;
  }

  // Fallbacks
  return document.querySelector(".mobile-menu") || document.querySelector("nav.mobile-menu");
}

function openMenu(hamburger, menu) {
  hamburger.setAttribute("aria-expanded", "true");

  // If you’re using hidden attribute, unhide it
  menu.hidden = false;

  // Optional class hook if your CSS depends on it
  menu.classList.add("open");

  document.body.classList.add("no-scroll");
}

function closeMenu(hamburger, menu) {
  hamburger.setAttribute("aria-expanded", "false");

  menu.classList.remove("open");
  menu.hidden = true;

  document.body.classList.remove("no-scroll");
}

function toggleMenu(hamburger, menu) {
  const isOpen = hamburger.getAttribute("aria-expanded") === "true";
  isOpen ? closeMenu(hamburger, menu) : openMenu(hamburger, menu);
}

// Click handler (works even if header is injected later)
document.addEventListener("click", (event) => {
  const hamburger = event.target.closest(".hamburger");
  if (!hamburger) return;

  const menu = getMobileMenu(hamburger);
  if (!menu) {
    console.error("Menu JS ERROR: mobile menu not found");
    return;
  }

  // Ensure aria-expanded exists
  if (!hamburger.hasAttribute("aria-expanded")) {
    hamburger.setAttribute("aria-expanded", "false");
  }

  // If menu has no hidden attribute set yet, initialize it closed
  if (typeof menu.hidden !== "boolean") {
    // Shouldn’t happen in modern browsers, but safe guard
  } else if (!menu.classList.contains("open") && hamburger.getAttribute("aria-expanded") !== "true") {
    // Don’t force-close if you intentionally start open
    // but if it’s not marked open, keep it hidden by default
    // (only if you want default closed)
  }

  toggleMenu(hamburger, menu);
});

// Close on Escape
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const hamburger = document.querySelector(".hamburger[aria-expanded='true']");
  if (!hamburger) return;

  const menu = getMobileMenu(hamburger);
  if (!menu) return;

  closeMenu(hamburger, menu);
  hamburger.focus();
});

// Close when a link in the mobile menu is clicked (optional but nice)
document.addEventListener("click", (event) => {
  const link = event.target.closest(".mobile-menu a");
  if (!link) return;

  const hamburger = document.querySelector(".hamburger[aria-expanded='true']");
  if (!hamburger) return;

  const menu = getMobileMenu(hamburger);
  if (!menu) return;

  closeMenu(hamburger, menu);
});
