class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._errorClass = settings._errorClass;

    this._formElement = formElement;
  }

  _showInputError(inputEl, errorMessageEl) {
    errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _toggleButtonState() {}

  _hasInvalidInput() {}

  _checkInputValidity() {}

  _setEventListeners() {
    this._inputEls = [...this._form.querySelectorAll(this_inputSelector)];
    this._submitButton = this._form.querySelector(this_submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity(formEl, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableVlaidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  }
}

export default FormValidator;
