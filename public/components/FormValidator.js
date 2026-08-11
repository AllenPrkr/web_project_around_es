export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(config.inputSelector));
        const submitButton = this.formElement.querySelector(config.submitButtonSelector);
        if (!submitButton) {
            throw new Error("No se encontró el botón de envío del formulario.");
        }
        this.submitButton = submitButton;
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add(this.config.errorClass);
        }
    }
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.classList.remove(this.config.errorClass);
        }
    }
    checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this.hideInputError(inputElement);
        }
        else {
            this.showInputError(inputElement, inputElement.validationMessage);
        }
    }
    hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    toggleButtonState() {
        const buttonDisabled = this.hasInvalidInput();
        this.submitButton.disabled = buttonDisabled;
        this.submitButton.classList.toggle(this.config.inactiveButtonClass, buttonDisabled);
    }
    setEventListeners() {
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (event) => {
                const currentInput = event.currentTarget;
                this.checkInputValidity(currentInput);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
        this.toggleButtonState();
    }
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
