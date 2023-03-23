// ----------* object to track state of app *----------
const state = {
  image: undefined,
  caption: undefined,
  codeSnippet: undefined,
};

// ----------* FUNCTION DECLARATIONS *--------------

// ---* for event listeners *---
function onImageInputChanged() {
  const imageInputElement = document.getElementById("image");
  const selectedImageFile = imageInputElement.files[0];
  state.image = selectedImageFile.name;
}
