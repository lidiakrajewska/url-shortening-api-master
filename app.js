// Changing the img src based on screen size
const shortenBg = document.querySelector("#shorten-bg");
const lastBg = document.querySelector("#last-bg");
let screenWidth = window.matchMedia("(min-width: 1440px)");
adjustImgSrc(screenWidth);
screenWidth.addEventListener("change", adjustImgSrc);

function adjustImgSrc(screenWidth) {
  if (screenWidth.matches) {
    shortenBg.src = "./images/bg-shorten-desktop.svg";
    lastBg.src = "./images/bg-boost-desktop.svg";
  } else {
    shortenBg.src = "./images/bg-shorten-mobile.svg";
    lastBg.src = "./images/bg-boost-mobile.svg";
  }
}

const shortenBtn = document.querySelector(".shorten--cta");
const shortenedLinksDiv = document.querySelector(".shortened-links");

shortenBtn.addEventListener("click", shorten);

const apiEndpoint = "https://api.shrtco.de/v2/";

// Fetching APIs with an asynchronus function
async function fetchAPI(url) {
  const dataFetch = await fetch(url);
  const data = await dataFetch.json();
  return data;
}

// Shortening links with API
async function shorten() {
  const input = document.querySelector(".shorten__input").value;
  const apiResponse = await fetchAPI(apiEndpoint + "shorten?url=" + input);
  const shortened = apiResponse.result.full_short_link;
  createLinkElement(input, shortened);
}

// Creating HTML elements that display links
function createLinkElement(input, shortened) {
  // Shortened link wrapper
  const shortenedItem = document.createElement("div");
  shortenedItem.classList.add("shortened-links__item");
  // Original link
  const link = document.createElement("p");
  link.innerText = input;
  link.classList.add("original-link");
  shortenedItem.appendChild(link);
  // Shortened link
  const shortenedLinkWrapper = document.createElement("div");
  shortenedLinkWrapper.classList.add("shortened-link-wrapper");
  const shortenedLink = document.createElement("p");
  shortenedLink.innerText = shortened;
  shortenedLink.classList.add("shortened-link");
  shortenedLinkWrapper.appendChild(shortenedLink);
  // Copy button
  const copyButton = document.createElement("button");
  copyButton.innerText = "Copy";
  copyButton.classList.add("copy-btn");
  shortenedLinkWrapper.appendChild(copyButton);

  shortenedItem.appendChild(shortenedLinkWrapper);
  shortenedLinksDiv.appendChild(shortenedItem);
}
