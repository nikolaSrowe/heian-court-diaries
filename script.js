const scroller = scrollama();

const images = [
  "assets/heian-court-courting.jpg",
  "assets/murasaki_shikibu.webp", 
  "assets/Tale-of-Genji.jpg",
  "assets/court-lady.jpg",
  "assets/heian-ceremony.jpg",
  "assets/woman-and-man.jpg",
  "assets/ladies-inside.jpg",
  "assets/heian-woman.jpg"
];

function init() {
  scroller
    .setup({
      step: '.step',          // Element that triggers a step
      offset: 0.5,            // How far from the top of the viewport to trigger a step
      debug: false            // Set to true to see trigger points
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);
  window.addEventListener('resize', scroller.resize);
}


function handleStepEnter(response) {
  response.element.classList.add('is-active');

  const index = response.index;
  const graphic = document.getElementById('graphic');
  graphic.src = images[index];
  document.querySelector('.scroll-graphic').classList.add('is-active');
  
 
  graphic.style.transform = 'scale(1.03)';
  setTimeout(() => {
    graphic.style.transform = 'scale(1)';
  }, 300);
}

function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

window.onscroll = function() {
  updateProgressBar();
};

function handleStepExit(response) {
  response.element.classList.remove('is-active');
  if (response.index === -1 || response.index === images.length) {
    document.querySelector('.scroll-graphic').classList.remove('is-active');
  }
}

function handleHeaderScroll() {
  const header = document.querySelector('.site-header');
  const content = document.querySelector('.header-content');
  const scrollTop = window.pageYOffset;
  const headerHeight = header.offsetHeight;

  // Calculate progress - how far we've scrolled relative to header height
  const progress = Math.min(scrollTop / (headerHeight * 0.7), 1);
  
  // Make header completely transparent when progress is 1
  header.style.opacity = 1 - progress;
  
  // Make content fade out faster than the header
  content.style.opacity = 1 - (progress * 1.5);
  content.style.transform = `translateY(${progress * 50}px)`;
  
  // Only show header when it hasn't fully scrolled past
  if (progress >= 1) {
    header.style.visibility = 'hidden';
  } else {
    header.style.visibility = 'visible';
  }
}

window.addEventListener('scroll', handleHeaderScroll);

document.addEventListener('DOMContentLoaded', init);

function setupScrollDots() {
  const steps = document.querySelectorAll('.step');
  const container = document.getElementById('scrollDots');
  steps.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    container.appendChild(dot);
  });
}

function updateScrollDots() {
  const steps = document.querySelectorAll('.step');
  const dots = document.querySelectorAll('.scroll-progress-dots .dot');
  let activeIndex = 0;

  steps.forEach((step, i) => {
    const rect = step.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.2; // 20% from top
    if (rect.top <= triggerPoint) {
      activeIndex = i;
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}


document.addEventListener('DOMContentLoaded', setupScrollDots);
window.addEventListener('scroll', updateScrollDots);

function setupQuoteCarousels() {
  const carousels = document.querySelectorAll('.quote-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.quote-track');
    const slides = carousel.querySelectorAll('.quote-slide');
    const dotsContainer = carousel.querySelector('.quote-dots');
    let currentIndex = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    const update = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      const dots = dotsContainer.querySelectorAll('span');
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    };

    carousel.querySelector('.quote-nav.prev').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      update();
    });

    carousel.querySelector('.quote-nav.next').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      update();
    });
  });
}

document.addEventListener('DOMContentLoaded', setupQuoteCarousels);

