export interface SectionOptions<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private readonly items: T[];
  private readonly renderer: (item: T) => void;
  private readonly container: HTMLElement;

  constructor({ items, renderer }: SectionOptions<T>, containerSelector: string) {
    this.items = items;
    this.renderer = renderer;

    const container = document.querySelector<HTMLElement>(containerSelector);

    if (!container) {
      throw new Error(`No se encontró el contenedor ${containerSelector}.`);
    }

    this.container = container;
  }

  public renderItems(): void {
    [...this.items].reverse().forEach((item) => this.renderer(item));
  }

  public addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }
}
