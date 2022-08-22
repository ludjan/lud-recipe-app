class LudButton {
    constructor(buttonText) {
        this.element = document.createElement('button');
        this.buttonText = buttonText;
        this.init();
    }

    init() {
        this.element.textContent = this.buttonText;
    }
}

export { LudButton };