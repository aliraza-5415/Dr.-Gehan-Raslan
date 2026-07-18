/* ============================================
   PRELOADER
============================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    startTypewriter();
    launchConfetti();
  }, 1800);
});

/* ============================================
   CUSTOM CURSOR
============================================ */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.addEventListener('mouseover', e => {
  if (e.target.closest('[data-hover]')) {
    cursorRing.classList.add('hover');
    cursorDot.classList.add('hover');
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('[data-hover]')) {
    cursorRing.classList.remove('hover');
    cursorDot.classList.remove('hover');
  }
});

/* ============================================
   PARTICLES CANVAS (floating nutrient dots)
============================================ */
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * H;
  }
  reset() {
    this.x = Math.random() * W;
    this.y = H + 20;
    this.size = Math.random() * 2.5 + 0.8;
    this.speedY = -(Math.random() * 0.6 + 0.2);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.color = Math.random() > 0.7 ? '232,240,232' : '201,169,110';
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y < -20) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================
   CONFETTI BURST (gold & sage)
============================================ */
function launchConfetti() {
  const colors = ['#C9A96E', '#DCC089', '#E8F0E8', '#B58F4F'];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed;top:50%;left:50%;z-index:9998;
      width:${Math.random() * 8 + 4}px;height:${Math.random() * 8 + 4}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events:none;
      transition:all 1.8s cubic-bezier(.16,1,.3,1);
    `;
    document.body.appendChild(c);
    setTimeout(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 400 + 100;
      c.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + 100}px) rotate(${Math.random() * 720}deg)`;
      c.style.opacity = '0';
    }, 10);
    setTimeout(() => c.remove(), 2000);
  }
}

/* ============================================
   TYPEWRITER EFFECT
============================================ */
const heroName = document.getElementById('heroName');
const heroCursor = document.getElementById('heroCursor');
const fullName = 'Dr. Gehan Raslan';

function startTypewriter() {
  let i = 0;
  heroName.textContent = '';
  function type() {
    if (i < fullName.length) {
      heroName.textContent += fullName.charAt(i);
      i++;
      setTimeout(type, 70);
    } else {
      heroName.classList.add('done');
      setTimeout(() => heroCursor.style.display = 'none', 1500);
    }
  }
  setTimeout(type, 400);
}

/* ============================================
   NAVBAR SCROLL
============================================ */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 60);
  backToTop.classList.toggle('show', scrollY > 400);

  // Active nav link
  let current = '';
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

/* ============================================
   SMOOTH SCROLL
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    }
  });
});

/* ============================================
   MOBILE MENU
============================================ */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* ============================================
   THEME TOGGLE
============================================ */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
});

/* ============================================
   LANGUAGE TOGGLE (basic demo)
============================================ */
const langToggle = document.getElementById('langToggle');
let currentLang = 'en';
const translations = {
  en: {
    home: 'Home', about: 'About', services: 'Services', reviews: 'Reviews', contact: 'Contact',
    book: 'Book Consultation'
  },
  ar: {
    home: 'الرئيسية', about: 'عن الدكتورة', services: 'الخدمات', reviews: 'آراء المرضى', contact: 'تواصل معنا',
    book: 'احجز استشارتك'
  }
};
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  const t = translations[currentLang];
  const links = document.querySelectorAll('.nav-link');
  const keys = ['home', 'about', 'services', 'reviews', 'contact'];
  links.forEach((l, i) => {
    if (keys[i]) l.textContent = t[keys[i]];
  });
  document.querySelector('.nav-cta').textContent = t.book;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
});

/* ============================================
   SCROLL REVEAL
============================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger').forEach(el => {
  revealObserver.observe(el);
});

/* ============================================
   COUNTER ANIMATION
============================================ */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 2200;
      const startTime = performance.now();
      
      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString() + suffix;
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* ============================================
   3D TILT ON SERVICE CARDS
============================================ */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -8;
    const ry = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0
