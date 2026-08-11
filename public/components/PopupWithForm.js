import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error(`El popup ${popupSelector} no contiene un formulario.`);
        }
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        return this.inputList.reduce((values, inputElement) => {
            values[inputElement.name] = inputElement.value;
            return values;
        }, {});
    }
    submitForm() {
        this.handleFormSubmit(this.getInputValues());
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.submitForm();
        });
        this.formElement.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && this.formElement.checkValidity()) {
                event.preventDefault();
                this.submitForm();
            }
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
