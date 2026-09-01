const root = document.documentElement;
const themeButtons = Array.from(document.querySelectorAll("[data-theme-choice]"));
const themes = new Set(["aurora", "horizon", "atlas"]);
const savedTheme = window.localStorage.getItem("portfolio-theme");
const initialTheme = themes.has(savedTheme) ? savedTheme : "aurora";

function setTheme(theme) {
  root.dataset.theme = theme;
  window.localStorage.setItem("portfolio-theme", theme);
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  });
}

setTheme(initialTheme);
themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeChoice));
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const animatedItems = Array.from(document.querySelectorAll(".reveal"));
  root.classList.add("motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  animatedItems.forEach((item) => observer.observe(item));
}
