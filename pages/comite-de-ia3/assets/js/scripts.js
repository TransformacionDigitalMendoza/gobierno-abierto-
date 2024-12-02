// Configura el ID de tu Google Sheet y tu API key
const spreadsheetId = '1Oxo28I9f1AN_fO15lqfxHVJulg3ExI78EqKDxDlqxZw';
const apiKey = 'AIzaSyCUYmJzp3iL-dc6qKYg8-hUjZBkQBBxKg4';


// URL de la API de Google Sheets
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`;

// Función para obtener los datos de la Google Sheet
async function fetchSheetData() {
  try {
    const response = await fetch(url);
    
    // Verificamos si la respuesta es correcta
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    // Verificar si data y data.values existen
    if (!data || !data.values) {
      throw new Error('No se encontraron valores en la respuesta de la API');
    }

    return data.values;
  } catch (error) {
    console.error('Error al obtener datos de la Google Sheet:', error);
  }
}

// Función para construir el carrusel
function buildCarousel(items) {
  const carousel = document.getElementById('carousel');
  const dots = document.getElementById('carousel-dots');
  
  items.forEach((item, index) => {
    const [titulo, descripcion, imageUrl, link] = item;
    
    // Validar que el link de la imagen sea un enlace directo de Dropbox
    let isDropboxImage = imageUrl.includes("dropbox.com");
    
    // Si es un enlace estándar de Dropbox, convertir a formato directo
    let directImageUrl = imageUrl;
    if (isDropboxImage) {
      directImageUrl = imageUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "?raw=1");
    }

    // Si no es un enlace directo de Dropbox, omitimos este item
    if (!directImageUrl.includes("dl.dropboxusercontent.com")) {
      console.warn(`El enlace de imagen no es un enlace directo de Dropbox: ${imageUrl}`);
      return;
    }

    // Crear el contenedor del slide
    const slide = document.createElement('div');
    slide.classList.add('carousel-item');

    // Crear el contenido de texto y la imagen solo si es de Dropbox
    const content = `
      <div class="carousel-content">
        <h2>${titulo}</h2>
        <p>${descripcion}</p>
        <a href="${link}" target="_blank">Conocer más</a>
      </div>
      <div class="carousel-image">
        <img src="${directImageUrl}" alt="${titulo}">
      </div>
    `;

    slide.innerHTML = content;
    carousel.appendChild(slide);

    // Crear el punto de navegación
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // El primer elemento activo
    dots.appendChild(dot);

    // Añadir funcionalidad para navegar entre slides
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });

  showSlide(0); // Mostrar el primer slide
}

// Función para mostrar el slide actual
function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'flex' : 'none';
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Iniciar la carga de los datos al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchSheetData();
  
  // Verificamos si los datos están definidos antes de continuar
  if (data) {
    buildCarousel(data.slice(1)); // Saltar el encabezado de la sheet
  } else {
    console.error('No se pudieron obtener los datos. Verifica la API o la hoja de cálculo.');
  }
});
let currentSlideIndex = 0;
let startX, endX;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');

  // Ajustar el índice de acuerdo al rango de slides disponibles
  if (index >= slides.length) {
    currentSlideIndex = 0; // Volver al primer slide
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1; // Ir al último slide
  } else {
    currentSlideIndex = index;
  }

  slides.forEach(slide => {
    slide.style.display = 'none';
  });

  slides[currentSlideIndex].style.display = 'flex';

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlideIndex);
  });
}

// Función para detectar el inicio del toque o clic
function startSwipe(e) {
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

// Función para detectar el final del toque o clic y determinar la dirección
function endSwipe(e) {
  endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
  if (startX > endX + 50) {
    moveSlide(1); // Deslizar a la derecha
  } else if (startX < endX - 50) {
    moveSlide(-1); // Deslizar a la izquierda
  }
}

// Función para cambiar el slide
function moveSlide(direction) {
  const nextIndex = currentSlideIndex + direction;
  showSlide(nextIndex);
}

// Event listeners para el arrastre en dispositivos táctiles y de escritorio
const carousel = document.getElementById('carousel');
carousel.addEventListener('mousedown', startSwipe);
carousel.addEventListener('mouseup', endSwipe);
carousel.addEventListener('touchstart', startSwipe);
carousel.addEventListener('touchend', endSwipe);

// Inicializar el carrusel mostrando el primer slide
window.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchSheetData();
  if (data) {
    buildCarousel(data.slice(1)); // Cargar los datos en el carrusel
    showSlide(0); // Mostrar el primer slide
  } else {
    console.error('No se pudieron obtener los datos. Verifica la API o la hoja de cálculo.');
  }
});
