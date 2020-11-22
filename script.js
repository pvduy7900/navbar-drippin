const API_KEY = "GLo6me33mAPbPck0jI0XyLEfe4dbvkgjF9kTytMGDQ0";
const BASE_URL = "https://api.unsplash.com/photos/?";
const PER_PAGE = "30";

const defaultURL =
  "https://api.unsplash.com/photos/?client_id=GLo6me33mAPbPck0jI0XyLEfe4dbvkgjF9kTytMGDQ0&per_page=30";


// navbar
const navSlide = () => {
  const burger = document.querySelector(".burger")
  const nav = document.querySelector('.signbtn')
  const navLinks = document.querySelectorAll('.signbtn li')

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active')

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }
    })
  });

}
navSlide();

// This function will fetch some images base on the given url
function getImagesFromSearch(url) {
  fetch(url, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      let imagesArray = data.results;
      let newHTML = imagesArray.map(
        (item) =>
          `<div class="item"><img  style="border-radius: 15px; " src=${item.urls.regular}></img></div>`
      );
      document.getElementById("hold").innerHTML = newHTML.join("");
    })
    .catch((error) => {
      console.log(error);
    });
}

// This function will fetch some random images when the page first is started
// Therefore, we don't need any query parameter here in the URL
function getDefaultImages() {
  fetch(defaultURL, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      let newHTML = data.map(
        (item) =>
          `<div class="item"><img style="border-radius: 15px; " src=${item.urls.regular}></img></div>`
      );
      document.getElementById("hold").innerHTML = newHTML.join("");
    })
    .catch((error) => {
      console.log(error);
    });
}

function init() {
  getDefaultImages();
  let searchBar = document.getElementById("search-bar");
  searchBar.addEventListener("keyup", (event) => {
    if (event.code == "Enter") {
      let searchTerm = searchBar.value;
      let query = searchTerm;
      const url = `https://api.unsplash.com/search/photos/?client_id=GLo6me33mAPbPck0jI0XyLEfe4dbvkgjF9kTytMGDQ0&query=${query}&per_page=30`;

      getImagesFromSearch(url);
    }
  });
}

window.onload = init;
