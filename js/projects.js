const projects = [
  {
  id: 0,
  number: "01",
  title: "Pockentra",
  description: "A full-stack personal finance tracker with interactive charts, income/expense management, and a responsive dashboard. Built with MongoDB, Express, React, and Node.js.",
  tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
  liveUrl: "https://pockentra.vercel.app/",
  githubUrl: "https://github.com/rakeshbhati-dev/Pockentra",
  images: [
    { src: "/assets/project images/pockentra-1.jpeg", alt: "Pockentra screenshot 1" },
    { src: "/assets/project images/pockentra-2.jpeg", alt: "Pockentra screenshot 2" },
    { src: "/assets/project images/pockentra-3.png", alt: "Pockentra screenshot 3" },
  ],
},

{
  id: 1,
  number: "02",
  title: "Roast & Petal — Cafe Landing Page",
  description: "A professional cafe landing page built for freelance portfolio. Features menu section, gallery, testimonials, and contact information. Fully responsive.",
  tags: ["React", "Tailwind CSS"],
  liveUrl: "https://roastandpetal.netlify.app",
  githubUrl: "https://github.com/rakeshbhati-dev/roastandpetal",
  images: [
    { src: "/assets/project images/cafe-1.png", alt: "Roast and Petal screenshot-1" },
    { src: "/assets/project images/cafe-2.png", alt: "Roast and Petal screenshot-2" },
    { src: "/assets/project images/cafe-3.png", alt: "Roast and Petal screenshot-3" },
  ],
},

{
    id: 2,
    number: "03",
    title: "WhatchNow",
    description: "WhatchNow is a responsive movie discovery web app built with React. Browse Popular, Trending, and Most Anticipated movies, search any title instantly, and save your favorites to a personal watchlist — all powered by Trakt and OMDB APIs",
    tags: ["React", "Tailwind CSS"],
    liveUrl: null,
    githubUrl: "https://github.com/rakeshbhati-dev/WhatchNow",
    images: [
      { src: "/assets/project images/whatchnow-ss-1.png", alt: "WhatchNow screenshot 1" },
      { src: "/assets/project images/whatchnow-ss-2.png", alt: "WhatchNow screenshot 2" },
      { src: "/assets/project images/whatchnow-ss-3.png", alt: "WhatchNow screenshot 3" },
    ],
  },

  {
    id: 3,
    number: "04",
    title: "Typetussle Game",
    description:
      "TypeTussle is a web-based word guessing battle game where correct and incorrect guesses reduce the opponent's or player's health bar. It features dynamic character expressions, animations, and sound effects to create an engaging win/lose experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://typetussle.netlify.app/",
    githubUrl: "https://github.com/rakeshbhati-dev/TypeTussle",
    images: [
      { src: "/assets/project images/typetussle-1.png", alt: "Typetussle screenshot 1" },
      { src: "/assets/project images/typetussle-2.png", alt: "Typetussle screenshot 2" },
      { src: "/assets/project images/typetussle-3.png", alt: "Typetussle screenshot 3" },
    ],
  },
];

function buildGallery(id, images) {
  const slides = images
    .map(
      (img) => `
      <div class="slide">
        <div class="slide-placeholder">
          <img src="${img.src}" alt="${img.alt}" />
        </div>
      </div>`
    )
    .join("");

  const dots = images
    .map(
      (_, i) =>
        `<button class="dot${i === 0 ? " active" : ""}" data-gallery="${id}" data-index="${i}"></button>`
    )
    .join("");

  return `
    <div class="card-gallery" data-gallery="${id}">
      <div class="slides" id="slides-${id}">${slides}</div>
      <button class="gallery-arrow prev" data-gallery="${id}" data-dir="-1" aria-label="Previous">‹</button>
      <button class="gallery-arrow next" data-gallery="${id}" data-dir="1"  aria-label="Next">›</button>
      <div class="gallery-dots" id="dots-${id}">${dots}</div>
      <div class="img-count-badge" id="badge-${id}">1 / ${images.length}</div>
    </div>`;
}

function buildCard(project, delay) {
  const tags = project.tags
    .map((t) => `<span class="card-tag">${t}</span>`)
    .join("");

  const liveBtn = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" class="link-btn link-btn-primary">Live Demo →</a>`
    : "";

  const ghBtn = project.githubUrl
    ? `<a href="${project.githubUrl}" target="_blank" class="link-btn link-btn-ghost">GitHub ↗</a>`
    : "";

  return `
    <div class="project-card reveal" style="transition-delay:${delay}s;">
      <div class="card-body">
        <div class="card-info">
          <div class="card-number">${project.number} / Project</div>
          <div class="card-title">${project.title}</div>
          <p class="card-desc">${project.description}</p>
          <div class="card-tags">${tags}</div>
          <div class="card-links">${liveBtn}${ghBtn}</div>
        </div>
        ${buildGallery(project.id, project.images)}
      </div>
    </div>`;
}

// Inject cards into the DOM
const container = document.getElementById("projects-container");
projects.forEach((project, index) => {
  container.insertAdjacentHTML("beforeend", buildCard(project, 0.1 + index * 0.05));
});

// Re-run scroll observer for newly created .reveal elements
const projectsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        projectsObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll("#projects-container .reveal").forEach((el) => projectsObserver.observe(el));

// Init galleries + attach all event listeners after cards are in the DOM
document.querySelectorAll(".card-gallery").forEach((g) => {
  const id = g.dataset.gallery;
  initGallery(id);
  goTo(id, 0);

  // Arrow clicks
  g.querySelectorAll(".gallery-arrow").forEach(btn => {
    btn.addEventListener("click", () => {
      goTo(id, state[id].current + parseInt(btn.dataset.dir));
    });
  });

  // Dot clicks
  g.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", () => {
      goTo(id, parseInt(dot.dataset.index));
    });
  });

  // Touch/swipe
  let startX = 0;
  g.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  g.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(id, state[id].current + (diff > 0 ? 1 : -1));
    }
  });
});
