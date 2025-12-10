// Simple hamburger → mobile menu toggle
document.addEventListener("click", (event) => {
  const hamburger = event.target.closest(".hamburger");
  if (!hamburger) return; // ignore clicks elsewhere

  const mobileMenu = document.querySelector(".mobile-menu");
  if (!mobileMenu) {
    console.error("Menu JS ERROR: .mobile-menu not found");
    return;
  }

  console.log("Hamburger CLICKED!");

  // Toggle menu visibility
  mobileMenu.classList.toggle("open");

  // Prevent page scrolling behind the menu
  document.body.classList.toggle("no-scroll");
});
