document.documentElement.dataset.appReady = "true";

const navLinks = document.querySelectorAll(".nav-links a");
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav() {
  const marker = 110;
  let current = sections[0];

  for (const section of sections) {
    const rect = section.getBoundingClientRect();

    if (rect.top <= marker && rect.bottom > marker) {
      current = section;
      break;
    }

    if (rect.top <= marker) {
      current = section;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current?.id}`);
  });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", () => {
  setActiveNav();
  setTimeout(setActiveNav, 160);
});
window.addEventListener("hashchange", () => {
  requestAnimationFrame(setActiveNav);
  setTimeout(setActiveNav, 160);
});
requestAnimationFrame(setActiveNav);
setActiveNav();

const mapStory = document.querySelector(".map-story");
const mapStoryKicker = mapStory?.querySelector("span");
const mapStoryTitle = mapStory?.querySelector("strong");
const mapStoryText = mapStory?.querySelector("p");
const mapHotspots = document.querySelectorAll(".map-hotspot");

function setMapStory(hotspot) {
  if (!mapStoryKicker || !mapStoryTitle || !mapStoryText || !hotspot) {
    return;
  }

  mapHotspots.forEach((item) => item.classList.toggle("is-active", item === hotspot));
  mapStoryKicker.textContent = hotspot.dataset.mapKicker;
  mapStoryTitle.textContent = hotspot.dataset.mapTitle;
  mapStoryText.textContent = hotspot.dataset.mapText;
}

mapHotspots.forEach((hotspot) => {
  hotspot.addEventListener("pointerenter", () => setMapStory(hotspot));
  hotspot.addEventListener("mouseover", () => setMapStory(hotspot));
  hotspot.addEventListener("mouseenter", () => setMapStory(hotspot));
  hotspot.addEventListener("focus", () => setMapStory(hotspot));
  hotspot.addEventListener("click", () => setMapStory(hotspot));
});
