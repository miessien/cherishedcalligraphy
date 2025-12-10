document.addEventListener("DOMContentLoaded", async () => {
  const includeTargets = document.querySelectorAll("[data-include]");

  for (const target of includeTargets) {
    const file = target.getAttribute("data-include");
    const response = await fetch(file);
    const html = await response.text();

    // Ensure header/footer stays inside its wrapper
    target.innerHTML = html;
  }

  document.dispatchEvent(new Event("partials-loaded"));
});
