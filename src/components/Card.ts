export interface CardFormData {
  name: string;
  link: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  isLiked: boolean;
  createdAt: string;
}

export type CardPreviewData = Pick<CardData, "name" | "link">;

export interface CardCallbacks {
  handleCardClick: (card: CardPreviewData) => void;
  handleDeleteClick: (cardId: string, card: Card) => void;
  handleLikeClick: (cardId: string, isLiked: boolean, card: Card) => void;
}

export class Card {
  private readonly data: CardData;
  private readonly templateSelector: string;
  private readonly currentUserId: string;
  private readonly callbacks: CardCallbacks;
  private cardElement!: HTMLElement;
  private cardImage!: HTMLImageElement;
  private likeButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string,
    currentUserId: string,
    callbacks: CardCallbacks,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.currentUserId = currentUserId;
    this.callbacks = callbacks;
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
    const deleteButton = this.cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    );

    this.likeButton.addEventListener("click", () => {
      this.callbacks.handleLikeClick(this.data._id, this.isLiked(), this);
    });

    if (this.data.owner === this.currentUserId) {
      deleteButton?.addEventListener("click", () => {
        this.callbacks.handleDeleteClick(this.data._id, this);
      });
    } else {
      deleteButton?.remove();
    }

    this.cardImage.addEventListener("click", () => {
      this.callbacks.handleCardClick(this.data);
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
    const likeButton = this.cardElement.querySelector<HTMLButtonElement>(
      ".card__like-button",
    );

    if (!cardTitle || !cardImage || !likeButton) {
      throw new Error("La plantilla de tarjeta está incompleta.");
    }

    this.cardImage = cardImage;
    this.likeButton = likeButton;
    cardTitle.textContent = this.data.name;
    this.cardImage.src = this.data.link;
    this.cardImage.alt = this.data.name;
    this.setLikeState(this.data.isLiked);
    this.setEventListeners();

    return this.cardElement;
  }

  public isLiked(): boolean {
    return this.likeButton.classList.contains("card__like-button_is-active");
  }

  public setLikeState(isLiked: boolean): void {
    this.data.isLiked = isLiked;
    this.likeButton.classList.toggle("card__like-button_is-active", isLiked);
    this.likeButton.setAttribute("aria-pressed", String(isLiked));
  }

  public remove(): void {
    this.cardElement.remove();
  }
}
