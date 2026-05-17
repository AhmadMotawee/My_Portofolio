/* ============================================
   FRAME — Video Editor Portfolio
   script.js
   ============================================ */

/* ════════════════════════════════════════════════
   HOW TO LINK YOUR FULL VIDEOS TO EACH PROJECT:
   
   Each project card opens a lightbox when clicked.
   Replace the empty strings below with your video URLs.
   
   You can use:
   → YouTube embed URL:  "https://www.youtube.com/embed/YOUR_VIDEO_ID"
   → Vimeo embed URL:    "https://player.vimeo.com/video/YOUR_VIDEO_ID"
   → Local MP4 file:     (See note below — iframes don't play local mp4s well;
                           for local files use the HTML5 video tag approach)
   
   Example:
   "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
   ════════════════════════════════════════════════ */
const projectVideos = [
  {
    title: "animation Samples",
    category: "Talking heads",
    videoUrl: "videos/project1.mp4"
    // Replace YOUR_VIDEO_ID_1 with the ID from your YouTube link
    // e.g. youtube.com/watch?v=ABC123 → use "ABC123"
  },
  {
    title: "Flashy Reels",
    category: "Reels",
    videoUrl: "videos/project2.mp4"
  },
  {
    title: "animation Samples",
    category: "Talking heads",
    videoUrl: "videos/project3.mp4"
    // For Vimeo: vimeo.com/123456789 → use "123456789"
  },
  {
    title: "animation Samples",
    category: "Talking heads",
    videoUrl: "videos/project4.mp4"
  },
  {
    title: "Short Film Title",
    category: "Short Film",
    videoUrl: "videos/project5.mp4"
  },
  {
    title: "Social Series Title",
    category: "Social Content",
    videoUrl: "videos/project6.mp4"
  },
  {
    title: "Project Title 7",
    category: "Commercial",
    videoUrl: "videos/project7.mp4"
  },
  {
    title: "Project Title 8",
    category: "Music Video",
    videoUrl: "videos/project8.mp4"
  },
  {
    title: "Project Title 9",
    category: "Documentary",
    videoUrl: "videos/project9.mp4"
  },
  {
    title: "Project Title 10",
    category: "Brand Film",
    videoUrl: "videos/project10.mp4"
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
    video.play().catch(() => {}); // catch if no source
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
