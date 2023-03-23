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
}

// ----------* EVENT LISTENERS *--------------

imageInputElement.addEventListener("change", onImageInputChanged);
