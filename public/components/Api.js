export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl.replace(/\/$/, "");
        this.headers = Object.assign({}, headers);
    }
    async request(endpoint, options = {}) {
        var _a;
        const response = await fetch(`${this.baseUrl}${endpoint}`, Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign({}, this.headers), options.headers) }));
        if (response.ok) {
            return (await response.json());
        }
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
            const error = (await response.json());
            errorMessage = (_a = error.message) !== null && _a !== void 0 ? _a : errorMessage;
        }
        catch (_b) {
            // Algunas respuestas de error no incluyen un cuerpo JSON.
        }
        throw new Error(errorMessage);
    }
    async getUserInfo() {
        return await this.request("/users/me");
    }
    async getInitialCards() {
        return await this.request("/cards");
    }
    async updateUserInfo(userData) {
        return await this.request("/users/me", {
            method: "PATCH",
            body: JSON.stringify(userData),
        });
    }
    async updateAvatar(avatarData) {
        return await this.request("/users/me/avatar", {
            method: "PATCH",
            body: JSON.stringify(avatarData),
        });
    }
    async addCard(cardData) {
        return await this.request("/cards", {
            method: "POST",
            body: JSON.stringify(cardData),
        });
    }
    async deleteCard(cardId) {
        return await this.request(`/cards/${cardId}`, { method: "DELETE" });
    }
    async changeLikeCardStatus(cardId, isLiked) {
        return await this.request(`/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
        });
    }
}
