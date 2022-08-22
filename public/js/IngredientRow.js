class IngredientRow {
    constructor(ingredient) {
        this.name = ingredient.name;
        this.id = ingredient.id;

        this.element = document.createElement('div');

        this.init();
    }

    init() {

        this.element.classList.add('col-xs-12');
        this.element.classList.add('col-sm-6');

        const ingredientParagraph = document.createElement('p');
        ingredientParagraph.innerHTML = `${this.name} <i>${this.id}</i>`;
        this.element.appendChild(ingredientParagraph);
    }
}

export { IngredientRow };