// URL de la hoja de cálculo publicada como CSV
const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRZ4VrBsCDW9sWfBrxbMufwZO7nr8Mxm1LbEsVORG5js8-M9A_ex_4TjUXkNUdtCAsuJjIjmCC7ogzP/pub?output=csv';

// Asociar iconos específicos con cada KPI usando el nombre
const iconMap = {
  "Datasets abiertos": "fa-database",
  "Pedidos de Información Pública": "fa-file-alt",
  "Consultas al Chatbot": "fa-comments",
  "Datos en el inventario de datos": "fa-chart-bar",
  "Familias con Alarmas Comunitarias": "fa-bell",
  "Ojos en Alerta Capacitados": "fa-eye"
};

async function fetchKpiData() {
  try {
    const response = await fetch(sheetUrl);
    const data = await response.text();
    const rows = data.split('\n').slice(1); // Ignorar encabezados
    const kpis = rows.map(row => {
      const [name, value] = row.split(',');
      return { name: name.trim(), value: parseInt(value, 10) };
    });
    return kpis;
  } catch (error) {
    console.error('Error al obtener los datos de la Google Sheet:', error);
    return [];
  }
}

// Generar los elementos KPI dinámicamente y animarlos
document.addEventListener('DOMContentLoaded', async () => {
  const kpiContainer = document.querySelector('.kpi-container');
  const kpis = await fetchKpiData();

  if (kpis.length) {
    kpiContainer.innerHTML = ''; // Limpiar cualquier contenido existente
    kpis.forEach(kpi => {
      // Crear el elemento KPI
      const kpiElement = document.createElement('div');
      kpiElement.className = 'kpi';
      
      // Obtener el icono correspondiente desde el mapa de iconos
      const iconClass = iconMap[kpi.name] || 'fa-circle'; // Icono por defecto si no se encuentra
      
      kpiElement.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <div class="kpi-label">${kpi.name}</div>
        <span class="kpi-value">0</span>
      `;
      
      kpiContainer.appendChild(kpiElement);
      
      // Iniciar animación de conteo
      animateCount(kpiElement.querySelector('.kpi-value'), kpi.value);
    });
  }
});

// Función de conteo animado
function animateCount(element, target) {
  let start = 0;
  const duration = 2000; // Duración de la animación en milisegundos
  const increment = target / (duration / 16); // Incremento en cada frame
  
  const updateCount = () => {
    start += increment;
    if (start < target) {
      element.textContent = `+${Math.floor(start)}`;
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = `+${target}`;
    }
  };
  updateCount();
}