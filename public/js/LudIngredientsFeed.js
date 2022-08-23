import { IngredientRow } from './IngredientRow.js';
import { LudButton } from './LudButton.js';
import { createIngredient, getToken } from './modules/api_calls.js';

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

    displayCreateNewButton(str) {
        this.createNewButton = new LudButton(`Create ingredient '${str}' + `);
        this.createNewButton.element.addEventListener('click', () => {
            const newIngredient = { name: str };

            getToken()
            .then((response) => response.json())
            .then((token) => {

                // then send token along with update request
                createIngredient(newIngredient, token)
                .then((response) => {
                    if (!response.ok) {
                        const errorMessage = `Error ${response.status} - ${response.statusText}`;
                        console.log(errorMessage);
                        return alert(errorMessage);
                    }
                });
            });
        });
        this.element.appendChild(this.createNewButton.element);
    }
}

export { LudIngredientsFeed };