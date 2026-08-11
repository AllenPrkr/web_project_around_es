export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        var _a;
        const template = document.querySelector(this.templateSelector);
        const card = (_a = template === null || template === void 0 ? void 0 : template.content.querySelector(".card")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
        if (!(card instanceof HTMLElement)) {
            throw new Error(`No se encontró la plantilla ${this.templateSelector}.`);
        }
        return card;
    }
    setEventListeners() {
        const likeButton = this.cardElement.querySelector(".card__like-button");
        const deleteButton = this.cardElement.querySelector(".card__delete-button");
        likeButton === null || likeButton === void 0 ? void 0 : likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", () => {
            this.cardElement.remove();
        });
        this.cardImage.addEventListener("click", () => {
            this.handleCardClick(this.data);
        });
    }
    generateCard() {
        this.cardElement = this.getTemplate();
        const cardTitle = this.cardElement.querySelector(".card__title");
        const cardImage = this.cardElement.querySelector(".card__image");
        if (!cardTitle || !cardImage) {
            throw new Error("La plantilla de tarjeta está incompleta.");
        }
        this.cardImage = cardImage;
        cardTitle.textContent = this.data.name;
        this.cardImage.src = this.data.link;
        this.cardImage.alt = this.data.name;
        this.setEventListeners();
        return this.cardElement;
    }
}
