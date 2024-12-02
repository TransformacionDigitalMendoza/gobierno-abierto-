
document.addEventListener('DOMContentLoaded', function() {
    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        
        details.addEventListener('toggle', function() {
            if (details.open) {
                summary.textContent = 'Leer menos...';
            } else {
                summary.textContent = 'Leer más...';
            }
        });
    });
});
