
const sheetId = "1jEN99e5ToShZuOIWY8DC3LXuA6QCVFk-kgQeLsQdTxA"; // Reemplaza con tu propio ID de Google Sheet 
const sheetName = "Eventos"; // Nombre de la hoja, ajusta según corresponda
const apiKey = "AIzaSyBkc05qw0wIMkG2uvIpJZH4Q0DyHaM4dec"; // Reemplaza con tu propia API Key 

const getData = async () => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data.values;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

const convertDropboxLink = (url) => {
  if (url.includes("dropbox.com")) {
    return url
      .replace("www.dropbox.com", "dl.dropboxusercontent.com")
      .replace("?dl=0", "");
  }
  return url;
};

const createSlide = (title, description, imageUrl, url, locationUrl) => {
const processedImageUrl = convertDropboxLink(imageUrl);
const descriptionWithLink = locationUrl ? `${description} <br/><a href="${locationUrl}" target="_blank" style="color: #f7921e;">¿Como llegar?</a>` : description;

return `
    <div class="swiper-slide">
        <img src="${processedImageUrl}" alt="${title}">
        <div class="slide-caption">
            <h2 class="tit_noticias" ><a href="${url}" target="_blank" class="titulo_noticias" >${title}</a></h2>
            <p style="color: #ffff;">${descriptionWithLink}</p>
        </div>
    </div>
`;
};


const initializeSwiper = () => {
  new Swiper(".swiper-container", {
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  });
};
const loadSlides = async () => {
const data = await getData();
const swiperWrapper = document.getElementById("swiper-wrapper");
data.slice(1).forEach((row) => {
const [imageUrl, title, description, url, locationUrl] = row; // Incluye la URL de Maps aquí
swiperWrapper.innerHTML += createSlide(imageUrl, title, description, url, locationUrl);
});
initializeSwiper();
};

document.addEventListener("DOMContentLoaded", loadSlides);
