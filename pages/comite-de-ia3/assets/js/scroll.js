// Selecciona todos los enlaces en el navbar
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Previene el comportamiento por defecto del enlace
  
      // Selecciona el elemento con el id correspondiente al href del enlace
      const section = document.querySelector(this.getAttribute('href'));
      
      // Desplazamiento suave hacia la sección
      section.scrollIntoView({
        behavior: 'smooth' // Opciones: 'auto' o 'smooth'
      });
    });
  });
  