import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

galleryRef.innerHTML = makeGalleryItemsMarkup(galleryItems);

let gallery = createGallery();

function createGallery() {
  return new SimpleLightbox(".gallery__item a", {
    captionsData: "alt",
    captionDelay: 250,
  });
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
