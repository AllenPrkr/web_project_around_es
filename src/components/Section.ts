export interface SectionOptions<T> {
  renderer: (item: T) => void;
}

export class Section<T> {
  private readonly renderer: (item: T) => void;
  private readonly container: HTMLElement;

  constructor({ renderer }: SectionOptions<T>, containerSelector: string) {
    this.renderer = renderer;

    const container = document.querySelector<HTMLElement>(containerSelector);

    if (!container) {
      throw new Error(`No se encontró el contenedor ${containerSelector}.`);
    }

    this.container = container;
  }

  public renderItems(items: T[]): void {
    items.forEach((item) => this.renderer(item));
  }

  public addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }

  public appendItem(element: HTMLElement): void {
    this.container.append(element);
  }
}
