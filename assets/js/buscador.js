document.addEventListener('DOMContentLoaded', () => {
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const clearInput = document.getElementById('clearInput');

  // Mostrar/ocultar el buscador al hacer clic en la lupa
  searchToggle.addEventListener('click', () => {
    searchInput.classList.toggle('active'); // Mostrar/ocultar el input
    searchInput.focus(); // Colocar el foco en el input si se despliega
  });

  // Mostrar/ocultar la equis según el contenido del input
  searchInput.addEventListener('input', () => {
    clearInput.style.display = searchInput.value ? 'block' : 'none';
  });

  // Borrar el contenido del input al hacer clic en la equis
  clearInput.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar que el botón cause otros comportamientos
    searchInput.value = ''; // Limpiar el texto
    clearInput.style.display = 'none'; // Ocultar la equis
    searchResults.innerHTML = ''; // Limpiar los resultados del buscador
    searchResults.style.display = 'none'; // Ocultar el contenedor de resultados
    searchInput.focus(); // Volver a enfocar el input
  });

  // Lógica del buscador (reutiliza la funcionalidad previa)
  const sections = [];
  document.querySelectorAll('section, .botonera-grid').forEach((section) => {
    section.querySelectorAll('h2, h3, h4').forEach((header) => {
      const parentLink = header.closest('a');
      const textContent = header.textContent.trim();
      if (!sections.some(item => item.text === textContent)) {
        sections.push({
          id: section.id || null,
          text: textContent,
          href: parentLink ? parentLink.href : null,
        });
      }
    });
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    if (query.trim() === '') {
      searchResults.style.display = 'none';
      return;
    }

    const filteredSections = sections.filter(section =>
      section.text.toLowerCase().includes(query)
    );

    if (filteredSections.length > 0) {
      filteredSections.forEach(section => {
        const resultItem = document.createElement('a');
        resultItem.textContent = section.text;
        if (section.href) {
          resultItem.href = section.href;
          resultItem.target = '_blank';
        } else if (section.id) {
          resultItem.href = `#${section.id}`;
        }
        searchResults.appendChild(resultItem);
      });
      searchResults.style.display = 'block';
    } else {
      searchResults.style.display = 'none';
    }
  });

  // Ocultar resultados al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchToggle) {
      searchResults.style.display = 'none';
    }
  });
});
