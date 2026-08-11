import { Popup } from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void;

export class PopupWithForm extends Popup {
  private readonly formElement: HTMLFormElement;
  private readonly inputList: HTMLInputElement[];
  private readonly handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");

    if (!formElement) {
      throw new Error(`El popup ${popupSelector} no contiene un formulario.`);
    }

    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(".popup__input"),
    );
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): FormValues {
    return this.inputList.reduce<FormValues>((values, inputElement) => {
      values[inputElement.name] = inputElement.value;
      return values;
    }, {});
  }

  private submitForm(): void {
    this.handleFormSubmit(this.getInputValues());
  }

  public override setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      this.submitForm();
    });
    this.formElement.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter" && this.formElement.checkValidity()) {
        event.preventDefault();
        this.submitForm();
      }
    });
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }
}
