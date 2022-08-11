// ingredients
const addIngredientInputBtn = document.getElementById(
    'add-ingredient-input-btn'
  );
  const recipeIngredientsFeed = document.getElementById(
    'recipe-ingredient-feed'
  );
  var recipeIngredientArray = []; // actual recipeIngredients
  var recipeIngredientInputArray = []; // the inputs
  
  function addIngredientInput() {
    saveCurrentIngredientInputs();
    // push empty recipeIngredient
    recipeIngredientArray.push({
      ingredient: null,
      quantity: null,
      unit: null,
    });
    rerenderRecipeIngredientsFeed();
  }

  function rerenderRecipeIngredientsFeed() {
    resetIngredients();

    for (let i = 0; i < recipeIngredientArray.length; i++) {
        const newRecipeIngredientInput = createAndAppendIngredientInput2(i);
        const recipeIngredient = recipeIngredientArray[i];
        // set values of input
        setIngredientValuesInInput(recipeIngredient, newRecipeIngredientInput);
    }
    console.log(`Rerendered ingredients`);
  }

  function setIngredientValuesInInput(recipeIngredient, recipeIngredientInput) {

    // console.log(recipeIngredient.ingredient);
    // console.log(recipeIngredientInput.ingredientSelect);

    setValueInSelectorIfExists(
        recipeIngredientInput.ingredientSelect,
        recipeIngredient.ingredient
      );
      recipeIngredientInput.amountInput.value = recipeIngredient.quantity;
      setValueInSelectorIfExists(
        recipeIngredientInput.unitSelect,
        recipeIngredient.unit
      );
      // console.log('Set inputs in IngredientValue row');
  }

function resetIngredients() {
    clearElement(recipeIngredientsFeed);
    recipeIngredientInputArray = [];
    console.log('Reset ingredients');
}

function createAndAppendIngredientInput2(inputNumber) {
    // create the html element
    var newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <div id="ingredient-input-${inputNumber}" class="recipe-feed-item row">
          <div class="col-xs-12 col-sm-3">
            <!-- <label for="ingredients-select-${inputNumber}">Ingredient</label> -->
            <select name="ingredient" id="ingredients-select-${inputNumber}"></select>
          </div>
          
          <div class="col-xs-12 col-sm-3">
            <!-- <label for="ingredients-amount-${inputNumber}">Amount</label> -->
            <input type="number" min="1" name="amount" maxlength="4" size="4" id="ingredients-amount-${inputNumber}"</select>
          </div>
          
          <div class="col-xs-12 col-sm-3">
            <!-- <label for="unit-select-${inputNumber}">Unit</label> -->
            <select name="unit" id="unit-select-${inputNumber}"></select>
          </div>
          
          <div class="col-xs-12 col-sm-3">
          <button class="btn btn-secondary" onclick="removeIngredientInput(${inputNumber})">Delete</button>
          </div>
          <hr>
        </div>`;

    // add new html to the file
    recipeIngredientsFeed.appendChild(newDiv);

    // find the newly added ids
    const ingredientSelect = document.getElementById(
      `ingredients-select-${inputNumber}`
    );
    const unitSelect = document.getElementById(
      `unit-select-${inputNumber}`
    );
    const amountInput = document.getElementById(
      `ingredients-amount-${inputNumber}`
    );

    // add it to the global input list
    const recipeIngredientInput = {
      ingredientSelect: ingredientSelect,
      amountInput: amountInput,
      unitSelect: unitSelect,
    };
    recipeIngredientInputArray.push(recipeIngredientInput);

    // console.log(ingredients);
    appendIngredientsToSelect(ingredients, recipeIngredientInput.ingredientSelect);
    appendUnitsToSelect(units, recipeIngredientInput.unitSelect);

    return recipeIngredientInput;
  }

function removeIngredientInput(id) {
    if (id < 0 || id > recipeIngredientArray.lenght) return;
    saveCurrentIngredientInputs();
    removeElementOnIndex(recipeIngredientArray, id);
    rerenderRecipeIngredientsFeed();
    console.log(`Removed ingredient input with id ${id}`);
}

function saveCurrentIngredientInputs() {

    var newArray = [];
    for (let i = 0; i < recipeIngredientInputArray.length; i++) {
        const recipeIngredient = {
            ingredient: recipeIngredientInputArray[i].ingredientSelect.value,
            quantity: recipeIngredientInputArray[i].amountInput.value,
            unit: recipeIngredientInputArray[i].unitSelect.value,
        }
        // console.log(`Saving ${recipeIngredient} to recipeIngredientArray`);
        newArray.push(recipeIngredient);
      }
      recipeIngredientArray = newArray;

  }

function getUnitIdFromValue(value) {

}

function getIngredientIdFromValue(value) {
  for (let i = 0; i < ingredients.length; i++) {
    const ingredientName = ingredients[i].name;
    if (ingredientName == value) return ingredients[i].id
  }
}

function getFormattedRecipeIngredients() {
  var newRecipeIngredientArray = []
  for (let i = 0; i < recipeIngredientArray.length; i++) {
    const recipeIngredient = recipeIngredientArray[i];
    const ingredientId = getIngredientIdFromValue(recipeIngredient.ingredient);

    var newRecipeIngredient = {
      ingredientId: ingredientId,
      quantity: recipeIngredient.quantity,
      unit: recipeIngredient.unit
    }
    newRecipeIngredientArray.push(newRecipeIngredient);
  }
  return newRecipeIngredientArray;
}