const scroller = scrollama();

const images = [
  "assets/main-art.jpg",
  "assets/murasaki-tale-genji.jpg", 
  "assets/Izumi_Shikibu.png",
  "assets/lady-sarashina.jpg",
  "assets/heian-art.jpg"
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
  
  // Add an animation effect when transitioning between images
  graphic.style.transform = 'scale(1.03)';
  setTimeout(() => {
    graphic.style.transform = 'scale(1)';
  }, 300);
}

function handleStepExit(response) {
  response.element.classList.remove('is-active');
  if (response.index === -1 || response.index === images.length) {
    document.querySelector('.scroll-graphic').classList.remove('is-active');
  }
}

document.addEventListener('DOMContentLoaded', init);