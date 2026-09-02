export class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const aboutElement = document.querySelector(aboutSelector);
        const avatarElement = document.querySelector(avatarSelector);
        if (!nameElement || !aboutElement || !avatarElement) {
            throw new Error("No se encontraron los datos del perfil.");
        }
        this.nameElement = nameElement;
        this.aboutElement = aboutElement;
        this.avatarElement = avatarElement;
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this.nameElement.textContent) !== null && _a !== void 0 ? _a : "",
            about: (_b = this.aboutElement.textContent) !== null && _b !== void 0 ? _b : "",
        };
    }
    setUserInfo({ name, about, avatar }) {
        this.nameElement.textContent = name;
        this.aboutElement.textContent = about;
        this.avatarElement.src = avatar;
    }
}
