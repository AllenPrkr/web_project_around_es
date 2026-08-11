export interface CardData {
  name: string;
  link: string;
}

export type CardClickHandler = (card: CardData) => void;

export class Card {
  private readonly data: CardData;
  private readonly templateSelector: string;
  private readonly handleCardClick: CardClickHandler;
  private cardElement!: HTMLElement;
  private cardImage!: HTMLImageElement;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: CardClickHandler,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(
      this.templateSelector,
    );
    const card = template?.content
      .querySelector<HTMLElement>(".card")
      ?.cloneNode(true);

    if (!(card instanceof HTMLElement)) {
      throw new Error(`No se encontró la plantilla ${this.templateSelector}.`);
    }

    return card;
  }

  private setEventListeners(): void {
    const likeButton = this.cardElement.querySelector<HTMLButtonElement>(
      ".card__like-button",
    );
    const deleteButton = this.cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    );

    likeButton?.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });

    deleteButton?.addEventListener("click", () => {
      this.cardElement.remove();
    });

    this.cardImage.addEventListener("click", () => {
      this.handleCardClick(this.data);
    });
  }

  public generateCard(): HTMLElement {
    this.cardElement = this.getTemplate();

    const cardTitle = this.cardElement.querySelector<HTMLElement>(
      ".card__title",
    );
    const cardImage = this.cardElement.querySelector<HTMLImageElement>(
      ".card__image",
    );

    if (!cardTitle || !cardImage) {
      throw new Error("La plantilla de tarjeta está incompleta.");
    }

    this.cardImage = cardImage;
    cardTitle.textContent = this.data.name;
    this.cardImage.src = this.data.link;
    this.cardImage.alt = this.data.name;
    this.setEventListeners();

    return this.cardElement;
  }
}
