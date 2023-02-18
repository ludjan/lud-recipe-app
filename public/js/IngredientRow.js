import { LudButton } from './LudButton.js';

class IngredientRow {
    constructor(ingredient) {
        this.name = ingredient.name;
        this.id = ingredient.id;

        this.element = document.createElement('div');

        this.init();
    }

    init() {
        this.addClasses();
        this.createNameParagraph();
        this.createEditButton();
    }
    
    addClasses() {
        this.element.classList.add('row');
    }

    createNameParagraph() {
        const ingredientParagraph = document.createElement('div');
        ingredientParagraph.innerHTML = `${this.name} <i>${this.id}</i>`;
        this.element.appendChild(ingredientParagraph);
    }

    createEditButton() {
        const editButton = new LudButton("Edit");

        // editButton.element.click = reloadIngredients() 
        // editButton.elements.addEventListener("click", () => {
        //     console.log(`Clicked edit button ${this.id}`);
        // });

        this.element.appendChild(editButton.element);
    }
}

export { IngredientRow };