export class Section {
    constructor({ items, renderer }, containerSelector) {
        this.items = items;
        this.renderer = renderer;
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor ${containerSelector}.`);
        }
        this.container = container;
    }
    renderItems() {
        [...this.items].reverse().forEach((item) => this.renderer(item));
    }
    addItem(element) {
        this.container.prepend(element);
    }
}
