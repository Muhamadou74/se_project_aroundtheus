import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Todo from "../components/Todo.js";

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
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const profileNameInput = document.querySelector("#profile-name-input");
const profileBioInput = document.querySelector("#profile-bio-input");

const addCardModal = document.querySelector("#card-add-modal");
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardImageLinkInput = addCardForm.querySelector("#image-link-input");

const previewImageModal = document.querySelector("#preview-image-modal");
const imagePreview = previewImageModal.querySelector(".modal__image-preview");
const previewImageCaption = previewImageModal.querySelector(
  ".modal__image-caption"
);

const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#addCardButton");
const closeButtons = document.querySelectorAll(".modal__close");

const cardList = document.querySelector(".cards__list");
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

// ----------- Card Functions -----------
function handleImageClick(name, link) {
  imagePreview.src = link;
  imagePreview.alt = name;
  previewImageCaption.textContent = name;
  openModal(previewImageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardList.prepend(cardElement);
}

initialCards.forEach(renderCard);

// ----------- Todo Functions -----------
function renderTodo(text) {
  const todo = new Todo(text);
  const todoElement = todo.generateTodo();
  todoList.appendChild(todoElement);
}

// ✅ Example todos
renderTodo("Finish Around the U.S project");
renderTodo("Review JavaScript OOP");
renderTodo("Submit Sprint 7");

// ----------- Modal Functions -----------
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) closeModal(openModal);
  }
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

// ----------- Event Listeners -----------

// Open profile edit
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
  editFormValidator.resetValidation();
  openModal(profileEditModal);
});

// Open add card modal
addCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openModal(addCardModal);
});

// Profile submit
profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  closeModal(profileEditModal);
});

// Add card submit
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageLinkInput.value;
  renderCard({ name, link });
  addCardForm.reset();
  addFormValidator.resetValidation();
  closeModal(addCardModal);
});

// Close modals
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
