export class Section {
    constructor({ renderer }, containerSelector) {
        this.renderer = renderer;
        const container = document.querySelector(containerSelector);
        if (!container) {
            throw new Error(`No se encontró el contenedor ${containerSelector}.`);
        }
        this.container = container;
    }
    renderItems(items) {
        items.forEach((item) => this.renderer(item));
    }
    addItem(element) {
        this.container.prepend(element);
    }
    appendItem(element) {
        this.container.append(element);
    }
}
