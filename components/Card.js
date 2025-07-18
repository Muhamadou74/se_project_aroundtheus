// class Card {
//   constructor(data, cardSelector, handleImageClick) {
//     this._name = data.name;
//     this._link = data.link;
//     this._cardSelector = cardSelector;
//     this._handleImageClick = handleImageClick;
//   }

//   _getTemplate() {
//     return document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".card")
//       .cloneNode(true);
//   }

//   _setEventListeners() {
//     this._likeButton.addEventListener("click", () => {
//       this._likeButton.classList.toggle("card__button-like_active");
//     });

//     this._deleteButton.addEventListener("click", () => {
//       this._element.remove();
//     });

//     this._imageElement.addEventListener("click", () => {
//       this._handleImageClick(this._name, this._link);
//     });
//   }

//   getView() {
//     this._element = this._getTemplate();
//     this._likeButton = this._element.querySelector(".card__button-like");
//     this._deleteButton = this._element.querySelector(".card__button-delete");
//     this._imageElement = this._element.querySelector(".card__image");
//     this._element.querySelector(".card__title").textContent = this._name;
//     this._imageElement.src = this._link;
//     this._imageElement.alt = this._name;

//     this._setEventListeners();
//     return this._element;
//   }
// }

// // ✅ export the class
// export default Card;

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
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
    this._titleElement = this._element.querySelector(".card__title");

    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
