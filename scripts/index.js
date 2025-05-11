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

//buttons and DOM elements

const cardList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#addCardButton");
const closeButtons = document.querySelectorAll(".modal__close");

//functions

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__button-like");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button-like_active");
  });
  const deleteButton = cardElement.querySelector(".card__button-delete");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;

  cardImageElement.addEventListener("click", () => {
    imagePreview.src = cardData.link;
    imagePreview.alt = cardData.name;
    previewImageCaption.textContent = cardData.name;
    openModal(previewImageModal);
  });

  return cardElement;
}

function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

initialCards.forEach((cardData) => renderCard(cardData, cardList));

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileBio.textContent = profileBioInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageLinkInput.value;
  renderCard({ name, link }, cardList);
  e.target.reset();
  closeModal(addCardModal);
}

//event listeners

profileEditButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileBioInput.value = profileBio.textContent;
  openModal(profileEditModal);
});

addCardButton.addEventListener("click", function () {
  openModal(addCardModal);
});

profileEditForm.addEventListener("submit", handleEditProfileSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  // Close on overlay click
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
});

// Example modal close function
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
