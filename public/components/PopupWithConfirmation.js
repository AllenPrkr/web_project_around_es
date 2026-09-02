import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        var _a;
        super(popupSelector);
        this.confirmationAction = () => undefined;
        const formElement = this.popupElement.querySelector(".popup__form");
        const submitButton = formElement === null || formElement === void 0 ? void 0 : formElement.querySelector(".popup__button");
        if (!formElement || !submitButton) {
            throw new Error(`El popup ${popupSelector} no contiene un formulario de confirmación.`);
        }
        this.formElement = formElement;
        this.submitButton = submitButton;
        this.defaultSubmitText = (_a = submitButton.textContent) !== null && _a !== void 0 ? _a : "Sí";
    }
    setSubmitAction(confirmationAction) {
        this.confirmationAction = confirmationAction;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            void this.confirmationAction();
        });
    }
    setLoading(isLoading) {
        this.submitButton.textContent = isLoading
            ? "Eliminando..."
            : this.defaultSubmitText;
        this.submitButton.disabled = isLoading;
    }
}
