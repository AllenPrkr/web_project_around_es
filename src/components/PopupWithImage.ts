import { Popup } from "./Popup.js";
import type { CardPreviewData } from "./Card.js";

export class PopupWithImage extends Popup<CardPreviewData> {
  private readonly popupImage: HTMLImageElement;
  private readonly popupCaption: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    const popupImage =
      this.popupElement.querySelector<HTMLImageElement>(".popup__image");
    const popupCaption =
      this.popupElement.querySelector<HTMLElement>(".popup__caption");

    if (!popupImage || !popupCaption) {
      throw new Error(`El popup ${popupSelector} no tiene imagen o leyenda.`);
    }

    this.popupImage = popupImage;
    this.popupCaption = popupCaption;
  }

  public override open(data: CardPreviewData): void {
    this.popupImage.src = data.link;
    this.popupImage.alt = data.name;
    this.popupCaption.textContent = data.name;
    super.open(data);
  }
}
