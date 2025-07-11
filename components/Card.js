// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// }

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// }

// function checkInputValidity(formEl, inputEl, settings) {
//   if (!inputEl.validity.valid) {
//     showInputError(formEl, inputEl, settings);
//   } else {
//     hideInputError(formEl, inputEl, settings);
//   }
// }

// function hasInvalidInput(inputEls) {
//   return inputEls.some((inputEl) => !inputEl.validity.valid);
// }

// function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
//   if (hasInvalidInput(inputEls)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//   } else {
//     submitButton.classList.remove(inactiveButtonClass);
//     submitButton.disabled = false;
//   }
// }

// function setEventListeners(formEl, settings) {
//   const inputEls = Array.from(formEl.querySelectorAll(settings.inputSelector));
//   const submitButton = formEl.querySelector(settings.submitButtonSelector);

//   toggleButtonState(inputEls, submitButton, settings);

//   inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", () => {
//       checkInputValidity(formEl, inputEl, settings);
//       toggleButtonState(inputEls, submitButton, settings);
//     });
//   });
// }

// function enableValidation(settings) {
//   const formEls = Array.from(document.querySelectorAll(settings.formSelector));
//   formEls.forEach((formEl) => {
//     formEl.addEventListener("submit", (e) => e.preventDefault());
//     setEventListeners(formEl, settings);
//   });
// }

// // Export the function if you're using modules
// export { enableValidation };

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__button-like_active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  getView() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__button-like");
    this._deleteButton = this._element.querySelector(".card__button-delete");
    this._imageElement = this._element.querySelector(".card__image");
    this._element.querySelector(".card__title").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._setEventListeners();
    return this._element;
  }
}

// ✅ export the class
export default Card;
