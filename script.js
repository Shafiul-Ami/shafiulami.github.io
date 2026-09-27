// Theme toggle (remembers choice)
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = isDark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Mobile menu
const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Typing effect for the role line
const roles = ['Software Developer', 'Java Developer', 'Web Developer', 'Problem Solver'];
const typed = document.getElementById('typed');
let r = 0, c = roles[0].length, deleting = true;
function tick() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (deleting) {
    c--;
    if (c < 0) { deleting = false; r = (r + 1) % roles.length; c = 0; }
  } else {
    c++;
    if (c > roles[r].length) { deleting = true; setTimeout(tick, 1600); return; }
  }
  setTimeout(tick, deleting ? 45 : 90);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(tick, 2200);

// Reveal sections on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Highlight the current section in the nav
const links = [...navLinks.querySelectorAll('a')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => spy.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();
