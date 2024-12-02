// script.js
const carousel = document.querySelector('.carousel');

// Pausa la animación al pasar el mouse
carousel.addEventListener('mouseover', () => {
  carousel.style.animationPlayState = 'paused';
});


carousel.addEventListener('mouseout', () => {
  carousel.style.animationPlayState = 'running'; // Reactiva la animación
});
