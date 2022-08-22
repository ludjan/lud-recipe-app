import { autocomplete } from "./modules/autocomplete.js";

class LudSearchField {
    constructor(query) {
        this.element = document.createElement('input');
        this.init();
        this.query = query;
    }

    init() {
        this.element.type = 'text';
        this.element.name = 'search-ingredients';
        this.element.placeholder = 'Search';
    }

}

export { LudSearchField };