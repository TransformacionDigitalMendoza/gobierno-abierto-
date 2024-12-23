// Obtener elementos del DOM
const postularBtn = document.getElementById('postularBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

const voteBtn = document.getElementById('voteBtn');
const voteModal = document.getElementById('voteModal');
const closeVoteModal = document.getElementById('closeVoteModal');

// Abrir el modal al hacer clic en "Postulá Ahora"
postularBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Evita que el enlace recargue la página
  modal.style.display = 'flex'; // Mostrar el modal
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeModal.addEventListener('click', () => {
  modal.style.display = 'none'; // Ocultar el modal
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none'; // Ocultar el modal
  }
});

// Abrir el modal al hacer clic en "Votá Ahora"
voteBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Evita que el enlace recargue la página
  voteModal.style.display = 'flex'; // Mostrar el modal
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeVoteModal.addEventListener('click', () => {
  voteModal.style.display = 'none'; // Ocultar el modal
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
  if (event.target === voteModal) {
    voteModal.style.display = 'none'; // Ocultar el modal
  }
});
