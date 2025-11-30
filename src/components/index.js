
import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// ----------- Initial Data -----------
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ----------- DOM Elements -----------
const profileEditForm = document.forms["profile-edit-form"];
const profileNameInput = document.querySelector("#profile-name-input");
const profileBioInput = document.querySelector("#profile-bio-input");

const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardImageLinkInput = addCardForm.querySelector("#image-link-input");

const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#addCardButton");

const cardSelector = "#card-template";

// ----------- Validation Settings -----------
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__form-button",
  inactiveButtonClass: "modal__form-button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

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
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    bio: formData.bio,
  });
  profilePopup.close();
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#card-add-modal", (formData) => {
  const name = formData.title;
  const link = formData.link;
  renderCard({ name, link });
  addCardForm.reset();
  addFormValidator.resetValidation();
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// ----------- Card + Section Logic -----------
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

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      renderCard(cardData);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

// ----------- Event Listeners -----------

// Open profile edit
profileEditButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileBioInput.value = currentUser.bio;
  editFormValidator.resetValidation();
  profilePopup.open();
});

// Open add card modal
addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});