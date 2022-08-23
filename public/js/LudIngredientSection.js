// import { LudButton } from './LudButton.js';
import { LudButton } from './LudButton.js';
import { LudIngredientsFeed } from './LudIngredientsFeed.js';
import { LudSearchField } from './LudSearchField.js';
import { getIngredients } from './modules/api_calls.js';
import { Utils } from './modules/utils.js';


class LudIngredientSection {
    constructor() {
        this.section = document.createElement('section');
        this.init();
        return this.section;
    }

    init() {
        this.searchField = new LudSearchField(this.query);
        this.section.appendChild(this.searchField.element);

        // this.addBtn = new LudButton('Search');
        // this.section.appendChild(this.addBtn.element);
        // this.addBtn.element.addEventListener("click", () => {
        //     console.log('Clicked when input was ' + this.searchField.element.value);
        // });

        this.ingredientsFeed = new LudIngredientsFeed();
        this.section.appendChild(this.ingredientsFeed.element);
        this.fetchIngredients();

        this.searchField.element.addEventListener("input", () => {
            this.updateFeed(this.searchField.element.value);
        });
    }

    fetchIngredients() {
        // console.log('About to fetch ingredients');
        getIngredients()
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.ingredients = data;
            this.updateFeed('');
        });
    }



    updateFeed(str) {
        
        Utils.clearElement(this.ingredientsFeed.element);

        var copyArray = Utils.copyArray(this.ingredients);
        if (str.length == null) {
            this.ingredientsFeed.displayIngredients(copyArray);
            return;
        } 

        var newArray = [];
        var hasCompleteMatch = false;
        for (let i = 0; i < copyArray.length; i++) {
            const { name } = copyArray[i];
            if (Utils.strMatchesStr(name, str)) {
                newArray.push(copyArray[i]);
                if (Utils.isCompleteMatch(name, str)) {
                    hasCompleteMatch = true;
                }
            }
        }
        this.ingredientsFeed.displayIngredients(newArray);
        
        if (str != '' && !hasCompleteMatch) {
            this.ingredientsFeed.displayCreateNewButton(str);
            console.log('Create new button');
        }
    }
}

export { LudIngredientSection };