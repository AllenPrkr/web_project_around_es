import type { FormValidationConfig } from "../utils/constants.js";

export class FormValidator {
  private readonly config: FormValidationConfig;
  private readonly formElement: HTMLFormElement;
  private readonly inputList: HTMLInputElement[];
  private readonly submitButton: HTMLButtonElement;

  constructor(config: FormValidationConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(config.inputSelector),
    );

    const submitButton = this.formElement.querySelector<HTMLButtonElement>(
      config.submitButtonSelector,
    );

    if (!submitButton) {
      throw new Error("No se encontró el botón de envío del formulario.");
    }

    this.submitButton = submitButton;
  }

  private showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string,
  ): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `#${inputElement.id}-error`,
    );

    inputElement.classList.add(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector<HTMLElement>(
      `#${inputElement.id}-error`,
    );

    inputElement.classList.remove(this.config.inputErrorClass);

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this.config.errorClass);
    }
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (inputElement.validity.valid) {
      this.hideInputError(inputElement);
    } else {
      this.showInputError(inputElement, inputElement.validationMessage);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private toggleButtonState(): void {
    const buttonDisabled = this.hasInvalidInput();

    this.submitButton.disabled = buttonDisabled;
    this.submitButton.classList.toggle(
      this.config.inactiveButtonClass,
      buttonDisabled,
    );
  }

  private setEventListeners(): void {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (event: Event) => {
        const currentInput = event.currentTarget as HTMLInputElement;
        this.checkInputValidity(currentInput);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.setEventListeners();
    this.toggleButtonState();
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
    this.toggleButtonState();
  }
}
