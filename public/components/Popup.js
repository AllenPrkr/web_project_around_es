export class Popup {
    constructor(popupSelector) {
        const popupElement = document.querySelector(popupSelector);
        const closeButton = popupElement === null || popupElement === void 0 ? void 0 : popupElement.querySelector(".popup__close");
        if (!popupElement || !closeButton) {
            throw new Error(`El popup ${popupSelector} está incompleto.`);
        }
        this.popupElement = popupElement;
        this.closeButton = closeButton;
        this.handleEscClose = this.handleEscClose.bind(this);
    }
    open(_data) {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        this.closeButton.addEventListener("click", () => this.close());
        this.popupElement.addEventListener("click", (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        });
    }
}
