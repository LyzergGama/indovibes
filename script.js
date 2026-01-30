const navbar = document.querySelector('.navbar');
const heroBg = document.querySelector('.hero-bg');
const parallaxBg = document.querySelector('.parallax-bg');

let currentScroll = 0;
let targetScroll = 0;

// Smooth scroll-based parallax
window.addEventListener('scroll', () => {
  targetScroll = window.scrollY;
  navbar.classList.toggle('scrolled', targetScroll > 50);
});

function animate(){
  currentScroll += (targetScroll - currentScroll) * 0.08;

  if(heroBg){
    heroBg.style.transform =
      `translateY(${currentScroll * 0.35}px) scale(1.25)`;
  }

  if(parallaxBg){
    parallaxBg.style.transform =
      `translateY(${currentScroll * 0.2}px) scale(1.3)`;
  }

  requestAnimationFrame(animate);
}
animate();

/* Mouse parallax */
document.addEventListener('mousemove', (e) => {
  if(!heroBg) return;

  const x = (window.innerWidth / 2 - e.clientX) * 0.015;
  const y = (window.innerHeight / 2 - e.clientY) * 0.015;
  const depth = heroBg.dataset.depth || 0.1;

  heroBg.style.transform =
    `translate(${x * depth}px, ${y * depth}px) scale(1.25)`;
});

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
},{ threshold:0.15 });

reveals.forEach(el => observer.observe(el));
