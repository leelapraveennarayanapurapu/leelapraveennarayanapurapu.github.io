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

const roleTop = document.querySelector(".hero-role-word--top");
const roleBottom = document.querySelector(".hero-role-word--bottom");
const roleLive = document.querySelector(".hero-role-live");
const roleIndexLabel = document.querySelector(".hero-role-index");
const roleFrames = [
  ["PROJECT", "MANAGER", "Project Manager"],
  ["ASSISTANT", "PM", "Assistant Project Manager"],
  ["PROJECT", "COORDINATOR", "Project Coordinator"],
  ["BUSINESS", "ANALYST", "Business Analyst"],
];
let roleIndex = 0;

if (!reducedMotion.matches && roleTop && roleBottom) {
  window.setInterval(() => {
    roleTop.classList.add("is-changing");
    roleBottom.classList.add("is-changing");
    window.setTimeout(() => {
      roleIndex = (roleIndex + 1) % roleFrames.length;
      const [top, bottom, label] = roleFrames[roleIndex];
      roleTop.textContent = top;
      roleBottom.textContent = bottom;
      if (roleLive) roleLive.textContent = label;
      if (roleIndexLabel) roleIndexLabel.textContent = `ROLE / 0${roleIndex + 1}`;
      roleTop.classList.remove("is-changing");
      roleBottom.classList.remove("is-changing");
    }, 280);
  }, 3000);
}

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
