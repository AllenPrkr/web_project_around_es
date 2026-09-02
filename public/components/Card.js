export class Card {
    constructor(data, templateSelector, currentUserId, callbacks) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.currentUserId = currentUserId;
        this.callbacks = callbacks;
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
        const deleteButton = this.cardElement.querySelector(".card__delete-button");
        this.likeButton.addEventListener("click", () => {
            this.callbacks.handleLikeClick(this.data._id, this.isLiked(), this);
        });
        if (this.data.owner === this.currentUserId) {
            deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", () => {
                this.callbacks.handleDeleteClick(this.data._id, this);
            });
        }
        else {
            deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.remove();
        }
        this.cardImage.addEventListener("click", () => {
            this.callbacks.handleCardClick(this.data);
        });
    }
    generateCard() {
        this.cardElement = this.getTemplate();
        const cardTitle = this.cardElement.querySelector(".card__title");
        const cardImage = this.cardElement.querySelector(".card__image");
        const likeButton = this.cardElement.querySelector(".card__like-button");
        if (!cardTitle || !cardImage || !likeButton) {
            throw new Error("La plantilla de tarjeta está incompleta.");
        }
        this.cardImage = cardImage;
        this.likeButton = likeButton;
        cardTitle.textContent = this.data.name;
        this.cardImage.src = this.data.link;
        this.cardImage.alt = this.data.name;
        this.setLikeState(this.data.isLiked);
        this.setEventListeners();
        return this.cardElement;
    }
    isLiked() {
        return this.likeButton.classList.contains("card__like-button_is-active");
    }
    setLikeState(isLiked) {
        this.data.isLiked = isLiked;
        this.likeButton.classList.toggle("card__like-button_is-active", isLiked);
        this.likeButton.setAttribute("aria-pressed", String(isLiked));
    }
    remove() {
        this.cardElement.remove();
    }
}
