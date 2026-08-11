export class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const aboutElement = document.querySelector(aboutSelector);
        if (!nameElement || !aboutElement) {
            throw new Error("No se encontraron los datos del perfil.");
        }
        this.nameElement = nameElement;
        this.aboutElement = aboutElement;
    }
    getUserInfo() {
        var _a, _b;
        return {
            name: (_a = this.nameElement.textContent) !== null && _a !== void 0 ? _a : "",
            about: (_b = this.aboutElement.textContent) !== null && _b !== void 0 ? _b : "",
        };
    }
    setUserInfo({ name, about }) {
        this.nameElement.textContent = name;
        this.aboutElement.textContent = about;
    }
}
