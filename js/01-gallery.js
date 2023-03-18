import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);

const gallery = document.querySelector(".gallery");

gallery.insertAdjacentHTML("afterbegin", createGalleryItems(galleryItems));

function createGalleryItems(image) {
  return image
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>`;
    })
    .join("");
}
gallery.addEventListener("click", onClick);

function onClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const instanse = basicLightbox.create(
    `<img src="${event.target.dataset.source}" width="800" height="600">`,
    {
      onShow: () => {
        document.addEventListener("keydown", modalClose);
      },
      onClose: () => {
        document.removeEventListener("keydown", modalClose);
      },
    }
  );
  instanse.show();

  function modalClose(event) {
    console.log(event.code);
    if (event.code === "Escape") {
      instanse.close();
    }
  }
}
