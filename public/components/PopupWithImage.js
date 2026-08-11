import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        const popupImage = this.popupElement.querySelector(".popup__image");
        const popupCaption = this.popupElement.querySelector(".popup__caption");
        if (!popupImage || !popupCaption) {
            throw new Error(`El popup ${popupSelector} no tiene imagen o leyenda.`);
        }
        this.popupImage = popupImage;
        this.popupCaption = popupCaption;
    }
    open(data) {
        this.popupImage.src = data.link;
        this.popupImage.alt = data.name;
        this.popupCaption.textContent = data.name;
        super.open(data);
    }
}
