export class Popup<TData = void> {
  protected readonly popupElement: HTMLElement;
  private readonly closeButton: HTMLButtonElement;

  constructor(popupSelector: string) {
    const popupElement = document.querySelector<HTMLElement>(popupSelector);
    const closeButton =
      popupElement?.querySelector<HTMLButtonElement>(".popup__close");

    if (!popupElement || !closeButton) {
      throw new Error(`El popup ${popupSelector} está incompleto.`);
    }

    this.popupElement = popupElement;
    this.closeButton = closeButton;
    this.handleEscClose = this.handleEscClose.bind(this);
  }

  public open(_data: TData): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  private handleEscClose(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      this.close();
    }
  }

  public setEventListeners(): void {
    this.closeButton.addEventListener("click", () => this.close());
    this.popupElement.addEventListener("click", (event: MouseEvent) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }
}
