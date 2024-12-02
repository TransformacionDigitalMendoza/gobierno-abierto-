// Función para animar el conteo
function animateCount(element, target) {
    let start = 0;
    const duration = 2000; // duración de la animación
    const increment = target / (duration / 16); // incremento en cada frame
    
    const updateCount = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target;
      }
    };
    updateCount();
  }

  // Ejemplo de cómo activar la animación de conteo con valores de ejemplo
  document.addEventListener('DOMContentLoaded', () => {
    const kpis = document.querySelectorAll('.kpi-value');
    const values = [100, 200, 300]; // Valores de ejemplo; estos serán dinámicos en el paso 2
    
    kpis.forEach((kpi, index) => animateCount(kpi, values[index]));
  });