// src/pages/index.js

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

import {
  initialCards,
  validationSettings,
  cardSelector,
} from "../utils/constants.js";

// ----------- DOM Elements -----------
const profileEditForm = document.forms["profile-edit-form"];
const profileNameInput = document.querySelector("#profile-name-input");
const profileBioInput = document.querySelector("#profile-bio-input");

const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardImageLinkInput = addCardForm.querySelector("#image-link-input");

const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#addCardButton");

const cardList = document.querySelector(".cards__list"); // still here if needed

// ----------- Validators -----------
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// ----------- User Info -----------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
});

// ----------- Popups -----------

// Image preview popup
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

// Profile edit popup
const editProfilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    bio: formData.bio,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

// Add card popup
const addCardPopup = new PopupWithForm("#card-add-modal", (formData) => {
  renderCard({
    name: formData.title,
    link: formData.link,
  });
  addFormValidator.resetValidation();
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// ----------- Section (card list) -----------
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

// ----------- Card Functions -----------
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

// Render initial cards on page load
cardSection.renderItems();

// ----------- Event Listeners -----------

// Open profile edit
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileBioInput.value = currentUser.bio;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

// Open add-card popup
addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});