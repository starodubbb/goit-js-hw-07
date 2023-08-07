import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

galleryRef.innerHTML = makeGalleryItemsMarkup(galleryItems);

galleryRef.addEventListener("click", itemGalleryClickHandler);

function itemGalleryClickHandler(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  const imgRef = event.target;
  const modalRef = createModalByImage(imgRef);
  openModal(modalRef);
}

function escapeKeyClickHandler(modalRef, event) {
  if (event.code !== "Escape") {
    return;
  }
  modalRef.close();
}

function createModalByImage(imageRef) {
  const fullSizeImgMarkup = `
  <img
    src="${imageRef.dataset.source}"
    alt="${imageRef.alt}"
  />
  `;

  return basicLightbox.create(fullSizeImgMarkup, {
    onShow: (modal) => {
      window.addEventListener(
        "keydown",
        escapeKeyClickHandler.bind(null, modal)
      );
    },
    onClose: (modal) => {
      window.removeEventListener(
        "keydown",
        escapeKeyClickHandler.bind(null, modal)
      );
    },
  });
}

function openModal(modal) {
  modal.show();
}

function makeGalleryItemsMarkup(items) {
  return items.reduce((acc, item) => {
    return (acc += `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
    `);
  }, "");
}
