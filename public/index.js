import { Api } from "./components/Api.js";
import { Card, } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo, } from "./components/UserInfo.js";
import { apiConfig } from "./utils/apiConfig.js";
import { defaultFormConfig } from "./utils/constants.js";
const api = new Api(apiConfig);
const editProfileButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__avatar-button");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileForm = document.querySelector("#edit-profile-form");
const editAvatarForm = document.querySelector("#edit-avatar-form");
const newCardForm = document.querySelector("#new-card-form");
const profileNameInput = editProfileForm.querySelector(".popup__input_type_name");
const profileAboutInput = editProfileForm.querySelector(".popup__input_type_description");
let currentUserId = "";
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
const imagePopup = new PopupWithImage("#image-popup");
const deleteConfirmationPopup = new PopupWithConfirmation("#delete-confirmation-popup");
const createCard = (cardData) => {
    const card = new Card(cardData, "#card-template", currentUserId, {
        handleCardClick: (selectedCard) => {
            imagePopup.open(selectedCard);
        },
        handleDeleteClick: (cardId, selectedCard) => {
            deleteConfirmationPopup.setSubmitAction(async () => {
                deleteConfirmationPopup.setLoading(true);
                try {
                    await api.deleteCard(cardId);
                    selectedCard.remove();
                    deleteConfirmationPopup.close();
                }
                catch (error) {
                    console.error("No se pudo eliminar la tarjeta:", error);
                }
                finally {
                    deleteConfirmationPopup.setLoading(false);
                }
            });
            deleteConfirmationPopup.open();
        },
        handleLikeClick: async (cardId, isLiked, selectedCard) => {
            try {
                const updatedCard = await api.changeLikeCardStatus(cardId, isLiked);
                selectedCard.setLikeState(updatedCard.isLiked);
            }
            catch (error) {
                console.error("No se pudo actualizar el Me gusta:", error);
            }
        },
    });
    return card.generateCard();
};
const cardSection = new Section({
    renderer: (cardData) => {
        cardSection.appendItem(createCard(cardData));
    },
}, ".cards__list");
const editProfilePopup = new PopupWithForm("#edit-popup", async (inputValues) => {
    editProfilePopup.setLoading(true);
    try {
        const userData = {
            name: inputValues.name,
            about: inputValues.description,
        };
        const updatedUser = await api.updateUserInfo(userData);
        userInfo.setUserInfo(updatedUser);
        editProfilePopup.close();
    }
    catch (error) {
        console.error("No se pudo actualizar el perfil:", error);
    }
    finally {
        editProfilePopup.setLoading(false);
    }
});
const editAvatarPopup = new PopupWithForm("#edit-avatar-popup", async (inputValues) => {
    editAvatarPopup.setLoading(true);
    try {
        const avatarData = { avatar: inputValues.avatar };
        const updatedUser = await api.updateAvatar(avatarData);
        userInfo.setUserInfo(updatedUser);
        editAvatarPopup.close();
    }
    catch (error) {
        console.error("No se pudo actualizar el avatar:", error);
    }
    finally {
        editAvatarPopup.setLoading(false);
    }
});
const newCardPopup = new PopupWithForm("#new-card-popup", async (inputValues) => {
    newCardPopup.setLoading(true);
    try {
        const cardFormData = {
            name: inputValues["place-name"],
            link: inputValues.link,
        };
        const newCard = await api.addCard(cardFormData);
        cardSection.addItem(createCard(newCard));
        newCardPopup.close();
    }
    catch (error) {
        console.error("No se pudo crear la tarjeta:", error);
    }
    finally {
        newCardPopup.setLoading(false);
    }
});
const editProfileValidator = new FormValidator(defaultFormConfig, editProfileForm);
const editAvatarValidator = new FormValidator(defaultFormConfig, editAvatarForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
editProfileValidator.enableValidation();
editAvatarValidator.enableValidation();
newCardValidator.enableValidation();
editProfilePopup.setEventListeners();
editAvatarPopup.setEventListeners();
newCardPopup.setEventListeners();
imagePopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();
editProfileButton.addEventListener("click", () => {
    const currentUser = userInfo.getUserInfo();
    profileNameInput.value = currentUser.name;
    profileAboutInput.value = currentUser.about;
    editProfileValidator.resetValidation();
    editProfilePopup.open();
});
editAvatarButton.addEventListener("click", () => {
    editAvatarForm.reset();
    editAvatarValidator.resetValidation();
    editAvatarPopup.open();
});
addCardButton.addEventListener("click", () => {
    newCardForm.reset();
    newCardValidator.resetValidation();
    newCardPopup.open();
});
const loadInitialData = async () => {
    try {
        const [user, cards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards(),
        ]);
        currentUserId = user._id;
        userInfo.setUserInfo(user);
        cardSection.renderItems(cards);
    }
    catch (error) {
        console.error("No se pudieron cargar los datos iniciales:", error);
    }
};
void loadInitialData();
