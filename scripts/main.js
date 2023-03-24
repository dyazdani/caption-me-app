// ----------* object to track state of app *----------
const state = {
  image: undefined,
  caption: undefined,
  codeSnippet: undefined,
};

// ----------* Selecting nodes *-------------
const imageInputElement = document.getElementById("image");
const getCaptionButton = document.querySelector('#get-caption');

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

//XMLHTTPRequest to Cloudmersive imageapi
function requestForAPI() {
  const selectedImageFile = imageInputElement.files[0];
  var data = new FormData();
  data.append("imageFile", selectedImageFile, "file");
  
  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
            console.log(this.responseText);
      }
  });

  xhr.open("POST", "https://api.cloudmersive.com/image/recognize/describe");

  xhr.setRequestHeader("Apikey", "eea0fd3c-6342-4543-a92c-9fc111175b97");

  xhr.send(data);
}

// ----------* EVENT LISTENERS *--------------

imageInputElement.addEventListener("change", onImageInputChanged);
getCaptionButton.addEventListener('click', onGetCaptionButtonClicked);
