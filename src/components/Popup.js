// class Popup {
//     constuctor({popupSelector}) {
//         this._popupElement = document.querySelector(popupSelector);
//     }

//     oprn() {
//         // opens popup

//     }

//     close() {
//         // closes popup

//     }

//     _handleEscClose() {
//         // listens for esc button

//     }

//     setEventListeners() {
//         // Event Listeners

//     }
// }

// components/Popup.js
export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popupElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      this._popupElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  
    _handleEscClose(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  
    setEventListeners() {
      // close button (X)
      const closeButton = this._popupElement.querySelector(".modal__close");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          this.close();
        });
      }
  
      // close by clicking overlay
      this._popupElement.addEventListener("mousedown", (evt) => {
        if (evt.target === this._popupElement) {
          this.close();
        }
      });
    }
  }