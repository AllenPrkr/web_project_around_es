export interface UserFormData {
  name: string;
  about: string;
}

export interface AvatarFormData {
  avatar: string;
}

export interface UserData extends UserFormData, AvatarFormData {
  _id: string;
}

export interface UserInfoSelectors {
  nameSelector: string;
  aboutSelector: string;
  avatarSelector: string;
}

export class UserInfo {
  private readonly nameElement: HTMLElement;
  private readonly aboutElement: HTMLElement;
  private readonly avatarElement: HTMLImageElement;

  constructor({ nameSelector, aboutSelector, avatarSelector }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const aboutElement = document.querySelector<HTMLElement>(aboutSelector);
    const avatarElement = document.querySelector<HTMLImageElement>(avatarSelector);

    if (!nameElement || !aboutElement || !avatarElement) {
      throw new Error("No se encontraron los datos del perfil.");
    }

    this.nameElement = nameElement;
    this.aboutElement = aboutElement;
    this.avatarElement = avatarElement;
  }

  public getUserInfo(): UserFormData {
    return {
      name: this.nameElement.textContent ?? "",
      about: this.aboutElement.textContent ?? "",
    };
  }

  public setUserInfo({ name, about, avatar }: UserData): void {
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about;
    this.avatarElement.src = avatar;
  }
}
