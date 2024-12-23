const scriptURL = 'https://script.google.com/macros/s/AKfycbyYWqwdox3QCHhS4hQ6EbPlvWhOKlLgizc6xmqzH8OsFp1Czdl7wvZfFoyPj4RAJP3RQw/exec';
const form = document.forms['contact-form'];
const dateField = document.getElementById('fecha-envio'); // Campo oculto de fecha
const loadingOverlay = document.getElementById('loading-overlay'); // Overlay de carga
const thankYouMessage = document.getElementById('thank-you-message'); // Mensaje de agradecimiento

// Función para mostrar el overlay
function showLoadingOverlay() {
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
    console.log("Overlay de carga mostrado");
  }
}

// Función para ocultar el overlay
function hideLoadingOverlay() {
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
    console.log("Overlay de carga ocultado");
  }
}

// Manejar el envío del formulario
form.addEventListener('submit', e => {
  e.preventDefault();

  // Captura la fecha y hora actual
  const now = new Date();
  dateField.value = now.toISOString();

  console.log("Fecha de envío:", dateField.value); // Verificación

  // Mostrar el overlay de carga
  showLoadingOverlay();

  // Enviar los datos del formulario
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      console.log("¡Formulario enviado exitosamente!");

      // Ocultar overlay de carga
      hideLoadingOverlay();

      // Ocultar el formulario
      form.style.display = "none";

      // Mostrar mensaje de agradecimiento
      if (thankYouMessage) {
        thankYouMessage.style.display = "block";
        thankYouMessage.classList.add("fade-in");
      }

      // Vaciar los campos del formulario
      form.reset();
    })
    .catch(error => {
      console.error('¡Error al enviar!', error.message);

      // Ocultar overlay de carga en caso de error
      hideLoadingOverlay();
    });
});
