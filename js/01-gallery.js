import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
// Реализация делегирования на ul.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

const galleryEl = document.querySelector(".gallery");
const imgCards = createImgCards(galleryItems);
galleryEl.insertAdjacentHTML("beforeend", imgCards);

galleryEl.addEventListener("click", onImgCardsClick);

function createImgCards(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

function onImgCardsClick(evt) {
  evt.preventDefault();
  const isImgEl = evt.target.classList.contains("gallery__image");
  if (!isImgEl) {
    return;
  }
  console.log(evt.target);

  const imageSrc = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `
    <img src="${imageSrc}" width="800" height="600">
`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscapeClick);
        console.log("onShow", instance);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscapeClick);
        console.log("onClose", instance);
      },
    }
  );
  instance.show();

  function onEscapeClick(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}
