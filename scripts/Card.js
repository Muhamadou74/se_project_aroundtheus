export default class Card {
  constuctor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button-like_active")
      .addEventListener("click", this._handleLikeClick);

    this._element
      .querySelector(".card__button-like")
      .addEventListener("click", this._handleDeleteClick);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleImageClick);
  }

  _handleLikeClick(event) {
    event.target.classList.toggle("card__button-like_active");
  }

  _handleDeleteClick(event) {
    event.target.closest(".card").remove();
  }

  _handleImageClick() {
    imagePreview.src = this._link;
    imagePreview.alt = this._name;
    previewImageCaption.textContent = this._name;
    openModal(previewImageModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cardData")
      .cloneNode(true);
  }

  getView() {
    this._element = this.get_Template();
    this._setEventListeners();
  }
}
