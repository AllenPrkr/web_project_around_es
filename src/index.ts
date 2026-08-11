import { Card, type CardData } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";

const editProfileButton = document.querySelector<HTMLButtonElement>(
  ".profile__edit-button",
)!;
const addCardButton = document.querySelector<HTMLButtonElement>(
  ".profile__add-button",
)!;
const editProfileForm = document.querySelector<HTMLFormElement>(
  "#edit-profile-form",
)!;
const newCardForm =
  document.querySelector<HTMLFormElement>("#new-card-form")!;
const profileNameInput = editProfileForm.querySelector<HTMLInputElement>(
  ".popup__input_type_name",
)!;
const profileAboutInput = editProfileForm.querySelector<HTMLInputElement>(
  ".popup__input_type_description",
)!;

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");

const createCard = (cardData: CardData): HTMLElement => {
  const card = new Card(cardData, "#card-template", (selectedCard) => {
    imagePopup.open(selectedCard);
  });

  return card.generateCard();
};

const cardSection = new Section<CardData>(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(createCard(cardData));
    },
  },
  ".cards__list",
);

const editProfilePopup = new PopupWithForm(
  "#edit-popup",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues.name,
      about: inputValues.description,
    });
    editProfilePopup.close();
  },
);

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (inputValues) => {
    const cardData: CardData = {
      name: inputValues["place-name"],
      link: inputValues.link,
    };

    cardSection.addItem(createCard(cardData));
    newCardPopup.close();
  },
);

const editProfileValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);

editProfileValidator.enableValidation();
newCardValidator.enableValidation();
editProfilePopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();
cardSection.renderItems();

editProfileButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  profileNameInput.value = currentUser.name;
  profileAboutInput.value = currentUser.about;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  newCardPopup.open();
});
