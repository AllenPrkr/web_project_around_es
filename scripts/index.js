const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileForm = editProfileModal.querySelector("#edit-profile-form");
const editProfileCloseButton =
  editProfileModal.querySelector(".popup__close");
const profileNameInput = editProfileModal.querySelector(
  ".popup__input_type_name"
);
const profileDescriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);
const profileAddButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = newCardModal.querySelector("#new-card-form");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name"
);
const newCardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCardClick(evt) {
  evt.target.closest(".card").remove();
}

function handleCardImageClick(name, link) {
  imageModalCaption.textContent = name;
  imageModalImage.src = link;
  imageModalImage.alt = name;
  openModal(imageModal);
}

function getCardElement(name = "Sin título", link = "./images/placeholder.jpg") {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikeButton.addEventListener("click", handleLikeButtonClick);
  cardDeleteButton.addEventListener("click", handleDeleteCardClick);
  cardImage.addEventListener("click", () => {
    handleCardImageClick(name, link);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

function fillProfileForm() {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(newCardNameInput.value, newCardLinkInput.value, cardList);
  closeModal(newCardModal);
  newCardForm.reset();
}

profileEditButton.addEventListener("click", handleOpenEditModal);

editProfileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () => {
  openModal(newCardModal);
});

newCardCloseButton.addEventListener("click", () => {
  closeModal(newCardModal);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imageModalCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardList);
});
