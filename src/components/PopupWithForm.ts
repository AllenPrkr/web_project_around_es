import { Popup } from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void | Promise<void>;

export class PopupWithForm extends Popup {
  private readonly formElement: HTMLFormElement;
  private readonly inputList: HTMLInputElement[];
  private readonly handleFormSubmit: FormSubmitHandler;
  private readonly submitButton: HTMLButtonElement;
  private readonly defaultSubmitText: string;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");
    const submitButton =
      formElement?.querySelector<HTMLButtonElement>(".popup__button");

    if (!formElement || !submitButton) {
      throw new Error(`El popup ${popupSelector} no contiene un formulario completo.`);
    }

    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(".popup__input"),
    );
    this.submitButton = submitButton;
    this.defaultSubmitText = submitButton.textContent ?? "Guardar";
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): FormValues {
    return this.inputList.reduce<FormValues>((values, inputElement) => {
      values[inputElement.name] = inputElement.value;
      return values;
    }, {});
  }

  private async submitForm(): Promise<void> {
    await this.handleFormSubmit(this.getInputValues());
  }

  public override setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      void this.submitForm();
    });
    this.formElement.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter" && this.formElement.checkValidity()) {
        event.preventDefault();
        void this.submitForm();
      }
    });
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }

  public setLoading(isLoading: boolean, loadingText = "Guardando..."): void {
    this.submitButton.textContent = isLoading
      ? loadingText
      : this.defaultSubmitText;
    this.submitButton.disabled = isLoading;
  }
}
