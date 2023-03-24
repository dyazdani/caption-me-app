// ----------* object to track state of app *----------
const state = {
  image: undefined,
  caption: undefined,
  codeSnippet: undefined,
  xmlHttpRequestObject: undefined,
};

// ----------* Selecting nodes *-------------
const imageInputElement = document.getElementById("image");
const getCaptionButton = document.querySelector("#get-caption");

// ----------* FUNCTION DECLARATIONS *--------------

// ---* for event listeners *---
function onImageInputChanged() {
  const selectedImageFile = imageInputElement.files[0];
  state.image = selectedImageFile.name;

  renderImagePreview(selectedImageFile);
}

function onGetCaptionButtonClicked() {
  requestForAPI();
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

//---

//XMLHttpRequest to Cloudmersive imageapi
function requestForAPI() {
  const selectedImageFile = imageInputElement.files[0];
  const data = new FormData();
  data.append("imageFile", selectedImageFile, "file");

  state.xmlHttpRequestObject = new XMLHttpRequest();
  // state.xmlHttpRequestObject.withCredentials = true;

  state.xmlHttpRequestObject.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  state.xmlHttpRequestObject.open(
    "POST",
    "https://api.cloudmersive.com/image/recognize/describe"
  );

  state.xmlHttpRequestObject.setRequestHeader(
    "Apikey",
    "eea0fd3c-6342-4543-a92c-9fc111175b97"
  );

  state.xmlHttpRequestObject.send(data);
}

// ----------* EVENT LISTENERS *--------------

imageInputElement.addEventListener("change", onImageInputChanged);
getCaptionButton.addEventListener("click", onGetCaptionButtonClicked);
