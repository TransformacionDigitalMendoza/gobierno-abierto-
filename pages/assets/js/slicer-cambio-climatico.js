const videoItems = document.querySelectorAll('.video-item');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');

let currentIndex = 0;

// Datos de título y descripción para cada video
const videoData = [
    {
        title: "Intervención Avenida Mitre",
        description: "El proyecto buscó transformar la Av. Mitre de la Ciudad de Mendoza en un centro urbano sostenible mediante la promoción de la movilidad peatonal, la reducción de la velocidad vehicular y el embellecimiento del área con actividades innovadoras y diseños creativos."
    },
    {
        title: "EN BUSCA DE LA CIUDAD DE 15 MINUTOS",
        description: "El proyecto buscó abordar los problemas derivados del rápido crecimiento urbano y la dependencia del automóvil en la Ciudad de Mendoza, promoviendo el concepto de ciudad de 15 minutos, donde los residentes tienen acceso a servicios esenciales a pie o en bicicleta. La urbanización acelerada ha llevado a altos niveles de contaminación, accidentes de tráfico y sedentarismo, impactando negativamente la salud y el ambiente. La propuesta incluyó una campaña educativa y lúdica para aumentar la conciencia sobre los beneficios de caminar y andar en bicicleta, reducir el uso del automóvil y mejorar la calidad de vida urbana. La campaña incluyó cartelería, charlas en escuelas y universidades, y un encuentro lúdico  para descubrir servicios cercanos."
    },
    {
        title: "Desafío de Movilidad Sostenible",
        description: "El proyecto buscó mejorar la movilidad sostenible en la Ciudad de Mendoza mediante la optimización de la red de ciclovías. Se realizaron mapeos para identificar zonas con falta de conectividad, como así también cruces conflictivos. Asimismo, se instaló señalética en 5 cruces peligrosos y se organizaron talleres de educación vial para promover el uso seguro y responsable de las ciclovías."
    },
    {
        title: "ECO - FAVO al rescate!",
        description: "Este proyecto buscó la erradicación de los microbasurales que se encuentran en las cercanías del Colegio San Antonio María Claret, en La Favorita, mediante jornadas de limpieza, educación ambiental y reforestación con flora nativa, involucrando a la comunidad para fomentar prácticas sostenibles y crear un modelo replicable para otras áreas."
    },
    {
        title: "Hackathon: “Ideando la Sostenibilidad”",
        description: "El proyecto consistió en un programa educativo en modalidad Hackathon dirigido a estudiantes de 4to y 5to año de secundaria en Ciudad de Mendoza. Durante tres meses, los participantes adquirieron conocimientos sobre desarrollo sostenible, economía circular y cambio climático mediante un campus virtual y actividades presenciales. Posteriormente, presentaron proyectos con soluciones sostenibles para problemáticas locales, con el apoyo de profesionales. Al final, los mejores proyectos recibieron financiamiento para su implementación. El objetivo fue capacitar a jóvenes en habilidades técnicas y blandas, fomentar el liderazgo y empoderar a futuros emprendedores para que contribuyan a la sostenibilidad y mitigación del cambio climático."
    },
    {
        title: "Medición de la Huella de Carbono",
        description: "El proyecto se enfocó en evaluar la huella de carbono de la Legislatura de Mendoza, con el fin de identificar fuentes de emisiones de gases de efecto invernadero (GEI) y diseñar estrategias efectivas para mitigar su impacto ambiental."
    },
    {
        title: "Huerta Agroecológica como ",
        description: "El proyecto buscó restaurar el suelo y promover prácticas agroecológicas en la Huerta del Liceo Agrícola y Enológico, ubicada en el Ambiente Natural Pedemonte de la Ciudad de  Mendoza. Se implementó un sistema de compostaje usando residuos orgánicos de la escuela y guano caprino del Puesto Leiva, mejorando la calidad del suelo y fomentando la biodiversidad local. A través de actividades educativas y la participación comunitaria, se buscó  sensibilizar sobre sostenibilidad y economía circular. Como resultado aumentó la conciencia ambiental y el compromiso en prácticas sostenibles por parte de estudiantes y la comunidad."
    },
    {
        title: "Construyendo sueños: Ladrillos ecológicos",
        description: "Alumnos de la Escuela Joaquín Lavado, fabricaron bancos utilizando botellas PET recicladas. Este proyecto integró bioconstrucción y educación ambiental, ofreciendo a los estudiantes habilidades prácticas y una herramienta económica para sus familias. Al no requerir cocción, estos ladrillos implican la disminución de las emisiones de Gases de Efecto Invernadero y un menor consumo de recursos naturales. "
    },
    {
        title: "LOMBRICOMPOSTAJE EN LA ESCUELA",
        description: "El proyecto buscó abordar la contaminación y el riesgo para la salud pública ocasionados por la mala disposición de residuos orgánicos en las escuelas mediante la implementación de un sistema de compostaje con lombrices. Este sistema permitió transformar los residuos orgánicos de la Escuela del Magisterio en compost, mejorando la gestión de desechos y fomentando valores de protección ambiental entre los estudiantes. Los resultados incluyeron la creación de un compostador escolar, la generación de compost para espacios educativos y municipales y la capacitación de los estudiantes sobre el ciclo de descomposición y manejo de residuos."
    },
    {
        title: "Misión basura: Avenida Las Heras",
        description: "A través de este proyecto, se investigó y realizó un muestreo sobre los volúmenes de grandes generadores de residuos ubicados en Avenida Las Heras, Ciudad de Mendoza. Así, se propuso implementar estrategias efectivas para su reciclaje y la promoción de prácticas sostenibles. Además, se buscó sensibilizar y educar tanto al personal y clientes de los comercios, como a estudiantes de colegios secundarios, fomentando la preservación y cuidado de nuestra Ciudad."
    },
    {
        title: "Prohibido NO JUGAR",
        description: "A partir de recursos lúdicos y participativos, el proyecto promovió un acercamiento a la biodiversidad del Parque Deportivo de Montaña de la Ciudad de Mendoza. En este sentido, a través de la creación de una app móvil, y de la instalación de equipamiento y cartelería, se buscó transmitir a los visitantes conocimientos sobre la biodiversidad nativa y el ambiente de Mendoza, generando conciencia sobre la importancia de cuidar activamente nuestro sistema natural. "
    },
    {
        title: "Taller COREME Recuperadoras Recreando",
        description: "A través de este proyecto se abordó el problema de los residuos textiles, promoviendo la reutilización de materiales que, de otro modo, terminarían en vertederos. En este sentido, las mujeres de la Cooperativa de Recuperadores Urbanos (COREME) aprendieron a confeccionar prendas utilizando modernas máquinas de coser industriales, adquiridas especialmente para el proyecto. La iniciativa no sólo abordó la reducción de residuos, sino que también empoderó a las participantes al brindarles herramientas para el desarrollo de nuevas habilidades productivas."
    },
    {
        title: "Alquimia Urbana: De Residuos a Recursos",
        description: "El proyecto Alquimia Urbana: De Residuos a Recursos utilizó el arte urbano para concientizar sobre la importancia de gestionar, separar y reciclar los residuos. Los murales en espacios públicos captan la atención, educan y motivan a la comunidad a adoptar prácticas sostenibles. Inspirado en la alquimia, el proyecto muestra cómo los desechos pueden transformarse en recursos valiosos. El arte urbano rompe barreras de comunicación y llega a todas las personas, fomentando una cultura de reciclaje y sostenibilidad. Así, se promueve una ciudad más limpia y comprometida con el medio ambiente, demostrando que el arte puede transformar la realidad."
    },
    {
        title: "Valorización de las principales plazas de la ciudad de Mendoza",
        description: `
            <p>El objetivo del proyecto fue poner en valor la diversidad y función de las principales plazas de la Ciudad de Mendoza (Plaza Independencia, Plaza Chile, Plaza Italia, Plaza San Martín y Plaza España), como modelos de mejoramiento ambiental frente a los procesos de cambio climático.</p>
            <p>Las actividades ejecutadas incluyeron:</p>
            <ul>
                <li>Identificación de especies, determinación de su estado sanitario y cobertura.</li>
                <li>Encuestas de percepción ciudadana sobre las principales plazas de la Ciudad.</li>
                <li>Obtención de datos de temperatura y humedad en espacios verdes y pavimentados, para comparar dichos valores.</li>
            </ul>
        `
    },
    // Agrega más títulos y descripciones según los videos
];

// Función para pausar todos los videos
function pauseAllVideos() {
    videoItems.forEach((item) => {
        const video = item.querySelector('video');
        if (video) {
            video.pause();  // Pausar el video si está reproduciéndose
            video.currentTime = 0;  // Reinicia el video al inicio
        }
    });
}

function showVideo(index) {
    // Pausar todos los videos antes de cambiar
    pauseAllVideos();

    // Cambiar la clase activa al nuevo video
    videoItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Actualizar título y descripción
    videoTitle.textContent = videoData[index].title;
    videoDescription.innerHTML = videoData[index].description;  // Usamos innerHTML para que interprete las etiquetas <ul>, <p>, etc.

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === videoItems.length - 1;
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showVideo(currentIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < videoItems.length - 1) {
        currentIndex++;
        showVideo(currentIndex);
    }
});

showVideo(currentIndex);