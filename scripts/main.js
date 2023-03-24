// ----------* object to track state of app *----------
const state = {
  image: undefined,
  caption: undefined,
  codeSnippet: undefined,
  fetchedJson: undefined,
};

// ----------* Selecting nodes *-------------
const imageInputElement = document.getElementById("image");
const getCaptionButton = document.querySelector("#get-caption");

// ----------* FUNCTION DECLARATIONS *--------------

function renderCaptionElement() {
  const captionElement = getCaptionElement();
  const main = document.querySelector("main");
  main.appendChild(captionElement);
}

// ---

function renderCopyButton() {
  const copyButton = getCopyButton();
  const main = document.querySelector("main");
  main.appendChild(copyButton);
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
    captionElement.innerText = state.caption;
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

// ---* for event listeners *---
function onCopyCodeSnippetClicked() {
  navigator.clipboard.writeText(state.codeSnippet);
}

function onCopyButtonClicked() {
  navigator.clipboard.writeText(state.caption);
}

function onImageInputChanged() {
  const selectedImageFile = imageInputElement.files[0];
  state.image = selectedImageFile.name;

  renderImagePreview(selectedImageFile);
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

  await fetch("https://api.cloudmersive.com/image/recognize/describe", options)
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(function (data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      state.fetchedJson = data;
      state.caption = state.fetchedJson.BestOutcome.Description;
      state.codeSnippet = getImgCodeSnippet();
      console.log(state.codeSnippet);
    })
    .then(renderCaptionElement)
    .then(renderCopyButton);
}

// ----------* EVENT LISTENERS *--------------

imageInputElement.addEventListener("change", onImageInputChanged);
getCaptionButton.addEventListener("click", onGetCaptionButtonClicked);
