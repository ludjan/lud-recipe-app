import { IngredientRow } from './IngredientRow.js';

class LudIngredientsFeed {
    constructor() {
        this.element = document.createElement('div');
    }

    init() {
        console.log('Initet()');
    }

    displayIngredients = (ingredients) => {
        for (let i = 0; i < ingredients.length; i++) {
            const row = new IngredientRow(ingredients[i]);
            this.element.appendChild(row.element);
        }
    }
}

export { LudIngredientsFeed };