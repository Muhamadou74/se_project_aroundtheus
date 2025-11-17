import popup from './Popup.js';


class PopupWithForm extends popup {
    constructor (popupSelector, handleFormSubmit) {
        super({popupSelector});
        this.modal__Form = this._popupElement.querySelector('.modal__form')
        this._handleFormSubmit = handleFormSubmit;

    }
    close() {
        this._modal__form.reset()
        super.close();
    }
}


const newCardPopup = new PopupWithForm('#card-add-modal', () => {});
newCardPopup.open()

newCardPopup.close();

