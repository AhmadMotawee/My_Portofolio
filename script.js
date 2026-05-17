/* ============================================
   FRAME — Video Editor Portfolio
   script.js
   ============================================ */

const projectVideos = [
  {
    title: "Animation Samples",
    category: "Talking Heads",
    videoUrl: "https://www.youtube.com/embed/RLwkAIg39u8?autoplay=1"
  },
  {
    title: "Flashy Reels",
    category: "Reels",
    videoUrl: "https://www.youtube.com/embed/D19WDyTPdJE?autoplay=1"
  },
  {
    title: "Flashy Reels",
    category: "Reels",
    videoUrl: "https://www.youtube.com/embed/RhsxnjtAO8U?autoplay=1"
  },
  {
    title: "Animation Samples",
    category: "Talking Heads",
    videoUrl: "https://www.youtube.com/embed/lSSJngzV984?autoplay=1"
  },
  {
    title: "Talking Head Intro",
    category: "Talking Heads",
    videoUrl: "https://www.youtube.com/embed/HeVebV0oA08?autoplay=1"
  },
  {
    title: "Animation Samples",
    category: "Talking Heads",
    videoUrl: "https://www.youtube.com/embed/lXMfCB19Fxc?autoplay=1"
  },
  {
    title: "IRL Challenge Content",
    category: "Long-form",
    videoUrl: "https://www.youtube.com/embed/H_V_jVDE0IQ?autoplay=1"
  },
  {
    title: "Voice-Over Intro",
    category: "Long-form",
    videoUrl: "https://www.youtube.com/embed/j6XkBi-HLSY?autoplay=1"
  },
  {
    title: "Podcast Intro",
    category: "Podcast",
    videoUrl: "https://www.youtube.com/embed/ti5Fp0boEmc?autoplay=1"
  },
  {
    title: "Talking Head Animations",
    category: "Talking Head",
    videoUrl: "https://www.youtube.com/embed/vuWd3LXiBwY?autoplay=1"
  }
];


/* ─── CUSTOM CURSOR ─── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();


/* ─── PROJECT CARD HOVER: play preview video ─── */
document.querySelectorAll('.project-card').forEach((card, i) => {
  const video = card.querySelector('.project-video');
  if (!video) return;

  card.addEventListener('mouseenter', () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });
  card.addEventListener('mouseleave', () => {
    video.pause();
  });
});


/* ─── LIGHTBOX ─── */
const lightbox       = document.getElementById('lightbox');
const lightboxBg     = document.getElementById('lightboxBg');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxIframe = document.getElementById('lightboxIframe');
const lightboxTitle  = document.getElementById('lightboxTitle');
const lightboxCat    = document.getElementById('lightboxCat');

function openLightbox(index) {
  const proj = projectVideos[index];
  if (!proj) return;
  lightboxTitle.textContent  = proj.title;
  lightboxCat.textContent    = proj.category;
  lightboxIframe.src         = proj.videoUrl;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxIframe.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.addEventListener('click', () => openLightbox(i));
});
lightboxBg.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});


/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll(
  '.project-card, .about-left, .about-right, .contact-inner, .section-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ─── NAV: add backdrop on scroll ─── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.mixBlendMode = 'normal';
    nav.style.background = 'rgba(8,8,8,0.85)';
    nav.style.backdropFilter = 'blur(12px)';
    nav.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
  } else {
    nav.style.mixBlendMode = 'difference';
    nav.style.background = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom = 'none';
  }
});