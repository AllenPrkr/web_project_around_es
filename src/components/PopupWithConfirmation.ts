import { Popup } from "./Popup.js";

export type ConfirmationAction = () => void | Promise<void>;

export class PopupWithConfirmation extends Popup {
  private readonly formElement: HTMLFormElement;
  private readonly submitButton: HTMLButtonElement;
  private readonly defaultSubmitText: string;
  private confirmationAction: ConfirmationAction = () => undefined;

  constructor(popupSelector: string) {
    super(popupSelector);

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");
    const submitButton =
      formElement?.querySelector<HTMLButtonElement>(".popup__button");

    if (!formElement || !submitButton) {
      throw new Error(
        `El popup ${popupSelector} no contiene un formulario de confirmación.`,
      );
    }

    this.formElement = formElement;
    this.submitButton = submitButton;
    this.defaultSubmitText = submitButton.textContent ?? "Sí";
  }

  public setSubmitAction(confirmationAction: ConfirmationAction): void {
    this.confirmationAction = confirmationAction;
  }

  public override setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      void this.confirmationAction();
    });
  }

  public setLoading(isLoading: boolean): void {
    this.submitButton.textContent = isLoading
      ? "Eliminando..."
      : this.defaultSubmitText;
    this.submitButton.disabled = isLoading;
  }
}
