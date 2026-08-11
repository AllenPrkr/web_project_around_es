export interface UserData {
  name: string;
  about: string;
}

export interface UserInfoSelectors {
  nameSelector: string;
  aboutSelector: string;
}

export class UserInfo {
  private readonly nameElement: HTMLElement;
  private readonly aboutElement: HTMLElement;

  constructor({ nameSelector, aboutSelector }: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(nameSelector);
    const aboutElement = document.querySelector<HTMLElement>(aboutSelector);

    if (!nameElement || !aboutElement) {
      throw new Error("No se encontraron los datos del perfil.");
    }

    this.nameElement = nameElement;
    this.aboutElement = aboutElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      about: this.aboutElement.textContent ?? "",
    };
  }

  public setUserInfo({ name, about }: UserData): void {
    this.nameElement.textContent = name;
    this.aboutElement.textContent = about;
  }
}
