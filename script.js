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