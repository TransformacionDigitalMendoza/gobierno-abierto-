const scriptURL = 'https://script.google.com/macros/s/AKfycbyYWqwdox3QCHhS4hQ6EbPlvWhOKlLgizc6xmqzH8OsFp1Czdl7wvZfFoyPj4RAJP3RQw/exec';
  const form = document.forms['contact-form'];

  // Función para mostrar el overlay de carga
  function showLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('hidden');
      console.log("Overlay de carga mostrado");
    } else {
      console.error("No se encontró el overlay de carga en el DOM");
    }
  }

  // Función para ocultar el overlay de carga
  function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.add('hidden');
      console.log("Overlay de carga ocultado");
    } else {
      console.error("No se encontró el overlay de carga en el DOM");
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    showLoadingOverlay();

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        hideLoadingOverlay();
        console.log("¡Formulario enviado exitosamente!");

        // Mostrar mensaje de agradecimiento y ocultar el formulario
        form.style.display = "none"; // Ocultar el formulario
        const thankYouMessage = document.getElementById("thank-you-message");
        thankYouMessage.style.display = "block"; // Mostrar el mensaje de agradecimiento
        thankYouMessage.classList.add("fade-in");

        // Vaciar los campos del formulario
        form.reset();
      })
      .catch(error => {
        hideLoadingOverlay();
        console.error('¡Error al enviar!', error.message);
      });
  });