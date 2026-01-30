const navbar = document.querySelector('.navbar');
const heroBg = document.querySelector('.hero-bg');
const parallaxBg = document.querySelector('.parallax-bg');

let currentScroll = 0;
let targetScroll = 0;

// Disable browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top
window.scrollTo(0, 0);

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  const plane = document.querySelector('.loader-plane');
  const bus = document.querySelector('.loader-bus');

  const isPlane = Math.random() < 0.5;

  if(isPlane){
    plane.style.display = 'flex';
  }else{
    bus.style.display = 'flex';
  }

  // Plane landing
  if(isPlane){
    setTimeout(() => {
      plane.classList.add('land');
    }, 3000);
  }

  // Bus stop
  if(!isPlane){
    setTimeout(() => {
      bus.classList.add('bus-stop');
    }, 3000);
  }

  // Hide loader
  setTimeout(() => {
    loader.classList.add('hide');
  }, 4000);
});


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
        `translate(-50%, calc(-50% + ${currentScroll * 0.15}px))`;
    }

  requestAnimationFrame(animate);
}
animate();

const isMobile = window.innerWidth < 768;

if(parallaxBg){
  const speed = isMobile ? 0.05 : 0.15;
  parallaxBg.style.transform =
    `translate(-50%, calc(-50% + ${currentScroll * speed}px))`;
}


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
