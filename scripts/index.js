const headerDropdownButton = document.querySelector(".header__burger-button");
const headerDropdownContent = document.querySelector(".header__burger-content");

const headerDropdownLinks = document.querySelectorAll(".header__burger-link");

headerDropdownButton.addEventListener("click", handleDropdownButton);

headerDropdownLinks.forEach((element) => {
  element.addEventListener("click", handleDropdownButton);
});

// close/open header dropdown
function handleDropdownButton() {
  headerDropdownContent.classList.toggle("header__burger-content_opened");
  headerDropdownButton.classList.toggle("header__burger-button_opened");
}

import { sliderObjects } from "./slider-objects.js";

const roadSection = document.querySelector(".road");

const roadTitle = roadSection.querySelector(".section-title");
const roadDescription = roadSection.querySelector(".section-description");
const roadImages = roadSection.querySelectorAll(".road__slider-image");
const roadTrackSvg = roadSection.querySelector(".road__slider-vector");

const roadPaginationNextBtn = roadSection.querySelector(
  ".road__pagination-button_next"
);
const roadPaginationPreviousBtn = roadSection.querySelector(
  ".road__pagination-button_previous"
);

roadPaginationNextBtn.addEventListener("click", handleNextPagination);
roadPaginationPreviousBtn.addEventListener("click", handlePreviousPagination);

let currentPage = 0;

function handleNextPagination() {
  currentPage += 1;
  paginate(currentPage);
}

function handlePreviousPagination() {
  currentPage -= 1;
  paginate(currentPage);
}

function paginate(currentPage) {
  if (currentPage < 0) {
    currentPage = 0;
  } else if (currentPage > sliderObjects.length - 1) {
    currentPage = sliderObjects.length - 1;
  }

  let currentSlide = sliderObjects[currentPage];
  let roadFirstImage = roadImages[0];
  let roadSecondImage = roadImages[1];

  roadTitle.textContent = currentSlide.title;
  roadDescription.textContent = currentSlide.description;
  roadFirstImage.src = currentSlide.firstImage;
  roadSecondImage.src = currentSlide.secondImage;
  roadTrackSvg.src = currentSlide.trackSvg;
}

import { bicycleObjects } from "./bicycle-objects.js";

const bicyclesSection = document.querySelector(".bicycles");

const bicyclesContainer = bicyclesSection.querySelector(
  ".bicycles__slider-wrapper"
);
const bicycleItemTemplate = document.querySelector("#bicycle-item").content;

const bicycleMenuItems = bicyclesSection.querySelectorAll(
  ".bicycles__filter-menu-link"
);

bicycleMenuItems.forEach((element) => {
  element.addEventListener("click", handleBicycleFilter);
});

function handleBicycleFilter(event) {
  event.preventDefault();
  let cardsType = "";

  bicycleMenuItems.forEach((element) => {
    if (element.classList.contains("bicycles__filter-menu-link_active")) {
      element.classList.remove("bicycles__filter-menu-link_active");
    }
  });

  event.target.classList.add("bicycles__filter-menu-link_active");

  if (event.target.textContent === "Шоссе") {
    cardsType = "highway";
  } else if (event.target.textContent === "Грэвел") {
    cardsType = "gravel";
  } else if (event.target.textContent === "ТТ") {
    cardsType = "tt";
  }

  let cardsToRender = getBicyclesCards(cardsType);

  renderBicyclesCards(cardsToRender);
}

function getBicyclesCards(cardsType) {
  return bicycleObjects[cardsType];
}

function getBicycleCard(cardObject) {
  const bicycleElement = bicycleItemTemplate
    .querySelector(".bicycle__item")
    .cloneNode(true);

  bicycleElement.querySelector(".bicycles__slider-item-link").href =
    cardObject.link;
  bicycleElement.querySelector(".bicycles__slider-image").src =
    cardObject.image;
  bicycleElement.querySelector(".bicycles__slider-caption").textContent =
    cardObject.title;

  return bicycleElement;
}

function clearBicycles() {
  let cardsToRemove = bicyclesSection.querySelectorAll(".bicycle__item");
  cardsToRemove.forEach((element) => {
    element.remove();
  });
}

function renderInitialBicycleCards() {
  let initialCards = getBicyclesCards("highway");
  renderBicyclesCards(initialCards);
}

function renderBicyclesCards(cardsToRender) {
  clearBicycles();
  cardsToRender.forEach((element) => {
    bicyclesContainer.append(getBicycleCard(element));
  });
}

renderInitialBicycleCards();

const bicyclesSelectDropdown = bicyclesSection.querySelector(
  ".bicycles__select-dropdown"
);

bicyclesSelectDropdown.addEventListener("change", handleBicyclesSelect);

function handleBicyclesSelect(event) {
  let roadType = event.target.value;
  let cardsToRender = getBicyclesCards(roadType);
  renderBicyclesCards(cardsToRender);
}

if (window.innerWidth <= 425) {
  new Swiper(".bicycles__slider-container", {
    pagination: {
      el: ".swiper-pagination",
    },
  });

  const pagination = document.querySelector(".swiper-pagination");
  pagination.style.bottom = 0;
}
