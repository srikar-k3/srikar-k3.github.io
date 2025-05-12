console.log("✅ JS file loaded");
function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// E-Ink Refresh Effect Toggle Button Handler
let einkEnabled = false; // E-Ink effect is on by default
let currentScroll = 0;
let isScrolling = false;
const step = 300;

document.addEventListener("DOMContentLoaded", () => {

  // Toggle E-Ink behavior
  toggleButton.addEventListener("click", () => {
    einkEnabled = !einkEnabled;
    console.log("E-Ink effect toggled:", einkEnabled);
    toggleButton.textContent = einkEnabled ? "Disable E-Ink Effect" : "Enable E-Ink Effect";

    // Toggle smooth scroll via <html> class
    document.documentElement.style.scrollBehavior = einkEnabled ? "auto" : "smooth";
  });

  // Scroll flash behavior
  let lastTriggerY = window.scrollY;
  const refreshDistance = 200;

  window.addEventListener("scroll", () => {
    if (!einkEnabled) return;

    const currentY = window.scrollY;
    if (Math.abs(currentY - lastTriggerY) >= refreshDistance) {
      lastTriggerY = currentY;
      console.log("Triggered E-Ink flash");
      document.body.classList.add("eink-refresh");
      setTimeout(() => {
        document.body.classList.remove("eink-refresh");
      }, 200);
    }
  });
});

// Wheel scrolling
document.addEventListener(
  "wheel",
  (e) => {
    if (!einkEnabled) return; // Allow normal scroll

    e.preventDefault();
    if (isScrolling) return;

    const direction = Math.sign(e.deltaY);
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const nextScroll = currentScroll + direction * step;

    if (nextScroll < 0 || nextScroll > maxScroll) return;

    isScrolling = true;
    document.body.classList.add("eink-refresh");

    setTimeout(() => {
      currentScroll = nextScroll;
      window.scrollTo(0, currentScroll);
      document.body.classList.remove("eink-refresh");
      isScrolling = false;
    }, 50);
  },
  { passive: false }
);

// Keyboard scrolling
document.addEventListener("keydown", (e) => {
  if (!einkEnabled) return; // Allow default behavior

  if (isScrolling) return;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();

    const direction = e.key === "ArrowDown" ? 1 : -1;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const nextScroll = currentScroll + direction * step;

    if (nextScroll < 0 || nextScroll > maxScroll) return;

    isScrolling = true;
    document.body.classList.add("eink-refresh");

    setTimeout(() => {
      currentScroll = nextScroll;
      window.scrollTo(0, currentScroll);
      document.body.classList.remove("eink-refresh");
      isScrolling = false;
    }, 50);
  }
});