// ----------* object to track state of app *----------
const state = {
  image: undefined,
  caption: undefined,
  codeSnippet: undefined,
};

// ----------* Selecting nodes *-------------
const imageInputElement = document.getElementById("image");

// ----------* FUNCTION DECLARATIONS *--------------

// ---* for event listeners *---
function onImageInputChanged() {
  const selectedImageFile = imageInputElement.files[0];
  state.image = selectedImageFile.name;

  renderImagePreview(selectedImageFile);
}

// ---* helper functions *---
function renderImagePreview(selectedImageFile) {
  if (!document.querySelector("img")) {
    const imagePreview = document.createElement("img");
    imagePreview.id = "image-preview";
    imagePreview.setAttribute("src", "");
    imagePreview.setAttribute("alt", "Image preview");
    const main = document.querySelector("main");
    main.appendChild(imagePreview);
  }

  const imagePreview = document.querySelector("#image-preview");
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      imagePreview.src = reader.result;
    },
    false
  );

  reader.readAsDataURL(selectedImageFile);
}

// ----------* EVENT LISTENERS *--------------

imageInputElement.addEventListener("change", onImageInputChanged);
