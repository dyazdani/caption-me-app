// cSpell: ignore Apikey

// ----------* object to track state of app *----------
const state = {
  image: null,
  caption: null,
  codeSnippet: null,
  fetchedJson: null,
};

// ----------* Selecting nodes *-------------
const imageInputElement = document.getElementById("image");

// ----------* FUNCTION DECLARATIONS *--------------

function renderGetCaptionButton() {
  const getCaptionButton = getGetCaptionButton();
  const main = document.querySelector('main');
  main.appendChild(getCaptionButton);
}

// --

function renderCaptionElement() {
  const captionElement = getCaptionElement();
  const div = document.createElement('div');
  div.id = 'caption-container';
  div.appendChild(captionElement);
  const main = document.querySelector("main");
  main.appendChild(div);
}

// ---

function renderCopyButton() {
  const copyButton = getCopyButton();
  const div = document.querySelector("#caption-container");
  div.appendChild(copyButton);
}

// ---

function renderCopyImgCodeSnippetButton() {
  const copyImgCodeSnippetButton = getCopyImgCodeSnippetButton();
  const div = document.querySelector("#caption-container");
  div.appendChild(copyImgCodeSnippetButton);
}

// ---* helper functions *---
function getGetCaptionButton() {
  const button = document.createElement('button')
  button.id = 'get-caption'
  button.setAttribute('type', 'button');
  button.innerText = 'Get Caption';

  return button;
}

// --

function renderImagePreview(selectedImageFile) {
  if (!document.querySelector("img")) {
    const imagePreview = document.createElement("img");
    imagePreview.id = "image-preview";
    imagePreview.setAttribute("src", "");
    imagePreview.setAttribute("alt", "Image preview");
    const div = document.querySelector("#image-preview-container");
    div.appendChild(imagePreview);
    const main = document.querySelector("main");
    main.insertBefore(main.firstChild, div);
  }

  const imagePreview = document.querySelector("#image-preview");
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      imagePreview.src = reader.result;
    },
    false
  );

  reader.readAsDataURL(selectedImageFile);
}

// ---

function getCaptionElement() {
  if (state.caption) {
    const captionElement = document.createElement("p");
    captionElement.innerText = `"${state.caption}"`;
    return captionElement;
  }
}

// ---

function getCopyButton() {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.innerText = "Copy caption text";

  button.addEventListener("click", onCopyButtonClicked);

  return button;
}

// ---

function getImgCodeSnippet() {
  const imagePreviewElement = document.querySelector("#image-preview");
  const imageSource = imagePreviewElement.getAttribute("src");
  const codeSnippet = `<img alt="${state.caption}" src="${imageSource}">`;
  return codeSnippet;
}

// ---

function getCopyImgCodeSnippetButton() {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.innerText = "Copy code snippet";

  button.addEventListener("click", onCopyImgCodeSnippetButtonClicked);

  return button;
}

// ---* for event listeners *---
function onCopyImgCodeSnippetButtonClicked() {
  navigator.clipboard.writeText(state.codeSnippet);
}

function onCopyButtonClicked() {
  navigator.clipboard.writeText(state.caption);
}

function onImageInputChanged() {
  const selectedImageFile = imageInputElement.files[0];
  state.image = selectedImageFile.name;

  renderImagePreview(selectedImageFile);
  renderGetCaptionButton();
  const getCaptionButton = document.querySelector("#get-caption");
  getCaptionButton.addEventListener("click", onGetCaptionButtonClicked);
}

function onGetCaptionButtonClicked() {
  requestForAPI();
}

//---

// fetch request
async function requestForAPI() {
  const selectedImageFile = imageInputElement.files[0];
  const data = new FormData();
  data.append("imageFile", selectedImageFile, "file");

  const fetchHeader = new Headers();
  fetchHeader.append("Apikey", "eea0fd3c-6342-4543-a92c-9fc111175b97");

  const options = {
    method: "POST",
    body: data,
    credentials: "omit",
    headers: fetchHeader,
  };

  const response = await fetch("https://api.cloudmersive.com/image/recognize/describe", options)
  state.fetchedJson = await response.json();
  state.caption = state.fetchedJson.BestOutcome.Description;
  state.codeSnippet = getImgCodeSnippet();

  renderCaptionElement();
  renderCopyButton();
  renderCopyImgCodeSnippetButton();
}

// ----------* EVENT LISTENERS *--------------

imageInputElement.addEventListener("change", onImageInputChanged);
