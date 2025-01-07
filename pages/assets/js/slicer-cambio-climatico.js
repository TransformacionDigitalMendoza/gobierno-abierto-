const videoItems = document.querySelectorAll('.video-item');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');

let currentIndex = 0;

// Datos de título y descripción para cada video
const videoData = [
    {
        title: "Avenida Mitre",
        description: "El proyecto busca transformar la Av. Mitre en Mendoza en un centro urbano sostenible mediante la promoción de la movilidad peatonal, la reducción de la velocidad vehicular y el embellecimiento del área con actividades innovadoras y diseños creativos. Integrará tecnologías para la gestión de servicios y formará ciudadanos responsables, contribuyendo al desarrollo socioeconómico de la zona y al respeto por el medio ambiente. Se espera mejorar la calidad de vida, fomentar la interacción social y reducir la contaminación, creando un entorno urbano más atractivo y sostenible."
    },
    {
        title: "EN BUSCA DE LA CIUDAD DE 15 MINUTOS",
        description: "El proyecto busca abordar los problemas derivados del rápido crecimiento urbano y la dependencia del automóvil en Mendoza, promoviendo el concepto de ciudad de 15 minutos, donde los residentes tienen acceso a servicios esenciales a pie o en bicicleta. La urbanización acelerada ha llevado a alta contaminación, accidentes de tráfico y sedentarismo, impactando negativamente la salud y el ambiente. La propuesta incluye una campaña educativa y lúdica durante la Semana de la Movilidad para aumentar la conciencia sobre los beneficios de caminar y andar en bicicleta, reducir el uso del automóvil y mejorar la calidad de vida urbana. La campaña incluirá señalética informativa, charlas en escuelas y universidades, y una búsqueda del tesoro urbana para descubrir servicios cercanos."
    },
    {
        title: "Desafío de Movilidad Sostenible",
        description: "El proyecto busca mejorar la movilidad sostenible en la Ciudad de Mendoza mediante la optimización de la red de ciclovías y estaciones de Bici Tran. Se realizarán mapeos para identificar desconexiones y cruces conflictivos, se implementará señalización adecuada y se organizarán talleres de educación vial para promover el uso seguro y responsable de las ciclovías. El objetivo es reducir emisiones de gases de efecto invernadero, descongestionar el tráfico y fomentar prácticas de movilidad sostenible, contribuyendo así a la mitigación del cambio climático y mejorando la calidad de vida urbana."
    },
    {
        title: "ECO - FAVO al rescate!",
        description: "Erradicar los microbasurales que se encuentran en la cercanía del Colegio San Antonio María Claret en La Favorita mediante jornadas de limpieza, educación ambiental y reforestación con flora nativa, involucrando a la comunidad para fomentar prácticas sostenibles y crear un modelo replicable para otras áreas."
    },
    {
        title: "Hackathon: “Ideando la Sostenibilidad”",
        description: "El proyecto consiste en un programa educativo en modalidad Hackathon dirigido a estudiantes de 4to y 5to año de secundaria en Mendoza. Durante tres meses, los participantes adquirirán conocimientos sobre desarrollo sostenible, economía circular y cambio climático mediante un campus virtual y actividades presenciales. Posteriormente, deberán idear soluciones sostenibles para problemáticas locales, con el apoyo de profesionales. Al final, los mejores proyectos recibirán financiamiento para su implementación. El objetivo es capacitar a jóvenes en habilidades técnicas y blandas, fomentar el liderazgo y empoderar a futuros emprendedores para que contribuyan a la sostenibilidad y mitigación del cambio climático."
    },
    {
        title: "Medición de la Huella de Carbono",
        description: "El proyecto se enfoca en evaluar la huella de carbono de la Legislatura de Mendoza para identificar fuentes de emisiones de gases de efecto invernadero (GEI) y diseñar estrategias efectivas para mitigar su impacto ambiental. La falta de un inventario detallado impide abordar adecuadamente la reducción de emisiones y la adaptación al cambio climático. El proyecto, alineado con los ODS relacionados con la acción climática y la sostenibilidad, incluirá la elaboración de un Inventario de Gases de Efecto Invernadero (IGEI), el desarrollo de un plan de reducción y compensación de emisiones, y la obtención de certificación internacional. Además, se publicarán informes de progreso y se creará un modelo replicable para otras instituciones."
    },
    {
        title: "Huerta Agroecológica como ",
        description: "El proyecto busca restaurar el suelo y promover prácticas agroecológicas en la Huerta del Liceo Agrícola y Enológico, ubicada en el Ambiente Natural Pedemonte de Mendoza. Se implementará un sistema de compostaje usando residuos orgánicos de la escuela y guano caprino del Puesto Leiva para mejorar la calidad del suelo y fomentar la biodiversidad local. A través de actividades educativas y la participación comunitaria, se pretende sensibilizar sobre sostenibilidad y economía circular. Los resultados esperados incluyen la mejora del suelo, mayor conciencia ambiental y un compromiso activo en prácticas sostenibles por parte de estudiantes y la comunidad."
    },
    {
        title: "Construyendo sueños: Ladrillos ecológicos",
        description: "La Escuela Joaquín Lavado, busca fabricar ecoladrillos utilizando botellas PET recicladas para mejorar la infraestructura local y reducir el impacto ambiental de la basura plástica. Este proyecto integra bioconstrucción y educación ambiental, ofreciendo a los estudiantes habilidades prácticas y una herramienta económica para sus familias. Los ecoladrillos, al no requerir cocción, disminuyen las emisiones de CO2 y el consumo de recursos naturales. Además, se expanden a la producción de otros productos reciclables, promoviendo un impacto positivo y sostenible en la comunidad."
    },
    {
        title: "LOMBRICOMPOSTAJE EN LA ESCUELA",
        description: "El proyecto busca abordar la contaminación y el riesgo para la salud pública ocasionados por la mala disposición de residuos orgánicos en las escuelas mediante la implementación de un sistema de compostaje. Este sistema permitirá transformar residuos orgánicos en compost, mejorando la gestión de desechos y fomentando valores de protección ambiental entre los estudiantes. Los resultados esperados incluyen la creación y mantenimiento de un compostador escolar, reducción de residuos orgánicos, generación de compost para espacios educativos y municipales, y la integración de actividades educativas sobre el ciclo de descomposición y manejo de residuos."
    },
    {
        title: "Misión basura: Avenida Las Heras",
        description: "Investigar y realizar un muestreo sobre los volúmenes de estos grandes productores de residuos(ubicados en Avenida Las Heras,) y así lograr implementar efectivas estrategias para su debido reciclaje y promoción de prácticas sostenibles. Asimismo, se busca sensibilizar y educar tanto al personal y clientes de los comercios como a estudiantes de colegios secundarios para fomentar la preservación y cuidado del medio en el que vivimos."
    },
    {
        title: "Prohibido NO JUGAR",
        description: "Promover un acercamiento a la biodiversidad del Parque Deportivo de Montaña a partir de recursos lúdicos y participativos, promoviendo estímulos que motiven su conocimiento y cuidado.Sostenemos la importancia de involucrar, tanto a los ciudadanos de la provincia de Mendoza como a los visitantes, en actividades que permitan su implicancia como parte activa de los sistemas naturales."
    },
    {
        title: "Taller COREME Recuperadoras Recreando",
        description: "El proyecto aborda la gestión inadecuada de residuos textiles en Mendoza, que suelen terminar en vertederos y contribuyen al cambio climático y la contaminación. El mismo propone reutilizar estos materiales mediante la adquisición de máquinas de coser industriales y la capacitación en costura para las mujeres de la Cooperativa de Recuperadores Urbanos (COREME) en el Distrito 33. Los resultados esperados incluyen la creación de empleo, la producción sostenible de nuevas prendas recicladas y la reducción del desperdicio de telas, contribuyendo así a la conservación de recursos naturales y el desarrollo económico local."
    },
    {
        title: "Todo vuelve",
        description: " Es una campaña de comunicación y de sensibilización sobre la economía circular desde la economía circular, que nos invita a pensar de manera más consciente y a promover acciones como la reutilización, el reciclaje y la reducción de estos desechos."
    },
    {
        title: "Valorización de las principales plazas de la ciudad de Mendoza",
        description: "Valorizar la diversidad y función de las principales plazas de la ciudad de Mendoza, como modelos de mejoramiento ambiental frente a los procesos de cambio climático.-Conocer la diversidad de nuestras plantas, sus funciones y beneficios ambientales.-Generar recursos didácticos para educación ambiental orientados a diferentes niveles e instituciones.-Articular con la Municipalidad de la Capital las posibles acciones generadas por nuestra propuesta."
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

// Función para mostrar el video actual y actualizar el contenido
function showVideo(index) {
    // Pausar todos los videos antes de cambiar
    pauseAllVideos();

    // Cambiar la clase activa al nuevo video
    videoItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    // Actualizar título y descripción
    videoTitle.textContent = videoData[index].title;
    videoDescription.textContent = videoData[index].description;

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