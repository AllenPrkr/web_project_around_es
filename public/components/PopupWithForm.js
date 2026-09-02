import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        var _a;
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        const submitButton = formElement === null || formElement === void 0 ? void 0 : formElement.querySelector(".popup__button");
        if (!formElement || !submitButton) {
            throw new Error(`El popup ${popupSelector} no contiene un formulario completo.`);
        }
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.submitButton = submitButton;
        this.defaultSubmitText = (_a = submitButton.textContent) !== null && _a !== void 0 ? _a : "Guardar";
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        return this.inputList.reduce((values, inputElement) => {
            values[inputElement.name] = inputElement.value;
            return values;
        }, {});
    }
    async submitForm() {
        await this.handleFormSubmit(this.getInputValues());
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            void this.submitForm();
        });
        this.formElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && this.formElement.checkValidity()) {
                event.preventDefault();
                void this.submitForm();
            }
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
    setLoading(isLoading, loadingText = "Guardando...") {
        this.submitButton.textContent = isLoading
            ? loadingText
            : this.defaultSubmitText;
        this.submitButton.disabled = isLoading;
    }
}
